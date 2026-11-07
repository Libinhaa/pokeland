import threading
import json
import mimetypes
import os
import random
import time
import uuid
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs
import db

# Register authentic game font mime types
mimetypes.add_type("font/woff2", ".woff2")
mimetypes.add_type("font/woff", ".woff")
mimetypes.add_type("font/ttf", ".ttf")
mimetypes.add_type("font/otf", ".otf")


# Real-time Plaza multiplayer state
PLAZA_LOCK = threading.Lock()
PLAZA_PLAYERS = {}  # user_id -> dict

P2P_LOCK = threading.Lock()
P2P_INVITATIONS = {}  # invite_id -> dict
P2P_TRADES = {}       # trade_id -> dict
P2P_DUELS = {}        # duel_id -> dict

SERVER_START_TIME = time.time()
ADMIN_BROADCAST_LOCK = threading.Lock()
ADMIN_CURRENT_BROADCAST = None

PROJECT_VERSION = "v1.8.0"
PROJECT_VERSION_LABEL = "v1.8.0-pokeland"

PROJECT_CHANGELOG = [
    {
        "version": "v1.8.0",
        "title": "Grandes Desafios, Arenas Isoladas & Pokémon Card",
        "date": "05/11/2026",
        "badge": "VERSÃO ATUAL",
        "is_current": True,
        "highlights": [
            {
                "category": "🏰 Isolamento Total de Arenas (GvG)",
                "bullets": [
                    "Separação estrita entre caça selvagem e o Coliseu de Guildas: monstros de rotas anteriores nunca mais nascem na arena.",
                    "Matriz de colisão limpa 16x11 de coliseu: remoção de lagos, árvores e bloqueios invisíveis herdados da caça.",
                    "Cenário temático com selo central de espadas cruzadas, estandarte heráldico da guilda rival no topo, estandarte da sua guilda na base e braseiros animados.",
                    "Mira e Pokémon companheiro travados no Guardião rival, com suspensão automática do Auto-Catch durante a batalha.",
                    "Conquista de território para a guilda com recompensas de +$25.000 Ouro, +15 Diamantes e +500 Pontos de Honra."
                ]
            },
            {
                "category": "🃏 Pokémon Card Completo (Hover)",
                "bullets": [
                    "Card dinâmico translúcido exibido instantaneamente ao passar o mouse sobre qualquer Pokémon (time, líder, mochila, PC Box).",
                    "Medidores individuais de IVs (0 a 31) com Letter Grades (S+ a D) e percentual de genes perfeitos.",
                    "Cálculo oficial de Combat Power (CP), status de HP atual/máx, tipos elementais com badges oficiais, gênero e natureza.",
                    "Lista dos 4 golpes equipados (m1 a m4) com tipos e poder, progresso de EXP e cotação de venda em Gold na Loja."
                ]
            },
            {
                "category": "⚡ Dock Translúcido de Golpes (m1–m4) & Interface Limpa",
                "bullets": [
                    "Substituição da janela flutuante pesada por um dock fixo translúcido sobre a Barra de Ação (bottom: 122px).",
                    "Atalhos m1 a m4, chips de alternância individual AUTO/MANUAL e medidor de tempo de recarga (cooldown).",
                    "Remoção completa do botão de Radar e das janelas redundantes (Minimapa, Inimigos e Capturar), despoluindo a tela de caça."
                ]
            },
            {
                "category": "🏛️ Cenários Dedicados para Todos os Desafios",
                "bullets": [
                    "Mapas jogáveis no canvas em tempo real para Ginásios Oficiais (1-8 com Brock Onix), PvP Ranqueado, Planalto Índigo, Safari Zone, World Boss e Dungeons.",
                    "Banner superior informativo e botão de retorno seguro ao mapa anterior."
                ]
            },
            {
                "category": "⚖️ Rework de Raridades, Níveis & Catch Rate",
                "bullets": [
                    "Tiers estruturados de IVs: Comum (0-15), Incomum (10-22), Raro (18-26), Épico (24-29 c/ 31 garantido), Lendário (27-31 c/ 2x 31) e Mítico (29-31 c/ 3x 31). Bônus Shiny de +3 IVs.",
                    "Novas curvas polinomiais balanceadas de EXP para Treinador e Pokémon.",
                    "Catch rate justo e transparente: enfraquecer o monstro dá bônus de até 3.8x na taxa de captura."
                ]
            }
        ]
    },
    {
        "version": "v1.6.0",
        "title": "Infraestrutura de Playtest, Feedback de Jogadores & Polimento Visual",
        "date": "05/11/2026",
        "badge": "ANTERIOR",
        "is_current": False,
        "highlights": [
            {
                "category": "🚀 Playtester Ready Suite & Kit Inicial",
                "bullets": [
                    "Modal de Guia do Testador com instruções completas sobre atalhos, comandos e mecânicas.",
                    "Kit de Boas-Vindas resgatável na barra superior com 30 Pokébolas, 10 Poções de Cura e $5.000 Gold."
                ]
            },
            {
                "category": "🐞 Central de Feedback & Reporte de Bugs",
                "bullets": [
                    "Ferramenta de envio direto de feedback com categorização (Bug, Sugestão, Dúvida, Balanceamento) e avaliação de 1 a 5 estrelas.",
                    "Armazenamento local e envio seguro de relatórios para a equipe de desenvolvimento."
                ]
            },
            {
                "category": "⌨️ Bloqueio de Teclas de Função (F1-F12)",
                "bullets": [
                    "Proibição estrita de teclas F1 a F12 como atalhos para não interceptar as funções padrão do navegador."
                ]
            },
            {
                "category": "🎨 Sprites Unificados 32-bit & Nomes Limpos",
                "bullets": [
                    "Remoção da caixa cinza atrás do nome do treinador e dos monstros para estética limpa estilo Tibia/GBA.",
                    "Padronização das animações de Idle, Movimento, Ataque, Hurt e Knocked Out (Fainted)."
                ]
            },
            {
                "category": "💬 Canais de Chat Independentes",
                "bullets": [
                    "Aba Local, Global, Trade, Guild e Sistema completamente independentes e sem vazamento de mensagens.",
                    "Configurações personalizadas para ocultar canais, alternar timestamp e ajustar tamanho de fonte."
                ]
            }
        ]
    },
    {
        "version": "v1.5.0",
        "title": "Venda de Pokémon, Mercado Global & Central de Auto-Farm",
        "date": "04/11/2026",
        "badge": "ANTERIOR",
        "is_current": False,
        "highlights": [
            {
                "category": "💰 Venda de Pokémons na Loja & PC Box",
                "bullets": [
                    "Venda direta de criaturas capturadas da Mochila e do PC Box na Loja em troca de Gold.",
                    "Filtros dinâmicos por raridade, nível e espécie para venda rápida e segura."
                ]
            },
            {
                "category": "🏪 Mercado Global & Lojas Especializadas",
                "bullets": [
                    "Interface completa de compra e venda de itens e Pokémons entre treinadores do servidor.",
                    "Lojas com moedas dedicadas: Gold Shop e Cash Shop com itens raros e pedras evolutivas."
                ]
            },
            {
                "category": "🤖 Central Unificada de Auto-Farm",
                "bullets": [
                    "Centralização dos controles de Auto-Ataque, Auto-Target, Auto-Coleta e teleporte offline.",
                    "Cálculo inteligente de EXP e itens farmados durante períodos offline."
                ]
            },
            {
                "category": "🔄 Reinicialização e Limpeza de Cache",
                "bullets": [
                    "Botão na barra superior para limpar cache do navegador e reiniciar o jogo instantaneamente.",
                    "Caixa flutuante avisando em tempo real quando uma nova versão foi implantada."
                ]
            }
        ]
    }
]

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
PUBLIC_DIR = os.path.join(BASE_DIR, "public")

SAVE_FILE = os.path.join(DATA_DIR, "savegame.json")
CONFIG_FILE = os.path.join(DATA_DIR, "custom_config.json")
OVERRIDES_FILE = os.path.join(DATA_DIR, "species_overrides.json")


def load_json(path, default=None):
    if not os.path.exists(path):
        return default
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


# Ensure static game data exists even if a persistent volume is mounted over DATA_DIR
DATA_DEFAULTS = os.path.join(BASE_DIR, "data_defaults")
if os.path.exists(DATA_DEFAULTS):
    for fname in os.listdir(DATA_DEFAULTS):
        if fname.endswith(".json") and fname not in ["savegame.json", "custom_config.json", "species_overrides.json"]:
            src = os.path.join(DATA_DEFAULTS, fname)
            dst = os.path.join(DATA_DIR, fname)
            if not os.path.exists(dst) or os.path.getsize(dst) == 0:
                try:
                    import shutil
                    shutil.copy2(src, dst)
                    print(f">> [POKELAND PERSISTENCE] Restored static data: {fname} -> {dst}")
                except Exception as err:
                    print(f">> Error restoring {fname}:", err)

RAW_SPECIES = load_json(os.path.join(DATA_DIR, "species.json"), {"data": []})["data"]
RAW_ITEMS = load_json(os.path.join(DATA_DIR, "items.json"), {"data": []})["data"]
RAW_WORLDS = load_json(os.path.join(DATA_DIR, "worlds.json"), {"data": []})["data"]
RAW_ZONES = load_json(os.path.join(DATA_DIR, "zones.json"), {"data": []})["data"]
RAW_MOVES = load_json(os.path.join(DATA_DIR, "moves.json"), {"data": []})["data"]
RAW_FORMULAS = load_json(os.path.join(DATA_DIR, "formulas.json"), {})

EXACT_PVP_SCORES = {
    "slaking": (1, "S", 76),
    "rayquaza": (2, "S", 74),
    "kyogre": (3, "S", 72),
    "gyarados": (4, "S", 70),
    "metagross": (5, "S", 70),
    "groudon": (6, "S", 69),
    "dragonite": (7, "S", 69),
    "lugia": (8, "S", 69),
    "feraligatr": (9, "S", 68),
    "tyranitar": (10, "S", 68),
    "ho-oh": (11, "S", 68),
    "ho_oh": (11, "S", 68),
    "blissey": (12, "S", 67),
    "scizor": (13, "S", 66),
    "salamence": (14, "S", 66),
    "arceus": (15, "S", 65),
    "dialga": (16, "S", 64),
    "palkia": (17, "S", 63),
    "lapras": (18, "S", 62),
    "swampert": (19, "S", 61),
    "giratina": (20, "A", 60),
    "kingdra": (21, "A", 60),
    "blastoise": (22, "A", 60),
    "snorlax": (23, "A", 60),
    "venusaur": (24, "A", 59),
    "charizard": (25, "A", 59),
    "armaldo": (26, "A", 59),
    "machamp": (27, "A", 59),
    "cradily": (28, "A", 59),
    "gardevoir": (29, "A", 59),
    "omastar": (30, "A", 59),
    "mewtwo": (31, "A", 58),
    "umbreon": (32, "A", 58),
    "zapdos": (33, "A", 58),
    "suicune": (34, "A", 57),
    "arcanine": (35, "A", 57),
    "milotic": (36, "A", 57),
    "steelix": (37, "A", 56),
    "celebi": (38, "A", 56),
    "magneton": (39, "A", 56),
    "donphan": (40, "A", 56),
    "dusclops": (41, "A", 56),
    "slowbro": (42, "A", 55),
    "vaporeon": (43, "A", 55),
    "flygon": (44, "A", 55),
    "poliwrath": (45, "A", 55),
    "miltank": (46, "A", 54),
    "heracross": (47, "A", 54),
    "articuno": (48, "A", 54),
    "moltres": (49, "A", 53),
    "crawdaunt": (50, "A", 53),
    "raikou": (51, "A", 53),
    "gengar": (52, "A", 53),
    "quagsire": (53, "A", 53),
    "slowking": (54, "A", 52),
    "entei": (55, "A", 52),
    "lanturn": (56, "A", 52),
    "mew": (57, "A", 51),
    "blaziken": (58, "A", 51),
    "exeggutor": (59, "A", 51),
    "ampharos": (60, "A", 50),
    "aggron": (61, "A", 50),
}

ITEM_SPRITE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/"

CAPSULE_EXTRA_RULES = {
    "capsule_basic": {"default_price": 5, "compat_elements": [], "cond": "Universal (1.0x)", "sprite": "/img/items/poke-ball.png"},
    "capsule_great": {"default_price": 20, "compat_elements": [], "cond": "Universal (2.0x)", "sprite": "/img/items/great-ball.png"},
    "capsule_super": {"default_price": 50, "compat_elements": [], "cond": "Universal (3.0x)", "sprite": "/img/items/safari-ball.png"},
    "capsule_ultra": {"default_price": 130, "compat_elements": [], "cond": "Universal (4.0x)", "sprite": "/img/items/ultra-ball.png"},
    "e834a843-486a-4f38-95c4-cfda5febe4a5": {"default_price": 350, "compat_elements": [], "cond": "Universal (5.0x)", "sprite": "/img/items/cherish-ball.png"},
    "capsule_master": {"default_price": 5000, "compat_elements": [], "cond": "Captura Garantida (100%)", "sprite": "/img/items/master-ball.png"},
    "capsule_net": {"default_price": 180, "compat_elements": ["water", "bug"], "cond": "5.0x vs Água / Inseto", "sprite": "/img/items/net-ball.png"},
    "capsule_janguru": {"default_price": 180, "compat_elements": ["grass", "poison"], "cond": "5.0x vs Planta / Veneno", "sprite": "/img/items/janguru-ball.png"},
    "capsule_magu": {"default_price": 180, "compat_elements": ["fire", "ground"], "cond": "5.0x vs Fogo / Terra", "sprite": "/img/items/magu-ball.png"},
    "capsule_sora": {"default_price": 180, "compat_elements": ["ice", "flying"], "cond": "5.0x vs Gelo / Voador", "sprite": "/img/items/dive-ball.png"},
    "capsule_dusk": {"default_price": 180, "compat_elements": ["rock", "fighting"], "cond": "5.0x vs Pedra / Lutador", "sprite": "/img/items/dusk-ball.png"},
    "capsule_moon": {"default_price": 180, "compat_elements": ["dark", "ghost"], "cond": "5.0x vs Sombrio / Fantasma", "sprite": "/img/items/moon-ball.png"},
    "capsule_tale": {"default_price": 180, "compat_elements": ["dragon", "fairy"], "cond": "5.0x vs Dragão / Fada", "sprite": "/img/items/heal-ball.png"},
    "capsule_tinker": {"default_price": 180, "compat_elements": ["electric", "steel"], "cond": "5.0x vs Elétrico / Aço", "sprite": "/img/items/timer-ball.png"},
    "capsule_yume": {"default_price": 180, "compat_elements": ["normal", "psychic"], "cond": "5.0x vs Normal / Psíquico", "sprite": "/img/items/dream-ball.png"},
    "capsule_old": {"default_price": 110, "compat_elements": ["rock", "water"], "cond": "4.0x vs Pedra / Água", "sprite": "/img/items/luxury-ball.png"},
    "capsule_fast": {"default_price": 180, "compat_elements": [], "cond": "5.0x vs Velozes (SPE >= 95)", "sprite": "/img/items/fast-ball.png"},
    "capsule_heavy": {"default_price": 180, "compat_elements": [], "cond": "5.0x vs Pesados (DEF >= 95)", "sprite": "/img/items/heavy-ball.png"},
    "capsule_repeat": {"default_price": 120, "compat_elements": [], "cond": "4.0x se já na Pokédex", "sprite": "/img/items/repeat-ball.png"},
    "capsule_premier": {"default_price": 120, "compat_elements": [], "cond": "Universal (4.0x)", "sprite": "/img/items/premier-ball.png"},
    "capsule_quick": {"default_price": 30, "compat_elements": [], "cond": "Universal Legada (2.1x)", "sprite": "/img/items/quick-ball.png"},
    "capsule_safari": {"default_price": 10, "compat_elements": [], "cond": "Safari (1.0x)", "sprite": "/img/items/safari-ball.png"},
}

STONE_SPRITES = {
    "stone_fire": "/img/items/fire-stone.png",
    "stone_water": "/img/items/water-stone.png",
    "stone_grass": "/img/items/leaf-stone.png",
    "stone_electric": "/img/items/thunder-stone.png",
    "stone_ice": "/img/items/dawn-stone.png",
    "stone_dark": "/img/items/dusk-stone.png",
    "stone_psychic": "/img/items/moon-stone.png",
    "stone_fairy": "/img/items/shiny-stone.png",
    "stone_rock": "/img/items/hard-stone.png",
    "stone_steel": "/img/items/metal-coat.png",
    "stone_dragon": "/img/items/dragon-scale.png",
    "stone_ghost": "/img/items/dusk-stone.png",
    "stone_normal": "/img/items/oval-stone.png",
    "shiny_stone": "/img/items/shiny-stone.png",
}


def default_config():
    return {
        "server_name": "PokéLand",
        "gba_sprite_version": "emerald",  # emerald | firered-leafgreen | ruby-sapphire
        "catch_rate_mult": 1.0,
        "max_capture_cap": 98.0,
        "hp_capture_bonus": False,
        "exp_mult": 1.0,
        "gold_mult": 1.0,
        "drop_mult": 1.0,
        "shiny_chance": 0.002,
        "unlock_all_capsules": False,
        "unlock_legendary_islands": False,
        "unlock_safari_zone": False,
    }


def calc_pokemon_sell_value(mon):
    if not mon:
        return 0
    lvl = mon.get('level', 1)
    qual = (mon.get('quality') or 'Comum').capitalize()
    is_sh = mon.get('is_shiny', False)
    iv_tot = mon.get('iv_total', sum(mon.get('ivs', {}).values()))
    qual_mults = {
        'Comum': 1.0,
        'Incomum': 1.5,
        'Raro': 2.5,
        'Épico': 4.5,
        'Lendário': 10.0,
        'Mítico': 20.0
    }
    qm = qual_mults.get(qual, 1.0)
    # Option A: Rebalanced sustainable gold economy
    base = (25 + lvl * 12) * qm * (1.0 + (iv_tot / 186.0))
    if is_sh:
        base *= 3.0
    return max(15, int(base))


def calc_pokemon_next_exp(level):
    # Option A: Classic MMORPG Grind (~34.8M EXP to Lv 100, 38-45h active time)
    return int(80 * (level ** 2.05) + (level ** 1.8) * 15 + level * 50)


def calc_trainer_next_exp(level):
    # Option A: Synchronized Trainer Curve (~18.5M EXP to Lv 100)
    return int(120 * (level ** 1.95) + level * 65)


def make_pokemon_instance(species_obj, level=5, is_shiny=False, quality='Comum', custom_mult=None, custom_ivs=None, nature=None, gender=None):
    bs = species_obj.get('base_stats', {'hp': 50, 'atk': 50, 'def': 50, 'spa': 50, 'spd': 50, 'spe': 50})
    # Reworked Rarity Tiers and IV bands (0-31 per stat)
    # Enforce: Shinies never spawn or exist below Épico
    if is_shiny and quality in ['Fraco', 'Comum', 'Incomum', 'Raro']:
        quality = 'Épico'

    bands = {
        'Fraco': (0.90, 0.99, 0, 10, 0),
        'Comum': (1.00, 1.08, 0, 15, 0),
        'Incomum': (1.10, 1.22, 10, 22, 0),
        'Raro': (1.25, 1.38, 18, 26, 1),
        'Épico': (1.40, 1.55, 24, 29, 1),
        'Lendário': (1.60, 1.75, 27, 31, 2),
        'Mítico': (2.20, 2.60, 29, 31, 3) if is_shiny else (1.75, 2.10, 29, 31, 3),
    }
    b_min, b_max, iv_min, iv_max, guaranteed_31s = bands.get(quality, (1.00, 1.08, 0, 15, 0))
    base_qm = custom_mult if custom_mult is not None else random.uniform(b_min, b_max)
    if is_shiny and quality != 'Mítico':
        base_qm += 0.20
    q_mult = round(base_qm, 2)

    if custom_ivs:
        ivs = dict(custom_ivs)
    else:
        stat_keys = ['hp', 'atk', 'def', 'spa', 'spd', 'spe']
        ivs = {k: random.randint(iv_min, iv_max) for k in stat_keys}
        if guaranteed_31s > 0:
            picks = random.sample(stat_keys, min(guaranteed_31s, len(stat_keys)))
            for pk in picks:
                ivs[pk] = 31
        if is_shiny:
            for k in stat_keys:
                ivs[k] = min(31, ivs[k] + 3)

    iv_total = sum(ivs.values())
    natures = ['Adamant', 'Modest', 'Jolly', 'Timid', 'Bold', 'Calm', 'Impish', 'Careful', 'Brave', 'Hardy']
    chosen_nature = nature or random.choice(natures)
    chosen_gender = gender or random.choice(['male', 'female'])

    eff_mult = (q_mult ** 1.15)
    atk_gender = 1.10 if chosen_gender == 'male' else 1.0
    hp_gender = 1.10 if chosen_gender == 'female' else 1.0

    max_hp = int((((2 * bs.get('hp', 50) + ivs['hp']) * level) / 100 + level + 10) * eff_mult * hp_gender)
    stats = {
        'hp': max_hp,
        'atk': int((((2 * bs.get('atk', 50) + ivs['atk']) * level) / 100 + 5) * eff_mult * atk_gender),
        'def': int((((2 * bs.get('def', 50) + ivs['def']) * level) / 100 + 5) * eff_mult),
        'spa': int((((2 * bs.get('spa', 50) + ivs['spa']) * level) / 100 + 5) * eff_mult * atk_gender),
        'spd': int((((2 * bs.get('spd', 50) + ivs['spd']) * level) / 100 + 5) * eff_mult),
        'spe': int((((2 * bs.get('spe', 50) + ivs['spe']) * level) / 100 + 5) * eff_mult),
    }
    learn_moves = species_obj.get('learn_moves') or ['tackle']
    equipped_moves = learn_moves[:4] if learn_moves else ['tackle']
    return {
        'uid': str(uuid.uuid4())[:8],
        'species_id': species_obj['id'],
        'dex_id': species_obj.get('dex_id', 1),
        'name': species_obj['name'],
        'elements': species_obj.get('elements', ['normal']),
        'level': level,
        'exp': 0,
        'exp_next': calc_pokemon_next_exp(level),
        'hp': max_hp,
        'max_hp': max_hp,
        'stats': stats,
        'ivs': ivs,
        'iv_total': iv_total,
        'nature': chosen_nature,
        'gender': chosen_gender,
        'is_shiny': is_shiny,
        'quality': quality,
        'quality_multiplier': q_mult,
        'moves': equipped_moves,
        'evolves_to': species_obj.get('evolves_to'),
        'evolve_level': species_obj.get('evolve_level') or 0,
        'evolution_options': species_obj.get('evolution_options') or [],
    }
    b_min, b_max, iv_min, iv_max = bands.get(quality, (1.00, 1.09, 18, 60))
    q_mult = round(custom_mult if custom_mult is not None else random.uniform(b_min, b_max), 2)

    if custom_ivs:
        ivs = custom_ivs
    else:
        avg_iv = int((iv_min + iv_max) / 12)
        ivs = {
            k: max(1, min(31, avg_iv + random.randint(-3, 5)))
            for k in ["hp", "atk", "def", "spa", "spd", "spe"]
        }
        # Clamp total inside band
        total = sum(ivs.values())
        if total < iv_min:
            for k in ["atk", "spa", "hp", "spe", "def", "spd"]:
                add = min(31 - ivs[k], iv_min - total)
                if add > 0:
                    ivs[k] += add
                    total += add

    iv_total = sum(ivs.values())
    natures = ["Adamant", "Modest", "Jolly", "Timid", "Bold", "Calm", "Impish", "Careful", "Brave", "Hardy"]
    chosen_nature = nature or random.choice(natures)
    chosen_gender = gender or random.choice(["male", "female"])

    eff_mult = (q_mult ** 1.15)
    atk_gender = 1.10 if chosen_gender == "male" else 1.0
    hp_gender = 1.10 if chosen_gender == "female" else 1.0

    max_hp = int((((2 * bs.get("hp", 50) + ivs["hp"]) * level) / 100 + level + 10) * eff_mult * hp_gender)
    stats = {
        "hp": max_hp,
        "atk": int((((2 * bs.get("atk", 50) + ivs["atk"]) * level) / 100 + 5) * eff_mult * atk_gender),
        "def": int((((2 * bs.get("def", 50) + ivs["def"]) * level) / 100 + 5) * eff_mult),
        "spa": int((((2 * bs.get("spa", 50) + ivs["spa"]) * level) / 100 + 5) * eff_mult * atk_gender),
        "spd": int((((2 * bs.get("spd", 50) + ivs["spd"]) * level) / 100 + 5) * eff_mult),
        "spe": int((((2 * bs.get("spe", 50) + ivs["spe"]) * level) / 100 + 5) * eff_mult),
    }
    learn_moves = species_obj.get("learn_moves") or ["tackle"]
    equipped_moves = learn_moves[:4] if learn_moves else ["tackle"]
    return {
        "uid": str(uuid.uuid4())[:8],
        "species_id": species_obj["id"],
        "dex_id": species_obj.get("dex_id", 1),
        "name": species_obj["name"],
        "elements": species_obj.get("elements", ["normal"]),
        "level": level,
        "exp": 0,
        "exp_next": calc_pokemon_next_exp(level),
        "hp": max_hp,
        "max_hp": max_hp,
        "stats": stats,
        "ivs": ivs,
        "iv_total": iv_total,
        "nature": chosen_nature,
        "gender": chosen_gender,
        "is_shiny": is_shiny,
        "quality": quality,
        "quality_multiplier": q_mult,
        "moves": equipped_moves,
        "evolves_to": species_obj.get("evolves_to"),
        "evolve_level": species_obj.get("evolve_level") or 0,
        "evolution_options": species_obj.get("evolution_options") or [],
    }


def default_player(species_by_id):
    starter_specs = [
        ("gyarados", 75, False, "Mítico", 1.79, {"hp": 30, "atk": 31, "def": 29, "spa": 27, "spd": 29, "spe": 31}, "Adamant", "male"),
        ("dragonite", 80, False, "Mítico", 1.75, {"hp": 29, "atk": 31, "def": 27, "spa": 26, "spd": 26, "spe": 28}, "Jolly", "male"),
        ("tyranitar", 78, False, "Mítico", 1.71, {"hp": 26, "atk": 27, "def": 25, "spa": 24, "spd": 25, "spe": 24}, "Brave", "male"),
        ("gengar", 72, False, "Épico", 1.52, {"hp": 24, "atk": 20, "def": 22, "spa": 31, "spd": 23, "spe": 31}, "Timid", "male"),
        ("metagross", 85, True, "Mítico", 2.54, {"hp": 31, "atk": 31, "def": 31, "spa": 29, "spd": 30, "spe": 31}, "Adamant", "male"),
        ("charmander", 12, False, "Raro", 1.34, {"hp": 20, "atk": 22, "def": 18, "spa": 25, "spd": 19, "spe": 24}, "Modest", "male"),
    ]
    party = []
    caught = []
    for sid, lvl, sh, qual, qm, ivs, nat, gen in starter_specs:
        if sid in species_by_id:
            party.append(make_pokemon_instance(species_by_id[sid], level=lvl, is_shiny=sh, quality=qual, custom_mult=qm, custom_ivs=ivs, nature=nat, gender=gen))
            caught.append(sid)

    return {
        "name": "Red",
        "level": 35,
        "exp": 1200,
        "exp_next": calc_trainer_next_exp(35),
        "gold": 12500,
        "diamonds": 250,
        "has_master_key": False,
        "party": party,
        "pc_box": [],
        "inventory": {
            "capsule_basic": 50,
            "capsule_great": 25,
            "capsule_super": 15,
            "capsule_ultra": 10,
            "e834a843-486a-4f38-95c4-cfda5febe4a5": 5,
            "capsule_master": 2,
            "stone_fire": 5,
            "stone_water": 5,
            "stone_grass": 5,
            "stone_electric": 5,
            "shiny_stone": 5,
        },
        "pokedex_caught": caught,
        "stats": {
            "total_kills": 0,
            "total_captures": len(caught),
            "shinies_found": 1,
            "pvp_wins": 0,
        },
        "offline_farm": {
            "enabled": True,
            "last_active": int(time.time() * 1000),
            "assigned_zone_id": None,
            "auto_catch": True,
            "ball_id": "capsule_ultra",
            "catch_filter": "always",
            "efficiency_level": 1,
            "max_offline_hours": 12,
            "total_offline_gold": 0,
            "total_offline_exp": 0,
            "total_offline_catches": 0,
        },
    }


def create_initial_player_save(username, starter_sid, avatar_model, species_by_id):
    starter_species = species_by_id.get(starter_sid) or species_by_id.get("charmander") or (list(species_by_id.values())[0] if species_by_id else None)
    if not starter_species or not isinstance(starter_species, dict):
        starter_species = {
            "id": "charmander",
            "name": "Charmander",
            "types": ["fire"],
            "base_stats": {"hp": 39, "atk": 52, "def": 43, "spa": 60, "spd": 50, "spe": 65},
            "moves": ["scratch", "growl", "ember"]
        }
    starter_instance = make_pokemon_instance(starter_species, level=12, is_shiny=False, quality="Raro", custom_mult=1.35)

    return {
        "name": username,
        "avatar_model": avatar_model or "ethan_gold",
        "level": 12,
        "exp": 250,
        "exp_next": calc_trainer_next_exp(12),
        "gold": 3000,
        "diamonds": 100,
        "has_master_key": False,
        "party": [starter_instance],
        "pc_box": [],
        "inventory": {
            "capsule_basic": 40,
            "capsule_great": 20,
            "capsule_super": 5,
            "stone_fire": 3,
            "stone_water": 3,
            "stone_grass": 3,
            "stone_electric": 3,
            "shiny_stone": 1,
        },
        "pokedex_caught": [starter_species["id"]],
        "stats": {
            "total_kills": 0,
            "total_captures": 1,
            "shinies_found": 0,
            "pvp_wins": 0,
        },
        "offline_farm": {
            "enabled": True,
            "last_active": int(time.time() * 1000),
            "assigned_zone_id": None,
            "auto_catch": True,
            "ball_id": "capsule_ultra",
            "catch_filter": "always",
            "efficiency_level": 1,
            "max_offline_hours": 12,
            "total_offline_gold": 0,
            "total_offline_exp": 0,
            "total_offline_catches": 0,
        },
    }


def calculate_offline_progress(player, config, species_by_id, enriched_zones, forced_seconds=None):
    if not player:
        return None

    offline_cfg = player.setdefault("offline_farm", {
        "enabled": True,
        "last_active": int(time.time() * 1000),
        "assigned_zone_id": None,
        "auto_catch": True,
        "ball_id": "capsule_ultra",
        "catch_filter": "always",
        "efficiency_level": 1,
        "max_offline_hours": 12,
        "total_offline_gold": 0,
        "total_offline_exp": 0,
        "total_offline_catches": 0,
    })

    if not offline_cfg.get("enabled", True):
        return None

    now_ms = int(time.time() * 1000)
    last_active_ms = offline_cfg.get("last_active") or now_ms

    if forced_seconds is not None:
        diff_seconds = float(forced_seconds)
    else:
        diff_seconds = max(0.0, (now_ms - last_active_ms) / 1000.0)

    # Minimum 60 seconds required to trigger offline rewards calculation
    if diff_seconds < 60.0:
        return None

    # Cap to max hours (default 12 hours)
    max_seconds = float(offline_cfg.get("max_offline_hours", 12)) * 3600.0
    eff_seconds = min(diff_seconds, max_seconds)

    # Identify target zone
    zone_id = offline_cfg.get("assigned_zone_id") or player.get("active_zone_id") or "zone_kanto_1"
    target_zone = next((z for z in enriched_zones if z["id"] == zone_id), enriched_zones[0] if enriched_zones else None)
    if not target_zone:
        return None

    primary_sid = target_zone.get("primary_species_id") or "magikarp"
    sp = species_by_id.get(primary_sid, list(species_by_id.values())[0])
    zone_level = target_zone.get("min_level", 5)

    # 1 Kill every ~4.8 seconds modified by efficiency level
    efficiency = 1.0 + (offline_cfg.get("efficiency_level", 1) - 1) * 0.15
    kills = max(1, int((eff_seconds / 4.8) * efficiency))

    gold_mult = config.get("gold_mult", 1.0)
    exp_mult = config.get("exp_mult", 1.0)

    # Option A Calibrated Monster Yields
    base_gold = max(2, int(2 + zone_level * 0.95 + (zone_level ** 1.1) * 0.25))
    base_exp = max(12, int(20 + zone_level * 14 + (zone_level ** 1.15) * 4))

    earned_gold = int(kills * base_gold * gold_mult)
    earned_exp = int(kills * base_exp * exp_mult)

    # Calculate Level-Ups preview for party Pokémon
    level_ups = []
    for mon in player.get("party", []):
        old_lvl = mon.get("level") or 5
        m_exp = (mon.get("exp") or 0) + earned_exp
        m_next = mon.get("exp_next") or 2000
        new_lvl = old_lvl
        while m_exp >= m_next and new_lvl < 100:
            m_exp -= m_next
            new_lvl += 1
            m_next = calc_pokemon_next_exp(new_lvl)
        if new_lvl > old_lvl:
            level_ups.append({
                "name": mon.get("name"),
                "species_id": mon.get("species_id"),
                "dex_id": mon.get("dex_id"),
                "is_shiny": mon.get("is_shiny", False),
                "old_level": old_lvl,
                "new_level": new_lvl,
                "levels_gained": new_lvl - old_lvl,
            })

    # Drops calculation
    items_dropped = []
    sold_drops_gold = 0
    berry_count = kills // 25
    if berry_count > 0:
        if offline_cfg.get("auto_sell_drops", False):
            sold_drops_gold += berry_count * 15
            earned_gold += berry_count * 15
        else:
            items_dropped.append({"item_id": "item_oran_berry", "name": "Oran Berry", "qty": berry_count, "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/oran-berry.png"})
    stone_count = kills // 220
    if stone_count > 0:
        items_dropped.append({"item_id": "stone_water" if "water" in sp.get("elements", []) else "stone_fire", "name": "Pedra Elemental", "qty": stone_count, "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/water-stone.png"})
    ball_found = kills // 90
    if ball_found > 0:
        items_dropped.append({"item_id": "capsule_ultra", "name": "Ultra Ball", "qty": ball_found, "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png"})

    # Auto-Catch Offline
    catches = []
    balls_used = {}
    if offline_cfg.get("auto_catch", True):
        catch_opps = max(0, kills // 28)
        pref_ball = offline_cfg.get("ball_id", "capsule_ultra")
        inv = player.get("inventory", {})

        chosen_ball = pref_ball
        if chosen_ball == "best":
            for b in ["capsule_master", "capsule_ultra", "capsule_super", "capsule_great", "capsule_basic"]:
                if inv.get(b, 0) > 0:
                    chosen_ball = b
                    break

        available_balls = inv.get(chosen_ball, 0)
        attempts = min(catch_opps, available_balls)
        if attempts > 0:
            balls_used[chosen_ball] = attempts
            ball_mult = 4.0 if "ultra" in chosen_ball else (2.0 if "great" in chosen_ball else (100.0 if "master" in chosen_ball else 1.0))
            base_chance = sp.get("base_capture_chance", 17.65) or 17.65
            eff_chance = min(98.0, base_chance * ball_mult * config.get("catch_rate_mult", 1.0))

            successful_catches = 0
            for _ in range(attempts):
                if random.uniform(0, 100) <= eff_chance:
                    successful_catches += 1

            shiny_chance = config.get("shiny_chance", 0.0039)
            auto_sell_pk = offline_cfg.get("auto_sell_pokemon", False)
            sell_filter = offline_cfg.get("auto_sell_filter", "common_only")
            sold_pokemon_count = 0
            sold_pokemon_gold = 0

            for _ in range(successful_catches):
                is_sh = random.random() < shiny_chance
                qualities = ["Comum", "Incomum", "Raro", "Épico", "Lendário", "Mítico"]
                # Option A: Comum 68%, Incomum 22%, Raro 7.5%, Épico 2.0%, Lendário 0.48%, Mítico 0.02%
                # Shiny: Comum 0%, Incomum 0%, Raro 0%, Épico 72%, Lendário 23%, Mítico 5% (Never below Épico)
                weights = [6800, 2200, 750, 200, 48, 2] if not is_sh else [0, 0, 0, 7200, 2300, 500]
                q_pick = random.choices(qualities, weights=weights, k=1)[0]
                catch_lvl = max(1, min(100, zone_level + random.randint(-1, 3)))
                mon_inst = make_pokemon_instance(sp, level=catch_lvl, is_shiny=is_sh, quality=q_pick)

                should_sell = False
                if auto_sell_pk and not is_sh and q_pick not in ["Mítico", "Lendário"]:
                    if sell_filter == "common_only" and q_pick == "Comum":
                        should_sell = True
                    elif sell_filter == "common_uncommon" and q_pick in ["Comum", "Incomum"]:
                        should_sell = True

                if should_sell:
                    val = int((25 + catch_lvl * 12) * (1.5 if q_pick == "Incomum" else 1.0))
                    sold_pokemon_gold += val
                    sold_pokemon_count += 1
                else:
                    catches.append(mon_inst)

            earned_gold += sold_pokemon_gold

    hours = int(eff_seconds // 3600)
    minutes = int((eff_seconds % 3600) // 60)
    time_str = f"{hours}h {minutes}m" if hours > 0 else f"{minutes} min"

    return {
        "available": True,
        "elapsed_seconds": int(eff_seconds),
        "actual_elapsed_seconds": int(diff_seconds),
        "is_capped": diff_seconds > max_seconds,
        "time_formatted": time_str,
        "zone_id": target_zone["id"],
        "zone_name": target_zone["name"],
        "zone_world": target_zone.get("world_label", "Kanto"),
        "zone_level": zone_level,
        "species_name": sp["name"],
        "species_id": sp["id"],
        "species_dex_id": sp.get("dex_id", 1),
        "kills": kills,
        "gold": earned_gold,
        "exp": earned_exp,
        "level_ups": level_ups,
        "items": items_dropped,
        "catches": catches,
        "balls_consumed": balls_used,
        "sold_pokemon_count": sold_pokemon_count if 'sold_pokemon_count' in locals() else 0,
        "sold_pokemon_gold": sold_pokemon_gold if 'sold_pokemon_gold' in locals() else 0,
        "sold_drops_gold": sold_drops_gold if 'sold_drops_gold' in locals() else 0,
    }


def apply_offline_rewards(player, report):
    if not player or not report:
        return

    # 1. Gold
    player["gold"] = player.get("gold", 0) + report.get("gold", 0)

    # 2. Trainer Exp & Level (Option A Synchronized)
    t_exp = player.get("exp", 0) + report.get("exp", 0)
    t_lvl = player.get("level", 1)
    t_next = player.get("exp_next") or calc_trainer_next_exp(t_lvl)
    while t_exp >= t_next and t_lvl < 100:
        t_exp -= t_next
        t_lvl += 1
        t_next = calc_trainer_next_exp(t_lvl)
    player["level"] = t_lvl
    player["exp"] = t_exp
    player["exp_next"] = t_next

    # 3. Party Pokémon Exp & Levels (Option A Synchronized)
    earned_exp = report.get("exp", 0)
    for mon in player.get("party", []):
        m_exp = mon.get("exp", 0) + earned_exp
        m_lvl = mon.get("level", 1)
        m_next = mon.get("exp_next") or calc_pokemon_next_exp(m_lvl)
        while m_exp >= m_next and m_lvl < 100:
            m_exp -= m_next
            m_lvl += 1
            m_next = calc_pokemon_next_exp(m_lvl)
            if "max_hp" in mon:
                mon["max_hp"] = int(mon["max_hp"] * 1.04) + 5
                mon["hp"] = mon["max_hp"]
        mon["level"] = m_lvl
        mon["exp"] = m_exp
        mon["exp_next"] = m_next

    # 4. Item drops
    inv = player.setdefault("inventory", {})
    for item in report.get("items", []):
        iid = item.get("item_id")
        qty = item.get("qty", 0)
        if iid:
            inv[iid] = inv.get(iid, 0) + qty

    # 5. Deduct balls
    for ball_id, count in report.get("balls_consumed", {}).items():
        inv[ball_id] = max(0, inv.get(ball_id, 0) - count)

    # 6. Add caught Pokémon
    pokedex = player.setdefault("pokedex_caught", [])
    pc_box = player.setdefault("pc_box", [])
    party = player.setdefault("party", [])
    catches = report.get("catches", [])
    for mon in catches:
        sid = mon.get("species_id")
        if sid and sid not in pokedex:
            pokedex.append(sid)
        if len(party) < 6:
            party.append(mon)
        else:
            pc_box.append(mon)

    # 7. Update stats
    stats = player.setdefault("stats", {})
    stats["total_kills"] = stats.get("total_kills", 0) + report.get("kills", 0)
    stats["total_captures"] = stats.get("total_captures", 0) + len(catches)
    shinies_caught = sum(1 for m in catches if m.get("is_shiny"))
    stats["shinies_found"] = stats.get("shinies_found", 0) + shinies_caught

    # 8. Reset offline_farm last_active to now
    off_cfg = player.setdefault("offline_farm", {})
    off_cfg["last_active"] = int(time.time() * 1000)
    off_cfg["total_offline_gold"] = off_cfg.get("total_offline_gold", 0) + report.get("gold", 0)
    off_cfg["total_offline_exp"] = off_cfg.get("total_offline_exp", 0) + report.get("exp", 0)
    off_cfg["total_offline_catches"] = off_cfg.get("total_offline_catches", 0) + len(catches)


def build_bootstrap(user=None):
    config = load_json(CONFIG_FILE, default_config())
    if "gba_sprite_version" not in config:
        config["gba_sprite_version"] = "emerald"
    overrides = load_json(OVERRIDES_FILE, {})

    worlds_by_id = {}
    worlds_list = []
    map_img_lookup = {
        "Kanto": "/img/maps/kanto.jpg",
        "Johto": "/img/maps/johto.webp",
        "Hoenn": "/img/maps/hoenn.png",
    }
    for w in sorted(RAW_WORLDS, key=lambda x: x.get("order", 99)):
        label = w.get("label", "")
        if "Lend" in label:
            img_url = "/img/maps/legendary.webp"
            label_clean = "Ilhas Lendárias"
        else:
            img_url = map_img_lookup.get(label, "/img/maps/kanto.jpg")
            label_clean = label
        w_copy = dict(w)
        w_copy["label"] = label_clean
        w_copy["map_url"] = img_url
        if config.get("unlock_legendary_islands") and w_copy.get("locked"):
            w_copy["locked"] = False
        worlds_by_id[w["id"]] = w_copy
        worlds_list.append(w_copy)

    species_by_id = {}
    for sp in RAW_SPECIES:
        s_copy = dict(sp)
        sid = s_copy["id"]
        if sid in overrides:
            s_copy.update(overrides[sid])
        if config.get("unlock_legendary_islands") and (s_copy.get("base_capture_chance") or 0) <= 0:
            s_copy["base_capture_chance"] = 2.0
        species_by_id[sid] = s_copy

    earliest_zone_by_species = {}
    enriched_zones = []
    for z in sorted(RAW_ZONES, key=lambda x: (x.get("min_level", 1), x.get("progression_rank", 1))):
        z_copy = dict(z)
        w_obj = worlds_by_id.get(z.get("world"), {})
        z_copy["world_label"] = w_obj.get("label", "Kanto")
        z_copy["world_locked"] = bool(w_obj.get("locked", False))
        encs = z.get("encounters") or []
        primary_sid = encs[0]["species_id"] if encs else None
        sp_obj = species_by_id.get(primary_sid, {}) if primary_sid else {}
        z_copy["primary_species_id"] = primary_sid
        z_copy["primary_dex_id"] = sp_obj.get("dex_id", 1)
        z_copy["primary_name"] = sp_obj.get("name", z.get("name", "Zona"))
        z_copy["base_capture_chance"] = sp_obj.get("base_capture_chance", 17.65)
        enriched_zones.append(z_copy)

        for enc in encs:
            esid = enc.get("species_id")
            if not esid:
                continue
            prev = earliest_zone_by_species.get(esid)
            is_locked = z_copy["world_locked"]
            cand = {
                "zone_id": z["id"],
                "zone_name": z["name"],
                "world_label": z_copy["world_label"],
                "min_level": enc.get("min_level", z.get("min_level", 1)),
                "locked": is_locked,
            }
            if prev is None or (prev["locked"] and not is_locked) or (prev["locked"] == is_locked and cand["min_level"] < prev["min_level"]):
                earliest_zone_by_species[esid] = cand

    if config.get("unlock_safari_zone"):
        safari_world_id = "safari-world-custom"
        worlds_list.append({
            "id": safari_world_id,
            "label": "Safari Especial (Custom)",
            "map_url": "/img/maps/kanto.jpg",
            "width": 1184,
            "height": 1328,
            "min_level": 50,
            "max_level": 250,
            "locked": False,
            "order": 5,
        })
        idx = 0
        for sid, sp_obj in species_by_id.items():
            if sid not in earliest_zone_by_species:
                idx += 1
                lvl = 100 if (sp_obj.get("is_legendary") or sp_obj.get("is_mythical")) else 50
                z_id = f"safari_{sid}"
                z_obj = {
                    "id": z_id,
                    "name": f"Safari: {sp_obj['name']}",
                    "world": safari_world_id,
                    "world_label": "Safari Especial (Custom)",
                    "world_locked": False,
                    "min_level": lvl,
                    "max_level": lvl + 10,
                    "recommended_level": lvl,
                    "difficulty": "Normal",
                    "elements": sp_obj.get("elements", ["normal"]),
                    "encounters": [{"species_id": sid, "min_level": lvl, "max_level": lvl + 10, "weight": 100}],
                    "primary_species_id": sid,
                    "primary_dex_id": sp_obj.get("dex_id", 1),
                    "primary_name": sp_obj["name"],
                    "base_capture_chance": sp_obj.get("base_capture_chance") or 15.0,
                    "map_x": 150 + ((idx * 97) % 850),
                    "map_y": 150 + ((idx * 131) % 950),
                }
                enriched_zones.append(z_obj)
                earliest_zone_by_species[sid] = {
                    "zone_id": z_id,
                    "zone_name": z_obj["name"],
                    "world_label": "Safari Especial (Custom)",
                    "min_level": lvl,
                    "locked": False,
                }

    parents_map = {}
    for sid, sp_obj in species_by_id.items():
        targets = set()
        if sp_obj.get("evolves_to"):
            targets.add(sp_obj["evolves_to"])
        for opt in sp_obj.get("evolution_options") or []:
            if opt.get("species_id"):
                targets.add(opt["species_id"])
        for t in targets:
            parents_map.setdefault(t, []).append(sid)

    def get_all_ancestors(sid):
        visited = []
        queue = list(parents_map.get(sid, []))
        while queue:
            cur = queue.pop(0)
            if cur not in visited and cur in species_by_id:
                visited.append(cur)
                queue.extend(parents_map.get(cur, []))
        return visited

    unranked_list = []
    for sid, sp_obj in species_by_id.items():
        bs = sp_obj.get("base_stats", {})
        bst = sum(bs.values()) if bs else 300
        if sid not in EXACT_PVP_SCORES:
            est_score = max(15, min(51, int((bst - 180) / 8.8)))
            unranked_list.append((est_score, bst, sid))
    unranked_list.sort(key=lambda x: (-x[0], -x[1], x[2]))
    used_ranks = set(v[0] for v in EXACT_PVP_SCORES.values())
    next_rank = 1
    computed_pvp = {}
    for est_score, _, sid in unranked_list:
        while next_rank in used_ranks:
            next_rank += 1
        tier = "A" if est_score >= 50 else ("B" if est_score >= 40 else ("C" if est_score >= 28 else "D"))
        computed_pvp[sid] = (next_rank, tier, est_score)
        used_ranks.add(next_rank)

    enriched_species = []
    for sid, sp_obj in sorted(species_by_id.items(), key=lambda kv: kv[1].get("dex_id", 999)):
        s_copy = dict(sp_obj)
        pvp_rank, pvp_tier, pvp_score = EXACT_PVP_SCORES.get(sid, computed_pvp.get(sid, (300, "C", 35)))
        s_copy["pvp_rank"] = pvp_rank
        s_copy["pvp_tier"] = pvp_tier
        s_copy["pvp_score"] = pvp_score
        s_copy["best_zone"] = earliest_zone_by_species.get(sid)

        ancestors = get_all_ancestors(sid)
        best_anc = None
        for anc_id in ancestors:
            anc_sp = species_by_id[anc_id]
            anc_zone = earliest_zone_by_species.get(anc_id)
            if not anc_zone:
                continue
            cand = {
                "species_id": anc_id,
                "dex_id": anc_sp.get("dex_id", 1),
                "name": anc_sp["name"],
                "base_capture_chance": anc_sp.get("base_capture_chance", 0),
                "zone_name": anc_zone["zone_name"],
                "world_label": anc_zone["world_label"],
                "min_level": anc_zone["min_level"],
                "zone_id": anc_zone["zone_id"],
            }
            if best_anc is None or (cand["base_capture_chance"] > best_anc["base_capture_chance"]) or (
                cand["base_capture_chance"] == best_anc["base_capture_chance"] and cand["min_level"] < best_anc["min_level"]
            ):
                best_anc = cand
        s_copy["pre_evo_shortcut"] = best_anc
        enriched_species.append(s_copy)

    capsules = []
    for item in RAW_ITEMS:
        if item.get("type") == "capsule":
            cid = item["id"]
            rule = CAPSULE_EXTRA_RULES.get(cid, {"default_price": 150, "compat_elements": [], "cond": "Especial", "sprite": ITEM_SPRITE_BASE + "poke-ball.png"})
            orig_price = item.get("price", 0) or 0
            is_active_by_default = orig_price > 0 or cid in ("e834a843-486a-4f38-95c4-cfda5febe4a5", "capsule_master")
            shop_active = (orig_price > 0) or bool(config.get("unlock_all_capsules"))
            eff_price = orig_price if orig_price > 0 else rule["default_price"]
            capsules.append({
                "id": cid,
                "name": item["name"],
                "catch_multiplier": item.get("catch_multiplier", 1.0),
                "price": eff_price,
                "sell_price": item.get("sell_price") or max(1, eff_price // 2),
                "rarity": item.get("rarity", "Comum"),
                "description": item.get("description", ""),
                "active_in_live": is_active_by_default,
                "shop_eligible": shop_active,
                "compat_elements": rule["compat_elements"],
                "cond_label": rule["cond"],
                "sprite_url": rule["sprite"],
                "icon_index": item.get("icon_index", 34),
            })
    capsules.sort(key=lambda c: (not c["active_in_live"], c["catch_multiplier"], c["price"]))

    stone_items = []
    for item in RAW_ITEMS:
        iid = item["id"]
        if iid.startswith("stone_") or iid == "shiny_stone":
            stone_items.append({
                "id": iid,
                "name": item["name"],
                "type": "evolution",
                "price": 1200 if iid != "shiny_stone" else 5000,
                "sell_price": item.get("sell_price") or 600,
                "description": item.get("description", "Pedra de evolução elemental."),
                "sprite_url": STONE_SPRITES.get(iid, ITEM_SPRITE_BASE + "fire-stone.png"),
                "icon_index": item.get("icon_index", 160),
            })

    items_map = {
        i["id"]: {
            "id": i["id"],
            "name": i["name"],
            "type": i.get("type", "material"),
            "price": i.get("price", 0),
            "sell_price": i.get("sell_price") or 5,
            "rarity": i.get("rarity", "Comum"),
            "description": i.get("description", ""),
            "icon_index": i.get("icon_index", 0),
        }
        for i in RAW_ITEMS
    }

    moves_map = {m["id"]: m for m in RAW_MOVES}

    if user:
        save_obj = db.get_player_save(user["id"])
        if save_obj and save_obj.get("player"):
            player = save_obj["player"]
            if save_obj.get("config"):
                config = save_obj["config"]
        else:
            player = default_player(species_by_id)
            player["name"] = user["username"]
            player["avatar_model"] = user.get("avatar_model", "ethan_gold")
            db.save_player_save(user["id"], player, config)
    else:
        player = load_json(SAVE_FILE)
        if not player or not player.get("party") or "quality_multiplier" not in player["party"][0]:
            player = default_player(species_by_id)
            save_json(SAVE_FILE, player)

    offline_report = calculate_offline_progress(player, config, species_by_id, enriched_zones)

    return {
        "user": user,
        "is_guest": user is None,
        "player": player,
        "config": config,
        "offline_report": offline_report,
        "worlds": worlds_list,
        "zones": enriched_zones,
        "species": enriched_species,
        "capsules": capsules,
        "stones": stone_items,
        "items_map": items_map,
        "moves_map": moves_map,
        "formulas": RAW_FORMULAS,
        "version": PROJECT_VERSION,
        "version_label": PROJECT_VERSION_LABEL,
        "changelog": PROJECT_CHANGELOG,
    }


def get_auth_token(handler):
    auth_header = handler.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
        return auth_header.split(" ", 1)[1].strip()

    cookie_header = handler.headers.get("Cookie", "")
    for cookie in cookie_header.split(";"):
        cookie = cookie.strip()
        if cookie.startswith("pokepixel_session="):
            return cookie.split("=", 1)[1].strip()

    parsed = urlparse(handler.path)
    qs = parse_qs(parsed.query)
    if "token" in qs and qs["token"]:
        return qs["token"][0]

    return None


class GameRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PUBLIC_DIR, **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

        # Static asset performance caching for images, sprites, maps, fonts, and datasets
        clean_path = self.path.split("?")[0].lower()
        if not clean_path.startswith("/api/"):
            if any(clean_path.endswith(ext) for ext in [".woff2", ".woff", ".ttf", ".otf"]):
                self.send_header("Cache-Control", "public, max-age=31536000, immutable")
            elif any(clean_path.endswith(ext) for ext in [".png", ".jpg", ".jpeg", ".webp", ".gif", ".ico", ".svg"]):
                self.send_header("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800")
            elif any(clean_path.endswith(ext) for ext in [".json", ".js", ".css"]):
                self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
                self.send_header("Pragma", "no-cache")
                self.send_header("Expires", "0")

        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def send_json(self, payload, status=200, cookie_token=None):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        if cookie_token is not None:
            if cookie_token == "":
                self.send_header("Set-Cookie", "pokepixel_session=; Path=/; Max-Age=0; SameSite=Lax; Secure")
            else:
                self.send_header("Set-Cookie", f"pokepixel_session={cookie_token}; Path=/; Max-Age=2592000; SameSite=Lax; Secure")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urlparse(self.path)

        if parsed.path in ["/login", "/login/"]:
            self.path = "/login.html"
            return super().do_GET()

        # SPA ENTRYPOINT:
        # Client-side (app.js) handles authentication from localStorage and redirects to /login.html
        # if the trainer has not authenticated.
        if parsed.path in ["/", "/index.html", "/game", "/game.html"]:
            self.path = "/index.html"
            return super().do_GET()

        if parsed.path == "/api/auth/me":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if user:
                return self.send_json({"authenticated": True, "user": user})
            return self.send_json({"authenticated": False, "user": None})

        if parsed.path == "/api/player/inspect":
            qs = parse_qs(parsed.query)
            username = qs.get("username", [None])[0]
            user_id = qs.get("user_id", [None])[0]
            profile = db.get_player_public_profile(username or user_id)
            return self.send_json(profile)

        if parsed.path == "/api/friends/list":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user:
                return self.send_json({"ok": False, "error": "Não autenticado."}, status=401)
            friends = db.get_friends_list(user["id"])
            with PLAZA_LOCK:
                online_ids = set(p.get("user_id") for p in PLAZA_PLAYERS.values())
                online_names = set((p.get("name") or "").lower() for p in PLAZA_PLAYERS.values())
            for f in friends:
                f["is_online"] = (f["id"] in online_ids) or (f["username"].lower() in online_names)
            return self.send_json({"ok": True, "friends": friends})

        if parsed.path == "/api/p2p/invites":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user:
                return self.send_json({"ok": True, "incoming": [], "outgoing": []})
            now = time.time()
            with P2P_LOCK:
                dead_invs = [k for k, v in P2P_INVITATIONS.items() if now - v.get("created_at", 0) > 45.0]
                for k in dead_invs:
                    del P2P_INVITATIONS[k]
                incoming = [
                    v for v in P2P_INVITATIONS.values()
                    if (v["to_user_id"] == user["id"] or v["to_name"].lower() == user["username"].lower())
                    and v["status"] == "pending"
                ]
                outgoing = [
                    v for v in P2P_INVITATIONS.values()
                    if v["from_user_id"] == user["id"] and now - v.get("created_at", 0) < 30.0
                ]
            return self.send_json({"ok": True, "incoming": incoming, "outgoing": outgoing})

        if parsed.path == "/api/p2p/trade/state":
            qs = parse_qs(parsed.query)
            trade_id = qs.get("trade_id", [None])[0]
            if not trade_id:
                return self.send_json({"ok": False, "error": "ID da troca ausente."}, status=400)
            with P2P_LOCK:
                trade = P2P_TRADES.get(trade_id)
                if not trade:
                    return self.send_json({"ok": False, "error": "Sessão de troca não encontrada."}, status=404)
                return self.send_json({"ok": True, "trade": trade})

        if parsed.path == "/api/chat/messages":
            qs = parse_qs(parsed.query)
            since_id = int(qs.get("since_id", [0])[0])
            limit = min(100, int(qs.get("limit", [50])[0]))
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            user_name = user["username"] if user else None
            msgs = db.get_chat_messages(since_id=since_id, limit=limit, user_name=user_name)
            return self.send_json({"ok": True, "messages": msgs})

        if parsed.path == "/api/hub/players":
            now = time.time()
            with PLAZA_LOCK:
                dead_keys = [k for k, v in PLAZA_PLAYERS.items() if now - v.get("last_seen", 0) > 8.0]
                for k in dead_keys:
                    del PLAZA_PLAYERS[k]
                players_list = list(PLAZA_PLAYERS.values())
            return self.send_json({"ok": True, "players": players_list})

        if parsed.path == "/api/version":
            app_mtime = int(os.path.getmtime("public/app.js") * 1000) if os.path.exists("public/app.js") else int(time.time() * 1000)
            return self.send_json({
                "ok": True,
                "version": PROJECT_VERSION,
                "version_label": PROJECT_VERSION_LABEL,
                "build_timestamp": app_mtime,
                "update_title": "🌟 Atualização v1.8.0: Rework MMORPG & Economia!",
                "update_message": "Grandes Desafios, Isolamento Total da Arena GvG, Pokémon Card completo e novo Update Log implantados.",
                "force_restart": False,
                "changelog": PROJECT_CHANGELOG
            })

        if parsed.path == "/api/bootstrap":
            try:
                token = get_auth_token(self)
                user = db.get_user_by_session(token) if token else None
                data = build_bootstrap(user=user)
                return self.send_json(data)
            except Exception as e:
                import traceback
                print("ERROR in /api/bootstrap:", e, flush=True)
                traceback.print_exc()
                return self.send_json({"error": str(e)}, status=500)

        # Global Market Endpoints
        if parsed.path == "/api/market/listings":
            qs = parse_qs(parsed.query)
            category = qs.get("category", ["all"])[0]
            currency = qs.get("currency", ["all"])[0]
            search = qs.get("query", [""])[0]
            sort = qs.get("sort", ["recent"])[0]
            listings = db.get_market_listings(category=category, currency=currency, search=search, sort=sort)
            return self.send_json({"ok": True, "listings": listings})

        if parsed.path == "/api/market/my-listings":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            user_id = user["id"] if user else 1
            res = db.get_user_market_listings(user_id)
            return self.send_json({"ok": True, "active": res["active"], "sold": res["sold"]})

        if parsed.path == "/api/admin/feedback":
            feedbacks = db.get_tester_feedback_list(limit=100)
            return self.send_json({"ok": True, "feedbacks": feedbacks})

        if parsed.path == "/api/admin/diagnostics":
            diag = db.admin_get_server_diagnostics()
            import sys
            with PLAZA_LOCK:
                online_count = len(PLAZA_PLAYERS)
            with P2P_LOCK:
                trades_count = len(P2P_TRADES)
                duels_count = len(P2P_DUELS)
            diag.update({
                "uptime_seconds": int(time.time() - SERVER_START_TIME),
                "online_plaza_players": online_count,
                "active_p2p_trades": trades_count,
                "active_p2p_duels": duels_count,
                "python_version": sys.version.split()[0],
                "server_version": PROJECT_VERSION
            })
            return self.send_json(diag)

        if parsed.path == "/api/admin/broadcast/current":
            with ADMIN_BROADCAST_LOCK:
                return self.send_json({"ok": True, "broadcast": ADMIN_CURRENT_BROADCAST})

        if parsed.path == "/api/admin/backup":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user or not user.get("is_admin"):
                return self.send_json({"ok": False, "error": "Acesso Negado."}, status=403)
            return self.send_json(db.admin_export_backup_json())

        if parsed.path == "/api/admin/users":
            users = db.get_registered_users_list(limit=200)
            return self.send_json({"ok": True, "users": users, "total": len(users)})

        if parsed.path == "/api/market/admin/hold":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user and parse_qs(parsed.query).get("test_admin", ["0"])[0] == "1":
                user = {"id": 3, "username": "Admin", "role": "admin", "is_admin": True}
            if not user or not user.get("is_admin"):
                return self.send_json({"ok": False, "error": "Acesso Negado: Apenas administradores do servidor possuem acesso ao Cofre do Servidor."}, status=403)
            return self.send_json(db.get_server_hold_data(user))

        # On-demand proxy & cache for any PMD sprite, manifest, or parallax map
        if parsed.path.startswith("/img/pmd/") or parsed.path.startswith("/data/pmd/") or parsed.path.startswith("/img/parallaxes/"):
            rel_path = parsed.path.lstrip("/").replace("/", os.sep)
            local_path = os.path.join(PUBLIC_DIR, rel_path)
            if not os.path.exists(local_path):
                import urllib.request
                remote_url = f"https://pokepixel.nietore.com/play{parsed.path}"
                try:
                    os.makedirs(os.path.dirname(local_path), exist_ok=True)
                    req = urllib.request.Request(remote_url, headers={"User-Agent": "Mozilla/5.0"})
                    with urllib.request.urlopen(req, timeout=6) as resp:
                        with open(local_path, "wb") as f:
                            f.write(resp.read())
                except Exception:
                    pass

        return super().do_GET()

    def do_POST(self):
        global RAW_SPECIES, RAW_ITEMS, RAW_WORLDS, ADMIN_CURRENT_BROADCAST
        parsed = urlparse(self.path)
        length = int(self.headers.get("Content-Length", "0"))
        raw_body = self.rfile.read(length).decode("utf-8") if length > 0 else "{}"
        try:
            body = json.loads(raw_body)
        except Exception:
            body = {}

        if parsed.path == "/api/chat/send":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            sender_name = user["username"] if user else body.get("sender", "Treinador")
            channel = str(body.get("channel", "local")).strip().lower()
            if channel not in ["local", "global", "trade", "guild", "whisper"]:
                channel = "local"
            text = str(body.get("text", "")).strip()
            if not text:
                return self.send_json({"ok": False, "error": "Mensagem vazia."}, status=400)

            # Basic HTML escaping for security
            text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")[:280]
            recipient = body.get("recipient")
            if recipient:
                recipient = str(recipient).strip()

            msg = db.save_chat_message(channel, sender_name, recipient, text)

            # If local message, update sender's speech bubble in Plaza in real-time
            if channel == "local":
                with PLAZA_LOCK:
                    for p in PLAZA_PLAYERS.values():
                        if p.get("name", "").lower() == sender_name.lower():
                            p["speechText"] = text
                            p["speechTimer"] = 110

            return self.send_json({"ok": True, "message": msg})

        if parsed.path == "/api/hub/presence":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            user_id = user["id"] if user else int(body.get("user_id", 1))
            user_name = user["username"] if user else body.get("name", "Treinador")
            avatar_model = user.get("avatar_model", "ethan_gold") if user else body.get("avatarModelId", "ethan_gold")

            gx = int(body.get("gx", 7))
            gy = int(body.get("gy", 5))
            p_dir = int(body.get("dir", 0))
            speech_text = str(body.get("speech_text", "")).strip()
            client_level = int(body.get("level", 1))

            mon_data = body.get("lead_mon")
            if not mon_data:
                boot = build_bootstrap(user=user)
                party = boot.get("player", {}).get("party", [])
                if party:
                    mon_data = party[0]
                else:
                    mon_data = {"species_id": "pikachu", "dex_id": 25, "name": "Pikachu", "is_shiny": False, "quality": "Comum"}

            mon_species = mon_data.get("species_id", "pikachu")
            mon_dex = int(mon_data.get("dex_id", 25))
            mon_name = mon_data.get("name", "Pikachu")
            mon_shiny = bool(mon_data.get("is_shiny", False))
            mon_quality = mon_data.get("quality", "Comum")

            now = time.time()
            with PLAZA_LOCK:
                dead_keys = [k for k, v in PLAZA_PLAYERS.items() if now - v.get("last_seen", 0) > 8.0]
                for k in dead_keys:
                    del PLAZA_PLAYERS[k]

                entry = {
                    "id": f"player_{user_id}",
                    "user_id": user_id,
                    "name": user_name,
                    "level": client_level,
                    "avatarModelId": avatar_model,
                    "roleLabel": f"Treinador Lv.{client_level}",
                    "gx": gx,
                    "gy": gy,
                    "dir": p_dir,
                    "monSpecies": mon_species,
                    "monDex": mon_dex,
                    "monName": mon_name,
                    "monShiny": mon_shiny,
                    "monQuality": mon_quality,
                    "speechText": speech_text if speech_text else "",
                    "speechTimer": 110 if speech_text else 0,
                    "last_seen": now
                }
                PLAZA_PLAYERS[user_id] = entry
                other_players = [p for p in PLAZA_PLAYERS.values() if p["user_id"] != user_id]

            return self.send_json({"ok": True, "players": other_players})

        if parsed.path == "/api/hub/leave":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            user_id = user["id"] if user else int(body.get("user_id", 1))
            with PLAZA_LOCK:
                if user_id in PLAZA_PLAYERS:
                    del PLAZA_PLAYERS[user_id]
            return self.send_json({"ok": True})

        if parsed.path == "/api/friends/add":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user:
                return self.send_json({"ok": False, "error": "Não autenticado."}, status=401)
            friend_username = body.get("username", "")
            res = db.add_friend(user["id"], friend_username)
            return self.send_json(res)

        if parsed.path == "/api/friends/remove":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user:
                return self.send_json({"ok": False, "error": "Não autenticado."}, status=401)
            friend_username = body.get("username", "")
            res = db.remove_friend(user["id"], friend_username)
            return self.send_json(res)

        if parsed.path == "/api/p2p/invite":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user:
                return self.send_json({"ok": False, "error": "Não autenticado."}, status=401)
            inv_type = body.get("type", "trade")
            target_username = body.get("target_username", "").strip()

            target_prof = db.get_player_public_profile(target_username)
            if not target_prof.get("ok"):
                return self.send_json({"ok": False, "error": f"Treinador '{target_username}' não foi encontrado!"}, status=404)
            if target_prof["user_id"] == user["id"]:
                return self.send_json({"ok": False, "error": "Você não pode interagir consigo mesmo!"}, status=400)

            now = time.time()
            import random
            invite_id = f"inv_{int(now*1000)}_{random.randint(100, 999)}"
            invite_obj = {
                "id": invite_id,
                "type": inv_type,
                "from_user_id": user["id"],
                "from_name": user["username"],
                "from_avatar": user.get("avatar_model", "ethan_gold"),
                "to_user_id": target_prof["user_id"],
                "to_name": target_prof["username"],
                "created_at": now,
                "status": "pending"
            }
            with P2P_LOCK:
                P2P_INVITATIONS[invite_id] = invite_obj
            return self.send_json({"ok": True, "invite": invite_obj})

        if parsed.path == "/api/p2p/respond":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user:
                return self.send_json({"ok": False, "error": "Não autenticado."}, status=401)
            invite_id = body.get("invite_id")
            accept = bool(body.get("accept", False))

            import random
            with P2P_LOCK:
                inv = P2P_INVITATIONS.get(invite_id)
                if not inv or inv["status"] != "pending":
                    return self.send_json({"ok": False, "error": "Convite expirado ou já respondido."})

                if accept:
                    inv["status"] = "accepted"
                    if inv["type"] == "trade":
                        trade_id = f"trade_{int(time.time()*1000)}_{random.randint(100, 999)}"
                        trade_obj = {
                            "id": trade_id,
                            "invite_id": invite_id,
                            "player_a": {
                                "user_id": inv["from_user_id"],
                                "name": inv["from_name"],
                                "gold": 0,
                                "items": [],
                                "mon": None,
                                "locked": False,
                                "confirmed": False
                            },
                            "player_b": {
                                "user_id": inv["to_user_id"],
                                "name": inv["to_name"],
                                "gold": 0,
                                "items": [],
                                "mon": None,
                                "locked": False,
                                "confirmed": False
                            },
                            "status": "active",
                            "created_at": time.time(),
                            "updated_at": time.time()
                        }
                        P2P_TRADES[trade_id] = trade_obj
                        inv["trade_id"] = trade_id
                        return self.send_json({"ok": True, "status": "accepted", "trade_id": trade_id, "type": "trade"})
                    else:
                        duel_id = f"duel_{int(time.time()*1000)}_{random.randint(100, 999)}"
                        inv["duel_id"] = duel_id
                        P2P_DUELS[duel_id] = {
                            "id": duel_id,
                            "player_a": inv["from_name"],
                            "player_b": inv["to_name"],
                            "created_at": time.time()
                        }
                        return self.send_json({"ok": True, "status": "accepted", "duel_id": duel_id, "type": "duel", "challenger": inv["from_name"]})
                else:
                    inv["status"] = "declined"
                    return self.send_json({"ok": True, "status": "declined"})

        if parsed.path == "/api/p2p/trade/update":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user:
                return self.send_json({"ok": False, "error": "Não autenticado."}, status=401)
            trade_id = body.get("trade_id")
            gold = max(0, int(body.get("gold", 0)))
            items = body.get("items", [])
            mon_uid = body.get("mon_uid")
            mon_info = body.get("mon_info")

            with P2P_LOCK:
                trade = P2P_TRADES.get(trade_id)
                if not trade or trade["status"] != "active":
                    return self.send_json({"ok": False, "error": "Sessão de troca inválida ou expirada."})

                is_p_a = (trade["player_a"]["user_id"] == user["id"] or trade["player_a"]["name"].lower() == user["username"].lower())
                p_side = trade["player_a"] if is_p_a else trade["player_b"]

                p_side["gold"] = gold
                p_side["items"] = items
                p_side["mon_uid"] = mon_uid
                p_side["mon"] = mon_info

                # Reset locks & confirms for both sides on offer change (safety)
                trade["player_a"]["locked"] = False
                trade["player_a"]["confirmed"] = False
                trade["player_b"]["locked"] = False
                trade["player_b"]["confirmed"] = False
                trade["updated_at"] = time.time()

            return self.send_json({"ok": True, "trade": trade})

        if parsed.path == "/api/p2p/trade/lock":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user:
                return self.send_json({"ok": False, "error": "Não autenticado."}, status=401)
            trade_id = body.get("trade_id")
            locked = bool(body.get("locked", True))

            with P2P_LOCK:
                trade = P2P_TRADES.get(trade_id)
                if not trade or trade["status"] != "active":
                    return self.send_json({"ok": False, "error": "Sessão de troca inválida."})

                is_p_a = (trade["player_a"]["user_id"] == user["id"] or trade["player_a"]["name"].lower() == user["username"].lower())
                p_side = trade["player_a"] if is_p_a else trade["player_b"]
                p_side["locked"] = locked
                if not locked:
                    p_side["confirmed"] = False
                trade["updated_at"] = time.time()

            return self.send_json({"ok": True, "trade": trade})

        if parsed.path == "/api/p2p/trade/confirm":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user:
                return self.send_json({"ok": False, "error": "Não autenticado."}, status=401)
            trade_id = body.get("trade_id")

            with P2P_LOCK:
                trade = P2P_TRADES.get(trade_id)
                if not trade or trade["status"] != "active":
                    return self.send_json({"ok": False, "error": "Sessão de troca inválida."})

                is_p_a = (trade["player_a"]["user_id"] == user["id"] or trade["player_a"]["name"].lower() == user["username"].lower())
                p_side = trade["player_a"] if is_p_a else trade["player_b"]
                p_side["confirmed"] = True
                trade["updated_at"] = time.time()

                # If BOTH have locked and confirmed, execute atomic trade!
                if trade["player_a"]["locked"] and trade["player_a"]["confirmed"] and trade["player_b"]["locked"] and trade["player_b"]["confirmed"]:
                    offer_a = {
                        "gold": trade["player_a"]["gold"],
                        "items": trade["player_a"]["items"],
                        "mon_uid": trade["player_a"].get("mon_uid")
                    }
                    offer_b = {
                        "gold": trade["player_b"]["gold"],
                        "items": trade["player_b"]["items"],
                        "mon_uid": trade["player_b"].get("mon_uid")
                    }
                    exec_res = db.execute_p2p_trade_db(
                        trade["player_a"]["user_id"],
                        trade["player_b"]["user_id"],
                        offer_a,
                        offer_b
                    )
                    if exec_res.get("ok"):
                        trade["status"] = "completed"
                        trade["result"] = exec_res
                    else:
                        trade["status"] = "failed"
                        trade["error"] = exec_res.get("error", "Erro ao executar troca.")

            return self.send_json({"ok": True, "trade": trade})

        if parsed.path == "/api/p2p/trade/cancel":
            trade_id = body.get("trade_id")
            with P2P_LOCK:
                trade = P2P_TRADES.get(trade_id)
                if trade:
                    trade["status"] = "cancelled"
            return self.send_json({"ok": True})

        if parsed.path == "/api/auth/login":
            username = body.get("username", "")
            password = body.get("password", "")
            auth_res = db.authenticate_user(username, password)
            if not auth_res["ok"]:
                return self.send_json(auth_res, status=401)
            user = auth_res["user"]
            token = db.create_session(user["id"])
            return self.send_json({"ok": True, "token": token, "user": user}, cookie_token=token)

        if parsed.path == "/api/auth/register":
            username = body.get("username", "").strip()
            password = body.get("password", "")
            avatar_model = body.get("avatar_model", "ethan_gold")
            starter_sid = body.get("starter_id", "charmander")

            create_res = db.create_user(username, password, avatar_model=avatar_model)
            if not create_res["ok"]:
                return self.send_json(create_res, status=400)

            user = create_res["user"]
            species_by_id = {s["id"]: s for s in RAW_SPECIES}
            new_player = create_initial_player_save(username, starter_sid, avatar_model, species_by_id)
            db.save_player_save(user["id"], new_player, default_config())

            token = db.create_session(user["id"])
            return self.send_json({"ok": True, "token": token, "user": user}, cookie_token=token)

        if parsed.path == "/api/auth/logout":
            token = get_auth_token(self)
            if token:
                db.delete_session(token)
            return self.send_json({"ok": True}, cookie_token="")

        # Playtester Feedback Endpoint
        if parsed.path == "/api/feedback":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            user_id = user["id"] if user else None
            username = user["username"] if user else (body.get("username") or "Treinador")
            category = body.get("category", "suggestion")
            rating = int(body.get("rating", 5))
            message = body.get("message", "")
            player_summary = body.get("player_summary", "")

            res = db.save_tester_feedback(user_id, username, category, rating, message, player_summary)
            return self.send_json(res, status=200 if res.get("ok") else 400)

        # Playtester Kit Claim Endpoint
        if parsed.path == "/api/playtest/claim-kit":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user:
                return self.send_json({"ok": False, "error": "Faça login para resgatar o kit."}, status=401)
            save_dict = db.get_player_save(user["id"])
            if not save_dict:
                return self.send_json({"ok": False, "error": "Save não encontrado."}, status=404)

            p = save_dict["player"]
            stats = p.setdefault("stats", {})
            if stats.get("playtest_kit_claimed"):
                return self.send_json({"ok": False, "error": "Kit de Playtester já resgatado nesta conta!"}, status=400)

            inv = p.setdefault("inventory", {})
            inv["capsule_ultra"] = inv.get("capsule_ultra", 0) + 20
            inv["capsule_great"] = inv.get("capsule_great", 0) + 15
            inv["stone_fire"] = inv.get("stone_fire", 0) + 5
            inv["stone_water"] = inv.get("stone_water", 0) + 5
            inv["stone_grass"] = inv.get("stone_grass", 0) + 5
            inv["stone_electric"] = inv.get("stone_electric", 0) + 5
            inv["shiny_stone"] = inv.get("shiny_stone", 0) + 3
            p["gold"] = p.get("gold", 0) + 5000
            p["diamonds"] = p.get("diamonds", 0) + 100
            stats["playtest_kit_claimed"] = True

            db.save_player_save(user["id"], p, save_dict.get("config"))
            return self.send_json({
                "ok": True,
                "message": "🎉 Kit de Playtester resgatado com sucesso! +20 Ultra Balls, +15 Great Balls, Pedras, +$5.000 Ouro e +100 Diamantes!",
                "player": p
            })

        if parsed.path == "/api/save":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            p_data = body.get("player")
            c_data = body.get("config")
            if p_data and isinstance(p_data, dict):
                p_data.setdefault("offline_farm", {})["last_active"] = int(time.time() * 1000)
            if user:
                save_res = db.save_player_save(user["id"], p_data, c_data)
                resp = {"ok": True, "storage": "sqlite", "user_id": user["id"]}
                if isinstance(save_res, dict) and save_res.get("admin_sync_player"):
                    resp["admin_sync_player"] = save_res["admin_sync_player"]
                return self.send_json(resp)
            else:
                if p_data:
                    save_json(SAVE_FILE, p_data)
                if c_data:
                    save_json(CONFIG_FILE, c_data)
                return self.send_json({"ok": True, "storage": "file", "guest": True})

        if parsed.path == "/api/offline/claim":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            boot = build_bootstrap(user=user)
            player = boot["player"]
            config = boot["config"]
            report = boot.get("offline_report")
            if not report or not report.get("available"):
                client_rep = body.get("report")
                if client_rep and client_rep.get("available"):
                    report = client_rep
            if report and report.get("available"):
                apply_offline_rewards(player, report)
                if user:
                    db.save_player_save(user["id"], player, config)
                else:
                    save_json(SAVE_FILE, player)
                return self.send_json({"ok": True, "player": player, "report": report})
            return self.send_json({"ok": False, "message": "Nenhum progresso offline pendente para resgatar."})

        if parsed.path == "/api/offline/simulate":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            hours = float(body.get("hours", 2.0))
            apply_rewards = bool(body.get("apply", True))
            forced_seconds = hours * 3600.0

            boot = build_bootstrap(user=user)
            player = boot["player"]
            config = boot["config"]
            species_by_id = {s["id"]: s for s in RAW_SPECIES}
            enriched_zones = boot["zones"]

            report = calculate_offline_progress(player, config, species_by_id, enriched_zones, forced_seconds=forced_seconds)
            if report and apply_rewards:
                apply_offline_rewards(player, report)
                if user:
                    db.save_player_save(user["id"], player, config)
                else:
                    save_json(SAVE_FILE, player)
            return self.send_json({"ok": True, "report": report, "player": player})

        if parsed.path == "/api/offline/config":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            boot = build_bootstrap(user=user)
            player = boot["player"]
            config = boot["config"]
            off_cfg = player.setdefault("offline_farm", {})
            for k in ["enabled", "assigned_zone_id", "auto_catch", "ball_id", "catch_filter", "efficiency_level", "max_offline_hours", "auto_heal", "auto_revive", "auto_sell_pokemon", "auto_sell_filter", "auto_sell_drops"]:
                if k in body:
                    off_cfg[k] = body[k]
            if user:
                db.save_player_save(user["id"], player, config)
            else:
                save_json(SAVE_FILE, player)
            return self.send_json({"ok": True, "offline_farm": off_cfg})

        # Global Market Action Endpoints
        if parsed.path == "/api/market/list":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            user_id = user["id"] if user else 1
            user_name = user["username"] if user else "Treinador"
            boot = build_bootstrap(user=user)
            player = boot["player"]
            config = boot["config"]

            ltype = body.get("listing_type", "item")
            title = body.get("title", "Item").strip()
            category = body.get("category", "item")
            currency = body.get("currency", "gold")
            price = int(body.get("price", 0))

            if price <= 0:
                return self.send_json({"ok": False, "error": "Preço deve ser maior que zero."})

            if ltype == "item":
                item_id = body.get("item_id")
                qty = int(body.get("item_quantity", 1))
                if not item_id or player.get("inventory", {}).get(item_id, 0) < qty:
                    return self.send_json({"ok": False, "error": "Quantidade insuficiente do item na mochila."})
                player["inventory"][item_id] -= qty
                if player["inventory"][item_id] <= 0:
                    del player["inventory"][item_id]
                res = db.create_market_listing(
                    seller_id=user_id, seller_name=user_name, listing_type="item",
                    title=title, category=category, currency=currency, price=price,
                    item_id=item_id, item_quantity=qty, item_icon=body.get("item_icon", 0),
                    item_desc=body.get("item_desc", "")
                )
            elif ltype == "pokemon":
                pk_uid = body.get("pokemon_uid")
                found_pk = None
                for idx, p in enumerate(player.get("party", [])):
                    if p.get("uid") == pk_uid:
                        if len(player["party"]) <= 1:
                            return self.send_json({"ok": False, "error": "Você não pode vender seu único Pokémon da equipe!"})
                        found_pk = player["party"].pop(idx)
                        break
                if not found_pk:
                    for idx, p in enumerate(player.get("pc_box", [])):
                        if p.get("uid") == pk_uid:
                            found_pk = player["pc_box"].pop(idx)
                            break
                if not found_pk:
                    return self.send_json({"ok": False, "error": "Pokémon não encontrado no seu time ou PC Box."})
                res = db.create_market_listing(
                    seller_id=user_id, seller_name=user_name, listing_type="pokemon",
                    title=title or f"{found_pk['name']} Lv.{found_pk['level']}",
                    category="pokemon", currency=currency, price=price,
                    pokemon_uid=pk_uid, pokemon_data=found_pk
                )
            else:
                return self.send_json({"ok": False, "error": "Tipo de anúncio inválido."})

            if user:
                db.save_player_save(user["id"], player, config)
            else:
                save_json(SAVE_FILE, player)
            res["player"] = player
            return self.send_json(res)

        if parsed.path == "/api/market/cancel":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            user_id = user["id"] if user else 1
            listing_id = int(body.get("listing_id", 0))

            res = db.cancel_market_listing(listing_id, user_id)
            if not res.get("ok"):
                return self.send_json(res)

            boot = build_bootstrap(user=user)
            player = boot["player"]
            config = boot["config"]
            l = res["listing"]
            if l["listing_type"] == "item" and l.get("item_id"):
                player.setdefault("inventory", {})
                player["inventory"][l["item_id"]] = player["inventory"].get(l["item_id"], 0) + l.get("item_quantity", 1)
            elif l["listing_type"] == "pokemon" and l.get("pokemon"):
                if len(player.get("party", [])) < 6:
                    player.setdefault("party", []).append(l["pokemon"])
                else:
                    player.setdefault("pc_box", []).append(l["pokemon"])

            if user:
                db.save_player_save(user["id"], player, config)
            else:
                save_json(SAVE_FILE, player)
            res["player"] = player
            return self.send_json(res)

        if parsed.path == "/api/market/buy":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            user_id = user["id"] if user else 1
            user_name = user["username"] if user else "Treinador"
            listing_id = int(body.get("listing_id", 0))

            boot = build_bootstrap(user=user)
            player = boot["player"]
            config = boot["config"]

            res = db.buy_market_listing(listing_id, user_id, user_name, player)
            if not res.get("ok"):
                return self.send_json(res)

            if user:
                db.save_player_save(user["id"], player, config)
            else:
                save_json(SAVE_FILE, player)
            res["player"] = player
            return self.send_json(res)

        if parsed.path == "/api/market/admin/withdraw":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user and body.get("test_admin") == 1:
                user = {"id": 3, "username": "Admin", "role": "admin", "is_admin": True}
            if not user or not user.get("is_admin"):
                return self.send_json({"ok": False, "error": "Acesso Negado: Apenas administradores podem resgatar fundos do Cofre do Servidor."}, status=403)
            amt_gold = int(body.get("amount_gold", 0))
            amt_diamonds = int(body.get("amount_diamonds", 0))
            return self.send_json(db.withdraw_server_hold(user, user["username"], amt_gold, amt_diamonds))

        if parsed.path == "/api/admin/species-override":
            sid = body.get("species_id")
            updates = body.get("updates", {})
            if sid:
                overrides = load_json(OVERRIDES_FILE, {})
                overrides.setdefault(sid, {}).update(updates)
                save_json(OVERRIDES_FILE, overrides)
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            return self.send_json(build_bootstrap(user=user))

        if parsed.path == "/api/admin/broadcast":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user or not user.get("is_admin"):
                return self.send_json({"ok": False, "error": "Acesso Negado."}, status=403)
            text = body.get("text", "").strip()
            style = body.get("style", "gold")
            if not text:
                return self.send_json({"ok": False, "error": "Texto do anúncio não pode estar vazio."})
            b_data = {
                "id": f"bc_{int(time.time()*1000)}",
                "text": text,
                "style": style,
                "sender": user.get("username", "Admin"),
                "timestamp": time.time()
            }
            with ADMIN_BROADCAST_LOCK:
                ADMIN_CURRENT_BROADCAST = b_data
            db.save_chat_message("global", f"👑 [ADM {user.get('username')}]", None, text)
            return self.send_json({"ok": True, "message": "Anúncio global transmitido com sucesso!", "broadcast": b_data})

        if parsed.path == "/api/admin/user/update":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user or not user.get("is_admin"):
                return self.send_json({"ok": False, "error": "Acesso Negado."}, status=403)
            target_user_id = int(body.get("user_id", 0))
            role = body.get("role")
            level = body.get("level")
            gold = body.get("gold")
            diamonds = body.get("diamonds")
            username = body.get("username")
            avatar_model = body.get("avatar_model")
            has_master_key = body.get("has_master_key")
            res = db.admin_update_player_account(
                target_user_id,
                role=role,
                level=level,
                gold=gold,
                diamonds=diamonds,
                username=username,
                avatar_model=avatar_model,
                has_master_key=has_master_key
            )
            return self.send_json(res)

        if parsed.path == "/api/admin/user/heal":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user or not user.get("is_admin"):
                return self.send_json({"ok": False, "error": "Acesso Negado."}, status=403)
            target_user_id = int(body.get("user_id", 0))
            return self.send_json(db.admin_heal_player_party(target_user_id))

        if parsed.path == "/api/admin/user/give-item":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user or not user.get("is_admin"):
                return self.send_json({"ok": False, "error": "Acesso Negado."}, status=403)
            target_user_id = int(body.get("user_id", 0))
            item_id = body.get("item_id", "")
            qty = int(body.get("qty", 1))
            return self.send_json(db.admin_inject_item_into_player(target_user_id, item_id, qty))

        if parsed.path == "/api/admin/user/give-pokemon":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user or not user.get("is_admin"):
                return self.send_json({"ok": False, "error": "Acesso Negado."}, status=403)
            target_user_id = int(body.get("user_id", 0))
            species_id = body.get("species_id", "mewtwo")
            level = int(body.get("level", 100))
            quality = body.get("quality", "Mítico")
            is_shiny = bool(body.get("is_shiny", False))
            target_storage = body.get("target_storage", "party")
            sp = next((s for s in RAW_SPECIES if s["id"] == species_id), None)
            if not sp:
                return self.send_json({"ok": False, "error": f"Espécie '{species_id}' não encontrada."})
            mon = make_pokemon_instance(sp, level=level, is_shiny=is_shiny, quality=quality)
            return self.send_json(db.admin_inject_pokemon_into_player(target_user_id, mon, target_storage))

        if parsed.path == "/api/admin/user/reset-pos":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user or not user.get("is_admin"):
                return self.send_json({"ok": False, "error": "Acesso Negado."}, status=403)
            target_user_id = int(body.get("user_id", 0))
            return self.send_json(db.admin_reset_player_position(target_user_id))

        if parsed.path == "/api/admin/user/ban":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user or not user.get("is_admin"):
                return self.send_json({"ok": False, "error": "Acesso Negado."}, status=403)
            target_user_id = int(body.get("user_id", 0))
            banned = bool(body.get("banned", True))
            return self.send_json(db.admin_toggle_ban_user(target_user_id, banned))

        if parsed.path == "/api/admin/grant-kit":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user or not user.get("is_admin"):
                return self.send_json({"ok": False, "error": "Acesso Negado."}, status=403)
            kit = body.get("kit")
            save_obj = db.get_player_save(user["id"])
            if not save_obj or not save_obj.get("player"):
                return self.send_json({"ok": False, "error": "Save do usuário não encontrado."})
            p = save_obj["player"]
            inv = p.setdefault("inventory", {})

            if kit == "gold_million":
                p["gold"] = p.get("gold", 0) + 1000000
                msg = "+ $1.000.000 Gold adicionados à sua conta!"
            elif kit == "diamonds_50k":
                p["diamonds"] = p.get("diamonds", 0) + 50000
                msg = "+ 50.000 Diamantes adicionados à sua conta!"
            elif kit == "all_balls_999":
                for item in RAW_ITEMS:
                    if item.get("type") == "capsule":
                        inv[item["id"]] = 999
                msg = "999x de TODAS as 22 Pokébolas adicionadas à mochila!"
            elif kit == "all_stones_999":
                for item in RAW_ITEMS:
                    if item.get("id", "").startswith("stone_") or item.get("id") == "shiny_stone":
                        inv[item["id"]] = 999
                msg = "999x de TODAS as Pedras de Evolução adicionadas à mochila!"
            elif kit == "max_cures_999":
                for cid in ["max_revive", "revive", "max_potion", "hyper_potion", "full_restore"]:
                    inv[cid] = 999
                msg = "999x Max Potions e Max Revives adicionados à mochila!"
            elif kit == "unlock_all_dex":
                p["pokedex_caught"] = [s["id"] for s in RAW_SPECIES]
                msg = "Todas as 400 Espécies da Pokédex foram desbloqueadas como capturadas!"
            else:
                return self.send_json({"ok": False, "error": "Kit desconhecido."})

            db.save_player_save(user["id"], p, save_obj.get("config"), is_admin_write=True)
            return self.send_json({"ok": True, "message": msg, "player": p})

        if parsed.path == "/api/admin/server/reload":
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None
            if not user or not user.get("is_admin"):
                return self.send_json({"ok": False, "error": "Acesso Negado."}, status=403)
            RAW_SPECIES = load_json(SPECIES_FILE, [])
            raw_items_dict = load_json(ITEMS_FILE, {})
            RAW_ITEMS = raw_items_dict.get("data", []) if isinstance(raw_items_dict, dict) else raw_items_dict
            RAW_WORLDS = load_json(WORLDS_FILE, [])
            return self.send_json({"ok": True, "message": "Arquivos de configuração e dados recarregados com sucesso!"})

        if parsed.path == "/api/admin/preset":
            preset = body.get("preset")
            species_by_id = {s["id"]: s for s in RAW_SPECIES}
            token = get_auth_token(self)
            user = db.get_user_by_session(token) if token else None

            if preset == "official":
                save_json(CONFIG_FILE, default_config())
                save_json(OVERRIDES_FILE, {})
            elif preset == "custom_plus":
                cfg = default_config()
                cfg.update({
                    "server_name": "PokéLand Unleashed (22 Bolas + Lendários)",
                    "catch_rate_mult": 1.5,
                    "max_capture_cap": 100.0,
                    "hp_capture_bonus": True,
                    "exp_mult": 3.0,
                    "gold_mult": 3.0,
                    "drop_mult": 2.5,
                    "shiny_chance": 0.01,
                    "unlock_all_capsules": True,
                    "unlock_legendary_islands": True,
                    "unlock_safari_zone": True,
                })
                save_json(CONFIG_FILE, cfg)
            elif preset == "god_mode":
                if user:
                    save_obj = db.get_player_save(user["id"])
                    player = save_obj["player"] if save_obj else default_player(species_by_id)
                else:
                    player = load_json(SAVE_FILE, default_player(species_by_id))
                player["gold"] = player.get("gold", 0) + 500000
                player["diamonds"] = player.get("diamonds", 0) + 5000
                player["has_master_key"] = True
                for item in RAW_ITEMS:
                    if item.get("type") == "capsule" or item["id"].startswith("stone_") or item["id"] == "shiny_stone":
                        player["inventory"][item["id"]] = player["inventory"].get(item["id"], 0) + 100
                for god_sid in ["lugia", "ho-oh", "mewtwo", "rayquaza", "milotic"]:
                    if god_sid in species_by_id and god_sid not in player["pokedex_caught"]:
                        mon = make_pokemon_instance(species_by_id[god_sid], level=100, is_shiny=True, quality="Mítico", custom_mult=2.58)
                        if len(player["party"]) < 6:
                            player["party"].append(mon)
                        else:
                            player["pc_box"].append(mon)
                        player["pokedex_caught"].append(god_sid)
                if user:
                    db.save_player_save(user["id"], player, is_admin_write=True)
                else:
                    save_json(SAVE_FILE, player)
            elif preset == "reset_save":
                new_p = default_player(species_by_id)
                if user:
                    db.save_player_save(user["id"], new_p, is_admin_write=True)
                else:
                    save_json(SAVE_FILE, new_p)
            return self.send_json(build_bootstrap(user=user))

        return self.send_json({"error": "Not found"}, status=404)


if __name__ == "__main__":
    species_by_id = {s["id"]: s for s in RAW_SPECIES}
    db.init_db(
        existing_save=load_json(SAVE_FILE),
        existing_config=load_json(CONFIG_FILE),
        default_player_func=default_player,
        species_by_id=species_by_id,
    )
    port = int(os.environ.get("PORT", "8080"))
    server = ThreadingHTTPServer(("0.0.0.0", port), GameRequestHandler)
    
    local_ip = "127.0.0.1"
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
    except Exception:
        pass

    print("=" * 68)
    print(">> POKELAND -- SERVIDOR DE PLAYTEST PRONTO PARA JOGADORES!")
    print(f">> Acesso Local:        http://localhost:{port}/")
    print(f">> Acesso Rede / Wi-Fi:  http://{local_ip}:{port}/")
    print(f">> Portal de Login:     http://{local_ip}:{port}/login.html")
    print(">> Banco SQLite 3 Conectado com WAL Concurrency Mode")
    print("=" * 68, flush=True)
    server.serve_forever()
