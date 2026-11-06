import hashlib
import json
import os
import secrets
import sqlite3
from datetime import datetime, timedelta

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
DB_PATH = os.path.join(DATA_DIR, "pokepixel.db")


def get_connection():
    os.makedirs(DATA_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_PATH, check_same_thread=False, timeout=15.0)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode = WAL")
    conn.execute("PRAGMA synchronous = NORMAL")
    conn.execute("PRAGMA busy_timeout = 5000")
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def hash_password(password: str, salt: str) -> str:
    return hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        100000,
    ).hex()


def generate_salt() -> str:
    return secrets.token_hex(16)


def generate_session_token() -> str:
    return secrets.token_urlsafe(32)


def init_db(existing_save=None, existing_config=None, default_player_func=None, species_by_id=None):
    with get_connection() as conn:
        cursor = conn.cursor()
        # 1. Users Table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL COLLATE NOCASE,
                password_hash TEXT NOT NULL,
                salt TEXT NOT NULL,
                avatar_model TEXT DEFAULT 'ethan_gold',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        # 2. Sessions Table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS sessions (
                token TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expires_at TIMESTAMP NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
            """
        )

        # 3. Player Saves Table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS player_saves (
                user_id INTEGER PRIMARY KEY,
                player_data TEXT NOT NULL,
                config_data TEXT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
            """
        )

        # 4. Ensure 'role' column on users table
        user_cols = [c[1] for c in cursor.execute("PRAGMA table_info(users)").fetchall()]
        if "role" not in user_cols:
            cursor.execute("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'player'")
        cursor.execute("UPDATE users SET role = 'admin' WHERE username = 'Admin' COLLATE NOCASE")

        # 5. Global Market Listings Table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS market_listings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                seller_id INTEGER NOT NULL,
                seller_name TEXT NOT NULL,
                listing_type TEXT NOT NULL, /* 'item' or 'pokemon' */
                title TEXT NOT NULL,
                category TEXT DEFAULT 'item', /* 'pokemon', 'pokeball', 'stone', 'potion', 'candy', 'item' */
                currency TEXT NOT NULL DEFAULT 'gold', /* 'gold' or 'diamond' */
                price INTEGER NOT NULL,
                tax_amount INTEGER NOT NULL, /* 5% server hold */
                seller_proceeds INTEGER NOT NULL, /* 95% to seller */
                status TEXT NOT NULL DEFAULT 'active', /* 'active', 'sold', 'cancelled' */
                item_id TEXT,
                item_quantity INTEGER DEFAULT 1,
                item_icon INTEGER DEFAULT 0,
                item_desc TEXT,
                pokemon_uid TEXT,
                pokemon_data TEXT,
                buyer_id INTEGER,
                buyer_name TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                sold_at TIMESTAMP,
                FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
            )
            """
        )

        # 6. Server Hold Treasury Table (5% Tax Retained for Server Hold - Admin Only)
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS server_hold (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                total_gold_tax INTEGER DEFAULT 0,
                total_diamond_tax INTEGER DEFAULT 0,
                total_transactions INTEGER DEFAULT 0,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        cursor.execute("INSERT OR IGNORE INTO server_hold (id, total_gold_tax, total_diamond_tax, total_transactions) VALUES (1, 14850, 145, 18)")

        # 7. Server Hold Transaction Audit Log
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS server_hold_transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                listing_id INTEGER,
                seller_name TEXT NOT NULL,
                buyer_name TEXT NOT NULL,
                listing_type TEXT NOT NULL,
                title TEXT NOT NULL,
                currency TEXT NOT NULL,
                gross_price INTEGER NOT NULL,
                tax_amount INTEGER NOT NULL,
                seller_proceeds INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
                # 8. Tester Feedback & Bug Reports Table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS tester_feedback (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                username TEXT NOT NULL,
                category TEXT NOT NULL, /* 'bug', 'suggestion', 'balance', 'visual', 'praise', 'other' */
                rating INTEGER DEFAULT 5,
                message TEXT NOT NULL,
                player_summary TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        conn.commit()

        # Seed realistic global market listings if table is fresh
        cursor.execute("SELECT COUNT(*) FROM market_listings")
        if cursor.fetchone()[0] == 0:
            seed_initial_market_listings(cursor)
            conn.commit()

        # Check if users table is empty; if so, seed demo users
        cursor.execute("SELECT COUNT(*) AS cnt FROM users")
        row = cursor.fetchone()
        if row and row["cnt"] == 0:
            seed_default_accounts(conn, existing_save, existing_config, default_player_func, species_by_id)
        elif existing_save and existing_save.get("party"):
            # Update Red's save if existing_save has real party data
            cursor.execute("SELECT id FROM users WHERE username = 'Red' COLLATE NOCASE")
            red_row = cursor.fetchone()
            if red_row:
                cursor.execute("SELECT player_data FROM player_saves WHERE user_id = ?", (red_row["id"],))
                psave = cursor.fetchone()
                if psave:
                    try:
                        p_data = json.loads(psave["player_data"])
                        if not p_data.get("party") or len(p_data.get("party", [])) == 0:
                            cursor.execute(
                                "UPDATE player_saves SET player_data = ? WHERE user_id = ?",
                                (json.dumps(existing_save, ensure_ascii=False), red_row["id"]),
                            )
                            conn.commit()
                    except Exception:
                        pass


def seed_default_accounts(conn, existing_save=None, existing_config=None, default_player_func=None, species_by_id=None):
    cursor = conn.cursor()
    now_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")

    # 1. Account 'Red'
    salt_red = generate_salt()
    hash_red = hash_password("red123", salt_red)
    cursor.execute(
        """
        INSERT INTO users (username, password_hash, salt, avatar_model, created_at, last_login)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        ("Red", hash_red, salt_red, "red_champion", now_str, now_str),
    )
    user_id_red = cursor.lastrowid

    player_data_red = existing_save
    if not player_data_red and default_player_func and species_by_id:
        player_data_red = default_player_func(species_by_id)
    if not player_data_red:
        player_data_red = {"name": "Red", "level": 35, "party": []}

    config_data = existing_config or {"server_name": "PokéLand GBA Edition"}

    cursor.execute(
        """
        INSERT INTO player_saves (user_id, player_data, config_data, updated_at)
        VALUES (?, ?, ?, ?)
        """,
        (user_id_red, json.dumps(player_data_red, ensure_ascii=False), json.dumps(config_data, ensure_ascii=False), now_str),
    )

    # 2. Account 'Gold'
    salt_gold = generate_salt()
    hash_gold = hash_password("gold123", salt_gold)
    cursor.execute(
        """
        INSERT INTO users (username, password_hash, salt, avatar_model, created_at, last_login)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        ("Gold", hash_gold, salt_gold, "ethan_gold", now_str, now_str),
    )
    user_id_gold = cursor.lastrowid

    player_data_gold = json.loads(json.dumps(player_data_red))
    player_data_gold["name"] = "Gold"
    player_data_gold["avatar_model"] = "ethan_gold"

    cursor.execute(
        """
        INSERT INTO player_saves (user_id, player_data, config_data, updated_at)
        VALUES (?, ?, ?, ?)
        """,
        (user_id_gold, json.dumps(player_data_gold, ensure_ascii=False), json.dumps(config_data, ensure_ascii=False), now_str),
    )

    # 3. Account 'Admin'
    salt_admin = generate_salt()
    hash_admin = hash_password("admin123", salt_admin)
    cursor.execute(
        """
        INSERT INTO users (username, password_hash, salt, avatar_model, created_at, last_login)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        ("Admin", hash_admin, salt_admin, "lance_dragon", now_str, now_str),
    )
    user_id_admin = cursor.lastrowid

    cursor.execute(
        """
        INSERT INTO player_saves (user_id, player_data, config_data, updated_at)
        VALUES (?, ?, ?, ?)
        """,
        (user_id_admin, json.dumps(player_data_red, ensure_ascii=False), json.dumps(config_data, ensure_ascii=False), now_str),
    )

    conn.commit()


def create_user(username: str, password: str, avatar_model: str = "ethan_gold") -> dict:
    username = username.strip()
    if len(username) < 3:
        return {"ok": False, "error": "Nome de treinador deve ter pelo menos 3 caracteres."}
    if len(password) < 4:
        return {"ok": False, "error": "Senha deve ter pelo menos 4 caracteres."}

    salt = generate_salt()
    pwd_hash = hash_password(password, salt)
    now_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")

    try:
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO users (username, password_hash, salt, avatar_model, created_at, last_login)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (username, pwd_hash, salt, avatar_model, now_str, now_str),
            )
            user_id = cursor.lastrowid
            conn.commit()
            return {
                "ok": True,
                "user": {
                    "id": user_id,
                    "username": username,
                    "avatar_model": avatar_model,
                    "created_at": now_str,
                    "last_login": now_str,
                },
            }
    except sqlite3.IntegrityError:
        return {"ok": False, "error": f"O nome de treinador '{username}' já está em uso. Escolha outro!"}
    except Exception as e:
        return {"ok": False, "error": f"Erro ao criar conta: {str(e)}"}


def authenticate_user(username: str, password: str) -> dict:
    username = username.strip()
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE username = ? COLLATE NOCASE", (username,))
        user = cursor.fetchone()
        if not user:
            return {"ok": False, "error": "Treinador não encontrado ou senha incorreta."}

        pwd_hash = hash_password(password, user["salt"])
        if pwd_hash != user["password_hash"]:
            return {"ok": False, "error": "Treinador não encontrado ou senha incorreta."}

        now_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
        cursor.execute("UPDATE users SET last_login = ? WHERE id = ?", (now_str, user["id"]))
        conn.commit()

        return {
            "ok": True,
            "user": {
                "id": user["id"],
                "username": user["username"],
                "avatar_model": user["avatar_model"],
                "created_at": user["created_at"],
                "last_login": now_str,
            },
        }


def create_session(user_id: int, days_valid: int = 30) -> str:
    token = generate_session_token()
    now = datetime.utcnow()
    expires_at = (now + timedelta(days=days_valid)).strftime("%Y-%m-%d %H:%M:%S")

    with get_connection() as conn:
        cursor = conn.cursor()
        # Clean expired sessions first
        cursor.execute("DELETE FROM sessions WHERE expires_at < ?", (now.strftime("%Y-%m-%d %H:%M:%S"),))
        cursor.execute(
            """
            INSERT INTO sessions (token, user_id, expires_at)
            VALUES (?, ?, ?)
            """,
            (token, user_id, expires_at),
        )
        conn.commit()
    return token


def get_user_by_session(token: str) -> dict or None:
    if not token:
        return None
    now_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT u.id, u.username, u.role, u.avatar_model, u.created_at, u.last_login, s.expires_at
            FROM sessions s
            JOIN users u ON s.user_id = u.id
            WHERE s.token = ? AND s.expires_at > ?
            """,
            (token, now_str),
        )
        row = cursor.fetchone()
        if not row:
            return None
        u_role = row["role"] if "role" in row.keys() else ("admin" if row["username"].lower() == "admin" else "player")
        return {
            "id": row["id"],
            "username": row["username"],
            "role": u_role,
            "is_admin": u_role == "admin" or row["username"].lower() == "admin",
            "avatar_model": row["avatar_model"],
            "created_at": row["created_at"],
            "last_login": row["last_login"],
        }


def delete_session(token: str) -> bool:
    if not token:
        return False
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM sessions WHERE token = ?", (token,))
        conn.commit()
    return True


def get_player_save(user_id: int) -> dict or None:
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT player_data, config_data FROM player_saves WHERE user_id = ?", (user_id,))
        row = cursor.fetchone()
        if not row:
            return None
        try:
            player = json.loads(row["player_data"])
            config = json.loads(row["config_data"])
            return {"player": player, "config": config}
        except Exception:
            return None


def save_player_save(user_id: int, player_data: dict, config_data: dict = None) -> bool:
    now_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT player_data, config_data FROM player_saves WHERE user_id = ?", (user_id,))
        row = cursor.fetchone()

        if row:
            p_json = json.dumps(player_data, ensure_ascii=False) if player_data is not None else row["player_data"]
            c_json = json.dumps(config_data, ensure_ascii=False) if config_data is not None else row["config_data"]
            cursor.execute(
                """
                UPDATE player_saves
                SET player_data = ?, config_data = ?, updated_at = ?
                WHERE user_id = ?
                """,
                (p_json, c_json, now_str, user_id),
            )
        else:
            p_json = json.dumps(player_data, ensure_ascii=False) if player_data is not None else "{}"
            c_json = json.dumps(config_data, ensure_ascii=False) if config_data is not None else "{}"
            cursor.execute(
                """
                INSERT INTO player_saves (user_id, player_data, config_data, updated_at)
                VALUES (?, ?, ?, ?)
                """,
                (user_id, p_json, c_json, now_str),
            )

        if player_data and "avatar_model" in player_data:
            cursor.execute("UPDATE users SET avatar_model = ? WHERE id = ?", (player_data["avatar_model"], user_id))

        conn.commit()
    return True


def update_user_avatar(user_id: int, avatar_model: str) -> bool:
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE users SET avatar_model = ? WHERE id = ?", (avatar_model, user_id))
        conn.commit()
    return True


# =========================================================
# GLOBAL MARKET & SERVER HOLD (TREASURY) SUBSYSTEM
# =========================================================

def seed_initial_market_listings(cursor):
    """Seed realistic active market listings so the market feels immediately alive."""
    initial_items = [
        # Shiny Pokémon Listings (Diamond & Gold)
        (
            4, "AshKetchum", "pokemon", "Pikachu (Shiny ✨)", "pokemon", "diamond", 150, 8, 142, "active",
            None, 1, 0, None, "pk_ash_pika",
            json.dumps({
                "uid": "pk_ash_pika", "species_id": "pikachu", "name": "Pikachu", "level": 45, "is_shiny": True,
                "elements": ["electric"], "hp": 260, "max_hp": 260, "nature": "Timid", "gender": "male",
                "quality": "Mítico", "quality_multiplier": 1.78,
                "ivs": {"hp": 31, "atk": 28, "def": 29, "spa": 31, "spd": 30, "spe": 31},
                "iv_total": 180, "moves": ["thunderbolt", "volt_tackle", "iron_tail", "agility"]
            }, ensure_ascii=False)
        ),
        (
            2, "Gold", "pokemon", "Gengar (Shiny ✨)", "pokemon", "diamond", 220, 11, 209, "active",
            None, 1, 0, None, "pk_gold_gengar",
            json.dumps({
                "uid": "pk_gold_gengar", "species_id": "gengar", "name": "Gengar", "level": 62, "is_shiny": True,
                "elements": ["ghost", "poison"], "hp": 340, "max_hp": 340, "nature": "Modest", "gender": "female",
                "quality": "Mítico", "quality_multiplier": 1.82,
                "ivs": {"hp": 30, "atk": 25, "def": 28, "spa": 31, "spd": 31, "spe": 31},
                "iv_total": 176, "moves": ["shadow_ball", "sludge_bomb", "hypnosis", "dream_eater"]
            }, ensure_ascii=False)
        ),
        (
            5, "BattleOX", "pokemon", "Charizard Lv.78 (Fogo Puro)", "pokemon", "gold", 42000, 2100, 39900, "active",
            None, 1, 0, None, "pk_box_chari",
            json.dumps({
                "uid": "pk_box_chari", "species_id": "charizard", "name": "Charizard", "level": 78, "is_shiny": False,
                "elements": ["fire", "flying"], "hp": 485, "max_hp": 485, "nature": "Adamant", "gender": "male",
                "quality": "Lendário", "quality_multiplier": 1.65,
                "ivs": {"hp": 31, "atk": 31, "def": 27, "spa": 28, "spd": 29, "spe": 30},
                "iv_total": 176, "moves": ["flamethrower", "dragon_claw", "blast_burn", "fly"]
            }, ensure_ascii=False)
        ),
        # Evolution Stones & Consumables
        (
            3, "Admin", "item", "Master Ball (Original)", "pokeball", "diamond", 120, 6, 114, "active",
            "capsule_master", 1, 35, "Pokébola com 100% de taxa de captura garantida em qualquer criatura.",
            None, None
        ),
        (
            4, "AshKetchum", "item", "Water Stone (Pacote x5)", "stone", "gold", 5200, 260, 4940, "active",
            "stone_water", 5, 161, "Pedra mística pura para evolução de Poliwhirl, Shellder, Staryu e Eevee.",
            None, None
        ),
        (
            2, "Gold", "item", "Thunder Stone (Pacote x4)", "stone", "gold", 4400, 220, 4180, "active",
            "stone_electric", 4, 162, "Pedra carregada de voltagem para evolução de Pikachu e Eevee.",
            None, None
        ),
        (
            5, "BattleOX", "item", "Max Revive (Lote x10)", "potion", "gold", 28000, 1400, 26600, "active",
            "reference_max_revive", 10, 23, "Ressuscita Pokémon nocauteado restaurando 100% do HP máximo.",
            None, None
        ),
        (
            3, "Admin", "item", "Rare Candy (Lote x8)", "candy", "diamond", 65, 4, 61, "active",
            "reference_rare_candy", 8, 48, "Doce mítico que eleva instantaneamente o nível do seu Pokémon.",
            None, None
        ),
    ]

    for it in initial_items:
        cursor.execute(
            """
            INSERT INTO market_listings (
                seller_id, seller_name, listing_type, title, category, currency, price,
                tax_amount, seller_proceeds, status, item_id, item_quantity, item_icon,
                item_desc, pokemon_uid, pokemon_data
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            it
        )

    # Seed some sample audit transactions in server_hold_transactions
    initial_txs = [
        (101, "Red", "Blue", "pokemon", "Gengar Lv.55", "gold", 35000, 1750, 33250),
        (102, "Misty", "Brock", "item", "Fire Stone x3", "gold", 3600, 180, 3420),
        (103, "Admin", "Red", "item", "Master Ball", "diamond", 120, 6, 114),
    ]
    for tx in initial_txs:
        cursor.execute(
            """
            INSERT INTO server_hold_transactions (
                listing_id, seller_name, buyer_name, listing_type, title, currency,
                gross_price, tax_amount, seller_proceeds
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            tx
        )


def get_market_listings(category=None, currency=None, search=None, sort="cheapest") -> list:
    with get_connection() as conn:
        cursor = conn.cursor()
        query = "SELECT * FROM market_listings WHERE status = 'active'"
        params = []

        if category and category != "all":
            query += " AND category = ?"
            params.append(category)

        if currency and currency != "all":
            query += " AND currency = ?"
            params.append(currency)

        if search and search.strip():
            query += " AND (title LIKE ? OR seller_name LIKE ?)"
            s_param = f"%{search.strip()}%"
            params.extend([s_param, s_param])

        if sort == "cheapest":
            query += " ORDER BY price ASC"
        elif sort == "expensive":
            query += " ORDER BY price DESC"
        elif sort == "recent":
            query += " ORDER BY id DESC"
        else:
            query += " ORDER BY id DESC"

        cursor.execute(query, tuple(params))
        rows = cursor.fetchall()

        results = []
        for r in rows:
            d = dict(r)
            if d.get("pokemon_data"):
                try:
                    d["pokemon"] = json.loads(d["pokemon_data"])
                except Exception:
                    d["pokemon"] = None
            results.append(d)
        return results


def get_user_market_listings(user_id: int) -> dict:
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM market_listings WHERE seller_id = ? ORDER BY id DESC", (user_id,))
        rows = cursor.fetchall()
        active = []
        sold = []
        for r in rows:
            d = dict(r)
            if d.get("pokemon_data"):
                try:
                    d["pokemon"] = json.loads(d["pokemon_data"])
                except Exception:
                    d["pokemon"] = None
            if d["status"] == "active":
                active.append(d)
            elif d["status"] == "sold":
                sold.append(d)
        return {"active": active, "sold": sold}


def create_market_listing(seller_id: int, seller_name: str, listing_type: str, title: str, category: str,
                          currency: str, price: int, item_id: str = None, item_quantity: int = 1,
                          item_icon: int = 0, item_desc: str = None, pokemon_uid: str = None,
                          pokemon_data: dict = None) -> dict:
    if price <= 0:
        return {"ok": False, "error": "O preço do anúncio deve ser maior que zero."}
    if currency not in ("gold", "diamond"):
        return {"ok": False, "error": "Moeda inválida. Use 'gold' ou 'diamond'."}

    # 5% Server Hold Tax calculated on every transaction
    tax_amount = max(1, int(round(price * 0.05)))
    seller_proceeds = price - tax_amount

    pk_json = json.dumps(pokemon_data, ensure_ascii=False) if pokemon_data else None

    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO market_listings (
                seller_id, seller_name, listing_type, title, category, currency, price,
                tax_amount, seller_proceeds, status, item_id, item_quantity, item_icon,
                item_desc, pokemon_uid, pokemon_data
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, ?, ?, ?, ?, ?)
            """,
            (
                seller_id, seller_name, listing_type, title, category, currency, price,
                tax_amount, seller_proceeds, item_id, item_quantity, item_icon, item_desc,
                pokemon_uid, pk_json
            )
        )
        listing_id = cursor.lastrowid
        conn.commit()

    return {
        "ok": True,
        "listing_id": listing_id,
        "price": price,
        "tax_amount": tax_amount,
        "seller_proceeds": seller_proceeds,
        "currency": currency
    }


def cancel_market_listing(listing_id: int, user_id: int) -> dict:
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM market_listings WHERE id = ?", (listing_id,))
        row = cursor.fetchone()
        if not row:
            return {"ok": False, "error": "Anúncio não encontrado."}
        listing = dict(row)
        if listing["seller_id"] != user_id:
            return {"ok": False, "error": "Você só pode cancelar seus próprios anúncios."}
        if listing["status"] != "active":
            return {"ok": False, "error": f"Não é possível cancelar anúncio com status '{listing['status']}'."}

        cursor.execute("UPDATE market_listings SET status = 'cancelled' WHERE id = ?", (listing_id,))
        conn.commit()

        # Parse pokemon object if returned
        if listing.get("pokemon_data"):
            try:
                listing["pokemon"] = json.loads(listing["pokemon_data"])
            except Exception:
                listing["pokemon"] = None

        return {"ok": True, "listing": listing}


def buy_market_listing(listing_id: int, buyer_id: int, buyer_name: str, buyer_player: dict) -> dict:
    now_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM market_listings WHERE id = ?", (listing_id,))
        row = cursor.fetchone()
        if not row:
            return {"ok": False, "error": "Anúncio não encontrado."}
        listing = dict(row)
        if listing["status"] != "active":
            return {"ok": False, "error": "Este item ou Pokémon já foi vendido ou retirado do mercado."}
        if listing["seller_id"] == buyer_id:
            return {"ok": False, "error": "Você não pode comprar seu próprio anúncio."}

        price = listing["price"]
        currency = listing["currency"]
        tax = listing["tax_amount"]
        proceeds = listing["seller_proceeds"]

        # 1. Validate Buyer balance
        if currency == "gold":
            if buyer_player.get("gold", 0) < price:
                return {"ok": False, "error": f"Ouro insuficiente! O item custa ${price:,} e você possui ${buyer_player.get('gold', 0):,}."}
            buyer_player["gold"] -= price
        elif currency == "diamond":
            if buyer_player.get("diamonds", 0) < price:
                return {"ok": False, "error": f"Diamantes insuficientes! O item custa 💎 {price} e você possui 💎 {buyer_player.get('diamonds', 0)}."}
            buyer_player["diamonds"] -= price

        # 2. Add Purchased Item or Pokémon to Buyer
        if listing["listing_type"] == "pokemon" and listing["pokemon_data"]:
            pk = json.loads(listing["pokemon_data"])
            # Add to party if has space, else PC box
            if len(buyer_player.get("party", [])) < 6:
                buyer_player.setdefault("party", []).append(pk)
            else:
                buyer_player.setdefault("pc_box", []).append(pk)
        elif listing["listing_type"] == "item" and listing["item_id"]:
            iid = listing["item_id"]
            qty = listing.get("item_quantity", 1)
            buyer_player.setdefault("inventory", {})
            buyer_player["inventory"][iid] = buyer_player["inventory"].get(iid, 0) + qty

        # 3. Mark listing as sold
        cursor.execute(
            """
            UPDATE market_listings
            SET status = 'sold', buyer_id = ?, buyer_name = ?, sold_at = ?
            WHERE id = ?
            """,
            (buyer_id, buyer_name, now_str, listing_id)
        )

        # 4. Credit Seller Save with 95% proceeds
        seller_id = listing["seller_id"]
        cursor.execute("SELECT player_data, config_data FROM player_saves WHERE user_id = ?", (seller_id,))
        s_row = cursor.fetchone()
        if s_row:
            try:
                s_player = json.loads(s_row["player_data"])
                if currency == "gold":
                    s_player["gold"] = s_player.get("gold", 0) + proceeds
                else:
                    s_player["diamonds"] = s_player.get("diamonds", 0) + proceeds
                cursor.execute(
                    "UPDATE player_saves SET player_data = ? WHERE user_id = ?",
                    (json.dumps(s_player, ensure_ascii=False), seller_id)
                )
            except Exception:
                pass

        # 5. Retain 5% Tax into Server Hold
        cursor.execute(
            """
            UPDATE server_hold
            SET total_gold_tax = total_gold_tax + ?,
                total_diamond_tax = total_diamond_tax + ?,
                total_transactions = total_transactions + 1,
                updated_at = ?
            WHERE id = 1
            """,
            (tax if currency == "gold" else 0, tax if currency == "diamond" else 0, now_str)
        )

        # 6. Record Audit Log in server_hold_transactions
        cursor.execute(
            """
            INSERT INTO server_hold_transactions (
                listing_id, seller_name, buyer_name, listing_type, title, currency,
                gross_price, tax_amount, seller_proceeds
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (listing_id, listing["seller_name"], buyer_name, listing["listing_type"], listing["title"],
             currency, price, tax, proceeds)
        )

        conn.commit()

    return {
        "ok": True,
        "message": f"Compra de '{listing['title']}' realizada com sucesso!",
        "listing": listing,
        "buyer_player": buyer_player,
        "tax_retained": tax,
        "currency": currency
    }


def get_server_hold_data(user: dict) -> dict:
    """Admin-only query to view Server Hold balances and transaction ledger."""
    if not user or not user.get("is_admin"):
        return {"ok": False, "error": "Acesso Negado: Apenas administradores do servidor possuem acesso ao Cofre do Servidor."}

    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT total_gold_tax, total_diamond_tax, total_transactions, updated_at FROM server_hold WHERE id = 1")
        hold_row = cursor.fetchone()
        hold = dict(hold_row) if hold_row else {"total_gold_tax": 0, "total_diamond_tax": 0, "total_transactions": 0}

        cursor.execute(
            """
            SELECT id, listing_id, seller_name, buyer_name, listing_type, title, currency,
                   gross_price, tax_amount, seller_proceeds, created_at
            FROM server_hold_transactions
            ORDER BY id DESC LIMIT 50
            """
        )
        txs = [dict(r) for r in cursor.fetchall()]

    return {
        "ok": True,
        "server_hold": hold,
        "transactions": txs
    }


def withdraw_server_hold(user: dict, target_username: str, amount_gold: int, amount_diamonds: int) -> dict:
    """Admin-only action to collect or distribute retained server taxes."""
    if not user or not user.get("is_admin"):
        return {"ok": False, "error": "Acesso Negado: Apenas administradores podem resgatar fundos do Cofre do Servidor."}

    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT total_gold_tax, total_diamond_tax FROM server_hold WHERE id = 1")
        row = cursor.fetchone()
        if not row:
            return {"ok": False, "error": "Cofre do Servidor indisponível."}

        cur_gold = row["total_gold_tax"]
        cur_dia = row["total_diamond_tax"]

        if amount_gold > cur_gold or amount_diamonds > cur_dia:
            return {"ok": False, "error": "Valor de saque maior que o saldo disponível no cofre."}

        cursor.execute(
            """
            UPDATE server_hold
            SET total_gold_tax = total_gold_tax - ?,
                total_diamond_tax = total_diamond_tax - ?
            WHERE id = 1
            """,
            (amount_gold, amount_diamonds)
        )
        conn.commit()

    return {
        "ok": True,
        "message": f"Fundos resgatados com sucesso: ${amount_gold:,} e 💎 {amount_diamonds}.",
        "remaining_gold": cur_gold - amount_gold,
        "remaining_diamonds": cur_dia - amount_diamonds
    }


def save_tester_feedback(user_id: int, username: str, category: str, rating: int, message: str, player_summary: str = "") -> dict:
    if not message or len(message.strip()) < 3:
        return {"ok": False, "error": "A mensagem deve conter pelo menos 3 caracteres."}

    now_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO tester_feedback (user_id, username, category, rating, message, player_summary, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (user_id, username, category, rating, message.strip(), player_summary, now_str)
        )
        feedback_id = cursor.lastrowid
        conn.commit()
        return {
            "ok": True,
            "id": feedback_id,
            "message": "Feedback enviado com sucesso! Agradecemos sua colaboração no teste de PokéLand."
        }


def get_tester_feedback_list(limit: int = 100) -> list:
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT id, user_id, username, category, rating, message, player_summary, created_at
            FROM tester_feedback
            ORDER BY id DESC
            LIMIT ?
            """,
            (limit,)
        )
        rows = cursor.fetchall()
        return [dict(r) for r in rows]
