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
    gyms: [
        { id: "pewter", name: "Ginásio de Pewter", leader: "Brock", type: "Pedra", badge: "Boulder Badge", minLv: 15, leaderSprite: "/img/trainers/leader_brock.png", defeated: true, ace: "Onix Lv.16" },
        { id: "cerulean", name: "Ginásio de Cerulean", leader: "Misty", type: "Água", badge: "Cascade Badge", minLv: 24, leaderSprite: "/img/trainers/leader_misty.png", defeated: true, ace: "Starmie Lv.25" },
        { id: "vermilion", name: "Ginásio de Vermilion", leader: "Lt. Surge", type: "Elétrico", badge: "Thunder Badge", minLv: 32, leaderSprite: "/img/trainers/leader_surge.png", defeated: true, ace: "Raichu Lv.34" },
        { id: "celadon", name: "Ginásio de Celadon", leader: "Erika", type: "Planta", badge: "Rainbow Badge", minLv: 40, leaderSprite: "/img/trainers/leader_erika.png", defeated: true, ace: "Vileplume Lv.42" },
        { id: "fuchsia", name: "Ginásio de Fuchsia", leader: "Koga", type: "Veneno", badge: "Soul Badge", minLv: 50, leaderSprite: "/img/trainers/leader_koga.png", defeated: true, ace: "Venomoth Lv.52" },
        { id: "saffron", name: "Ginásio de Saffron", leader: "Sabrina", type: "Psíquico", badge: "Marsh Badge", minLv: 58, leaderSprite: "/img/trainers/leader_sabrina.png", defeated: true, ace: "Alakazam Lv.60" },
        { id: "cinnabar_gym", name: "Ginásio de Cinnabar", leader: "Blaine", type: "Fogo", badge: "Volcano Badge", minLv: 65, leaderSprite: "/img/trainers/leader_blaine.png", defeated: true, ace: "Magmar Lv.68" },
        { id: "viridian", name: "Ginásio de Viridian", leader: "Giovanni", type: "Terra", badge: "Earth Badge", minLv: 75, leaderSprite: "/img/trainers/leader_giovanni.png", defeated: true, ace: "Rhydon Lv.78" },
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
function renderGymsSection() {
    const container = document.getElementById("mech-gyms-container");
    if (!container) return;

    const gymsHtml = ENDGAME_STATE.gyms.map(gym => `
        <div class="gym-challenge-card">
            <div style="display:flex;gap:12px;align-items:center;">
                <img src="${gym.leaderSprite}" alt="${gym.leader}" style="width:52px;height:52px;object-fit:contain;image-rendering:pixelated;" onerror="this.onerror=null;this.src='/img/trainers/leader_brock.png';">
                <div style="flex:1;">
                    <div style="font-weight:800;font-size:14px;color:#f8fafc;">${gym.name}</div>
                    <div style="font-size:11.5px;color:#94a3b8;">Líder: <strong style="color:#e2e8f0;">${gym.leader}</strong> (${gym.type})</div>
                    <div style="font-size:11px;color:#fde047;">Principal: ${gym.ace} • Nível Req: ${gym.minLv}</div>
                </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;">
                <span class="badge-status-pill pill-won">🏆 ${gym.badge}</span>
                <button class="btn btn-blue" onclick="enterChallengeArena('gyms', { gymId: '${gym.id}', gymTitle: '${gym.name}', gymSub: 'Líder: ${gym.leader} (${gym.type}) - ${gym.badge}', gymBiome: '${gym.type === 'Pedra' ? 'rock' : gym.type === 'Água' ? 'water' : gym.type === 'Elétrico' ? 'electric' : gym.type === 'Planta' ? 'grass' : gym.type === 'Fogo' ? 'fire' : 'ghost'}', leaderSprite: '${gym.leaderSprite}', bossSpecies: '${gym.ace.split(' ')[0].toLowerCase()}', bossName: '${gym.leader}\'s ${gym.ace}', minLv: ${gym.minLv} })">🏛️ Desafiar no Ginásio (Entrar)</button>
            </div>
        </div>
    `).join("");

    container.innerHTML = `
        <div class="panel-header" style="margin-bottom:12px;">
            <div class="panel-title">🏛️ Circuito de Ginásios Oficiais da Liga Pokémon</div>
        </div>
        <div class="gyms-cards-grid">
            ${gymsHtml}
        </div>
    `;
}

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
