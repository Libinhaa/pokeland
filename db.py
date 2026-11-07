import time
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
    conn.execute("PRAGMA cache_size = -64000")
    conn.execute("PRAGMA temp_store = MEMORY")
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
        # High-performance indexes
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_market_status ON market_listings(status, category)")

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

        # 9. Real Multiplayer Chat Messages Table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS chat_messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                channel TEXT NOT NULL,
                sender TEXT NOT NULL,
                recipient TEXT,
                text TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                timestamp_ms INTEGER NOT NULL
            )
            """
        )
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_chat_id ON chat_messages(id)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_chat_channel ON chat_messages(channel)")

        # 10. Player Friends & Social Relationships Table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS player_friends (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                friend_user_id INTEGER NOT NULL,
                friend_username TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, friend_user_id)
            )
            """
        )
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_friends_user ON player_friends(user_id)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_friends_fuser ON player_friends(friend_user_id)")
        conn.commit()

        # Check if users table is empty; if so, seed demo users first
        cursor.execute("SELECT COUNT(*) AS cnt FROM users")
        row = cursor.fetchone()
        if row and row["cnt"] == 0:
            seed_default_accounts(conn, existing_save, existing_config, default_player_func, species_by_id)
            conn.commit()
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

        # Seed realistic global market listings if table is fresh
        cursor.execute("SELECT COUNT(*) FROM market_listings")
        if cursor.fetchone()[0] == 0:
            seed_initial_market_listings(cursor)
            conn.commit()


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
    cursor.execute("SELECT id, username FROM users")
    user_map = {row["username"].lower(): row["id"] for row in cursor.fetchall()}
    fallback_seller_id = list(user_map.values())[0] if user_map else 1

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
        it_list = list(it)
        seller_name = it_list[1]
        it_list[0] = user_map.get(seller_name.lower(), fallback_seller_id)
        cursor.execute(
            """
            INSERT INTO market_listings (
                seller_id, seller_name, listing_type, title, category, currency, price,
                tax_amount, seller_proceeds, status, item_id, item_quantity, item_icon,
                item_desc, pokemon_uid, pokemon_data
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            it_list
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


def get_registered_users_list(limit: int = 200) -> list:
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT u.id, u.username, u.avatar_model, u.created_at, u.last_login, u.role, p.player_data, p.updated_at
            FROM users u
            LEFT JOIN player_saves p ON u.id = p.user_id
            ORDER BY u.id DESC
            LIMIT ?
            """,
            (limit,)
        )
        rows = cursor.fetchall()
        result = []
        for r in rows:
            u_dict = {
                "id": r["id"],
                "username": r["username"],
                "avatar_model": r["avatar_model"] or "ethan_gold",
                "created_at": r["created_at"],
                "last_login": r["last_login"],
                "role": r["role"] or "player",
                "level": 1,
                "gold": 0,
                "diamonds": 0,
                "party_count": 0,
                "has_save": False,
                "save_updated_at": r["updated_at"],
            }
            if r["player_data"]:
                try:
                    pdata = json.loads(r["player_data"])
                    u_dict["level"] = pdata.get("level", 1)
                    u_dict["gold"] = pdata.get("gold", 0)
                    u_dict["diamonds"] = pdata.get("diamonds", 0)
                    u_dict["party_count"] = len(pdata.get("party", []))
                    u_dict["has_save"] = True
                except Exception:
                    pass
            result.append(u_dict)
        return result



def save_chat_message(channel: str, sender: str, recipient: str or None, text: str, timestamp_ms: int = None) -> dict:
    if not timestamp_ms:
        timestamp_ms = int(time.time() * 1000)
    now_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO chat_messages (channel, sender, recipient, text, created_at, timestamp_ms)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (channel, sender, recipient, text, now_str, timestamp_ms),
        )
        msg_id = cursor.lastrowid
        conn.commit()
        return {
            "id": msg_id,
            "channel": channel,
            "sender": sender,
            "recipient": recipient,
            "text": text,
            "created_at": now_str,
            "timestamp_ms": timestamp_ms,
        }


def get_chat_messages(since_id: int = 0, limit: int = 50, user_name: str = None) -> list:
    with get_connection() as conn:
        cursor = conn.cursor()
        if user_name:
            cursor.execute(
                """
                SELECT id, channel, sender, recipient, text, created_at, timestamp_ms
                FROM chat_messages
                WHERE id > ? AND (channel != 'whisper' OR sender = ? OR recipient = ?)
                ORDER BY id ASC
                LIMIT ?
                """,
                (since_id, user_name, user_name, limit),
            )
        else:
            cursor.execute(
                """
                SELECT id, channel, sender, recipient, text, created_at, timestamp_ms
                FROM chat_messages
                WHERE id > ? AND channel != 'whisper'
                ORDER BY id ASC
                LIMIT ?
                """,
                (since_id, limit),
            )
        rows = cursor.fetchall()
        return [
            {
                "id": r["id"],
                "channel": r["channel"],
                "sender": r["sender"],
                "recipient": r["recipient"],
                "text": r["text"],
                "created_at": r["created_at"],
                "timestamp_ms": r["timestamp_ms"],
            }
            for r in rows
        ]


# =====================================================================
# 11. SOCIAL SYSTEM: FRIENDS, PROFILE INSPECTION & P2P ATOMIC TRADING
# =====================================================================

def add_friend(user_id: int, friend_username: str) -> dict:
    friend_username = (friend_username or "").strip()
    if not friend_username:
        return {"ok": False, "error": "Nome de treinador inválido."}

    with get_connection() as conn:
        cursor = conn.cursor()
        # Find friend user
        cursor.execute("SELECT id, username FROM users WHERE username = ? COLLATE NOCASE", (friend_username,))
        friend = cursor.fetchone()
        if not friend:
            return {"ok": False, "error": f"Treinador '{friend_username}' não foi encontrado!"}

        friend_id = friend["id"]
        if friend_id == user_id:
            return {"ok": False, "error": "Você não pode adicionar a si mesmo como amigo!"}

        # Check existing
        cursor.execute("SELECT id FROM player_friends WHERE user_id = ? AND friend_user_id = ?", (user_id, friend_id))
        if cursor.fetchone():
            return {"ok": True, "message": f"{friend['username']} já está na sua lista de amigos!"}

        cursor.execute(
            "INSERT INTO player_friends (user_id, friend_user_id, friend_username) VALUES (?, ?, ?)",
            (user_id, friend_id, friend["username"])
        )
        # Also make mutual friendship
        cursor.execute("SELECT username FROM users WHERE id = ?", (user_id,))
        me_user = cursor.fetchone()
        my_name = me_user["username"] if me_user else "Treinador"

        cursor.execute(
            "INSERT OR IGNORE INTO player_friends (user_id, friend_user_id, friend_username) VALUES (?, ?, ?)",
            (friend_id, user_id, my_name)
        )
        conn.commit()
        return {"ok": True, "message": f"🎉 {friend['username']} agora é seu amigo!"}


def remove_friend(user_id: int, friend_username: str) -> dict:
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "DELETE FROM player_friends WHERE user_id = ? AND friend_username = ? COLLATE NOCASE",
            (user_id, friend_username)
        )
        conn.commit()
        return {"ok": True, "message": f"{friend_username} foi removido da sua lista de amigos."}


def get_friends_list(user_id: int) -> list:
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT pf.friend_user_id AS id, pf.friend_username AS username,
                   u.avatar_model, u.created_at, ps.player_data
            FROM player_friends pf
            JOIN users u ON u.id = pf.friend_user_id
            LEFT JOIN player_saves ps ON ps.user_id = pf.friend_user_id
            WHERE pf.user_id = ?
            ORDER BY pf.friend_username ASC
            """,
            (user_id,)
        )
        rows = cursor.fetchall()
        friends = []
        for r in rows:
            level = 1
            party_lead = None
            if r["player_data"]:
                try:
                    p = json.loads(r["player_data"])
                    level = p.get("level", 1)
                    if p.get("party") and len(p["party"]) > 0:
                        m = p["party"][0]
                        party_lead = {
                            "name": m.get("name"),
                            "species_id": m.get("species_id"),
                            "dex_id": m.get("dex_id"),
                            "level": m.get("level", 1),
                            "is_shiny": bool(m.get("is_shiny", False)),
                            "quality": m.get("quality", "Comum")
                        }
                except Exception:
                    pass
            friends.append({
                "id": r["id"],
                "username": r["username"],
                "avatar_model": r["avatar_model"] or "ethan_gold",
                "level": level,
                "created_at": r["created_at"],
                "party_lead": party_lead
            })
        return friends


def get_player_public_profile(username_or_id) -> dict:
    with get_connection() as conn:
        cursor = conn.cursor()
        if isinstance(username_or_id, int) or (isinstance(username_or_id, str) and username_or_id.isdigit()):
            cursor.execute("SELECT id, username, avatar_model, role, created_at FROM users WHERE id = ?", (int(username_or_id),))
        else:
            cursor.execute("SELECT id, username, avatar_model, role, created_at FROM users WHERE username = ? COLLATE NOCASE", (str(username_or_id).strip(),))
        user = cursor.fetchone()
        if not user:
            return {"ok": False, "error": "Treinador não encontrado."}

        cursor.execute("SELECT player_data, updated_at FROM player_saves WHERE user_id = ?", (user["id"],))
        psave = cursor.fetchone()

        player = {}
        if psave and psave["player_data"]:
            try:
                player = json.loads(psave["player_data"])
            except Exception:
                player = {}

        raw_party = player.get("party", [])
        sanitized_party = []
        for m in raw_party[:6]:
            sanitized_party.append({
                "uid": m.get("uid"),
                "species_id": m.get("species_id"),
                "dex_id": m.get("dex_id", 1),
                "name": m.get("name", "Pokémon"),
                "level": m.get("level", 1),
                "hp": m.get("hp", 100),
                "max_hp": m.get("max_hp", 100),
                "elements": m.get("elements", ["normal"]),
                "quality": m.get("quality", "Comum"),
                "quality_multiplier": m.get("quality_multiplier", 1.0),
                "is_shiny": bool(m.get("is_shiny", False)),
                "moves": m.get("moves", ["tackle"]),
                "iv_total": m.get("iv_total", 0),
                "nature": m.get("nature", "Hardy"),
                "gender": m.get("gender", "neutral"),
                "stats": m.get("stats", {})
            })

        return {
            "ok": True,
            "user_id": user["id"],
            "username": user["username"],
            "avatar_model": user["avatar_model"] or "ethan_gold",
            "role": user["role"] or "player",
            "created_at": user["created_at"],
            "level": player.get("level", 1),
            "pokedex_count": len(player.get("pokedex_caught", [])),
            "gold": player.get("gold", 0),
            "diamonds": player.get("diamonds", 0),
            "party": sanitized_party,
            "last_active": psave["updated_at"] if psave else user["created_at"]
        }


def execute_p2p_trade_db(user_a_id: int, user_b_id: int, offer_a: dict, offer_b: dict) -> dict:
    with get_connection() as conn:
        save_a = get_player_save(user_a_id)
        save_b = get_player_save(user_b_id)
        if not save_a or not save_b:
            return {"ok": False, "error": "Erro ao carregar dados salvos dos jogadores."}

        p_a = save_a["player"]
        p_b = save_b["player"]

        gold_a = max(0, int(offer_a.get("gold", 0)))
        gold_b = max(0, int(offer_b.get("gold", 0)))
        items_a = offer_a.get("items", [])  # list of {"item_id": id, "qty": qty}
        items_b = offer_b.get("items", [])
        mon_a_uid = offer_a.get("mon_uid")
        mon_b_uid = offer_b.get("mon_uid")

        # 1. Validate Gold
        if (p_a.get("gold") or 0) < gold_a:
            return {"ok": False, "error": "Treinador 1 não possui ouro suficiente."}
        if (p_b.get("gold") or 0) < gold_b:
            return {"ok": False, "error": "Treinador 2 não possui ouro suficiente."}

        # 2. Validate Items
        inv_a = p_a.setdefault("inventory", {})
        for it in items_a:
            iid = it.get("item_id")
            iqty = int(it.get("qty", 1))
            if inv_a.get(iid, 0) < iqty:
                return {"ok": False, "error": f"Item '{iid}' insuficiente no inventário do Treinador 1."}

        inv_b = p_b.setdefault("inventory", {})
        for it in items_b:
            iid = it.get("item_id")
            iqty = int(it.get("qty", 1))
            if inv_b.get(iid, 0) < iqty:
                return {"ok": False, "error": f"Item '{iid}' insuficiente no inventário do Treinador 2."}

        # 3. Validate & Retrieve Pokémon
        mon_a_obj = None
        if mon_a_uid:
            all_a = p_a.get("party", []) + p_a.get("pc_box", [])
            mon_a_obj = next((m for m in all_a if m.get("uid") == mon_a_uid), None)
            if not mon_a_obj:
                return {"ok": False, "error": "Pokémon oferecido pelo Treinador 1 não encontrado."}
            if len(p_a.get("party", [])) <= 1 and mon_a_obj in p_a.get("party", []) and len(p_a.get("pc_box", [])) == 0:
                return {"ok": False, "error": "Não é permitido trocar o único Pokémon do Treinador 1!"}

        mon_b_obj = None
        if mon_b_uid:
            all_b = p_b.get("party", []) + p_b.get("pc_box", [])
            mon_b_obj = next((m for m in all_b if m.get("uid") == mon_b_uid), None)
            if not mon_b_obj:
                return {"ok": False, "error": "Pokémon oferecido pelo Treinador 2 não encontrado."}
            if len(p_b.get("party", [])) <= 1 and mon_b_obj in p_b.get("party", []) and len(p_b.get("pc_box", [])) == 0:
                return {"ok": False, "error": "Não é permitido trocar o único Pokémon do Treinador 2!"}

        # EXECUTE ATOMIC EXCHANGE
        # A. Swap Gold
        p_a["gold"] = p_a.get("gold", 0) - gold_a + gold_b
        p_b["gold"] = p_b.get("gold", 0) - gold_b + gold_a

        # B. Swap Items
        for it in items_a:
            iid = it.get("item_id")
            iqty = int(it.get("qty", 1))
            inv_a[iid] -= iqty
            if inv_a[iid] <= 0:
                del inv_a[iid]
            inv_b[iid] = inv_b.get(iid, 0) + iqty

        for it in items_b:
            iid = it.get("item_id")
            iqty = int(it.get("qty", 1))
            inv_b[iid] -= iqty
            if inv_b[iid] <= 0:
                del inv_b[iid]
            inv_a[iid] = inv_a.get(iid, 0) + iqty

        # C. Swap Pokémon
        if mon_a_obj:
            if mon_a_obj in p_a.get("party", []):
                p_a["party"].remove(mon_a_obj)
            elif mon_a_obj in p_a.get("pc_box", []):
                p_a["pc_box"].remove(mon_a_obj)
            p_b.setdefault("pc_box", []).append(mon_a_obj)
            sid = mon_a_obj.get("species_id")
            if sid and sid not in p_b.setdefault("pokedex_caught", []):
                p_b["pokedex_caught"].append(sid)

        if mon_b_obj:
            if mon_b_obj in p_b.get("party", []):
                p_b["party"].remove(mon_b_obj)
            elif mon_b_obj in p_b.get("pc_box", []):
                p_b["pc_box"].remove(mon_b_obj)
            p_a.setdefault("pc_box", []).append(mon_b_obj)
            sid = mon_b_obj.get("species_id")
            if sid and sid not in p_a.setdefault("pokedex_caught", []):
                p_a["pokedex_caught"].append(sid)

        save_player_save(user_a_id, p_a, save_a.get("config"))
        save_player_save(user_b_id, p_b, save_b.get("config"))

        return {
            "ok": True,
            "message": "Troca realizada com sucesso!",
            "received_gold": gold_b,
            "received_items": items_b,
            "received_mon": mon_b_obj.get("name") if mon_b_obj else None
        }

# ==============================================================================
# POKELAND ADMIN BOARD & GOD-MODE SYSTEM (DATABASE OPERATIONS)
# ==============================================================================

def admin_update_player_account(user_id: int, role: str = None, level: int = None, gold: int = None, diamonds: int = None) -> dict:
    with get_connection() as conn:
        cursor = conn.cursor()
        if role is not None and role in ("player", "moderator", "admin", "banned"):
            cursor.execute("UPDATE users SET role = ? WHERE id = ?", (role, user_id))

        save_obj = get_player_save(user_id)
        if save_obj and save_obj.get("player"):
            p = save_obj["player"]
            if level is not None:
                p["level"] = max(1, min(500, int(level)))
            if gold is not None:
                p["gold"] = max(0, int(gold))
            if diamonds is not None:
                p["diamonds"] = max(0, int(diamonds))
            save_player_save(user_id, p, save_obj.get("config"))

        return {"ok": True, "message": "Conta e dados salvos do jogador atualizados com sucesso!"}

def admin_heal_player_party(user_id: int) -> dict:
    save_obj = get_player_save(user_id)
    if not save_obj or not save_obj.get("player"):
        return {"ok": False, "error": "Save do jogador não encontrado."}
    p = save_obj["player"]
    party = p.get("party", [])
    for m in party:
        max_hp = m.get("max_hp") or (m.get("stats", {}).get("hp", 100))
        m["hp"] = max_hp
    save_player_save(user_id, p, save_obj.get("config"))
    return {"ok": True, "message": f"Equipe de {len(party)} Pokémon totalmente curada e revivida!"}

def admin_inject_item_into_player(user_id: int, item_id: str, qty: int) -> dict:
    save_obj = get_player_save(user_id)
    if not save_obj or not save_obj.get("player"):
        return {"ok": False, "error": "Save do jogador não encontrado."}
    p = save_obj["player"]
    inv = p.setdefault("inventory", {})
    cur_qty = inv.get(item_id, 0)
    new_qty = max(0, cur_qty + int(qty))
    if new_qty > 0:
        inv[item_id] = new_qty
    else:
        inv.pop(item_id, None)
    save_player_save(user_id, p, save_obj.get("config"))
    return {"ok": True, "message": f"Item {item_id} injetado com sucesso! Nova quantidade: {new_qty}."}

def admin_inject_pokemon_into_player(user_id: int, pokemon_data: dict, target_storage: str = "party") -> dict:
    save_obj = get_player_save(user_id)
    if not save_obj or not save_obj.get("player"):
        return {"ok": False, "error": "Save do jogador não encontrado."}
    p = save_obj["player"]
    if target_storage == "party" and len(p.setdefault("party", [])) < 6:
        p["party"].append(pokemon_data)
        dest_str = "Equipe Ativa"
    else:
        p.setdefault("pc_box", []).append(pokemon_data)
        dest_str = "PC Box"
    sid = pokemon_data.get("species_id")
    if sid and sid not in p.setdefault("pokedex_caught", []):
        p["pokedex_caught"].append(sid)
    save_player_save(user_id, p, save_obj.get("config"))
    return {"ok": True, "message": f"Pokémon {pokemon_data.get('name')} gerado com sucesso em {dest_str}!"}

def admin_reset_player_position(user_id: int, map_id: int = 0, gx: int = 8, gy: int = 8) -> dict:
    save_obj = get_player_save(user_id)
    if not save_obj or not save_obj.get("player"):
        return {"ok": False, "error": "Save do jogador não encontrado."}
    p = save_obj["player"]
    p["map_id"] = map_id
    p["gx"] = gx
    p["gy"] = gy
    save_player_save(user_id, p, save_obj.get("config"))
    return {"ok": True, "message": "Posição do jogador resetada para a Praça Central (x:8, y:8)."}

def admin_toggle_ban_user(user_id: int, banned: bool = True) -> dict:
    with get_connection() as conn:
        cursor = conn.cursor()
        new_role = "banned" if banned else "player"
        cursor.execute("UPDATE users SET role = ? WHERE id = ?", (new_role, user_id))
        if banned:
            cursor.execute("DELETE FROM sessions WHERE user_id = ?", (user_id,))
        return {"ok": True, "message": f"Status da conta atualizado: role = {new_role}."}

def admin_get_server_diagnostics() -> dict:
    import os
    db_size = os.path.getsize(DB_PATH) if os.path.exists(DB_PATH) else 0
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) as c FROM users")
        users_count = cursor.fetchone()["c"]
        cursor.execute("SELECT COUNT(*) as c FROM player_saves")
        saves_count = cursor.fetchone()["c"]
        cursor.execute("SELECT COUNT(*) as c FROM tester_feedback")
        fb_count = cursor.fetchone()["c"]
        cursor.execute("SELECT COUNT(*) as c FROM chat_messages")
        msg_count = cursor.fetchone()["c"]
        cursor.execute("SELECT COUNT(*) as c FROM market_listings WHERE status = 'active'")
        market_count = cursor.fetchone()["c"]
        cursor.execute("SELECT COUNT(*) as c FROM player_friends")
        friends_count = cursor.fetchone()["c"]

        return {
            "ok": True,
            "db_size_bytes": db_size,
            "db_size_mb": round(db_size / (1024 * 1024), 2),
            "users_count": users_count,
            "saves_count": saves_count,
            "feedbacks_count": fb_count,
            "messages_count": msg_count,
            "active_market_listings": market_count,
            "friendships_count": friends_count,
            "sqlite_version": sqlite3.sqlite_version
        }

def admin_export_backup_json() -> dict:
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, username, avatar_model, role, created_at, last_login FROM users")
        users = [dict(r) for r in cursor.fetchall()]

        cursor.execute("SELECT user_id, player_data, config_data, updated_at FROM player_saves")
        saves = [dict(r) for r in cursor.fetchall()]

        cursor.execute("SELECT * FROM tester_feedback ORDER BY id DESC")
        feedbacks = [dict(r) for r in cursor.fetchall()]

        cursor.execute("SELECT * FROM market_listings WHERE status = 'active'")
        listings = [dict(r) for r in cursor.fetchall()]

        return {
            "ok": True,
            "exported_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC"),
            "users": users,
            "saves": saves,
            "feedbacks": feedbacks,
            "market_listings": listings
        }
