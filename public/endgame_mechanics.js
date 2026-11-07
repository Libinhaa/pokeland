// =========================================================
// POKÉLAND: GRAND ENDGAME & LEAGUE MECHANICS SUBSYSTEM
// (GvG, PvP Ranked, Gyms, Elite Four, Safari, World Boss, Dungeons)
// =========================================================

let CURRENT_MECHANICS_SUB = "gvg";

// State structures for endgame systems
const ENDGAME_STATE = {
    pvp: {
        elo: 1450,
        tier: "Ouro II",
        wins: 48,
        losses: 12,
        seasonDaysLeft: 16,
        inMatch: false,
    },
    gvg: {
        guildName: "PokéMasters Elite",
        guildLevel: 14,
        rank: 2,
        honorPoints: 5420,
        dailyDividendsClaimed: false,
        territories: [
            { id: "silph", name: "Silph Co. HQ (Saffron)", owner: "PokéMasters Elite", bonus: "+15% Ouro", points: 1450, contested: false },
            { id: "indigo", name: "Indigo Citadel (Planalto)", owner: "Team Rocket Guild", bonus: "+20% EXP", points: 1820, contested: true },
            { id: "power", name: "Kanto Power Plant", owner: "PokéMasters Elite", bonus: "+10% Dano Elétrico", points: 1100, contested: false },
            { id: "cinnabar", name: "Cinnabar Volcano Fortress", owner: "Dragon Clan", bonus: "+15% Dano Fogo", points: 1050, contested: true },
        ]
    },
    gymRegionFilter: "all",
    gyms: [
        // ================= KANTO (8 GINÁSIOS OFICIAIS) =================
        {
            id: "pewter", region: "Kanto", name: "Ginásio de Pewter", leader: "Brock", skinId: "brock",
            type: "Pedra", typeColor: "#a8a29e", badge: "Boulder Badge", badgeImg: "/img/badges/badge_boulder.png",
            minLv: 15, leaderSprite: "/img/trainers/leader_brock.png", skinIcon: "/img/trainers/icon_pp_Leader_brock.png",
            mapName: "Cânion de Escavação & Fósseis de Pewter",
            quote: "Minha defesa rochosa e força de vontade são impenetráveis! Vai, Geodude!",
            ace: "Onix Lv.18",
            team: [
                { species: "geodude", name: "Geodude", lv: 14 },
                { species: "rhyhorn", name: "Rhyhorn", lv: 15 },
                { species: "omastar", name: "Omastar Fóssil", lv: 16 },
                { species: "kabutops", name: "Kabutops Fóssil", lv: 16 },
                { species: "golem", name: "Golem Blindado", lv: 17 },
                { species: "onix", name: "Onix Gigante", lv: 18, isAce: true }
            ]
        },
        {
            id: "cerulean", region: "Kanto", name: "Ginásio de Cerulean", leader: "Misty", skinId: "misty",
            type: "Água", typeColor: "#38bdf8", badge: "Cascade Badge", badgeImg: "/img/badges/badge_cascade.png",
            minLv: 24, leaderSprite: "/img/trainers/leader_misty.png", skinIcon: "/img/trainers/icon_pp_Leader_misty.png",
            mapName: "Complexo Aquático Olímpico de Cerulean",
            quote: "Minha ofensiva total com Pokémon de Água vai te levar na correnteza!",
            ace: "Starmie Lv.26",
            team: [
                { species: "goldeen", name: "Goldeen", lv: 21 },
                { species: "psyduck", name: "Psyduck", lv: 22 },
                { species: "seadra", name: "Seadra", lv: 23 },
                { species: "corsola", name: "Corsola", lv: 24 },
                { species: "gyarados", name: "Gyarados Feroz", lv: 25 },
                { species: "starmie", name: "Starmie Rubi", lv: 26, isAce: true }
            ]
        },
        {
            id: "vermilion", region: "Kanto", name: "Ginásio de Vermilion", leader: "Lt. Surge", skinId: "surge",
            type: "Elétrico", typeColor: "#facc15", badge: "Thunder Badge", badgeImg: "/img/badges/badge_thunder.png",
            minLv: 32, leaderSprite: "/img/trainers/leader_surge.png", skinIcon: "/img/trainers/icon_pp_Leader_surge.png",
            mapName: "Usina Militar de Alta Tensão de Vermilion",
            quote: "Ei, garoto! Meus Pokémon Elétricos me salvaram na guerra e vão te eletrocutar!",
            ace: "Raichu Lv.35",
            team: [
                { species: "voltorb", name: "Voltorb", lv: 29 },
                { species: "pikachu", name: "Pikachu", lv: 30 },
                { species: "magneton", name: "Magneton", lv: 31 },
                { species: "electrode", name: "Electrode", lv: 32 },
                { species: "electabuzz", name: "Electabuzz", lv: 33 },
                { species: "raichu", name: "Raichu Trovão", lv: 35, isAce: true }
            ]
        },
        {
            id: "celadon", region: "Kanto", name: "Ginásio de Celadon", leader: "Erika", skinId: "erika",
            type: "Planta", typeColor: "#4ade80", badge: "Rainbow Badge", badgeImg: "/img/badges/badge_rainbow.png",
            minLv: 40, leaderSprite: "/img/trainers/leader_erika.png", skinIcon: "/img/trainers/icon_pp_Leader_erika.png",
            mapName: "Jardim Botânico Imperial & Estufa de Celadon",
            quote: "Meus Pokémon de Planta florescem com elegância e poder natural!",
            ace: "Vileplume Lv.44",
            team: [
                { species: "tangela", name: "Tangela", lv: 38 },
                { species: "weepinbell", name: "Weepinbell", lv: 39 },
                { species: "parasect", name: "Parasect", lv: 40 },
                { species: "bellossom", name: "Bellossom", lv: 41 },
                { species: "victreebel", name: "Victreebel", lv: 42 },
                { species: "vileplume", name: "Vileplume Imperial", lv: 44, isAce: true }
            ]
        },
        {
            id: "fuchsia", region: "Kanto", name: "Ginásio de Fuchsia", leader: "Koga", skinId: "koga",
            type: "Veneno", typeColor: "#c084fc", badge: "Soul Badge", badgeImg: "/img/badges/badge_soul.png",
            minLv: 50, leaderSprite: "/img/trainers/leader_koga.png", skinIcon: "/img/trainers/icon_pp_Leader_koga.png",
            mapName: "Dojo Shinobi das Paredes Invisíveis",
            quote: "Fwahahaha! Sinta o desespero das técnicas ninjas e toxinas de Fuchsia!",
            ace: "Venomoth Lv.53",
            team: [
                { species: "koffing", name: "Koffing", lv: 47 },
                { species: "arbok", name: "Arbok", lv: 48 },
                { species: "muk", name: "Muk Tóxico", lv: 49 },
                { species: "weezing", name: "Weezing", lv: 50 },
                { species: "crobat", name: "Crobat Shinobi", lv: 51 },
                { species: "venomoth", name: "Venomoth Sombra", lv: 53, isAce: true }
            ]
        },
        {
            id: "saffron", region: "Kanto", name: "Ginásio de Saffron", leader: "Sabrina", skinId: "sabrina",
            type: "Psíquico", typeColor: "#f472b6", badge: "Marsh Badge", badgeImg: "/img/badges/badge_marsh.png",
            minLv: 58, leaderSprite: "/img/trainers/leader_sabrina.png", skinIcon: "/img/trainers/icon_pp_Leader_sabrina.png",
            mapName: "Santuário Psíquico de Teletransporte",
            quote: "Eu já previ sua chegada e o destino desta batalha com meus poderes psíquicos!",
            ace: "Alakazam Lv.61",
            team: [
                { species: "abra", name: "Abra", lv: 55 },
                { species: "kadabra", name: "Kadabra", lv: 56 },
                { species: "mr-mime", name: "Mr. Mime", lv: 57 },
                { species: "jynx", name: "Jynx", lv: 58 },
                { species: "espeon", name: "Espeon Solar", lv: 59 },
                { species: "alakazam", name: "Alakazam Psíquico", lv: 61, isAce: true }
            ]
        },
        {
            id: "cinnabar_gym", region: "Kanto", name: "Ginásio de Cinnabar", leader: "Blaine", skinId: "blaine",
            type: "Fogo", typeColor: "#fb923c", badge: "Volcano Badge", badgeImg: "/img/badges/badge_volcano.png",
            minLv: 65, leaderSprite: "/img/trainers/leader_blaine.png", skinIcon: "/img/trainers/icon_pp_Leader_blaine.png",
            mapName: "Caldeira Vulcânica & Arena de Quiz de Cinnabar",
            quote: "Hah! Meus Pokémon incandescentes vão incinerar todos os desafiantes!",
            ace: "Magmar Lv.69",
            team: [
                { species: "growlithe", name: "Growlithe", lv: 63 },
                { species: "ponyta", name: "Ponyta", lv: 64 },
                { species: "rapidash", name: "Rapidash", lv: 65 },
                { species: "ninetales", name: "Ninetales", lv: 66 },
                { species: "arcanine", name: "Arcanine Real", lv: 67 },
                { species: "magmar", name: "Magmar Vulcânico", lv: 69, isAce: true }
            ]
        },
        {
            id: "viridian", region: "Kanto", name: "Ginásio de Viridian", leader: "Giovanni", skinId: "giovanni",
            type: "Terra", typeColor: "#d97706", badge: "Earth Badge", badgeImg: "/img/badges/badge_earth.png",
            minLv: 75, leaderSprite: "/img/trainers/leader_giovanni.png", skinIcon: "/img/trainers/icon_pp_Leader_giovanni.png",
            mapName: "Quartel-General Tectônico de Viridian",
            quote: "Prepare-se para sentir a fúria sísmica do líder supremo de Viridian!",
            ace: "Rhydon Lv.80",
            team: [
                { species: "persian", name: "Persian", lv: 72 },
                { species: "dugtrio", name: "Dugtrio", lv: 73 },
                { species: "nidoqueen", name: "Nidoqueen", lv: 75 },
                { species: "nidoking", name: "Nidoking", lv: 76 },
                { species: "kangaskhan", name: "Kangaskhan", lv: 77 },
                { species: "rhydon", name: "Rhydon Supremo", lv: 80, isAce: true }
            ]
        },
        // ================= JOHTO (8 GINÁSIOS OFICIAIS) =================
        {
            id: "violet", region: "Johto", name: "Ginásio de Violet", leader: "Falkner", skinId: "falkner",
            type: "Voador", typeColor: "#60a5fa", badge: "Zephyr Badge", badgeImg: "/img/badges/badge_zephyr.png",
            minLv: 20, leaderSprite: "/img/trainers/leader_falkner.png", skinIcon: "/img/trainers/icon_pp_Leader_falkner.png",
            mapName: "Pagode Celeste das Nuvens de Violet",
            quote: "Vou te mostrar a verdadeira majestade das asas que cortam os céus de Johto!",
            ace: "Pidgeot Lv.22",
            team: [
                { species: "pidgey", name: "Pidgey", lv: 16 },
                { species: "hoothoot", name: "Hoothoot", lv: 17 },
                { species: "spearow", name: "Spearow", lv: 18 },
                { species: "farfetchd", name: "Farfetch'd", lv: 19 },
                { species: "noctowl", name: "Noctowl", lv: 20 },
                { species: "pidgeot", name: "Pidgeot Zéfiro", lv: 22, isAce: true }
            ]
        },
        {
            id: "azalea", region: "Johto", name: "Ginásio de Azalea", leader: "Bugsy", skinId: "bugsy",
            type: "Inseto", typeColor: "#a3e635", badge: "Hive Badge", badgeImg: "/img/badges/badge_hive.png",
            minLv: 28, leaderSprite: "/img/trainers/leader_bugsy.png", skinIcon: "/img/trainers/icon_pp_Leader_bugsy.png",
            mapName: "Colmeia Florestal & Domo de Teias de Azalea",
            quote: "Minha pesquisa sobre Pokémon Inseto me tornou a maior autoridade de Johto!",
            ace: "Scyther Lv.29",
            team: [
                { species: "metapod", name: "Metapod", lv: 24 },
                { species: "kakuna", name: "Kakuna", lv: 24 },
                { species: "butterfree", name: "Butterfree", lv: 26 },
                { species: "beedrill", name: "Beedrill", lv: 26 },
                { species: "pinsir", name: "Pinsir", lv: 27 },
                { species: "scyther", name: "Scyther Lâmina", lv: 29, isAce: true }
            ]
        },
        {
            id: "goldenrod", region: "Johto", name: "Ginásio de Goldenrod", leader: "Whitney", skinId: "whitney",
            type: "Normal", typeColor: "#f9a8d4", badge: "Plain Badge", badgeImg: "/img/badges/badge_plain.png",
            minLv: 35, leaderSprite: "/img/trainers/leader_whitney.png", skinIcon: "/img/trainers/icon_pp_Leader_whitney.png",
            mapName: "Jardim Clefairy & Passarela Rosa de Goldenrod",
            quote: "Meus Pokémon não são apenas super fofos — eles são incrivelmente fortes!",
            ace: "Miltank Lv.37",
            team: [
                { species: "clefairy", name: "Clefairy", lv: 31 },
                { species: "jigglypuff", name: "Jigglypuff", lv: 32 },
                { species: "wigglytuff", name: "Wigglytuff", lv: 33 },
                { species: "clefable", name: "Clefable", lv: 34 },
                { species: "tauros", name: "Tauros", lv: 35 },
                { species: "miltank", name: "Miltank Rollout", lv: 37, isAce: true }
            ]
        },
        {
            id: "ecruteak", region: "Johto", name: "Ginásio de Ecruteak", leader: "Morty", skinId: "morty",
            type: "Fantasma", typeColor: "#818cf8", badge: "Fog Badge", badgeImg: "/img/badges/badge_fog.png",
            minLv: 44, leaderSprite: "/img/trainers/leader_morty.png", skinIcon: "/img/trainers/icon_pp_Leader_morty.png",
            mapName: "Ponte Espectral das Chamas Fátuas de Ecruteak",
            quote: "Treinei toda a minha vida em Ecruteak para ver o além através dos Pokémon Fantasma!",
            ace: "Gengar Lv.46",
            team: [
                { species: "gastly", name: "Gastly", lv: 40 },
                { species: "haunter", name: "Haunter", lv: 41 },
                { species: "misdreavus", name: "Misdreavus", lv: 42 },
                { species: "marowak", name: "Marowak", lv: 43 },
                { species: "ninetales", name: "Ninetales Místico", lv: 44 },
                { species: "gengar", name: "Gengar Espectral", lv: 46, isAce: true }
            ]
        },
        {
            id: "cianwood", region: "Johto", name: "Ginásio de Cianwood", leader: "Chuck", skinId: "chuck",
            type: "Lutador", typeColor: "#f87171", badge: "Storm Badge", badgeImg: "/img/badges/badge_storm.png",
            minLv: 52, leaderSprite: "/img/trainers/leader_chuck.png", skinIcon: "/img/trainers/icon_pp_Leader_chuck.png",
            mapName: "Dojo da Cachoeira Rugidora de Cianwood",
            quote: "WAHAHAH! Meus punhos e meus Pokémon Lutadores esmagam rochas sob esta cachoeira!",
            ace: "Poliwrath Lv.55",
            team: [
                { species: "mankey", name: "Mankey", lv: 49 },
                { species: "primeape", name: "Primeape", lv: 50 },
                { species: "hitmonlee", name: "Hitmonlee", lv: 51 },
                { species: "hitmonchan", name: "Hitmonchan", lv: 51 },
                { species: "machamp", name: "Machamp", lv: 53 },
                { species: "poliwrath", name: "Poliwrath Tempestade", lv: 55, isAce: true }
            ]
        },
        {
            id: "olivine", region: "Johto", name: "Ginásio de Olivine", leader: "Jasmine", skinId: "jasmine",
            type: "Aço", typeColor: "#cbd5e1", badge: "Mineral Badge", badgeImg: "/img/badges/badge_mineral.png",
            minLv: 60, leaderSprite: "/img/trainers/leader_jasmine.png", skinIcon: "/img/trainers/icon_pp_Leader_jasmine.png",
            mapName: "Santuário de Engrenagens & Farol de Aço de Olivine",
            quote: "O tipo Aço possui uma vontade inquebrável... Não vou pegar leve!",
            ace: "Steelix Lv.63",
            team: [
                { species: "magnemite", name: "Magnemite", lv: 57 },
                { species: "magneton", name: "Magneton", lv: 58 },
                { species: "forretress", name: "Forretress", lv: 59 },
                { species: "skarmory", name: "Skarmory", lv: 60 },
                { species: "scizor", name: "Scizor", lv: 61 },
                { species: "steelix", name: "Steelix Titânio", lv: 63, isAce: true }
            ]
        },
        {
            id: "mahogany", region: "Johto", name: "Ginásio de Mahogany", leader: "Pryce", skinId: "pryce",
            type: "Gelo", typeColor: "#67e8f9", badge: "Glacier Badge", badgeImg: "/img/badges/badge_glacier.png",
            minLv: 68, leaderSprite: "/img/trainers/leader_pryce.png", skinIcon: "/img/trainers/icon_pp_Leader_pryce.png",
            mapName: "Palácio Glacial & Pista de Gelo de Mahogany",
            quote: "Eu sou Pryce, o treinador do inverno rigoroso. Congelarei suas investidas!",
            ace: "Piloswine Lv.71",
            team: [
                { species: "seel", name: "Seel", lv: 65 },
                { species: "dewgong", name: "Dewgong", lv: 66 },
                { species: "cloyster", name: "Cloyster", lv: 67 },
                { species: "jynx", name: "Jynx", lv: 68 },
                { species: "lapras", name: "Lapras", lv: 69 },
                { species: "piloswine", name: "Piloswine Glacial", lv: 71, isAce: true }
            ]
        },
        {
            id: "blackthorn", region: "Johto", name: "Ginásio de Blackthorn", leader: "Clair", skinId: "clair",
            type: "Dragão", typeColor: "#818cf8", badge: "Rising Badge", badgeImg: "/img/badges/badge_rising.png",
            minLv: 78, leaderSprite: "/img/trainers/leader_clair.png", skinIcon: "/img/trainers/icon_pp_Leader_clair.png",
            mapName: "Santuário Dracônico de Lava de Blackthorn",
            quote: "Eu sou Clair, a maior mestra de Dragões do mundo! Enfrente meus 6 Pokémon!",
            ace: "Kingdra Lv.82",
            team: [
                { species: "dratini", name: "Dratini", lv: 74 },
                { species: "dragonair", name: "Dragonair", lv: 75 },
                { species: "gyarados", name: "Gyarados", lv: 76 },
                { species: "aerodactyl", name: "Aerodactyl", lv: 77 },
                { species: "dragonite", name: "Dragonite", lv: 79 },
                { species: "kingdra", name: "Kingdra Real", lv: 82, isAce: true }
            ]
        }
    ],
    eliteFour: {
        currentStage: 1, // 1 to 5
        completed: false,
        members: [
            { stage: 1, name: "Lorelei", title: "Mestre do Gelo & Água", ace: "Lapras Lv.82", defeated: false },
            { stage: 2, name: "Bruno", title: "Mestre de Luta & Rocha", ace: "Machamp Lv.84", defeated: false },
            { stage: 3, name: "Agatha", title: "Mestre dos Fantasmas & Veneno", ace: "Gengar Lv.86", defeated: false },
            { stage: 4, name: "Lance", title: "Domador dos Dragões Supremos", ace: "Dragonite Lv.90", defeated: false },
            { stage: 5, name: "Campeão Blue", title: "Campeão Supremo da Liga", ace: "Charizard Mítico Lv.95", defeated: false },
        ]
    },
    safari: {
        active: false,
        ballsLeft: 30,
        currentMon: null,
        fleeRate: 20,
        catchRate: 35,
    },
    worldBoss: {
        id: "mewtwo_armored",
        name: "Mewtwo Armored (Titã Psíquico Ancestral)",
        maxHp: 5000000,
        currentHp: 3840250,
        element: "psychic",
        timerMinutes: 42,
        playerDamageDealt: 184500,
        leaderboard: [
            { rank: 1, name: "Ash_Master", dps: 450200 },
            { rank: 2, name: "Red", dps: 184500 },
            { rank: 3, name: "Gary_Oak", dps: 162100 },
            { rank: 4, name: "Cynthia_Champion", dps: 139400 },
            { rank: 5, name: "Steven_Stone", dps: 118900 },
        ]
    },
    dungeons: [
        { id: "cerulean_cave", name: "Cerulean Deep Cave", reqLv: 60, waves: 3, boss: "Mewtwo Prototype Lv.75", rewards: "$35,000 Ouro • 40 Diamantes • Pedra da Água" },
        { id: "power_plant", name: "Abandoned Power Plant", reqLv: 75, waves: 3, boss: "Zapdos Energizado Lv.85", rewards: "$50,000 Ouro • 60 Diamantes • Eletrificador" },
        { id: "silph_co", name: "Silph Co. Infiltration", reqLv: 85, waves: 3, boss: "Porygon-Z Cibernético Lv.92", rewards: "$75,000 Ouro • 90 Diamantes • Master Key" },
        { id: "mt_silver", name: "Mt. Silver Ancient Peak", reqLv: 100, waves: 4, boss: "Tyranitar Mítico Shiny Lv.100", rewards: "$120,000 Ouro • 150 Diamantes • Ovo Mítico" },
    ]
};

function switchMechanicsSubmenu(subTab) {
    CURRENT_MECHANICS_SUB = subTab;
    document.querySelectorAll(".mechanics-submenu-pill").forEach(pill => {
        pill.classList.toggle("active", pill.dataset.mechSub === subTab);
    });
    document.querySelectorAll(".mechanics-sub-view").forEach(view => {
        view.classList.toggle("active", view.id === `mech-sub-${subTab}`);
    });
    renderMechanicsModal(subTab);
}

function renderMechanicsModal(subTab = CURRENT_MECHANICS_SUB) {
    if (!STATE.player) return;

    if (subTab === "gvg") {
        renderGvgSection();
    } else if (subTab === "pvp") {
        renderPvpRankedSection();
    } else if (subTab === "gyms") {
        renderGymsSection();
    } else if (subTab === "elite4") {
        renderEliteFourSection();
    } else if (subTab === "safari") {
        renderSafariZoneSection();
    } else if (subTab === "worldboss") {
        renderWorldBossSection();
    } else if (subTab === "dungeons") {
        renderDungeonsSection();
    }
}

// ---------------------------------------------------------
// 1. GUILD VS GUILD (GVG)
// ---------------------------------------------------------
function renderGvgSection() {
    const container = document.getElementById("mech-gvg-container");
    if (!container) return;
    const g = ENDGAME_STATE.gvg;

    const territoriesHtml = g.territories.map(t => `
        <div class="gvg-territory-card ${t.owner === g.guildName ? 'is-owned' : 'is-contested'}">
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-weight:800;font-size:14px;color:#f8fafc;">🏰 ${t.name}</span>
                <span class="badge-status-pill ${t.owner === g.guildName ? 'pill-won' : 'pill-locked'}">${t.owner === g.guildName ? 'DOMÍNIO NOSSO' : 'DISPUTADO'}</span>
            </div>
            <div style="font-size:11.5px;color:#94a3b8;margin:6px 0;">
                Ocupante Atual: <strong style="color:#e2e8f0;">${t.owner}</strong><br>
                Bônus de Território: <strong style="color:#38bdf8;">${t.bonus}</strong> • Pontos: <strong style="color:#fde047;">${t.points} pts</strong>
            </div>
            <div style="display:flex;gap:6px;margin-top:6px;">
                <button class="btn ${t.owner === g.guildName ? 'btn-green' : 'btn-amber'}" style="flex:1;font-size:11px;" onclick="battleGvgTerritory('${t.id}')">
                    ${t.owner === g.guildName ? '🛡️ Defender' : '⚔️ Conquistar'}
                </button>
                <button class="btn btn-blue" style="flex:1;font-size:11px;" onclick="enterChallengeArena('gvg', { territoryId: '${t.id}', territoryName: '${t.name}' })">
                    🏰 Entrar na Arena
                </button>
            </div>
        </div>
    `).join("");

    container.innerHTML = `
        <div class="gvg-hero-banner">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
                <div>
                    <h3 style="font-size:18px;color:#f8fafc;font-family:var(--font-brand);">⚔️ Guerra de Guildas — Liga de Kanto</h3>
                    <div style="font-size:12px;color:#94a3b8;margin-top:2px;">
                        Sua Guilda: <strong style="color:#38bdf8;">${g.guildName}</strong> (Nível ${g.guildLevel}) • Rotação Semanal: <strong>Temporada de Guerra</strong>
                    </div>
                </div>
                <div style="display:flex;gap:8px;align-items:center;">
                    <button class="btn btn-gold" onclick="claimGuildDividends()" ${g.dailyDividendsClaimed ? 'disabled style="opacity:0.6;"' : ''}>
                        ${g.dailyDividendsClaimed ? '✅ Dividendos Coletados' : '💰 Coletar Dividendos Diários (+$15,000)'}
                    </button>
                </div>
            </div>
        </div>

        <div class="panel-header" style="margin:14px 0 8px 0;">
            <div class="panel-title">🗺️ Territórios de Conquista Ativa em Kanto</div>
        </div>
        <div class="gvg-territories-grid">
            ${territoriesHtml}
        </div>
    `;
}

function battleGvgTerritory(tId) {
    const t = ENDGAME_STATE.gvg.territories.find(x => x.id === tId);
    if (!t) return;
    if (typeof enterChallengeArena === "function") {
        enterChallengeArena('gvg', { territoryId: t.id, territoryName: t.name, rivalGuild: t.owner, contested: t.contested });
    }
}

function claimGuildDividends() {
    if (ENDGAME_STATE.gvg.dailyDividendsClaimed) return;
    ENDGAME_STATE.gvg.dailyDividendsClaimed = true;
    STATE.player.gold = (STATE.player.gold || 0) + 15000;
    STATE.player.diamonds = (STATE.player.diamonds || 0) + 20;
    showToast("💰 Você coletou os dividendos diários da Guilda! (+$15,000 Ouro e +20 Diamantes)");
    scheduleStateSave(1000);
    renderAll();
    renderGvgSection();
}

// ---------------------------------------------------------
// 2. PVP RANKED
// ---------------------------------------------------------
function renderPvpRankedSection() {
    const container = document.getElementById("mech-pvp-container");
    if (!container) return;
    const p = ENDGAME_STATE.pvp;

    container.innerHTML = `
        <div class="pvp-hero-card">
            <div class="pvp-badge-col">
                <span style="font-size:46px;filter:drop-shadow(0 0 10px #facc15);">🏆</span>
                <span class="pvp-tier-title" style="color:#fde047;font-weight:900;font-size:18px;">${p.tier}</span>
                <span style="font-family:var(--font-mono);color:#38bdf8;font-size:14px;font-weight:800;">${p.elo} ELO</span>
            </div>
            <div class="pvp-info-col">
                <h3 style="font-size:19px;color:#f8fafc;font-family:var(--font-brand);">⚔️ Arena Ranqueada Global 1v1</h3>
                <div style="font-size:12px;color:#94a3b8;margin:4px 0 8px 0;">
                    Temporada Atual: <strong>Temporada 4 — Clima de Johto</strong> • Término em: <strong style="color:#fde047;">${p.seasonDaysLeft} Dias</strong>
                </div>
                <div class="pvp-stats-row">
                    <span>Vitórias: <strong style="color:#4ade80;">${p.wins}</strong></span>
                    <span>Derrotas: <strong style="color:#f87171;">${p.losses}</strong></span>
                    <span>Winrate: <strong style="color:#38bdf8;">${((p.wins / (p.wins + p.losses)) * 100).toFixed(1)}%</strong></span>
                </div>
                <div style="margin-top:12px;">
                    <div style="display:flex;gap:10px;flex-wrap:wrap;">
                        <button class="btn btn-pink" style="padding:10px 18px;font-size:13px;font-weight:800;" onclick="findPvpMatch()">
                            ⚔️ Buscar Oponente Ranqueado (1v1)
                        </button>
                        <button class="btn btn-blue" style="padding:10px 18px;font-size:13px;font-weight:800;" onclick="enterChallengeArena('pvp')">
                            🏟️ Entrar no Mapa da Arena PvP
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div id="pvp-match-arena-box" style="display:none;margin-top:16px;"></div>

        <div class="panel-header" style="margin:20px 0 10px 0;">
            <div class="panel-title">🥇 Top 5 Treinadores da Temporada</div>
        </div>
        <div class="pvp-leaderboard-grid">
            <div class="pvp-lead-item"><span class="r-pos">#1</span><span>👑 Cynthia_Ace</span><span class="r-elo">2,410 ELO</span></div>
            <div class="pvp-lead-item"><span class="r-pos">#2</span><span>Red (Você)</span><span class="r-elo">${p.elo} ELO</span></div>
            <div class="pvp-lead-item"><span class="r-pos">#3</span><span>Blue_Oak</span><span class="r-elo">1,415 ELO</span></div>
            <div class="pvp-lead-item"><span class="r-pos">#4</span><span>Steven_Titan</span><span class="r-elo">1,390 ELO</span></div>
            <div class="pvp-lead-item"><span class="r-pos">#5</span><span>Lance_Draco</span><span class="r-elo">1,340 ELO</span></div>
        </div>
    `;
}

function findPvpMatch() {
    const arenaBox = document.getElementById("pvp-match-arena-box");
    if (!arenaBox) return;

    arenaBox.style.display = "block";
    arenaBox.innerHTML = `
        <div class="pvp-battle-simulator-card">
            <div style="text-align:center;padding:16px;">
                <span style="font-size:26px;">🔍</span>
                <div style="font-weight:800;color:#38bdf8;margin:6px 0;">Buscando adversário no servidor...</div>
                <div style="font-size:11.5px;color:#94a3b8;">Sincronizando com a fila ranqueada de ELO aproximado...</div>
            </div>
        </div>
    `;

    setTimeout(() => {
        const opponents = ["Treinador_Lucas", "Mestre_Bruno", "Líder_Erika_Fan", "DarkTrainer_Johto"];
        const oppName = opponents[Math.floor(Math.random() * opponents.length)];
        const lead = STATE.player.party[0] || { name: "Pikachu", level: 50 };

        arenaBox.innerHTML = `
            <div class="pvp-battle-simulator-card">
                <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #334155;padding-bottom:10px;margin-bottom:12px;">
                    <div><strong>${STATE.player.name}</strong> (${lead.name} Lv.${lead.level})</div>
                    <div style="color:#ef4444;font-weight:900;">⚔️ VS ⚔️</div>
                    <div><strong>${oppName}</strong> (Gengar Lv.${lead.level})</div>
                </div>
                <div class="pvp-combat-log" id="pvp-log-text" style="font-size:12px;color:#cbd5e1;line-height:1.6;height:80px;overflow-y:auto;background:#0b131f;padding:8px;border-radius:6px;">
                    ▶ Partida iniciada na Arena Central!<br>
                    ▶ Seu ${lead.name} avançou para o combate contra Gengar!
                </div>
                <div style="margin-top:10px;text-align:right;">
                    <button class="btn btn-green" onclick="finishPvpMatch(true, '${oppName}')">⚔️ Executar Golpe Decisivo</button>
                </div>
            </div>
        `;
    }, 900);
}

function finishPvpMatch(won, oppName) {
    const arenaBox = document.getElementById("pvp-match-arena-box");
    const p = ENDGAME_STATE.pvp;

    if (won) {
        p.wins++;
        p.elo += 24;
        STATE.player.gold = (STATE.player.gold || 0) + 8000;
        STATE.player.diamonds = (STATE.player.diamonds || 0) + 15;
        showToast(`🏆 Vitória contra ${oppName}! (+24 ELO, +$8,000 Ouro e +15 Diamantes)`);
    } else {
        p.losses++;
        p.elo = Math.max(1000, p.elo - 12);
        showToast("Você foi derrotado nesta partida ranqueada!");
    }

    scheduleStateSave(1000);
    renderAll();
    renderPvpRankedSection();
}

// ---------------------------------------------------------
// 3. GINÁSIOS OFICIAIS
// ---------------------------------------------------------
function setGymRegionFilter(region) {
    ENDGAME_STATE.gymRegionFilter = region || "all";
    renderGymsSection();
}

function startGymChallengeById(gymId) {
    const gym = ENDGAME_STATE.gyms.find(g => g.id === gymId) || ENDGAME_STATE.gyms[0];
    if (!gym) return;
    const aceObj = (gym.team && gym.team[gym.team.length - 1]) || { species: "onix", name: gym.ace, lv: gym.minLv };
    enterChallengeArena("gyms", {
        gymId: gym.id,
        gymRegion: gym.region || "Kanto",
        gymTitle: `${gym.name.toUpperCase()} — ${gym.mapName.toUpperCase()}`,
        gymSub: `Líder ${gym.leader} (${gym.type}) • Equipe Oficial de 6 Pokémon • ${gym.badge}`,
        gymBiome: gym.id,
        leaderName: gym.leader,
        leaderSkinId: gym.skinId || gym.id,
        leaderSprite: gym.leaderSprite,
        leaderSkinIcon: gym.skinIcon,
        leaderQuote: gym.quote,
        badgeName: gym.badge,
        badgeImg: gym.badgeImg,
        typeColor: gym.typeColor || "#fde047",
        gymTeam: (gym.team || []).map(m => ({ ...m })),
        bossSpecies: aceObj.species,
        bossName: `${gym.leader}'s ${aceObj.name}`,
        minLv: gym.minLv
    });
}

function equipGymLeaderSkin(skinId, leaderName) {
    if (typeof selectTrainerAvatarModel === "function") {
        selectTrainerAvatarModel(skinId);
    } else if (typeof STATE !== "undefined" && STATE.tibia && STATE.tibia.trainer) {
        STATE.tibia.trainer.avatarModelId = skinId;
        if (STATE.player) STATE.player.avatar_model = skinId;
        if (typeof showToast === "function") showToast(`🎨 Skin de Líder equipada: ${leaderName}!`);
    }
}

function renderGymsSection() {
    const container = document.getElementById("mech-gyms-container");
    if (!container) return;

    const filter = ENDGAME_STATE.gymRegionFilter || "all";
    const list = ENDGAME_STATE.gyms.filter(g => filter === "all" || g.region.toLowerCase() === filter.toLowerCase());
    const playerBadges = (typeof STATE !== "undefined" && Array.isArray(STATE.player?.badges)) ? STATE.player.badges : [];

    const gymsHtml = list.map(gym => {
        const hasBadge = playerBadges.includes(gym.id) || gym.defeated;
        const teamHtml = (gym.team || []).map((mon, idx) => `
            <div style="display:flex;flex-direction:column;align-items:center;background:rgba(15,23,42,0.85);border:1px solid ${mon.isAce ? (gym.typeColor || '#facc15') : 'rgba(148,163,184,0.22)'};border-radius:7px;padding:4px 3px;position:relative;" title="#${idx + 1} ${mon.name} (Lv.${mon.lv})">
                ${mon.isAce ? `<span style="position:absolute;top:-6px;right:2px;background:#facc15;color:#09090b;font-size:8px;font-weight:900;padding:0 4px;border-radius:4px;">★ ACE</span>` : `<span style="position:absolute;top:2px;left:4px;color:#64748b;font-size:8px;font-weight:800;">#${idx + 1}</span>`}
                <img src="/img/pmd/${mon.species}/portrait.png" alt="${mon.name}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;image-rendering:pixelated;border:1px solid rgba(255,255,255,0.18);" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idx + 1}.png';">
                <span style="font-size:9px;font-weight:800;color:${mon.isAce ? '#fde047' : '#e2e8f0'};max-width:56px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:2px;">${mon.name.replace(' (Ace)', '')}</span>
                <span style="font-size:8.5px;color:#94a3b8;">Lv.${mon.lv}</span>
            </div>
        `).join("");

        return `
        <div class="gym-challenge-card" style="border:1px solid rgba(148,163,184,0.25);background:linear-gradient(145deg, rgba(15,23,42,0.95), rgba(30,41,59,0.88));border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:8px;">
            <div style="display:flex;gap:10px;align-items:center;">
                <div style="display:flex;align-items:center;gap:4px;background:rgba(2,6,23,0.75);padding:5px 7px;border-radius:10px;border:1px solid ${gym.typeColor || '#38bdf8'};">
                    <img src="${gym.leaderSprite}" alt="${gym.leader} Portrait" title="Retrato Oficial HGSS: ${gym.leader}" style="width:48px;height:48px;object-fit:contain;image-rendering:pixelated;">
                    <img src="${gym.skinIcon || gym.leaderSprite}" alt="${gym.leader} Skin" title="Skin Overworld 4-Direções: ${gym.leader}" style="width:38px;height:44px;object-fit:contain;image-rendering:pixelated;border-left:1px dashed rgba(255,255,255,0.15);padding-left:4px;">
                </div>
                <div style="flex:1;min-width:0;">
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
                        <span style="font-weight:900;font-size:13.5px;color:#f8fafc;">${gym.name}</span>
                        <span style="font-size:9.5px;font-weight:800;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,0.08);color:${gym.typeColor || '#fde047'};border:1px solid ${gym.typeColor || '#fde047'};">${gym.region} • ${gym.type}</span>
                    </div>
                    <div style="font-size:11.5px;color:#cbd5e1;margin-top:2px;">
                        Líder: <strong style="color:#fde047;">${gym.leader}</strong> • Req: <strong>Lv.${gym.minLv}+</strong>
                    </div>
                    <div style="font-size:10px;color:#38bdf8;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                        🗺️ Mapa Único: <strong>${gym.mapName}</strong>
                    </div>
                </div>
            </div>

            <div style="background:rgba(2,6,23,0.55);border-radius:8px;padding:6px 8px;border:1px solid rgba(255,255,255,0.06);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
                    <span style="font-size:9.5px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:0.4px;">🔴 Equipe Icônica Completa (6 Pokémon)</span>
                    <span style="font-size:9.5px;color:#fde047;font-weight:800;">Ace: ${gym.ace}</span>
                </div>
                <div style="display:grid;grid-template-columns:repeat(6, 1fr);gap:4px;">
                    ${teamHtml}
                </div>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-top:2px;">
                <span class="badge-status-pill ${hasBadge ? 'pill-won' : ''}" style="display:inline-flex;align-items:center;gap:5px;font-size:10.5px;">
                    <img src="${gym.badgeImg || '/img/badges/badge_boulder.png'}" style="width:16px;height:16px;image-rendering:pixelated;" onerror="this.style.display='none'">
                    ${gym.badge}
                </span>
                <div style="display:flex;gap:6px;">
                    <button class="btn" style="padding:5px 8px;font-size:10.5px;background:rgba(148,163,184,0.16);border:1px solid rgba(148,163,184,0.35);color:#e2e8f0;" onclick="equipGymLeaderSkin('${gym.skinId}', '${gym.leader}')" title="Equipar a Skin de ${gym.leader} no seu Treinador">
                        🎨 Skin
                    </button>
                    <button class="btn btn-blue" style="padding:5px 10px;font-size:11px;font-weight:800;" onclick="startGymChallengeById('${gym.id}')">
                        🏛️ Desafiar (6v6)
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join("");

    container.innerHTML = `
        <div class="panel-header" style="margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
                <div class="panel-title">🏛️ Circuito Oficial de Ginásios (Kanto & Johto — 16 Mapas Únicos & Equipes de 6 Pokémon)</div>
                <div style="font-size:11px;color:#94a3b8;margin-top:2px;">Cada Líder possui retrato 100% fiel, skin 4-direções equipada no pedestal, mapa exclusivo e 6 Pokémon icônicos em batalha sequencial!</div>
            </div>
            <div style="display:flex;gap:6px;">
                <button class="btn ${filter === 'all' ? 'btn-gold' : ''}" style="padding:4px 10px;font-size:11px;" onclick="setGymRegionFilter('all')">🌍 Todos (16)</button>
                <button class="btn ${filter === 'Kanto' ? 'btn-gold' : ''}" style="padding:4px 10px;font-size:11px;" onclick="setGymRegionFilter('Kanto')">⛰️ Kanto (8)</button>
                <button class="btn ${filter === 'Johto' ? 'btn-gold' : ''}" style="padding:4px 10px;font-size:11px;" onclick="setGymRegionFilter('Johto')">🔔 Johto (8)</button>
            </div>
        </div>
        <div class="gyms-cards-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(360px, 1fr));gap:12px;">
            ${gymsHtml}
        </div>
    `;
}
window.setGymRegionFilter = setGymRegionFilter;
window.startGymChallengeById = startGymChallengeById;
window.equipGymLeaderSkin = equipGymLeaderSkin;

function challengeGymLeader(gymId) {
    const gym = ENDGAME_STATE.gyms.find(g => g.id === gymId);
    if (!gym) return;

    showToast(`⚔️ Você desafiou ${gym.leader} para a batalha de ginásio!`);
    setTimeout(() => {
        STATE.player.gold = (STATE.player.gold || 0) + 15000;
        STATE.player.diamonds = (STATE.player.diamonds || 0) + 25;
        showToast(`🎖️ Vitória contra ${gym.leader}! Você revalidou a ${gym.badge} e recebeu $15,000 Ouro e 25 Diamantes!`);
        scheduleStateSave(1000);
        renderAll();
    }, 800);
}

// ---------------------------------------------------------
// 4. ELITE DOS 4 & CAMPEÃO
// ---------------------------------------------------------
function renderEliteFourSection() {
    const container = document.getElementById("mech-elite4-container");
    if (!container) return;
    const e4 = ENDGAME_STATE.eliteFour;

    const stagesHtml = e4.members.map(m => `
        <div class="elite-stage-card ${m.stage === e4.currentStage ? 'is-current' : m.stage < e4.currentStage ? 'is-defeated' : 'is-upcoming'}">
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-weight:900;color:#f8fafc;font-size:14px;">Estágio ${m.stage}: ${m.name}</span>
                <span class="badge-status-pill ${m.stage < e4.currentStage ? 'pill-won' : 'pill-locked'}">${m.stage < e4.currentStage ? 'DERROTADO' : m.stage === e4.currentStage ? 'DESAFIO ATUAL' : 'BLOQUEADO'}</span>
            </div>
            <div style="font-size:12px;color:#94a3b8;margin:6px 0;">
                Título: <strong style="color:#e2e8f0;">${m.title}</strong><br>
                Pokémon Supremo: <strong style="color:#fde047;">${m.ace}</strong>
            </div>
        </div>
    `).join("");

    container.innerHTML = `
        <div class="elite4-hero-banner">
            <h3 style="font-size:20px;color:#f8fafc;font-family:var(--font-brand);">👑 O Desafio Supremo do Planalto Índigo</h3>
            <p style="font-size:12px;color:#cbd5e1;margin:4px 0 12px 0;">
                Enfrente os quatro maiores mestres da região em batalhas consecutivas sem descanso e reivindique o título de Campeão de Kanto!
            </p>
            <div style="display:flex;gap:10px;">
                <div style="display:flex;gap:10px;flex-wrap:wrap;">
                    <button class="btn btn-gold" style="padding:10px 18px;font-size:13px;font-weight:800;" onclick="advanceEliteFourStage()">
                        ⚔️ Batalhar no Estágio ${e4.currentStage} (${e4.members[e4.currentStage - 1]?.name || 'Campeão'})
                    </button>
                    <button class="btn btn-purple" style="padding:10px 18px;font-size:13px;font-weight:800;" onclick="enterChallengeArena('elite4', { stage: ${e4.currentStage}, stageTitle: 'PLANALTO ÍNDIGO - CÂMARA DE ${(e4.members[e4.currentStage - 1]?.name || 'Campeão').toUpperCase()}', stageSub: '${e4.members[e4.currentStage - 1]?.title || ''} - ${e4.members[e4.currentStage - 1]?.ace || ''}', bossSpecies: '${(e4.members[e4.currentStage - 1]?.ace || 'Dragonite').split(' ')[0].toLowerCase()}', bossName: '${e4.members[e4.currentStage - 1]?.name || 'Mestre'}\'s ${e4.members[e4.currentStage - 1]?.ace || 'Ace'}' })">
                        👑 Entrar na Câmara da Elite (Mapa)
                    </button>
                </div>
            </div>
        </div>

        <div class="panel-header" style="margin:16px 0 10px 0;">
            <div class="panel-title">🏆 Mestres da Elite dos Quatro & Campeão</div>
        </div>
        <div class="elite-stages-grid">
            ${stagesHtml}
        </div>
    `;
}

function advanceEliteFourStage() {
    const e4 = ENDGAME_STATE.eliteFour;
    const cur = e4.members[e4.currentStage - 1];
    if (!cur) return;

    showToast(`⚔️ Enfrentando ${cur.name} no Planalto Índigo...`);
    setTimeout(() => {
        if (e4.currentStage < 5) {
            e4.currentStage++;
            showToast(`🏆 Você derrotou ${cur.name}! Avançando para o próximo membro da Elite dos Quatro!`);
        } else {
            e4.currentStage = 1;
            STATE.player.gold = (STATE.player.gold || 0) + 100000;
            STATE.player.diamonds = (STATE.player.diamonds || 0) + 500;
            showToast("👑 PARABÉNS! VOCÊ DERROTOU O CAMPEÃO E ENTROU PARA O HALL DA FAMA! (+$100,000 Ouro e +500 Diamantes)");
        }
        scheduleStateSave(1000);
        renderAll();
        renderEliteFourSection();
    }, 850);
}

// ---------------------------------------------------------
// 5. SAFARI ZONE
// ---------------------------------------------------------
function renderSafariZoneSection() {
    const container = document.getElementById("mech-safari-container");
    if (!container) return;
    const s = ENDGAME_STATE.safari;

    if (!s.currentMon) {
        spawnSafariMonster();
    }

    container.innerHTML = `
        <div class="safari-hero-card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                <div>
                    <h3 style="font-size:18px;color:#f8fafc;font-family:var(--font-brand);">🌿 Reserva Especial da Zona do Safari</h3>
                    <span style="font-size:12px;color:#94a3b8;">Taxa de Raros & Shinies Ampliada (1/128)!</span>
                </div>
                <div style="font-family:var(--font-mono);font-size:14px;color:#4ade80;font-weight:800;">
                    🟢 Safari Balls: ${s.ballsLeft} / 30
                </div>
            </div>

            <div style="margin-bottom:12px;">
                <button class="btn btn-green" style="padding:8px 16px;font-size:12px;font-weight:800;width:100%;" onclick="enterChallengeArena('safari')">
                    🌿 Entrar no Mapa da Reserva Safari (Explorar ao Vivo)
                </button>
            </div>
            <div class="safari-encounter-box">
                <div style="display:flex;gap:14px;align-items:center;">
                    <img src="/img/pmd/${s.currentMon.species_id}/Portrait.png" alt="${s.currentMon.name}" style="width:64px;height:64px;image-rendering:pixelated;" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${s.currentMon.dex_id || 115}.png';">
                    <div>
                        <div style="font-weight:900;font-size:18px;color:#fde047;">${s.currentMon.is_shiny ? '✨ ' : ''}${s.currentMon.name} (Lv. ${s.currentMon.level})</div>
                        <div style="font-size:12px;color:#94a3b8;">Chance de Captura Atual: <strong style="color:#38bdf8;">${s.catchRate}%</strong> • Risco de Fuga: <strong style="color:#f87171;">${s.fleeRate}%</strong></div>
                    </div>
                </div>

                <div class="safari-actions-row btn-grid-form" style="margin-top:14px;">
                    <button class="btn btn-green" onclick="safariAction('ball')">🔴 Lançar Safari Ball</button>
                    <button class="btn btn-amber" onclick="safariAction('bait')">🍖 Jogar Isca (Menos Fuga)</button>
                    <button class="btn btn-blue" onclick="safariAction('rock')">🪨 Jogar Pedra (Mais Chance)</button>
                    <button class="btn" onclick="safariAction('run')">🏃 Procurar Outro</button>
                </div>
            </div>
        </div>
    `;
}

function spawnSafariMonster() {
    const safariPool = [
        { species_id: "chansey", dex_id: 113, name: "Chansey", level: 45 },
        { species_id: "tauros", dex_id: 128, name: "Tauros", level: 48 },
        { species_id: "scyther", dex_id: 123, name: "Scyther", level: 50 },
        { species_id: "pinsir", dex_id: 127, name: "Pinsir", level: 50 },
        { species_id: "kangaskhan", dex_id: 115, name: "Kangaskhan", level: 52 },
        { species_id: "dratini", dex_id: 147, name: "Dratini", level: 42 },
    ];
    const pick = safariPool[Math.floor(Math.random() * safariPool.length)];
    const isShiny = Math.random() < 0.08; // High chance in Safari
    ENDGAME_STATE.safari.currentMon = { ...pick, is_shiny: isShiny };
    ENDGAME_STATE.safari.fleeRate = 20;
    ENDGAME_STATE.safari.catchRate = 35;
}

function safariAction(type) {
    const s = ENDGAME_STATE.safari;
    if (type === "run") {
        showToast("🏃 Você mudou de rota na Zona do Safari.");
        spawnSafariMonster();
        renderSafariZoneSection();
        return;
    }

    if (type === "bait") {
        s.fleeRate = Math.max(5, s.fleeRate - 10);
        s.catchRate = Math.max(15, s.catchRate - 5);
        showToast(`🍖 Você jogou uma Isca! ${s.currentMon.name} está comendo e tem menor chance de fugir.`);
        renderSafariZoneSection();
        return;
    }

    if (type === "rock") {
        s.catchRate = Math.min(85, s.catchRate + 20);
        s.fleeRate = Math.min(75, s.fleeRate + 25);
        showToast(`🪨 Você jogou uma Pedra! ${s.currentMon.name} ficou irritado e a chance de captura subiu!`);
        renderSafariZoneSection();
        return;
    }

    if (type === "ball") {
        if (s.ballsLeft <= 0) {
            showToast("Suas Safari Balls acabaram!");
            return;
        }
        s.ballsLeft--;
        const roll = Math.random() * 100;
        if (roll <= s.catchRate) {
            const sp = STATE.speciesById[s.currentMon.species_id] || { name: s.currentMon.name, id: s.currentMon.species_id, elements: ["normal"] };
            const newMon = createClientPokemonInstance(sp, s.currentMon.level, s.currentMon.is_shiny, "Raro");
            if (STATE.player.party.length < 6) {
                STATE.player.party.push(newMon);
            } else {
                STATE.player.pc_box.push(newMon);
            }
            showToast(`🎉 Gotcha! ${s.currentMon.name} foi capturado na Safari Ball!`);
            scheduleStateSave(1000);
            renderAll();
            spawnSafariMonster();
        } else {
            showToast(`Oh não! ${s.currentMon.name} escapou da Safari Ball!`);
            if (Math.random() * 100 <= s.fleeRate) {
                showToast(`💨 ${s.currentMon.name} fugiu nos arbustos!`);
                spawnSafariMonster();
            }
        }
        renderSafariZoneSection();
    }
}

// ---------------------------------------------------------
// 6. WORLD BOSS (RAID GLOBAL)
// ---------------------------------------------------------
function renderWorldBossSection() {
    const container = document.getElementById("mech-worldboss-container");
    if (!container) return;
    const wb = ENDGAME_STATE.worldBoss;
    const hpPct = Math.max(0, Math.min(100, (wb.currentHp / wb.maxHp) * 100));

    const lead = STATE.player.party[0] || { name: "Pokémon", level: 50 };

    container.innerHTML = `
        <div class="worldboss-hero-card">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
                <div>
                    <span class="badge-status-pill pill-won" style="background:#ef4444;border-color:#f87171;">⚡ EVENTO RAID GLOBAL ATIVO</span>
                    <h3 style="font-size:22px;color:#f8fafc;margin:6px 0;font-family:var(--font-brand);">👾 ${wb.name}</h3>
                    <div style="font-size:12px;color:#94a3b8;">Tempo Restante da Raid: <strong style="color:#fde047;">${wb.timerMinutes} minutos</strong></div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:11px;color:#94a3b8;">SEU DANO TOTAL:</div>
                    <div style="font-size:20px;font-family:var(--font-mono);color:#38bdf8;font-weight:900;">${wb.playerDamageDealt.toLocaleString()} DPS</div>
                </div>
            </div>

            <div style="margin:14px 0 10px 0;">
                <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;font-family:var(--font-mono);">
                    <span>HP GLOBAL: ${wb.currentHp.toLocaleString()} / ${wb.maxHp.toLocaleString()}</span>
                    <span>${hpPct.toFixed(1)}%</span>
                </div>
                <div class="trainer-exp-track" style="height:12px;">
                    <div class="trainer-exp-fill" style="width:${hpPct}%;background:linear-gradient(90deg,#ef4444,#f59e0b);"></div>
                </div>
            </div>

            <div style="display:flex;gap:10px;align-items:center;margin-top:14px;flex-wrap:wrap;">
                <button class="btn btn-pink" style="padding:10px 20px;font-size:13px;font-weight:800;" onclick="attackWorldBoss()">
                    ⚔️ Atacar World Boss com ${lead.name}
                </button>
                <button class="btn btn-purple" style="padding:10px 20px;font-size:13px;font-weight:800;" onclick="enterChallengeArena('worldboss')">
                    🌋 Entrar na Cratera do Titã Mewtwo (Mapa)
                </button>
                <span style="font-size:11.5px;color:#94a3b8;">Cada ataque consome turno de golpe e concede Ouro e Fragmentos Míticos proporcionais ao dano!</span>
            </div>
        </div>

        <div class="panel-header" style="margin:18px 0 10px 0;">
            <div class="panel-title">🏆 Ranking de Dano da Raid (Top Damagers)</div>
        </div>
        <div class="pvp-leaderboard-grid">
            ${wb.leaderboard.map(u => `
                <div class="pvp-lead-item"><span class="r-pos">#${u.rank}</span><span>${u.name}</span><span class="r-elo">${u.dps.toLocaleString()} DPS</span></div>
            `).join("")}
        </div>
    `;
}

function attackWorldBoss() {
    const wb = ENDGAME_STATE.worldBoss;
    const lead = STATE.player.party[0];
    const dmg = Math.floor(Math.random() * 25000) + 15000;

    wb.currentHp = Math.max(0, wb.currentHp - dmg);
    wb.playerDamageDealt += dmg;
    STATE.player.gold = (STATE.player.gold || 0) + 5000;
    STATE.player.diamonds = (STATE.player.diamonds || 0) + 10;

    showToast(`💥 Seu ${lead?.name || 'Pokémon'} causou ${dmg.toLocaleString()} de dano no World Boss! (+$5,000 Ouro e +10 Diamantes)`);
    scheduleStateSave(1000);
    renderAll();
    renderWorldBossSection();
}

// ---------------------------------------------------------
// 7. MULTIPLAYER DUNGEONS (CO-OP)
// ---------------------------------------------------------
function renderDungeonsSection() {
    const container = document.getElementById("mech-dungeons-container");
    if (!container) return;

    const dungeonsHtml = ENDGAME_STATE.dungeons.map(d => `
        <div class="dungeon-card">
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-weight:900;font-size:15px;color:#f8fafc;">🏰 ${d.name}</span>
                <span class="badge-status-pill pill-won">Requisito: Lv. ${d.reqLv}</span>
            </div>
            <div style="font-size:12px;color:#94a3b8;margin:8px 0;">
                Ondas de Inimigos: <strong style="color:#e2e8f0;">${d.waves} Fases</strong> • Chefe: <strong style="color:#ef4444;">${d.boss}</strong><br>
                Recompensas: <strong style="color:#fde047;">${d.rewards}</strong>
            </div>
            <button class="btn btn-blue" style="width:100%;margin-top:6px;" onclick="enterCoopDungeon('${d.id}')">
                👥 Entrar na Dungeon (Co-op 4 Jogadores)
            </button>
        </div>
    `).join("");

    container.innerHTML = `
        <div class="panel-header" style="margin-bottom:12px;">
            <div class="panel-title">🏰 Dungeons Instanciadas em Grupo (Multiplayer Co-op)</div>
        </div>
        <div class="dungeons-grid">
            ${dungeonsHtml}
        </div>
    `;
}

function enterCoopDungeon(dId) {
    const d = ENDGAME_STATE.dungeons.find(x => x.id === dId);
    if (!d) return;

    showToast(`👥 Pareando com 3 jogadores para explorar ${d.name}...`);
    setTimeout(() => {
        STATE.player.gold = (STATE.player.gold || 0) + 40000;
        STATE.player.diamonds = (STATE.player.diamonds || 0) + 50;
        showToast(`🏆 Dungeon Concluída! O Chefe ${d.boss} foi derrotado! Você abriu o Baú Dourado e recebeu ${d.rewards}!`);
        scheduleStateSave(1000);
        renderAll();
    }, 900);
}
