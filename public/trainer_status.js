// =========================================================
// POKÉLAND: TRAINER & TEAM STATUS SUBSYSTEM
// =========================================================

let CURRENT_STATUS_SUB = "trainer";

const KANTO_BADGES = [
    { id: "boulder", name: "Boulder Badge", city: "Pewter City", leader: "Brock", type: "Pedra", sprite: "/img/badges/badge_boulder.png", color: "#78716c", unlocked: true },
    { id: "cascade", name: "Cascade Badge", city: "Cerulean City", leader: "Misty", type: "Água", sprite: "/img/badges/badge_cascade.png", color: "#38bdf8", unlocked: true },
    { id: "thunder", name: "Thunder Badge", city: "Vermilion City", leader: "Lt. Surge", type: "Elétrico", sprite: "/img/badges/badge_thunder.png", color: "#facc15", unlocked: true },
    { id: "rainbow", name: "Rainbow Badge", city: "Celadon City", leader: "Erika", type: "Planta", sprite: "/img/badges/badge_rainbow.png", color: "#4ade80", unlocked: true },
    { id: "soul", name: "Soul Badge", city: "Fuchsia City", leader: "Koga", type: "Veneno", sprite: "/img/badges/badge_soul.png", color: "#c084fc", unlocked: true },
    { id: "marsh", name: "Marsh Badge", city: "Saffron City", leader: "Sabrina", type: "Psíquico", sprite: "/img/badges/badge_marsh.png", color: "#f472b6", unlocked: true },
    { id: "volcano", name: "Volcano Badge", city: "Cinnabar Island", leader: "Blaine", type: "Fogo", sprite: "/img/badges/badge_volcano.png", color: "#fb923c", unlocked: true },
    { id: "earth", name: "Earth Badge", city: "Viridian City", leader: "Giovanni", type: "Terra", sprite: "/img/badges/badge_earth.png", color: "#a16207", unlocked: true },
];

const JOHTO_BADGES = [
    { id: "zephyr", name: "Zephyr Badge", city: "Violet City", leader: "Falkner", type: "Voador", sprite: "/img/badges/badge_zephyr.png", color: "#93c5fd", unlocked: true },
    { id: "hive", name: "Hive Badge", city: "Azalea Town", leader: "Bugsy", type: "Inseto", sprite: "/img/badges/badge_hive.png", color: "#a3e635", unlocked: true },
    { id: "plain", name: "Plain Badge", city: "Goldenrod City", leader: "Whitney", type: "Normal", sprite: "/img/badges/badge_plain.png", color: "#e2e8f0", unlocked: true },
    { id: "fog", name: "Fog Badge", city: "Ecruteak City", leader: "Morty", type: "Fantasma", sprite: "/img/badges/badge_fog.png", color: "#818cf8", unlocked: true },
    { id: "storm", name: "Storm Badge", city: "Cianwood City", leader: "Chuck", type: "Lutador", sprite: "/img/badges/badge_storm.png", color: "#f87171", unlocked: false },
    { id: "mineral", name: "Mineral Badge", city: "Olivine City", leader: "Jasmine", type: "Aço", sprite: "/img/badges/badge_mineral.png", color: "#94a3b8", unlocked: false },
    { id: "glacier", name: "Glacier Badge", city: "Mahogany Town", leader: "Pryce", type: "Gelo", sprite: "/img/badges/badge_glacier.png", color: "#67e8f9", unlocked: false },
    { id: "rising", name: "Rising Badge", city: "Blackthorn City", leader: "Clair", type: "Dragão", sprite: "/img/badges/badge_rising.png", color: "#6366f1", unlocked: false },
];

function switchStatusSubmenu(subTab) {
    CURRENT_STATUS_SUB = subTab;
    document.querySelectorAll(".status-submenu-pill").forEach(pill => {
        pill.classList.toggle("active", pill.dataset.statusSub === subTab);
    });
    document.querySelectorAll(".status-sub-view").forEach(view => {
        view.classList.toggle("active", view.id === `status-sub-${subTab}`);
    });

    renderTrainerStatusModal(subTab);
}

function renderTrainerStatusModal(subTab = CURRENT_STATUS_SUB) {
    if (!STATE.player) return;

    if (subTab === "trainer") {
        renderTrainerProfileSection();
    } else if (subTab === "team") {
        renderTrainerTeamSection();
    } else if (subTab === "badges") {
        renderTrainerBadgesSection();
    } else if (subTab === "stats") {
        renderTrainerStatsSection();
    }
}

function renderTrainerProfileSection() {
    const p = STATE.player;
    const u = STATE.user || {};
    const container = document.getElementById("status-trainer-profile-container");
    if (!container) return;

    const expCur = p.exp || 0;
    const expNext = p.exp_next || (typeof getTrainerNextExp === "function" ? getTrainerNextExp(p.level || 1) : 5000);
    const expPct = Math.min(100, Math.max(0, Math.floor((expCur / expNext) * 100)));
    const skinKey = p.avatar_model || "ethan_gold";

    const skinLabels = {
        "ethan_gold": "Ethan / Gold (Oficial Johto)",
        "lyra_female": "Lyra (Oficial HeartGold)",
        "red_classic": "Red Clássico (Campeão de Kanto)",
        "ash_classic": "Ash Ketchum (Kanto Trainer)",
        "brendan_emerald": "Brendan (Hoenn Champion)",
        "may_emerald": "May (Hoenn Coordinator)",
        "lucas_dp": "Lucas (Sinnoh Explorer)",
        "dawn_dp": "Dawn (Sinnoh Star)",
        "hilbert_bw": "Hilbert (Unova Ace)",
        "hilda_bw": "Hilda (Unova Master)"
    };

    let heroAvatarSrc = "/img/trainers/pp_TrainerMale02.png";
    if (typeof getTrainerModelDataUrl === "function" && typeof getActiveTrainerModelId === "function") {
        const genSrc = getTrainerModelDataUrl(getActiveTrainerModelId());
        if (genSrc) heroAvatarSrc = genSrc;
    }

    container.innerHTML = `
        <div class="status-trainer-hero-card">
            <div class="trainer-avatar-col">
                <div class="trainer-avatar-big-box">
                    <img id="status-hero-avatar-img" src="${heroAvatarSrc}" alt="Trainer" style="image-rendering:pixelated;width:76px;height:76px;object-fit:contain;" onerror="this.onerror=null;this.src='/img/trainers/hgss_ethan.png';">
                    <span class="trainer-online-badge">ONLINE</span>
                </div>
                <button class="btn btn-blue" onclick="openTrainerAvatarSelector()" style="width:100%;margin-top:8px;font-size:11px;padding:6px;">
                    🔄 Trocar Skin
                </button>
            </div>

            <div class="trainer-info-col">
                <div class="trainer-name-row">
                    <h2 class="trainer-name-title">${p.name || 'Red'}</h2>
                    <span class="trainer-title-badge">👑 Mestre Campeão de Kanto</span>
                    <span class="trainer-vip-badge">${p.has_master_key ? '⭐ CONTA VIP PREMIUM' : 'TREINADOR OFICIAL'}</span>
                </div>

                <div class="trainer-exp-block">
                    <div class="exp-title-row">
                        <span style="font-weight:800;color:#fde047;">NÍVEL ${p.level || 50}</span>
                        <span style="font-family:var(--font-mono);color:#94a3b8;font-size:11.5px;">${expCur.toLocaleString()} / ${expNext.toLocaleString()} EXP (${expPct}%)</span>
                    </div>
                    <div class="trainer-exp-track">
                        <div class="trainer-exp-fill" style="width: ${expPct}%;"></div>
                    </div>
                </div>

                <div class="trainer-hero-metrics-grid">
                    <div class="hero-metric-item">
                        <span class="m-lbl">💰 Carteira de Ouro</span>
                        <span class="m-val" style="color:#facc15;">$${(p.gold || 0).toLocaleString()}</span>
                    </div>
                    <div class="hero-metric-item">
                        <span class="m-lbl">💎 Diamantes Premium</span>
                        <span class="m-val" style="color:#38bdf8;">💎 ${(p.diamonds || 0).toLocaleString()}</span>
                    </div>
                    <div class="hero-metric-item">
                        <span class="m-lbl">👾 Equipe / Box</span>
                        <span class="m-val" style="color:#c084fc;">${p.party?.length || 0} / 6 • Box: ${p.pc_box?.length || 0}</span>
                    </div>
                    <div class="hero-metric-item">
                        <span class="m-lbl">🌍 Região Atual</span>
                        <span class="m-val" style="color:#4ade80;">Kanto — Praça Central</span>
                    </div>
                </div>

                <div style="font-size:11.5px;color:#94a3b8;margin-top:10px;">
                    Skin Ativa: <strong style="color:#e2e8f0;">${skinLabels[skinKey] || skinKey}</strong> • Conta Registrada: <strong style="color:#cbd5e1;">${u.created_at || 'Oficial'}</strong>
                </div>
            </div>
        </div>
    `;
}

function renderTrainerTeamSection() {
    const container = document.getElementById("status-team-grid-container");
    if (!container) return;
    const party = STATE.player.party || [];

    if (party.length === 0) {
        container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:#94a3b8;">Nenhum Pokémon na equipe ativa no momento.</div>`;
        return;
    }

    container.innerHTML = party.map((pk, idx) => {
        const isLeader = idx === 0;
        const pmdUrl = `/img/pmd/${pk.species_id}/Portrait.png`;
        const hpPct = Math.min(100, Math.max(0, Math.floor(((pk.hp || 1) / (pk.max_hp || 1)) * 100)));
        const ivTotal = pk.iv_total || Object.values(pk.ivs || {}).reduce((a, b) => a + b, 0);
        const ivs = pk.ivs || { hp: 20, atk: 20, def: 20, spa: 20, spd: 20, spe: 20 };
        const stats = pk.stats || { hp: pk.max_hp, atk: 120, def: 110, spa: 100, spd: 100, spe: 115 };
        const bst = Object.values(stats).reduce((a, b) => a + (typeof b === "number" ? b : 0), 0);

        const typesHtml = (pk.elements || ["normal"]).map(t => `
            <span class="element-badge elem-${t}">${t.toUpperCase()}</span>
        `).join(" ");

        const ivBars = ["hp", "atk", "def", "spa", "spd", "spe"].map(k => {
            const v = ivs[k] || 0;
            const pct = Math.min(100, Math.floor((v / 31) * 100));
            const barCol = v >= 30 ? "#facc15" : v >= 25 ? "#4ade80" : v >= 18 ? "#60a5fa" : "#f87171";
            return `
                <div class="iv-mini-row" title="${k.toUpperCase()}: ${v}/31">
                    <span class="iv-k">${k.toUpperCase()}:</span>
                    <div class="iv-track"><div class="iv-fill" style="width:${pct}%;background:${barCol};"></div></div>
                    <span class="iv-v">${v}</span>
                </div>
            `;
        }).join("");

        const movesHtml = (pk.moves || []).slice(0, 4).map((mId, mIdx) => {
            const mObj = (STATE.movesMap && STATE.movesMap[mId]) || { name: mId, pwr: 50, type: "normal" };
            return `
                <div class="team-move-pill" title="${mObj.name} (Poder: ${mObj.pwr || 50})">
                    <span class="m-idx">${mIdx + 1}</span>
                    <span class="m-name">${mObj.name || mId}</span>
                    <span class="m-pwr">${mObj.pwr || 50}p</span>
                </div>
            `;
        }).join("");

        return `
            <div class="status-pokemon-card ${isLeader ? 'is-leader-card' : ''}">
                <div class="spk-card-top">
                    <div class="spk-portrait-box">
                        <img src="${pmdUrl}" alt="${pk.name}" style="width:52px;height:52px;image-rendering:pixelated;" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pk.dex_id || 25}.png';">
                        ${isLeader ? '<span class="spk-leader-crown" title="Líder do Time">👑</span>' : ''}
                    </div>
                    <div class="spk-info-box">
                        <div class="spk-name-row">
                            <span class="spk-name">${pk.name}</span>
                            <span class="spk-level">Lv.${pk.level}</span>
                            ${pk.is_shiny ? '<span class="spk-shiny-star" title="Shiny ✨">✨</span>' : ''}
                        </div>
                        <div class="spk-types-row">${typesHtml}</div>
                        <div class="spk-quality-badge quality-${(pk.quality || 'comum').toLowerCase()}">${pk.quality || 'Comum'} (${pk.quality_multiplier || 1.0}x)</div>
                    </div>
                </div>

                <!-- HP Bar -->
                <div class="spk-hp-block">
                    <div class="spk-hp-meta">
                        <span>HP: ${pk.hp} / ${pk.max_hp}</span>
                        <span>${hpPct}%</span>
                    </div>
                    <div class="spk-hp-track">
                        <div class="spk-hp-fill" style="width:${hpPct}%;background:${hpPct > 50 ? '#22c55e' : hpPct > 20 ? '#eab308' : '#ef4444'};"></div>
                    </div>
                </div>

                <!-- Combat BST & Natures -->
                <div class="spk-meta-row">
                    <span>Natureza: <strong style="color:#60a5fa;">${pk.nature || 'Adamant'}</strong></span>
                    <span>BST: <strong style="color:#fde047;font-family:var(--font-mono);">${bst}</strong></span>
                    <span>IVs: <strong style="color:#38bdf8;font-family:var(--font-mono);">${ivTotal}/186</strong></span>
                </div>

                <!-- IVs Grid -->
                <div class="spk-ivs-grid">
                    ${ivBars}
                </div>

                <!-- Moves Grid -->
                <div class="spk-moves-title">⚔️ Golpes Equipados (1 - 4):</div>
                <div class="spk-moves-grid">
                    ${movesHtml}
                </div>

                <!-- Action Controls Grid -->
                <div class="spk-actions-grid btn-grid-form" style="margin-top:10px;">
                    ${!isLeader ? `<button class="btn btn-gold" onclick="makePartyLeader('${pk.uid}')">⭐ Líder</button>` : `<button class="btn" disabled style="opacity:0.6;">👑 Líder Atual</button>`}
                    <button class="btn btn-green" onclick="healPartyMember('${pk.uid}')">💖 Curar</button>
                    <button class="btn btn-blue" onclick="depositPartyMemberToBox('${pk.uid}')">📦 Box</button>
                </div>
            </div>
        `;
    }).join("");
}

function renderTrainerBadgesSection() {
    const container = document.getElementById("status-badges-container");
    if (!container) return;

    const kantoHtml = KANTO_BADGES.map(b => `
        <div class="badge-slot-card ${b.unlocked ? 'is-unlocked' : 'is-locked'}">
            <div class="badge-icon-box" style="border-color:${b.color};box-shadow: 0 0 14px ${b.color}55;">
                <img src="${b.sprite || `/img/badges/badge_${b.id}.png`}" class="badge-pixel-img" style="width:36px;height:36px;image-rendering:pixelated;object-fit:contain;" alt="${b.name}">
            </div>
            <div class="badge-name">${b.name}</div>
            <div class="badge-sub">${b.city} • ${b.leader}</div>
            <span class="badge-status-pill ${b.unlocked ? 'pill-won' : 'pill-locked'}">${b.unlocked ? 'CONQUISTADA' : 'BLOQUEADA'}</span>
        </div>
    `).join("");

    const johtoHtml = JOHTO_BADGES.map(b => `
        <div class="badge-slot-card ${b.unlocked ? 'is-unlocked' : 'is-locked'}">
            <div class="badge-icon-box" style="border-color:${b.color};box-shadow: 0 0 14px ${b.color}55;">
                <img src="${b.sprite || `/img/badges/badge_${b.id}.png`}" class="badge-pixel-img" style="width:36px;height:36px;image-rendering:pixelated;object-fit:contain;" alt="${b.name}">
            </div>
            <div class="badge-name">${b.name}</div>
            <div class="badge-sub">${b.city} • ${b.leader}</div>
            <span class="badge-status-pill ${b.unlocked ? 'pill-won' : 'pill-locked'}">${b.unlocked ? 'CONQUISTADA' : 'BLOQUEADA'}</span>
        </div>
    `).join("");

    container.innerHTML = `
        <div style="margin-bottom:14px;">
            <div class="panel-header" style="margin-bottom:10px;">
                <div class="panel-title">🏆 Insígnias Oficiais da Liga de Kanto (8 / 8)</div>
            </div>
            <div class="badges-showcase-grid">
                ${kantoHtml}
            </div>
        </div>

        <div style="margin-top:20px;">
            <div class="panel-header" style="margin-bottom:10px;">
                <div class="panel-title">⭐ Insígnias Oficiais da Liga de Johto (4 / 8)</div>
            </div>
            <div class="badges-showcase-grid">
                ${johtoHtml}
            </div>
        </div>
    `;
}

function renderTrainerStatsSection() {
    const container = document.getElementById("status-career-stats-container");
    if (!container) return;
    const p = STATE.player;
    const off = p.offline_farm || {};

    const caughtCount = Object.keys(p.pokedex_caught || {}).length || 184;
    const seenCount = Object.keys(p.pokedex_seen || {}).length || 251;
    const totalGoldOffline = off.total_offline_gold || 24850;
    const totalCatchesOffline = off.total_offline_catches || 68;

    container.innerHTML = `
        <div class="career-stats-grid">
            <div class="career-stat-card">
                <span class="c-ico">🔴</span>
                <div class="c-val" style="color:#ef4444;">${caughtCount} / ${RAW_SPECIES ? RAW_SPECIES.length : 251}</div>
                <div class="c-lbl">Espécies Únicas Registradas na Pokédex</div>
                <div class="c-sub">${seenCount} espécies avistadas em Kanto & Johto</div>
            </div>

            <div class="career-stat-card">
                <span class="c-ico">✨</span>
                <div class="c-val" style="color:#facc15;">14 SHINIES</div>
                <div class="c-lbl">Pokémon Raros Shiny Capturados</div>
                <div class="c-sub">Taxa ativa de 1/256 nos mapas de caçada</div>
            </div>

            <div class="career-stat-card">
                <span class="c-ico">⚔️</span>
                <div class="c-val" style="color:#38bdf8;">21,480</div>
                <div class="c-lbl">Inimigos Derrotados em Caçadas</div>
                <div class="c-sub">Total de abates manuais e automáticos</div>
            </div>

            <div class="career-stat-card">
                <span class="c-ico">💤</span>
                <div class="c-val" style="color:#a855f7;">${totalCatchesOffline} Capturas</div>
                <div class="c-lbl">Rendimento de Expedições Offline</div>
                <div class="c-sub">+$${totalGoldOffline.toLocaleString()} de Ouro coletado ausente</div>
            </div>

            <div class="career-stat-card">
                <span class="c-ico">🏆</span>
                <div class="c-val" style="color:#4ade80;">98.4%</div>
                <div class="c-lbl">Taxa de Vitória em Combates (Win Rate)</div>
                <div class="c-sub">1,420 duelos vencidos e 23 revives usados</div>
            </div>

            <div class="career-stat-card">
                <span class="c-ico">⏱️</span>
                <div class="c-val" style="color:#fde047;">52h 40m</div>
                <div class="c-lbl">Tempo Total de Jornada no Servidor</div>
                <div class="c-sub">Sessões sincronizadas no banco SQLite</div>
            </div>
        </div>
    `;
}

function makePartyLeader(uid) {
    const party = STATE.player.party;
    const idx = party.findIndex(p => p.uid === uid);
    if (idx <= 0) return;

    const [chosen] = party.splice(idx, 1);
    party.unshift(chosen);

    showToast(`👑 ${chosen.name} agora é o Líder da Equipe!`);
    scheduleStateSave(1000);
    renderAll();
    renderTrainerStatusModal("team");
}

function healPartyMember(uid) {
    const pk = STATE.player.party.find(p => p.uid === uid);
    if (!pk) return;
    if (pk.hp >= pk.max_hp) {
        showToast(`❤️ ${pk.name} já está com 100% de HP!`);
        return;
    }
    pk.hp = pk.max_hp;
    showToast(`💖 ${pk.name} foi curado com vitalidade máxima!`);
    scheduleStateSave(1000);
    renderAll();
    renderTrainerStatusModal("team");
}

function depositPartyMemberToBox(uid) {
    const party = STATE.player.party;
    if (party.length <= 1) {
        showToast("⚠️ Você precisa manter pelo menos 1 Pokémon na sua equipe!");
        return;
    }
    const idx = party.findIndex(p => p.uid === uid);
    if (idx === -1) return;

    const [pk] = party.splice(idx, 1);
    STATE.player.pc_box.push(pk);

    showToast(`📦 ${pk.name} foi transferido para o seu PC Box!`);
    scheduleStateSave(1000);
    renderAll();
    renderTrainerStatusModal("team");
}
