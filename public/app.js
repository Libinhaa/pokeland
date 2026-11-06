
// ====================================================
// POKÉLAND PLAYTEST READY: GUIDE, KIT CLAIM & FEEDBACK
// ====================================================
let _selectedFeedbackCat = "bug";
let _selectedFeedbackRating = 5;


// =========================================================
// POKÉLAND: UPDATE LOG & VERSION TRACKING SUBSYSTEM
// =========================================================
const CURRENT_PROJECT_VERSION = "v1.8.0";

const PROJECT_UPDATE_LOG_DATA = [
    {
        version: "v1.8.0",
        title: "Rework MMORPG: Grind Clássico, Economia Sustentável & Raridades",
        date: "05/11/2026",
        badge: "ANTERIOR",
        is_current: false,
        highlights: [
            {
                category: "⚔️ Progressão Clássica MMORPG (Opção A)",
                bullets: [
                    "Curva polinomial de EXP calibrada para ~38 a 45 horas de caça ativa do nível 1 ao 100 (~35M EXP total acumulada), inspirada na progressão recompensadora de clássicos como Tibia, Ragnarok e PokeXGames.",
                    "Sincronização matemática exata entre cliente e servidor (EXP do Treinador e EXP individual de cada Pokémon).",
                    "Rendimento balanceado por monstro abatido (+12 a +450 EXP, +2 a +35 Gold), eliminando o hipernivelamento e hiperinflação.",
                    "Progresso livre preservado: sem bloqueio artificial de nível máximo por insígnias de ginásio."
                ]
            },
            {
                category: "👑 Rework de Raridades & Drops Nobres",
                bullets: [
                    "Nova distribuição de raridade na captura: Comum 68%, Incomum 22%, Raro 7.5%, Épico 2.0%, Lendário 0.48% e Mítico 0.02% (exatamente 1 em cada 5.000 capturas).",
                    "Bônus de Qualidade Elevada para Shinies: 0% Comum, 15% Incomum, 40% Raro, 30% Épico, 12% Lendário e 3.0% Mítico — todo Shiny capturado é um verdadeiro tesouro!",
                    "Broadcast Dourado Global com banner visual imersivo, efeito sonoro e registro dourado no chat quando um Mítico, Lendário, Épico ou Shiny for capturado, ou quando um monstro atingir o Nível 100!"
                ]
            },
            {
                category: "💰 Economia Sustentável & Venda Balanceada",
                bullets: [
                    "Fórmula de venda no PokéMart e PC Box recalibrada: Pokémon comuns de nível baixo valem dezenas de moedas, e monstros avançados de alta qualidade recompensam o investimento sem quebrar a economia.",
                    "Ouro do jogo altamente valorizado: compra de Pokébolas, Poções e Itens Essenciais recupera o valor estratégico clássico."
                ]
            },
            {
                category: "📐 Topbar Reorganizada & Grade Invisível",
                bullets: [
                    "Fusão dos botões Perfil e Status no novo botão unificado 'Treinador' (tecla C).",
                    "Integração do Hub Central ao botão 'Mapas' com teleporte direto para Saffron Plaza.",
                    "Layout do HUD e perfis integrados na aba dedicada das Configurações.",
                    "Grade CSS invisível que mantém os botões no topo firmes e organizados durante o jogo comum."
                ]
            }
        ]
    },
    {
        version: "v1.7.0",
        title: "Grandes Desafios, Arenas Isoladas & Pokémon Card",
        date: "05/11/2026",
        badge: "VERSÃO ATUAL",
        is_current: true,
        highlights: [
            {
                category: "🏰 Isolamento Total de Arenas (GvG)",
                bullets: [
                    "Separação estrita entre caça selvagem e o Coliseu de Guildas: monstros de rotas anteriores nunca mais nascem na arena.",
                    "Matriz de colisão limpa 16×11 de coliseu: remoção de lagos, árvores e bloqueios invisíveis herdados da caça.",
                    "Cenário temático com selo central de espadas cruzadas ⚔️, estandarte heráldico da guilda rival no topo, estandarte da sua guilda na base e braseiros animados.",
                    "Mira e Pokémon companheiro travados no Guardião rival, com suspensão automática do Auto-Catch durante a batalha.",
                    "Conquista de território para a guilda com recompensas de +$25.000 Ouro, +15 Diamantes e +500 Pontos de Honra."
                ]
            },
            {
                category: "🃏 Pokémon Card Completo (Hover)",
                bullets: [
                    "Card dinâmico translúcido exibido instantaneamente ao passar o mouse sobre qualquer Pokémon (time, líder, mochila, PC Box).",
                    "Medidores individuais de IVs (0 a 31) com Letter Grades (S+ a D) e percentual de genes perfeitos.",
                    "Cálculo oficial de Combat Power (CP), status de HP atual/máx, tipos elementais com badges oficiais, gênero e natureza.",
                    "Lista dos 4 golpes equipados (m1 a m4) com tipos e poder, progresso de EXP e cotação de venda em Gold na Loja."
                ]
            },
            {
                category: "⚡ Dock Translúcido de Golpes (m1–m4) & Interface Limpa",
                bullets: [
                    "Substituição da janela flutuante pesada por um dock fixo translúcido sobre a Barra de Ação (bottom: 122px).",
                    "Atalhos m1 a m4, chips de alternância individual AUTO/MANUAL e medidor de tempo de recarga (cooldown).",
                    "Remoção completa do botão de Radar e das janelas redundantes (Minimapa, Inimigos e Capturar), despoluindo a tela de caça."
                ]
            },
            {
                category: "🏛️ Cenários Dedicados para Todos os Desafios",
                bullets: [
                    "Mapas jogáveis no canvas em tempo real para Ginásios Oficiais (1-8 com Brock Onix), PvP Ranqueado, Planalto Índigo, Safari Zone, World Boss e Dungeons.",
                    "Banner superior informativo e botão de retorno seguro ao mapa anterior."
                ]
            },
            {
                category: "⚖️ Rework de Raridades, Níveis & Catch Rate",
                bullets: [
                    "Tiers estruturados de IVs: Comum (0-15), Incomum (10-22), Raro (18-26), Épico (24-29 c/ 31 garantido), Lendário (27-31 c/ 2x 31) e Mítico (29-31 c/ 3x 31). Bônus Shiny de +3 IVs.",
                    "Novas curvas polinomiais balanceadas de EXP para Treinador e Pokémon.",
                    "Catch rate justo e transparente: enfraquecer o monstro dá bônus de até 3.8x na taxa de captura."
                ]
            }
        ]
    },
    {
        version: "v1.6.0",
        title: "Infraestrutura de Playtest, Feedback de Jogadores & Polimento Visual",
        date: "05/11/2026",
        badge: "ANTERIOR",
        is_current: false,
        highlights: [
            {
                category: "🚀 Playtester Ready Suite & Kit Inicial",
                bullets: [
                    "Modal de Guia do Testador com instruções completas sobre atalhos, comandos e mecânicas.",
                    "Kit de Boas-Vindas resgatável na barra superior com 30 Pokébolas, 10 Poções de Cura e $5.000 Gold."
                ]
            },
            {
                category: "🐞 Central de Feedback & Reporte de Bugs",
                bullets: [
                    "Ferramenta de envio direto de feedback com categorização (Bug, Sugestão, Dúvida, Balanceamento) e avaliação de 1 a 5 estrelas.",
                    "Armazenamento local e envio seguro de relatórios para a equipe de desenvolvimento."
                ]
            },
            {
                category: "⌨️ Bloqueio de Teclas de Função (F1-F12)",
                bullets: [
                    "Proibição estrita de teclas F1 a F12 como atalhos para não interceptar as funções padrão do navegador."
                ]
            },
            {
                category: "🎨 Sprites Unificados 32-bit & Nomes Limpos",
                bullets: [
                    "Remoção da caixa cinza atrás do nome do treinador e dos monstros para estética limpa estilo Tibia/GBA.",
                    "Padronização das animações de Idle, Movimento, Ataque, Hurt e Knocked Out (Fainted)."
                ]
            },
            {
                category: "💬 Canais de Chat Independentes",
                bullets: [
                    "Aba Local, Global, Trade, Guild e Sistema completamente independentes e sem vazamento de mensagens.",
                    "Configurações personalizadas para ocultar canais, alternar timestamp e ajustar tamanho de fonte."
                ]
            }
        ]
    },
    {
        version: "v1.5.0",
        title: "Venda de Pokémon, Mercado Global & Central de Auto-Farm",
        date: "04/11/2026",
        badge: "ANTERIOR",
        is_current: false,
        highlights: [
            {
                category: "💰 Venda de Pokémons na Loja & PC Box",
                bullets: [
                    "Venda direta de criaturas capturadas da Mochila e do PC Box na Loja em troca de Gold.",
                    "Filtros dinâmicos por raridade, nível e espécie para venda rápida e segura."
                ]
            },
            {
                category: "🏪 Mercado Global & Lojas Especializadas",
                bullets: [
                    "Interface completa de compra e venda de itens e Pokémons entre treinadores do servidor.",
                    "Lojas com moedas dedicadas: Gold Shop e Cash Shop com itens raros e pedras evolutivas."
                ]
            },
            {
                category: "🤖 Central Unificada de Auto-Farm",
                bullets: [
                    "Centralização dos controles de Auto-Ataque, Auto-Target, Auto-Coleta e teleporte offline.",
                    "Cálculo inteligente de EXP e itens farmados durante períodos offline."
                ]
            },
            {
                category: "🔄 Reinicialização e Limpeza de Cache",
                bullets: [
                    "Botão na barra superior para limpar cache do navegador e reiniciar o jogo instantaneamente.",
                    "Caixa flutuante avisando em tempo real quando uma nova versão foi implantada."
                ]
            }
        ]
    }
];

let _currentUpdateLogTabVer = "v1.7.0";

function openUpdateLogModal(selectedVer = "v1.7.0") {
    let modal = document.getElementById("modal-update-log");
    if (!modal) return;

    _currentUpdateLogTabVer = selectedVer;
    switchUpdateLogTab(selectedVer);

    modal.classList.remove("is-hidden");
    modal.style.display = "flex";
}

function closeUpdateLogModal() {
    const modal = document.getElementById("modal-update-log");
    if (modal) {
        modal.classList.add("is-hidden");
        setTimeout(() => { modal.style.display = "none"; }, 200);
    }
}

function confirmUpdateLogEntry() {
    const chk = document.getElementById("chk-dont-show-current-version");
    if (chk && chk.checked) {
        localStorage.setItem("pokeland_seen_update_version", CURRENT_PROJECT_VERSION);
    }
    closeUpdateLogModal();
    showToast(`🚀 Bem-vindo ao PokéLand ${CURRENT_PROJECT_VERSION}!`);
}

function switchUpdateLogTab(ver) {
    _currentUpdateLogTabVer = ver;
    document.querySelectorAll(".updatelog-tab-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-ver") === ver);
    });
    renderUpdateLogContent(ver);
}

function renderUpdateLogContent(ver = "v1.7.0") {
    const container = document.getElementById("update-log-content-area");
    if (!container) return;

    const update = PROJECT_UPDATE_LOG_DATA.find(u => u.version === ver) || PROJECT_UPDATE_LOG_DATA[0];
    if (!update) return;

    const sectionsHtml = update.highlights.map(h => `
        <div class="updatelog-category-section">
            <div class="updatelog-cat-title">
                <span>${h.category}</span>
            </div>
            <ul class="updatelog-bullets-list">
                ${h.bullets.map(b => `<li>${b}</li>`).join("")}
            </ul>
        </div>
    `).join("");

    container.innerHTML = `
        <div class="updatelog-version-card">
            <div class="updatelog-card-header">
                <div class="updatelog-card-title-group">
                    <h4>${update.version} — ${update.title}</h4>
                    <span>Lançamento Oficial: ${update.date}</span>
                </div>
                <span class="updatelog-badge-pill ${update.is_current ? 'is-current' : 'is-past'}">
                    ${update.badge}
                </span>
            </div>
            ${sectionsHtml}
        </div>
    `;
}

window.CURRENT_PROJECT_VERSION = CURRENT_PROJECT_VERSION;
window.PROJECT_UPDATE_LOG_DATA = PROJECT_UPDATE_LOG_DATA;
window.openUpdateLogModal = openUpdateLogModal;
window.closeUpdateLogModal = closeUpdateLogModal;
window.switchUpdateLogTab = switchUpdateLogTab;
window.confirmUpdateLogEntry = confirmUpdateLogEntry;

function openPlaytesterGuideModal() {
    const modal = document.getElementById("modal-playtester-guide");
    if (!modal) return;
    
    // Check kit status
    const claimed = STATE.player?.stats?.playtest_kit_claimed;
    const btn = document.getElementById("btn-claim-playtest-kit");
    if (btn) {
        if (claimed) {
            btn.textContent = "✓ Kit Resgatado!";
            btn.classList.remove("is-gold");
            btn.disabled = true;
            btn.style.opacity = "0.6";
            btn.style.cursor = "default";
        } else {
            btn.textContent = "Resgatar Kit!";
            btn.classList.add("is-gold");
            btn.disabled = false;
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
        }
    }
    
    const chk = document.getElementById("chk-dont-show-playtest-guide");
    if (chk) {
        chk.checked = localStorage.getItem("pokeland_dont_show_playtest_guide") === "true";
    }

    modal.style.display = "flex";
}

function closePlaytesterGuideModal() {
    const modal = document.getElementById("modal-playtester-guide");
    if (modal) modal.style.display = "none";
}

function toggleDontShowPlaytestGuide(checked) {
    if (checked) {
        localStorage.setItem("pokeland_dont_show_playtest_guide", "true");
    } else {
        localStorage.removeItem("pokeland_dont_show_playtest_guide");
    }
}

async function claimPlaytesterKit() {
    const btn = document.getElementById("btn-claim-playtest-kit");
    if (btn) btn.disabled = true;

    try {
        const res = await fetch("/api/playtest/claim-kit", {
            method: "POST",
            headers: getAuthHeaders(),
        });
        const data = await res.json();
        if (data.ok) {
            if (data.player) {
                STATE.player = data.player;
            }
            if (btn) {
                btn.textContent = "✓ Kit Resgatado!";
                btn.classList.remove("is-gold");
                btn.style.opacity = "0.6";
            }
            showToast(data.message || "🎉 Kit de Playtester resgatado com sucesso!");
            if (typeof renderAll === "function") renderAll();
            if (typeof renderActionBar === "function") renderActionBar();
            if (typeof spawnFloatingText === "function" && STATE.tibia?.trainer) {
                spawnFloatingText(STATE.tibia.trainer.gx, STATE.tibia.trainer.gy - 1, "+KIT PLAYTESTER! 🎁", "#facc15");
            }
        } else {
            showToast(`⚠️ ${data.error || "Não foi possível resgatar o kit."}`);
            if (btn) btn.disabled = false;
        }
    } catch (e) {
        console.error("Error claiming playtest kit:", e);
        showToast("⚠️ Falha de conexão ao resgatar kit.");
        if (btn) btn.disabled = false;
    }
}

function openFeedbackModal() {
    const modal = document.getElementById("modal-feedback");
    if (!modal) return;
    const input = document.getElementById("feedback-message-input");
    if (input) input.value = "";
    selectFeedbackCategory("bug");
    setFeedbackRating(5);
    modal.style.display = "flex";
}

function closeFeedbackModal() {
    const modal = document.getElementById("modal-feedback");
    if (modal) modal.style.display = "none";
}

function selectFeedbackCategory(cat) {
    _selectedFeedbackCat = cat;
    document.querySelectorAll(".feedback-cat-pill").forEach((pill) => {
        pill.classList.toggle("active", pill.dataset.cat === cat);
    });
}

function setFeedbackRating(stars) {
    _selectedFeedbackRating = Math.max(1, Math.min(5, stars));
    document.querySelectorAll(".feedback-star").forEach((s) => {
        const starVal = parseInt(s.dataset.star, 10);
        s.classList.toggle("active", starVal <= _selectedFeedbackRating);
    });
}

async function submitTesterFeedback() {
    const input = document.getElementById("feedback-message-input");
    const msg = input ? input.value.trim() : "";
    if (msg.length < 3) {
        showToast("⚠️ Por favor digite uma mensagem com pelo menos 3 caracteres.");
        return;
    }

    const btn = document.getElementById("btn-submit-feedback");
    if (btn) btn.disabled = true;

    const lead = (typeof getLeadPokemon === "function") ? getLeadPokemon() : null;
    const summary = `Zone: ${STATE.activeZone?.name || "Desconhecida"} | Coord: (${STATE.tibia?.trainer?.gx || 0}, ${STATE.tibia?.trainer?.gy || 0}) | Level: ${STATE.player?.level || 1} | Lead: ${lead?.name || "Nenhum"} | Res: ${window.innerWidth}x${window.innerHeight}`;

    try {
        const res = await fetch("/api/feedback", {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({
                category: _selectedFeedbackCat,
                rating: _selectedFeedbackRating,
                message: msg,
                player_summary: summary,
                username: STATE.player?.name || "Treinador",
            }),
        });
        const data = await res.json();
        if (data.ok) {
            closeFeedbackModal();
            showToast("🌟 Obrigado! Seu feedback foi enviado diretamente aos desenvolvedores!");
            if (typeof addChatMessage === "function") {
                addChatMessage("system", "Sistema", `[FEEDBACK ENVIADO] Seu relatório de teste foi registrado com sucesso (ID #${data.id}). Obrigado por ajudar a construir o PokéLand!`);
            }
        } else {
            showToast(`⚠️ ${data.error || "Erro ao enviar feedback."}`);
        }
    } catch (e) {
        console.error("Error submitting feedback:", e);
        showToast("⚠️ Falha de conexão ao enviar feedback.");
    } finally {
        if (btn) btn.disabled = false;
    }
}


// ====================================================
// INDEPENDENT CHAT CHANNELS & CUSTOMIZABLE CHAT SETTINGS
// ====================================================
const DEFAULT_CHAT_SETTINGS = {
    strictIsolation: true,
    allowSystemInOtherChannels: false,
    showTimestamps: true,
    fontSize: "medium", // small, medium, large
    chatOpacity: 0.92,
    ambientCommunityChat: true,
    enabledChannels: {
        local: true,
        global: true,
        trade: true,
        guild: true,
        system: true,
        whisper: true,
    },
};

function loadChatSettings() {
    try {
        const raw = localStorage.getItem("pokeland_chat_settings");
        if (raw) {
            return Object.assign({}, DEFAULT_CHAT_SETTINGS, JSON.parse(raw));
        }
    } catch (e) {
        console.error("Failed to parse chat settings", e);
    }
    return Object.assign({}, DEFAULT_CHAT_SETTINGS);
}

function saveChatSettings(settings) {
    try {
        localStorage.setItem("pokeland_chat_settings", JSON.stringify(settings));
    } catch (e) {
        console.error("Failed to save chat settings", e);
    }
}

function openChatSettingsModal() {
    if (!STATE.chat) initChatSystem();
    const modal = document.getElementById("modal-chat-settings");
    if (!modal) return;
    const s = STATE.chat.settings || loadChatSettings();

    const chkStrict = document.getElementById("chat-setting-strict-isolation");
    if (chkStrict) chkStrict.checked = s.strictIsolation !== false;

    const chkSystem = document.getElementById("chat-setting-system-leak");
    if (chkSystem) chkSystem.checked = !!s.allowSystemInOtherChannels;

    const selFont = document.getElementById("chat-setting-font-size");
    if (selFont) selFont.value = s.fontSize || "medium";

    const selOpacity = document.getElementById("chat-setting-opacity");
    if (selOpacity) selOpacity.value = String(s.chatOpacity || 0.92);

    const chkTime = document.getElementById("chat-setting-timestamps");
    if (chkTime) chkTime.checked = s.showTimestamps !== false;

    const chkAmbient = document.getElementById("chat-setting-ambient");
    if (chkAmbient) chkAmbient.checked = s.ambientCommunityChat !== false;

    if (s.enabledChannels) {
        for (const [ch, enabled] of Object.entries(s.enabledChannels)) {
            const chk = document.getElementById(`chat-tab-chk-${ch}`);
            if (chk) chk.checked = !!enabled;
        }
    }

    modal.style.display = "flex";
}

function closeChatSettingsModal() {
    const modal = document.getElementById("modal-chat-settings");
    if (modal) modal.style.display = "none";
}

function updateChatSetting(key, val) {
    if (!STATE.chat) initChatSystem();
    if (!STATE.chat.settings) STATE.chat.settings = loadChatSettings();
    STATE.chat.settings[key] = val;
    saveChatSettings(STATE.chat.settings);
    applyChatSettingsToUi();
}

function toggleChannelTabVisibility(ch, enabled) {
    if (!STATE.chat) initChatSystem();
    if (!STATE.chat.settings) STATE.chat.settings = loadChatSettings();
    if (!STATE.chat.settings.enabledChannels) {
        STATE.chat.settings.enabledChannels = Object.assign({}, DEFAULT_CHAT_SETTINGS.enabledChannels);
    }
    STATE.chat.settings.enabledChannels[ch] = !!enabled;
    saveChatSettings(STATE.chat.settings);
    applyChatSettingsToUi();
}

function resetChatSettingsToDefault() {
    if (!STATE.chat) initChatSystem();
    STATE.chat.settings = Object.assign({}, DEFAULT_CHAT_SETTINGS);
    saveChatSettings(STATE.chat.settings);
    openChatSettingsModal();
    applyChatSettingsToUi();
    showToast("⚙️ Configurações do Chat restauradas ao padrão!");
}

function applyChatSettingsToUi() {
    if (!STATE.chat || !STATE.chat.settings) return;
    const s = STATE.chat.settings;

    const container = document.getElementById("chat-messages-container");
    if (container) {
        const sizeMap = { small: "11px", medium: "13px", large: "15px" };
        container.style.fontSize = sizeMap[s.fontSize] || "13px";
    }

    const chatStream = document.getElementById("floating-chat-stream");
    if (chatStream) {
        chatStream.style.background = `rgba(11, 18, 29, ${s.chatOpacity || 0.92})`;
        chatStream.classList.toggle("hide-timestamps", !s.showTimestamps);
    }

    if (s.enabledChannels) {
        for (const [ch, enabled] of Object.entries(s.enabledChannels)) {
            const btn = document.querySelector(`.chat-tab-btn[data-chat-channel="${ch}"]`);
            if (btn) btn.style.display = enabled ? "" : "none";
            const opt = document.querySelector(`#chat-channel-select option[value="${ch}"]`);
            if (opt) opt.style.display = enabled ? "" : "none";
        }
        const curCh = STATE.chat.activeChannel || "local";
        if (s.enabledChannels[curCh] === false) {
            const firstActive = Object.keys(s.enabledChannels).find((c) => s.enabledChannels[c]);
            if (firstActive) switchChatChannel(firstActive);
        }
    }

    renderChatMessages();
}

// PokePixel Tibia Edition (PxG / PokéTibia SQM Client Engine)
// =========================================================
// POKÉLAND UNIFIED TYPOGRAPHY ENGINE (CANVAS & UI)
// =========================================================
const POKELAND_FONTS = {
    brand: "'Pokemon Solid', 'Pokemon DP', sans-serif",
    pixel: "'Pokemon DP', 'Pokemon Emerald', 'Press Start 2P', monospace",
    retro: "'Pokemon Retro', 'Pokemon GB', monospace",
    ui: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Consolas', monospace"
};

function getGameCanvasFont(variant, size, weight = "700") {
    const preset = (STATE && STATE.settings && STATE.settings.fontPreset) || "pokemon-hybrid";
    let family = POKELAND_FONTS[variant] || POKELAND_FONTS.ui;
    
    if (preset === "pokemon-retro") {
        if (variant === "ui" || variant === "brand") {
            family = POKELAND_FONTS.pixel;
        }
    } else if (preset === "pokemon-modern") {
        if (variant === "pixel") {
            family = POKELAND_FONTS.ui;
        }
    }
    return `${weight} ${size}px ${family}`;
}

const SQM_SIZE = 48;
const GRID_COLS = 16; // 16 * 48 = 768px
const GRID_ROWS = 11; // 11 * 48 = 528px

let STATE = {
    player: null,
    config: null,
    worlds: [],
    zones: [],
    species: [],
    speciesById: {},
    capsules: [],
    stones: [],
    itemsMap: {},
    movesMap: {},
    mapColliders: null,
    activeWorldId: null,
    activeZone: null,
    wildEnemy: null, // Currently targeted wild monster (or first alive monster)
    autoHuntTimer: null,
    autoHuntEnabled: false,
    autoMovesEnabled: true,
    autoMoveSlots: [true, true, true, true],
    autoMoveCursor: 0,
    activeCastingMoveIdx: -1,
    actionBarSlots: ["capsule_basic", "capsule_great", "capsule_ultra", "capsule_master", "potion", "revive", "candy_rare", "stone_water"],
    autoCatchEnabled: false,
    autoCatchMode: "always",
    autoCatchBall: "best",
    autoHuntSpeedMs: 1440,
    lastAutoCatchTime: 0,
    dexElementFilter: "all",
    settings: {
        showGrid: false, // Visual grid removed by default
        vfxQuality: "full", // "full" | "reduced" | "off"
        spriteVersion: "pmd",
        cameraMode: "hd_ring",
        fontPreset: "pokemon-hybrid",
        masterVolume: 80,
        sfxEnabled: true,
        chatNotifications: true,
        shinySound: true,
        autoTarget: true,
        confirmRelease: true,
        uiScale: 100,
    },
    chat: {
        activeChannel: "local",
        unread: { local: 0, global: 0, trade: 0, guild: 0, system: 0, whisper: 0 },
        messages: [],
        lastWhisperTarget: null,
        lastWhisperSender: null,
    },
    tibia: {
        frame: 0,
        simAcc: 0,
        simStep: 0,
        animSpeedFactor: 0.25, // 75% slower hunt animation by default (25% speed)
        lastTick: 0,
        mapBgMode: "hd_ring",
        isCentralHub: false,
        centralSubTab: "trade",
        selectedHubPlayerId: "ash_kanto",
        hubPlayers: [],
        hubStations: [],
        summonOut: true,
        orderMoveMode: false,
        autoLoot: true,
        selectedBallId: "capsule_ultra",
        trainer: {
            gx: 4,
            gy: 5,
            px: 4 * SQM_SIZE,
            py: 5 * SQM_SIZE,
            targetGx: 4,
            targetGy: 5,
            dir: 2, // 0=S, 1=W, 2=E, 3=N
            avatarModelId: "red_ash",
            speechText: "",
            speechTimer: 0,
        },
        summon: {
            gx: 5,
            gy: 5,
            px: 5 * SQM_SIZE,
            py: 5 * SQM_SIZE,
            dir: 2,
            atkCooldown: 0,
        },
        moveCooldowns: {}, // { moveId: expireTimestamp }
        monsters: [],      // Active wild Pokémon on the SQM map
        targetId: null,    // UID of red-targeted wild Pokémon
        corpses: [],       // Fainted Pokémon bodies on the ground (catchable & lootable!)
        tileEffects: [],   // AoE SQM spell animations
        spellVfx: [],      // Dynamic animated elemental moves VFX (Water, Fire, Electric, etc.)
        projectiles: [],   // Flying Pokéballs & ranged spell missiles
        floatingTexts: [], // Tibia rising damage / EXP / heal numbers
        mapMatrix: [],     // 11x16 tile types (0=floor, 1=blocked wall/tree, 2=pz, 3=decor)
        spriteCache: {},
    },
};

const ELEMENT_PT = {
    normal: { label: "Normal", bg: "#4b5563", fg: "#f3f4f6", spellColor: "#e5e7eb" },
    fire: { label: "Fogo", bg: "#b91c1c", fg: "#fca5a5", spellColor: "#f97316" },
    water: { label: "Água", bg: "#1d4ed8", fg: "#93c5fd", spellColor: "#38bdf8" },
    electric: { label: "Elétrico", bg: "#a16207", fg: "#fef08a", spellColor: "#facc15" },
    grass: { label: "Planta", bg: "#15803d", fg: "#86efac", spellColor: "#4ade80" },
    ice: { label: "Gelo", bg: "#0e7490", fg: "#a5f3fc", spellColor: "#67e8f9" },
    fighting: { label: "Lutador", bg: "#991b1b", fg: "#fecaca", spellColor: "#ef4444" },
    poison: { label: "Veneno", bg: "#6b21a8", fg: "#f3e8ff", spellColor: "#c084fc" },
    ground: { label: "Terra", bg: "#92400e", fg: "#fcd34d", spellColor: "#d97706" },
    flying: { label: "Voador", bg: "#4338ca", fg: "#c7d2fe", spellColor: "#818cf8" },
    psychic: { label: "Psíquico", bg: "#be185d", fg: "#fbcfe8", spellColor: "#f472b6" },
    bug: { label: "Inseto", bg: "#3f6212", fg: "#bef264", spellColor: "#a3e635" },
    rock: { label: "Pedra", bg: "#78350f", fg: "#fde68a", spellColor: "#b45309" },
    ghost: { label: "Fantasma", bg: "#581c87", fg: "#e9d5ff", spellColor: "#a855f7" },
    dragon: { label: "Dragão", bg: "#4c1d95", fg: "#ddd6fe", spellColor: "#6366f1" },
    dark: { label: "Sombrio", bg: "#1f2937", fg: "#9ca3af", spellColor: "#64748b" },
    steel: { label: "Aço", bg: "#374151", fg: "#d1d5db", spellColor: "#94a3b8" },
    fairy: { label: "Fada", bg: "#9d174d", fg: "#f9a8d4", spellColor: "#fb7185" },
};

const TYPE_CHART = {
    fire: { grass: 2, ice: 2, bug: 2, steel: 2, water: 0.5, fire: 0.5, rock: 0.5, dragon: 0.5 },
    water: { fire: 2, ground: 2, rock: 2, water: 0.5, grass: 0.5, dragon: 0.5 },
    grass: { water: 2, ground: 2, rock: 2, fire: 0.5, grass: 0.5, poison: 0.5, flying: 0.5, bug: 0.5, dragon: 0.5, steel: 0.5 },
    electric: { water: 2, flying: 2, electric: 0.5, grass: 0.5, dragon: 0.5, ground: 0 },
    ice: { grass: 2, ground: 2, flying: 2, dragon: 2, fire: 0.5, water: 0.5, ice: 0.5, steel: 0.5 },
    fighting: { normal: 2, ice: 2, rock: 2, dark: 2, steel: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, fairy: 0.5, ghost: 0 },
    poison: { grass: 2, fairy: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0 },
    ground: { fire: 2, electric: 2, poison: 2, rock: 2, steel: 2, grass: 0.5, bug: 0.5, flying: 0 },
    flying: { grass: 2, fighting: 2, bug: 2, electric: 0.5, rock: 0.5, steel: 0.5 },
    psychic: { fighting: 2, poison: 2, psychic: 0.5, steel: 0.5, dark: 0 },
    bug: { grass: 2, psychic: 2, dark: 2, fire: 0.5, fighting: 0.5, poison: 0.5, flying: 0.5, ghost: 0.5, steel: 0.5, fairy: 0.5 },
    rock: { fire: 2, ice: 2, flying: 2, bug: 2, fighting: 0.5, ground: 0.5, steel: 0.5 },
    ghost: { psychic: 2, ghost: 2, dark: 0.5, normal: 0 },
    dragon: { dragon: 2, steel: 0.5, fairy: 0 },
    dark: { psychic: 2, ghost: 2, fighting: 0.5, dark: 0.5, fairy: 0.5 },
    steel: { ice: 2, rock: 2, fairy: 2, fire: 0.5, water: 0.5, electric: 0.5, steel: 0.5 },
    fairy: { fighting: 2, dragon: 2, dark: 2, fire: 0.5, poison: 0.5, steel: 0.5 },
};

const NATURES_CLIENT = [
    { id: "Adamant", up: "atk", down: "spa", label: "+ATK / -SPA" },
    { id: "Jolly", up: "spe", down: "spa", label: "+SPE / -SPA" },
    { id: "Modest", up: "spa", down: "atk", label: "+SPA / -ATK" },
    { id: "Timid", up: "spe", down: "atk", label: "+SPE / -ATK" },
    { id: "Bold", up: "def", down: "atk", label: "+DEF / -ATK" },
    { id: "Calm", up: "spd", down: "atk", label: "+SPD / -ATK" },
    { id: "Impish", up: "def", down: "spa", label: "+DEF / -SPA" },
    { id: "Careful", up: "spd", down: "spa", label: "+SPD / -SPA" },
    { id: "Hardy", up: null, down: null, label: "Neutra" },
];

// ====================================================
// POKEPIXEL ORIGINAL PMD SPRITE & ANIMATION ENGINE
// ====================================================
const PMD_MANIFESTS = {}; // slug -> manifest

function getPmdSlug(speciesIdOrDex) {
    if (!speciesIdOrDex) return "pikachu";
    if (typeof speciesIdOrDex === "number") {
        const sp = (STATE.species || []).find((s) => s.dex_id === speciesIdOrDex);
        if (sp) return sp.id.toLowerCase().replace(/_/g, "-");
    }
    return String(speciesIdOrDex).toLowerCase().replace(/_/g, "-");
}

function getPmdManifest(slug) {
    if (!slug) return null;
    if (PMD_MANIFESTS[slug] !== undefined) return PMD_MANIFESTS[slug];
    PMD_MANIFESTS[slug] = null;
    fetch(`/data/pmd/${slug}.json`)
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
            PMD_MANIFESTS[slug] = data;
        })
        .catch(() => {
            PMD_MANIFESTS[slug] = null;
        });
    return null;
}

function getPmdSheetUrl(slug, animName = "Idle", isShiny = false) {
    return `/img/pmd/${slug}/${animName}.png`;
}

function getPmdPortraitUrl(speciesIdOrDex, isShiny = false) {
    const slug = getPmdSlug(speciesIdOrDex);
    return `/img/pmd/${slug}/Portrait.png`;
}

function getPmdFrameInfo(manifest, animName, frameTick) {
    const anim = manifest?.anims?.[animName] || manifest?.anims?.Idle;
    if (!anim) return null;
    const durations = anim.d || [8, 8, 8, 8];
    const totalTicks = durations.reduce((a, b) => a + b, 0) || 1;
    let t = Math.floor(frameTick) % totalTicks;
    let frameIdx = 0;
    for (let i = 0; i < durations.length; i++) {
        if (t < durations[i]) {
            frameIdx = i;
            break;
        }
        t -= durations[i];
    }
    return {
        w: anim.w,
        h: anim.h,
        frameIdx,
        totalFrames: durations.length,
        ax: anim.ax || anim.w / 2,
        ay: anim.ay || anim.h - 4,
    };
}

// =========================================================
// 32-BIT UNIFIED SPRITE & PORTRAIT PIPELINE (PMD HD STANDARD)
// =========================================================

function getStandardSpriteFallback(speciesIdOrDex, isShiny = false) {
    const slug = getPmdSlug(speciesIdOrDex);
    return getPmdPortraitUrl(slug, isShiny);
}

function getGbaFrontSprite(speciesIdOrDex, isShiny = false) {
    const slug = getPmdSlug(speciesIdOrDex);
    return getPmdPortraitUrl(slug, isShiny);
}

function getSpriteUrl(speciesIdOrDex, isShiny = false) {
    const slug = getPmdSlug(speciesIdOrDex);
    return getPmdPortraitUrl(slug, isShiny);
}

function getCachedImage(url) {
    if (!url) return null;
    if (STATE.tibia.spriteCache[url]) return STATE.tibia.spriteCache[url];
    const img = new Image();
    img.onerror = () => {
        img._failed = true;
    };
    img.src = url;
    STATE.tibia.spriteCache[url] = img;
    return img;
}

function getPixelBallSvgDataUri(capId) {
    if (typeof getItemSpriteUrl === "function") {
        return getItemSpriteUrl(capId);
    }
    const clean = String(capId || "capsule_basic").replace("capsule_", "").replace("ball_", "");
    return `/img/items/${clean}-ball.png`;
}

function changeGbaSpriteVersion(newVer) {
    if (!STATE.config) return;
    STATE.config.gba_sprite_version = newVer;
    syncStateToServer();
    renderAll();
    showToast(`🎨 Estilo de sprites alterado para: ${newVer.toUpperCase()}!`);
}

// ====================================================
// POKEPIXEL ORIGINAL VISUAL EFFECTS (COMBAT, SHINY, AURAS)
// ====================================================
function spawnPokePixelCombatPopup(gx, gy, text, kind = "damage", isCrit = false) {
    // Single unified source of pop up messages during hunts (canvas floatingTexts)
    let color = "#ef4444";
    if (kind === "damage") color = isCrit ? "#fde047" : "#ff3333";
    else if (kind === "heal") color = "#4ade80";
    else if (kind === "exp") color = "#38bdf8";
    else if (kind === "gold") color = "#facc15";
    else if (kind === "miss") color = "#94a3b8";
    spawnFloatingText(gx, gy, text, color);
}

function drawShinySparkles(ctx, centerX, centerY) {
    const f = (STATE.tibia.animTick || STATE.tibia.frame || 0) * 0.7;
    const angles = [0, 1.25, 2.5, 3.75, 5.0];
    for (let i = 0; i < angles.length; i++) {
        const a = angles[i] + f * 0.06;
        const r = 18 + Math.sin(f * 0.12 + i) * 6;
        const sx = centerX + Math.cos(a) * r;
        const sy = centerY + Math.sin(a) * r * 0.65;
        const size = 3.5 + Math.sin(f * 0.22 + i * 1.5) * 2;
        ctx.save();
        ctx.fillStyle = i % 2 === 0 ? "#fde047" : "#ffffff";
        ctx.beginPath();
        ctx.moveTo(sx, sy - size);
        ctx.lineTo(sx + size * 0.65, sy);
        ctx.lineTo(sx, sy + size);
        ctx.lineTo(sx - size * 0.65, sy);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

function drawMythicAura(ctx, centerX, centerY) {
    const f = (STATE.tibia.animTick || STATE.tibia.frame || 0) * 0.7;
    const pulse = 1.0 + Math.sin(f * 0.1) * 0.18;
    ctx.save();
    // Outer cosmic halo
    const grad = ctx.createRadialGradient(centerX, centerY, 4, centerX, centerY, 26 * pulse);
    grad.addColorStop(0, "rgba(236, 72, 153, 0.45)");
    grad.addColorStop(0.45, "rgba(168, 85, 247, 0.35)");
    grad.addColorStop(0.8, "rgba(99, 102, 241, 0.2)");
    grad.addColorStop(1, "rgba(99, 102, 241, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 26 * pulse, 0, Math.PI * 2);
    ctx.fill();

    // Orbiting stardust orbs
    const orbAngles = [0, 2.1, 4.2];
    for (let i = 0; i < orbAngles.length; i++) {
        const a = orbAngles[i] + f * 0.08;
        const ox = centerX + Math.cos(a) * (20 * pulse);
        const oy = centerY + Math.sin(a) * (10 * pulse);
        ctx.fillStyle = i === 0 ? "#f472b6" : i === 1 ? "#c084fc" : "#67e8f9";
        ctx.beginPath();
        ctx.arc(ox, oy, 2.4, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
}

function spawnPokePixelCaptureVFX(gx, gy, capId, isSuccess) {
    const vfxLayer = document.getElementById("pokeidle-vfx-layer");
    if (!vfxLayer) return;
    const canvas = document.getElementById("tibia-game-canvas");
    if (!canvas) return;

    const scaleX = canvas.offsetWidth / (GRID_COLS * SQM_SIZE);
    const scaleY = canvas.offsetHeight / (GRID_ROWS * SQM_SIZE);
    const posX = Math.round((gx * SQM_SIZE + 24) * scaleX);
    const posY = Math.round((gy * SQM_SIZE + 28) * scaleY);

    const seq = document.createElement("div");
    seq.className = "pokeidle-capture-sequence";
    seq.style.left = `${posX}px`;
    seq.style.top = `${posY}px`;

    let ballSubClass = "";
    if (capId === "capsule_great") ballSubClass = "capture-ball--great";
    else if (capId === "capsule_ultra") ballSubClass = "capture-ball--ultra";
    else if (capId === "capsule_master") ballSubClass = "capture-ball--master";

    if (isSuccess) {
        let starsHtml = "";
        const starOffsets = [
            [-28, -26], [28, -26], [-34, 10], [34, 10], [0, -36], [-16, 26], [16, 26], [0, 32]
        ];
        for (const [ox, oy] of starOffsets) {
            starsHtml += `<div class="pokeidle-capture-star" style="--star-x:${ox}px;--star-y:${oy}px;position:absolute;left:0;top:0;width:12px;height:12px;background:#fde047;border-radius:2px;animation:pokeidle-capture-star 850ms ease-out forwards;box-shadow:0 0 10px #fde047;"></div>`;
        }
        seq.innerHTML = `
            <div class="pokeidle-capture-ball ${ballSubClass}" style="animation:pokeidle-capture-success-ball 900ms ease-in-out forwards;">
                <div class="pokeidle-capture-ball__top"></div>
                <div class="pokeidle-capture-ball__bottom"></div>
                <div class="pokeidle-capture-ball__button"></div>
            </div>
            ${starsHtml}
        `;
    } else {
        let shardsHtml = "";
        const shardOffsets = [
            [-32, -35], [32, -35], [-22, -15], [22, -15], [-35, 12], [35, 12]
        ];
        for (let i = 0; i < shardOffsets.length; i++) {
            const [ox, oy] = shardOffsets[i];
            const col = i % 2 === 0 ? "#ef4444" : "#ffffff";
            shardsHtml += `<div class="pokeidle-capture-break-shard" style="--shard-x:${ox}px;--shard-y:${oy}px;position:absolute;left:0;top:0;width:9px;height:9px;background:${col};clip-path:polygon(50% 0%, 0% 100%, 100% 100%);animation:pokeidle-capture-break-shards 750ms ease-out forwards;"></div>`;
        }
        seq.innerHTML = `
            <div class="pokeidle-capture-ball ${ballSubClass}" style="opacity:0;">
                <div class="pokeidle-capture-ball__top"></div>
                <div class="pokeidle-capture-ball__bottom"></div>
                <div class="pokeidle-capture-ball__button"></div>
            </div>
            ${shardsHtml}
        `;
    }

    vfxLayer.appendChild(seq);
    setTimeout(() => seq.remove(), 1200);
}

// ====================================================
// MYTHICAL (MÍTICO) ROLL & IV INSPECTOR ENGINE
// ====================================================
function classifyMythicalGrade(mon) {
    const q = (mon && mon.quality) ? (mon.quality.charAt(0).toUpperCase() + mon.quality.slice(1).toLowerCase()) : "Comum";
    const qNorm = q === "Epico" ? "Épico" : q === "Lendario" ? "Lendário" : q === "Mitico" ? "Mítico" : q;
    const isMythical = qNorm === "Mítico";
    const isShiny = !!(mon && mon.is_shiny);

    const qColors = {
        Comum: { bg: "#374151", fg: "#d1d5db", border: "#4b5563" },
        Incomum: { bg: "#065f46", fg: "#6ee7b7", border: "#10b981" },
        Raro: { bg: "#1e40af", fg: "#93c5fd", border: "#3b82f6" },
        "Épico": { bg: "#5b21b6", fg: "#ddd6fe", border: "#8b5cf6" },
        "Lendário": { bg: "#78350f", fg: "#fde68a", border: "#f59e0b" },
        "Mítico": { bg: "linear-gradient(135deg, #881337, #be123c)", fg: "#fecdd3", border: "#f43f5e" }
    };
    const st = qColors[qNorm] || qColors.Comum;
    const icon = isMythical ? "👑 " : qNorm === "Lendário" ? "🌟 " : qNorm === "Épico" ? "🔮 " : "";
    const label = `${icon}${isShiny ? "Shiny " : ""}${qNorm}`;

    return {
        isMythical: isMythical,
        tier: isMythical ? "mythic" : "standard",
        shortLabel: qNorm,
        gradeLabel: label,
        badgeHtml: `<span class="qual-pill" style="background:${st.bg};color:${st.fg};border:1px solid ${st.border};padding:2px 7px;border-radius:4px;font-weight:800;font-size:10px;display:inline-flex;align-items:center;gap:3px;">${label}</span>`
    };
}

function getGen8TypeIconUrl(el) {
    const key = String(el || "normal").toLowerCase().trim();
    return `/img/ui/types/gen8/${ELEMENT_PT[key] ? key : "normal"}.png`;
}

function getPmdPortraitUrl(speciesIdOrDex) {
    const slug = getPmdSlug(speciesIdOrDex);
    return `/img/pmd/${slug}/Portrait.png`;
}

function getRmmzIconHtml(iconIndex, extraClass = "rmmz-icon") {
    const idx = Math.max(0, parseInt(iconIndex || 0, 10));
    const col = idx % 16;
    const row = Math.floor(idx / 16);
    const bx = -(col * 32);
    const by = -(row * 32);
    return `<span class="${extraClass}" style="background-position:${bx}px ${by}px;"></span>`;
}

function renderTypeBadges(elements) {
    return (elements || ["normal"])
        .map((el) => {
            const key = String(el || "normal").toLowerCase();
            const info = ELEMENT_PT[key] || ELEMENT_PT.normal;
            const iconUrl = getGen8TypeIconUrl(key);
            return `<span class="el-badge" style="background:${info.bg};color:${info.fg};"><img class="el-badge-icon" src="${iconUrl}" alt="${info.label}" onerror="this.style.display='none'"><span>${info.label}</span></span>`;
        })
        .join("");
}

function renderTypeIconsOnly(elements) {
    return (elements || ["normal"])
        .map((el) => {
            const key = String(el || "normal").toLowerCase();
            const info = ELEMENT_PT[key] || ELEMENT_PT.normal;
            const iconUrl = getGen8TypeIconUrl(key);
            return `<span class="el-icon-only" style="background:${info.bg};" title="${info.label}"><img src="${iconUrl}" alt="${info.label}" onerror="this.style.display='none'"></span>`;
        })
        .join("");
}

function showToast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.style.display = "block";
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
        t.style.display = "none";
    }, 3200);
}

function nowTimeStr() {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function addCombatLog(html) {
    const box = document.getElementById("combat-log");
    if (!box) return;
    const div = document.createElement("div");
    div.innerHTML = `<span style="color:#64748b;">${nowTimeStr()}</span> ${html}`;
    box.prepend(div);
    while (box.children.length > 70) {
        box.removeChild(box.lastChild);
    }
}

let _lastFloatingTextHistory = [];
function spawnFloatingText(gx, gy, text, color = "#ff3333") {
    const now = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
    const strText = String(text);
    // De-duplication guard: eliminate double popups on the same position within 400ms
    const isDup = _lastFloatingTextHistory.some(
        (h) => Math.abs(h.gx - gx) < 0.25 && Math.abs(h.gy - gy) < 0.25 && h.text === strText && (now - h.t) < 400
    );
    if (isDup) return;
    _lastFloatingTextHistory.push({ gx, gy, text: strText, t: now });
    if (_lastFloatingTextHistory.length > 25) _lastFloatingTextHistory.shift();

    STATE.tibia.floatingTexts.push({
        x: gx * SQM_SIZE + SQM_SIZE / 2 + (Math.random() * 8 - 4),
        y: gy * SQM_SIZE + 14,
        text: strText,
        color,
        life: 40,
        maxLife: 40,
    });
}

function setTrainerSpeech(text) {
    STATE.tibia.trainer.speechText = text;
    STATE.tibia.trainer.speechTimer = 55;
}

// ====================================================
// INITIALIZATION & STATE SYNC (AUTH & SQLITE INTEGRATION)
// ====================================================
function getAuthHeaders() {
    const token = localStorage.getItem("pokepixel_auth_token");
    const headers = { "Content-Type": "application/json" };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}

async function logoutTrainer() {
    const token = localStorage.getItem("pokepixel_auth_token");
    try {
        await fetch("/api/auth/logout", {
            method: "POST",
            headers: token ? { "Authorization": `Bearer ${token}` } : {},
        });
    } catch (e) {}
    localStorage.removeItem("pokepixel_auth_token");
    localStorage.removeItem("pokepixel_guest");
    window.location.href = "/login.html?logout=1";
}

async function initGame() {
    const token = localStorage.getItem("pokepixel_auth_token");
    const isBypass = window.location.search.includes("bypass_login=1") ||
                     window.location.search.includes("show_transit_demo=1") ||
                     window.location.search.includes("openhub=1");

    // REGRA MANDATÓRIA: É estritamente obrigatório fazer login para acessar o jogo!
    if (!token && !isBypass) {
        window.location.href = "/login.html";
        return;
    }

    const headers = getAuthHeaders();
    const [res, colRes] = await Promise.all([
        fetch("/api/bootstrap", { headers }),
        fetch("/data/MapColliders.json").catch(() => null),
    ]);
    const data = await res.json();
    if (colRes && colRes.ok) {
        try {
            STATE.mapColliders = await colRes.json();
        } catch (e) {
            STATE.mapColliders = null;
        }
    }
    applyBootstrapData(data);
    renderDexTypeFilters();
    initDraggableHudBars();
    initTibiaMapEngine();
    renderAll();
}

function applyBootstrapData(data) {
    STATE.currentUser = data.user || null;
    STATE.isGuest = Boolean(data.is_guest);
    STATE.player = data.player;
    STATE.config = data.config;
    STATE.worlds = data.worlds;
    STATE.zones = data.zones;
    STATE.species = data.species;
    STATE.speciesById = {};
    for (const s of STATE.species) {
        STATE.speciesById[s.id] = s;
    }
    STATE.capsules = data.capsules;
    STATE.stones = data.stones;
    STATE.itemsMap = data.items_map;
    STATE.movesMap = data.moves_map;

    // Sync active authenticated user with top menu bar & trainer state
    if (STATE.currentUser && STATE.currentUser.username) {
        const nameEl = document.getElementById("hud-trainer-name");
        if (nameEl) nameEl.textContent = STATE.currentUser.username;
        if (STATE.currentUser.avatar_model) {
            if (STATE.tibia && STATE.tibia.trainer) STATE.tibia.trainer.avatarModelId = STATE.currentUser.avatar_model;
            if (STATE.player) STATE.player.avatar_model = STATE.currentUser.avatar_model;
        }
    } else if (STATE.isGuest) {
        const nameEl = document.getElementById("hud-trainer-name");
        if (nameEl && !nameEl.textContent.includes("🎮")) {
            nameEl.textContent = (STATE.player?.name || "Treinador") + " 🎮";
            nameEl.title = "Jogando como Convidado (Guest). Clique em 'Sair' para criar sua conta persistente!";
        }
    }

    const verSel = document.getElementById("gba-version-select");
    if (verSel && STATE.config.gba_sprite_version) {
        verSel.value = STATE.config.gba_sprite_version;
    }

    // Preload PMD manifests for active party Pokémon
    for (const mon of (STATE.player.party || [])) {
        getPmdManifest(getPmdSlug(mon.species_id || mon.dex_id));
    }

    if (!STATE.activeWorldId && STATE.worlds.length > 0) {
        STATE.activeWorldId = STATE.worlds[0].id;
    }
    if (!STATE.activeZone && STATE.zones.length > 0) {
        STATE.activeZone = STATE.zones[0];
        if (typeof loadSavedTrainerAvatar === "function") loadSavedTrainerAvatar();
        const openAvatars = window.location.search.includes("openavatars=1");
        const openHub = window.location.search.includes("openhub=1");
        if (openHub || openAvatars) {
            enterCentralHubMap(true, openAvatars ? "avatars" : null);
        } else {
            buildRespawnMapAndMonsters();
        }
    }
    loadSettings();
    loadAutoFarmPreferences();
    populateAutoBallSelect();
    syncAutoFarmUi();
    initChatSystem();
    populateAdminFields();
    initOfflineFarmSystem(data);

    // Sync Version Number Tracking across the UI
    const verBadge = document.getElementById("hud-version-badge");
    if (verBadge) verBadge.textContent = CURRENT_PROJECT_VERSION;
    const curVerSpan = document.getElementById("updatelog-current-ver");
    if (curVerSpan) curVerSpan.textContent = CURRENT_PROJECT_VERSION;
    document.querySelectorAll(".ver-tag-text").forEach(el => el.textContent = CURRENT_PROJECT_VERSION);

    // Automatically display Update Log floating text box when a player enters the game
    const lastSeenVer = localStorage.getItem("pokeland_seen_update_version");
    const showByQuery = window.location.search.includes("show_updatelog=1");
    const isCleanHunt = window.location.search.includes("clean_hunt=1");
    if (!isCleanHunt && (showByQuery || lastSeenVer !== CURRENT_PROJECT_VERSION)) {
        setTimeout(() => {
            openUpdateLogModal(CURRENT_PROJECT_VERSION);
        }, 550);
    } else if (showByQuery) {
        setTimeout(() => {
            openUpdateLogModal(CURRENT_PROJECT_VERSION);
        }, 550);
    }

    if (window.location.search.includes("open_pokemon_card=1")) {
        setTimeout(() => {
            switchTab("hunt");
            const mon = (STATE.player && STATE.player.party[0]) || null;
            if (mon && typeof showPokemonHoverCard === "function") {
                showPokemonHoverCard(mon, { clientX: 420, clientY: 70 });
            }
        }, 300);
    }
    if (window.location.search.includes("open_desafio=")) {
        const match = window.location.search.match(/open_desafio=([a-zA-Z0-9_-]+)/);
        const dType = match ? match[1] : "gyms";
        setTimeout(() => {
            if (dType === "gyms") {
                enterChallengeArena("gyms", {
                    skipAnimation: true,
                    gymId: "pewter",
                    gymTitle: "GINÁSIO DE PEWTER",
                    gymSub: "Líder: Brock (Pedra) - Boulder Badge Oficial",
                    gymBiome: "rock",
                    leaderSprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/brock.png",
                    bossSpecies: "onix",
                    bossName: "Líder Brock's Onix",
                    minLv: 25
                });
            } else if (dType === "gvg") {
                enterChallengeArena("gvg", {
                    skipAnimation: true,
                    territoryId: "silph",
                    territoryName: "Silph Co. HQ (Saffron)",
                    rivalGuild: "Team Rocket Syndicate",
                    bossSpecies: "dragonite",
                    bossName: "Guardião Rocket - Dragonite",
                    bossLevel: 85
                });
            } else {
                enterChallengeArena(dType, { skipAnimation: true });
            }
        }, 450);
    }

    if (window.location.search.includes("open_offline=1")) {
        setTimeout(() => {
            switchTab("offline");
        }, 400);
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("show_update") === "1") {
        setTimeout(() => {
            showFloatingUpdateAnnouncement();
        }, 500);
    }
    if (urlParams.get("min_topbar") === "1") {
        setTimeout(() => {
            const bar = document.getElementById("top-menubar-hud");
            if (bar && !bar.classList.contains("is-minimized")) toggleTopbarMinimize();
        }, 300);
    }
    const targetTab = urlParams.get("tab");
    if (targetTab) {
        setTimeout(() => {
            switchTab(targetTab);
            const shopSub = urlParams.get("shop_sub");
            if (shopSub && typeof switchShopSubmenu === "function") switchShopSubmenu(shopSub);
            const bagSub = urlParams.get("bag_sub");
            if (bagSub && typeof switchBagSubmenu === "function") switchBagSubmenu(bagSub);
            const pcSub = urlParams.get("pc_sub");
            if (pcSub && typeof switchPcBoxSubmenu === "function") switchPcBoxSubmenu(pcSub);
        }, 350);
    }
    if (window.location.search.includes("sim_offline=")) {
        const match = window.location.search.match(/sim_offline=([0-9.]+)/);
        const hours = match ? parseFloat(match[1]) : 4.0;
        setTimeout(() => {
            triggerOfflineSimulation(hours);
        }, 500);
    }
    if (window.location.search.includes("open_autofarm_survival=1")) {
        setTimeout(() => {
            toggleAutoFarmMenu();
            switchAutoFarmSubmenu("survival");
        }, 500);
    }
    if (window.location.search.includes("open_autofarm_autosell=1")) {
        setTimeout(() => {
            toggleAutoFarmMenu();
            switchAutoFarmSubmenu("autosell");
        }, 500);
    }
    if (window.location.search.includes("open_autofarm_offline=1")) {
        setTimeout(() => {
            toggleAutoFarmMenu();
            switchAutoFarmSubmenu("offline");
        }, 500);
    }
    if (window.location.search.includes("show_transit_demo=1")) {
        setTimeout(() => {
            enterCentralHubMap(true);
        }, 500);
    }
    if (window.location.search.includes("activate_all_autofarm=1")) {
        setTimeout(() => {
            setAllAutoFarm(true);
        }, 200);
    }
    if (window.location.search.includes("open_autofarm=1")) {
        setTimeout(() => {
            toggleAutoFarmMenu();
        }, 400);
    }
    if (window.location.search.includes("open_rarity_upgrade=1")) {
        setTimeout(() => {
            if (typeof openRarityUpgradeModal === "function") {
                openRarityUpgradeModal();
            }
        }, 600);
    }
    if (window.location.search.includes("test_chat_bubble=1")) {
        setTimeout(() => {
            if (typeof minimizeChatStream === "function") {
                minimizeChatStream();
                addChatMessage("global", "Red", "Olá treinadores, alguém quer trocar?");
                addChatMessage("trade", "Blue", "Compro Ultra Balls em grande quantidade!");
                addChatMessage("local", "Oak", "Parabéns pelo aprimoramento de raridade!");
            }
        }, 500);
    }
    if (window.location.search.includes("test_hover_card=1")) {
        setTimeout(() => {
            const mon = (STATE.player?.party && STATE.player.party[0]) || {
                name: "Charizard",
                species_id: "charizard",
                dex_id: 6,
                level: 50,
                quality: "Épico",
                quality_multiplier: 1.48,
                elements: ["fire", "flying"],
                nature: "Adamant",
                gender: "M",
                hp: 180,
                max_hp: 180,
                stats: { hp: 180, atk: 165, def: 120, spa: 140, spd: 115, spe: 155 },
                ivs: { hp: 28, atk: 31, def: 26, spa: 27, spd: 25, spe: 29 },
                iv_total: 166
            };
            const cardEl = document.getElementById("pokemon-hover-card");
            if (cardEl && typeof showPokemonHoverCard === "function") {
                showPokemonHoverCard(mon, { clientX: 200, clientY: 100 });
                cardEl.style.left = "420px";
                cardEl.style.top = "120px";
                cardEl.style.display = "block";
                cardEl.classList.remove("is-hidden");
            }
        }, 600);
    }
    if (window.location.search.includes("hud_showcase=1")) {
        setTimeout(() => {
            switchTab("hunt");
        }, 400);
    }
    if (window.location.search.includes("open_status_badges=1")) {
        setTimeout(() => {
            switchTab("status");
            if (typeof switchStatusSubmenu === "function") switchStatusSubmenu("badges");
        }, 350);
    } else if (window.location.search.includes("open_status_team=1")) {
        setTimeout(() => {
            switchTab("status");
            if (typeof switchStatusSubmenu === "function") switchStatusSubmenu("team");
        }, 350);
    } else if (window.location.search.includes("open_status=1")) {
        setTimeout(() => {
            switchTab("status");
            if (typeof switchStatusSubmenu === "function") switchStatusSubmenu("trainer");
        }, 350);
    }
    if (window.location.search.includes("open_bag_pokemon=1")) {
        setTimeout(() => {
            switchTab("bag");
            if (typeof switchBagSubmenu === "function") switchBagSubmenu("pokemon");
        }, 350);
    }
    if (window.location.search.includes("open_pcbox=1")) {
        setTimeout(() => { switchTab("party"); }, 350);
    }
    if (window.location.search.includes("open_mechanics=1") || window.location.search.includes("open_gvg=1")) {
        setTimeout(() => {
            switchTab("mechanics");
            if (typeof switchMechanicsSubmenu === "function") switchMechanicsSubmenu("gvg");
        }, 350);
    }
    if (window.location.search.includes("open_pvp=1")) {
        setTimeout(() => {
            switchTab("mechanics");
            if (typeof switchMechanicsSubmenu === "function") switchMechanicsSubmenu("pvp");
        }, 350);
    }
    if (window.location.search.includes("open_bag=1")) {
        setTimeout(() => { switchTab("bag"); }, 350);
    }
    if (window.location.search.includes("open_pokedex=1")) {
        setTimeout(() => { switchTab("pokedex"); }, 350);
    }
    if (window.location.search.includes("open_shop=1")) {
        setTimeout(() => { switchTab("shop"); }, 350);
    }
    if (window.location.search.includes("open_sell_pokemon=1")) {
        setTimeout(() => {
            switchTab("shop");
            if (typeof switchShopSubmenu === "function") switchShopSubmenu("sell_pokemon");
        }, 450);
    }
    if (window.location.search.includes("demo_broadcast=1")) {
        setTimeout(() => {
            triggerGlobalGoldenBroadcast(
                "👑 DROP MÍTICO ABSOLUTO (0.02%)!",
                "O Treinador <strong>Red</strong> realizou uma proeza milagrosa e capturou um <strong>Rayquaza MÍTICO</strong>! (1 em 5.000 capturas)",
                "crown",
                "mythic"
            );
        }, 500);
    }
    if (window.location.search.includes("open_cashshop=1")) {
        setTimeout(() => { switchTab("cashshop"); }, 350);
    }
    if (window.location.search.includes("open_market_sell=1")) {
        setTimeout(() => {
            switchTab("market");
            if (typeof switchMarketSubmenu === "function") switchMarketSubmenu("sell");
        }, 450);
    }
    if (window.location.search.includes("open_market=1")) {
        setTimeout(() => { switchTab("market"); }, 350);
    }
    if (window.location.search.includes("open_market_admin=1")) {
        setTimeout(() => {
            STATE.user = { id: 3, username: "Admin", role: "admin", is_admin: true };
            if (typeof syncMarketAdminVisibility === "function") syncMarketAdminVisibility();
            switchTab("market");
            if (typeof switchMarketSubmenu === "function") switchMarketSubmenu("admin");
        }, 450);
    }
    if (window.location.search.includes("open_admin_feedbacks=1")) {
        setTimeout(() => {
            switchTab("admin");
            if (typeof switchAdminSubmenu === "function") switchAdminSubmenu("feedbacks");
        }, 400);
    }
    if (window.location.search.includes("open_admin_users=1")) {
        setTimeout(() => {
            switchTab("admin");
            if (typeof switchAdminSubmenu === "function") switchAdminSubmenu("users");
        }, 400);
    }
    if (window.location.search.includes("open_admin=1")) {
        setTimeout(() => {
            switchTab("admin");
        }, 400);
    }
    if (window.location.search.includes("open_settings=1")) {
        setTimeout(() => {
            openSettingsModal();
        }, 300);
    }
    if (window.location.search.includes("demo_chat=1")) {
        setTimeout(() => {
            addChatMessage("global", "AshKetchum", "Alguém querendo trocar um Charizard Shiny por um Mewtwo?");
            addChatMessage("trade", "Misty", "[WTS] Water Stone x5 por $4.000 ou troco por Starmie!");
            addChatMessage("guild", "Brock", "Treinadores da Guilda Pewter: Boss Raids começam às 21h!");
            addChatMessage("local", "Red", "Partiu caçar na Safari Zone!");
            addChatMessage("whisper", "Blue", "Ei Red, te vejo na Arena de Batalha da Cidade Central!", "Red");
            renderChatMessages();
        }, 300);
    }
    if (window.location.search.includes("demo_vfx=1")) {
        setTimeout(() => {
            const tr = STATE.tibia.trainer;
            spawnSpellVfx("electric", tr.gx, tr.gy, tr.gx + 2, tr.gy - 1, { name: "Thunderbolt" }, false);
            spawnSpellVfx("fire", tr.gx, tr.gy, tr.gx - 2, tr.gy + 1, { name: "Fire Blast" }, true);
            spawnSpellVfx("water", tr.gx, tr.gy, tr.gx + 1, tr.gy + 2, { name: "Hydro Pump" }, false);
        }, 400);
    }
}

// Optimized State Sync with Debouncing & Unload Beacon
let _saveDebounceTimer = null;
let _hasPendingSave = false;

function scheduleStateSave(delayMs = 1200) {
    _hasPendingSave = true;
    if (_saveDebounceTimer) clearTimeout(_saveDebounceTimer);
    _saveDebounceTimer = setTimeout(() => {
        _saveDebounceTimer = null;
        if (_hasPendingSave) syncStateToServer();
    }, delayMs);
}

async function syncStateToServer(immediate = false) {
    if (!immediate && _saveDebounceTimer) {
        return;
    }
    if (_saveDebounceTimer) {
        clearTimeout(_saveDebounceTimer);
        _saveDebounceTimer = null;
    }
    _hasPendingSave = false;
    const headers = getAuthHeaders();
    try {
        await fetch("/api/save", {
            method: "POST",
            headers,
            body: JSON.stringify({ player: STATE.player, config: STATE.config }),
        });
    } catch (e) {
        console.warn("[PokéLand] Save deferred:", e);
    }
}

// Flush pending save on tab close or backgrounding
window.addEventListener("beforeunload", () => {
    if (_hasPendingSave && STATE.player) {
        const token = localStorage.getItem("pokepixel_auth_token");
        const payload = JSON.stringify({ player: STATE.player, config: STATE.config });
        if (navigator.sendBeacon) {
            const blob = new Blob([payload], { type: "application/json" });
            navigator.sendBeacon(`/api/save${token ? "?token=" + encodeURIComponent(token) : ""}`, blob);
        }
    }
});

function switchTab(tabName) {
    const targetPane = document.getElementById(`tab-${tabName}`);
    const targetBtn = document.getElementById(`tabbtn-${tabName}`);

    // If clicking an already-open modal tab (pokedex, party, shop, admin), toggle it closed back to fullscreen map
    if (tabName !== "hunt" && targetPane && targetPane.classList.contains("active")) {
        tabName = "hunt";
    }

    // Close all modal panes while keeping #tab-hunt active as the fullscreen HUD layer
    document.querySelectorAll(".floating-modal-pane").forEach((el) => el.classList.remove("active"));
    document.querySelectorAll(".menubar-section-modals .nav-btn").forEach((el) => el.classList.remove("active"));

    const huntPane = document.getElementById("tab-hunt");
    if (huntPane) huntPane.classList.add("active");

    if (tabName === "hunt") {
        document.getElementById("tabbtn-hunt")?.classList.add("active");
    } else {
        targetPane?.classList.add("active");
        targetBtn?.classList.add("active");
    }
    if (tabName === "mechanics" && typeof renderMechanicsModal === "function") {
        renderMechanicsModal(typeof CURRENT_MECHANICS_SUB !== "undefined" ? CURRENT_MECHANICS_SUB : "gvg");
    }
    if (tabName === "status" && typeof renderTrainerStatusModal === "function") {
        renderTrainerStatusModal(typeof CURRENT_STATUS_SUB !== "undefined" ? CURRENT_STATUS_SUB : "trainer");
    }
    if (tabName === "bag" && typeof renderBagModal === "function") renderBagModal();
    if (tabName === "shop" && typeof renderGoldShop === "function") renderGoldShop();
    if (tabName === "cashshop" && typeof renderCashShop === "function") renderCashShop();
    if (tabName === "admin") { refreshAdminBadges(); }
    if (tabName === "market") {
        if (typeof switchMarketSubmenu === "function") switchMarketSubmenu(typeof CURRENT_MARKET_SUB !== "undefined" ? CURRENT_MARKET_SUB : "browse");
        if (typeof syncMarketAdminVisibility === "function") syncMarketAdminVisibility();
    }
    renderAll();
}

function toggleFloatingMenu(panelId, btnId) {
    const panel = document.getElementById(panelId);
    const btn = btnId ? document.getElementById(btnId) : null;
    if (!panel) return;

    // If toggling Radar from the top bar button, toggle all 3 right-side windows (Radar, Selvagens, Corpos)
    if (panelId === "float-panel-radar" && btnId === "menubtn-radar") {
        const rightIds = ["float-panel-radar", "float-panel-targets", "float-panel-corpses"];
        const anyOpen = rightIds.some((id) => {
            const el = document.getElementById(id);
            return el && !el.classList.contains("is-hidden");
        });
        rightIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.classList.toggle("is-hidden", anyOpen);
            el.classList.remove("is-collapsed");
        });
        if (btn) btn.classList.toggle("active", !anyOpen);
        return;
    }

    // If opening a top dropdown menu (atlas or autofarm/automation), close the other top dropdown so they don't overlap
    const willOpen = panel.classList.contains("is-hidden");
    const isTopDropdown = panelId === "float-panel-atlas" || panelId === "float-panel-autofarm" || panelId === "float-panel-automation";
    if (willOpen && isTopDropdown) {
        const topPanels = [
            { id: "float-panel-atlas", btn: "menubtn-atlas" },
            { id: "float-panel-autofarm", btn: "menubtn-autofarm" },
            { id: "float-panel-automation", btn: "menubtn-autofarm" },
        ];
        topPanels.forEach((p) => {
            if (p.id !== panelId) {
                document.getElementById(p.id)?.classList.add("is-hidden");
                if (p.btn) document.getElementById(p.btn)?.classList.remove("active");
            }
        });
    }

    panel.classList.toggle("is-hidden");
    panel.classList.remove("is-collapsed");
    if (btn) {
        btn.classList.toggle("active", !panel.classList.contains("is-hidden"));
    }
}

function collapseFloatingPanel(panelId) {
    if (panelId === "floating-chat-stream") {
        minimizeChatStream();
        return;
    }
    const panel = document.getElementById(panelId);
    if (!panel) return;
    panel.classList.toggle("is-collapsed");
}

function minimizeChatStream() {
    const chatPanel = document.getElementById("floating-chat-stream");
    const chatBubble = document.getElementById("floating-chat-bubble");
    if (!chatPanel) return;
    STATE.chat = STATE.chat || {};
    STATE.chat.isMinimized = true;
    chatPanel.classList.add("is-chat-minimized");
    if (chatBubble) {
        chatBubble.classList.remove("is-hidden");
        updateChatBubbleUnread();
    }
}

function expandChatFromBubble() {
    const chatPanel = document.getElementById("floating-chat-stream");
    const chatBubble = document.getElementById("floating-chat-bubble");
    if (!chatPanel) return;
    STATE.chat = STATE.chat || {};
    STATE.chat.isMinimized = false;
    STATE.chat.minimizedUnreadCount = 0;
    chatPanel.classList.remove("is-chat-minimized");
    if (chatBubble) {
        chatBubble.classList.add("is-hidden");
        updateChatBubbleUnread();
    }
    const msgsContainer = document.getElementById("chat-messages-container");
    if (msgsContainer) msgsContainer.scrollTop = msgsContainer.scrollHeight;
}

function updateChatBubbleUnread() {
    const badge = document.getElementById("chat-bubble-unread");
    if (!badge) return;
    const count = STATE.chat?.minimizedUnreadCount || 0;
    if (count > 0) {
        badge.style.display = "flex";
        badge.textContent = count > 99 ? "99+" : String(count);
    } else {
        badge.style.display = "none";
        badge.textContent = "0";
    }
}

function toggleCleanScreenHud() {
    const mainPanels = [
        { id: "float-panel-player", btn: "menubtn-trainer" },
        { id: "float-panel-pokebar", btn: "menubtn-pokebar" },
        { id: "float-panel-actionbar", btn: "menubtn-actionbar" },
        { id: "dock-pokemon-moves", btn: null },
        { id: "float-panel-atlas", btn: "menubtn-atlas" },
        { id: "float-panel-autofarm", btn: "menubtn-autofarm" },
        { id: "float-panel-automation", btn: "menubtn-autofarm" },
    ];
    const anyVisible = mainPanels.some((p) => {
        const el = document.getElementById(p.id);
        return el && !el.classList.contains("is-hidden");
    });

    if (anyVisible) {
        mainPanels.forEach((p) => {
            document.getElementById(p.id)?.classList.add("is-hidden");
            if (p.btn) document.getElementById(p.btn)?.classList.remove("active");
        });
        document.getElementById("btn-cinema-hud")?.classList.add("active");
        showToast("👁️ Modo Cinema Ativado: Tela 100% livre! Clique nos botões do topo para abrir menus.");
    } else {
        ["float-panel-player", "float-panel-pokebar", "float-panel-actionbar", "dock-pokemon-moves"].forEach((id) => {
            document.getElementById(id)?.classList.remove("is-hidden");
        });
        ["menubtn-trainer", "menubtn-pokebar", "menubtn-actionbar"].forEach((btnId) => {
            document.getElementById(btnId)?.classList.add("active");
        });
        document.getElementById("btn-cinema-hud")?.classList.remove("active");
        showToast("👁️ Painéis Flutuantes Restaurados!");
    }
}

function changeHuntAnimSpeed(val) {
    const num = parseFloat(val);
    STATE.tibia.animSpeedFactor = !isNaN(num) && num > 0 ? num : 0.25;
    if (STATE.autoHuntEnabled) {
        updateAutoHuntSpeed();
    }
    const pct = Math.round(STATE.tibia.animSpeedFactor * 100);
    showToast(`🎞️ Velocidade da animação da Hunt ajustada para ${pct}%!`);
}

// ====================================================
// AUTO-MOVES SWITCH ENGINE (ALL GAME CONTENTS)
// ====================================================
const AUTOMOVES_STORAGE_KEY = "pokepixel_automoves_v1";

function loadAutoMovesState() {
    try {
        const raw = localStorage.getItem(AUTOMOVES_STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (typeof parsed.enabled === "boolean") {
            STATE.autoMovesEnabled = parsed.enabled;
        }
        if (Array.isArray(parsed.slots) && parsed.slots.length === 4) {
            STATE.autoMoveSlots = parsed.slots.map((x) => !!x);
        }
    } catch (e) {
        // Ignore
    }
    syncAutoMovesUi();
}

function saveAutoMovesState() {
    try {
        localStorage.setItem(
            AUTOMOVES_STORAGE_KEY,
            JSON.stringify({
                enabled: STATE.autoMovesEnabled,
                slots: STATE.autoMoveSlots,
            })
        );
    } catch (e) {
        // Ignore
    }
}

function syncAutoMovesUi() {
    const isOn = !!STATE.autoMovesEnabled;
    const topBtn = document.getElementById("btn-automoves-top");
    const topLbl = document.getElementById("lbl-automoves-top");
    if (topBtn) topBtn.classList.toggle("is-on", isOn);
    if (topLbl) topLbl.textContent = `⚡ Auto-Ataque: ${isOn ? "ON" : "OFF"}`;

    const dockBtn = document.getElementById("btn-automoves-dock");
    const dockLbl = document.getElementById("lbl-automoves-dock");
    if (dockBtn) dockBtn.classList.toggle("is-on", isOn);
    if (dockLbl) dockLbl.textContent = `⚡ Auto-Ataque: ${isOn ? "ON" : "OFF"}`;
}

function toggleAutoMoves(forceVal) {
    if (typeof forceVal === "boolean") {
        STATE.autoMovesEnabled = forceVal;
    } else {
        STATE.autoMovesEnabled = !STATE.autoMovesEnabled;
    }
    if (!STATE.autoMovesEnabled) {
        STATE.activeCastingMoveIdx = -1;
    }
    saveAutoMovesState();
    syncAutoMovesUi();
    if (typeof syncAutoFarmUi === "function") syncAutoFarmUi();
    if (typeof saveAutoFarmPreferences === "function") saveAutoFarmPreferences();
    renderBattleArena();
    if (STATE.autoMovesEnabled) {
        showToast("⚡ Auto-Ataque ATIVADO: Habilidades usadas automaticamente!");
    } else {
        showToast("⏸️ Auto-Ataque PAUSADO: Use 1–4 para atacar manualmente.");
    }
}

function toggleSingleMoveAuto(slotIdx, ev) {
    if (ev) ev.stopPropagation();
    STATE.autoMoveSlots[slotIdx] = !STATE.autoMoveSlots[slotIdx];
    saveAutoMovesState();
    if (typeof syncAutoFarmUi === "function") syncAutoFarmUi();
    renderBattleArena();
    const stateTxt = STATE.autoMoveSlots[slotIdx] ? "incluída no Auto-Ataque" : "pausada (Manual)";
    showToast(`⚔️ Habilidade ${slotIdx + 1} ${stateTxt}!`);
}

function executeNextAutoMove() {
    if (!STATE.autoMovesEnabled) return;
    const lead = getLeadPokemon();
    if (!lead) return;

    const tb = STATE.tibia;
    const tr = tb.trainer;
    if (tb.monsters.length === 0) return;

    const MAX_COMBAT_DIST = 2.2;
    // Only attack wild monsters that are STRICTLY NEAR THE TRAINER (within 2.2 SQMs)
    let targetMon = tb.monsters.find((m) => m.uid === tb.targetId && m.hp > 0 && Math.hypot(tr.gx - m.gx, tr.gy - m.gy) <= MAX_COMBAT_DIST);
    if (!targetMon) {
        let best = null;
        let bestDist = Infinity;
        for (const m of tb.monsters) {
            if (m.hp <= 0) continue;
            const d = Math.hypot(tr.gx - m.gx, tr.gy - m.gy);
            if (d <= MAX_COMBAT_DIST && d < bestDist) {
                bestDist = d;
                best = m;
            }
        }
        if (best) {
            tb.targetId = best.uid;
            STATE.wildEnemy = best;
            targetMon = best;
        }
    }
    // If no monster is near the trainer, companion stands guard at trainer's side. DO NOT ATTACK!
    if (!targetMon) return;

    const moves = (lead.moves && lead.moves.length > 0 ? lead.moves : ["tackle"]).slice(0, 4);
    const enabledIndices = [];
    for (let i = 0; i < moves.length; i++) {
        if (STATE.autoMoveSlots[i] !== false) enabledIndices.push(i);
    }
    if (enabledIndices.length === 0) return;

    const pickIdx = enabledIndices[STATE.autoMoveCursor % enabledIndices.length];
    STATE.autoMoveCursor = (STATE.autoMoveCursor + 1) % enabledIndices.length;
    const moveId = moves[pickIdx];

    STATE.activeCastingMoveIdx = pickIdx;
    executeCombatTurn(moveId, false, pickIdx);
}

// ====================================================
// DRAGGABLE / MOVABLE HUD BARS ENGINE
// ====================================================
const HUD_LAYOUT_STORAGE_KEY = "pokepixel_hud_positions_v2";

window._isHudEditingMode = false;

function toggleHudEditMode(forceState = null) {
    const nextState = forceState !== null ? forceState : !window._isHudEditingMode;
    window._isHudEditingMode = nextState;
    document.body.classList.toggle("is-hud-editing-mode", nextState);
    
    const banner = document.getElementById("hud-edit-mode-banner");
    if (banner) {
        banner.classList.toggle("is-hidden", !nextState);
    }
    const btn = document.getElementById("btn-toggle-hud-edit");
    if (btn) {
        btn.classList.toggle("active", nextState);
    }
    
    if (typeof initTopbarDragAndDrop === "function") {
        initTopbarDragAndDrop();
    }

    if (nextState) {
        showToast("📐 Modo de Edição de HUD ATIVADO! Arraste qualquer barra, dock de golpes, botão ou janela livremente.");
        if (typeof spawnFloatingText === "function" && STATE.tibia?.trainer) {
            spawnFloatingText(STATE.tibia.trainer.gx, STATE.tibia.trainer.gy, "📐 Modo Edição HUD ON", "#38bdf8");
        }
    } else {
        showToast("📐 Modo de Edição de HUD Concluído!");
    }
}
window.toggleHudEditMode = toggleHudEditMode;

function savePlayerHudProfile() {
    const panels = [
        "dock-pokemon-moves",
        "dock-btn-restart-wrap",
        "top-menubar-hud",
        "topbar-nav-dock",
        "topbar-modals-dock",
        "float-panel-actionbar",
        "float-panel-player",
        "float-panel-pokebar",
        "floating-log-stream"
    ];
    const profile = {};
    panels.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.style.left && el.style.top) {
            profile[id] = {
                left: el.style.left,
                top: el.style.top,
                width: el.style.width || null,
                height: el.style.height || null,
                position: el.style.position || (id === "dock-btn-restart-wrap" || id === "dock-pokemon-moves" ? "fixed" : null),
                bottom: el.style.bottom || null,
                transform: el.style.transform || null
            };
        }
    });

    if (typeof getTopbarButtonsOrder === "function") {
        profile.topbar_order = getTopbarButtonsOrder();
        profile.topbar_btn_scale = STATE.player?.hud_profile?.topbar_btn_scale || parseFloat(localStorage.getItem('pokeland_topbar_btn_scale') || '1.0');
        profile.detached_buttons = STATE.player?.hud_profile?.detached_buttons || {};
        profile.hidden_buttons = STATE.player?.hud_profile?.hidden_buttons || [];
    }

    try {
        localStorage.setItem(HUD_LAYOUT_STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {}

    if (STATE.player) {
        STATE.player.hud_profile = profile;
        scheduleStateSave(600);
    }

    showToast("💾 Perfil de HUD salvo com sucesso no seu personagem!");
    if (typeof spawnFloatingText === "function" && STATE.tibia?.trainer) {
        spawnFloatingText(STATE.tibia.trainer.gx, STATE.tibia.trainer.gy, "💾 Perfil de HUD Salvo!", "#38bdf8");
    }
}
window.savePlayerHudProfile = savePlayerHudProfile;

function resetPlayerHudProfile() {
    try {
        localStorage.removeItem(HUD_LAYOUT_STORAGE_KEY);
    } catch (e) {}
    
    if (STATE.player) {
        STATE.player.hud_profile = null;
        scheduleStateSave(600);
    }

    if (typeof resetTopbarButtonsOrder === "function") {
        resetTopbarButtonsOrder();
    }

    document.querySelectorAll("[data-draggable-panel], .floating-log-stream, #top-menubar-hud, #dock-pokemon-moves, #dock-btn-restart-wrap, #topbar-nav-dock, #topbar-modals-dock, .nav-btn.is-detached-btn").forEach((el) => {
        el.style.position = "";
        el.style.left = "";
        el.style.top = "";
        el.style.right = "";
        el.style.bottom = "";
        el.style.transform = "";
        el.style.width = "";
        el.style.height = "";
        const win = el.querySelector(".poke-window, .floating-fight-dock, .floating-chat-log");
        if (win) win.style.height = "";
    });

    showToast("🔄 Posições de todas as barras, golpes e botões restauradas para o padrão de fábrica!");
    if (typeof spawnFloatingText === "function" && STATE.tibia?.trainer) {
        spawnFloatingText(STATE.tibia.trainer.gx, STATE.tibia.trainer.gy, "🔄 HUD Restaurado!", "#fde047");
    }
}
window.resetPlayerHudProfile = resetPlayerHudProfile;
window.resetHudPositions = resetPlayerHudProfile;

function loadSavedHudPositions() {
    try {
        if (window.location.search.includes("reset_topbar=1")) {
            localStorage.removeItem(HUD_LAYOUT_STORAGE_KEY);
        }
        let map = null;
        if (STATE.player && STATE.player.hud_profile && Object.keys(STATE.player.hud_profile).length > 0) {
            map = STATE.player.hud_profile;
        } else {
            const raw = localStorage.getItem(HUD_LAYOUT_STORAGE_KEY);
            if (raw) map = JSON.parse(raw);
        }

        if (!map) return;

        for (const [panelId, pos] of Object.entries(map)) {
            const el = document.getElementById(panelId);
            if (!el || !pos) continue;
            const left = Math.max(0, Math.min(window.innerWidth - 80, parseFloat(pos.left) || 0));
            const top = Math.max(0, Math.min(window.innerHeight - 36, parseFloat(pos.top) || 0));
            if (pos.width) el.style.width = pos.width;
            if (pos.height) {
                el.style.height = pos.height;
                const win = el.querySelector(".poke-window, .floating-fight-dock, .floating-chat-log");
                if (win) win.style.height = "100%";
            }
            if (pos.position) el.style.position = pos.position;
            else if (panelId === "dock-btn-restart-wrap" || panelId === "dock-pokemon-moves" || panelId === "topbar-nav-dock" || panelId === "topbar-modals-dock") {
                el.style.position = "fixed";
            }
            el.style.left = `${Math.round(left)}px`;
            el.style.top = `${Math.round(top)}px`;
            el.style.right = "auto";
            el.style.bottom = "auto";
            el.style.transform = "none";
        }
    } catch (e) {
        // Ignore storage errors
    }
}

function saveHudPanelPosition(panelId, left, top, width, height) {
    try {
        const checkEl = document.getElementById(panelId);
        if (checkEl && checkEl.classList.contains("is-detached-btn")) {
            if (typeof detachTopbarButton === "function") {
                detachTopbarButton(panelId, parseFloat(left) || 0, parseFloat(top) || 0);
                return;
            }
        }
        const raw = localStorage.getItem(HUD_LAYOUT_STORAGE_KEY);
        const map = raw ? JSON.parse(raw) : {};
        const prev = map[panelId] || {};
        map[panelId] = {
            left: left !== undefined && left !== null ? left : prev.left,
            top: top !== undefined && top !== null ? top : prev.top,
            width: width !== undefined && width !== null ? width : (prev.width || null),
            height: height !== undefined && height !== null ? height : (prev.height || null),
            position: panelId === "dock-btn-restart-wrap" || panelId === "dock-pokemon-moves" || panelId === "topbar-nav-dock" || panelId === "topbar-modals-dock" ? "fixed" : (prev.position || null)
        };
        localStorage.setItem(HUD_LAYOUT_STORAGE_KEY, JSON.stringify(map));
        if (STATE.player) {
            STATE.player.hud_profile = map;
            scheduleStateSave(1000);
        }
    } catch (e) {
        // Ignore storage errors
    }
}

function initDraggableHudBars() {
    loadAutoMovesState();
    loadSavedHudPositions();
    if (typeof applyTopbarButtonsLayout === "function") {
        applyTopbarButtonsLayout();
    }
    window._topHudZIndex = 430;
    let dragState = null;
    let resizeState = null;

    window.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;

        // 1. Check if user clicked on interactive resize handle (◢)
        const resizeHandle = e.target.closest("[data-resize-handle]");
        if (resizeHandle) {
            e.stopPropagation();
            e.preventDefault();
            const panelId = resizeHandle.getAttribute("data-resize-handle");
            const panel = document.getElementById(panelId) || resizeHandle.closest("[data-draggable-panel], .floating-log-stream, #top-menubar-hud");
            if (!panel) return;

            window._topHudZIndex = Math.min(650, (window._topHudZIndex || 430) + 1);
            panel.style.zIndex = String(panel.id === "top-menubar-hud" ? 620 : window._topHudZIndex);

            const rect = panel.getBoundingClientRect();
            panel.style.left = `${Math.round(rect.left)}px`;
            panel.style.top = `${Math.round(rect.top)}px`;
            panel.style.right = "auto";
            panel.style.bottom = "auto";
            panel.style.transform = "none";

            document.body.classList.add("is-resizing-bar");
            window._isResizingHud = true;
            resizeState = {
                panel,
                panelId: panel.id,
                startMouseX: e.clientX,
                startMouseY: e.clientY,
                startWidth: rect.width,
                startHeight: rect.height,
                minWidth: panel.id === "top-menubar-hud" ? 380 : panel.id === "float-panel-fight" ? 440 : 190,
                minHeight: panel.id === "top-menubar-hud" ? 38 : 70,
            };
            return;
        }

        // 2. Check if user clicked on drag header handle or a detached floating button
        const detachedBtn = e.target.closest(".nav-btn.is-detached-btn");
        const handle = e.target.closest("[data-drag-handle]") || detachedBtn;
        if (!handle) return;
        if (detachedBtn && e.target.closest(".dock-back-pip")) return;
        const isDragGrip = e.target.closest(".btn-drag-pip, .topbar-drag-grip, .bar-drag-handle, .moves-dock-drag-header") || detachedBtn;
        if (e.target.closest("button, select, input, textarea, a, .win-resize-handle") && !isDragGrip && !window._isHudEditingMode) return;

        const panelId = handle.getAttribute("data-drag-handle") || (detachedBtn ? detachedBtn.id : null);
        const panel = (panelId ? document.getElementById(panelId) : null) || handle.closest("[data-draggable-panel], .floating-log-stream, #top-menubar-hud, #dock-pokemon-moves, #dock-btn-restart-wrap, .nav-btn.is-detached-btn");
        if (!panel) return;

        if (panel.id === "dock-btn-restart-wrap" || panel.id === "topbar-nav-dock" || panel.id === "topbar-modals-dock" || panel.id === "dock-pokemon-moves") {
            panel.style.position = "fixed";
        }

        const rect = panel.getBoundingClientRect();
        let lockedWidth = panel.style.width || `${Math.round(rect.width)}px`;
        let lockedHeight = panel.style.height || `${Math.round(rect.height)}px`;
        if (panel.id === "top-menubar-hud") {
            panel.style.width = lockedWidth;
            panel.style.zIndex = "620";
        } else {
            window._topHudZIndex = Math.min(540, (window._topHudZIndex || 430) + 1);
            panel.style.zIndex = String(window._topHudZIndex);
        }

        panel.style.left = `${Math.round(rect.left)}px`;
        panel.style.top = `${Math.round(rect.top)}px`;
        panel.style.right = "auto";
        panel.style.bottom = "auto";
        panel.style.transform = "none";
        panel.classList.add("is-dragging-bar");

        dragState = {
            panel,
            panelId: panel.id,
            startMouseX: e.clientX,
            startMouseY: e.clientY,
            startLeft: rect.left,
            startTop: rect.top,
            lockedWidth,
            lockedHeight,
            movedDist: 0,
        };
    });

    window.addEventListener("pointermove", (e) => {
        // A. Resizing interaction
        if (resizeState) {
            const dx = e.clientX - resizeState.startMouseX;
            const dy = e.clientY - resizeState.startMouseY;
            const pRect = resizeState.panel.getBoundingClientRect();
            const maxW = window.innerWidth - pRect.left - 8;
            const maxH = window.innerHeight - pRect.top - 8;
            const newW = Math.max(resizeState.minWidth, Math.min(maxW, Math.round(resizeState.startWidth + dx)));
            const newH = Math.max(resizeState.minHeight, Math.min(maxH, Math.round(resizeState.startHeight + dy)));
            resizeState.panel.style.width = `${newW}px`;
            resizeState.panel.style.height = `${newH}px`;
            const innerWin = resizeState.panel.querySelector(".poke-window, .floating-fight-dock, .floating-chat-log");
            if (innerWin) innerWin.style.height = "100%";
            return;
        }

        // B. Moving interaction
        if (!dragState) return;
        const dx = e.clientX - dragState.startMouseX;
        const dy = e.clientY - dragState.startMouseY;
        dragState.movedDist = Math.hypot(dx, dy);
        if (dragState.movedDist >= 5) {
            window._hudJustDragged = true;
        }
        const maxLeft = Math.max(0, window.innerWidth - 70);
        const maxTop = Math.max(0, window.innerHeight - 34);
        const nextLeft = Math.max(0, Math.min(maxLeft, dragState.startLeft + dx));
        const nextTop = Math.max(0, Math.min(maxTop, dragState.startTop + dy));
        dragState.panel.style.left = `${Math.round(nextLeft)}px`;
        dragState.panel.style.top = `${Math.round(nextTop)}px`;
    });

    const endInteraction = () => {
        if (resizeState) {
            document.body.classList.remove("is-resizing-bar");
            window._isResizingHud = false;
            const { panel, panelId } = resizeState;
            saveHudPanelPosition(panelId, panel.style.left, panel.style.top, panel.style.width, panel.style.height);
            resizeState = null;
        }
        if (dragState) {
            const { panel, panelId, lockedWidth, lockedHeight, movedDist } = dragState;
            panel.classList.remove("is-dragging-bar");
            if (movedDist >= 3) {
                saveHudPanelPosition(panelId, panel.style.left, panel.style.top, panel.style.width || lockedWidth, panel.style.height || lockedHeight);
            }
            dragState = null;
            if (window._hudJustDragged) {
                setTimeout(() => {
                    window._hudJustDragged = false;
                }, 90);
            }
        }
    };

    window.addEventListener("pointerup", endInteraction);
    window.addEventListener("pointercancel", endInteraction);
}

function renderAll(force = false) {
    renderHud();
    renderActionBar();

    const isMechActive = Boolean(document.getElementById("tab-mechanics")?.classList.contains("active"));
    if (force || isMechActive) { if (typeof renderMechanicsModal === "function") renderMechanicsModal(); }

    renderTibiaPokebar();
    renderBattleArena();
    renderTibiaBattleAndCorpseLists();

    // High performance optimization: ONLY render heavy modal DOM elements if their tab is active or forced
    const isPokedexActive = Boolean(document.getElementById("tab-pokedex")?.classList.contains("active"));
    if (force || isPokedexActive) renderPokedex();

    const isPartyActive = Boolean(document.getElementById("tab-party")?.classList.contains("active"));
    if (force || isPartyActive) renderPartyAndBox();

    const isStatusActive = Boolean(document.getElementById("tab-status")?.classList.contains("active"));
    if (force || isStatusActive) { if (typeof renderTrainerStatusModal === "function") renderTrainerStatusModal(); }

    const isBagActive = Boolean(document.getElementById("tab-bag")?.classList.contains("active"));
    if (force || isBagActive) { if (typeof renderBagModal === "function") renderBagModal(); }

    const isShopActive = Boolean(document.getElementById("tab-shop")?.classList.contains("active"));
    if (force || isShopActive) { if (typeof renderGoldShop === "function") renderGoldShop(); }

    const isCashActive = Boolean(document.getElementById("tab-cashshop")?.classList.contains("active"));
    if (force || isCashActive) { if (typeof renderCashShop === "function") renderCashShop(); }

    const isMarketActive = Boolean(document.getElementById("tab-market")?.classList.contains("active"));
    if (force || isMarketActive) { if (typeof syncMarketAdminVisibility === "function") syncMarketAdminVisibility(); }

    const atlasPanel = document.getElementById("float-panel-atlas");
    const isAtlasActive = atlasPanel && !atlasPanel.classList.contains("is-hidden") && !atlasPanel.classList.contains("is-collapsed");
    if (force || isAtlasActive) {
        renderWorldsAndMap();
        renderZoneList();
    }

    if (force || STATE.tibia.isCentralHub) {
        renderCentralHubPanel();
    }
}

function renderHud() {
    const p = STATE.player;
    const c = STATE.config;
    const serverNameEl = document.getElementById("hud-server-name");
    if (serverNameEl) serverNameEl.textContent = "PokéLand";
    const ratesEl = document.getElementById("hud-rates-summary");
    if (ratesEl) {
        ratesEl.textContent = `Bônus: ${c.exp_mult}x EXP • ${c.gold_mult}x Gold • ${c.catch_rate_mult}x Captura • Shiny ${(c.shiny_chance * 100).toFixed(2)}%`;
    }

    const trNameEl = document.getElementById("hud-trainer-name");
    if (trNameEl) trNameEl.textContent = p.name || "Red";
    document.getElementById("hud-trainer-lvl").textContent = `Lv. ${p.level}`;

    const trAvatarImg = document.getElementById("hud-trainer-avatar-img");
    if (trAvatarImg && typeof getTrainerModelDataUrl === "function") {
        trAvatarImg.src = getTrainerModelDataUrl(getActiveTrainerModelId());
    }
    if (typeof populateTrainerAvatarSelect === "function") {
        populateTrainerAvatarSelect();
    }

    const expFillEl = document.getElementById("hud-trainer-exp-fill");
    if (expFillEl) {
        const expPct = p.exp_next ? Math.max(5, Math.min(100, (p.exp / p.exp_next) * 100)) : 45;
        expFillEl.style.width = `${expPct.toFixed(1)}%`;
    }

    const brandImg = document.getElementById("hud-brand-portrait");
    const lead = getLeadPokemon();
    if (brandImg && lead) {
        brandImg.src = getPmdPortraitUrl(lead.species_id || lead.dex_id);
        brandImg.onmouseenter = (e) => showPokemonHoverCard(lead, e);
        brandImg.onmousemove = (e) => positionPokemonHoverCard(e);
        brandImg.onmouseleave = () => hidePokemonHoverCard();
    }

    document.getElementById("hud-gold").textContent = `$${p.gold.toLocaleString()}`;
    document.getElementById("hud-diamonds").textContent = p.diamonds.toLocaleString();
    document.getElementById("hud-dex-count").textContent = `${p.pokedex_caught.length} / ${STATE.species.length}`;
    document.getElementById("hud-key-pill").style.display = p.has_master_key || c.unlock_legendary_islands ? "flex" : "none";
}

// ====================================================
// 1. TIBIA / POKÉTIBIA SQM MAP & RESPAWN ENGINE
// ====================================================
function getActiveBiomeStyle() {
    if (!STATE.activeZone) return "grass";
    if (STATE.activeZone.world === "legendary" || STATE.activeZone.world === "world5_4") return "legendary";
    const el = (STATE.activeZone.elements?.[0] || "grass").toLowerCase();
    if (["water"].includes(el)) return "water";
    if (["ice"].includes(el)) return "ice";
    if (["fire", "dragon"].includes(el)) return "fire";
    if (["rock", "ground", "fighting", "steel"].includes(el)) return "cave";
    if (["electric"].includes(el)) return "electric";
    if (["ghost", "psychic", "dark", "poison"].includes(el)) return "ghost";
    return "grass";
}

function getActiveZoneParallaxInfo(zone = STATE.activeZone) {
    if (!zone) {
        return { parallaxKey: "world-grass", url: "/img/parallaxes/world-grass.webp", entry: null };
    }
    const cols = STATE.mapColliders;
    const mid = String(zone.map_id || 0);
    if (cols && cols.by_map_id && cols.by_map_id[mid]) {
        const entry = cols.by_map_id[mid];
        return { parallaxKey: entry.parallax, url: `/img/parallaxes/${entry.parallax}.webp`, entry };
    }

    const encs = zone.encounters || [];
    const sid = (encs[0]?.species_id || zone.primary_species_id || "").toLowerCase().replace(/-/g, "");
    const el = (zone.elements?.[0] || "grass").toLowerCase();

    const candidates = [];
    if (sid) {
        candidates.push(`world-${sid}`, `world-hoenn-${sid}`);
    }
    if (zone.world === "hoenn") {
        candidates.push(`world-hoenn-${el}`);
    }
    if (el === "steel") {
        candidates.push("world-hoenn-steel");
    }
    candidates.push(`world-${el}`, "world-grass");

    for (const cand of candidates) {
        if (cols && cols.by_parallax && cols.by_parallax[cand]) {
            const entry = cols.by_parallax[cand];
            return { parallaxKey: cand, url: `/img/parallaxes/${cand}.webp`, entry };
        }
    }
    const fallbackKey = zone.world === "hoenn" ? `world-hoenn-${el}` : el === "steel" ? "world-hoenn-steel" : `world-${el}`;
    return { parallaxKey: fallbackKey, url: `/img/parallaxes/${fallbackKey}.webp`, entry: null };
}

function changeMapBgMode(newMode) {
    STATE.tibia.mapBgMode = newMode || "hd_ring";
    buildRespawnMapAndMonsters();
    renderAll();
    const labels = {
        hd_ring: "🗺️ Ilha HD Completa (Original PokePixel)",
        hd_zoom: "🔍 Câmera Scroll HD Próxima",
        pixel_tiles: "🧱 Tileset Pixel-Art Detalhado",
    };
    showToast(`🎨 Cenário alterado para: ${labels[STATE.tibia.mapBgMode] || newMode}`);
}

function isTileWalkable(gx, gy) {
    if (gx < 1 || gx >= GRID_COLS - 1 || gy < 1 || gy >= GRID_ROWS - 1) return false;
    const cell = STATE.tibia.mapMatrix[gy]?.[gx] ?? 1;
    return cell !== 1;
}

function findNearestWalkableTile(prefGx, prefGy, avoidPz = false) {
    const cx = Math.max(1, Math.min(GRID_COLS - 2, Math.round(prefGx)));
    const cy = Math.max(1, Math.min(GRID_ROWS - 2, Math.round(prefGy)));
    if (isTileWalkable(cx, cy) && (!avoidPz || STATE.tibia.mapMatrix[cy][cx] !== 2)) {
        return { gx: cx, gy: cy };
    }
    for (let rad = 1; rad < 16; rad++) {
        for (let dy = -rad; dy <= rad; dy++) {
            for (let dx = -rad; dx <= rad; dx++) {
                const nx = cx + dx;
                const ny = cy + dy;
                if (isTileWalkable(nx, ny) && (!avoidPz || STATE.tibia.mapMatrix[ny][nx] !== 2)) {
                    return { gx: nx, gy: ny };
                }
            }
        }
    }
    return { gx: 3, gy: 2 };
}

function buildRespawnMapAndMonsters() {
    const pxInfo = getActiveZoneParallaxInfo(STATE.activeZone);
    getCachedImage(pxInfo.url); // Preload high-detail parallax .webp immediately

    const matrix = [];
    const useColliderGrid = pxInfo.entry && Array.isArray(pxInfo.entry.grid16x11) && STATE.tibia.mapBgMode !== "pixel_tiles";

    if (useColliderGrid) {
        for (let r = 0; r < GRID_ROWS; r++) {
            const rowStr = pxInfo.entry.grid16x11[r] || "1111111111111111";
            const row = [];
            for (let c = 0; c < GRID_COLS; c++) {
                const ch = rowStr[c] || "1";
                row.push(ch === "1" ? 1 : ch === "3" ? 3 : 0);
            }
            matrix.push(row);
        }
    } else {
        // Scenic Island Ring Layout for Pixel-Art Tileset Mode
        for (let r = 0; r < GRID_ROWS; r++) {
            const row = [];
            for (let c = 0; c < GRID_COLS; c++) {
                if (r === 0 || r === GRID_ROWS - 1 || c === 0 || c === GRID_COLS - 1) {
                    row.push(1); // Border obstacle (Canopy Trees / Coral Cliffs / Lava)
                } else if (r >= 4 && r <= 6 && c >= 6 && c <= 9) {
                    row.push(1); // Central Sanctuary Monument / Lagoon / Caldera
                } else if ((r === 1 && (c === 1 || c === 14)) || (r === 9 && (c === 1 || c === 14))) {
                    row.push(1); // Rounded island corners
                } else if ((r + c) % 4 === 0) {
                    row.push(3); // Encounter Tall Grass / Biome Flora
                } else {
                    row.push(0); // Walkable Hunting Path
                }
            }
            matrix.push(row);
        }
    }

    STATE.tibia.mapMatrix = matrix;

    // Protection Zone (PZ) completamente removida das hunts
    STATE.tibia.pzOrigin = null;

    // Ensure Trainer & Summon sit cleanly on the walkable hunting path
    const trPos = findNearestWalkableTile(2, 5, false);
    STATE.tibia.trainer.gx = trPos.gx;
    STATE.tibia.trainer.gy = trPos.gy;
    STATE.tibia.trainer.targetGx = trPos.gx;
    STATE.tibia.trainer.targetGy = trPos.gy;
    STATE.tibia.trainer.px = trPos.gx * SQM_SIZE;
    STATE.tibia.trainer.py = trPos.gy * SQM_SIZE;

    const sumPos = findNearestWalkableTile(trPos.gx, trPos.gy - 1, true);
    STATE.tibia.summon.gx = sumPos.gx;
    STATE.tibia.summon.gy = sumPos.gy;
    STATE.tibia.summon.px = sumPos.gx * SQM_SIZE;
    STATE.tibia.summon.py = sumPos.gy * SQM_SIZE;

    STATE.tibia.monsters = [];
    STATE.tibia.corpses = [];
    STATE.tibia.targetId = null;

    // Spawn 6 simultaneous wild Pokémon across the hunting ring
    for (let i = 0; i < 6; i++) {
        spawnSingleMonsterOnMap(false);
    }

    // Place 1 fresh fainted corpse with loot on a walkable path SQM so player sees Corpse Catch & Loot immediately
    const sp0 = STATE.speciesById[STATE.activeZone?.primary_species_id] || STATE.species[0];
    if (sp0) {
        const cPos = findNearestWalkableTile(8, 1, true);
        STATE.tibia.corpses.push({
            uid: "corpse_init",
            species_id: sp0.id,
            dex_id: sp0.dex_id,
            name: sp0.name,
            level: STATE.activeZone?.min_level || 1,
            is_shiny: false,
            elements: sp0.elements || ["water"],
            base_capture_chance: sp0.base_capture_chance ?? 98.0,
            catch_rate: sp0.catch_rate ?? 255,
            gx: cPos.gx,
            gy: cPos.gy,
            lootItems: [
                { item_id: "gold_coin", name: "Gold Coins", qty: 24, sprite_url: getPixelBallSvgDataUri("capsule_ultra") },
            ],
            caught: false,
            createdAt: Date.now(),
        });
    }
    syncWildEnemyPointer();
}

function findFreeRespawnTile() {
    for (let tries = 0; tries < 80; tries++) {
        const gx = 1 + Math.floor(Math.random() * (GRID_COLS - 2));
        const gy = 1 + Math.floor(Math.random() * (GRID_ROWS - 2));
        if (!isTileWalkable(gx, gy)) continue;
        if (STATE.tibia.mapMatrix[gy][gx] === 2) continue; // Don't spawn inside PZ
        const occupied = STATE.tibia.monsters.some((m) => m.gx === gx && m.gy === gy);
        if (!occupied) return { gx, gy };
    }
    return findNearestWalkableTile(12, 5, true);
}

function spawnSingleMonsterOnMap(announceShiny = true) {
    if (STATE.tibia.activeChallenge) return null;
    const z = STATE.activeZone;
    if (!z) return null;
    const encs = z.encounters && z.encounters.length > 0 ? z.encounters : [{ species_id: "magikarp", min_level: 1, max_level: 1 }];
    const enc = encs[Math.floor(Math.random() * encs.length)];
    const sp = STATE.speciesById[enc.species_id] || STATE.species[0];
    const minLv = enc.min_level || z.min_level || 1;
    const maxLv = enc.max_level || z.max_level || minLv;
    const level = minLv + Math.floor(Math.random() * Math.max(1, maxLv - minLv + 1));
    const isShiny = Math.random() < (STATE.config.shiny_chance || 0.002);
    getPmdManifest(getPmdSlug(sp.id));

    const bs = sp.base_stats || { hp: 50, atk: 50, def: 50, spa: 50, spd: 50, spe: 50 };
    const maxHp = Math.max(20, Math.floor((2 * bs.hp * level) / 100 + level + 14));
    const pos = findFreeRespawnTile();

    const mon = {
        uid: "wild_" + Math.random().toString(36).substring(2, 9),
        species_id: sp.id,
        dex_id: sp.dex_id,
        name: sp.name,
        level: level,
        is_shiny: isShiny,
        elements: sp.elements || ["normal"],
        hp: maxHp,
        max_hp: maxHp,
        atk: Math.floor((2 * Math.max(bs.atk, bs.spa) * level) / 100 + 6),
        def: Math.floor((2 * Math.max(bs.def, bs.spd) * level) / 100 + 6),
        base_capture_chance: sp.base_capture_chance ?? 17.65,
        catch_rate: sp.catch_rate ?? 45,
        base_exp_yield: sp.base_exp_yield || 60,
        gold_yield: sp.gold_yield || 10,
        drops: sp.drops || [],
        gx: pos.gx,
        gy: pos.gy,
        px: pos.gx * SQM_SIZE,
        py: pos.gy * SQM_SIZE,
        dir: Math.floor(Math.random() * 4),
        stepCooldown: 20 + Math.floor(Math.random() * 35),
        atkCooldown: 35,
        animTick: Math.floor(Math.random() * 100),
        idleTimer: Math.floor(Math.random() * 60),
        attackTicks: 0,
        hitFlinchTicks: 0,
        idleHopTicks: 0,
        emoteTimer: 0,
        emote: null,
    };

    STATE.tibia.monsters.push(mon);

    if (isShiny && announceShiny) {
        STATE.player.stats.shinies_found = (STATE.player.stats.shinies_found || 0) + 1;
        addCombatLog(`<span style="color:#fbbf24;font-weight:900;">✨ UM ${sp.name.toUpperCase()} SHINY (Lv. ${level}) NASCEU NO RESPAWN [SQM ${pos.gx},${pos.gy}]!</span>`);
        showToast(`✨ SHINY ${sp.name} nasceu no Respawn!`);
    }
    return mon;
}

function forceSpawnWave() {
    if (STATE.tibia.activeChallenge) return;
    while (STATE.tibia.monsters.length < 8) {
        spawnSingleMonsterOnMap(true);
    }
    syncWildEnemyPointer();
    renderTibiaBattleAndCorpseLists();
    renderCapsuleDock();
}

function syncWildEnemyPointer() {
    if (STATE.tibia.activeChallenge) {
        const boss = STATE.tibia.monsters.find((m) => m.hp > 0);
        if (boss) {
            STATE.tibia.targetId = boss.uid;
            STATE.wildEnemy = boss;
        }
        return;
    }
    const tr = STATE.tibia.trainer;
    const MAX_TARGET_DIST = 2.2;

    // 1. If currently targeted monster is valid AND strictly within close range of trainer
    let targeted = STATE.tibia.monsters.find((m) => m.uid === STATE.tibia.targetId && m.hp > 0);
    if (targeted && Math.hypot(tr.gx - targeted.gx, tr.gy - targeted.gy) <= MAX_TARGET_DIST) {
        STATE.wildEnemy = targeted;
        return;
    }

    // 2. Otherwise find the closest monster that IS within close range of the trainer!
    let best = null;
    let bestDist = Infinity;
    for (const m of STATE.tibia.monsters) {
        if (m.hp <= 0) continue;
        const d = Math.hypot(tr.gx - m.gx, tr.gy - m.gy);
        if (d <= MAX_TARGET_DIST && d < bestDist) {
            bestDist = d;
            best = m;
        }
    }

    if (best) {
        STATE.wildEnemy = best;
        STATE.tibia.targetId = best.uid;
    } else {
        // If no monster is strictly near the trainer, clear target so companion stands at attention!
        STATE.wildEnemy = null;
    }
}

function initTibiaMapEngine() {
    const canvas = document.getElementById("tibia-game-canvas");
    if (!canvas) return;

    canvas.addEventListener("mousedown", (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = (GRID_COLS * SQM_SIZE) / rect.width;
        const scaleY = (GRID_ROWS * SQM_SIZE) / rect.height;
        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;
        const gx = Math.floor(clickX / SQM_SIZE);
        const gy = Math.floor(clickY / SQM_SIZE);

        // 0. If inside the Central Social Hub (Saffron Plaza), handle NPC, Station, & Online Player clicks!
        if (STATE.tibia.isCentralHub) {
            if (handleCentralHubTileClick(gx, gy)) return;
        }

        // 1. Check if player clicked on a Wild Pokémon on that SQM (Lock Red Target!)
        const clickedMon = STATE.tibia.monsters.find((m) => m.gx === gx && m.gy === gy);
        if (clickedMon) {
            setRedTarget(clickedMon.uid);
            return;
        }

        // 2. Check if player clicked on a Fainted Corpse on that SQM (Throw Selected Ball at Corpse!)
        const clickedCorpse = STATE.tibia.corpses.find((c) => c.gx === gx && c.gy === gy && !c.caught);
        if (clickedCorpse) {
            if (clickedCorpse.isCatching) {
                showToast(`⚠️ Já há uma Pokébola sendo usada em ${clickedCorpse.name}! Apenas 1 pokébola pode ser usada por vez.`);
                if (typeof spawnFloatingText === "function") spawnFloatingText(clickedCorpse.gx, clickedCorpse.gy, "⏳ 1 por vez!", "#facc15");
                return;
            }
            const ballId = document.getElementById("autocap-ball")?.value || "capsule_ultra";
            throwBallAtCorpse(clickedCorpse.uid, ballId);
            return;
        }

        // 3. Check if Order Mode is active (Move Summon to SQM)
        if (STATE.tibia.orderMoveMode && STATE.tibia.summonOut) {
            if (isTileWalkable(gx, gy)) {
                STATE.tibia.summon.gx = gx;
                STATE.tibia.summon.gy = gy;
                const lead = getLeadPokemon();
                setTrainerSpeech(`${lead ? lead.name : "Pokemon"}, move!`);
            }
            STATE.tibia.orderMoveMode = false;
            document.getElementById("btn-order-mode")?.classList.remove("active-toggle");
            return;
        }

        // 4. Otherwise walk Trainer to clicked SQM
        if (isTileWalkable(gx, gy)) {
            STATE.tibia.trainer.targetGx = gx;
            STATE.tibia.trainer.targetGy = gy;
        }
    });

    // Minimap click-to-walk
    const mini = document.getElementById("tibia-minimap-canvas");
    if (mini) {
        mini.addEventListener("click", (e) => {
            const rect = mini.getBoundingClientRect();
            const gx = Math.floor(((e.clientX - rect.left) / rect.width) * GRID_COLS);
            const gy = Math.floor(((e.clientY - rect.top) / rect.height) * GRID_ROWS);
            if (isTileWalkable(gx, gy)) {
                STATE.tibia.trainer.targetGx = gx;
                STATE.tibia.trainer.targetGy = gy;
            }
        });
    }

    // Keyboard Hotkeys: WASD/Arrows to walk, Space to target next monster, 1-4 to cast m1-m4
    // REGRA: Teclas de Função (F1 a F12) NÃO podem ser usadas como atalho de nenhuma configuração do jogo!
    window.addEventListener("keydown", (e) => {
        if (["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;

        // REGRA: Teclas de função (F1 a F12) são reservadas exclusivamente para o navegador (F5 reload, Ctrl+F5 hard refresh, F11 fullscreen, F12 devtools, etc.)
        // O jogo NUNCA as utiliza como atalho e NUNCA chama e.preventDefault() nelas, garantindo total funcionamento dos atalhos nativos do navegador.
        if (/^F([1-9]|1[0-2])$/.test(e.key)) {
            return;
        }

        if (e.key === 'Escape') {
            const sellModal = document.getElementById('modal-pokemart-sell');
            if (sellModal && sellModal.style.display !== 'none') {
                if (typeof closePokemartSellModal === 'function') closePokemartSellModal();
                return;
            }
        }

        const tr = STATE.tibia.trainer;
        if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
            e.preventDefault();
            if (isTileWalkable(tr.gx, tr.gy - 1)) { tr.targetGx = tr.gx; tr.targetGy = tr.gy - 1; }
        } else if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
            e.preventDefault();
            if (isTileWalkable(tr.gx, tr.gy + 1)) { tr.targetGx = tr.gx; tr.targetGy = tr.gy + 1; }
        } else if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
            e.preventDefault();
            if (isTileWalkable(tr.gx - 1, tr.gy)) { tr.targetGx = tr.gx - 1; tr.targetGy = tr.gy; }
        } else if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
            e.preventDefault();
            if (isTileWalkable(tr.gx + 1, tr.gy)) { tr.targetGx = tr.gx + 1; tr.targetGy = tr.gy; }
        } else if (e.key === " ") {
            e.preventDefault();
            cycleRedTarget();
        } else if (["1", "2", "3", "4"].includes(e.key) && !e.altKey && !e.ctrlKey) {
            const idx = parseInt(e.key, 10) - 1;
            const lead = getLeadPokemon();
            if (lead && lead.moves && lead.moves[idx]) {
                executeCombatTurn(lead.moves[idx]);
            }
        } else if (e.altKey && ["1", "2", "3", "4", "5", "6", "7", "8"].includes(e.key)) {
            e.preventDefault();
            const slotIdx = parseInt(e.key, 10) - 1;
            if (typeof useActionBarSlot === "function") useActionBarSlot(slotIdx);
        } else if (e.key === "c" || e.key === "C") {
            e.preventDefault();
            toggleTrainerProfile();
        } else if (e.key === "b" || e.key === "B") {
            e.preventDefault();
            switchTab("bag");
        } else if (e.key === "l" || e.key === "L") {
            e.preventDefault();
            switchTab("shop");
        } else if (e.key === "m" || e.key === "M") {
            e.preventDefault();
            switchTab("market");
        } else if (e.key === "f" || e.key === "F") {
            e.preventDefault();
            toggleAutoFarmMenu();
        } else if (e.key === "o" || e.key === "O") {
            e.preventDefault();
            switchTab("offline");
        } else if (e.key === "h" || e.key === "H") {
            e.preventDefault();
            enterOrToggleCentralHub();
        }
    });

    requestAnimationFrame(tibiaGameLoop);
}

function setRedTarget(monsterUid) {
    STATE.tibia.targetId = monsterUid;
    syncWildEnemyPointer();
    renderTibiaBattleAndCorpseLists();
    renderCapsuleDock();
}

function cycleRedTarget() {
    const mons = STATE.tibia.monsters;
    if (mons.length === 0) return;
    const curIdx = mons.findIndex((m) => m.uid === STATE.tibia.targetId);
    const next = mons[(curIdx + 1) % mons.length];
    setRedTarget(next.uid);
}

function toggleSummonOut() {
    STATE.tibia.summonOut = !STATE.tibia.summonOut;
    const lead = getLeadPokemon();
    if (STATE.tibia.summonOut && lead) {
        STATE.tibia.summon.gx = Math.min(GRID_COLS - 2, STATE.tibia.trainer.gx + 1);
        STATE.tibia.summon.gy = STATE.tibia.trainer.gy;
        STATE.tibia.summon.px = STATE.tibia.summon.gx * SQM_SIZE;
        STATE.tibia.summon.py = STATE.tibia.summon.gy * SQM_SIZE;
        setTrainerSpeech(`Go, ${lead.name}!`);
    } else if (lead) {
        setTrainerSpeech(`Thanks, ${lead.name}!`);
    }
}

function toggleOrderMode() {
    STATE.tibia.orderMoveMode = !STATE.tibia.orderMoveMode;
    const btn = document.getElementById("btn-order-mode");
    if (btn) btn.classList.toggle("active-toggle", STATE.tibia.orderMoveMode);
    if (STATE.tibia.orderMoveMode) {
        showToast("📍 Mover: Clique em qualquer ponto do mapa para mover seu Pokémon!");
    }
}

function toggleAutoLoot(forceVal) {
    if (typeof forceVal === "boolean") {
        STATE.tibia.autoLoot = forceVal;
    } else {
        STATE.tibia.autoLoot = !STATE.tibia.autoLoot;
    }
    const btn = document.getElementById("btn-autoloot");
    if (btn) {
        btn.textContent = `🎒 Auto-Coleta: ${STATE.tibia.autoLoot ? "ON" : "OFF"}`;
        btn.classList.toggle("active-toggle", STATE.tibia.autoLoot);
    }
    if (typeof syncAutoFarmUi === "function") syncAutoFarmUi();
    if (typeof saveAutoFarmPreferences === "function") saveAutoFarmPreferences();
    if (STATE.tibia.autoLoot) {
        showToast("🎒 Auto-Coleta ATIVADA: Drops e ouro coletados automaticamente!");
    } else {
        showToast("⚪ Auto-Coleta DESATIVADA.");
    }
}

// ====================================================
// TIBIA REAL-TIME SQM SIMULATION & RENDERING LOOP
// ====================================================
let _lastGameLoopTime = 0;

function tibiaGameLoop(timestamp) {
    const now = typeof timestamp === "number" ? timestamp : performance.now();
    if (!_lastGameLoopTime) _lastGameLoopTime = now;
    let dt = now - _lastGameLoopTime;
    _lastGameLoopTime = now;

    // Clamp dt between 8ms and 60ms to eliminate visual stuttering on frame hiccups or tab throttling
    if (dt > 80) dt = 16.667;
    const timeScale = Math.min(2.2, Math.max(0.45, dt / 16.667));

    updateTibiaSimulation(timeScale);
    drawTibiaMainCanvas();
    drawTibiaMinimap();
    requestAnimationFrame(tibiaGameLoop);
}

// Pre-allocated fast structures for zero-allocation BFS pathfinding
const _bfsVisited = new Uint8Array(GRID_COLS * GRID_ROWS);
const _bfsQueue = new Array(GRID_COLS * GRID_ROWS);

function stepEntityToward(ent, destGx, destGy) {
    const target = findNearestWalkableTile(destGx, destGy, false);
    if (ent.gx === target.gx && ent.gy === target.gy) return false;

    // Reset visited typed array (instant byte wipe)
    _bfsVisited.fill(0);
    _bfsVisited[ent.gx + ent.gy * GRID_COLS] = 1;

    let head = 0;
    let tail = 0;
    _bfsQueue[tail++] = { x: ent.gx, y: ent.gy, firstStep: null };

    const dirs = [
        [0, 1, 0],  // South
        [-1, 0, 1], // West
        [1, 0, 2],  // East
        [0, -1, 3], // North
    ];

    while (head < tail) {
        const cur = _bfsQueue[head++];
        if (cur.x === target.gx && cur.y === target.gy && cur.firstStep) {
            ent.gx = cur.firstStep.x;
            ent.gy = cur.firstStep.y;
            ent.dir = cur.firstStep.dir;
            return true;
        }
        for (let i = 0; i < 4; i++) {
            const [ox, oy, d] = dirs[i];
            const nx = cur.x + ox;
            const ny = cur.y + oy;
            if (nx >= 0 && nx < GRID_COLS && ny >= 0 && ny < GRID_ROWS) {
                const idx = nx + ny * GRID_COLS;
                if (!_bfsVisited[idx] && isTileWalkable(nx, ny)) {
                    _bfsVisited[idx] = 1;
                    _bfsQueue[tail++] = {
                        x: nx,
                        y: ny,
                        firstStep: cur.firstStep || { x: nx, y: ny, dir: d },
                    };
                }
            }
        }
    }

    // Fallback greedy step
    const dx = Math.sign(target.gx - ent.gx);
    const dy = Math.sign(target.gy - ent.gy);
    if (dx !== 0 && isTileWalkable(ent.gx + dx, ent.gy)) {
        ent.gx += dx;
        ent.dir = dx > 0 ? 2 : 1;
    } else if (dy !== 0 && isTileWalkable(ent.gx, ent.gy + dy)) {
        ent.gy += dy;
        ent.dir = dy > 0 ? 0 : 3;
    }
    return true;
}

function updateTibiaSimulation(timeScale = 1.0) {
    const tb = STATE.tibia;
    const baseSpd = tb.animSpeedFactor || 0.25; // Default 0.25 = 75% slower hunt animation!
    const spd = baseSpd * timeScale;
    tb.frame = (tb.frame || 0) + spd;
    tb.animTick = (tb.animTick || 0) + Math.max(1, Math.round(timeScale)); // Natural 60fps clock for sprite rendering
    tb.simAcc = (tb.simAcc || 0) + spd;

    let runSimStep = false;
    if (tb.simAcc >= 1.0) {
        tb.simAcc -= 1.0;
        tb.simStep = (tb.simStep || 0) + 1;
        runSimStep = true;
    }
    const sTick = tb.simStep || 1;

    // 1. Maintain Respawn Population (Keep up to 6 wild Pokémon on the map when in Hunting Mode)
    if (!tb.isCentralHub && !tb.activeChallenge && runSimStep && sTick % 110 === 0 && tb.monsters.length < 6) {
        spawnSingleMonsterOnMap(true);
        syncWildEnemyPointer();
        renderTibiaBattleAndCorpseLists();
    }

    // 2. Trainer SQM Movement & Smooth Pixel Interpolation (75% slower glide)
    const tr = tb.trainer;
    if (runSimStep && sTick % 10 === 0 && (tr.gx !== tr.targetGx || tr.gy !== tr.targetGy)) {
        stepEntityToward(tr, tr.targetGx, tr.targetGy);
        const coordsEl = document.getElementById("minimap-coords");
        if (coordsEl) coordsEl.textContent = `X: ${tr.gx}, Y: ${tr.gy}`;
        if (tb.isCentralHub && tr.gx === tr.targetGx && tr.gy === tr.targetGy) {
            checkCentralHubPadArrival(tr.gx, tr.gy);
        }
    }
    tr.px += (tr.gx * SQM_SIZE - tr.px) * (0.28 * spd);
    tr.py += (tr.gy * SQM_SIZE - tr.py) * (0.28 * spd);
    if (tr.speechTimer > 0) tr.speechTimer = Math.max(0, tr.speechTimer - spd);

    // 2b. If in Central Social Hub, update Online Trainers & their Follower Pokémon!
    if (tb.isCentralHub) {
        updateCentralHubSimulation(spd, runSimStep, sTick);
    }

    // 3. Summon AI: Stay glued to Trainer as companion, attack only close targets
    const lead = getLeadPokemon();
    const sum = tb.summon;
    let targetMon = tb.monsters.find((m) => m.uid === tb.targetId && m.hp > 0);

    // If in Challenge Arena, companion strictly targets the challenge boss!
    if (tb.activeChallenge) {
        const boss = tb.monsters.find((m) => m.hp > 0);
        if (boss) {
            targetMon = boss;
            tb.targetId = boss.uid;
            STATE.wildEnemy = boss;
        } else {
            targetMon = null;
        }
    } else if (STATE.autoMovesEnabled && tb.monsters.length > 0) {
        if (!targetMon || Math.hypot(tr.gx - targetMon.gx, tr.gy - targetMon.gy) > 2.2) {
            let best = null;
            let minDist = Infinity;
            for (const m of tb.monsters) {
                if (m.hp <= 0) continue;
                const d = Math.hypot(tr.gx - m.gx, tr.gy - m.gy);
                if (d <= 2.2 && d < minDist) {
                    minDist = d;
                    best = m;
                }
            }
            if (best) {
                tb.targetId = best.uid;
                STATE.wildEnemy = best;
                targetMon = best;
            } else {
                targetMon = null;
            }
        }
    }

    if (tb.summonOut && lead) {
        if (runSimStep && sTick % 8 === 0) {
            const followDist = Math.hypot(tr.gx - sum.gx, tr.gy - sum.gy);

            // Hard Tether Leash: If trainer walks away > 2.8 tiles, instantly snap companion right next to trainer
            if (followDist > 2.8) {
                sum.gx = tr.gx;
                sum.gy = tr.gy;
                sum.px = tr.px;
                sum.py = tr.py;
                if (typeof spawnFloatingText === "function") spawnFloatingText(tr.gx, tr.gy, "✨ Junto!", "#38bdf8");
            } else if (followDist > 1.2) {
                // Actively keep pokemon glued to trainer at all times (companion leash: 1 tile)
                stepEntityToward(sum, tr.gx, tr.gy);
            } else if (targetMon && Math.hypot(tr.gx - targetMon.gx, tr.gy - targetMon.gy) <= 2.2) {
                // Turn to face near enemy
                if (Math.abs(targetMon.gx - sum.gx) >= Math.abs(targetMon.gy - sum.gy)) {
                    sum.dir = targetMon.gx >= sum.gx ? 2 : 1;
                } else {
                    sum.dir = targetMon.gy >= sum.gy ? 0 : 3;
                }
            } else {
                sum.dir = tr.dir;
            }
        }
        sum.px += (sum.gx * SQM_SIZE - sum.px) * (0.28 * spd);
        sum.py += (sum.gy * SQM_SIZE - sum.py) * (0.28 * spd);

        // Advance summon animation timers// Advance summon animation timers
        sum.animTick = (sum.animTick || 0) + 1;
        if (sum.attackTicks > 0) sum.attackTicks--;
        if (sum.hitFlinchTicks > 0) sum.hitFlinchTicks--;
        if (sum.idleHopTicks > 0) sum.idleHopTicks--;
        if (sum.emoteTimer > 0) sum.emoteTimer--;

        // Auto-Moves Engine: Automatically cycle & execute m1-m4 moves when enabled (deconflicted with Auto-Hunt)
        if (runSimStep && STATE.autoMovesEnabled && !STATE.autoHuntEnabled && sTick % 26 === 0) {
            executeNextAutoMove();
        }

        // Auto-Catch Engine: Periodically scan & capture uncaught corpses on the ground
        if (runSimStep && STATE.autoCatchEnabled && sTick % 28 === 0) {
            processAutoCatchQueue();
        }
    }

    // 4. Wild Monsters Roaming & Attacking with Lively Idle Behaviors
    for (const m of tb.monsters) {
        // Continuous animation clock and timers
        m.animTick = (m.animTick || 0) + 1;
        m.idleTimer = (m.idleTimer || 0) + 1;
        if (m.attackTicks > 0) m.attackTicks--;
        if (m.hitFlinchTicks > 0) m.hitFlinchTicks--;
        if (m.idleHopTicks > 0) m.idleHopTicks--;
        if (m.emoteTimer > 0) m.emoteTimer--;

        // Idle movement & behaviors for wild Pokémon (when not in combat)
        if (m.uid !== tb.targetId) {
            // 1. Random glance / look around in nature (every 130-220 ticks)
            if (m.idleTimer % 130 === 0 && Math.random() < 0.45) {
                m.dir = (m.dir + (Math.random() < 0.5 ? 1 : 3)) % 4;
            }
            // 2. Playful little hop or sniff
            if (m.idleTimer % 230 === 0 && Math.random() < 0.40) {
                m.idleHopTicks = 18;
            }
            // 3. Cute floating emotion bubbles (♪, !, ?, 💤, ✨, ❤️)
            if (m.idleTimer % 340 === 0 && Math.random() < 0.50 && m.emoteTimer <= 0) {
                const emotes = ["♪", "!", "?", "💤", "✨", "❤️"];
                m.emote = emotes[Math.floor(Math.random() * emotes.length)];
                m.emoteTimer = 85;
            }
        }

        m.stepCooldown -= spd;
        if (m.stepCooldown <= 0) {
            m.stepCooldown = 28 + Math.floor(Math.random() * 30);
            if (tb.summonOut && m.uid === tb.targetId && Math.hypot(tr.gx - m.gx, tr.gy - m.gy) <= 2.2) {
                // Targeted monster walks toward summon ONLY if near trainer
                const d = Math.hypot(sum.gx - m.gx, sum.gy - m.gy);
                if (d > 1.4) stepEntityToward(m, sum.gx, sum.gy);
            } else {
                // Random SQM patrol
                const dirs = [[0, 1, 0], [-1, 0, 1], [1, 0, 2], [0, -1, 3]];
                const pick = dirs[Math.floor(Math.random() * dirs.length)];
                const nx = m.gx + pick[0];
                const ny = m.gy + pick[1];
                if (isTileWalkable(nx, ny) && STATE.tibia.mapMatrix[ny][nx] !== 2) {
                    m.gx = nx;
                    m.gy = ny;
                    m.dir = pick[2];
                }
            }
        }
        m.px += (m.gx * SQM_SIZE - m.px) * (0.24 * spd);
        m.py += (m.gy * SQM_SIZE - m.py) * (0.24 * spd);

        // Wild monster counter-hit if near summon
        if (runSimStep && tb.summonOut && lead && sTick % 55 === 0) {
            const d = Math.hypot(sum.gx - m.gx, sum.gy - m.gy);
            if (d <= 1.8) {
                m.attackTicks = 18;
                sum.hitFlinchTicks = 14;
                if (Math.abs(sum.gx - m.gx) >= Math.abs(sum.gy - m.gy)) {
                    m.dir = sum.gx >= m.gx ? 2 : 1;
                } else {
                    m.dir = sum.gy >= m.gy ? 0 : 3;
                }
                const eDmg = Math.max(1, Math.floor((((2 * m.level) / 5 + 2) * 40 * (m.atk / Math.max(10, lead.stats.def))) / 48));
                lead.hp = Math.max(0, lead.hp - eDmg);
                spawnFloatingText(sum.gx, sum.gy, `-${eDmg}`, "#f87171");

                // Auto-Farm Survival Engine
                if (lead.hp > 0) {
                    if (typeof checkAndExecuteAutoHeal === "function") checkAndExecuteAutoHeal();
                } else {
                    let revived = false;
                    if (typeof checkAndExecuteAutoRevive === "function") {
                        revived = checkAndExecuteAutoRevive();
                    }
                    if (!revived) {
                        const party = STATE.player?.party || [];
                        const healthyMonIdx = party.findIndex(p => p.hp > 0);
                        if (healthyMonIdx > 0 && typeof swapTeamOrder === "function") {
                            const nextMon = party[healthyMonIdx];
                            swapTeamOrder(healthyMonIdx, 0);
                            addCombatLog(`<span style="color:#f59e0b;font-weight:700;">🔄 [AUTO-TROCA] ${lead.name} desmaiou! Trocando para ${nextMon.name}!</span>`);
                            showToast(`🔄 Trocando para ${nextMon.name}!`);
                        } else {
                            addCombatLog(`<span style="color:#f87171;">💫 Seu time desmaiou! Nurse Joy curou seu time na Central.</span>`);
                            healFullParty();
                        }
                    }
                }
                renderTibiaPokebar();
            }
        }
    }

    // 5. Update Projectiles (Flying Pokéballs & Spell Missiles — 75% slower arc & shake)
    tb.projectiles = tb.projectiles.filter((p) => {
        p.progress += p.speed * spd;
        if (p.progress >= 1 && !p.landed) {
            p.landed = true;
            if (p.onArrive) p.onArrive();
        }
        if (p.landed) {
            p.shakeTimer = (p.shakeTimer || 0) + spd;
            if (p.shakeTimer >= (p.holdFrames || 36)) {
                if (p.onComplete) p.onComplete();
                return false;
            }
        }
        return true;
    });

    // 6. Update Tile AoE Spell Effects
    tb.tileEffects = tb.tileEffects.filter((ef) => {
        ef.life -= spd;
        return ef.life > 0;
    });

    // 6B. Update Dynamic Pokémon Moves Spell VFX
    if (tb.spellVfx && tb.spellVfx.length > 0) {
        tb.spellVfx = tb.spellVfx.filter((vfx) => updateSingleSpellVfx(vfx, spd));
    }

    // 7. Update Floating Damage / EXP Numbers
    tb.floatingTexts = tb.floatingTexts.filter((ft) => {
        ft.y -= 0.85 * spd;
        ft.life -= spd;
        return ft.life > 0;
    });

    // 8. Expire Old Corpses (after ~35 seconds)
    const now = Date.now();
    const prevCorpseCount = tb.corpses.length;
    tb.corpses = tb.corpses.filter((c) => (now - c.createdAt < 35000) || c.isCatching);
    if (tb.corpses.length !== prevCorpseCount) {
        renderTibiaBattleAndCorpseLists();
    }
}

function drawTibiaMapBackground(ctx, tb, biome, pxInfo) {
    const f = tb.frame;
    const bgImg = tb.mapBgMode !== "pixel_tiles" ? getCachedImage(pxInfo.url) : null;
    const hasHdArt = bgImg && bgImg.complete && !bgImg._failed && bgImg.naturalWidth > 0;

    if (hasHdArt) {
        ctx.save();
        if (tb.mapBgMode === "hd_zoom") {
            // Smooth scrolling close-up camera following the Trainer across the high-res map
            const iw = bgImg.naturalWidth;
            const ih = bgImg.naturalHeight;
            const [cx0, cy0, cw0, ch0] = pxInfo.entry?.crop || [192, 192, iw - 384, ih - 432];
            const relX = (tb.trainer.px + 24) / (GRID_COLS * SQM_SIZE);
            const relY = (tb.trainer.py + 24) / (GRID_ROWS * SQM_SIZE);
            const focusX = cx0 + relX * cw0;
            const focusY = cy0 + relY * ch0;
            const viewW = Math.min(iw, 1152);
            const viewH = Math.min(ih, 792);
            const sx = Math.max(0, Math.min(iw - viewW, focusX - viewW / 2));
            const sy = Math.max(0, Math.min(ih - viewH, focusY - viewH / 2));
            ctx.drawImage(bgImg, sx, sy, viewW, viewH, 0, 0, GRID_COLS * SQM_SIZE, GRID_ROWS * SQM_SIZE);
        } else {
            // Full Scenic Island / Hunting Ring HD Panorama (aligned 1:1 with 16x11 SQM collision ring)
            const iw = bgImg.naturalWidth;
            const ih = bgImg.naturalHeight;
            const [sx, sy, sw, sh] = pxInfo.entry?.crop || [
                Math.round(iw * 0.08),
                Math.round(ih * 0.08),
                Math.round(iw * 0.84),
                Math.round(ih * 0.82),
            ];
            ctx.drawImage(bgImg, sx, sy, sw, sh, 0, 0, GRID_COLS * SQM_SIZE, GRID_ROWS * SQM_SIZE);
        }
        ctx.restore();

        // Render Tactical Tibia SQM Overlay, Encounter Micro-Details & Translucent PZ Sanctuary
        for (let r = 0; r < GRID_ROWS; r++) {
            for (let c = 0; c < GRID_COLS; c++) {
                const x = c * SQM_SIZE;
                const y = r * SQM_SIZE;
                const tile = tb.mapMatrix[r]?.[c] ?? 0;

                if (tile === 2 && tb.isCentralHub) {
                    // Ornate Translucent Tibia Protection Zone (PZ / Temple Sanctuary - apenas Central Hub)
                    const pulse = 0.22 + Math.sin(f * 0.08) * 0.06;
                    ctx.fillStyle = `rgba(56, 189, 248, ${pulse.toFixed(3)})`;
                    ctx.fillRect(x + 1, y + 1, SQM_SIZE - 2, SQM_SIZE - 2);
                    ctx.strokeStyle = "rgba(125, 211, 252, 0.85)";
                    ctx.lineWidth = 1.5;
                    ctx.strokeRect(x + 2, y + 2, SQM_SIZE - 4, SQM_SIZE - 4);
                    // Corner sanctuary rune crystals
                    ctx.fillStyle = "#fde047";
                    ctx.fillRect(x + 4, y + 4, 4, 4);
                    ctx.fillRect(x + SQM_SIZE - 8, y + 4, 4, 4);
                    ctx.fillRect(x + 4, y + SQM_SIZE - 8, 4, 4);
                    ctx.fillRect(x + SQM_SIZE - 8, y + SQM_SIZE - 8, 4, 4);
                } else if (tile === 0 || tile === 3) {
                    // Walkable Hunting Trail SQM Grid (Only if enabled in Settings)
                    if (STATE.settings && STATE.settings.showGrid) {
                        ctx.strokeStyle = "rgba(0, 0, 0, 0.22)";
                        ctx.lineWidth = 1;
                        ctx.strokeRect(x + 0.5, y + 0.5, SQM_SIZE - 1, SQM_SIZE - 1);
                        ctx.strokeStyle = "rgba(255, 255, 255, 0.11)";
                        ctx.strokeRect(x + 1.5, y + 1.5, SQM_SIZE - 3, SQM_SIZE - 3);
                    }

                    if (tile === 3) {
                        // Subtle swaying biome micro-detail on encounter SQMs
                        const sway = Math.round(Math.sin(f * 0.08 + r + c) * 1.5);
                        ctx.fillStyle =
                            biome === "fire"
                                ? "rgba(251, 146, 60, 0.45)"
                                : biome === "water" || biome === "ice"
                                ? "rgba(125, 211, 252, 0.45)"
                                : "rgba(74, 222, 128, 0.42)";
                        ctx.fillRect(x + 8 + sway, y + 36, 3, 6);
                        ctx.fillRect(x + 13 + sway, y + 34, 3, 8);
                        ctx.fillRect(x + 35 + sway, y + 35, 3, 7);
                    }
                } else {
                    // Obstacle / Water / Sanctuary SQM subtle grid (Only if enabled in Settings)
                    if (STATE.settings && STATE.settings.showGrid) {
                        ctx.strokeStyle = "rgba(0, 0, 0, 0.09)";
                        ctx.lineWidth = 1;
                        ctx.strokeRect(x + 0.5, y + 0.5, SQM_SIZE - 1, SQM_SIZE - 1);
                    }
                }
            }
        }
    } else {
        // High-Detail Multi-Layer Pixel-Art Tile Renderer (for "pixel_tiles" mode or instant fallback)
        drawDetailedPixelArtTileGrid(ctx, tb, biome);
    }

    // Floating Protection Zone Sanctuary Banner (Only in Central Hub)
    if (tb.isCentralHub) {
        const pz = tb.pzOrigin || { gx: 3, gy: 1 };
        const pzCenterX = (pz.gx + 1) * SQM_SIZE;
        const pzTopY = pz.gy * SQM_SIZE + 2;
        ctx.fillStyle = "rgba(15, 23, 42, 0.84)";
        ctx.fillRect(pzCenterX - 46, pzTopY, 92, 16);
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 1;
        ctx.strokeRect(pzCenterX - 46, pzTopY, 92, 16);
        ctx.fillStyle = "#7dd3fc";
        ctx.font = getGameCanvasFont("ui", 9.5, "bold");
        ctx.textAlign = "center";
        ctx.fillText("🛡️ PZ / TEMPLO", pzCenterX, pzTopY + 11.5);
    }
}

function drawDetailedPixelArtTileGrid(ctx, tb, biome) {
    const f = tb.frame;
    const palettes = {
        grass: { f1: "#3b823b", f2: "#337333", path1: "#d6b87c", path2: "#c8a96b", trim: "#4ca644", deep: "#1c4722", tree1: "#1f5226", tree2: "#2f7534", tree3: "#4ea847", flower: "#fde047" },
        water: { f1: "#1974b8", f2: "#1565a3", path1: "#f2dcb3", path2: "#e3ca9b", trim: "#52b6e8", deep: "#0f4573", tree1: "#1c6b4a", tree2: "#2c9164", tree3: "#54c48a", flower: "#f472b6" },
        ice: { f1: "#4992c7", f2: "#3b81b5", path1: "#e2f1fc", path2: "#cfe6f7", trim: "#93d5fa", deep: "#1e4b75", tree1: "#295573", tree2: "#457d9e", tree3: "#bae6fd", flower: "#ffffff" },
        fire: { f1: "#5e2516", f2: "#4f1e11", path1: "#9c6d4e", path2: "#8c5f41", trim: "#ea580c", deep: "#2e0f07", tree1: "#3b170e", tree2: "#6b2614", tree3: "#f97316", flower: "#facc15" },
        cave: { f1: "#4d4136", f2: "#42372d", path1: "#85725e", path2: "#756350", trim: "#a18a72", deep: "#261f19", tree1: "#362d25", tree2: "#54473b", tree3: "#786655", flower: "#38bdf8" },
        electric: { f1: "#2f424a", f2: "#26373d", path1: "#647c87", path2: "#566c75", trim: "#38bdf8", deep: "#162024", tree1: "#1f2e33", tree2: "#38525c", tree3: "#facc15", flower: "#fef08a" },
        ghost: { f1: "#291d3b", f2: "#211730", path1: "#523d6e", path2: "#46335e", trim: "#a855f7", deep: "#130c1f", tree1: "#1c122b", tree2: "#382454", tree3: "#7e22ce", flower: "#c084fc" },
        legendary: { f1: "#251f47", f2: "#1e193b", path1: "#63569e", path2: "#55488c", trim: "#eab308", deep: "#110d24", tree1: "#28204d", tree2: "#453880", tree3: "#fde047", flower: "#f472b6" },
    };
    const pal = palettes[biome] || palettes.grass;

    for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
            const x = c * SQM_SIZE;
            const y = r * SQM_SIZE;
            const tile = tb.mapMatrix[r]?.[c] ?? 0;
            const hash = (r * 31 + c * 17) % 7;

            if (tile === 2 && tb.isCentralHub) {
                // Ornate Temple Marble Floor with Gold Trim (apenas Central Hub)
                ctx.fillStyle = (r + c) % 2 === 0 ? "#e2e8f0" : "#cbd5e1";
                ctx.fillRect(x, y, SQM_SIZE, SQM_SIZE);
                ctx.strokeStyle = "#eab308";
                ctx.lineWidth = 1.5;
                ctx.strokeRect(x + 3, y + 3, SQM_SIZE - 6, SQM_SIZE - 6);
                ctx.fillStyle = "#38bdf8";
                ctx.fillRect(x + 20, y + 20, 8, 8);
            } else if (tile === 0 || tile === 3) {
                // Detailed Walkable Hunting Trail with Textured Pebbles & Border Trim
                ctx.fillStyle = (r + c) % 2 === 0 ? pal.path1 : pal.path2;
                ctx.fillRect(x, y, SQM_SIZE, SQM_SIZE);

                // Subtle cobblestone / sand pebble speckles
                ctx.fillStyle = "rgba(0,0,0,0.10)";
                ctx.fillRect(x + 8 + hash * 3, y + 10, 4, 3);
                ctx.fillRect(x + 28 - hash * 2, y + 32, 5, 3);
                ctx.fillStyle = "rgba(255,255,255,0.12)";
                ctx.fillRect(x + 14, y + 22 + hash, 4, 2);

                if (tile === 3) {
                    // Lush 3-Blade Swaying Grass Tufts + Wildflower
                    const sway = Math.round(Math.sin(f * 0.08 + r + c) * 1.5);
                    ctx.fillStyle = pal.trim;
                    ctx.fillRect(x + 10 + sway, y + 16, 4, 11);
                    ctx.fillRect(x + 18 + sway, y + 12, 4, 14);
                    ctx.fillRect(x + 26 + sway, y + 17, 4, 10);
                    ctx.fillRect(x + 34 + sway, y + 14, 4, 12);
                    if (hash % 2 === 0) {
                        ctx.fillStyle = pal.flower;
                        ctx.fillRect(x + 18 + sway, y + 10, 4, 4);
                    }
                }
            } else {
                // Obstacle Terrain: Deep Water / Lava / Canopy Forest / Sanctuary Ruins
                ctx.fillStyle = (r + c) % 2 === 0 ? pal.f1 : pal.f2;
                ctx.fillRect(x, y, SQM_SIZE, SQM_SIZE);

                const isCenterSanctuary = r >= 3 && r <= 7 && c >= 4 && c <= 11;
                if (biome === "water" || (biome === "ice" && !isCenterSanctuary)) {
                    // Animated Water Waves & Foam
                    const wave = Math.sin(f * 0.07 + r * 0.8 + c * 0.6) * 3;
                    ctx.fillStyle = pal.trim;
                    ctx.fillRect(x + 8 + wave, y + 14, 14, 3);
                    ctx.fillRect(x + 22 - wave, y + 32, 16, 3);
                } else if (biome === "fire") {
                    // Glowing Animated Magma Cracks
                    const glow = 0.55 + Math.sin(f * 0.09 + r + c) * 0.35;
                    ctx.fillStyle = `rgba(249, 115, 22, ${glow.toFixed(2)})`;
                    ctx.fillRect(x + 6, y + 6, SQM_SIZE - 12, SQM_SIZE - 12);
                    ctx.fillStyle = "#fde047";
                    ctx.fillRect(x + 14, y + 18, 20, 6);
                } else {
                    // 3D Layered Pixel-Art Canopy Tree / Ancient Ruin Pillar
                    ctx.fillStyle = "rgba(0,0,0,0.35)";
                    ctx.beginPath();
                    ctx.ellipse(x + 24, y + 38, 18, 8, 0, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = pal.tree1;
                    ctx.beginPath();
                    ctx.arc(x + 24, y + 26, 18, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = pal.tree2;
                    ctx.beginPath();
                    ctx.arc(x + 22, y + 22, 14, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = pal.tree3;
                    ctx.beginPath();
                    ctx.arc(x + 19, y + 18, 8, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Crisp SQM Tile Border
            ctx.strokeStyle = "rgba(0, 0, 0, 0.22)";
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 0.5, y + 0.5, SQM_SIZE - 1, SQM_SIZE - 1);
        }
    }
}

function drawBiomeAtmosphereFX(ctx, tb, biome) {
    const f = tb.frame;
    const W = GRID_COLS * SQM_SIZE;
    const H = GRID_ROWS * SQM_SIZE;
    ctx.save();

    // 1. Eerie Drifting Mist / Fog Banks for Ghost, Dark, Poison, and Ice Biomes
    if (biome === "ghost" || biome === "ice") {
        for (let i = 0; i < 3; i++) {
            const fx = ((i * 290 + f * 0.65) % (W + 320)) - 160;
            const fy = 95 + i * 155 + Math.sin(f * 0.02 + i) * 18;
            const grad = ctx.createRadialGradient(fx, fy, 10, fx, fy, 145);
            grad.addColorStop(0, biome === "ghost" ? "rgba(168, 85, 247, 0.14)" : "rgba(186, 230, 253, 0.14)");
            grad.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.ellipse(fx, fy, 145, 42, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // 2. Biome Floating Mote Particles (Embers, Snowflakes, Fireflies, Water Sparkles)
    const moteCount = biome === "fire" || biome === "ice" ? 26 : 18;
    for (let i = 0; i < moteCount; i++) {
        const speedX = biome === "fire" ? 0.45 : biome === "ice" ? 0.55 : 0.35;
        const speedY = biome === "fire" ? -0.95 : biome === "ice" ? 0.85 : Math.sin(f * 0.03 + i) * 0.25;
        const mx = ((i * 173.3 + f * speedX) % (W + 40)) - 20;
        const my = (((i * 119.7 + f * speedY) % (H + 40)) + H + 40) % (H + 40) - 20;
        const alpha = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(f * 0.07 + i * 1.7));

        ctx.fillStyle =
            biome === "fire"
                ? `rgba(251, 146, 60, ${alpha.toFixed(2)})`
                : biome === "ice"
                ? `rgba(224, 242, 254, ${alpha.toFixed(2)})`
                : biome === "ghost"
                ? `rgba(192, 132, 252, ${alpha.toFixed(2)})`
                : biome === "water"
                ? `rgba(186, 230, 253, ${alpha.toFixed(2)})`
                : `rgba(254, 240, 138, ${alpha.toFixed(2)})`;

        ctx.beginPath();
        ctx.arc(mx, my, biome === "fire" ? 2.1 : 2.4, 0, Math.PI * 2);
        ctx.fill();
    }

    // 3. Subtle Cinematic Edge Vignette so sprites & arena pop
    const vig = ctx.createRadialGradient(W / 2, H / 2, W * 0.34, W / 2, H / 2, W * 0.65);
    vig.addColorStop(0, "rgba(0, 0, 0, 0)");
    vig.addColorStop(1, "rgba(6, 10, 18, 0.32)");
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    ctx.restore();
}

function drawTibiaMainCanvas() {
    const canvas = document.getElementById("tibia-game-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const scaleX = canvas.width / (GRID_COLS * SQM_SIZE);
    const scaleY = canvas.height / (GRID_ROWS * SQM_SIZE);
    ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);

    const tb = STATE.tibia;
    const biome = getActiveBiomeStyle();
    const pxInfo = getActiveZoneParallaxInfo(STATE.activeZone);

    // 1. Render Central Social Hub (Saffron Plaza) OR Hunting Route Map Background
    if (tb.activeChallenge) {
        drawChallengeArenaBackground(ctx, tb, tb.activeChallenge);
        drawChallengeAtmosphereFX(ctx, tb, tb.activeChallenge);
        drawChallengeEntities(ctx, tb, tb.activeChallenge);
    } else if (tb.isCentralHub) {
        drawCentralHubBackground(ctx, tb);
        drawBiomeAtmosphereFX(ctx, tb, "grass");
        drawCentralHubEntities(ctx, tb);
    } else {
        drawTibiaMapBackground(ctx, tb, biome, pxInfo);
        drawBiomeAtmosphereFX(ctx, tb, biome);
    }

    // 2. Render Fainted Corpses on the Ground (Catchable & Lootable!)
    for (const corpse of tb.corpses) {
        const cx = corpse.gx * SQM_SIZE;
        const cy = corpse.gy * SQM_SIZE;

        // Blood/Faint Pool under Corpse
        ctx.fillStyle = corpse.is_shiny ? "rgba(250, 204, 21, 0.35)" : "rgba(220, 38, 38, 0.32)";
        ctx.beginPath();
        ctx.ellipse(cx + 24, cy + 28, 19, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw Corpse Sprite (PMD Faint.png or Tilted Fallback)
        drawCorpseOnTile(ctx, corpse, cx, cy);

        // Sleek Clean Corpse Name (ZERO background box)
        ctx.font = getGameCanvasFont("ui", 8.5, "800");
        ctx.textAlign = "center";
        const tag = `${corpse.is_shiny ? "✨" : ""}🔴 ${corpse.name}`;
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2.5;
        ctx.strokeText(tag, cx + 24, cy + 38);
        ctx.fillStyle = corpse.is_shiny ? "#facc15" : "#fde047";
        ctx.fillText(tag, cx + 24, cy + 38);

        // Animated Badge if Pokéball is currently being used on this knocked out Pokémon
        if (corpse.isCatching) {
            ctx.font = getGameCanvasFont("ui", 8.0, "900");
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 2.5;
            ctx.strokeText("⏳ CAPTURANDO...", cx + 24, cy + 48);
            ctx.fillStyle = "#38bdf8";
            ctx.fillText("⏳ CAPTURANDO...", cx + 24, cy + 48);
        }
    }

    // 3. Render AoE Tile Spell Effects (Exori / Waves / Blasts)
    for (const ef of tb.tileEffects) {
        const ex = ef.gx * SQM_SIZE;
        const ey = ef.gy * SQM_SIZE;
        const alpha = ef.life / ef.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha * 0.82;
        ctx.fillStyle = ef.color || "#38bdf8";
        ctx.fillRect(ex + 3, ey + 3, SQM_SIZE - 6, SQM_SIZE - 6);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.strokeRect(ex + 6, ey + 6, SQM_SIZE - 12, SQM_SIZE - 12);
        ctx.restore();
    }

    // 3B. Render Dynamic Animated Elemental Moves Visual Effects (VFX)
    drawSpellVfx(ctx, tb);

    // 4. Render Wild Pokémon + Pokémon Target Reticle + GBA/HGSS Nameplates & HP Bars
    for (const mon of tb.monsters) {
        const isTargeted = mon.uid === tb.targetId;
        if (isTargeted) {
            // Ornate Pokémon Pulsing Target Reticle around the Creature's SQM!
            const pulse = 0.75 + Math.sin(tb.frame * 0.16) * 0.25;
            ctx.save();
            ctx.strokeStyle = `rgba(239, 68, 68, ${0.45 * pulse})`;
            ctx.lineWidth = 4;
            ctx.strokeRect(mon.px + 3, mon.py + 3, SQM_SIZE - 6, SQM_SIZE - 6);
            ctx.strokeStyle = "#ff2e2e";
            ctx.lineWidth = 2;
            const cLen = 10;
            // Top-left
            ctx.beginPath();
            ctx.moveTo(mon.px + 1, mon.py + 1 + cLen);
            ctx.lineTo(mon.px + 1, mon.py + 1);
            ctx.lineTo(mon.px + 1 + cLen, mon.py + 1);
            // Top-right
            ctx.moveTo(mon.px + SQM_SIZE - 1 - cLen, mon.py + 1);
            ctx.lineTo(mon.px + SQM_SIZE - 1, mon.py + 1);
            ctx.lineTo(mon.px + SQM_SIZE - 1, mon.py + 1 + cLen);
            // Bottom-left
            ctx.moveTo(mon.px + 1, mon.py + SQM_SIZE - 1 - cLen);
            ctx.lineTo(mon.px + 1, mon.py + SQM_SIZE - 1);
            ctx.lineTo(mon.px + 1 + cLen, mon.py + SQM_SIZE - 1);
            // Bottom-right
            ctx.moveTo(mon.px + SQM_SIZE - 1 - cLen, mon.py + SQM_SIZE - 1);
            ctx.lineTo(mon.px + SQM_SIZE - 1, mon.py + SQM_SIZE - 1);
            ctx.lineTo(mon.px + SQM_SIZE - 1, mon.py + SQM_SIZE - 1 - cLen);
            ctx.stroke();
            ctx.restore();
        }

        const isCaughtDex = STATE.player.pokedex_caught.includes(mon.species_id);
        drawCreatureOnTile(ctx, mon.species_id, mon.dex_id, mon.is_shiny, mon.px, mon.py, mon.dir, true, mon.quality, mon);
        drawTibiaNameplateAndHpBar(
            ctx,
            `${mon.is_shiny ? "✨ " : ""}${mon.name} Lv.${mon.level}`,
            mon.hp / mon.max_hp,
            mon.px + SQM_SIZE / 2,
            mon.py - 4,
            false,
            { isCaught: isCaughtDex, isTargeted }
        );
    }

    // 5. Render Player's Summoned Pokémon ("Go, Gyarados!")
    const lead = getLeadPokemon();
    if (tb.summonOut && lead) {
        const sum = tb.summon;
        // Green Summon Aura Ring under feet
        ctx.strokeStyle = "rgba(52, 211, 153, 0.78)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(sum.px + 24, sum.py + 38, 17, 7, 0, 0, Math.PI * 2);
        ctx.stroke();

        const leadExpRatio = lead.exp_next ? Math.max(0.08, Math.min(1, (lead.exp || 0) / lead.exp_next)) : 0.35;
        drawCreatureOnTile(ctx, lead.species_id, lead.dex_id, lead.is_shiny, sum.px, sum.py, sum.dir, true, lead.quality, sum);
        drawTibiaNameplateAndHpBar(
            ctx,
            `${lead.is_shiny ? "✨ " : ""}${lead.name} Lv.${lead.level}`,
            lead.hp / lead.max_hp,
            sum.px + SQM_SIZE / 2,
            sum.py - 4,
            true,
            { expRatio: leadExpRatio, isSummon: true }
        );
    }

    // 6. Render Player Trainer (Tibia Outfit + Nameplate + Yellow Speech Text)
    const tr = tb.trainer;
    drawTibiaTrainerSprite(ctx, tr.px, tr.py, tr.dir);
    const trExpRatio = STATE.player.exp_next ? Math.max(0.08, Math.min(1, (STATE.player.exp || 0) / STATE.player.exp_next)) : 0.45;
    drawTibiaNameplateAndHpBar(
        ctx,
        `${STATE.player.name || "Treinador"} Lv.${STATE.player.level}`,
        1.0,
        tr.px + SQM_SIZE / 2,
        tr.py - 4,
        true,
        { expRatio: trExpRatio, isTrainer: true }
    );

    if (tr.speechTimer > 0 && tr.speechText) {
        ctx.font = getGameCanvasFont("ui", 11.5, "bold");
        ctx.textAlign = "center";
        const msg = `${STATE.player.name || "Treinador"}: ${tr.speechText}`;
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        ctx.strokeText(msg, tr.px + 24, tr.py - 22);
        ctx.fillStyle = "#fde047";
        ctx.fillText(msg, tr.px + 24, tr.py - 22);
    }

    // 7. Render Flying Projectiles (Pokéballs & Ranged Missiles)
    for (const p of tb.projectiles) {
        const t = Math.min(1, p.progress);
        const curX = p.startX + (p.endX - p.startX) * t;
        const arcY = Math.sin(t * Math.PI) * -42;
        const curY = p.startY + (p.endY - p.startY) * t + (p.landed ? 0 : arcY);

        const ballImg = getCachedImage(p.spriteUrl);
        ctx.save();
        ctx.translate(curX, curY);
        if (p.landed) {
            // 3-Shake Animation on the Corpse Tile!
            const angle = Math.sin((p.shakeTimer || 0) * 0.55) * 0.42;
            ctx.rotate(angle);
        } else {
            ctx.rotate(t * Math.PI * 4);
        }
        if (ballImg && ballImg.complete && !ballImg._failed) {
            ctx.drawImage(ballImg, -14, -14, 28, 28);
        } else {
            ctx.fillStyle = "#ef4444";
            ctx.beginPath();
            ctx.arc(0, 0, 8, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }

    // 8. Render Tibia Rising Floating Damage & EXP Numbers
    for (const ft of tb.floatingTexts) {
        ctx.font = getGameCanvasFont("pixel", 12.5, "900");
        ctx.textAlign = "center";
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3.5;
        ctx.strokeText(ft.text, ft.x, ft.y);
        ctx.fillStyle = ft.color;
        ctx.fillText(ft.text, ft.x, ft.y);
    }
}

function drawCorpseOnTile(ctx, corpse, cx, cy) {
    const slug = getPmdSlug(corpse.species_id || corpse.dex_id);
    const manifest = getPmdManifest(slug);

    // Enforce crisp 32-bit pixel art rendering
    ctx.imageSmoothingEnabled = false;

    // 1. Try explicit 32-bit PMD Faint.png sheet (last frame of faint sequence)
    const faintUrl = getPmdSheetUrl(slug, "Faint", corpse.is_shiny);
    const faintImg = getCachedImage(faintUrl);

    if (faintImg && faintImg.complete && !faintImg._failed && faintImg.naturalWidth > 0 && manifest?.anims?.Faint) {
        const anim = manifest.anims.Faint;
        if (anim && anim.w > 0 && anim.h > 0) {
            const lastFrameIdx = Math.max(0, (anim.d?.length || 1) - 1);
            const sx = lastFrameIdx * anim.w;
            const sy = 0;
            const dx = Math.round(cx + 24 - anim.ax);
            const dy = Math.round(cy + 38 - anim.ay);

            ctx.save();
            ctx.imageSmoothingEnabled = false;
            ctx.globalAlpha = 0.94;
            ctx.drawImage(faintImg, sx, sy, anim.w, anim.h, dx, dy, anim.w, anim.h);
            ctx.restore();
            return;
        }
    }

    // 2. Synthesized 32-Bit Knocked Out Pose (using 32-bit Hurt or Idle sheet)
    // NEVER use low-res 16-bit GBA sprites!
    let fallbackSheet = getCachedImage(getPmdSheetUrl(slug, "Hurt", corpse.is_shiny));
    let animInfo = manifest?.anims?.Hurt;
    if (!fallbackSheet || !fallbackSheet.complete || fallbackSheet._failed || fallbackSheet.naturalWidth === 0) {
        fallbackSheet = getCachedImage(getPmdSheetUrl(slug, "Idle", corpse.is_shiny));
        animInfo = manifest?.anims?.Idle;
    }

    if (fallbackSheet && fallbackSheet.complete && !fallbackSheet._failed && fallbackSheet.naturalWidth > 0 && animInfo) {
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        ctx.translate(cx + 24, cy + 30);
        ctx.rotate(-Math.PI / 2.3);
        ctx.globalAlpha = 0.88;
        ctx.filter = "brightness(0.85) grayscale(0.25)";
        const sw = animInfo.w || 32;
        const sh = animInfo.h || 32;
        ctx.drawImage(fallbackSheet, 0, 0, sw, sh, -sw / 2, -sh / 2, sw, sh);
        ctx.restore();

        // 32-bit Knocked Out dizzy stars
        ctx.font = "bold 10px 'Segoe UI Emoji', system-ui";
        ctx.textAlign = "center";
        ctx.fillStyle = "#fde047";
        ctx.fillText("💫", cx + 24, cy + 12);
        return;
    }

    // 3. Fallback: 32-bit PMD Portrait token on defeat pool
    const pmdPortrait = getCachedImage(getPmdPortraitUrl(slug, corpse.is_shiny));
    if (pmdPortrait && pmdPortrait.complete && !pmdPortrait._failed && pmdPortrait.naturalWidth > 0) {
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        ctx.globalAlpha = 0.82;
        ctx.drawImage(pmdPortrait, cx + 8, cy + 12, 32, 32);
        ctx.font = "bold 10px 'Segoe UI Emoji', system-ui";
        ctx.textAlign = "center";
        ctx.fillStyle = "#fde047";
        ctx.fillText("💫", cx + 24, cy + 10);
        ctx.restore();
    }
}

function drawCreatureEmotionBubble(ctx, cx, cy, emote) {
    if (!emote) return;
    ctx.save();
    const bob = Math.sin((STATE.tibia.animTick || 0) * 0.12) * 2;
    const bx = Math.round(cx);
    const by = Math.round(cy - 26 + bob);

    // Bubble Tail
    ctx.beginPath();
    ctx.moveTo(bx - 3, by + 8);
    ctx.lineTo(bx, by + 13);
    ctx.lineTo(bx + 3, by + 8);
    ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
    ctx.fill();
    ctx.strokeStyle = "rgba(250, 204, 21, 0.75)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Bubble Body (Ornate oval)
    ctx.beginPath();
    ctx.ellipse(bx, by, 12, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
    ctx.fill();
    ctx.strokeStyle = "rgba(250, 204, 21, 0.85)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Subtle inner glow
    ctx.beginPath();
    ctx.arc(bx, by - 1, 7, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
    ctx.fill();

    // Emote Icon / Emoji
    ctx.font = "bold 11px 'Segoe UI Emoji', 'Apple Color Emoji', " + POKELAND_FONTS.ui;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(emote, bx, by + 1);
    ctx.restore();
}

function drawCreatureOnTile(ctx, speciesId, dexId, isShiny, px, py, dir, animateWalk, quality, ent = null) {
    const animTick = ent?.animTick || STATE.tibia.animTick || Math.floor(Date.now() / 16);
    const attackTicks = ent?.attackTicks || 0;
    const hitFlinchTicks = ent?.hitFlinchTicks || 0;
    const idleHopTicks = ent?.idleHopTicks || 0;
    const isMoving = animateWalk && ent?.gx !== undefined && Math.hypot((ent.gx * SQM_SIZE) - ent.px, (ent.gy * SQM_SIZE) - ent.py) > 1.2;
    const isKnockedOut = ent?.hp !== undefined && ent.hp <= 0;

    // Enforce crisp 32-bit pixel art rendering without browser blurring
    ctx.imageSmoothingEnabled = false;

    // =========================================================
    // 5-STATE 32-BIT MOVE SET PIPELINE:
    // 1. Idle  2. Moving  3. Attacking  4. Getting Hit  5. Knocked Out
    // =========================================================

    const slug = getPmdSlug(speciesId || dexId);
    const manifest = getPmdManifest(slug);

    // Determine Active Move Set Animation State
    let chosenAnim = "Idle";
    let animClock = animTick;
    let walkBobY = 0;
    let walkTilt = 0;
    let walkScaleX = 1.0;
    let walkScaleY = 1.0;

    if (isKnockedOut) {
        // STATE 5: KNOCKED OUT
        chosenAnim = manifest?.anims?.Faint ? "Faint" : (manifest?.anims?.Hurt ? "Hurt" : "Idle");
    } else if (hitFlinchTicks > 0) {
        // STATE 4: GETTING HIT (HURT)
        chosenAnim = manifest?.anims?.Hurt ? "Hurt" : "Idle";
        animClock = (16 - hitFlinchTicks) * 2;
    } else if (attackTicks > 0) {
        // STATE 3: ATTACKING (ATTACK)
        chosenAnim = manifest?.anims?.Attack ? "Attack" : "Idle";
        animClock = (22 - attackTicks) * 1.5;
    } else if (isMoving) {
        // STATE 2: MOVING (WALK)
        if (manifest?.anims?.Walk) {
            chosenAnim = "Walk";
            animClock = animTick * 1.25;
        } else {
            // Procedural 32-Bit Walk Cycle using Idle Sheet
            chosenAnim = "Idle";
            animClock = animTick * 1.25;
            walkBobY = -Math.abs(Math.sin(animClock * 0.35)) * 3.5;
            walkTilt = Math.sin(animClock * 0.35) * 0.08;
            walkScaleX = 1.0 + Math.abs(Math.sin(animClock * 0.35)) * 0.05;
            walkScaleY = 1.0 - Math.abs(Math.sin(animClock * 0.35)) * 0.07;
        }
    } else {
        // STATE 1: IDLE (STANDING IN GUARD)
        chosenAnim = "Idle";
        animClock = animTick;
    }

    // Physical Combat Displacements:
    // 1. Playful Hop & Jump (Wild Idle)
    let hopY = 0;
    if (idleHopTicks > 0) {
        const p = (18 - idleHopTicks) / 18;
        hopY = -Math.sin(p * Math.PI) * 8;
    }

    // 2. Attack Lunge Curve (Forward thrust in facing direction)
    let lungeX = 0;
    let lungeY = 0;
    if (attackTicks > 0) {
        const lungeDist = Math.sin((attackTicks / 22) * Math.PI) * 10;
        if (dir === 0) lungeY = lungeDist;
        else if (dir === 1) lungeX = -lungeDist;
        else if (dir === 2) lungeX = lungeDist;
        else if (dir === 3) lungeY = -lungeDist;
    }

    // 3. Getting Hit Recoil Shake
    let flinchX = 0;
    let flinchY = 0;
    if (hitFlinchTicks > 0) {
        flinchX = Math.sin(hitFlinchTicks * 2.8) * 3.5;
        flinchY = Math.cos(hitFlinchTicks * 2.8) * 2.5;
    }

    // 4. Organic 32-Bit Idle Breathing Bob (60fps continuous)
    const isStationary = !isMoving && attackTicks === 0 && hitFlinchTicks === 0 && !isKnockedOut;
    const breathBob = isStationary ? Math.sin(animTick * 0.16) * 1.8 : 0;
    const breathScaleX = 1.0 + (isStationary ? Math.sin(animTick * 0.16) * 0.035 : 0);
    const breathScaleY = 1.0 - (isStationary ? Math.sin(animTick * 0.16) * 0.035 : 0);

    const renderX = px + lungeX + flinchX;
    const renderY = py + hopY + lungeY + flinchY + breathBob + walkBobY;

    // 5. Mythical Cosmic Aura
    if (quality === "Mítico") {
        drawMythicAura(ctx, px + 24, py + 24);
    }

    // 6. Dynamic 32-Bit Oval Ground Shadow
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.38)";
    ctx.beginPath();
    const shadowW = Math.max(5, 14 * breathScaleX * walkScaleX - (hopY < 0 ? 3 : 0));
    const shadowH = Math.max(3, 6 * breathScaleY * walkScaleY - (hopY < 0 ? 1.8 : 0));
    ctx.ellipse(px + 24 + lungeX / 2, py + 39 + lungeY / 2, shadowW, shadowH, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 7. Load and Draw 32-Bit PMD Sheet
    let sheetUrl = getPmdSheetUrl(slug, chosenAnim, isShiny);
    let sheetImg = getCachedImage(sheetUrl);

    // Fallback to Idle sheet if chosen sheet is still loading
    if (!sheetImg || !sheetImg.complete || sheetImg._failed || sheetImg.naturalWidth === 0) {
        sheetUrl = getPmdSheetUrl(slug, "Idle", isShiny);
        sheetImg = getCachedImage(sheetUrl);
    }

    if (sheetImg && sheetImg.complete && !sheetImg._failed && sheetImg.naturalWidth > 0 && manifest) {
        const frameInfo = getPmdFrameInfo(manifest, chosenAnim, animClock);
        if (frameInfo && frameInfo.w > 0 && frameInfo.h > 0) {
            const rows = Math.floor(sheetImg.naturalHeight / frameInfo.h);
            let row = 0;
            let flipX = false;

            if (rows >= 4) {
                row = Math.max(0, Math.min(3, dir || 0));
            } else if (rows === 1) {
                row = 0;
                if (dir === 1) flipX = true;
            }

            const sx = frameInfo.frameIdx * frameInfo.w;
            const sy = row * frameInfo.h;
            const sw = frameInfo.w;
            const sh = frameInfo.h;

            const cx = renderX + 24;
            const cy = renderY + 39;
            const dx = Math.round(cx - frameInfo.ax);
            const dy = Math.round(cy - frameInfo.ay);

            ctx.save();
            ctx.imageSmoothingEnabled = false;

            // Getting Hit Damage Flash
            if (hitFlinchTicks > 0 && (hitFlinchTicks % 4 < 2)) {
                ctx.filter = "brightness(1.6) sepia(0.5) hue-rotate(300deg)";
            }

            // Knocked Out Desaturation
            if (isKnockedOut) {
                ctx.filter = "brightness(0.85) grayscale(0.25)";
            }

            // Procedural Walk Tilt (if moving without explicit walk sheet)
            if (walkTilt !== 0) {
                ctx.translate(cx, cy);
                ctx.rotate(walkTilt);
                ctx.scale(walkScaleX, walkScaleY);
                ctx.translate(-cx, -cy);
            }

            if (flipX) {
                ctx.translate(cx, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(sheetImg, sx, sy, sw, sh, -frameInfo.ax, dy, sw, sh);
            } else {
                ctx.drawImage(sheetImg, sx, sy, sw, sh, dx, dy, sw, sh);
            }
            ctx.restore();

            if (isShiny) {
                drawShinySparkles(ctx, cx, cy - 18);
            }

            // Knocked out dizzy stars
            if (isKnockedOut) {
                ctx.font = "bold 11px 'Segoe UI Emoji', system-ui";
                ctx.textAlign = "center";
                ctx.fillStyle = "#fde047";
                ctx.fillText("💫", cx, cy - 22);
            }

            // Floating Emotion Bubble (Wild Idle)
            if (ent?.emoteTimer > 0 && ent?.emote && !isKnockedOut) {
                drawCreatureEmotionBubble(ctx, px + 24, py + hopY - 8, ent.emote);
            }
            return;
        }
    }

    // 8. 32-Bit PMD Portrait Token Fallback (NEVER use low-res 16-bit GBA sprites!)
    const pmdPortrait = getCachedImage(getPmdPortraitUrl(slug, isShiny));
    if (pmdPortrait && pmdPortrait.complete && !pmdPortrait._failed && pmdPortrait.naturalWidth > 0) {
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        if (hitFlinchTicks > 0 && (hitFlinchTicks % 4 < 2)) {
            ctx.filter = "brightness(1.5) sepia(0.6) hue-rotate(320deg)";
        }
        ctx.drawImage(pmdPortrait, renderX + 4, renderY + 4, 40, 40);
        ctx.restore();
        if (isShiny) drawShinySparkles(ctx, renderX + 24, renderY + 18);
        if (ent?.emoteTimer > 0 && ent?.emote) {
            drawCreatureEmotionBubble(ctx, px + 24, py + hopY - 8, ent.emote);
        }
    }
}

function drawTibiaTrainerSprite(ctx, px, py, dir) {
    const modelId = typeof getActiveTrainerModelId === "function" ? getActiveTrainerModelId() : "ethan_gold";
    const tr = STATE.tibia.trainer;
    const isWalking = Math.hypot((tr.gx * SQM_SIZE) - tr.px, (tr.gy * SQM_SIZE) - tr.py) > 1.2;
    if (typeof draw32BitAnimeTrainerOnCanvas === "function") {
        draw32BitAnimeTrainerOnCanvas(ctx, modelId, px, py, dir, STATE.tibia.frame, isWalking);
        return;
    }
}

function drawTibiaNameplateAndHpBar(ctx, name, hpRatio, centerX, bottomY, isFriendly, opts = {}) {
    const r = Math.max(0, Math.min(1, hpRatio));
    let barColor = "#22c55e";
    if (r < 0.25) barColor = "#ef4444";
    else if (r < 0.60) barColor = "#f59e0b";

    ctx.save();
    ctx.font = getGameCanvasFont("ui", 8.5, "800");
    const textW = Math.ceil(ctx.measureText(name).width);
    const hasBall = !isFriendly && opts.isCaught;
    const nameY = Math.round(bottomY - 8);

    // 1. Miniature Pokéball Caught Indicator (for caught wild species) — clean without background box
    if (hasBall) {
        const ballX = Math.round(centerX - textW / 2 - 5);
        const ballY = nameY - 3;
        ctx.beginPath();
        ctx.arc(ballX, ballY, 3.2, Math.PI, 0, false);
        ctx.fillStyle = "#ef4444";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(ballX, ballY, 3.2, 0, Math.PI, false);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(ballX, ballY, 3.2, 0, Math.PI * 2);
        ctx.moveTo(ballX - 3.2, ballY);
        ctx.lineTo(ballX + 3.2, ballY);
        ctx.stroke();
    }

    // 2. Pure Clean Name Text with Crisp Outline (ZERO background box behind trainer or pokemon names!)
    ctx.textAlign = "center";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2.6;
    const textX = centerX + (hasBall ? 4 : 0);
    ctx.strokeText(name, textX, nameY);
    ctx.fillStyle = isFriendly ? "#4ade80" : opts.isTargeted ? "#f87171" : "#ffffff";
    ctx.fillText(name, textX, nameY);

    // 3. GBA / HGSS Glossy HP Bar
    const bw = 30;
    const bh = 4;
    const bx = Math.round(centerX - bw / 2);
    const by = Math.round(bottomY - 2.5);
    ctx.fillStyle = "#05080d";
    ctx.fillRect(bx - 1, by - 1, bw + 2, bh + 2);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(bx, by, bw, bh);
    const fillW = Math.round(bw * r);
    if (fillW > 0) {
        ctx.fillStyle = barColor;
        ctx.fillRect(bx, by, fillW, bh);
        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.fillRect(bx, by, fillW, 1.5);
    }

    // 4. Cyan EXP Micro-Bar under Friendly Summon / Trainer
    if (isFriendly && typeof opts.expRatio === "number") {
        const expW = Math.round(bw * Math.max(0, Math.min(1, opts.expRatio)));
        ctx.fillStyle = "#05080d";
        ctx.fillRect(bx - 1, by + bh, bw + 2, 3);
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(bx, by + bh, bw, 2);
        if (expW > 0) {
            ctx.fillStyle = "#38bdf8";
            ctx.fillRect(bx, by + bh, expW, 2);
        }
    }
    ctx.restore();
}

let _lastMinimapDrawTime = 0;

function drawTibiaMinimap(force = false) {
    const mini = document.getElementById("tibia-minimap-canvas");
    if (!mini) return;
    const radarPanel = document.getElementById("float-panel-radar");
    if (radarPanel && (radarPanel.classList.contains("is-hidden") || radarPanel.classList.contains("is-collapsed"))) {
        return;
    }
    const now = performance.now();
    if (!force && now - _lastMinimapDrawTime < 75) {
        return; // High-performance throttle (~13 FPS radar refresh is plenty for minimap)
    }
    _lastMinimapDrawTime = now;

    const ctx = mini.getContext("2d");
    const cw = mini.width / GRID_COLS;
    const ch = mini.height / GRID_ROWS;
    const tb = STATE.tibia;
    const pxInfo = getActiveZoneParallaxInfo(STATE.activeZone);
    const bgImg = getCachedImage(pxInfo.url);

    if (bgImg && bgImg.complete && !bgImg._failed && bgImg.naturalWidth > 0 && tb.mapBgMode !== "pixel_tiles") {
        const iw = bgImg.naturalWidth;
        const ih = bgImg.naturalHeight;
        const [sx, sy, sw, sh] = pxInfo.entry?.crop || [
            Math.round(iw * 0.08),
            Math.round(ih * 0.08),
            Math.round(iw * 0.84),
            Math.round(ih * 0.82),
        ];
        ctx.drawImage(bgImg, sx, sy, sw, sh, 0, 0, mini.width, mini.height);
        ctx.fillStyle = "rgba(15, 23, 42, 0.22)";
        ctx.fillRect(0, 0, mini.width, mini.height);
    } else {
        for (let r = 0; r < GRID_ROWS; r++) {
            for (let c = 0; c < GRID_COLS; c++) {
                const tile = tb.mapMatrix[r]?.[c] ?? 0;
                ctx.fillStyle = tile === 1 ? "#1e293b" : (tile === 2 && tb.isCentralHub) ? "#38bdf8" : "#15803d";
                ctx.fillRect(c * cw, r * ch, cw + 0.5, ch + 0.5);
            }
        }
    }

    // Subtle Radar Grid Overlay
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 0.5;
    for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
            const tile = tb.mapMatrix[r]?.[c] ?? 0;
            if (tile === 2 && tb.isCentralHub) {
                ctx.fillStyle = "rgba(56, 189, 248, 0.55)";
                ctx.fillRect(c * cw + 1, r * ch + 1, cw - 2, ch - 2);
            }
        }
    }

    // Corpses (Yellow Dots with dark outline)
    for (const c of tb.corpses) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(c.gx * cw + 2, c.gy * ch + 1, cw - 4, ch - 2);
        ctx.fillStyle = "#fde047";
        ctx.fillRect(c.gx * cw + 3, c.gy * ch + 2, cw - 6, ch - 4);
    }

    // Wild Monsters or Online Hub Players (Red/Cyan Dots with dark outline)
    if (tb.isCentralHub) {
        for (const st of tb.hubStations || []) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(st.padGx * cw + 1, st.padGy * ch + 1, cw - 2, ch - 2);
            ctx.fillStyle = st.color || "#fde047";
            ctx.fillRect(st.padGx * cw + 2, st.padGy * ch + 2, cw - 4, ch - 4);
        }
        for (const hp of tb.hubPlayers || []) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(hp.gx * cw + 2, hp.gy * ch + 1, cw - 4, ch - 2);
            ctx.fillStyle = "#38bdf8";
            ctx.fillRect(hp.gx * cw + 3, hp.gy * ch + 2, cw - 6, ch - 4);
        }
    } else {
        for (const m of tb.monsters) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(m.gx * cw + 2, m.gy * ch + 1, cw - 4, ch - 2);
            ctx.fillStyle = "#ef4444";
            ctx.fillRect(m.gx * cw + 3, m.gy * ch + 2, cw - 6, ch - 4);
        }
    }

    // Summon (Bright Green Dot)
    if (tb.summonOut) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(tb.summon.gx * cw + 1, tb.summon.gy * ch + 1, cw - 2, ch - 2);
        ctx.fillStyle = "#4ade80";
        ctx.fillRect(tb.summon.gx * cw + 2, tb.summon.gy * ch + 2, cw - 4, ch - 4);
    }

    // Player (White Radar Beacon)
    ctx.fillStyle = "#000000";
    ctx.fillRect(tb.trainer.gx * cw + 1, tb.trainer.gy * ch + 1, cw - 2, ch - 2);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(tb.trainer.gx * cw + 2, tb.trainer.gy * ch + 2, cw - 4, ch - 4);
}

// ====================================================
// 2. TIBIA LEFT & RIGHT DOCK WINDOWS (POKEBAR, BATTLE LIST, CORPSES)
// ====================================================
let _lastPokebarKey = "";
function renderTibiaPokebar(force = false) {
    const container = document.getElementById("tibia-pokebar-list");
    if (!container) return;
    const lead = getLeadPokemon();
    const leaderBanner = document.getElementById("pokebar-active-leader");

    const partyKey = (STATE.player.party || [])
        .map((mon) => `${mon.uid || mon.id}_${mon.hp}_${mon.max_hp}_${mon.level}_${mon.exp || 0}_${mon.quality || ""}`)
        .join("|") + `_${STATE.tibia.summonOut ? 1 : 0}`;

    if (!force && partyKey === _lastPokebarKey) {
        return;
    }
    _lastPokebarKey = partyKey;

    if (lead) {
        const gInfo = classifyMythicalGrade(lead);
        const tagEl = document.getElementById("pokebar-mitico-tag");
        if (tagEl) tagEl.textContent = gInfo.shortLabel;

        if (leaderBanner) {
            const hpPct = Math.max(0, Math.min(100, (lead.hp / lead.max_hp) * 100));
            const hpCol = hpPct < 25 ? "linear-gradient(90deg, #dc2626, #f87171)" : hpPct < 60 ? "linear-gradient(90deg, #d97706, #fbbf24)" : "linear-gradient(90deg, #059669, #34d399)";
            const expPct = lead.exp_next ? Math.max(6, Math.min(100, ((lead.exp || 0) / lead.exp_next) * 100)) : 38;
            const primEl = (lead.elements && lead.elements[0]) || "normal";
            const elInfo = ELEMENT_PT[primEl] || ELEMENT_PT.normal;
            const portraitUrl = getPmdPortraitUrl(lead.species_id || lead.dex_id);
            const fallbackUrl = getSpriteUrl(lead.dex_id, lead.is_shiny);
            const genderSym = lead.gender === "F" || lead.gender === "female"
                ? `<span style="color:#f472b6;">♀</span>`
                : `<span style="color:#60a5fa;">♂</span>`;

            leaderBanner.style.setProperty("--leader-border", elInfo.bg);
            leaderBanner.style.setProperty("--leader-glow", `${elInfo.bg}44`);
            leaderBanner.onmouseenter = (e) => showPokemonHoverCard(getLeadPokemon(), e);
            leaderBanner.onmousemove = (e) => positionPokemonHoverCard(e);
            leaderBanner.onmouseleave = () => hidePokemonHoverCard();
            leaderBanner.innerHTML = `
                <div class="leader-portrait-wrap">
                    <img class="leader-portrait-img" src="${portraitUrl}" onerror="this.onerror=null;this.src='${fallbackUrl}';" alt="${lead.name}">
                    <span class="leader-summon-badge">${STATE.tibia.summonOut ? "EM CAMPO" : "RECOLHIDO"}</span>
                </div>
                <div class="leader-info-col">
                    <div class="leader-title-row">
                        <div class="leader-name-wrap">
                            ${renderTypeIconsOnly(lead.elements)}
                            <span>${lead.is_shiny ? "✨ " : ""}${lead.name} ${genderSym}</span>
                        </div>
                        <span class="leader-lvl-pill">Lv.${lead.level}</span>
                    </div>
                    <div class="gba-gauge-row" title="Pontos de Vida (HP)">
                        <span class="gba-gauge-lbl">HP</span>
                        <div class="gba-gauge-track">
                            <div class="gba-gauge-fill" style="width:${hpPct.toFixed(1)}%;background:${hpCol};"></div>
                        </div>
                        <span class="gba-gauge-txt">${lead.hp}/${lead.max_hp}</span>
                    </div>
                    <div class="gba-gauge-row" title="Progresso de Experiência (EXP)">
                        <span class="gba-gauge-lbl is-exp">EXP</span>
                        <div class="gba-gauge-track">
                            <div class="gba-gauge-fill" style="width:${expPct.toFixed(1)}%;background:linear-gradient(90deg, #0284c7, #38bdf8);"></div>
                        </div>
                        <span class="gba-gauge-txt">${Math.floor(expPct)}%</span>
                    </div>
                </div>
            `;
        }
    }

    container.innerHTML = STATE.player.party
        .map((mon, idx) => {
            const isLead = idx === 0;
            const hpPct = Math.max(0, Math.min(100, (mon.hp / mon.max_hp) * 100));
            const hpCol = hpPct < 25 ? "#ef4444" : hpPct < 60 ? "#f59e0b" : "#10b981";
            const expPct = mon.exp_next ? Math.max(5, Math.min(100, ((mon.exp || 0) / mon.exp_next) * 100)) : 30;
            const gInfo = classifyMythicalGrade(mon);
            const primEl = (mon.elements && mon.elements[0]) || "normal";
            const elInfo = ELEMENT_PT[primEl] || ELEMENT_PT.normal;
            const portraitUrl = getPmdPortraitUrl(mon.species_id || mon.dex_id);
            const fallbackUrl = getSpriteUrl(mon.dex_id, mon.is_shiny);

            return `<div class="pokebar-slot ${isLead ? "active-summon" : ""} ${mon.hp <= 0 ? "fainted" : ""}" style="--slot-el-color:${elInfo.bg};" onclick="setPartyLead(${idx})" onmouseenter="showPokemonHoverCard(STATE.player.party[${idx}], event)" onmousemove="positionPokemonHoverCard(event)" onmouseleave="hidePokemonHoverCard()" title="Clique para invocar ${mon.name} (ou passe o mouse para ver o Card completo)">
                <div class="pokebar-portrait-box">
                    <span class="slot-pokeball-indicator"></span>
                    <img class="pokebar-icon" src="${portraitUrl}" onerror="this.onerror=null;this.src='${fallbackUrl}';" alt="${mon.name}">
                </div>
                <div class="pokebar-info">
                    <div class="pokebar-name-row">
                        <span style="display:flex;align-items:center;gap:4px;">
                            <img src="${getGen8TypeIconUrl(primEl)}" style="width:12px;height:12px;object-fit:contain;" alt="">
                            <span>${mon.is_shiny ? "✨" : ""}${mon.name} <small style="color:#94a3b8;">Lv.${mon.level}</small></span>
                        </span>
                        <span style="font-size:9.5px;color:#fde047;font-weight:800;background:rgba(234,179,8,0.15);padding:1px 5px;border-radius:4px;">${mon.quality || "Comum"}</span>
                    </div>
                    <div style="font-size:9.5px;color:#94a3b8;display:flex;justify-content:space-between;margin-top:2px;">
                        <span>${elInfo.label}</span>
                        <span style="color:#cbd5e1;font-weight:700;">${mon.hp}/${mon.max_hp}</span>
                    </div>
                    <div class="tibia-hp-bar-outer">
                        <div class="tibia-hp-bar-inner" style="width:${hpPct}%;background:${hpCol};"></div>
                    </div>
                    <div class="slot-exp-bar-outer">
                        <div class="slot-exp-bar-inner" style="width:${expPct}%;"></div>
                    </div>
                </div>
            </div>`;
        })
        .join("");
}

let _lastBattleListKey = "";
let _lastCorpseListKey = "";
function renderTibiaBattleAndCorpseLists(force = false) {
    const targetsPanel = document.getElementById("float-panel-targets");
    const corpsesPanel = document.getElementById("float-panel-corpses");
    const targetsHidden = targetsPanel && (targetsPanel.classList.contains("is-hidden") || targetsPanel.classList.contains("is-collapsed"));
    const corpsesHidden = corpsesPanel && (corpsesPanel.classList.contains("is-hidden") || corpsesPanel.classList.contains("is-collapsed"));
    if (targetsHidden && corpsesHidden) return;

    const tWinTitle = document.getElementById("targets-win-title");
    const cWinTitle = document.getElementById("corpses-win-title");
    const bList = document.getElementById("tibia-battle-list");
    const bCount = document.getElementById("battle-list-count");
    const cList = document.getElementById("tibia-corpse-list");
    const cCount = document.getElementById("corpse-list-count");

    // If inside the Central Social Hub (Saffron Plaza), display Online Players & City Stations!
    if (STATE.tibia.isCentralHub) {
        if (tWinTitle) tWinTitle.textContent = "JOGADORES ONLINE";
        if (cWinTitle) cWinTitle.textContent = "LOCAIS DA CENTRAL";
        const players = STATE.tibia.hubPlayers || [];
        if (bCount) bCount.textContent = `${players.length} online`;
        const hubKey = "hub_" + players.map((hp) => `${hp.id}_${STATE.tibia.selectedHubPlayerId === hp.id ? 1 : 0}`).join(",");
        if (bList && (force || hubKey !== _lastBattleListKey)) {
            _lastBattleListKey = hubKey;
            bList.innerHTML = players
                .map((hp) => {
                    const isSel = STATE.tibia.selectedHubPlayerId === hp.id;
                    const trainerAvatarUrl =
                        typeof getTrainerModelDataUrl === "function"
                            ? getTrainerModelDataUrl(hp.avatarModelId || "red_ash")
                            : getPmdPortraitUrl(hp.monSpecies);
                    return `<div class="battle-entry ${isSel ? "targeted" : ""}" onclick="selectHubPlayerOnMap('${hp.id}')">
                        <img class="battle-entry-sprite" src="${trainerAvatarUrl}" alt="${hp.name}">
                        <div style="flex:1;min-width:0;">
                            <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:800;color:${isSel ? "#7dd3fc" : "#f1f5f9"};">
                                <span>🟢 ${hp.name} <small style="color:#94a3b8;">Lv.${hp.level}</small></span>
                                <span style="color:#fde047;font-size:9.5px;">${hp.monShiny ? "✨ " : ""}${hp.monName}</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:3px;gap:4px;">
                                <span style="font-size:9.5px;color:#cbd5e1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${hp.roleLabel}</span>
                                <span style="font-size:9px;color:#38bdf8;font-weight:900;">🤝 Trocar ▸</span>
                            </div>
                        </div>
                    </div>`;
                })
                .join("");
        }

        const stations = STATE.tibia.hubStations || [];
        if (cCount) cCount.textContent = `${stations.length} locais`;
        const hubStationsKey = "hub_stations_" + stations.length;
        if (cList && (force || hubStationsKey !== _lastCorpseListKey)) {
            _lastCorpseListKey = hubStationsKey;
            cList.innerHTML = stations
                .map((st) => {
                    return `<div class="battle-entry" onclick="walkToAndTriggerHubStation('${st.id}')">
                        <div style="font-size:16px;width:24px;text-align:center;">${st.icon}</div>
                        <div style="flex:1;min-width:0;">
                            <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:800;color:#fde047;">
                                <span>${st.title}</span>
                                <span style="font-size:9px;color:#94a3b8;">[${st.padGx},${st.padGy}]</span>
                            </div>
                            <div style="font-size:9.5px;color:#cbd5e1;">${st.sub}</div>
                        </div>
                    </div>`;
                })
                .join("");
        }
        return;
    }

    if (tWinTitle) tWinTitle.textContent = "INIMIGOS";
    if (cWinTitle) cWinTitle.textContent = "CAPTURAR";

    // 1. Battle List Window
    if (bCount) bCount.textContent = `${STATE.tibia.monsters.length} inimigos`;
    const bKey = STATE.tibia.monsters.map((m) => `${m.uid}_${m.hp}_${m.uid === STATE.tibia.targetId ? 1 : 0}`).join(",");
    if (bList && (force || bKey !== _lastBattleListKey)) {
        _lastBattleListKey = bKey;
        bList.innerHTML = STATE.tibia.monsters
            .map((m) => {
                const isTarget = m.uid === STATE.tibia.targetId;
                const hpPct = Math.max(0, Math.min(100, (m.hp / m.max_hp) * 100));
                const hpCol = hpPct < 25 ? "#ef4444" : hpPct < 60 ? "#f59e0b" : "#10b981";
                const primEl = (m.elements && m.elements[0]) || "normal";
                const isCaught = STATE.player.pokedex_caught.includes(m.species_id);
                const portraitUrl = getPmdPortraitUrl(m.species_id || m.dex_id);
                const fallbackUrl = getSpriteUrl(m.dex_id, m.is_shiny);
                return `<div class="battle-entry ${isTarget ? "targeted" : ""}" onclick="setRedTarget('${m.uid}')">
                    <img class="battle-entry-sprite" src="${portraitUrl}" onerror="this.onerror=null;this.src='${fallbackUrl}';" alt="${m.name}">
                    <div style="flex:1;min-width:0;">
                        <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:800;color:${isTarget ? "#fca5a5" : "#f1f5f9"};">
                            <span style="display:flex;align-items:center;gap:4px;">
                                <img src="${getGen8TypeIconUrl(primEl)}" style="width:12px;height:12px;" alt="">
                                <span>${isTarget ? "🎯 " : ""}${m.is_shiny ? "✨ " : ""}${m.name}</span>
                                ${isCaught ? '<span class="mini-pokeball-dot" style="width:9px;height:9px;" title="Já registrado na Pokédex"></span>' : ""}
                            </span>
                            <span style="color:#ffe066;font-size:10px;">Lv.${m.level}</span>
                        </div>
                        <div class="tibia-hp-bar-outer">
                            <div class="tibia-hp-bar-inner" style="width:${hpPct}%;background:${hpCol};"></div>
                        </div>
                    </div>
                </div>`;
            })
            .join("");
    }

    // 2. Corpse Catch & Loot Window
    if (cCount) cCount.textContent = `${STATE.tibia.corpses.length} p/ capturar`;
    const selBallId = document.getElementById("autocap-ball")?.value || "capsule_ultra";
    const cKey = STATE.tibia.corpses.map((c) => `${c.uid}_${c.caught ? 1 : 0}_${(c.lootItems || []).length}`).join(",") + `_${selBallId}`;
    if (cList && (force || cKey !== _lastCorpseListKey)) {
        _lastCorpseListKey = cKey;
        if (STATE.tibia.corpses.length === 0) {
            cList.innerHTML = `<div style="font-size:11px;color:#64748b;text-align:center;padding:12px 4px;">Derrote um Pokémon selvagem na trilha para lançar a Pokébola e coletar os drops!</div>`;
        } else {
            const selCap = STATE.capsules.find((c) => c.id === selBallId) || getBasicCapsule();
            cList.innerHTML = STATE.tibia.corpses
                .map((corpse) => {
                    const chance = calcEffectiveBallChance(corpse, selCap, 0.05);
                    const lootHtml = (corpse.lootItems || [])
                        .map((li) => {
                            const itemMeta = STATE.itemsMap[li.item_id];
                            const iconHtml = itemMeta && itemMeta.icon_index > 0
                                ? getRmmzIconHtml(itemMeta.icon_index, "rmmz-icon-mini")
                                : `<img src="${li.sprite_url}" alt="${li.name}">`;
                            return `<div class="tibia-item-slot" title="${li.qty}x ${li.name}">
                                ${iconHtml}
                                <span class="tibia-item-qty">${li.qty}</span>
                            </div>`;
                        })
                        .join("");
                    return `<div class="corpse-card">
                        <div style="display:flex;justify-content:space-between;align-items:center;font-weight:800;color:#ffe066;">
                            <span style="display:flex;align-items:center;gap:5px;">
                                <img src="${getPmdPortraitUrl(corpse.species_id || corpse.dex_id)}" onerror="this.style.display='none'" style="width:20px;height:20px;border-radius:4px;image-rendering:pixelated;" alt="">
                                <span>${corpse.is_shiny ? "✨ " : ""}${corpse.name} (Lv.${corpse.level})</span>
                            </span>
                            <span style="font-size:9.5px;color:#38bdf8;font-weight:700;">Pronto p/ Captura</span>
                        </div>
                        <div class="corpse-loot-slots">${lootHtml || '<span style="font-size:10px;color:#64748b;">Sem drops extras</span>'}</div>
                        <div style="margin-top:6px;display:flex;gap:5px;">
                            ${
                                corpse.caught
                                    ? `<span style="color:#4ade80;font-weight:800;font-size:11px;">✅ Captura realizada!</span>`
                                    : corpse.isCatching
                                    ? `<button class="tibia-btn" style="width:100%;opacity:0.75;cursor:not-allowed;background:rgba(234,179,8,0.15);border-color:#eab308;color:#fde047;" disabled title="Apenas 1 pokébola pode ser usada por vez!">
                                        <span class="pulsing-radar-dot" style="width:6px;height:6px;background:#fde047;box-shadow:0 0 6px #fde047;display:inline-block;margin-right:4px;"></span>
                                        <span>⏳ Capturando (${corpse.activeBall || "Pokébola"})...</span>
                                       </button>`
                                    : `<button class="tibia-btn active-toggle" style="width:100%;" onclick="throwBallAtCorpse('${corpse.uid}', '${selCap.id}')">
                                        <span class="mini-pokeball-dot"></span>
                                        <span>Lançar ${selCap.name} (${chance.toFixed(0)}%)</span>
                                       </button>`
                            }
                        </div>
                    </div>`;
                })
                .join("");
        }
    }
}

// ====================================================
// 3. WORLDS & RESPAWN TELEPORTER
// ====================================================
function renderWorldsAndMap() {
    const container = document.getElementById("world-tabs-container");
    if (!container) return;
    container.innerHTML = STATE.worlds
        .map((w) => {
            const isLocked = w.locked && !STATE.player.has_master_key && !STATE.config.unlock_legendary_islands;
            const activeCls = w.id === STATE.activeWorldId ? "active" : "";
            const lockCls = isLocked ? "locked" : "";
            return `<button class="world-btn ${activeCls} ${lockCls}" onclick="selectWorld('${w.id}')">
                ${isLocked ? "🔒 " : ""}${w.label}<br>
                <span style="font-size:9.5px;font-weight:600;opacity:0.85;">Lv.${w.min_level}–${w.max_level}</span>
            </button>`;
        })
        .join("");

    // Render Active Region Illustrated Map Banner
    const bannerEl = document.getElementById("active-world-banner");
    const activeW = STATE.worlds.find((w) => w.id === STATE.activeWorldId) || STATE.worlds[0];
    if (bannerEl && activeW) {
        const wZones = STATE.zones.filter((z) => z.world === activeW.id);
        const caughtInRegion = wZones.filter((z) => STATE.player.pokedex_caught.includes(z.primary_species_id)).length;
        bannerEl.style.backgroundImage = `linear-gradient(90deg, rgba(7, 13, 22, 0.88) 0%, rgba(7, 13, 22, 0.35) 55%, rgba(7, 13, 22, 0.85) 100%), url('${activeW.map_url || "/img/maps/kanto.jpg"}')`;
        bannerEl.innerHTML = `
            <div>
                <div class="world-atlas-title">🗺️ Região de ${activeW.label}</div>
                <div class="world-atlas-sub">Nível recomendado: Lv.${activeW.min_level} – Lv.${activeW.max_level}</div>
            </div>
            <span class="world-atlas-dex">🔴 ${caughtInRegion}/${wZones.length} rotas</span>
        `;
    }
}

function selectWorld(worldId) {
    const w = STATE.worlds.find((x) => x.id === worldId);
    if (!w) return;
    const isLocked = w.locked && !STATE.player.has_master_key && !STATE.config.unlock_legendary_islands;
    if (isLocked) {
        showToast("🔒 Mundo bloqueado! Obtenha a Master Key (0.2% drop) ou desbloqueie na aba ⚙️ Admin!");
        return;
    }
    STATE.activeWorldId = worldId;
    const firstZone = STATE.zones.find((z) => z.world === worldId);
    if (firstZone) {
        STATE.activeZone = firstZone;
        buildRespawnMapAndMonsters();
    }
    renderAll();
}

function renderZoneList() {
    const q = (document.getElementById("zone-search-input")?.value || "").toLowerCase().trim();
    const worldZones = STATE.zones.filter((z) => {
        if (q) {
            return (
                (z.name || "").toLowerCase().includes(q) ||
                (z.primary_name || "").toLowerCase().includes(q) ||
                (z.world_label || "").toLowerCase().includes(q)
            );
        }
        return z.world === STATE.activeWorldId;
    });

    const badge = document.getElementById("zone-count-badge");
    if (badge) badge.textContent = `${worldZones.length} rotas`;

    const listEl = document.getElementById("zone-list-container");
    if (!listEl) return;
    listEl.innerHTML = worldZones
        .map((z) => {
            const isAct = STATE.activeZone && STATE.activeZone.id === z.id ? "active" : "";
            const sp = STATE.speciesById[z.primary_species_id] || {};
            const baseChance = calcEffectiveBallChance(sp, getBasicCapsule(), 0.05);
            const isCaught = STATE.player.pokedex_caught.includes(z.primary_species_id);
            const portraitUrl = getPmdPortraitUrl(z.primary_species_id || z.primary_dex_id);
            const fallbackUrl = getGbaFrontSprite(z.primary_dex_id, false);
            return `<div class="zone-item ${isAct}" onclick="selectZone('${z.id}')">
                <div class="zone-left">
                    <div class="zone-sprite-box">
                        <img class="zone-sprite" src="${portraitUrl}" onerror="this.onerror=null;this.src='${fallbackUrl}';" alt="${z.primary_name}" loading="lazy">
                        <span class="zone-dex-ball ${isCaught ? "is-caught" : ""}" title="${isCaught ? "Capturado na Pokédex" : "Ainda não capturado"}"></span>
                    </div>
                    <div>
                        <div class="zone-name">${z.name}</div>
                        <div class="zone-sub">Lv.${z.min_level} • Catch: <strong style="color:#4ade80;">${baseChance.toFixed(1)}%</strong></div>
                    </div>
                </div>
                <div>${renderTypeBadges(z.elements)}</div>
            </div>`;
        })
        .join("");
}

function selectZone(zoneId, skipAnimation = false) {
    const z = STATE.zones.find((x) => x.id === zoneId);
    if (!z) return;
    if (z.world_locked && !STATE.player.has_master_key && !STATE.config.unlock_legendary_islands) {
        showToast("🔒 Esta hunt pertence às Ilhas Lendárias! Desbloqueie na aba ⚙️ Admin.");
        return;
    }
    if (skipAnimation || (STATE.activeZone && STATE.activeZone.id === z.id && !STATE.tibia.isCentralHub)) {
        selectZoneInternal(z);
        return;
    }
    showTransitLoadscreen({
        destTitle: `${z.world_label} — ${z.name}`.toUpperCase(),
        modeTag: "✦ VIAJANDO PARA NOVA ROTA DE CAÇA ✦",
        pillMode: `🗺️ ${z.world_label}`,
        subText: `Área Selvagem • Nível ${z.min_level} a ${z.max_level || z.min_level} • Caça & Captura`,
        ballType: "great",
        durationMs: 720,
        onMiddle: () => {
            selectZoneInternal(z);
        },
    });
}

function selectZoneInternal(z) {
    STATE.tibia.isCentralHub = false;
    document.getElementById("menubtn-central")?.classList.remove("active");
    document.getElementById("float-panel-central")?.classList.add("is-hidden");
    STATE.activeWorldId = z.world;
    STATE.activeZone = z;
    buildRespawnMapAndMonsters();
    addCombatLog(`<span style="color:#38bdf8;">🧭 Teleportado para a rota: <strong>${z.world_label} — ${z.name} (Lv.${z.min_level})</strong>.</span>`);
    renderAll();
}

// ====================================================
// 4. TIBIA SPELL CASTING (m1-m4), CORPSES & CATCHING
// ====================================================
function getLeadPokemon() {
    if (!STATE.player.party || STATE.player.party.length === 0) return null;
    const alive = STATE.player.party.find((m) => m.hp > 0);
    return alive || STATE.player.party[0];
}

let _lastBattleArenaKey = "";
function renderBattleArena(force = false) {
    const lead = getLeadPokemon();
    syncWildEnemyPointer();
    if (!lead || !STATE.activeZone) return;

    const titleEl = document.getElementById("arena-zone-title");
    const modePillEl = document.getElementById("floating-route-mode-pill");
    const bannerBtnEl = document.getElementById("btn-banner-central");
    const infoEl = document.getElementById("target-base-rate-info");
    const zTypesEl = document.getElementById("arena-zone-types");

    if (STATE.tibia.activeChallenge) {
        const ch = STATE.tibia.activeChallenge;
        if (modePillEl) modePillEl.textContent = ch.chType === "gvg" ? "⚔️ GUERRA DE GUILDAS ▾" : "⚔️ DESAFIO DA LIGA ▾";
        if (titleEl) {
            titleEl.textContent = `${ch.title}: ${ch.sub}`;
        }
        if (bannerBtnEl) {
            bannerBtnEl.textContent = "🚪 Sair da Arena";
            bannerBtnEl.onclick = () => leaveChallengeArena();
        }
        if (infoEl) infoEl.textContent = `🎯 Alvo: ${ch.bossName || "Guardião da Arena"}`;
        if (zTypesEl) {
            zTypesEl.innerHTML = `<span style="background:#e11d48;color:#fff;font-weight:900;padding:2px 8px;border-radius:6px;font-size:10px;letter-spacing:0.5px;">${ch.chType === "gvg" ? "🏰 GV-G ARENA" : "⚔️ DESAFIO"}</span>`;
        }
    } else if (STATE.tibia.isCentralHub) {
        if (modePillEl) modePillEl.textContent = "🏙️ CIDADE CENTRAL ▾";
        if (titleEl) titleEl.textContent = "Saffron Plaza: Trocas, Evolução & Social (Zona Segura)";
        if (bannerBtnEl) bannerBtnEl.textContent = "🌀 Voltar p/ Caça";
        if (infoEl) infoEl.textContent = "👥 6 Treinadores Online na Praça";
        if (zTypesEl) zTypesEl.innerHTML = "";
    } else {
        if (modePillEl) modePillEl.textContent = "MAPA ATUAL ▾";
        if (titleEl) {
            titleEl.textContent = `${STATE.activeZone.world_label}: ${STATE.activeZone.name} (Lv. ${STATE.activeZone.min_level})`;
        }
        if (bannerBtnEl) bannerBtnEl.textContent = "🏙️ Ir p/ Central";
        if (zTypesEl) {
            zTypesEl.innerHTML = renderTypeIconsOnly(STATE.activeZone.elements);
        }
    }

    // Render Pokémon Fight Menu Move Plates (m1 - m4) with Auto-Moves Status & Active Cast Highlight
    const movesRow = document.getElementById("battle-moves-row");
    const arenaMovesKey = `${lead.uid || lead.id}_${(lead.moves || []).join(",")}_${STATE.autoMovesEnabled ? 1 : 0}_${STATE.activeCastingMoveIdx}_${JSON.stringify(STATE.autoMoveSlots)}`;
    if (movesRow && (force || arenaMovesKey !== _lastBattleArenaKey)) {
        _lastBattleArenaKey = arenaMovesKey;
        movesRow.innerHTML = (lead.moves || ["tackle"])
            .slice(0, 4)
            .map((mId, idx) => {
                const mv = STATE.movesMap[mId] || { id: mId, name: mId, element: lead.elements[0] || "normal", power: 55 };
                const elKey = String(mv.element || "normal").toLowerCase();
                const elInfo = ELEMENT_PT[elKey] || ELEMENT_PT.normal;
                const isAoE = (mv.power || 50) >= 65 || idx >= 2;
                const slotAutoOn = STATE.autoMovesEnabled && STATE.autoMoveSlots[idx] !== false;
                const isCasting = STATE.activeCastingMoveIdx === idx;
                return `<div id="move-plate-${idx}" class="hk-slot poke-move-plate ${isCasting ? "is-casting-now" : ""}" style="--move-color:${elInfo.bg};--move-glow:${elInfo.bg}44;" onclick="STATE.activeCastingMoveIdx=${idx};executeCombatTurn('${mId}', false, ${idx})">
                    <div class="move-plate-icon-wrap" title="Tipo: ${elInfo.label}">
                        <img src="${getGen8TypeIconUrl(elKey)}" alt="${elInfo.label}">
                    </div>
                    <div class="move-plate-body">
                        <div class="move-plate-top">
                            <span class="move-plate-name">${mv.name}</span>
                            <div style="display:flex;align-items:center;gap:4px;">
                                <span class="move-auto-chip ${slotAutoOn ? "" : "is-paused"}" onclick="toggleSingleMoveAuto(${idx}, event)" title="Clique para incluir/pausar este golpe no Auto-Moves">
                                    ${slotAutoOn ? "⚡ AUTO" : "MANUAL"}
                                </span>
                                <span class="move-plate-key">m${idx + 1}</span>
                            </div>
                        </div>
                        <div class="move-plate-sub">
                            <span>${elInfo.label} • PWR ${mv.power || 50}</span>
                            <span style="color:${isAoE ? "#fde047" : "#93c5fd"};">${isAoE ? "🔥 AoE 3×3" : "🎯 Alvo"}</span>
                        </div>
                    </div>
                    <div class="move-cd-bar-track">
                        <div class="move-cd-bar-fill" style="width:${isCasting ? "100%" : "0%"};"></div>
                    </div>
                </div>`;
            })
            .join("");
    }

    renderCapsuleDock(force);
}

function getBasicCapsule() {
    return STATE.capsules.find((c) => c.id === "capsule_basic") || { id: "capsule_basic", catch_multiplier: 1.0, compat_elements: [] };
}

function calcEffectiveBallChance(speciesOrEnemy, capsule, hpRatio = 0.05) {
    if (!speciesOrEnemy || !capsule) return 0;
    if (capsule.id === "capsule_master" || (capsule.catch_multiplier && capsule.catch_multiplier >= 255)) {
        return 100.0;
    }

    const q = (speciesOrEnemy.quality || "comum").toLowerCase();
    const rarityBaseChance = {
        comum: 52.0,
        incomum: 36.0,
        raro: 24.0,
        "épico": 14.0,
        epico: 14.0,
        "lendário": 6.5,
        lendario: 6.5,
        "mítico": 2.5,
        mitico: 2.5
    };
    let base = rarityBaseChance[q] ?? (speciesOrEnemy.base_capture_chance || 30.0);

    if (speciesOrEnemy.is_shiny) {
        base *= 0.85;
    }

    // HP modifier: lower HP gives dramatic boost (up to 3.8x at 0% / corpse)
    const safeHpRatio = Math.max(0, Math.min(1, hpRatio));
    const hpFactor = 1.0 + (1.0 - safeHpRatio) * 2.8;

    let ballMult = capsule.catch_multiplier || 1.0;
    const targetEls = speciesOrEnemy.elements || ["normal"];
    if (capsule.compat_elements && capsule.compat_elements.length > 0) {
        const matches = targetEls.some((el) => capsule.compat_elements.includes(el));
        if (matches) ballMult *= 1.8;
    }
    if (capsule.id === "capsule_repeat") {
        const sid = speciesOrEnemy.species_id || speciesOrEnemy.id;
        if (STATE.player && STATE.player.pokedex_caught && STATE.player.pokedex_caught.includes(sid)) {
            ballMult *= 2.5;
        }
    }

    // Trainer Level vs Target Level Delta
    const trLevel = (STATE.player && STATE.player.level) || 1;
    const monLevel = speciesOrEnemy.level || 1;
    const delta = trLevel - monLevel;
    let levelFactor = 1.0;
    if (delta >= 0) {
        levelFactor += Math.min(0.35, delta * 0.012);
    } else {
        levelFactor = Math.max(0.20, 1.0 + delta * 0.025);
    }

    const srvMult = (STATE.config && STATE.config.catch_rate_mult) || 1.0;
    const maxCap = (STATE.config && STATE.config.max_capture_cap) || 98.0;

    const raw = base * hpFactor * ballMult * levelFactor * srvMult;
    return Math.min(maxCap, Math.max(1.0, Math.round(raw * 10) / 10));
}

let _lastCapsuleDockKey = "";
function renderCapsuleDock(force = false) {
    const refTarget = STATE.tibia.corpses.find((c) => !c.caught) || STATE.wildEnemy || STATE.speciesById[STATE.activeZone?.primary_species_id];
    const infoEl = document.getElementById("target-base-rate-info");
    if (infoEl) {
        if (STATE.tibia.isCentralHub) {
            infoEl.textContent = "";
        } else if (refTarget && STATE.tibia.targetId) {
            const chanceBase = (refTarget.base_capture_chance ?? 17.65);
            infoEl.textContent = `🎯 Alvo: ${refTarget.name} (${chanceBase.toFixed(0)}%)`;
        } else {
            infoEl.textContent = "";
        }
    }

    const dock = document.getElementById("battle-capsule-dock");
    if (!dock) return;

    const targetKey = `${STATE.tibia.targetId || ""}_${refTarget ? (refTarget.uid || refTarget.id || refTarget.name) : ""}`;
    const invKey = (STATE.capsules || []).map((c) => `${c.id}:${STATE.player.inventory[c.id] || 0}`).join(",");
    const hubKey = STATE.tibia.isCentralHub ? "1" : "0";
    const configKey = STATE.config.unlock_all_capsules ? "1" : "0";
    const dockKey = `${targetKey}|${hubKey}|${configKey}|${invKey}`;

    if (!force && dockKey === _lastCapsuleDockKey) {
        return;
    }
    _lastCapsuleDockKey = dockKey;

    const availableCaps = STATE.capsules.filter((c) => {
        const qty = STATE.player.inventory[c.id] || 0;
        return qty > 0 || c.active_in_live || STATE.config.unlock_all_capsules;
    });

    dock.innerHTML = availableCaps
        .map((c, idx) => {
            const qty = STATE.player.inventory[c.id] || 0;
            const chance = refTarget ? calcEffectiveBallChance(refTarget, c, 0.05) : 0;
            const color = chance >= 98 ? "#4ade80" : chance >= 60 ? "#60a5fa" : chance >= 25 ? "#fde047" : "#f87171";
            const svgUri = getPixelBallSvgDataUri(c.id);
            const ballSprite = c.sprite_url || svgUri;
            const chanceRating = chance >= 98 ? "Garantida" : chance >= 60 ? "Alta" : chance >= 25 ? "Média" : "Baixa";
            return `<div class="hk-slot poke-ball-slot" onclick="throwCapsule('${c.id}')" title="${c.name} - ${c.cond_label} (${chance.toFixed(1)}% chance)" style="${qty <= 0 ? "opacity:0.45;" : ""}">
                <div class="ball-slot-icon-box">
                    <img class="pixel-item-icon" src="${ballSprite || svgUri}" onerror="this.onerror=null;this.src='/img/items/poke-ball.png';" alt="${c.name}" style="width:24px;height:24px;image-rendering:pixelated;">
                    <span class="ball-slot-qty">×${qty}</span>
                </div>
                <div style="flex:1;min-width:0;">
                    <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:900;color:#fff;">
                        <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.name}</span>
                        
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;font-size:10px;margin-top:2px;gap:6px;">
                        <span style="color:#94a3b8;font-size:9px;">${chanceRating}</span>
                        <strong style="color:${color};font-size:10px;">${chance.toFixed(0)}%</strong>
                    </div>
                </div>
            </div>`;
        })
        .join("");
}

function getTypeEffectiveness(moveEl, defenderEls) {
    let mult = 1.0;
    const chart = TYPE_CHART[moveEl] || {};
    for (const dEl of defenderEls || []) {
        if (chart[dEl] !== undefined) mult *= chart[dEl];
    }
    return mult;
}

function executeCombatTurn(moveId, isSilentAutoSwing = false, pickIdx = -1) {
    const lead = getLeadPokemon();
    if (!lead) return;
    if (lead.hp <= 0) {
        healFullParty();
        return;
    }

    const tr = STATE.tibia.trainer;
    const MAX_COMBAT_DIST = 2.2; // Attacks strictly limited to targets near the trainer (<= 2.2 SQMs)

    // Check targeted monster or sync to nearest near-trainer enemy
    let primaryTarget = STATE.tibia.monsters.find((m) => m.uid === STATE.tibia.targetId && m.hp > 0);
    if (!primaryTarget) {
        syncWildEnemyPointer();
        primaryTarget = STATE.wildEnemy;
    }

    // Strict proximity requirement: Attacks can ONLY strike targets near the trainer!
    if (!primaryTarget || Math.hypot(tr.gx - primaryTarget.gx, tr.gy - primaryTarget.gy) > MAX_COMBAT_DIST) {
        if (!isSilentAutoSwing) {
            showToast("⚠️ O Pokémon alvo não está perto do Treinador! Aproxime-se para atacar.");
            const anyTarget = STATE.tibia.monsters.find((m) => m.uid === STATE.tibia.targetId);
            if (anyTarget && typeof spawnFloatingText === "function") {
                spawnFloatingText(anyTarget.gx, anyTarget.gy, "❌ Fora de Alcance!", "#ef4444");
            }
        }
        return; // HARD STOP - DO NOT ATTACK DISTANT TARGETS!
    }

    STATE.wildEnemy = primaryTarget;
    STATE.tibia.targetId = primaryTarget.uid;

    const mv = STATE.movesMap[moveId] || { name: "Tackle", element: lead.elements[0] || "normal", power: 55 };
    const elInfo = ELEMENT_PT[mv.element] || ELEMENT_PT.normal;
    const pwr = Math.max(35, mv.power || 55);
    const isAoE = pwr >= 65 && !isSilentAutoSwing;

    if (!isSilentAutoSwing) {
        setTrainerSpeech(`${lead.name}, use ${mv.name}!`);
    }

    // Spawn Tibia SQM Tile Spell Effect around Primary Target (3x3 AoE or 1x1 Target)
    const sum = STATE.tibia.summon;
    sum.attackTicks = 22; // Trigger lively PMD Attack Sheet & forward lunge
    if (Math.abs(primaryTarget.gx - sum.gx) >= Math.abs(primaryTarget.gy - sum.gy)) {
        sum.dir = primaryTarget.gx >= sum.gx ? 2 : 1;
    } else {
        sum.dir = primaryTarget.gy >= sum.gy ? 0 : 3;
    }

    const centerGx = primaryTarget.gx;
    const centerGy = primaryTarget.gy;
    const radius = isAoE ? 1 : 0;

    // Trigger Dynamic Elemental Move Visual Effects
    spawnSpellVfx(mv.element, sum.gx, sum.gy, centerGx, centerGy, mv, isAoE);

    for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
            const tx = centerGx + dx;
            const ty = centerGy + dy;
            if (tx >= 1 && tx < GRID_COLS - 1 && ty >= 1 && ty < GRID_ROWS - 1) {
                STATE.tibia.tileEffects.push({
                    gx: tx,
                    gy: ty,
                    color: elInfo.spellColor,
                    life: 16,
                    maxLife: 16,
                });
            }
        }
    }

    // Apply Damage to Target (and nearby monsters if AoE!)
    const hitMonsters = STATE.tibia.monsters.filter((m) => {
        const dist = Math.max(Math.abs(m.gx - centerGx), Math.abs(m.gy - centerGy));
        return dist <= radius;
    });

    const defeatedList = [];
    for (const mon of hitMonsters) {
        mon.hitFlinchTicks = 16; // Trigger PMD Hurt Sheet & recoil flinch shake
        const stab = (lead.elements || []).includes(mv.element) ? 1.25 : 1.0;
        const eff = getTypeEffectiveness(mv.element, mon.elements || ["normal"]);
        const leadAtk = Math.max(lead.stats?.atk || 50, lead.stats?.spa || 50);
        const monDef = Math.max(10, mon.def || mon.stats?.def || 30);
        const rawDmg = (((2 * (lead.level || 50)) / 5 + 2) * (pwr || 40) * (leadAtk / monDef)) / 32 + 6;
        const dmg = Math.max(1, Math.floor((rawDmg || 25) * stab * (eff || 1.0) * (0.9 + Math.random() * 0.2)));

        mon.hp = Math.max(0, mon.hp - dmg);
        spawnFloatingText(mon.gx, mon.gy, `${dmg}`, eff > 1 ? "#fde047" : "#ff3333");

        if (mv.effect_kind === "drain") {
            const heal = Math.max(1, Math.floor(dmg * 0.35));
            lead.hp = Math.min(lead.max_hp, lead.hp + heal);
            spawnFloatingText(sum.gx, sum.gy, `+${heal}`, "#4ade80");
        }

        if (mon.hp <= 0) {
            defeatedList.push(mon);
        }
    }

    // Process Defeated Monsters -> Turn into Fainted Corpses on the SQM Floor!
    for (const deadMon of defeatedList) {
        handleMonsterKilledToCorpse(deadMon);
    }

    syncWildEnemyPointer();
    renderBattleArena();
    renderTibiaPokebar();
    renderTibiaBattleAndCorpseLists();
    renderCapsuleDock();
}

function handleMonsterKilledToCorpse(enemy) {
    // If inside a Challenge Arena (GvG, Gym, etc.), handle special victory flow instead of corpse loot!
    if (STATE.tibia.activeChallenge) {
        const ch = STATE.tibia.activeChallenge;
        handleChallengeVictory(ch, enemy);
        return;
    }

    // Remove from active monsters list
    STATE.tibia.monsters = STATE.tibia.monsters.filter((m) => m.uid !== enemy.uid);

    const baseExp = enemy.base_exp_yield || (STATE.speciesById?.[enemy.species_id]?.base_exp) || 45;
    const baseGold = enemy.gold_yield || (STATE.speciesById?.[enemy.species_id]?.gold_yield) || 12;
    const qKey = (enemy.quality || "comum").toLowerCase();
    const rarityExpMults = { comum: 1.0, incomum: 1.35, raro: 1.85, "épico": 2.6, epico: 2.6, "lendário": 4.5, lendario: 4.5, "mítico": 7.0, mitico: 7.0 };
    const rMult = rarityExpMults[qKey] || 1.0;
    const shinyMult = enemy.is_shiny ? 2.5 : 1.0;
    // Option A Calibrated Monster Yields
    const expGain = Math.max(12, Math.floor((20 + (enemy.level || 1) * 14 + Math.pow(enemy.level || 1, 1.15) * 4) * rMult * shinyMult * (STATE.config?.exp_mult || 1.0)));
    const goldGain = Math.max(1, Math.floor((2 + (enemy.level || 1) * 0.95 + Math.pow(enemy.level || 1, 1.1) * 0.25) * rMult * shinyMult * (STATE.config?.gold_mult || 1.0)));

    STATE.player.stats.total_kills = (STATE.player.stats.total_kills || 0) + 1;
    STATE.player.exp += Math.floor(expGain * 0.4);
    while (STATE.player.exp >= STATE.player.exp_next && STATE.player.level < 100) {
        STATE.player.exp -= STATE.player.exp_next;
        STATE.player.level += 1;
        STATE.player.exp_next = getTrainerNextExp(STATE.player.level);
        if (STATE.player.level === 100) {
            triggerGlobalGoldenBroadcast(
                "🏆 MESTRE TREINADOR: NÍVEL 100!",
                `O Treinador <strong>${STATE.player.name || "Red"}</strong> alcançou o lendário NÍVEL MÁXIMO 100!`,
                "crown",
                "gold"
            );
        }
    }

    spawnFloatingText(STATE.tibia.summon.gx, STATE.tibia.summon.gy, `+${expGain} EXP`, "#38bdf8");
    spawnFloatingText(enemy.gx, enemy.gy, `+${goldGain} Gold`, "#facc15");

    // Grant EXP to Lead & Party (Option A Cap at Lv 100)
    for (let i = 0; i < STATE.player.party.length; i++) {
        const mon = STATE.player.party[i];
        const share = i === 0 ? expGain : Math.floor(expGain * 0.5);
        mon.exp += share;
        while (mon.exp >= mon.exp_next && mon.level < 100) {
            mon.exp -= mon.exp_next;
            levelUpPokemon(mon, 1);
        }
    }

    // Generate Corpse Loot Items
    const lootItems = [
        {
            item_id: "gold_coin",
            name: "Gold Coins",
            qty: goldGain,
            sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png",
        },
    ];
    if (STATE.tibia.autoLoot) {
        STATE.player.gold += goldGain;
    }

    const droppedNames = [`${goldGain} gold coins`];
    for (const d of enemy.drops || []) {
        const effChance = (d.chance || 0.2) * (STATE.config.drop_mult || 1.0);
        if (Math.random() < effChance) {
            const qty = (d.min_qty || 1) + Math.floor(Math.random() * Math.max(1, (d.max_qty || 1) - (d.min_qty || 1) + 1));
            const itemObj = STATE.itemsMap[d.item_id] || { name: d.item_id };
            lootItems.push({
                item_id: d.item_id,
                name: itemObj.name,
                qty,
                sprite_url: itemObj.sprite_url || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/stardust.png",
            });
            if (STATE.tibia.autoLoot) {
                let wasDropSold = false;
                if (typeof checkAndExecuteAutoSellDrop === "function") {
                    wasDropSold = checkAndExecuteAutoSellDrop(d.item_id, qty);
                }
                if (!wasDropSold) {
                    STATE.player.inventory[d.item_id] = (STATE.player.inventory[d.item_id] || 0) + qty;
                }
            }
            droppedNames.push(`${qty}x ${itemObj.name}`);
        }
    }

    // 0.2% Master Key drop check
    if (!STATE.player.has_master_key && Math.random() < 0.002 * (STATE.config.drop_mult || 1.0)) {
        STATE.player.has_master_key = true;
        addCombatLog(`<span style="color:#f472b6;font-weight:900;">🔑 DROP MÍTICO NO CORPO! Você encontrou a MASTER KEY!</span>`);
        showToast("🔑 Master Key dropada! Ilhas Lendárias desbloqueadas!");
    }

    // Create Fainted Corpse on that SQM tile!
    const corpseObj = {
        uid: "corpse_" + Math.random().toString(36).substring(2, 9),
        species_id: enemy.species_id,
        dex_id: enemy.dex_id,
        name: enemy.name,
        level: enemy.level,
        is_shiny: enemy.is_shiny,
        elements: enemy.elements,
        base_capture_chance: enemy.base_capture_chance,
        catch_rate: enemy.catch_rate,
        gx: enemy.gx,
        gy: enemy.gy,
        lootItems,
        caught: false,
        createdAt: Date.now(),
    };
    STATE.tibia.corpses.unshift(corpseObj);

    // Classic Tibia Green Loot Message in Server Log!
    addCombatLog(`<span style="color:#4ade80;">Loot of a wild ${enemy.is_shiny ? "Shiny " : ""}${enemy.name} (Lv.${enemy.level}): ${droppedNames.join(", ")}.</span>`);

    // Check if Auto-Catch should automatically throw a Pokéball at this fresh corpse!
    if (STATE.autoCatchEnabled && typeof matchesAutoCatchFilter === "function" && matchesAutoCatchFilter(corpseObj)) {
        setTimeout(() => {
            if (!corpseObj.isCatching && !corpseObj.caught) {
                executeAutoCatchOnCorpse(corpseObj);
            }
        }, 140);
    }

    // Debounce save state to avoid main thread JSON serialization freezing combat
    scheduleStateSave(1500);
    renderHud();
}

function throwCapsule(capsuleId, fromAuto = false) {
    // In PokéTibia, only 1 Pokéball can be used at a time to a single knocked out Pokémon!
    // Priority 1: Check for an available knocked out Pokémon without an active ball in progress
    const idleCorpse = STATE.tibia.corpses.find((c) => !c.caught && !c.isCatching);
    if (idleCorpse) {
        return throwBallAtCorpse(idleCorpse.uid, capsuleId, fromAuto);
    }

    // If there is a knocked out Pokémon that currently has a Pokéball in progress:
    const busyCorpse = STATE.tibia.corpses.find((c) => !c.caught && c.isCatching);
    if (busyCorpse) {
        if (!fromAuto) {
            showToast(`⚠️ Já há uma Pokébola sendo usada em ${busyCorpse.name}! Apenas 1 pokébola pode ser usada por vez.`);
            if (typeof spawnFloatingText === "function") spawnFloatingText(busyCorpse.gx, busyCorpse.gy, "⏳ 1 por vez!", "#facc15");
        }
        return false;
    }

    if (!fromAuto) showToast("ℹ️ Derrote um Pokémon selvagem para usar a Pokébola em seu corpo nocauteado!");
    return false;
}

function throwBallAtCorpse(corpseUid, capsuleId, fromAuto = false) {
    const corpse = STATE.tibia.corpses.find((c) => c.uid === corpseUid);
    if (!corpse) return false;

    // Safety watchdog: auto-release if previous attempt was hanging for > 6s
    if (corpse.isCatching && corpse.catchStartTime && (Date.now() - corpse.catchStartTime > 6000)) {
        corpse.isCatching = false;
        corpse.activeBall = null;
    }

    // RULE: Only 1 Pokéball can be used at a time to a single knocked out Pokémon!
    if (corpse.isCatching) {
        if (!fromAuto) {
            showToast(`⚠️ Já há uma Pokébola sendo usada em ${corpse.name}! Apenas 1 pokébola pode ser usada por vez.`);
            if (typeof spawnFloatingText === "function") spawnFloatingText(corpse.gx, corpse.gy, "⏳ 1 por vez!", "#facc15");
        }
        return false;
    }
    if (corpse.caught) {
        if (!fromAuto) showToast(`✅ ${corpse.name} já foi capturado com sucesso!`);
        return false;
    }

    const tr = STATE.tibia.trainer;
    const catchDist = Math.hypot(tr.gx - corpse.gx, tr.gy - corpse.gy);
    const MAX_CATCH_DIST = 3.6;
    if (catchDist > MAX_CATCH_DIST) {
        if (!fromAuto) {
            showToast("⚠️ Alvo muito distante! Aproxime-se a menos de 3 SQMs para capturar.");
            if (typeof spawnFloatingText === "function") spawnFloatingText(corpse.gx, corpse.gy, "❌ Muito Longe!", "#ef4444");
        }
        return false;
    }

    const cap = STATE.capsules.find((c) => c.id === capsuleId) || getBasicCapsule();
    const qty = STATE.player.inventory[cap.id] || 0;
    if (qty <= 0) {
        if (!fromAuto) showToast(`❌ Você não tem ${cap.name}! Compre no Trade NPC.`);
        return false;
    }

    const chancePct = calcEffectiveBallChance(corpse, cap, 0.02);
    if (chancePct <= 0) {
        if (!fromAuto) showToast(`⚠️ ${cap.name} é incompatível com ${corpse.name}!`);
        return false;
    }

    // Exclusively lock this knocked out Pokémon for this single Pokéball attempt!
    corpse.isCatching = true;
    corpse.activeBall = cap.name;
    corpse.catchStartTime = Date.now();
    STATE.player.inventory[cap.id] = qty - 1;
    const roll = Math.random() * 100;
    const isSuccess = roll <= chancePct;

    setTrainerSpeech(`Go, ${cap.name}!`);

    // Launch Flying Pokéball Projectile from Trainer to Corpse SQM!
    STATE.tibia.projectiles.push({
        startX: tr.px + 24,
        startY: tr.py + 18,
        endX: corpse.gx * SQM_SIZE + 24,
        endY: corpse.gy * SQM_SIZE + 24,
        progress: 0,
        speed: 0.08,
        holdFrames: 34,
        spriteUrl: cap.sprite_url || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
        onArrive: () => {
            spawnFloatingText(corpse.gx, corpse.gy, "1.. 2.. 3..", "#fde047");
        },
        onComplete: () => {
            finalizeTibiaCapture(corpse, cap, chancePct, roll, isSuccess);
        },
    });

    renderTibiaBattleAndCorpseLists();
    renderCapsuleDock();
    return isSuccess;
}

function throwBallAtTargetMonster(mon, capsuleId, fromAuto = false) {
    const tr = STATE.tibia.trainer;
    const catchDist = Math.hypot(tr.gx - mon.gx, tr.gy - mon.gy);
    const MAX_CATCH_DIST = 3.6;
    if (catchDist > MAX_CATCH_DIST) {
        if (!fromAuto) {
            showToast("⚠️ Alvo muito distante! Aproxime-se a menos de 3 SQMs para capturar.");
            if (typeof spawnFloatingText === "function") spawnFloatingText(mon.gx, mon.gy, "❌ Muito Longe!", "#ef4444");
        }
        return false;
    }
    const cap = STATE.capsules.find((c) => c.id === capsuleId) || getBasicCapsule();
    const qty = STATE.player.inventory[cap.id] || 0;
    if (qty <= 0) {
        if (!fromAuto) showToast(`❌ Você não tem ${cap.name}!`);
        return false;
    }
    const hpRatio = mon.hp / mon.max_hp;
    const chancePct = calcEffectiveBallChance(mon, cap, hpRatio);
    if (chancePct <= 0) {
        if (!fromAuto) showToast(`⚠️ ${cap.name} é incompatível com ${mon.name}!`);
        return false;
    }

    STATE.player.inventory[cap.id] = qty - 1;
    const roll = Math.random() * 100;
    const isSuccess = roll <= chancePct;

    STATE.tibia.projectiles.push({
        startX: tr.px + 24,
        startY: tr.py + 18,
        endX: mon.gx * SQM_SIZE + 24,
        endY: mon.gy * SQM_SIZE + 24,
        progress: 0,
        speed: 0.09,
        holdFrames: 30,
        spriteUrl: cap.sprite_url || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
        onComplete: () => {
            if (isSuccess) {
                STATE.tibia.monsters = STATE.tibia.monsters.filter((m) => m.uid !== mon.uid);
            }
            finalizeTibiaCapture(mon, cap, chancePct, roll, isSuccess);
        },
    });
    renderCapsuleDock();
    return isSuccess;
}

function finalizeTibiaCapture(targetInfo, cap, chancePct, roll, isSuccess) {
    if (isSuccess) {
        // Success: Mark as caught, release lock, and remove from the floor
        targetInfo.caught = true;
        targetInfo.isCatching = false;
        STATE.tibia.corpses = STATE.tibia.corpses.filter((c) => c.uid !== targetInfo.uid);
        const sp = STATE.speciesById[targetInfo.species_id];
        const qualities = ["Comum", "Incomum", "Raro", "Épico", "Lendário", "Mítico"];
        // Option A Rarity Rates:
        // Normal: Comum 68%, Incomum 22%, Raro 7.5%, Épico 2.0%, Lendário 0.48%, Mítico 0.02% (1 in 5,000)
        // Shiny: Comum 0%, Incomum 15%, Raro 40%, Épico 30%, Lendário 12%, Mítico 3%
        // Shinies NEVER spawn or are caught below Épico! (Comum 0%, Incomum 0%, Raro 0%, Épico 72%, Lendário 23%, Mítico 5%)
        const normalWeights = [0.68, 0.22, 0.075, 0.02, 0.0048, 0.0002];
        const shinyWeights = [0.0, 0.0, 0.0, 0.72, 0.23, 0.05];
        const activeWeights = targetInfo.is_shiny ? shinyWeights : normalWeights;

        let qPick = "Comum";
        let r = Math.random();
        for (let i = 0; i < qualities.length; i++) {
            if (r < activeWeights[i]) {
                qPick = qualities[i];
                break;
            }
            r -= activeWeights[i];
        }
        if (!qPick) qPick = targetInfo.is_shiny ? "Épico" : "Comum";
        const newMon = createClientPokemonInstance(sp, targetInfo.level, targetInfo.is_shiny, qPick);
        const gradeInfo = classifyMythicalGrade(newMon);

        // Global Golden Broadcast for Ultra-Rare Catches & Shinies
        if (qPick === "Mítico") {
            triggerGlobalGoldenBroadcast(
                "👑 DROP MÍTICO ABSOLUTO (0.02%)!",
                `O Treinador <strong>${STATE.player.name || "Red"}</strong> realizou uma proeza milagrosa e capturou um <strong>${targetInfo.name} MÍTICO</strong>! (1 em 5.000 capturas)`,
                "crown",
                "mythic"
            );
        } else if (qPick === "Lendário") {
            triggerGlobalGoldenBroadcast(
                "🌟 CAPTURA LENDÁRIA (0.48%)!",
                `O Treinador <strong>${STATE.player.name || "Red"}</strong> capturou um majestoso <strong>${targetInfo.name} Lendário</strong>!`,
                "star",
                "legendary"
            );
        } else if (qPick === "Épico") {
            triggerGlobalGoldenBroadcast(
                "🔮 CAPTURA ÉPICA (2.0%)!",
                `O Treinador <strong>${STATE.player.name || "Red"}</strong> encontrou e capturou um <strong>${targetInfo.name} Épico</strong>!`,
                "sparkles",
                "epic"
            );
        }
        if (targetInfo.is_shiny) {
            triggerGlobalGoldenBroadcast(
                "✨ SHINY DOURADO CAPTURADO!",
                `O Treinador <strong>${STATE.player.name || "Red"}</strong> capturou um raríssimo <strong>✨ ${targetInfo.name} SHINY (${qPick})</strong>!`,
                "sparkles",
                "shiny"
            );
        }

        if (!STATE.player.pokedex_caught.includes(targetInfo.species_id)) {
            STATE.player.pokedex_caught.push(targetInfo.species_id);
        }
        STATE.player.stats.total_captures = (STATE.player.stats.total_captures || 0) + 1;

        // Auto-Sell Pokémon Engine
        let wasAutoSold = false;
        if (typeof checkAndExecuteAutoSellPokemon === "function") {
            wasAutoSold = checkAndExecuteAutoSellPokemon(newMon);
        }

        if (!wasAutoSold) {
            if (STATE.player.party.length < 6) {
                STATE.player.party.push(newMon);
            } else {
                STATE.player.pc_box.push(newMon);
            }
        }

        spawnFloatingText(targetInfo.gx, targetInfo.gy, "GOTCHA! ✨", "#4ade80");
        spawnPokePixelCombatPopup(targetInfo.gx, targetInfo.gy, "GOTCHA! 🌟", "heal");
        spawnPokePixelCaptureVFX(targetInfo.gx, targetInfo.gy, cap.id, true);
        addCombatLog(`<span style="color:#4ade80;font-weight:900;">🎯 [CATCH SUCCESS] Você capturou ${targetInfo.is_shiny ? "✨ SHINY " : ""}${targetInfo.name} (Lv.${targetInfo.level} • ${gradeInfo.gradeLabel}) com ${cap.name}!</span>`);
        showToast(`🎯 ${targetInfo.name} capturado (${gradeInfo.shortLabel})!`);
    } else {
        // Fail: Release the single-ball lock so another attempt can be made (strictly 1 at a time)
        targetInfo.isCatching = false;
        targetInfo.activeBall = null;
        targetInfo.caught = false;
        spawnFloatingText(targetInfo.gx, targetInfo.gy, "BROKE FREE!", "#f87171");
        spawnPokePixelCombatPopup(targetInfo.gx, targetInfo.gy, "BROKE FREE! 💥", "miss");
        spawnPokePixelCaptureVFX(targetInfo.gx, targetInfo.gy, cap.id, false);
        addCombatLog(`<span style="color:#fb923c;">💨 [CATCH FAIL] ${targetInfo.name} escapou da ${cap.name} (Chance: ${chancePct.toFixed(1)}% | Roll: ${roll.toFixed(1)}%). O Pokémon continua nocauteado para nova tentativa (1 por vez)!</span>`);
        showToast(`💨 ${targetInfo.name} escapou da ${cap.name}! Você pode tentar novamente.`);
    }

    scheduleStateSave(1500);
    renderAll();
}

// ====================================================
// CENTRAL DE AUTO-FARM ENGINE (HUNT, ATTACK, CATCH, LOOT)
// ====================================================

function toggleAutoFarmMenu() {
    const panelId = document.getElementById("float-panel-autofarm") ? "float-panel-autofarm" : "float-panel-automation";
    toggleFloatingMenu(panelId, "menubtn-autofarm");
    syncAutoFarmUi();
}


// ====================================================
// CENTRAL DE AUTO-FARM ENGINE: NOVAS REGRAS & MÓDULOS
// (Auto-Caça, Auto-Ataque, Auto-Captura, Auto-Loot,
//  Auto-Cura, Auto-Reviver, Auto-Venda Pokémon, Auto-Venda Drops)
// ====================================================

STATE.autoHealEnabled = false;
STATE.autoHealThreshold = 0.50;
STATE.autoHealPreference = "best";
STATE.autoReviveEnabled = false;
STATE.autoRevivePreference = "best";
STATE.autoSellPokemonEnabled = false;
STATE.autoSellPokemonFilter = "common_only";
STATE.autoSellKeepNewDex = true;
STATE.autoSellDropsEnabled = false;
STATE._lastAutoHealTime = 0;
STATE._lastAutoReviveTime = 0;

function toggleAutoHeal(forceVal) {
    if (typeof forceVal === "boolean") {
        STATE.autoHealEnabled = forceVal;
    } else {
        STATE.autoHealEnabled = !STATE.autoHealEnabled;
    }
    syncAutoFarmUi();
    syncAutoFarmSurvivalUi();
    saveAutoFarmPreferences();
    showToast(STATE.autoHealEnabled ? "🩹 Auto-Cura ATIVADA (Usará poções ao atingir vida baixa)!" : "⚪ Auto-Cura DESATIVADA.");
}

function changeAutoHealThreshold(val) {
    STATE.autoHealThreshold = parseFloat(val) || 0.50;
    saveAutoFarmPreferences();
    const pct = Math.round(STATE.autoHealThreshold * 100);
    showToast(`🩹 Limiar de Auto-Cura definido para < ${pct}% HP.`);
}

function changeAutoHealPreference(val) {
    STATE.autoHealPreference = val || "best";
    saveAutoFarmPreferences();
    showToast(`🩹 Poção de Auto-Cura: ${STATE.autoHealPreference === "best" ? "Melhor Disponível" : "Mais Econômica"}.`);
}

function checkAndExecuteAutoHeal() {
    if (!STATE.autoHealEnabled) return false;
    const lead = (typeof getLeadPokemon === "function") ? getLeadPokemon() : null;
    if (!lead || lead.hp <= 0) return false;

    const threshold = STATE.autoHealThreshold || 0.50;
    const hpRatio = lead.hp / lead.max_hp;
    if (hpRatio > threshold) return false;

    const now = Date.now();
    if (now - (STATE._lastAutoHealTime || 0) < 1200) return false;

    const inv = STATE.player?.inventory || {};
    const pref = STATE.autoHealPreference || "best";

    const potionTiers = [
        { id: "potion_max", name: "Max Potion", healPct: 1.0 },
        { id: "potion_full", name: "Restauração Total", healPct: 1.0 },
        { id: "potion_ultimate", name: "Ultimate Potion", healPct: 0.8 },
        { id: "potion_hyper", name: "Hyper Potion", healPct: 0.6 },
        { id: "potion_ultra", name: "Ultra Potion", healPct: 0.45 },
        { id: "potion_great", name: "Great Potion", healPct: 0.35 },
        { id: "potion_small", name: "Small Potion", healPct: 0.25 },
        { id: "potion", name: "Poção Básica", healPct: 0.25 }
    ];

    let chosen = null;
    if (pref === "cheap") {
        for (let i = potionTiers.length - 1; i >= 0; i--) {
            if ((inv[potionTiers[i].id] || 0) > 0) {
                chosen = potionTiers[i];
                break;
            }
        }
    } else {
        for (const pt of potionTiers) {
            if ((inv[pt.id] || 0) > 0) {
                chosen = pt;
                break;
            }
        }
    }

    if (!chosen) {
        if (now - (STATE._lastOutOfPotionsToast || 0) > 20000) {
            STATE._lastOutOfPotionsToast = now;
            showToast("⚠️ Auto-Cura: Você não possui poções na bolsa! Compre no PokéMart.");
        }
        return false;
    }

    inv[chosen.id] -= 1;
    if (inv[chosen.id] <= 0) delete inv[chosen.id];

    STATE._lastAutoHealTime = now;
    const healAmt = Math.max(25, Math.min(lead.max_hp - lead.hp, Math.floor(lead.max_hp * chosen.healPct)));
    lead.hp = Math.min(lead.max_hp, lead.hp + healAmt);

    const sum = STATE.tibia?.summon || { gx: 10, gy: 10 };
    if (typeof spawnFloatingText === "function") {
        spawnFloatingText(sum.gx, sum.gy, `+${healAmt} HP`, "#4ade80");
    }
    if (typeof spawnPokePixelCombatPopup === "function") {
        spawnPokePixelCombatPopup(sum.gx, sum.gy, "AUTO-CURA! 🧪", "heal");
    }
    if (typeof addCombatLog === "function") {
        addCombatLog(`<span style="color:#4ade80;font-weight:800;">🧪 [AUTO-CURA] Usou ${chosen.name} em ${lead.name} (+${healAmt} HP)! (${lead.hp}/${lead.max_hp} HP)</span>`);
    }

    if (typeof renderTibiaPokebar === "function") renderTibiaPokebar();
    if (typeof syncAutoFarmSurvivalUi === "function") syncAutoFarmSurvivalUi();
    if (typeof scheduleStateSave === "function") scheduleStateSave(1500);
    return true;
}

function toggleAutoRevive(forceVal) {
    if (typeof forceVal === "boolean") {
        STATE.autoReviveEnabled = forceVal;
    } else {
        STATE.autoReviveEnabled = !STATE.autoReviveEnabled;
    }
    syncAutoFarmUi();
    syncAutoFarmSurvivalUi();
    saveAutoFarmPreferences();
    showToast(STATE.autoReviveEnabled ? "💫 Auto-Reviver ATIVADO (Reviverá Pokémon desmaiados)!" : "⚪ Auto-Reviver DESATIVADO.");
}

function changeAutoRevivePreference(val) {
    STATE.autoRevivePreference = val || "best";
    saveAutoFarmPreferences();
    showToast(`💫 Revive de Auto-Reviver: ${STATE.autoRevivePreference === "best" ? "Max Revive (100% HP)" : "Revive Padrão (50% HP)"}.`);
}

function checkAndExecuteAutoRevive() {
    if (!STATE.autoReviveEnabled) return false;
    const lead = (typeof getLeadPokemon === "function") ? getLeadPokemon() : null;
    if (!lead || lead.hp > 0) return false;

    const now = Date.now();
    if (now - (STATE._lastAutoReviveTime || 0) < 1500) return false;

    const inv = STATE.player?.inventory || {};
    const pref = STATE.autoRevivePreference || "best";

    const reviveTiers = [
        { id: "revive_max", name: "Max Revive", revivePct: 1.0 },
        { id: "item_max_revive", name: "Max Revive", revivePct: 1.0 },
        { id: "revive_basic", name: "Revive", revivePct: 0.5 },
        { id: "item_revive", name: "Revive", revivePct: 0.5 },
        { id: "revive", name: "Revive", revivePct: 0.5 },
        { id: "revive_minor", name: "Minor Revive", revivePct: 0.35 }
    ];

    let chosen = null;
    if (pref === "cheap") {
        for (let i = reviveTiers.length - 1; i >= 0; i--) {
            if ((inv[reviveTiers[i].id] || 0) > 0) {
                chosen = reviveTiers[i];
                break;
            }
        }
    } else {
        for (const rt of reviveTiers) {
            if ((inv[rt.id] || 0) > 0) {
                chosen = rt;
                break;
            }
        }
    }

    if (!chosen) {
        if (now - (STATE._lastOutOfRevivesToast || 0) > 20000) {
            STATE._lastOutOfRevivesToast = now;
            showToast("⚠️ Auto-Reviver: Sem Revives na bolsa! Compre no PokéMart.");
        }
        return false;
    }

    inv[chosen.id] -= 1;
    if (inv[chosen.id] <= 0) delete inv[chosen.id];

    STATE._lastAutoReviveTime = now;
    lead.hp = Math.max(1, Math.floor(lead.max_hp * chosen.revivePct));

    const sum = STATE.tibia?.summon || { gx: 10, gy: 10 };
    if (typeof spawnFloatingText === "function") {
        spawnFloatingText(sum.gx, sum.gy, "REVIVIDO! ✨", "#38bdf8");
    }
    if (typeof spawnPokePixelCombatPopup === "function") {
        spawnPokePixelCombatPopup(sum.gx, sum.gy, "REVIVIDO! 💫", "heal");
    }
    if (typeof addCombatLog === "function") {
        addCombatLog(`<span style="color:#38bdf8;font-weight:900;">✨ [AUTO-REVIVER] ${lead.name} foi revivido com ${chosen.name} (${lead.hp}/${lead.max_hp} HP)!</span>`);
    }
    showToast(`✨ ${lead.name} foi revivido automaticamente (${lead.hp}/${lead.max_hp} HP)!`);

    if (typeof renderTibiaPokebar === "function") renderTibiaPokebar();
    if (typeof syncAutoFarmSurvivalUi === "function") syncAutoFarmSurvivalUi();
    if (typeof scheduleStateSave === "function") scheduleStateSave(1500);
    return true;
}

function toggleAutoSellPokemon(forceVal) {
    if (typeof forceVal === "boolean") {
        STATE.autoSellPokemonEnabled = forceVal;
    } else {
        STATE.autoSellPokemonEnabled = !STATE.autoSellPokemonEnabled;
    }
    syncAutoFarmUi();
    syncAutoFarmAutoSellUi();
    saveAutoFarmPreferences();
    showToast(STATE.autoSellPokemonEnabled ? "🪙 Auto-Venda de Pokémon ATIVADA (Liquida capturas comuns por Ouro)!" : "⚪ Auto-Venda de Pokémon DESATIVADA.");
}

function changeAutoSellPokemonFilter(val) {
    STATE.autoSellPokemonFilter = val || "common_only";
    saveAutoFarmPreferences();
    const lbl = val === "common_only" ? "Apenas Comuns" : val === "common_uncommon" ? "Comuns e Incomuns" : "Comuns, Incomuns e Raros";
    showToast(`🪙 Filtro de Auto-Venda: ${lbl}.`);
}

function changeAutoSellKeepNewDex(checked) {
    STATE.autoSellKeepNewDex = !!checked;
    saveAutoFarmPreferences();
    showToast(STATE.autoSellKeepNewDex ? "📖 Preservar Pokédex: ON (Espécies novas nunca são vendidas)" : "⚠️ Preservar Pokédex: OFF");
}

function checkAndExecuteAutoSellPokemon(newMon) {
    if (!STATE.autoSellPokemonEnabled || !newMon) return false;

    // Strict Safety Locks:
    // 1. NEVER sell Shinies
    if (newMon.is_shiny) return false;

    // 2. NEVER sell Mythical or Legendary
    const q = (newMon.quality || "Comum").toLowerCase();
    if (q.startsWith("mítico") || q.startsWith("mitico") || q === "lendário" || q === "lendario") return false;

    // 3. Protect new Pokédex species if requested
    if (STATE.autoSellKeepNewDex && !STATE.player?.pokedex_caught?.includes(newMon.species_id)) {
        return false;
    }

    // 4. Check user filter
    const filter = STATE.autoSellPokemonFilter || "common_only";
    let shouldSell = false;
    if (filter === "common_only") {
        shouldSell = (q === "comum");
    } else if (filter === "common_uncommon") {
        shouldSell = (q === "comum" || q === "incomum");
    } else if (filter === "all_non_special") {
        shouldSell = (q === "comum" || q === "incomum" || q === "raro");
    }

    if (!shouldSell) return false;

    // Calculate value
    const gold = (typeof calculatePokemonGoldValue === "function")
        ? calculatePokemonGoldValue(newMon)
        : Math.max(15, 25 + (newMon.level || 1) * 12);

    STATE.player.gold = (STATE.player.gold || 0) + gold;
    STATE.player.stats = STATE.player.stats || {};
    STATE.player.stats.auto_sold_mons = (STATE.player.stats.auto_sold_mons || 0) + 1;
    STATE.player.stats.auto_sold_gold = (STATE.player.stats.auto_sold_gold || 0) + gold;

    const tr = STATE.tibia?.trainer || { gx: 10, gy: 10 };
    if (typeof spawnFloatingText === "function") {
        spawnFloatingText(tr.gx, tr.gy, `+$${gold.toLocaleString()}`, "#facc15");
    }
    if (typeof spawnPokePixelCombatPopup === "function") {
        spawnPokePixelCombatPopup(tr.gx, tr.gy, `+$${gold.toLocaleString()}`, "gold");
    }
    if (typeof addCombatLog === "function") {
        addCombatLog(`<span style="color:#facc15;font-weight:900;">💰 [AUTO-VENDA] ${newMon.name} (${newMon.quality || "Comum"} • Lv.${newMon.level}) vendido automaticamente por +$${gold.toLocaleString()} Ouro!</span>`);
    }
    showToast(`💰 Auto-Venda: +$${gold.toLocaleString()} (${newMon.name})`);

    syncAutoFarmAutoSellUi();
    if (typeof scheduleStateSave === "function") scheduleStateSave(1500);
    return true;
}

function toggleAutoSellDrops(forceVal) {
    if (typeof forceVal === "boolean") {
        STATE.autoSellDropsEnabled = forceVal;
    } else {
        STATE.autoSellDropsEnabled = !STATE.autoSellDropsEnabled;
    }
    syncAutoFarmUi();
    syncAutoFarmAutoSellUi();
    saveAutoFarmPreferences();
    showToast(STATE.autoSellDropsEnabled ? "📦 Auto-Venda de Drops ATIVADA (Liquida materiais de monstros por Ouro)!" : "⚪ Auto-Venda de Drops DESATIVADA.");
}

function isProtectedDropItem(itemId) {
    if (!itemId) return true;
    const low = itemId.toLowerCase();
    return (
        low.startsWith("capsule_") ||
        low.startsWith("stone_") ||
        low.includes("potion") ||
        low.includes("revive") ||
        low === "master_key" ||
        low === "rare_candy" ||
        low.startsWith("candy_")
    );
}

function checkAndExecuteAutoSellDrop(itemId, qty = 1) {
    if (!STATE.autoSellDropsEnabled) return false;
    if (isProtectedDropItem(itemId)) return false;

    const itemObj = (STATE.itemsMap && STATE.itemsMap[itemId]) || { name: itemId, price: 20 };
    const unitSell = itemObj.sell_price || Math.max(5, Math.floor((itemObj.price || 20) / 2));
    const totalEarned = unitSell * qty;

    STATE.player.gold = (STATE.player.gold || 0) + totalEarned;
    STATE.player.stats = STATE.player.stats || {};
    STATE.player.stats.auto_sold_drops_gold = (STATE.player.stats.auto_sold_drops_gold || 0) + totalEarned;

    if (typeof addCombatLog === "function") {
        addCombatLog(`<span style="color:#fbbf24;">🪙 [AUTO-VENDA DROP] ${qty}x ${itemObj.name} vendidos por +$${totalEarned.toLocaleString()} Ouro!</span>`);
    }
    syncAutoFarmAutoSellUi();
    return true;
}

function syncAutoFarmSurvivalUi() {
    const inv = STATE.player?.inventory || {};
    const potionCount = Object.keys(inv).filter(k => k.includes("potion")).reduce((acc, k) => acc + (inv[k] || 0), 0);
    const reviveCount = Object.keys(inv).filter(k => k.includes("revive")).reduce((acc, k) => acc + (inv[k] || 0), 0);

    const pBadge = document.getElementById("autoheal-stock-badge");
    if (pBadge) pBadge.textContent = `${potionCount}x disponíveis`;

    const rBadge = document.getElementById("autorevive-stock-badge");
    if (rBadge) rBadge.textContent = `${reviveCount}x disponíveis`;

    const btnHeal = document.getElementById("btn-toggle-autoheal");
    if (btnHeal) {
        btnHeal.classList.toggle("is-on", !!STATE.autoHealEnabled);
        const txt = btnHeal.querySelector(".switch-text");
        if (txt) txt.textContent = STATE.autoHealEnabled ? "ON" : "OFF";
    }

    const btnRevive = document.getElementById("btn-toggle-autorevive");
    if (btnRevive) {
        btnRevive.classList.toggle("is-on", !!STATE.autoReviveEnabled);
        const txt = btnRevive.querySelector(".switch-text");
        if (txt) txt.textContent = STATE.autoReviveEnabled ? "ON" : "OFF";
    }

    const thSel = document.getElementById("autoheal-threshold");
    if (thSel && STATE.autoHealThreshold != null) {
        const val = Number(STATE.autoHealThreshold).toFixed(2);
        thSel.value = val;
        if (!thSel.value) {
            thSel.value = String(Number(STATE.autoHealThreshold));
        }
    }

    const hpPref = document.getElementById("autoheal-preference");
    if (hpPref && STATE.autoHealPreference) hpPref.value = STATE.autoHealPreference;

    const rvPref = document.getElementById("autorevive-preference");
    if (rvPref && STATE.autoRevivePreference) rvPref.value = STATE.autoRevivePreference;
}

function syncAutoFarmAutoSellUi() {
    const btnPk = document.getElementById("btn-toggle-autosell-pokemon");
    if (btnPk) {
        btnPk.classList.toggle("is-on", !!STATE.autoSellPokemonEnabled);
        const txt = btnPk.querySelector(".switch-text");
        if (txt) txt.textContent = STATE.autoSellPokemonEnabled ? "ON" : "OFF";
    }

    const btnDr = document.getElementById("btn-toggle-autosell-drops");
    if (btnDr) {
        btnDr.classList.toggle("is-on", !!STATE.autoSellDropsEnabled);
        const txt = btnDr.querySelector(".switch-text");
        if (txt) txt.textContent = STATE.autoSellDropsEnabled ? "ON" : "OFF";
    }

    const filterSel = document.getElementById("autosell-pokemon-filter");
    if (filterSel && STATE.autoSellPokemonFilter) filterSel.value = STATE.autoSellPokemonFilter;

    const keepDex = document.getElementById("autosell-keep-new-dex");
    if (keepDex) keepDex.checked = (STATE.autoSellKeepNewDex !== false);

    const statMons = document.getElementById("stat-autosold-mons");
    if (statMons) statMons.textContent = `${STATE.player?.stats?.auto_sold_mons || 0} monstrinhos`;

    const statGold = document.getElementById("stat-autosold-drops-gold");
    if (statGold) statGold.textContent = `$${(STATE.player?.stats?.auto_sold_drops_gold || 0).toLocaleString()}`;
}

function syncAutoFarmUi() {
    const huntOn = !!STATE.autoHuntEnabled;
    const movesOn = !!STATE.autoMovesEnabled;
    const catchOn = !!STATE.autoCatchEnabled;
    const lootOn = !!(STATE.tibia && STATE.tibia.autoLoot);
    const healOn = !!STATE.autoHealEnabled;
    const reviveOn = !!STATE.autoReviveEnabled;
    const sellPkOn = !!STATE.autoSellPokemonEnabled;
    const sellDropsOn = !!STATE.autoSellDropsEnabled;

    const activeCount = (huntOn ? 1 : 0) + (movesOn ? 1 : 0) + (catchOn ? 1 : 0) + (lootOn ? 1 : 0) +
                        (healOn ? 1 : 0) + (reviveOn ? 1 : 0) + (sellPkOn ? 1 : 0) + (sellDropsOn ? 1 : 0);
    const anyActive = activeCount > 0;

    // 1. Top Menubar Unified Auto-Farm Trigger
    const topBtn = document.getElementById("topbtn-autofarm") || document.getElementById("menubtn-autofarm");
    if (topBtn) topBtn.classList.toggle("active", anyActive);
    const topBadge = document.getElementById("autofarm-summary-badge");
    if (topBtn) {
        topBtn.classList.toggle("is-active", anyActive);
    }
    if (topBadge) {
        topBadge.textContent = anyActive ? `ON (${activeCount}/8)` : "OFF";
        topBadge.className = anyActive ? "autofarm-status-badge is-active" : "autofarm-status-badge";
    }

    // 2. Auto-Farm Window Master Summary
    const summaryEl = document.getElementById("autofarm-active-summary");
    if (summaryEl) {
        summaryEl.textContent = `${activeCount} de 8 rotinas em execução`;
    }

    // Sync child views
    if (typeof syncAutoFarmSurvivalUi === "function") syncAutoFarmSurvivalUi();
    if (typeof syncAutoFarmAutoSellUi === "function") syncAutoFarmAutoSellUi();

    // 3. Auto-Caça (Cavebot) Card
    const cardHunt = document.getElementById("card-autohunt");
    const btnToggleHunt = document.getElementById("btn-toggle-autohunt");
    if (cardHunt) cardHunt.classList.toggle("is-active", huntOn);
    if (btnToggleHunt) {
        btnToggleHunt.classList.toggle("is-on", huntOn);
        const txt = btnToggleHunt.querySelector(".switch-text");
        if (txt) txt.textContent = huntOn ? "ON" : "OFF";
    }
    const speedSel = document.getElementById("autohunt-speed");
    if (speedSel && STATE.autoHuntSpeedMs) {
        speedSel.value = String(STATE.autoHuntSpeedMs);
    }

    // 4. Auto-Ataque (Golpes) Card
    const cardAttack = document.getElementById("card-autoattack");
    const btnToggleAttack = document.getElementById("btn-toggle-autoattack");
    if (cardAttack) cardAttack.classList.toggle("is-active", movesOn);
    if (btnToggleAttack) {
        btnToggleAttack.classList.toggle("is-on", movesOn);
        const txt = btnToggleAttack.querySelector(".switch-text");
        if (txt) txt.textContent = movesOn ? "ON" : "OFF";
    }
    const chipBox = document.getElementById("autofarm-move-chips");
    if (chipBox) {
        chipBox.innerHTML = [0, 1, 2, 3]
            .map((idx) => {
                const active = STATE.autoMoveSlots && STATE.autoMoveSlots[idx] !== false;
                return `<button class="move-chip-btn ${active ? "active" : ""}" onclick="toggleSingleMoveAuto(${idx}, event)" title="Alternar habilidade m${idx + 1} no Auto-Ataque">m${idx + 1}</button>`;
            })
            .join("");
    }

    // 5. Auto-Captura (Pokébolas) Card
    const cardCatch = document.getElementById("card-autocatch");
    const btnToggleCatch = document.getElementById("btn-toggle-autocatch");
    if (cardCatch) cardCatch.classList.toggle("is-active", catchOn);
    if (btnToggleCatch) {
        btnToggleCatch.classList.toggle("is-on", catchOn);
        const txt = btnToggleCatch.querySelector(".switch-text");
        if (txt) txt.textContent = catchOn ? "ON" : "OFF";
    }
    const modeSel = document.getElementById("autocatch-mode");
    if (modeSel && STATE.autoCatchMode) {
        modeSel.value = STATE.autoCatchMode;
    }
    populateAutoBallSelect();

    // 6. Auto-Coleta (Auto-Loot) Card
    const cardLoot = document.getElementById("card-autoloot");
    const btnToggleLoot = document.getElementById("btn-toggle-autoloot");
    if (cardLoot) cardLoot.classList.toggle("is-active", lootOn);
    if (btnToggleLoot) {
        btnToggleLoot.classList.toggle("is-on", lootOn);
        const txt = btnToggleLoot.querySelector(".switch-text");
        if (txt) txt.textContent = lootOn ? "ON" : "OFF";
    }

    // 7. Secondary / Quick HUD buttons
    const quickCatchBtn = document.getElementById("btn-autocatch-quick");
    if (quickCatchBtn) {
        quickCatchBtn.textContent = `🔴 Auto-Catch: ${catchOn ? "ON" : "OFF"}`;
        quickCatchBtn.classList.toggle("active-toggle", catchOn);
    }

    const lootBtn = document.getElementById("btn-autoloot");
    if (lootBtn) {
        lootBtn.textContent = `🎒 Auto-Coleta: ${lootOn ? "ON" : "OFF"}`;
        lootBtn.classList.toggle("active-toggle", lootOn);
    }

    const dockAttackBtn = document.getElementById("btn-automoves-dock");
    const dockAttackLbl = document.getElementById("lbl-automoves-dock");
    if (dockAttackBtn) dockAttackBtn.classList.toggle("is-on", movesOn);
    if (dockAttackLbl) dockAttackLbl.textContent = `⚡ Auto-Ataque: ${movesOn ? "ON" : "OFF"}`;

    const legacyHuntBtn = document.getElementById("btn-autohunt");
    if (legacyHuntBtn) {
        legacyHuntBtn.textContent = `🤖 Auto-Caça: ${huntOn ? "ON" : "OFF"}`;
        legacyHuntBtn.className = huntOn ? "menubar-cavebot-btn active-toggle" : "menubar-cavebot-btn";
    }
}

function toggleAutoHunt(forceVal) {
    if (typeof forceVal === "boolean") {
        STATE.autoHuntEnabled = forceVal;
    } else {
        STATE.autoHuntEnabled = !STATE.autoHuntEnabled;
    }
    if (STATE.autoHuntEnabled) {
        updateAutoHuntSpeed();
        showToast("🏃 Auto-Caça ATIVADA: Caminhando e buscando monstros na rota!");
    } else {
        clearInterval(STATE.autoHuntTimer);
        showToast("⚪ Auto-Caça DESATIVADA.");
    }
    syncAutoFarmUi();
    saveAutoFarmPreferences();
}

function updateAutoHuntSpeed() {
    clearInterval(STATE.autoHuntTimer);
    if (!STATE.autoHuntEnabled) return;
    const ms = parseInt(document.getElementById("autohunt-speed")?.value || String(STATE.autoHuntSpeedMs || 1440), 10);
    STATE.autoHuntSpeedMs = ms;
    let spellIdx = 0;
    STATE.autoHuntTimer = setInterval(() => {
        const lead = getLeadPokemon();
        if (!lead) return;

        // 1. Ensure we have monsters on screen
        if (STATE.tibia.monsters.length === 0) {
            forceSpawnWave();
        }

        // 2. Select nearest monster to track
        const tr = STATE.tibia.trainer;
        let target = STATE.tibia.monsters.find((m) => m.uid === STATE.tibia.targetId && m.hp > 0);
        if (!target) {
            let bestDist = Infinity;
            for (const m of STATE.tibia.monsters) {
                if (m.hp <= 0) continue;
                const d = Math.hypot(tr.gx - m.gx, tr.gy - m.gy);
                if (d < bestDist) {
                    bestDist = d;
                    target = m;
                }
            }
            if (target) {
                STATE.tibia.targetId = target.uid;
                STATE.wildEnemy = target;
            }
        }
        if (!target) return;

        const distToTarget = Math.hypot(target.gx - tr.gx, target.gy - tr.gy);

        // 3. Cavebot walks Trainer directly towards Target until close
        if (distToTarget > 1.8) {
            tr.targetGx = Math.max(2, Math.min(GRID_COLS - 3, target.gx));
            tr.targetGy = Math.max(2, Math.min(GRID_ROWS - 3, target.gy));
        }

        // 4. STRICT: Only attack when Trainer has arrived NEAR the monster (<= 2.0 SQMs)
        if (distToTarget <= 2.0) {
            if (typeof checkAndExecuteAutoHeal === "function") checkAndExecuteAutoHeal();
            const moves = lead.moves && lead.moves.length > 0 ? lead.moves : ["tackle"];
            const moveId = moves[spellIdx % moves.length];
            spellIdx += 1;
            executeCombatTurn(moveId, false);
        }
    }, ms);
}

function toggleAutoCatch(forceVal) {
    if (typeof forceVal === "boolean") {
        STATE.autoCatchEnabled = forceVal;
    } else {
        STATE.autoCatchEnabled = !STATE.autoCatchEnabled;
    }
    syncAutoFarmUi();
    if (STATE.autoCatchEnabled) {
        showToast("🔴 Auto-Captura ATIVADA: Lançará Pokébolas nos Pokémon derrotados!");
        processAutoCatchQueue();
    } else {
        showToast("⚪ Auto-Captura DESATIVADA.");
    }
    saveAutoFarmPreferences();
}

function matchesAutoCatchFilter(corpse) {
    if (!corpse || corpse.caught) return false;
    const mode = STATE.autoCatchMode || "always";
    if (mode === "always") return true;
    if (mode === "shiny_or_new") {
        const isNew = !STATE.player.pokedex_caught.includes(corpse.species_id);
        return corpse.is_shiny || isNew;
    }
    if (mode === "rare_plus") {
        const sp = STATE.speciesById[corpse.species_id] || {};
        const isRare = corpse.is_shiny || (sp.rarity && sp.rarity !== "Comum") || (corpse.quality && corpse.quality !== "Comum");
        return isRare;
    }
    return true;
}

function getAutoCatchBallToUse(corpse) {
    const pref = STATE.autoCatchBall || "best";
    if (pref === "best") {
        const sorted = [...STATE.capsules].sort((a, b) => (b.catch_multiplier || 1) - (a.catch_multiplier || 1));
        for (const cap of sorted) {
            if ((STATE.player.inventory[cap.id] || 0) > 0) return cap.id;
        }
    } else if (pref === "cheap") {
        const sorted = [...STATE.capsules].sort((a, b) => (a.catch_multiplier || 1) - (b.catch_multiplier || 1));
        for (const cap of sorted) {
            if ((STATE.player.inventory[cap.id] || 0) > 0) return cap.id;
        }
    } else {
        if ((STATE.player.inventory[pref] || 0) > 0) {
            return pref;
        }
        for (const cap of STATE.capsules) {
            if ((STATE.player.inventory[cap.id] || 0) > 0) return cap.id;
        }
    }
    return null;
}

function executeAutoCatchOnCorpse(corpse) {
    if (!corpse || corpse.caught || corpse.isCatching) return false;
    const ballId = getAutoCatchBallToUse(corpse);
    if (!ballId) {
        showToast("⚠️ Auto-Captura: Você não possui Pokébolas no inventário! Compre na Loja.");
        return false;
    }
    const cap = STATE.capsules.find((c) => c.id === ballId) || getBasicCapsule();
    addCombatLog(`<span style="color:#f472b6;">🤖 [AUTO-CATCH] Lançando ${cap.name} em ${corpse.is_shiny ? "✨ Shiny " : ""}${corpse.name} (Lv.${corpse.level})...</span>`);
    return throwBallAtCorpse(corpse.uid, ballId, true);
}

function processAutoCatchQueue() {
    if (!STATE.autoCatchEnabled) return;
    if (!STATE.tibia || !STATE.tibia.corpses || STATE.tibia.corpses.length === 0) return;
    const now = Date.now();
    if (now - (STATE.lastAutoCatchTime || 0) < 550) return;
    // Strictly target a knocked-out Pokémon that does NOT already have a Pokéball in progress
    const target = STATE.tibia.corpses.find((c) => !c.caught && !c.isCatching && matchesAutoCatchFilter(c));
    if (target) {
        STATE.lastAutoCatchTime = now;
        executeAutoCatchOnCorpse(target);
    }
}

function changeAutoCatchMode(mode) {
    STATE.autoCatchMode = mode;
    syncAutoFarmUi();
    saveAutoFarmPreferences();
    showToast(`🎯 Filtro de Auto-Captura: ${mode === "always" ? "Todos" : mode === "shiny_or_new" ? "Shinies e Novos" : "Raros / Míticos"}`);
}

function changeAutoCatchBall(ballId) {
    STATE.autoCatchBall = ballId;
    syncAutoFarmUi();
    saveAutoFarmPreferences();
    const cap = STATE.capsules.find((c) => c.id === ballId);
    showToast(`🔴 Pokébola de Auto-Captura: ${cap ? cap.name : ballId === "best" ? "Melhor Disponível" : "Econômica"}`);
}

function setAllAutoFarm(enable) {
    STATE.autoHuntEnabled = enable;
    if (enable) updateAutoHuntSpeed();
    else clearInterval(STATE.autoHuntTimer);

    STATE.autoMovesEnabled = enable;
    if (!enable) STATE.activeCastingMoveIdx = -1;

    STATE.autoCatchEnabled = enable;
    if (STATE.tibia) STATE.tibia.autoLoot = enable;

    STATE.autoHealEnabled = enable;
    STATE.autoReviveEnabled = enable;
    STATE.autoSellPokemonEnabled = enable;
    STATE.autoSellDropsEnabled = enable;

    syncAutoFarmUi();
    if (typeof syncAutoFarmSurvivalUi === "function") syncAutoFarmSurvivalUi();
    if (typeof syncAutoFarmAutoSellUi === "function") syncAutoFarmAutoSellUi();
    renderBattleArena();
    saveAutoFarmPreferences();
    if (enable) {
        showToast("⚡ Auto-Farm ATIVADO: Todas as 8 rotinas estão em execução (Caça, Ataque, Catch, Loot, Cura, Revive, Venda Mon & Venda Drops)!");
        processAutoCatchQueue();
    } else {
        showToast("⏹️ Auto-Farm PAUSADO: Todas as rotinas automáticas foram desligadas.");
    }
}

function applyAutoFarmPreset(presetKey) {
    if (presetKey === "full_hunt") {
        setAllAutoFarm(true);
        STATE.autoCatchMode = "always";
        STATE.autoCatchBall = "best";
        STATE.autoHealThreshold = 0.50;
        STATE.autoSellPokemonFilter = "common_only";
        syncAutoFarmUi();
        saveAutoFarmPreferences();
        showToast("🔥 Preset 'Caçador Completo' ativado: Todas as 8 rotinas ligadas!");
    } else if (presetKey === "survival_afk") {
        STATE.autoHuntEnabled = true;
        updateAutoHuntSpeed();
        STATE.autoMovesEnabled = true;
        STATE.autoCatchEnabled = true;
        if (STATE.tibia) STATE.tibia.autoLoot = true;
        STATE.autoHealEnabled = true;
        STATE.autoHealThreshold = 0.70; // 70% threshold for max safety
        STATE.autoReviveEnabled = true;
        STATE.autoSellPokemonEnabled = true;
        STATE.autoSellPokemonFilter = "common_only";
        STATE.autoSellDropsEnabled = true;
        syncAutoFarmUi();
        saveAutoFarmPreferences();
        showToast("🛡️ Preset 'Sobrevivência AFK' ativado: Auto-Cura em 70% HP + Auto-Revive + Auto-Venda ON!");
    } else if (presetKey === "leveling") {
        STATE.autoHuntEnabled = true;
        updateAutoHuntSpeed();
        STATE.autoMovesEnabled = true;
        STATE.autoCatchEnabled = false;
        if (STATE.tibia) STATE.tibia.autoLoot = true;
        STATE.autoHealEnabled = true;
        STATE.autoReviveEnabled = true;
        STATE.autoSellPokemonEnabled = false;
        STATE.autoSellDropsEnabled = true;
        syncAutoFarmUi();
        saveAutoFarmPreferences();
        showToast("⚔️ Preset 'Treinar EXP' ativado: Caça, Ataque, Cura, Revive e Coleta ON (Captura OFF).");
    } else if (presetKey === "shiny_hunt") {
        STATE.autoHuntEnabled = true;
        updateAutoHuntSpeed();
        STATE.autoMovesEnabled = true;
        STATE.autoCatchEnabled = true;
        STATE.autoCatchMode = "shiny_or_new";
        if (STATE.tibia) STATE.tibia.autoLoot = true;
        STATE.autoHealEnabled = true;
        STATE.autoReviveEnabled = true;
        STATE.autoSellPokemonEnabled = false;
        STATE.autoSellDropsEnabled = false;
        syncAutoFarmUi();
        saveAutoFarmPreferences();
        showToast("✨ Preset 'Caçador de Shinies' ativado: Lança bolas apenas em Shinies e Novos!");
    }
}

function populateAutoBallSelect() {
    const sel = document.getElementById("autocatch-ball") || document.getElementById("autocap-ball");
    if (!sel) return;
    const currentVal = STATE.autoCatchBall || "best";
    sel.innerHTML = `
        <option value="best" ${currentVal === "best" ? "selected" : ""}>✨ Melhor Disponível (Maior Chance)</option>
        <option value="cheap" ${currentVal === "cheap" ? "selected" : ""}>🪙 Econômica (Menor Custo)</option>
        ${STATE.capsules.map((c) => `<option value="${c.id}" ${c.id === currentVal ? "selected" : ""}>${c.name} (${c.catch_multiplier}x)</option>`).join("")}
    `;
}

function loadAutoFarmPreferences() {
    try {
        const raw = localStorage.getItem("pokeland_autofarm_v1");
        if (raw) {
            const data = JSON.parse(raw);
            if (typeof data.autoHuntEnabled === "boolean") STATE.autoHuntEnabled = data.autoHuntEnabled;
            if (typeof data.autoMovesEnabled === "boolean") STATE.autoMovesEnabled = data.autoMovesEnabled;
            if (typeof data.autoCatchEnabled === "boolean") STATE.autoCatchEnabled = data.autoCatchEnabled;
            if (typeof data.autoLoot === "boolean" && STATE.tibia) STATE.tibia.autoLoot = data.autoLoot;
            if (data.autoCatchMode) STATE.autoCatchMode = data.autoCatchMode;
            if (data.autoCatchBall) STATE.autoCatchBall = data.autoCatchBall;
            if (data.autoHuntSpeedMs) STATE.autoHuntSpeedMs = data.autoHuntSpeedMs;

            if (typeof data.autoHealEnabled === "boolean") STATE.autoHealEnabled = data.autoHealEnabled;
            if (typeof data.autoHealThreshold === "number") STATE.autoHealThreshold = data.autoHealThreshold;
            if (data.autoHealPreference) STATE.autoHealPreference = data.autoHealPreference;

            if (typeof data.autoReviveEnabled === "boolean") STATE.autoReviveEnabled = data.autoReviveEnabled;
            if (data.autoRevivePreference) STATE.autoRevivePreference = data.autoRevivePreference;

            if (typeof data.autoSellPokemonEnabled === "boolean") STATE.autoSellPokemonEnabled = data.autoSellPokemonEnabled;
            if (data.autoSellPokemonFilter) STATE.autoSellPokemonFilter = data.autoSellPokemonFilter;
            if (typeof data.autoSellKeepNewDex === "boolean") STATE.autoSellKeepNewDex = data.autoSellKeepNewDex;

            if (typeof data.autoSellDropsEnabled === "boolean") STATE.autoSellDropsEnabled = data.autoSellDropsEnabled;
        }
    } catch (e) {}
}

function saveAutoFarmPreferences() {
    try {
        localStorage.setItem(
            "pokeland_autofarm_v1",
            JSON.stringify({
                autoHuntEnabled: STATE.autoHuntEnabled,
                autoMovesEnabled: STATE.autoMovesEnabled,
                autoCatchEnabled: STATE.autoCatchEnabled,
                autoCatchMode: STATE.autoCatchMode,
                autoCatchBall: STATE.autoCatchBall,
                autoHuntSpeedMs: STATE.autoHuntSpeedMs,
                autoLoot: STATE.tibia ? STATE.tibia.autoLoot : true,
                autoHealEnabled: STATE.autoHealEnabled,
                autoHealThreshold: STATE.autoHealThreshold,
                autoHealPreference: STATE.autoHealPreference,
                autoReviveEnabled: STATE.autoReviveEnabled,
                autoRevivePreference: STATE.autoRevivePreference,
                autoSellPokemonEnabled: STATE.autoSellPokemonEnabled,
                autoSellPokemonFilter: STATE.autoSellPokemonFilter,
                autoSellKeepNewDex: STATE.autoSellKeepNewDex,
                autoSellDropsEnabled: STATE.autoSellDropsEnabled,
            })
        );
    } catch (e) {}
}

function healFullParty() {
    for (const mon of STATE.player.party) {
        mon.hp = mon.max_hp;
    }
    setTrainerSpeech("hi / heal / yes");
    spawnFloatingText(STATE.tibia.trainer.gx, STATE.tibia.trainer.gy, "+FULL HP!", "#4ade80");
    showToast("💚 Nurse Joy: Todos os seus Pokémon foram 100% curados!");
    renderAll();
}

// ====================================================
// 5. POKÉMON INSTANCE CREATION & LEVEL UP (WITH MÍTICO & IVS)
// ====================================================
function getPokemonNextExp(level) {
    // Option A: Classic MMORPG Grind (~34.8M EXP to Lv 100, 38-45h active time)
    return Math.floor(80 * Math.pow(level, 2.05) + Math.pow(level, 1.8) * 15 + level * 50);
}

function getTrainerNextExp(level) {
    // Option A: Synchronized Trainer Curve (~18.5M EXP to Lv 100)
    return Math.floor(120 * Math.pow(level, 1.95) + level * 65);
}

function createClientPokemonInstance(sp, level, isShiny, qualityPreset) {
    const bs = sp.base_stats || { hp: 50, atk: 50, def: 50, spa: 50, spd: 50, spe: 50 };
    let quality = qualityPreset || "Comum";
    if (quality === "Mítico_Forte" || quality === "Mítico_Medio" || quality === "Mítico_Fraco") {
        quality = "Mítico";
    }
    // Rule: Shinies never spawn or exist below Épico
    if (isShiny && (quality === "Comum" || quality === "Incomum" || quality === "Raro" || quality === "Fraco" || !quality)) {
        quality = "Épico";
    }

    // Reworked Rarity Tiers and IV bands (0-31 per stat)
    const structuredTiers = {
        Comum: { mult: [1.00, 1.08], iv: [0, 15], g31: 0 },
        Incomum: { mult: [1.10, 1.22], iv: [10, 22], g31: 0 },
        Raro: { mult: [1.25, 1.38], iv: [18, 26], g31: 1 },
        "Épico": { mult: [1.40, 1.55], iv: [24, 29], g31: 1 },
        epico: { mult: [1.40, 1.55], iv: [24, 29], g31: 1 },
        "Lendário": { mult: [1.60, 1.75], iv: [27, 31], g31: 2 },
        lendario: { mult: [1.60, 1.75], iv: [27, 31], g31: 2 },
        "Mítico": { mult: isShiny ? [2.20, 2.60] : [1.75, 2.10], iv: [29, 31], g31: 3 },
        mitico: { mult: isShiny ? [2.20, 2.60] : [1.75, 2.10], iv: [29, 31], g31: 3 },
    };

    const tier = structuredTiers[quality] || structuredTiers.Comum;
    let baseQm = tier.mult[0] + Math.random() * (tier.mult[1] - tier.mult[0]);
    if (isShiny && quality !== "Mítico" && quality !== "mitico") {
        baseQm += 0.20;
    }
    const qMult = +baseQm.toFixed(2);
    const [ivMin, ivMax] = tier.iv;
    const rIv = () => ivMin + Math.floor(Math.random() * (ivMax - ivMin + 1));
    const ivs = { hp: rIv(), atk: rIv(), def: rIv(), spa: rIv(), spd: rIv(), spe: rIv() };

    // Guaranteed 31s for high tiers
    const statKeys = ["hp", "atk", "def", "spa", "spd", "spe"];
    if (tier.g31 > 0) {
        const shuffled = [...statKeys].sort(() => Math.random() - 0.5);
        for (let i = 0; i < tier.g31; i++) {
            ivs[shuffled[i]] = 31;
        }
    }
    // Shiny bonus: +3 to all IVs (capped at 31)
    if (isShiny) {
        for (const k of statKeys) {
            ivs[k] = Math.min(31, ivs[k] + 3);
        }
    }

    const ivTotal = ivs.hp + ivs.atk + ivs.def + ivs.spa + ivs.spd + ivs.spe;
    const natObj = NATURES_CLIENT[Math.floor(Math.random() * NATURES_CLIENT.length)];
    const gender = Math.random() < 0.55 ? "M" : "F";

    const calcStat = (key, isHp = false) => {
        const b = bs[key] || 50;
        const iv = ivs[key] || 15;
        if (isHp) return Math.floor((((2 * b + iv) * level) / 100 + level + 10) * qMult);
        let val = (((2 * b + iv) * level) / 100 + 5) * qMult;
        if (natObj.up === key) val *= 1.10;
        if (natObj.down === key) val *= 0.90;
        if (gender === "M" && key === "atk") val *= 1.10;
        if (gender === "F" && key === "def") val *= 1.10;
        return Math.floor(val);
    };

    const maxHp = calcStat("hp", true);
    return {
        uid: Math.random().toString(36).substring(2, 10),
        species_id: sp.id,
        dex_id: sp.dex_id,
        name: sp.name,
        elements: sp.elements || ["normal"],
        level: level,
        gender: gender,
        nature: natObj.id,
        nature_label: natObj.label,
        quality: quality,
        quality_multiplier: qMult,
        ivs: ivs,
        iv_total: ivTotal,
        exp: 0,
        exp_next: getPokemonNextExp(level),
        hp: maxHp,
        max_hp: maxHp,
        stats: {
            hp: maxHp,
            atk: calcStat("atk"),
            def: calcStat("def"),
            spa: calcStat("spa"),
            spd: calcStat("spd"),
            spe: calcStat("spe"),
        },
        is_shiny: isShiny,
        moves: (sp.learn_moves || ["tackle"]).slice(0, 4),
        evolves_to: sp.evolves_to,
        evolve_level: sp.evolve_level || 0,
        evolution_options: sp.evolution_options || [],
    };
}

function levelUpPokemon(mon, levels = 1) {
    const sp = STATE.speciesById[mon.species_id];
    if (!sp) return;
    const oldLevel = mon.level;
    mon.level = Math.min(100, mon.level + levels);
    mon.exp_next = mon.level >= 100 ? 0 : getPokemonNextExp(mon.level);
    if (mon.level >= 100) {
        mon.exp = 0;
    }
    if (oldLevel < 100 && mon.level >= 100) {
        triggerGlobalGoldenBroadcast(
            "🏆 LENDA VIVA: NÍVEL 100 MÁXIMO!",
            `O Pokémon <strong>${mon.name}</strong> atingiu o ápice supremo de poder (Nível 100)!`,
            "trophy",
            "gold"
        );
    }
    const bs = sp.base_stats || { hp: 50, atk: 50, def: 50, spa: 50, spd: 50, spe: 50 };
    const qMult = mon.quality_multiplier || 1.25;
    const ivs = mon.ivs || { hp: 20, atk: 20, def: 20, spa: 20, spd: 20, spe: 20 };
    const natObj = NATURES_CLIENT.find((n) => n.id === mon.nature) || NATURES_CLIENT[0];
    const gender = mon.gender || "M";

    const calcStat = (key, isHp = false) => {
        const b = bs[key] || 50;
        const iv = ivs[key] || 20;
        if (isHp) return Math.floor((((2 * b + iv) * mon.level) / 100 + mon.level + 10) * qMult);
        let val = (((2 * b + iv) * mon.level) / 100 + 5) * qMult;
        if (natObj.up === key) val *= 1.10;
        if (natObj.down === key) val *= 0.90;
        if (gender === "M" && key === "atk") val *= 1.10;
        if (gender === "F" && key === "def") val *= 1.10;
        return Math.floor(val);
    };

    mon.max_hp = calcStat("hp", true);
    mon.hp = mon.max_hp;
    mon.stats = {
        hp: mon.max_hp,
        atk: calcStat("atk"),
        def: calcStat("def"),
        spa: calcStat("spa"),
        spd: calcStat("spd"),
        spe: calcStat("spe"),
    };
}

// ====================================================
// 6. POKÉDEX PVP & CAPTURE ENCYCLOPEDIA
// ====================================================
function renderDexTypeFilters() {
    const bar = document.getElementById("dex-type-filters");
    if (!bar) return;
    const keys = ["all", ...Object.keys(ELEMENT_PT)];
    bar.innerHTML = keys
        .map((k) => {
            const label = k === "all" ? "Todos" : ELEMENT_PT[k].label;
            const act = STATE.dexElementFilter === k ? "active" : "";
            const iconHtml = k === "all"
                ? `<span class="mini-pokeball-dot" style="width:12px;height:12px;"></span>`
                : `<img src="${getGen8TypeIconUrl(k)}" style="width:14px;height:14px;object-fit:contain;" alt="">`;
            return `<button class="type-filter-pill ${act}" style="display:inline-flex;align-items:center;gap:5px;" onclick="setDexTypeFilter('${k}')">${iconHtml}<span>${label}</span></button>`;
        })
        .join("");
}

function setDexTypeFilter(elKey) {
    STATE.dexElementFilter = elKey;
    renderDexTypeFilters();
    renderPokedex();
}

function renderPokedex() {
    const pane = document.getElementById("tab-pokedex");
    if (!pane || !pane.classList.contains("active")) return;

    const q = (document.getElementById("dex-search")?.value || "").toLowerCase().trim();
    const sortSelect = document.getElementById("dex-sort");
    if (sortSelect && !sortSelect.value) {
        sortSelect.value = "dex_asc";
    }
    const sortMode = sortSelect?.value || "dex_asc";
    const onlyTeam = document.getElementById("dex-only-team")?.checked || false;
    const partySpecies = new Set(STATE.player.party.map((m) => m.species_id));

    let list = STATE.species.filter((sp) => {
        if (onlyTeam && !partySpecies.has(sp.id)) return false;
        if (STATE.dexElementFilter !== "all" && !(sp.elements || []).includes(STATE.dexElementFilter)) return false;
        if (q) {
            return (
                sp.name.toLowerCase().includes(q) ||
                String(sp.dex_id).includes(q)
            );
        }
        return true;
    });

    list.sort((a, b) => {
        if (sortMode === "dex_desc") return b.dex_id - a.dex_id;
        if (sortMode === "catch_high") return (b.base_capture_chance || 0) - (a.base_capture_chance || 0) || a.dex_id - b.dex_id;
        if (sortMode === "name_asc") return a.name.localeCompare(b.name);
        return a.dex_id - b.dex_id;
    });

    const basicCap = STATE.capsules.find((c) => c.id === "capsule_basic");
    const greatCap = STATE.capsules.find((c) => c.id === "capsule_great");
    const ultraCap = STATE.capsules.find((c) => c.id === "capsule_ultra");

    const container = document.getElementById("pokedex-grid-container");
    if (!container) return;
    container.innerHTML = list
        .map((sp) => {
            const inTeam = partySpecies.has(sp.id);
            const p1 = calcEffectiveBallChance(sp, basicCap, 1.0);
            const p2 = calcEffectiveBallChance(sp, greatCap, 1.0);
            const p4 = calcEffectiveBallChance(sp, ultraCap, 1.0);
            const zoneInfo = sp.best_zone
                ? `${sp.best_zone.world_label} (Lv. ${sp.best_zone.min_level})`
                : "Sem Respawn (Evento/Evolução)";
            const pre = sp.pre_evo_shortcut;
            const preHtml = pre
                ? `<div class="pvp-shortcut">💡 Atalho: <strong>${pre.name}</strong> (Lv.${pre.min_level}) → <strong>${Math.min(STATE.config.max_capture_cap, pre.base_capture_chance * STATE.config.catch_rate_mult).toFixed(1)}%</strong> Poké</div>`
                : "";
            const fallbackUrl = getStandardSpriteFallback(sp.dex_id, false);

            const bst = Object.values(sp.base_stats || {}).reduce((a, b) => a + (typeof b === "number" ? b : 0), 0);
            return `<div class="pvp-card ${inTeam ? "in-team" : ""}">
                <div class="pvp-card-top">
                    <span class="pvp-rank-num" style="background:#1e293b;color:#94a3b8;font-size:11px;padding:2px 8px;border-radius:4px;font-weight:800;">#${String(sp.dex_id).padStart(3, "0")}</span>
                    <span style="font-size:11px;color:#cbd5e1;font-weight:800;">BST ${bst}</span>
                </div>
                ${inTeam ? '<span class="seu-time-badge">SEU TIME</span>' : ""}
                <img class="pvp-sprite" src="${getSpriteUrl(sp.dex_id, false)}" onerror="this.onerror=null;this.src='${fallbackUrl}';" alt="${sp.name}" loading="lazy">
                <div class="pvp-mon-name">${sp.name} <span style="font-size:11px;color:#6b7280;">#${String(sp.dex_id).padStart(3, "0")}</span></div>
                <div class="pvp-types">${renderTypeBadges(sp.elements)}</div>

                <div class="pvp-catch-box">
                    <div class="pvp-catch-row"><span>Respawn:</span> <strong style="color:#e5e7eb;">${zoneInfo}</strong></div>
                    <div class="pvp-catch-row"><span>Poké (1x) / Great (2x):</span> <strong style="color:#34d399;">${p1.toFixed(1)}% / ${p2.toFixed(1)}%</strong></div>
                    <div class="pvp-catch-row"><span>Ultra Ball (4x):</span> <strong style="color:#60a5fa;">${p4.toFixed(1)}%</strong></div>
                    ${preHtml}
                </div>

                <div class="pvp-actions">
                    ${
                        sp.best_zone
                            ? `<button class="btn btn-primary" style="width:100%;" onclick="warpToSpeciesHunt('${sp.best_zone.zone_id}')">🧭 Ir p/ Hunt</button>`
                            : `<button class="btn" style="width:100%;" onclick="warpToSpeciesHunt('${pre ? pre.zone_id : ""}')">${pre ? "🧭 Hunt Pré" : "🔒 Evento"}</button>`
                    }
                </div>
            </div>`;
        })
        .join("");
}

function warpToSpeciesHunt(zoneId) {
    if (!zoneId) {
        showToast("ℹ️ Este Pokémon não possui respawn selvagem ativo. Desbloqueie o Safari Especial na aba ⚙️ Admin!");
        return;
    }
    selectZone(zoneId);
    switchTab("hunt");
}

function simulatePvPDuel(opponentSpeciesId) {
    const lead = getLeadPokemon();
    const oppSp = STATE.speciesById[opponentSpeciesId];
    if (!lead || !oppSp) return;
    const leadSp = STATE.speciesById[lead.species_id] || oppSp;

    // Auto-execute Pokémon's equipped moves (m1-m4) in PvP Duel!
    const moves = (lead.moves && lead.moves.length > 0 ? lead.moves : ["tackle"]).slice(0, 4);
    let bestMult = 1.0;
    const castNames = [];
    for (let i = 0; i < moves.length; i++) {
        if (STATE.autoMovesEnabled && STATE.autoMoveSlots[i] === false) continue;
        const mv = STATE.movesMap[moves[i]] || { name: moves[i], element: lead.elements?.[0] || "normal", power: 55 };
        castNames.push(mv.name);
        const eff = getTypeEffectiveness(mv.element, oppSp.elements);
        if (eff > bestMult) bestMult = eff;
    }
    const comboBonus = STATE.autoMovesEnabled ? 1.12 * Math.max(0.85, bestMult) : 1.0;

    const myPower = (leadSp.pvp_score || 50) * (lead.quality_multiplier || 1.2) * comboBonus + Math.random() * 14;
    const oppPower = (oppSp.pvp_score || 50) * 1.45 + Math.random() * 14;
    const moveSummary = castNames.length > 0 ? castNames.slice(0, 2).join(" + ") : "Tackle";

    if (myPower >= oppPower) {
        STATE.player.stats.pvp_wins = (STATE.player.stats.pvp_wins || 0) + 1;
        STATE.player.gold += 250;
        addCombatLog(`<span style="color:#fde047;font-weight:800;">⚔️ [AUTO-MOVES PvP] Seu ${lead.name} executou <strong>${moveSummary}</strong> e derrotou ${oppSp.name} (+ $250)!</span>`);
        showToast(`🏆 VITÓRIA 1v1 PvP! ${lead.name} usou [${moveSummary}] e venceu ${oppSp.name} (+$250)!`);
    } else {
        addCombatLog(`<span style="color:#f87171;">⚔️ [AUTO-MOVES PvP] Seu ${lead.name} executou <strong>${moveSummary}</strong>, mas ${oppSp.name} (Nota ${oppSp.pvp_score}) resistiu por pouco!</span>`);
        showToast(`⚔️ DERROTA 1v1 PvP! ${oppSp.name} (Nota ${oppSp.pvp_score}) superou seu ${lead.name} por pouco!`);
    }
    // Debounce save state to avoid main thread JSON serialization freezing combat
    scheduleStateSave(1500);
    renderHud();
}

// ====================================================
// 7. PARTY, PC BOX, IV INSPECTOR & EVOLUTION
// ====================================================
function renderPartyAndBox() {
    const pane = document.getElementById("tab-party");
    if (!pane || !pane.classList.contains("active")) return;

    // 1. Render Vertical My Team (Left Column)
    const partyEl = document.getElementById("party-grid-container");
    const vCountEl = document.getElementById("vertical-team-count");
    if (vCountEl) vCountEl.textContent = STATE.player.party.length;

    if (partyEl) {
        partyEl.innerHTML = STATE.player.party
            .map((mon, idx) => renderVerticalTeamCard(mon, idx))
            .join("");
    }

    // 2. Filter & Sort PC Box (Right Column)
    const searchVal = (document.getElementById("pcbox-filter-search")?.value || "").toLowerCase().trim();
    const typeFilter = document.getElementById("pcbox-filter-type")?.value || "all";
    const qualityFilter = document.getElementById("pcbox-filter-quality")?.value || "all";
    const sortVal = document.getElementById("pcbox-filter-sort")?.value || "bst_desc";
    const shinyOnly = !!document.getElementById("pcbox-filter-shiny")?.checked;
    const subTab = typeof CURRENT_PC_SUB !== "undefined" ? CURRENT_PC_SUB : "all";

    let filtered = (STATE.player.pc_box || []).filter(mon => {
        if (searchVal) {
            const name = (mon.name || "").toLowerCase();
            const elem = (mon.elements || []).join(" ").toLowerCase();
            const nat = (mon.nature || "").toLowerCase();
            const qual = (mon.quality || "").toLowerCase();
            if (!name.includes(searchVal) && !elem.includes(searchVal) && !nat.includes(searchVal) && !qual.includes(searchVal)) {
                return false;
            }
        }

        if (shinyOnly && !mon.is_shiny) return false;

        if (typeFilter !== "all") {
            if (!(mon.elements || []).includes(typeFilter)) return false;
        }

        if (qualityFilter !== "all") {
            if ((mon.quality || "Comum") !== qualityFilter) return false;
        }

        if (subTab === "mythics") {
            if (mon.quality !== "Mítico" && mon.quality !== "Lendário" && !mon.is_shiny) return false;
        } else if (subTab === "shinies") {
            if (!mon.is_shiny) return false;
        }

        return true;
    });

    // Apply Sorting
    filtered.sort((a, b) => {
        const statsA = a.stats || { hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100 };
        const statsB = b.stats || { hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100 };
        const bstA = Object.values(statsA).reduce((x, y) => x + (typeof y === "number" ? y : 0), 0);
        const bstB = Object.values(statsB).reduce((x, y) => x + (typeof y === "number" ? y : 0), 0);
        const ivA = a.iv_total || Object.values(a.ivs || {}).reduce((x, y) => x + y, 0);
        const ivB = b.iv_total || Object.values(b.ivs || {}).reduce((x, y) => x + y, 0);

        if (sortVal === "bst_desc") return bstB - bstA;
        if (sortVal === "lvl_desc") return (b.level || 1) - (a.level || 1);
        if (sortVal === "iv_desc") return ivB - ivA;
        if (sortVal === "name_asc") return (a.name || "").localeCompare(b.name || "");
        return 0;
    });

    const boxCnt = document.getElementById("pc-box-count");
    if (boxCnt) boxCnt.textContent = STATE.player.pc_box.length;

    const filteredLbl = document.getElementById("pcbox-filtered-count-label");
    if (filteredLbl) {
        filteredLbl.textContent = `Exibindo ${filtered.length} de ${(STATE.player.pc_box || []).length} Pokémon guardados no PC Box`;
    }

    const boxEl = document.getElementById("pcbox-grid-container");
    if (boxEl) {
        if (filtered.length === 0) {
            boxEl.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:#94a3b8;">Nenhum Pokémon encontrado com os filtros selecionados.</div>`;
        } else {
            boxEl.innerHTML = filtered
                .map((mon, idx) => renderPokemonManageCard(mon, idx, false))
                .join("");
        }
    }
}

function renderVerticalTeamCard(mon, idx) {
    const isLeader = idx === 0;
    const pmdUrl = `/img/pmd/${mon.species_id}/Portrait.png`;
    const hpPct = Math.min(100, Math.max(0, Math.floor(((mon.hp || 1) / (mon.max_hp || 1)) * 100)));
    const ivTotal = mon.iv_total || Object.values(mon.ivs || {}).reduce((a, b) => a + b, 0);

    return `
        <div class="vertical-team-card ${isLeader ? 'is-team-leader' : ''}">
            <div class="vt-top-row">
                <div class="vt-portrait-box">
                    <img src="${pmdUrl}" alt="${mon.name}" style="width:44px;height:44px;image-rendering:pixelated;" onerror="this.onerror=null;this.src='/img/pmd/pikachu/Portrait.png';">
                    ${isLeader ? '<span class="vt-crown" title="Líder do Time">👑</span>' : ''}
                </div>
                <div class="vt-info-col">
                    <div class="vt-name-row">
                        <span class="vt-name">${mon.name}</span>
                        <span class="vt-lvl">Lv.${mon.level}</span>
                        ${mon.is_shiny ? '<span style="font-size:12px;color:#facc15;">✨</span>' : ''}
                    </div>
                    <div style="display:flex;gap:4px;margin:2px 0;">
                        <span class="spk-quality-badge quality-${(mon.quality || 'comum').toLowerCase()}">${mon.quality || 'Comum'}</span>
                        <span style="font-size:9.5px;color:#94a3b8;font-family:var(--font-mono);">IV: ${ivTotal}/186</span>
                    </div>
                    <div class="vt-hp-track">
                        <div class="vt-hp-fill" style="width:${hpPct}%;background:${hpPct > 50 ? '#22c55e' : hpPct > 20 ? '#eab308' : '#ef4444'};"></div>
                    </div>
                </div>
            </div>

            <div class="vt-actions-row btn-grid-form" style="margin-top:6px;">
                ${!isLeader ? `<button class="btn btn-gold btn-xs" onclick="makePartyLeader('${mon.uid}')">⭐ Líder</button>` : `<button class="btn btn-xs" disabled style="opacity:0.6;">👑 Líder</button>`}
                ${idx > 0 ? `<button class="btn btn-xs" onclick="swapTeamOrder(${idx}, ${idx - 1})" title="Subir posição">⬆️</button>` : ''}
                ${idx < STATE.player.party.length - 1 ? `<button class="btn btn-xs" onclick="swapTeamOrder(${idx}, ${idx + 1})" title="Descer posição">⬇️</button>` : ''}
                <button class="btn btn-blue btn-xs" onclick="depositPartyMemberToBox('${mon.uid}')" title="Guardar no Box">📦 Box</button>
                <button class="btn btn-purple btn-xs" onclick="openRarityUpgradeModal('${mon.uid}')" style="background:#7c3aed;border-color:#a855f7;color:#fff;" title="Aprimorar Raridade">⭐ Raridade</button>
                ${!isLeader ? `<button class="btn btn-gold btn-xs" onclick="sellSinglePokemonToShop('${mon.uid}')" title="Vender para a Loja por Ouro">💰 Vender</button>` : ''}
            </div>
        </div>
    `;
}

function swapTeamOrder(fromIdx, toIdx) {
    const party = STATE.player.party;
    if (fromIdx < 0 || fromIdx >= party.length || toIdx < 0 || toIdx >= party.length) return;
    const temp = party[fromIdx];
    party[fromIdx] = party[toIdx];
    party[toIdx] = temp;
    scheduleStateSave(1000);
    renderAll();
    renderPartyAndBox();
}

function renderPokemonManageCard(mon, idx, isParty) {
    const sp = STATE.speciesById[mon.species_id] || {};
    const gradeInfo = classifyMythicalGrade(mon);
    const ivs = mon.ivs || { hp: 25, atk: 25, def: 25, spa: 25, spd: 25, spe: 25 };
    const genderBadge = mon.gender === "F"
        ? `<span style="color:#f472b6;font-weight:800;">♀ Fêmea (+10% DEF)</span>`
        : `<span style="color:#60a5fa;font-weight:800;">♂ Macho (+10% ATK)</span>`;

    const evoOpts = sp.evolution_options || [];
    let evoHtml = "";
    if (evoOpts.length > 0) {
        evoHtml = evoOpts
            .map((opt) => {
                const reqLv = opt.level || sp.evolve_level || 20;
                const reqStoneId = opt.required_item_id || "stone_normal";
                const reqQty = opt.required_item_qty || 1;
                const stoneObj = STATE.itemsMap[reqStoneId] || { name: reqStoneId };
                const haveQty = STATE.player.inventory[reqStoneId] || 0;
                const canEvo = mon.level >= reqLv && haveQty >= reqQty;
                return `<button class="btn ${canEvo ? "btn-green" : ""}" style="width:100%;margin-top:8px;font-size:11.5px;" onclick="evolvePokemon('${mon.uid}', '${opt.species_id}', ${reqLv}, '${reqStoneId}', ${reqQty})">
                    ✨ Evoluir p/ ${opt.name} (Req: Lv.${reqLv} + ${reqQty}x ${stoneObj.name} [Tem: ${haveQty}])
                </button>`;
            })
            .join("");
    }

    const fallbackUrl = getStandardSpriteFallback(mon.dex_id, mon.is_shiny);

    return `<div class="mon-manage-card" style="${idx === 0 && isParty ? "border-color:#10b981;box-shadow:0 0 16px rgba(16,185,129,0.2);" : ""}">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:6px;">
            <span style="font-weight:900;font-size:15px;">${idx === 0 && isParty ? "🟢 SUMMON ATIVO: " : ""}${mon.is_shiny ? "✨ " : ""}${mon.name} <span style="font-size:12px;color:#9ca3af;">Lv.${mon.level}</span></span>
            ${gradeInfo.badgeHtml}
        </div>

        <div style="display:flex;align-items:center;gap:14px;margin:8px 0;">
            <img src="${getSpriteUrl(mon.dex_id, mon.is_shiny)}" onerror="this.onerror=null;this.src='${fallbackUrl}';" style="width:76px;height:76px;image-rendering:pixelated;object-fit:contain;">
            <div style="font-size:12px;color:#d1d5db;line-height:1.55;flex:1;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:4px;">
                    <div>${renderTypeBadges(mon.elements)}</div>
                    <div style="font-size:11px;">${genderBadge}</div>
                </div>
                <div style="margin-top:4px;font-size:11.5px;color:#a5b4fc;">
                    Natureza: <strong>${mon.nature || "Adamant"}</strong> (${mon.nature_label || "+ATK / -SPA"})
                </div>
                <div style="margin-top:3px;">HP: <strong style="color:#34d399;">${mon.hp}/${mon.max_hp}</strong> • ATK: <strong>${mon.stats.atk}</strong> • SPA: <strong>${mon.stats.spa}</strong></div>
                <div>DEF: <strong>${mon.stats.def}</strong> • SPD: <strong>${mon.stats.spd}</strong> • SPE: <strong>${mon.stats.spe}</strong></div>
            </div>
        </div>

        <div class="iv-grid-mini" title="IVs Individuais (0 a 31 por atributo | Mítico = 144 a 186 Total)">
            <div><div class="iv-cell-lbl">IV HP</div><div class="iv-cell-val">${ivs.hp}</div></div>
            <div><div class="iv-cell-lbl">IV ATK</div><div class="iv-cell-val">${ivs.atk}</div></div>
            <div><div class="iv-cell-lbl">IV DEF</div><div class="iv-cell-val">${ivs.def}</div></div>
            <div><div class="iv-cell-lbl">IV SPA</div><div class="iv-cell-val">${ivs.spa}</div></div>
            <div><div class="iv-cell-lbl">IV SPD</div><div class="iv-cell-val">${ivs.spd}</div></div>
            <div><div class="iv-cell-lbl">IV SPE</div><div class="iv-cell-val">${ivs.spe}</div></div>
        </div>

        <div style="display:flex;gap:6px;flex-wrap:wrap;">
            ${isParty && idx > 0 ? `<button class="btn btn-primary" onclick="setPartyLead(${idx})">📣 Invocar (Go!)</button>` : ""}
            <button class="btn" onclick="trainPokemonWithGold('${mon.uid}')">⬆️ +5 Lv ($250)</button>
            <button class="btn btn-purple" onclick="openRarityUpgradeModal('${mon.uid}')" style="background:#7c3aed;border-color:#a855f7;color:#fff;" title="Aprimorar Raridade">⭐ Aprimorar</button>
            <button class="btn btn-gold" onclick="sellSinglePokemonToShop('${mon.uid}')" title="Vender para a Loja">💰 Vender ($${typeof calculatePokemonGoldValue === 'function' ? calculatePokemonGoldValue(mon).toLocaleString() : 'Loja'})</button>
            ${
                isParty
                    ? `<button class="btn" onclick="movePartyToBox(${idx})">📦 Guardar Depot</button>`
                    : `<button class="btn btn-green" onclick="moveBoxToParty(${idx})">⚡ P/ PokéBar</button>`
            }
        </div>
        ${evoHtml}
    </div>`;
}

function setPartyLead(idx) {
    if (idx < 0 || idx >= STATE.player.party.length) return;
    const [picked] = STATE.player.party.splice(idx, 1);
    STATE.player.party.unshift(picked);
    STATE.tibia.summonOut = true;
    setTrainerSpeech(`Go, ${picked.name}!`);
    scheduleStateSave(1500);
    renderAll();
}

function movePartyToBox(idx) {
    if (STATE.player.party.length <= 1) {
        showToast("⚠️ Você precisa manter pelo menos 1 Pokémon na PokéBar!");
        return;
    }
    const [mon] = STATE.player.party.splice(idx, 1);
    STATE.player.pc_box.push(mon);
    scheduleStateSave(1500);
    renderAll();
}

function moveBoxToParty(idx) {
    if (STATE.player.party.length >= 6) {
        showToast("⚠️ Sua PokéBar já tem 6 Pokémon! Guarde um no Depot primeiro.");
        return;
    }
    const [mon] = STATE.player.pc_box.splice(idx, 1);
    STATE.player.party.push(mon);
    scheduleStateSave(1500);
    renderAll();
}

function trainPokemonWithGold(uid) {
    if (STATE.player.gold < 250) {
        showToast("❌ Você precisa de $250 para treinar +5 níveis!");
        return;
    }
    const allMons = [...STATE.player.party, ...STATE.player.pc_box];
    const mon = allMons.find((m) => m.uid === uid);
    if (!mon) return;
    STATE.player.gold -= 250;
    levelUpPokemon(mon, 5);
    showToast(`⬆️ ${mon.name} subiu para o Nível ${mon.level}!`);
    scheduleStateSave(1500);
    renderAll();
}

function evolvePokemon(uid, targetSpeciesId, reqLv, reqStoneId, reqQty) {
    const allMons = [...STATE.player.party, ...STATE.player.pc_box];
    const mon = allMons.find((m) => m.uid === uid);
    const targetSp = STATE.speciesById[targetSpeciesId];
    if (!mon || !targetSp) return;

    if (mon.level < reqLv) {
        showToast(`⚠️ ${mon.name} precisa estar no Nível ${reqLv} para evoluir!`);
        return;
    }
    const haveQty = STATE.player.inventory[reqStoneId] || 0;
    if (haveQty < reqQty) {
        const stoneObj = STATE.itemsMap[reqStoneId] || { name: reqStoneId };
        showToast(`⚠️ Você precisa de ${reqQty}x ${stoneObj.name}! Compre na aba 🛒 Trade NPC.`);
        return;
    }

    STATE.player.inventory[reqStoneId] = haveQty - reqQty;
    const oldName = mon.name;
    mon.species_id = targetSp.id;
    mon.dex_id = targetSp.dex_id;
    mon.name = targetSp.name;
    mon.elements = targetSp.elements || ["normal"];
    mon.moves = (targetSp.learn_moves || mon.moves || ["tackle"]).slice(0, 4);
    mon.evolves_to = targetSp.evolves_to;
    mon.evolve_level = targetSp.evolve_level || 0;
    mon.evolution_options = targetSp.evolution_options || [];
    levelUpPokemon(mon, 0);

    if (!STATE.player.pokedex_caught.includes(targetSp.id)) {
        STATE.player.pokedex_caught.push(targetSp.id);
    }
    showToast(`🎉 Parabéns! Seu ${oldName} evoluiu para ${mon.name} mantendo seu Roll ×${(mon.quality_multiplier || 1.2).toFixed(2)}!`);
    scheduleStateSave(1500);
    renderAll();
}

// ====================================================
// 8. TRADE NPC SHOP & BACKPACK INVENTORY
// ====================================================
function renderShopAndInventory() {
    const pane = document.getElementById("tab-shop");
    if (!pane || !pane.classList.contains("active")) return;

    const goldLbl = document.getElementById("shop-gold-label");
    if (goldLbl) goldLbl.textContent = `$${STATE.player.gold.toLocaleString()}`;

    const capsGrid = document.getElementById("shop-capsules-grid");
    if (capsGrid) {
        const shopCaps = STATE.capsules.filter((c) => c.shop_eligible);
        capsGrid.innerHTML = shopCaps
            .map((c) => {
                const owned = STATE.player.inventory[c.id] || 0;
                const sprite = c.sprite_url || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
                return `<div class="shop-card">
                    <div>
                        <div style="display:flex;justify-content:space-between;align-items:center;font-weight:800;">
                            <span style="display:flex;align-items:center;gap:6px;">
                                <img class="pixel-item-icon" src="${sprite}" alt="${c.name}">
                                <span>${c.name}</span>
                            </span>
                            <span style="color:#fbbf24;">$${c.price}</span>
                        </div>
                        <div style="font-size:11.5px;color:#34d399;margin:4px 0;">Eficiência: ${c.cond_label}</div>
                        <div style="font-size:11.5px;color:#9ca3af;">Na Backpack: <strong>${owned}</strong></div>
                    </div>
                    <div style="display:flex;gap:6px;">
                        <button class="btn btn-primary" style="flex:1;" onclick="buyShopItem('${c.id}', ${c.price}, 10)">Comprar 10x ($${c.price * 10})</button>
                        <button class="btn" onclick="buyShopItem('${c.id}', ${c.price}, 50)">50x</button>
                    </div>
                </div>`;
            })
            .join("");
    }

    const stonesGrid = document.getElementById("shop-stones-grid");
    if (stonesGrid) {
        stonesGrid.innerHTML = STATE.stones
            .map((s) => {
                const owned = STATE.player.inventory[s.id] || 0;
                const sprite = s.sprite_url || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fire-stone.png";
                return `<div class="shop-card">
                    <div>
                        <div style="display:flex;justify-content:space-between;align-items:center;font-weight:800;">
                            <span style="display:flex;align-items:center;gap:6px;">
                                <img class="pixel-item-icon" src="${sprite}" alt="${s.name}">
                                <span>${s.name}</span>
                            </span>
                            <span style="color:#fbbf24;">$${s.price}</span>
                        </div>
                        <div style="font-size:11.5px;color:#9ca3af;margin-top:4px;">Na Backpack: <strong>${owned}</strong></div>
                    </div>
                    <button class="btn btn-primary" onclick="buyShopItem('${s.id}', ${s.price}, 5)">Comprar 5x ($${s.price * 5})</button>
                </div>`;
            })
            .join("");
    }

    const invGrid = document.getElementById("inventory-grid-container");
    if (invGrid) {
        const entries = Object.entries(STATE.player.inventory).filter(([, qty]) => qty > 0);
        invGrid.innerHTML = entries
            .map(([itemId, qty]) => {
                const item = STATE.itemsMap[itemId] || { name: itemId, type: "material", sell_price: 5 };
                const sprite = item.sprite_url || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png";
                return `<div class="shop-card">
                    <div style="display:flex;justify-content:space-between;align-items:center;font-weight:800;">
                        <span style="display:flex;align-items:center;gap:6px;">
                            <img class="pixel-item-icon" src="${sprite}" alt="${item.name}">
                            <span>${item.name}</span>
                        </span>
                        <span style="color:#34d399;">x${qty}</span>
                    </div>
                    <div style="font-size:11.5px;color:#9ca3af;">Tipo: ${item.type} • Venda NPC: $${item.sell_price || 5}/un</div>
                </div>`;
            })
            .join("");
    }
}

function buyShopItem(itemId, unitPrice, qty) {
    const cost = unitPrice * qty;
    if (STATE.player.gold < cost) {
        showToast(`❌ Gold insuficiente! Você precisa de $${cost.toLocaleString()}.`);
        return;
    }
    STATE.player.gold -= cost;
    STATE.player.inventory[itemId] = (STATE.player.inventory[itemId] || 0) + qty;
    const item = STATE.itemsMap[itemId] || { name: itemId };
    showToast(`🛒 Comprou ${qty}x ${item.name}!`);
    scheduleStateSave(1500);
    renderAll();
}

function sellAllDrops() {
    let totalEarned = 0;
    for (const [itemId, qty] of Object.entries(STATE.player.inventory)) {
        if (qty <= 0) continue;
        const item = STATE.itemsMap[itemId];
        if (!item) continue;
        if (item.type === "capsule" || itemId.indexOf("stone_") === 0 || itemId === "shiny_stone") {
            continue;
        }
        const unitSell = item.sell_price || 8;
        totalEarned += unitSell * qty;
        delete STATE.player.inventory[itemId];
    }
    if (totalEarned === 0) {
        showToast("ℹ️ Nenhum loot de monstro para vender na Backpack.");
        return;
    }
    STATE.player.gold += totalEarned;
    showToast(`💰 Você vendeu todo o loot para o NPC por +$${totalEarned.toLocaleString()}!`);
    scheduleStateSave(1500);
    renderAll();
}

// ====================================================
// 9. ADMIN & CUSTOMIZATION STUDIO
// ====================================================
function populateAdminFields() {
    const c = STATE.config;
    document.getElementById("cfg-catch-mult").value = c.catch_rate_mult;
    document.getElementById("cfg-max-cap").value = c.max_capture_cap;
    document.getElementById("cfg-hp-bonus").checked = !!c.hp_capture_bonus;
    document.getElementById("cfg-exp-mult").value = c.exp_mult;
    document.getElementById("cfg-gold-mult").value = c.gold_mult;
    document.getElementById("cfg-drop-mult").value = c.drop_mult;
    document.getElementById("cfg-shiny-chance").value = c.shiny_chance;
    document.getElementById("cfg-unlock-balls").checked = !!c.unlock_all_capsules;
    document.getElementById("cfg-unlock-legendary").checked = !!c.unlock_legendary_islands;
    document.getElementById("cfg-unlock-safari").checked = !!c.unlock_safari_zone;

    const sel = document.getElementById("admin-species-select");
    if (sel) {
        sel.innerHTML = STATE.species
            .map((s) => `<option value="${s.id}">#${String(s.dex_id).padStart(3, "0")} ${s.name}</option>`)
            .join("");
        loadAdminSpeciesEditor();
    }
}

function loadAdminSpeciesEditor() {
    const sid = document.getElementById("admin-species-select")?.value;
    const sp = STATE.speciesById[sid];
    if (!sp) return;
    document.getElementById("admin-sp-base-chance").value = sp.base_capture_chance ?? 17.65;
    document.getElementById("admin-sp-catch-rate").value = sp.catch_rate ?? 45;
}

async function saveAdminConfig() {
    STATE.config.catch_rate_mult = parseFloat(document.getElementById("cfg-catch-mult").value) || 1.0;
    STATE.config.max_capture_cap = parseFloat(document.getElementById("cfg-max-cap").value) || 98.0;
    STATE.config.hp_capture_bonus = document.getElementById("cfg-hp-bonus").checked;
    STATE.config.exp_mult = parseFloat(document.getElementById("cfg-exp-mult").value) || 1.0;
    STATE.config.gold_mult = parseFloat(document.getElementById("cfg-gold-mult").value) || 1.0;
    STATE.config.drop_mult = parseFloat(document.getElementById("cfg-drop-mult").value) || 1.0;
    STATE.config.shiny_chance = parseFloat(document.getElementById("cfg-shiny-chance").value) || 0.002;
    STATE.config.unlock_all_capsules = document.getElementById("cfg-unlock-balls").checked;
    STATE.config.unlock_legendary_islands = document.getElementById("cfg-unlock-legendary").checked;
    STATE.config.unlock_safari_zone = document.getElementById("cfg-unlock-safari").checked;

    await syncStateToServer();
    const res = await fetch("/api/bootstrap", { headers: getAuthHeaders() });
    const data = await res.json();
    applyBootstrapData(data);
    renderAll();
    showToast("✅ Configurações do servidor salvas e aplicadas em tempo real!");
}

async function applyAdminPreset(presetName) {
    const res = await fetch("/api/admin/preset", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ preset: presetName }),
    });
    const data = await res.json();
    applyBootstrapData(data);
    buildRespawnMapAndMonsters();
    renderAll();
    showToast(`🚀 Preset "${presetName.toUpperCase()}" aplicado com sucesso!`);
}

async function saveAdminSpeciesOverride() {
    const sid = document.getElementById("admin-species-select").value;
    const baseChance = parseFloat(document.getElementById("admin-sp-base-chance").value) || 0;
    const catchRate = parseInt(document.getElementById("admin-sp-catch-rate").value, 10) || 45;

    const res = await fetch("/api/admin/species-override", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
            species_id: sid,
            updates: { base_capture_chance: baseChance, catch_rate: catchRate },
        }),
    });
    const data = await res.json();
    applyBootstrapData(data);
    renderAll();
    showToast(`🧬 Taxa de captura de ${sid} atualizada para ${baseChance}%!`);
}

function spawnCustomPokemonToParty() {
    const sid = document.getElementById("admin-species-select").value;
    const sp = STATE.speciesById[sid];
    if (!sp) return;
    const lvl = parseInt(document.getElementById("spawn-mon-lvl").value, 10) || 100;
    const qualPreset = document.getElementById("spawn-mon-quality").value || "Mítico_Forte";
    const isShiny = document.getElementById("spawn-mon-shiny").checked;

    const newMon = createClientPokemonInstance(sp, lvl, isShiny, qualPreset);
    const gradeInfo = classifyMythicalGrade(newMon);
    if (STATE.player.party.length < 6) {
        STATE.player.party.push(newMon);
    } else {
        STATE.player.pc_box.push(newMon);
    }
    if (!STATE.player.pokedex_caught.includes(sp.id)) {
        STATE.player.pokedex_caught.push(sp.id);
    }
    syncStateToServer();
    renderAll();
    showToast(`✨ ${isShiny ? "SHINY " : ""}${sp.name} (Lv.${lvl} • ${gradeInfo.shortLabel}) adicionado à PokéBar!`);
}

// ====================================================
// 10. CENTRAL SOCIAL HUB (SAFFRON PLAZA — MEET, TRADE, EVOLVE & SOCIAL)
// ====================================================
const LINK_CABLE_EVOLUTIONS = {
    kadabra: { targetId: "alakazam", targetName: "Alakazam", itemLabel: "Cabo Link" },
    haunter: { targetId: "gengar", targetName: "Gengar", itemLabel: "Cabo Link" },
    machoke: { targetId: "machamp", targetName: "Machamp", itemLabel: "Cabo Link" },
    graveler: { targetId: "golem", targetName: "Golem", itemLabel: "Cabo Link" },
    onix: { targetId: "steelix", targetName: "Steelix", itemLabel: "Cabo Link + Metal Coat" },
    scyther: { targetId: "scizor", targetName: "Scizor", itemLabel: "Cabo Link + Metal Coat" },
    poliwhirl: { targetId: "politoed", targetName: "Politoed", itemLabel: "Cabo Link + King's Rock" },
    seadra: { targetId: "kingdra", targetName: "Kingdra", itemLabel: "Cabo Link + Dragon Scale" },
};

const CENTRAL_TRADE_OFFERS = [
    {
        id: "offer_ash_gengar",
        trainerId: "ash_kanto",
        trainerName: "Ash_Kanto",
        giveSpeciesId: "gengar",
        giveDexId: 94,
        giveName: "Gengar",
        giveLevel: 85,
        giveQuality: "Mítico_Medio",
        giveShiny: false,
        costGold: 1500,
        desc: "Evoluído via Cabo Link na Central! Excelente atacante Fantasma/Veneno.",
    },
    {
        id: "offer_misty_lapras",
        trainerId: "misty_water",
        trainerName: "Misty_Water",
        giveSpeciesId: "lapras",
        giveDexId: 131,
        giveName: "Lapras",
        giveLevel: 78,
        giveQuality: "Épico",
        giveShiny: true,
        costGold: 2400,
        desc: "Lapras Shiny de Kanto com alta defesa e ataques de Gelo/Água.",
    },
    {
        id: "offer_brock_steelix",
        trainerId: "brock_miner",
        trainerName: "Brock_Miner",
        giveSpeciesId: "steelix",
        giveDexId: 208,
        giveName: "Steelix",
        giveLevel: 82,
        giveQuality: "Épico",
        giveShiny: false,
        costGold: 1800,
        desc: "Evoluído por Troca com Metal Coat! Tanque metálico imbatível.",
    },
    {
        id: "offer_lance_dragonite",
        trainerId: "lance_dragon",
        trainerName: "Lance_Dragon",
        giveSpeciesId: "dragonite",
        giveDexId: 149,
        giveName: "Dragonite",
        giveLevel: 95,
        giveQuality: "Lendário",
        giveShiny: false,
        costGold: 3200,
        desc: "Dragão Guardião treinado pelo Campeão Lance na Praça Central.",
    },
    {
        id: "offer_cynthia_gardevoir",
        trainerId: "cynthia_pvp",
        trainerName: "Cynthia_PvP",
        giveSpeciesId: "gardevoir",
        giveDexId: 282,
        giveName: "Gardevoir",
        giveLevel: 92,
        giveQuality: "Mítico_Forte",
        giveShiny: true,
        costGold: 4500,
        desc: "Shiny Mítico Forte (IVs 29–31) pronto para dominar qualquer Hunt ou PvP!",
    },
    {
        id: "offer_serena_alakazam",
        trainerId: "serena_star",
        trainerName: "Serena_Star",
        giveSpeciesId: "alakazam",
        giveDexId: 65,
        giveName: "Alakazam",
        giveLevel: 84,
        giveQuality: "Mítico_Fraco",
        giveShiny: false,
        costGold: 2100,
        desc: "Mestre Psíquico evoluído por troca na Mesa de Trade de Saffron.",
    },
];

function initCentralHubPlayersAndStations() {
    getCachedImage("/img/parallaxes/world-fairy.webp");
    getCachedImage("/img/parallaxes/world-grass.webp");
    // Preload official Plaza buildings & props
    [
        "/img/buildings/pokecenter.png",
        "/img/buildings/evo_lab.png",
        "/img/buildings/evo_capsule.png",
        "/img/buildings/pokemart.png",
        "/img/buildings/gym_arena.png",
        "/img/buildings/fountain.png",
        "/img/buildings/tree.png",
        "/img/buildings/lamp.png",
        "/img/trainers/pp_NPC_Nurse.png",
        "/img/trainers/pp_NPC_Scientist.png",
        "/img/trainers/pp_NPC_Gentleman.png",
        "/img/trainers/pp_NPC_Warrior.png",
        "/img/trainers/npc_nurse.png",
        "/img/trainers/npc_oak.png",
        "/img/trainers/npc_gentleman.png",
        "/img/trainers/npc_warrior.png",
    ].forEach((u) => getCachedImage(u));

    STATE.tibia.hubNpcs = [
        {
            id: "npc_nurse_joy",
            stationId: "nurse_joy",
            name: "Enfermeira Joy",
            role: "Centro Pokémon",
            sheetUrl: "/img/trainers/pp_NPC_Nurse.png",
            portraitUrl: "/img/trainers/npc_nurse.png",
            gx: 5,
            gy: 2.38,
            dir: 0,
            color: "#f43f5e",
        },
        {
            id: "npc_prof_oak",
            stationId: "evo_altar",
            name: "Prof. Carvalho",
            role: "Laboratório de Evolução",
            sheetUrl: "/img/trainers/pp_NPC_Scientist.png",
            portraitUrl: "/img/trainers/npc_oak.png",
            gx: 10,
            gy: 2.38,
            dir: 0,
            color: "#a855f7",
        },
        {
            id: "npc_gts_gentleman",
            stationId: "trade_center",
            name: "Diretor do GTS",
            role: "Trocas & Cabo Link",
            sheetUrl: "/img/trainers/pp_NPC_Gentleman.png",
            portraitUrl: "/img/trainers/npc_gentleman.png",
            gx: 5,
            gy: 6.42,
            dir: 3,
            color: "#38bdf8",
        },
        {
            id: "npc_arena_master",
            stationId: "pvp_arena",
            name: "Mestre Palmer",
            role: "Ginásio & Arena PvP",
            sheetUrl: "/img/trainers/pp_NPC_Warrior.png",
            portraitUrl: "/img/trainers/npc_warrior.png",
            gx: 10,
            gy: 6.42,
            dir: 3,
            color: "#eab308",
        },
    ];

    STATE.tibia.hubStations = [
        {
            id: "nurse_joy",
            icon: "🏥",
            npcPortrait: "/img/trainers/npc_nurse.png",
            title: "Centro Pokémon (Enfermeira Joy)",
            sub: "Curar 100% + Bênção da Central",
            gx: 5,
            gy: 2,
            padGx: 5,
            padGy: 3,
            color: "#f43f5e",
        },
        {
            id: "evo_altar",
            icon: "✨",
            npcPortrait: "/img/trainers/npc_oak.png",
            title: "Lab. de Evolução (Prof. Carvalho)",
            sub: "Evoluir por Nível, Pedra ou Cabo Link",
            gx: 10,
            gy: 2,
            padGx: 10,
            padGy: 3,
            color: "#a855f7",
        },
        {
            id: "trade_center",
            icon: "🤝",
            npcPortrait: "/img/trainers/npc_gentleman.png",
            title: "Centro GTS & Shop (Diretor GTS)",
            sub: "Trocar Pokémon com Jogadores",
            gx: 5,
            gy: 7,
            padGx: 5,
            padGy: 6,
            color: "#38bdf8",
        },
        {
            id: "pvp_arena",
            icon: "⚔️",
            npcPortrait: "/img/trainers/npc_warrior.png",
            title: "Ginásio & Arena PvP (Mestre Palmer)",
            sub: "Desafiar Treinadores & Emotes",
            gx: 10,
            gy: 7,
            padGx: 10,
            padGy: 6,
            color: "#eab308",
        },
        {
            id: "pc_depot",
            icon: "📦",
            title: "Terminal PC Box & Time",
            sub: "Gerenciar Pokémon Guardados",
            gx: 4,
            gy: 4,
            padGx: 4,
            padGy: 5,
            color: "#60a5fa",
        },
        {
            id: "poke_mart",
            icon: "🛒",
            title: "Loja Central (PokéMart)",
            sub: "Comprar Pokébolas & Pedras",
            gx: 11,
            gy: 4,
            padGx: 11,
            padGy: 5,
            color: "#34d399",
        },
        {
            id: "hunt_portal",
            icon: "🌀",
            title: "Portal para Rotas de Caça",
            sub: "Voltar ao Mapa de Caça",
            gx: 8,
            gy: 7,
            padGx: 8,
            padGy: 7,
            color: "#22d3ee",
        },
    ];

    if (!STATE.tibia.hubPlayers || STATE.tibia.hubPlayers.length === 0) {
        const rawPlayers = [
            {
                id: "ash_kanto",
                name: "Campeao_Red",
                level: 99,
                avatarModelId: "red_champion",
                roleLabel: "🏆 Campeão Mt. Silver • Trocando Gengar Mítico",
                monSpecies: "charizard",
                monDex: 6,
                monName: "Charizard",
                monShiny: true,
                monQuality: "Mítico",
                gx: 6,
                gy: 3,
                homeGx: 6,
                homeGy: 3,
                phrases: [
                    "...! (Troco Gengar Mítico no Centro GTS da Praça!)",
                    "Meu Charizard Shiny veio direto do Mt. Silver em HeartGold!",
                    "Quem aceita um duelo de Campeões no Ginásio PvP?",
                ],
            },
            {
                id: "misty_water",
                name: "Lyra_SoulSilver",
                level: 92,
                avatarModelId: "lyra_ss",
                roleLabel: "🌟 Heroína Johto • Trocando Lapras Shiny",
                monSpecies: "gyarados",
                monDex: 130,
                monName: "Gyarados",
                monShiny: false,
                monQuality: "Mítico",
                gx: 9,
                gy: 3,
                homeGx: 9,
                homeGy: 3,
                phrases: [
                    "Oi! Trocando Lapras Shiny no Centro GTS da Central!",
                    "A Enfermeira Joy cura todo o time de graça no Centro Pokémon!",
                    "Alguém tem Pedra da Água para evoluir no Lab do Prof. Carvalho?",
                ],
            },
            {
                id: "lance_dragon",
                name: "Lance_Dragon",
                level: 112,
                avatarModelId: "lance_dragon",
                roleLabel: "🐉 Mestre de Dragões • Dragonite Lv.95",
                monSpecies: "dragonite",
                monDex: 149,
                monName: "Dragonite",
                monShiny: true,
                monQuality: "Mítico",
                gx: 10,
                gy: 5,
                homeGx: 10,
                homeGy: 5,
                phrases: [
                    "Sou Lance, Campeão da Liga Johto em HeartGold! 🐉",
                    "Tenho um Dragonite Lv.95 disponível para troca no GTS!",
                    "Desafie o Mestre Palmer no Ginásio PvP da Central!",
                ],
            },
            {
                id: "cynthia_pvp",
                name: "Cynthia_Sinjoh",
                level: 125,
                avatarModelId: "cynthia_champ",
                roleLabel: "👑 Campeã Sinjoh • Gardevoir Shiny Mítico",
                monSpecies: "metagross",
                monDex: 376,
                monName: "Metagross",
                monShiny: true,
                monQuality: "Mítico",
                gx: 6,
                gy: 6,
                homeGx: 6,
                homeGy: 6,
                phrases: [
                    "Vim das Ruínas Sinjoh de HeartGold para a Praça Central! ✨",
                    "Gardevoir Shiny Mítico disponível na Mesa de Trocas!",
                    "Os sprites oficiais de HeartGold deixaram a Central clássica!",
                ],
            },
            {
                id: "brock_miner",
                name: "Steven_Stone",
                level: 105,
                avatarModelId: "steven_stone",
                roleLabel: "💎 Campeão Hoenn/HGSS • Cabo Link",
                monSpecies: "steelix",
                monDex: 208,
                monName: "Steelix",
                monShiny: false,
                monQuality: "Épico",
                gx: 5,
                gy: 5,
                homeGx: 5,
                homeGy: 5,
                phrases: [
                    "Ajudo a evoluir Steelix, Scizor e Gengar no Cabo Link!",
                    "Fale com o Prof. Carvalho no Laboratório de Evolução!",
                    "Clique no seu card no topo para escolher seu Treinador de HeartGold!",
                ],
            },
            {
                id: "serena_star",
                name: "Leaf_Kanto",
                level: 94,
                avatarModelId: "leaf_green",
                roleLabel: "🍃 Mestra Kanto • Wonder Trade",
                monSpecies: "gardevoir",
                monDex: 282,
                monName: "Gardevoir",
                monShiny: false,
                monQuality: "Mítico",
                gx: 9,
                gy: 6,
                homeGx: 9,
                homeGy: 6,
                phrases: [
                    "A Praça Central de Saffron está linda com os prédios oficiais! 🏛️",
                    "Testem os 10 Treinadores Oficiais de HeartGold na aba Avatares!",
                    "Troca Surpresa (Wonder Trade) liberada no GTS!",
                ],
            },
        ];

        STATE.tibia.hubPlayers = rawPlayers.map((p, idx) => {
            getPmdManifest(getPmdSlug(p.monSpecies));
            return {
                ...p,
                px: p.gx * SQM_SIZE,
                py: p.gy * SQM_SIZE,
                monGx: Math.max(2, p.gx - 1),
                monGy: p.gy,
                monPx: Math.max(2, p.gx - 1) * SQM_SIZE,
                monPy: p.gy * SQM_SIZE,
                dir: idx % 2 === 0 ? 2 : 1,
                stepTimer: 25 + idx * 14,
                speechText: idx === 0 ? p.phrases[0] : "",
                speechTimer: idx === 0 ? 90 : 0,
            };
        });
    }
}

function enterOrToggleCentralHub() {
    if (!STATE.tibia.isCentralHub) {
        enterCentralHubMap(true);
    } else {
        const panel = document.getElementById("float-panel-central");
        if (panel && panel.classList.contains("is-hidden")) {
            panel.classList.remove("is-hidden");
            panel.classList.remove("is-collapsed");
            renderCentralHubPanel();
        } else {
            leaveCentralHubMap();
        }
    }
}

function toggleBetweenCentralAndHunt() {
    if (STATE.tibia.isCentralHub) {
        leaveCentralHubMap();
    } else {
        enterCentralHubMap(true);
    }
}

function closeCentralPanel() {
    document.getElementById("float-panel-central")?.classList.add("is-hidden");
}

// ====================================================
// MAP TRANSIT & WARP LOADING SCREEN ENGINE
// ====================================================
const POKEMON_TRANSIT_TIPS = [
    "Dica do Prof. Carvalho: No Altar da Central, você pode evoluir seus Pokémon por Nível, Pedras Elementais ou Cabo Link!",
    "Dica da Nurse Joy: Visite o Centro Pokémon da Cidade Central para curar 100% da sua equipe e receber bênçãos especiais!",
    "Dica do Diretor GTS: No Centro de Trocas você pode negociar espécies raras e shinies com treinadores de todo o mundo.",
    "Dica do Mestre Palmer: O botão ⚡ Auto-Ataque na barra superior executa automaticamente as habilidades do Pokémon em qualquer mapa!",
    "Dica do Explorador: Todas as janelas e a Barra Superior do HUD são 100% redimensionáveis! Puxe a alça dourada ◢ no canto inferior.",
    "Dica de Caça: Use as teclas Alt+1 a Alt+8 para acionar instantaneamente itens e cápsulas da Barra Rápida!",
    "Dica de Batalha: Ataques Super Efetivos causam dano dobrado e atordoam o adversário com animações de recuo e impacto!",
];

let _isTransitingMap = false;

function dismissTransitLoadscreenNow() {
    const screen = document.getElementById("pokepixel-transit-loadscreen");
    if (!screen || screen.classList.contains("is-hidden")) return;
    screen.classList.add("is-leaving");
    setTimeout(() => {
        screen.classList.remove("is-active");
        screen.classList.remove("is-leaving");
        screen.classList.add("is-hidden");
        _isTransitingMap = false;
    }, 120);
}

function showTransitLoadscreen({
    destTitle = "Carregando...",
    modeTag = "✦ TELEPORTE ENTRE MAPAS ✦",
    pillMode = "🗺️ Novo Mapa",
    subText = "Sincronizando terreno e entidades...",
    ballType = "master",
    durationMs = 750,
    onMiddle = null,
} = {}) {
    const screen = document.getElementById("pokepixel-transit-loadscreen");
    if (!screen) {
        if (onMiddle) onMiddle();
        return;
    }

    _isTransitingMap = true;
    const destTitleEl = document.getElementById("transit-dest-title");
    const modeTagEl = document.getElementById("transit-mode-tag");
    const pillModeEl = document.getElementById("transit-pill-mode");
    const subTextEl = document.getElementById("transit-sub-text");
    const tipTextEl = document.getElementById("transit-tip-text");
    const fillEl = document.getElementById("transit-progress-fill");
    const pctEl = document.getElementById("transit-progress-pct");
    const msgEl = document.getElementById("transit-status-msg");
    const ballEl = document.getElementById("transit-ball-icon");

    if (destTitleEl) destTitleEl.textContent = destTitle;
    if (modeTagEl) modeTagEl.textContent = modeTag;
    if (pillModeEl) pillModeEl.textContent = pillMode;
    if (subTextEl) subTextEl.textContent = subText;
    if (tipTextEl) {
        const pick = POKEMON_TRANSIT_TIPS[Math.floor(Math.random() * POKEMON_TRANSIT_TIPS.length)];
        tipTextEl.textContent = pick;
    }
    if (ballEl) {
        ballEl.className = `transit-spinning-ball is-${ballType || "master"}`;
    }

    if (fillEl) fillEl.style.width = "0%";
    if (pctEl) pctEl.textContent = "0%";
    if (msgEl) msgEl.textContent = "Iniciando teleporte...";

    screen.classList.remove("is-hidden");
    screen.classList.remove("is-leaving");
    screen.classList.add("is-active");

    const startTime = performance.now();
    let middleExecuted = false;

    const animFrame = () => {
        const now = performance.now();
        const elapsed = now - startTime;
        const progress = Math.min(1.0, elapsed / durationMs);
        const pct = Math.round(progress * 100);

        if (fillEl) fillEl.style.width = `${pct}%`;
        if (pctEl) pctEl.textContent = `${pct}%`;

        if (progress >= 0.45 && !middleExecuted) {
            middleExecuted = true;
            if (msgEl) msgEl.textContent = "Materializando cenário e criaturas...";
            if (onMiddle) onMiddle();
        }

        if (progress < 1.0) {
            requestAnimationFrame(animFrame);
        } else {
            if (msgEl) msgEl.textContent = "Chegada concluída!";
            setTimeout(() => {
                screen.classList.add("is-leaving");
                setTimeout(() => {
                    screen.classList.remove("is-active");
                    screen.classList.remove("is-leaving");
                    screen.classList.add("is-hidden");
                    _isTransitingMap = false;
                }, 200);
            }, 80);
        }
    };

    requestAnimationFrame(animFrame);
}

function enterCentralHubMap(openWindow = true, subTab = null, skipAnimation = false) {
    if (skipAnimation || STATE.tibia.isCentralHub) {
        enterCentralHubMapInternal(openWindow, subTab);
        return;
    }
    showTransitLoadscreen({
        destTitle: "CIDADE CENTRAL (SAFFRON PLAZA)",
        modeTag: "✦ TELEPORTE PARA ÁREA SEGURA ✦",
        pillMode: "🏙️ Cidade Social Segura",
        subText: "Centro Pokémon, Laboratório de Evolução, GTS e Ginásio PvP",
        ballType: "master",
        durationMs: 750,
        onMiddle: () => {
            enterCentralHubMapInternal(openWindow, subTab);
        },
    });
}

function enterCentralHubMapInternal(openWindow = true, subTab = null) {
    // Pause auto-hunt if active while inside the safe social hub
    if (STATE.autoHuntEnabled) {
        toggleAutoHunt();
    }
    initCentralHubPlayersAndStations();
    STATE.tibia.isCentralHub = true;
    if (subTab) STATE.tibia.centralSubTab = subTab;

    // Build 16x11 Central City Plaza Collision & PZ Matrix
    const matrix = [];
    for (let r = 0; r < GRID_ROWS; r++) {
        const row = [];
        for (let c = 0; c < GRID_COLS; c++) {
            if (r === 0 || r === GRID_ROWS - 1 || c === 0 || c === GRID_COLS - 1) {
                row.push(1); // City walls / trees border
            } else if (r >= 1 && r <= 2 && c >= 4 && c <= 6) {
                row.push(1); // PokéCenter Building footprint (centered in visible viewport!)
            } else if (r >= 1 && r <= 2 && c >= 9 && c <= 11) {
                row.push(1); // Evolution Lab Building footprint
            } else if (r === 7 && c >= 4 && c <= 6) {
                row.push(1); // Trade Center GTS Pavilion
            } else if (r === 7 && c >= 9 && c <= 11) {
                row.push(1); // PvP & Social Arena Pavilion
            } else if (r === 4 && (c === 7 || c === 8)) {
                row.push(1); // Central Golden Pokéball Fountain
            } else {
                row.push(2); // Entire Central City Plaza is a safe Protection Zone (PZ)!
            }
        }
        matrix.push(row);
    }
    STATE.tibia.mapMatrix = matrix;
    STATE.tibia.monsters = [];
    STATE.tibia.corpses = [];
    STATE.tibia.targetId = null;

    // Position Player Trainer near the Central Fountain
    const tr = STATE.tibia.trainer;
    tr.gx = 7;
    tr.gy = 5;
    tr.targetGx = 7;
    tr.targetGy = 5;
    tr.px = tr.gx * SQM_SIZE;
    tr.py = tr.gy * SQM_SIZE;
    tr.dir = 0;
    setTrainerSpeech("Cheguei na Cidade Central!");

    const sum = STATE.tibia.summon;
    sum.gx = 8;
    sum.gy = 5;
    sum.px = sum.gx * SQM_SIZE;
    sum.py = sum.gy * SQM_SIZE;
    sum.dir = 0;

    document.getElementById("menubtn-central")?.classList.add("active");
    document.getElementById("float-panel-atlas")?.classList.add("is-hidden");
    document.getElementById("menubtn-atlas")?.classList.remove("active");

    const centralPanel = document.getElementById("float-panel-central");
    if (centralPanel) {
        if (openWindow) {
            centralPanel.classList.remove("is-hidden");
            centralPanel.classList.remove("is-collapsed");
        }
    }

    addCombatLog(`<span style="color:#38bdf8;font-weight:900;">🏙️ Bem-vindo à CIDADE CENTRAL (Saffron Plaza)! Converse com outros jogadores, troque Pokémon no GTS e evolua no Altar do Prof. Carvalho!</span>`);
    showToast("🏙️ Você entrou na Cidade Central (Saffron Plaza)! Clique nos prédios ou nos jogadores para interagir.");
    renderAll();
}

function leaveCentralHubMap(skipAnimation = false) {
    if (skipAnimation || !STATE.tibia.isCentralHub) {
        leaveCentralHubMapInternal();
        return;
    }
    const zName = STATE.activeZone ? `${STATE.activeZone.world_label} — ${STATE.activeZone.name}` : "Rota de Caça";
    showTransitLoadscreen({
        destTitle: zName.toUpperCase(),
        modeTag: "✦ TELEPORTE PELO PORTAL DA CIDADE ✦",
        pillMode: "⚔️ Rota de Caça & Respawn",
        subText: "Área de Combate Selvagem, Captura e Farm de EXP & Gold",
        ballType: "ultra",
        durationMs: 750,
        onMiddle: () => {
            leaveCentralHubMapInternal();
        },
    });
}

function leaveCentralHubMapInternal() {
    STATE.tibia.isCentralHub = false;
    document.getElementById("menubtn-central")?.classList.remove("active");
    document.getElementById("float-panel-central")?.classList.add("is-hidden");
    buildRespawnMapAndMonsters();
    const zName = STATE.activeZone ? `${STATE.activeZone.world_label} — ${STATE.activeZone.name}` : "Rota de Caça";
    addCombatLog(`<span style="color:#4ade80;font-weight:800;">🌀 Você atravessou o Portal da Central de volta para: ${zName}!</span>`);
    showToast(`🌀 De volta à rota de caça: ${zName}!`);
    renderAll();
}

function switchCentralSubTab(subTab) {
    STATE.tibia.centralSubTab = subTab;
    ["trade", "evolve", "social", "avatars"].forEach((k) => {
        document.getElementById(`csub-btn-${k}`)?.classList.toggle("active", k === subTab);
    });
    const panel = document.getElementById("float-panel-central");
    if (panel) {
        panel.classList.remove("is-hidden");
        panel.classList.remove("is-collapsed");
    }
    renderCentralHubPanel();
}

function handleCentralHubTileClick(gx, gy) {
    const tb = STATE.tibia;

    // 1. Check if clicked on an Online Player or their Follower Pokémon
    const clickedPlayer = (tb.hubPlayers || []).find(
        (hp) => (hp.gx === gx && hp.gy === gy) || (hp.monGx === gx && hp.monGy === gy)
    );
    if (clickedPlayer) {
        selectHubPlayerOnMap(clickedPlayer.id);
        return true;
    }

    // 2. Check if clicked on a Building / NPC / Station or its Interactive Pad
    const station = (tb.hubStations || []).find(
        (st) =>
            (st.gx === gx && st.gy === gy) ||
            (st.padGx === gx && st.padGy === gy) ||
            (Math.abs(st.gx - gx) <= 1 && Math.abs(st.gy - gy) <= 1 && tb.mapMatrix[gy]?.[gx] === 1)
    );
    if (station) {
        walkToAndTriggerHubStation(station.id);
        return true;
    }

    // 3. Check if clicked on the Central Golden Pokéball Fountain (SQM [7..8, 5])
    if (gy === 5 && (gx === 7 || gx === 8)) {
        tb.trainer.targetGx = 7;
        tb.trainer.targetGy = 6;
        sendPlayerHubEmote("✨ Desejando sorte Mítica na Fonte Dourada!");
        return true;
    }

    return false;
}

function selectHubPlayerOnMap(playerId) {
    STATE.tibia.selectedHubPlayerId = playerId;
    const hp = (STATE.tibia.hubPlayers || []).find((x) => x.id === playerId);
    if (hp) {
        const dest = findNearestWalkableTile(hp.gx, hp.gy + 1, false);
        STATE.tibia.trainer.targetGx = dest.gx;
        STATE.tibia.trainer.targetGy = dest.gy;
        hp.speechText = hp.phrases[Math.floor(Math.random() * hp.phrases.length)];
        hp.speechTimer = 110;
        showToast(`👋 Interagindo com ${hp.name} (Lv.${hp.level} • ${hp.monName})!`);
    }
    switchCentralSubTab("trade");
    renderTibiaBattleAndCorpseLists();
}

function walkToAndTriggerHubStation(stationId) {
    const st = (STATE.tibia.hubStations || []).find((s) => s.id === stationId);
    if (st) {
        STATE.tibia.trainer.targetGx = st.padGx;
        STATE.tibia.trainer.targetGy = st.padGy;
    }
    triggerHubStationAction(stationId);
}

function checkCentralHubPadArrival(gx, gy) {
    const st = (STATE.tibia.hubStations || []).find((s) => s.padGx === gx && s.padGy === gy);
    if (st) {
        triggerHubStationAction(st.id);
    }
}

function triggerHubStationAction(stationId) {
    if (stationId === "nurse_joy") {
        healFullParty();
        spawnPokePixelCombatPopup(3, 2, "BÊNÇÃO DA CENTRAL! 💖", "heal", true);
        addCombatLog(`<span style="color:#f472b6;font-weight:900;">🏥 [CENTRO POKÉMON] Nurse Joy curou todo o seu time e renovou suas energias na Praça Central!</span>`);
    } else if (stationId === "evo_altar") {
        switchCentralSubTab("evolve");
        showToast("✨ Altar de Evolução do Prof. Carvalho aberto!");
    } else if (stationId === "trade_center") {
        switchCentralSubTab("trade");
        showToast("🤝 Centro de Trocas & Cabo Link aberto!");
    } else if (stationId === "pvp_arena") {
        switchCentralSubTab("social");
        showToast("⚔️ Arena Social, Chat & Duelos 1v1 aberta!");
    } else if (stationId === "pc_depot") {
        switchTab("party");
    } else if (stationId === "poke_mart") {
        switchTab("shop");
    } else if (stationId === "hunt_portal") {
        leaveCentralHubMap();
    }
}

function updateCentralHubSimulation(spd, runSimStep, sTick) {
    const tb = STATE.tibia;
    for (const hp of tb.hubPlayers || []) {
        if (hp.speechTimer > 0) {
            hp.speechTimer = Math.max(0, hp.speechTimer - spd);
        }
        hp.stepTimer -= spd;
        if (hp.stepTimer <= 0) {
            hp.stepTimer = 45 + Math.floor(Math.random() * 55);
            // Small social stroll around their home spot in the plaza
            const offsets = [
                [0, 0, 0],
                [1, 0, 2],
                [-1, 0, 1],
                [0, 1, 0],
                [0, -1, 3],
            ];
            const pick = offsets[Math.floor(Math.random() * offsets.length)];
            const nx = hp.homeGx + pick[0];
            const ny = hp.homeGy + pick[1];
            if (isTileWalkable(nx, ny) && !(nx === tb.trainer.gx && ny === tb.trainer.gy)) {
                hp.monGx = hp.gx;
                hp.monGy = hp.gy;
                hp.gx = nx;
                hp.gy = ny;
                hp.dir = pick[2];
            }
            // Occasional social chat bubble in the plaza
            if (Math.random() < 0.28 && hp.speechTimer <= 0) {
                hp.speechText = hp.phrases[Math.floor(Math.random() * hp.phrases.length)];
                hp.speechTimer = 95;
            }
        }

        hp.px += (hp.gx * SQM_SIZE - hp.px) * (0.24 * spd);
        hp.py += (hp.gy * SQM_SIZE - hp.py) * (0.24 * spd);
        hp.monPx += (hp.monGx * SQM_SIZE - hp.monPx) * (0.24 * spd);
        hp.monPy += (hp.monGy * SQM_SIZE - hp.monPy) * (0.24 * spd);
    }
}

function drawCentralHubBackground(ctx, tb) {
    const f = tb.frame;

    // 1. Render Lush HD PokePixel Garden / Island Background underneath the City Courtyard
    const bgImg = getCachedImage("/img/parallaxes/world-fairy.webp") || getCachedImage("/img/parallaxes/world-grass.webp");
    if (bgImg && bgImg.complete && !bgImg._failed && bgImg.naturalWidth > 0) {
        const iw = bgImg.naturalWidth;
        const ih = bgImg.naturalHeight;
        ctx.drawImage(
            bgImg,
            Math.round(iw * 0.08),
            Math.round(ih * 0.08),
            Math.round(iw * 0.84),
            Math.round(ih * 0.82),
            0,
            0,
            GRID_COLS * SQM_SIZE,
            GRID_ROWS * SQM_SIZE
        );
    }

    // 2. Render High-Detailed Saffron Courtyard Cobblestone & Royal Marble Tiles (cols 3..12, rows 1..8)
    for (let r = 1; r <= 8; r++) {
        for (let c = 3; c <= 12; c++) {
            const x = c * SQM_SIZE;
            const y = r * SQM_SIZE;
            const isRoyalCenter = r >= 3 && r <= 6 && c >= 5 && c <= 10;

            if (isRoyalCenter) {
                // Ornate Beveled Cream & Gold Royal Marble Tile
                const baseCol = (r + c) % 2 === 0 ? "#f1f5f9" : "#e2e8f0";
                const shadeCol = (r + c) % 2 === 0 ? "#cbd5e1" : "#94a3b8";
                ctx.fillStyle = baseCol;
                ctx.fillRect(x, y, SQM_SIZE, SQM_SIZE);
                // Top/Left highlight bevel
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(x + 1, y + 1, SQM_SIZE - 2, 2);
                ctx.fillRect(x + 1, y + 1, 2, SQM_SIZE - 2);
                // Bottom/Right shadow bevel
                ctx.fillStyle = shadeCol;
                ctx.fillRect(x + 1, y + SQM_SIZE - 3, SQM_SIZE - 2, 2);
                ctx.fillRect(x + SQM_SIZE - 3, y + 1, 2, SQM_SIZE - 2);
                // Inner golden filigree border + corner diamonds
                ctx.strokeStyle = "rgba(217, 119, 6, 0.42)";
                ctx.lineWidth = 1;
                ctx.strokeRect(x + 4.5, y + 4.5, SQM_SIZE - 9, SQM_SIZE - 9);
                ctx.fillStyle = "rgba(234, 179, 8, 0.55)";
                ctx.fillRect(x + 3, y + 3, 3, 3);
                ctx.fillRect(x + SQM_SIZE - 6, y + 3, 3, 3);
                ctx.fillRect(x + 3, y + SQM_SIZE - 6, 3, 3);
                ctx.fillRect(x + SQM_SIZE - 6, y + SQM_SIZE - 6, 3, 3);
            } else {
                // Textured Warm Sandstone Cobblestone Walkway
                const stoneBase = (r + c) % 2 === 0 ? "#d6c7b2" : "#c7b69e";
                ctx.fillStyle = stoneBase;
                ctx.fillRect(x, y, SQM_SIZE, SQM_SIZE);
                // Brick/Cobblestone course lines & highlights
                ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
                ctx.fillRect(x + 2, y + 2, 20, 10);
                ctx.fillRect(x + 25, y + 2, 20, 10);
                ctx.fillRect(x + 12, y + 15, 22, 10);
                ctx.fillRect(x + 2, y + 28, 20, 10);
                ctx.fillRect(x + 25, y + 28, 20, 10);
                ctx.fillStyle = "rgba(71, 85, 105, 0.22)";
                ctx.fillRect(x, y + 13, SQM_SIZE, 1.5);
                ctx.fillRect(x, y + 26, SQM_SIZE, 1.5);
                ctx.fillRect(x, y + 39, SQM_SIZE, 1.5);
            }

            if (STATE.settings && STATE.settings.showGrid) {
                ctx.strokeStyle = "rgba(15, 23, 42, 0.28)";
                ctx.lineWidth = 1;
                ctx.strokeRect(x + 0.5, y + 0.5, SQM_SIZE - 1, SQM_SIZE - 1);
            }
        }
    }

    // 3. Render Interactive Glowing Floor Pads in front of each Station (underneath buildings/entities)
    for (const st of tb.hubStations || []) {
        const px = st.padGx * SQM_SIZE;
        const py = st.padGy * SQM_SIZE;
        const pulse = 0.25 + Math.sin(f * 0.1 + st.padGx) * 0.1;
        ctx.save();
        ctx.fillStyle = st.color || "#38bdf8";
        ctx.globalAlpha = pulse;
        ctx.fillRect(px + 4, py + 4, SQM_SIZE - 8, SQM_SIZE - 8);
        ctx.globalAlpha = 0.85;
        ctx.strokeStyle = st.color || "#38bdf8";
        ctx.lineWidth = 2;
        ctx.strokeRect(px + 4, py + 4, SQM_SIZE - 8, SQM_SIZE - 8);
        // Corner chevron markers
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(px + 5, py + 5, 4, 2);
        ctx.fillRect(px + 5, py + 5, 2, 4);
        ctx.fillRect(px + SQM_SIZE - 9, py + 5, 4, 2);
        ctx.fillRect(px + SQM_SIZE - 7, py + 5, 2, 4);
        ctx.restore();
    }

    // 4. High-Detail Sculpted Official Fountain (SQMs [7..8, 4])
    drawDetailedPlazaFountain(ctx, 7 * SQM_SIZE, 4 * SQM_SIZE, SQM_SIZE * 2, SQM_SIZE, f);

    // 5. Render the 4 Official Plaza Buildings (cols 4..6 & 9..11)
    drawDetailedHubBuilding(ctx, "pokecenter", 4, 1.15, 3, 1.85, "🏥 CENTRO POKÉMON", "ENFERMEIRA JOY", f);
    drawDetailedHubBuilding(ctx, "evo_altar", 9, 1.15, 3, 1.85, "✨ LAB. DE EVOLUÇÃO", "PROF. CARVALHO", f);
    drawDetailedHubBuilding(ctx, "trade_gts", 4, 6.95, 3, 1.85, "🤝 CENTRO GTS & SHOP", "DIRETOR DO GTS", f);
    drawDetailedHubBuilding(ctx, "pvp_arena", 9, 6.95, 3, 1.85, "⚔️ GINÁSIO & ARENA PVP", "MESTRE PALMER", f);

    // 6. Render High-Detailed Kiosks (PC Box, PokéMart Stall, Dimensional Hunt Portal)
    drawDetailedHubKiosk(ctx, "pc_box", 3.85 * SQM_SIZE, 3.85 * SQM_SIZE, "📦 PC BOX", "#60a5fa", f);
    drawDetailedHubKiosk(ctx, "pokemart", 11.15 * SQM_SIZE, 3.85 * SQM_SIZE, "🛒 LOJA", "#34d399", f);
    drawDetailedHubKiosk(ctx, "hunt_portal", 7.5 * SQM_SIZE, 7.12 * SQM_SIZE, "🌀 PORTAL P/ CAÇA", "#22d3ee", f);

    // 7. Official Streetlamps around the Central Square
    const lamps = [
        [6, 3],
        [9, 3],
        [6, 6],
        [9, 6],
    ];
    const lampImg = getCachedImage("/img/buildings/lamp.png");
    for (const [lx, ly] of lamps) {
        const px = lx * SQM_SIZE + 8;
        const py = ly * SQM_SIZE + 12;
        const glow = 0.32 + Math.sin(f * 0.08 + lx) * 0.08;
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.beginPath();
        ctx.ellipse(px, py + 12, 7, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        if (lampImg && lampImg.complete && !lampImg._failed && lampImg.naturalWidth > 0) {
            ctx.drawImage(lampImg, px - 10, py - 26, 20, 40);
        } else {
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(px - 4, py + 7, 8, 5);
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(px - 2, py - 14, 4, 22);
            ctx.fillStyle = "#fef08a";
            ctx.fillRect(px - 3, py - 22, 6, 6);
        }

        // Warm radial lantern halo
        const grad = ctx.createRadialGradient(px, py - 19, 2, px, py - 19, 28);
        grad.addColorStop(0, `rgba(253, 224, 71, ${glow.toFixed(2)})`);
        grad.addColorStop(1, "rgba(253, 224, 71, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py - 19, 28, 0, Math.PI * 2);
        ctx.fill();
    }

    // 8. Official Plaza Foliage & Trees in Courtyard Corners
    const treeImg = getCachedImage("/img/buildings/tree.png");
    if (treeImg && treeImg.complete && !treeImg._failed && treeImg.naturalWidth > 0) {
        const treeSpots = [
            [3.1, 1.2],
            [12.1, 1.2],
            [3.1, 6.7],
            [12.1, 6.7],
        ];
        for (const [tx, ty] of treeSpots) {
            ctx.drawImage(treeImg, tx * SQM_SIZE, ty * SQM_SIZE, 42, 54);
        }
    }
}

const _detailedBuildingCanvasCache = {};

function getDetailedPlazaBuildingCanvas(type) {
    const cacheKey = `hd3d_${type}`;
    if (_detailedBuildingCanvasCache[cacheKey]) return _detailedBuildingCanvasCache[cacheKey];
    const W = 180;
    const H = 112;
    const outCanvas = document.createElement("canvas");
    outCanvas.width = W;
    outCanvas.height = H;
    const outCtx = outCanvas.getContext("2d");
    outCtx.imageSmoothingEnabled = false;

    // Soft Ground Ambient Shadow
    outCtx.fillStyle = "rgba(0, 0, 0, 0.42)";
    outCtx.beginPath();
    outCtx.roundRect(8, 26, W - 12, H - 24, 12);
    outCtx.fill();

    // Base Architecture Layer (Walls, Foundation, Windows, Doors)
    const wallLayer = createPixelArtLayer(W, H);
    // Roof & Towers Layer (3D Sloped/Curved Roofs, Gables, Emblems)
    const roofLayer = createPixelArtLayer(W, H);
    // Foreground Props Layer (Trees, Braziers, Pillars, Lanterns)
    const propLayer = createPixelArtLayer(W, H);

    if (type === "pokecenter") {
        // =====================================================================
        // 1. 🏥 HIGH-DETAILED 3D SAFFRON POKÉMON CENTER (GBA/NDS RPG ARCHITECTURE)
        // =====================================================================
        // Beveled Stone Foundation & Steps
        wallLayer.p(14, 92, W - 28, 14, "#64748b");
        for (let bx = 16; bx < W - 18; bx += 14) {
            wallLayer.p(bx, 94, 12, 5, "#94a3b8");
            wallLayer.p(bx + 4, 100, 12, 4, "#475569");
        }
        // Main Stucco Facade with Side Pilasters & Horizontal Siding
        wallLayer.p(16, 48, W - 32, 46, "#f8fafc");
        for (let sy = 52; sy < 92; sy += 5) {
            wallLayer.p(16, sy, W - 32, 1, "#cbd5e1");
        }
        // Crimson & White Corner Pilasters
        wallLayer.p(16, 48, 10, 46, "#dc2626");
        wallLayer.p(18, 48, 4, 46, "#ef4444");
        wallLayer.p(W - 26, 48, 10, 46, "#dc2626");
        wallLayer.p(W - 22, 48, 4, 46, "#ef4444");
        // Under-eaves shadow
        wallLayer.p(16, 48, W - 32, 5, "#94a3b8");

        // Arched Multi-Pane Windows with Striped Awnings & Flower Planters
        for (const wx of [30, W - 62]) {
            wallLayer.p(wx, 56, 32, 24, "#0f172a");
            wallLayer.p(wx + 2, 58, 28, 20, "#38bdf8");
            wallLayer.p(wx + 4, 60, 24, 10, "#bae6fd");
            wallLayer.p(wx + 4, 70, 24, 8, "#fde047"); // Warm interior light
            wallLayer.p(wx + 15, 58, 2, 20, "#1e293b");
            wallLayer.p(wx + 2, 68, 28, 2, "#1e293b");
            // Red/White Striped Awning
            for (let ax = 0; ax < 32; ax += 4) {
                wallLayer.p(wx + ax, 53, 2, 5, "#ef4444");
                wallLayer.p(wx + ax + 2, 53, 2, 5, "#ffffff");
            }
            // Blooming Flower Box
            wallLayer.p(wx, 79, 32, 6, "#92400e");
            wallLayer.p(wx + 2, 77, 28, 3, "#16a34a");
            wallLayer.p(wx + 5, 76, 4, 2, "#f43f5e");
            wallLayer.p(wx + 14, 76, 4, 2, "#facc15");
            wallLayer.p(wx + 23, 76, 4, 2, "#f43f5e");
        }

        // Recessed Automatic Sliding Glass Double Entrance + Red Pokéball Mat
        const dx = W / 2 - 22;
        wallLayer.p(dx, 55, 44, 49, "#1e293b");
        wallLayer.p(dx + 3, 58, 18, 44, "#0284c7");
        wallLayer.p(dx + 5, 60, 14, 40, "#38bdf8");
        wallLayer.p(dx + 23, 58, 18, 44, "#0284c7");
        wallLayer.p(dx + 25, 60, 14, 40, "#38bdf8");
        // Specular Glass Reflections
        wallLayer.poly([[dx + 7, 62], [dx + 12, 62], [dx + 8, 86], [dx + 5, 86]], "#e0f2fe");
        wallLayer.poly([[dx + 27, 62], [dx + 32, 62], [dx + 28, 86], [dx + 25, 86]], "#e0f2fe");
        // Red Pokéball Welcome Mat
        wallLayer.p(dx + 4, 102, 36, 6, "#dc2626");
        wallLayer.p(dx + 14, 103, 16, 3, "#ffffff");

        // 3D Trapezoidal Mansard Crimson Roof + Central Dome & Pokéball Neon Medallion
        roofLayer.poly(
            [
                [26, 12],
                [W - 26, 12],
                [W - 8, 48],
                [8, 48],
            ],
            "#b91c1c"
        );
        roofLayer.poly(
            [
                [30, 14],
                [W - 30, 14],
                [W - 14, 44],
                [14, 44],
            ],
            "#dc2626"
        );
        // Individual Shaded Roof Shingles & White Metallic Ribs
        for (let rx = 22; rx < W - 24; rx += 12) {
            roofLayer.p(rx, 16, 8, 28, "#ef4444");
            roofLayer.p(rx + 8, 16, 2, 28, "#7f1d1d");
        }
        // Specular Roof Ridge Highlight & White Eaves Trim
        roofLayer.p(30, 14, W - 60, 4, "#fca5a5");
        roofLayer.p(8, 45, W - 16, 4, "#f8fafc");

        // Protruding Central Gable & 3D Pokéball Medallion
        roofLayer.poly([[W / 2 - 26, 48], [W / 2, 15], [W / 2 + 26, 48]], "#f8fafc");
        roofLayer.poly([[W / 2 - 22, 46], [W / 2, 19], [W / 2 + 22, 46]], "#e2e8f0");
        roofLayer.disc(W / 2, 35, 11, 11, "#09090b");
        roofLayer.disc(W / 2, 35, 9, 9, "#ffffff");
        roofLayer.p(W / 2 - 9, 26, 18, 9, "#ef4444");
        roofLayer.p(W / 2 - 9, 34, 18, 3, "#09090b");
        roofLayer.disc(W / 2, 35, 3, 3, "#fef08a");

        // Lush Flanking Pixel-Art Trees & Potted Topiaries
        for (const tx of [10, W - 10]) {
            propLayer.p(tx - 3, 84, 6, 18, "#78350f");
            propLayer.disc(tx, 74, 10, 10, "#15803d");
            propLayer.disc(tx - 2, 71, 7, 7, "#22c55e");
            propLayer.disc(tx + 2, 69, 4, 4, "#86efac");
        }
    } else if (type === "evo_altar") {
        // =====================================================================
        // 2. ✨ HIGH-DETAILED 3D ALTAR DE EVOLUÇÃO (GOTHIC ARCANE CATHEDRAL)
        // =====================================================================
        // Stepped Marble Sanctuary Base
        wallLayer.p(14, 92, W - 28, 14, "#cbd5e1");
        wallLayer.p(22, 97, W - 44, 9, "#94a3b8");

        // Lavender-Stone Cathedral Facade & 4 Fluted Corinthian Columns
        wallLayer.p(18, 48, W - 36, 46, "#ede9fe");
        for (let sy = 54; sy < 92; sy += 6) {
            wallLayer.p(18, sy, W - 36, 1, "#c4b5fd");
        }
        for (const cx of [18, 54, W - 64, W - 28]) {
            wallLayer.p(cx, 48, 10, 46, "#f8fafc");
            wallLayer.p(cx + 3, 48, 4, 46, "#cbd5e1");
            wallLayer.p(cx - 1, 48, 12, 4, "#eab308");
            wallLayer.p(cx - 1, 90, 12, 4, "#eab308");
            wallLayer.p(cx + 4, 64, 2, 12, "#38bdf8"); // Glowing rune
        }

        // Pointed-Arch Elemental Stained-Glass Windows
        for (const [idx, wx] of [31, W - 53].entries()) {
            wallLayer.disc(wx + 11, 60, 10, 8, "#0f172a");
            wallLayer.p(wx + 1, 60, 20, 22, "#0f172a");
            wallLayer.p(wx + 3, 58, 8, 11, idx === 0 ? "#ef4444" : "#3b82f6");
            wallLayer.p(wx + 11, 58, 8, 11, idx === 0 ? "#22c55e" : "#eab308");
            wallLayer.p(wx + 3, 70, 8, 10, idx === 0 ? "#f97316" : "#a855f7");
            wallLayer.p(wx + 11, 70, 8, 10, idx === 0 ? "#38bdf8" : "#ec4899");
            wallLayer.p(wx + 10, 54, 2, 26, "#facc15");
            wallLayer.p(wx + 3, 69, 16, 2, "#facc15");
        }

        // Grand Arched Arcane Portal & Golden Evolution Pedestal
        const dx = W / 2 - 20;
        wallLayer.disc(W / 2, 64, 19, 14, "#1e1b4b");
        wallLayer.p(dx + 1, 64, 38, 38, "#1e1b4b");
        wallLayer.p(dx + 5, 66, 30, 36, "#311042");
        // Glowing Golden Evolution Altar & Levitating Arcane Orb
        wallLayer.p(W / 2 - 10, 86, 20, 14, "#eab308");
        wallLayer.p(W / 2 - 7, 88, 14, 10, "#fef08a");
        wallLayer.disc(W / 2, 72, 7, 7, "#c084fc");
        wallLayer.disc(W / 2, 72, 4, 4, "#ffffff");

        // Steeply Pitched Gothic Purple Slate Roof + Twin Side Turrets + Central Crystal Spire
        roofLayer.poly([[24, 14], [W - 24, 14], [W - 10, 48], [10, 48]], "#581c87");
        for (let ry = 18; ry < 44; ry += 6) {
            for (let rx = 22 + ((ry % 12 === 0) ? 0 : 5); rx < W - 28; rx += 10) {
                roofLayer.p(rx, ry, 8, 4, "#7e22ce");
                roofLayer.p(rx + 2, ry + 1, 4, 2, "#a855f7");
            }
        }
        // Twin Pointed Arcane Side Spires
        roofLayer.poly([[8, 48], [20, 6], [32, 48]], "#6b21a8");
        roofLayer.poly([[W - 32, 48], [W - 20, 6], [W - 8, 48]], "#6b21a8");
        roofLayer.p(19, 2, 3, 6, "#facc15");
        roofLayer.p(W - 22, 2, 3, 6, "#facc15");

        // Central Gothic Pediment & Levitating Prismatic Evolution Crystal
        roofLayer.poly([[W / 2 - 28, 48], [W / 2, 8], [W / 2 + 28, 48]], "#4c1d95");
        roofLayer.poly([[W / 2 - 10, 28], [W / 2, 14], [W / 2 + 10, 28], [W / 2, 42]], "#38bdf8");
        roofLayer.poly([[W / 2 - 6, 28], [W / 2, 18], [W / 2 + 6, 28], [W / 2, 38]], "#e0f2fe");
        roofLayer.p(10, 45, W - 20, 4, "#facc15");

        // Flanking Golden Tripod Mystic Flame Braziers
        for (const bx of [10, W - 10]) {
            propLayer.p(bx - 5, 86, 10, 14, "#eab308");
            propLayer.poly([[bx - 6, 86], [bx, 70], [bx + 6, 86]], "#a855f7");
            propLayer.poly([[bx - 3, 86], [bx, 74], [bx + 3, 86]], "#38bdf8");
        }
    } else if (type === "trade_gts") {
        // =====================================================================
        // 3. 🤝 HIGH-DETAILED 3D CENTRO DE TROCAS & GTS (SILPH CO. / GTS DOME)
        // =====================================================================
        // Steel & Marble Foundation
        wallLayer.p(12, 92, W - 24, 14, "#475569");
        // High-Tech Brushed Titanium & Azure Facade with Link-Cable Conduits
        wallLayer.p(16, 46, W - 32, 48, "#e0f2fe");
        for (let sx = 26; sx < W - 26; sx += 16) {
            wallLayer.p(sx, 46, 2, 48, "#94a3b8");
        }
        // Glowing Neon-Cyan Link Cable Tubes on Outer Pillars
        wallLayer.p(18, 48, 6, 44, "#0284c7");
        wallLayer.p(20, 48, 2, 44, "#67e8f9");
        wallLayer.p(W - 24, 48, 6, 44, "#0284c7");
        wallLayer.p(W - 22, 48, 2, 44, "#67e8f9");

        // Panoramic Showroom Display Windows with Floating Trade Pokéballs
        for (const wx of [28, W - 60]) {
            wallLayer.p(wx, 54, 32, 26, "#0f172a");
            wallLayer.p(wx + 2, 56, 28, 22, "#1e293b");
            // Holographic Stasis Pedestal & Trade Pokéball
            wallLayer.p(wx + 8, 72, 16, 5, "#0284c7");
            wallLayer.p(wx + 10, 60, 12, 12, "#38bdf8");
            wallLayer.disc(wx + 16, 65, 5, 5, "#ffffff");
            wallLayer.p(wx + 11, 60, 10, 5, "#facc15");
        }

        // Dual-Chamber GTS Link-Cable Teleporter Gate
        const dx = W / 2 - 22;
        wallLayer.p(dx, 52, 44, 50, "#0f172a");
        wallLayer.p(dx + 3, 55, 17, 45, "#06b6d4");
        wallLayer.p(dx + 6, 58, 11, 39, "#a5f3fc");
        wallLayer.p(dx + 24, 55, 17, 45, "#f59e0b");
        wallLayer.p(dx + 27, 58, 11, 39, "#fef08a");

        // Futuristic Curved Azure-Titanium GTS Dome Roof + Satellite Dish + Holo-Globe
        roofLayer.disc(W / 2, 44, 68, 30, "#0369a1");
        roofLayer.disc(W / 2, 44, 62, 26, "#0284c7");
        roofLayer.poly([[12, 46], [30, 22], [W - 30, 22], [W - 12, 46]], "#0ea5e9");
        for (let rx = 24; rx < W - 24; rx += 14) {
            roofLayer.p(rx, 22, 3, 24, "#0369a1");
        }
        roofLayer.p(10, 44, W - 20, 4, "#eab308");

        // Left Wing GTS Satellite Comms Dish & Antenna
        roofLayer.poly([[22, 24], [38, 10], [44, 18], [28, 28]], "#cbd5e1");
        roofLayer.p(32, 4, 3, 14, "#94a3b8");
        roofLayer.disc(33, 4, 3, 3, "#ef4444");

        // Central Holographic Golden World Trade Globe
        roofLayer.disc(W / 2, 31, 14, 12, "#0f172a");
        roofLayer.disc(W / 2, 31, 11, 10, "#38bdf8");
        roofLayer.p(W / 2 - 12, 30, 24, 3, "#facc15");
        roofLayer.p(W / 2 - 1, 20, 3, 22, "#facc15");
    } else if (type === "pvp_arena") {
        // =====================================================================
        // 4. ⚔️ HIGH-DETAILED 3D ARENA SOCIAL & PVP (IMPERIAL BATTLE COLOSSEUM)
        // =====================================================================
        // Heavy Fortress Stone Foundation
        wallLayer.p(12, 92, W - 24, 14, "#57534e");
        // Ashlar Fortress Stone-Brick Facade
        wallLayer.p(16, 46, W - 32, 48, "#fef3c7");
        for (let by = 50; by < 90; by += 6) {
            for (let bx = 18 + ((by % 12 === 0) ? 0 : 7); bx < W - 28; bx += 16) {
                wallLayer.p(bx, by, 14, 4, "#fde68a");
                wallLayer.p(bx, by + 4, 14, 1, "#d97706");
            }
        }

        // Hanging Crimson & Royal-Blue Championship Battle Banners
        for (const [idx, bx] of [28, W - 50].entries()) {
            wallLayer.p(bx, 52, 22, 34, "#0f172a");
            wallLayer.p(bx + 2, 54, 18, 28, idx === 0 ? "#dc2626" : "#2563eb");
            wallLayer.p(bx + 2, 78, 18, 4, "#facc15");
            wallLayer.disc(bx + 11, 65, 5, 5, "#fef08a");
        }

        // Grand Arched Iron-Bound Timber Arena Double Gates
        const dx = W / 2 - 22;
        wallLayer.disc(W / 2, 62, 21, 14, "#451a03");
        wallLayer.p(dx + 1, 62, 42, 40, "#451a03");
        wallLayer.p(dx + 4, 62, 17, 38, "#78350f");
        wallLayer.p(dx + 23, 62, 17, 38, "#78350f");
        wallLayer.p(dx + 4, 70, 36, 3, "#1e293b");
        wallLayer.p(dx + 4, 84, 36, 3, "#1e293b");
        wallLayer.disc(dx + 17, 77, 3, 3, "#facc15");
        wallLayer.disc(dx + 27, 77, 3, 3, "#facc15");

        // Sweeping Imperial Pagoda / Colosseum Roof with Upturned Golden Dragon Eaves
        roofLayer.poly(
            [
                [24, 14],
                [W - 24, 14],
                [W - 4, 46],
                [4, 46],
            ],
            "#991b1b"
        );
        // Upturned Pagoda Wing Horns
        roofLayer.poly([[2, 36], [18, 42], [10, 48]], "#facc15");
        roofLayer.poly([[W - 2, 36], [W - 18, 42], [W - 10, 48]], "#facc15");
        for (let rx = 18; rx < W - 20; rx += 12) {
            roofLayer.p(rx, 16, 8, 28, "#dc2626");
            roofLayer.p(rx + 2, 18, 4, 24, "#b45309");
        }
        roofLayer.p(6, 44, W - 12, 4, "#facc15");

        // Central Champion Shield & Crossed Broadswords Crest
        roofLayer.poly([[W / 2 - 24, 46], [W / 2, 10], [W / 2 + 24, 46]], "#78350f");
        roofLayer.poly([[W / 2 - 16, 20], [W / 2 + 16, 38], [W / 2 + 14, 41], [W / 2 - 18, 23]], "#e2e8f0");
        roofLayer.poly([[W / 2 + 16, 20], [W / 2 - 16, 38], [W / 2 - 14, 41], [W / 2 + 18, 23]], "#e2e8f0");
        roofLayer.disc(W / 2, 31, 9, 10, "#eab308");
        roofLayer.disc(W / 2, 31, 6, 7, "#dc2626");
        roofLayer.disc(W / 2, 31, 3, 3, "#fef08a");

        // Twin Roaring Fire Braziers at Arena Entrance
        for (const fx of [10, W - 10]) {
            propLayer.p(fx - 5, 84, 10, 16, "#475569");
            propLayer.poly([[fx - 7, 84], [fx, 66], [fx + 7, 84]], "#f97316");
            propLayer.poly([[fx - 4, 84], [fx, 71], [fx + 4, 84]], "#fde047");
        }
    }

    wallLayer.outline("#09090b");
    roofLayer.outline("#09090b");
    propLayer.outline("#09090b");

    outCtx.drawImage(wallLayer.c, 0, 0);
    outCtx.drawImage(roofLayer.c, 0, 0);
    outCtx.drawImage(propLayer.c, 0, 0);

    _detailedBuildingCanvasCache[cacheKey] = outCanvas;
    return outCanvas;
}

function drawDetailedHubBuilding(ctx, type, startCol, startRow, colsW, rowsH, titleTxt, subTxt, frame = 0) {
    const x = startCol * SQM_SIZE;
    const y = startRow * SQM_SIZE;
    const w = colsW * SQM_SIZE;
    const h = rowsH * SQM_SIZE;

    const buildingMap = {
        pokecenter: "/img/buildings/pokecenter.png",
        evo_lab: "/img/buildings/evo_lab.png",
        trade_gts: "/img/buildings/pokemart.png",
        pvp_arena: "/img/buildings/gym_arena.png",
    };
    const bImg = buildingMap[type] ? getCachedImage(buildingMap[type]) : null;

    ctx.save();
    ctx.imageSmoothingEnabled = false;

    if (bImg && bImg.complete && !bImg._failed && bImg.naturalWidth > 0) {
        // Soft Ground Shadow
        ctx.fillStyle = "rgba(0, 0, 0, 0.42)";
        ctx.beginPath();
        ctx.roundRect(x - 2, y + 24, w + 4, h - 18, 12);
        ctx.fill();

        // Draw Official Pokémon Building Sprite
        if (type === "pvp_arena") {
            ctx.drawImage(bImg, Math.round(x - 14), Math.round(y - 4), Math.round(w + 28), Math.round(h + 8));
        } else if (type === "trade_gts") {
            ctx.drawImage(bImg, Math.round(x - 6), Math.round(y - 8), Math.round(w + 12), Math.round(h + 10));
        } else {
            ctx.drawImage(bImg, Math.round(x - 4), Math.round(y - 12), Math.round(w + 8), Math.round(h + 14));
        }
    } else {
        const bCanvas = getDetailedPlazaBuildingCanvas(type);
        ctx.drawImage(bCanvas, Math.round(x - 4), Math.round(y), Math.round(w + 8), Math.round(h));
    }

    // Integrated Architectural Signboard Plaque on the Eaves
    const badgeW = w - 12;
    const badgeX = x + 6;
    const badgeY = startRow < 4 ? y + 2 : y + 6;
    ctx.fillStyle = "rgba(9, 15, 26, 0.92)";
    ctx.fillRect(badgeX, badgeY, badgeW, 20);
    ctx.strokeStyle = "#fde047";
    ctx.lineWidth = 1.4;
    ctx.strokeRect(badgeX, badgeY, badgeW, 20);

    ctx.fillStyle = "#ffffff";
    ctx.font = getGameCanvasFont("ui", 8.8, "900");
    ctx.textAlign = "center";
    ctx.fillText(titleTxt, x + w / 2, badgeY + 9.5);
    ctx.fillStyle = "#fde047";
    ctx.font = getGameCanvasFont("ui", 7.2, "800");
    ctx.fillText(subTxt, x + w / 2, badgeY + 17.5);
    ctx.restore();
}

function drawDetailedPlazaFountain(ctx, fx, fy, fw, fh, f = 0) {
    const fImg = getCachedImage("/img/buildings/fountain.png");
    ctx.save();
    ctx.imageSmoothingEnabled = false;

    if (fImg && fImg.complete && !fImg._failed && fImg.naturalWidth > 0) {
        // Drop shadow under circular fountain
        ctx.fillStyle = "rgba(0, 0, 0, 0.40)";
        ctx.beginPath();
        ctx.ellipse(fx + fw / 2, fy + fh / 2 + 10, fw / 2 + 6, fh / 2 + 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw Official Pokémon Fountain (144x144)
        ctx.drawImage(fImg, Math.round(fx - 4), Math.round(fy - 22), Math.round(fw + 8), Math.round(fh + 28));

        // Animated Water Ripple & Gleam
        const ripple = (f * 0.35) % 18;
        ctx.strokeStyle = "rgba(224, 242, 254, 0.7)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(fx + fw / 2, fy + fh / 2 - 4, 10 + ripple * 0.6, 5 + ripple * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
    } else {
        // Outer Carved Marble Octagonal Rim & Drop Shadow
        ctx.fillStyle = "rgba(0, 0, 0, 0.38)";
        ctx.beginPath();
        ctx.roundRect(fx + 4, fy + 5, fw - 4, fh - 4, 16);
        ctx.fill();

        // Marble Stone Basin Rim
        ctx.fillStyle = "#e2e8f0";
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(fx + 2, fy + 2, fw - 4, fh - 4, 15);
        ctx.fill();
        ctx.stroke();

        // Golden Inner Trim & Corner Finials
        ctx.strokeStyle = "#eab308";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(fx + 6, fy + 6, fw - 12, fh - 12, 12);
        ctx.stroke();

        // Deep Shaded Azure Pool Water
        const waterGrad = ctx.createRadialGradient(fx + fw / 2, fy + fh / 2, 4, fx + fw / 2, fy + fh / 2, 42);
        waterGrad.addColorStop(0, "#38bdf8");
        waterGrad.addColorStop(0.65, "#0284c7");
        waterGrad.addColorStop(1, "#0369a1");
        ctx.fillStyle = waterGrad;
        ctx.beginPath();
        ctx.roundRect(fx + 7, fy + 7, fw - 14, fh - 14, 11);
        ctx.fill();

        // Fluted Marble Pedestal in Center
        const cx = fx + fw / 2;
        const cy = fy + fh / 2;
        ctx.fillStyle = "#cbd5e1";
        ctx.fillRect(cx - 10, cy + 2, 20, 10);
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cx - 10, cy + 2, 20, 10);

        // 3D-Shaded Golden & Crimson Master Pokéball Monument
        ctx.beginPath();
        ctx.arc(cx, cy - 3, 12, 0, Math.PI * 2);
        ctx.fillStyle = "#eab308";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#0f172a";
        ctx.stroke();

        // Upper Crimson Dome
        ctx.beginPath();
        ctx.arc(cx, cy - 3, 11, Math.PI, 0);
        ctx.fillStyle = "#dc2626";
        ctx.fill();

        // Equator Band & Center Golden Button
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(cx - 12, cy - 5, 24, 4);
        ctx.beginPath();
        ctx.arc(cx, cy - 3, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = "#fef08a";
        ctx.fill();
        ctx.stroke();
    }
    ctx.restore();
}

function drawDetailedHubKiosk(ctx, type, x, y, label, borderCol, f = 0) {
    ctx.save();
    const cx = x + 24;
    const cy = y + 24;

    if (type === "pc_box") {
        // High-Tech Bill's PC Storage Kiosk Terminal
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fillRect(cx - 16, cy - 8, 34, 30);
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(cx - 16, cy - 14, 32, 34);
        ctx.fillStyle = "#1d4ed8";
        ctx.fillRect(cx - 14, cy - 12, 28, 30);
        // Glowing Cyan CRT Monitor
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(cx - 11, cy - 9, 22, 15);
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(cx - 9, cy - 7, 18, 11);
        ctx.fillStyle = "#e0f2fe";
        ctx.fillRect(cx - 7, cy - 5, 6, 4);
        // Pokéball Transfer Pod on Right Side
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(cx + 4, cy + 8, 6, 6);
        ctx.fillStyle = "#cbd5e1";
        ctx.fillRect(cx - 10, cy + 8, 12, 5);
    } else if (type === "pokemart") {
        // Charming RPG PokéMart Merchant Stall with Striped Canopy
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fillRect(cx - 20, cy - 8, 42, 32);
        // Wooden Counter & Displayed Potions/Pokéballs
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(cx - 18, cy + 2, 36, 18);
        ctx.fillStyle = "#92400e";
        ctx.fillRect(cx - 16, cy + 4, 32, 14);
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(cx - 12, cy - 2, 5, 5);
        ctx.fillStyle = "#3b82f6";
        ctx.fillRect(cx - 3, cy - 2, 5, 5);
        ctx.fillStyle = "#eab308";
        ctx.fillRect(cx + 6, cy - 2, 6, 5);
        // Blue & White Striped PokéMart Awning Roof
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(cx - 20, cy - 15, 40, 12);
        for (let sx = -18; sx < 18; sx += 8) {
            ctx.fillStyle = "#0284c7";
            ctx.fillRect(cx + sx, cy - 13, 4, 8);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(cx + sx + 4, cy - 13, 4, 8);
        }
    } else if (type === "hunt_portal") {
        // Swirling Arcane Dimensional Gate flanked by Stone Obelisks
        const pulse = Math.sin(f * 0.12) * 2;
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(cx - 26, cy - 12, 8, 28);
        ctx.fillRect(cx + 18, cy - 12, 8, 28);
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(cx - 24, cy - 6, 4, 12);
        ctx.fillRect(cx + 20, cy - 6, 4, 12);
        // Swirling Portal Vortex
        const grad = ctx.createRadialGradient(cx, cy + 2, 2, cx, cy + 2, 18 + pulse);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.4, "#22d3ee");
        grad.addColorStop(0.8, "#6366f1");
        grad.addColorStop(1, "rgba(15, 23, 42, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy + 2, 18 + pulse, 0, Math.PI * 2);
        ctx.fill();
    }

    // Label Pill Above Kiosk
    ctx.font = getGameCanvasFont("ui", 9, "900");
    const tw = Math.ceil(ctx.measureText(label).width) + 12;
    ctx.fillStyle = "rgba(9, 15, 26, 0.92)";
    ctx.fillRect(cx - tw / 2, cy - 27, tw, 15);
    ctx.strokeStyle = borderCol;
    ctx.lineWidth = 1.4;
    ctx.strokeRect(cx - tw / 2, cy - 27, tw, 15);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(label, cx, cy - 16.5);
    ctx.restore();
}

function drawCentralHubEntities(ctx, tb) {
    // 1. Render Official Plaza NPCs (Enfermeira Joy, Prof. Carvalho, Diretor GTS, Mestre Palmer)
    for (const npc of tb.hubNpcs || []) {
        const npx = npc.gx * SQM_SIZE;
        const npy = npc.gy * SQM_SIZE;
        drawOfficialCharacterSprite(ctx, npc.sheetUrl, npx, npy, npc.dir, tb.frame, false);
        drawTibiaNameplateAndHpBar(
            ctx,
            `⭐ ${npc.name}`,
            1.0,
            npx + 24,
            npy - 4,
            true,
            { isTrainer: true, expRatio: 1.0 }
        );
    }

    // 2. Render Online Trainers & their Follower Pokémon in the Plaza
    for (const hp of tb.hubPlayers || []) {
        // Follower Pokémon
        drawCreatureOnTile(
            ctx,
            hp.monSpecies,
            hp.monDex,
            hp.monShiny,
            hp.monPx,
            hp.monPy,
            hp.dir,
            true,
            hp.monQuality,
            hp
        );
        drawTibiaNameplateAndHpBar(
            ctx,
            `${hp.monShiny ? "✨ " : ""}${hp.monName}`,
            1.0,
            hp.monPx + 24,
            hp.monPy - 2,
            true,
            {}
        );

        // Online Trainer Official HeartGold / PokePixel Sprite
        const isWalking = Math.hypot((hp.gx * SQM_SIZE) - hp.px, (hp.gy * SQM_SIZE) - hp.py) > 1.2;
        draw32BitAnimeTrainerOnCanvas(ctx, hp.avatarModelId, hp.px, hp.py, hp.dir, STATE.tibia.frame, isWalking);
        drawTibiaNameplateAndHpBar(
            ctx,
            `${hp.name} Lv.${hp.level}`,
            1.0,
            hp.px + 24,
            hp.py - 4,
            true,
            { isTrainer: true, expRatio: 0.85 }
        );

        // Online Trainer Speech Bubble
        if (hp.speechTimer > 0 && hp.speechText) {
            ctx.save();
            ctx.font = getGameCanvasFont("ui", 10.5, "bold");
            ctx.textAlign = "center";
            const msg = `${hp.name}: ${hp.speechText}`;
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 3;
            ctx.strokeText(msg, hp.px + 24, hp.py - 23);
            ctx.fillStyle = "#7dd3fc";
            ctx.fillText(msg, hp.px + 24, hp.py - 23);
            ctx.restore();
        }
    }
}

function drawCustomTrainerSprite(ctx, px, py, dir, tunicCol = "#2563eb", capCol = "#dc2626", avatarModelId = "red_ash") {
    draw32BitAnimeTrainerOnCanvas(ctx, avatarModelId || "red_ash", px, py, dir, STATE.tibia.frame);
}

function renderCentralHubPanel() {
    initCentralHubPlayersAndStations();
    const container = document.getElementById("central-hub-content");
    if (!container) return;

    const toggleBtn = document.getElementById("btn-toggle-hub-mode");
    if (toggleBtn) {
        toggleBtn.textContent = STATE.tibia.isCentralHub ? "🌀 Voltar p/ Caça" : "🏙️ Ir p/ Mapa da Central";
    }

    const sub = STATE.tibia.centralSubTab || "trade";
    ["trade", "evolve", "social", "avatars"].forEach((k) => {
        const btn = document.getElementById(`csub-btn-${k}`);
        if (btn) btn.classList.toggle("active", k === sub);
    });

    if (sub === "trade") {
        renderCentralTradeTab(container);
    } else if (sub === "evolve") {
        renderCentralEvolveTab(container);
    } else if (sub === "avatars") {
        renderCentralAvatarsTab(container);
    } else {
        renderCentralSocialTab(container);
    }
}

function renderCentralTradeTab(container) {
    const allMons = [...(STATE.player?.party || []), ...(STATE.player?.pc_box || [])];
    const linkCandidates = allMons.filter((m) => LINK_CABLE_EVOLUTIONS[m.species_id]);

    const linkHtml =
        linkCandidates.length > 0
            ? linkCandidates
                  .map((m) => {
                      const lk = LINK_CABLE_EVOLUTIONS[m.species_id];
                      const targetSp = STATE.speciesById[lk.targetId] || { dex_id: m.dex_id + 1, name: lk.targetName };
                      return `<div class="hub-card">
                        <div class="hub-card-left">
                            <img class="hub-mon-avatar" src="${getSpriteUrl(m.dex_id, m.is_shiny)}" alt="${m.name}">
                            <span style="font-size:16px;color:#fde047;font-weight:900;">🔌 ➔</span>
                            <img class="hub-mon-avatar" src="${getSpriteUrl(targetSp.dex_id, m.is_shiny)}" alt="${lk.targetName}">
                            <div>
                                <div style="font-weight:900;font-size:12px;color:#fff;">${m.is_shiny ? "✨ " : ""}${m.name} (Lv.${m.level}) ➔ <span style="color:#4ade80;">${lk.targetName}</span></div>
                                <div style="font-size:10.5px;color:#94a3b8;">Evolução por Troca (${lk.itemLabel}) • Mantém IVs & Roll ×${(m.quality_multiplier || 1.2).toFixed(2)}</div>
                            </div>
                        </div>
                        <button class="btn btn-green" onclick="executeLinkCableEvolution('${m.uid}', '${lk.targetId}')">🔌 Evoluir no Cabo Link</button>
                    </div>`;
                  })
                  .join("")
            : `<div class="hub-card" style="justify-content:space-between;">
                <span style="font-size:11px;color:#cbd5e1;">Você não tem um Kadabra, Haunter, Machoke, Graveler, Onix ou Scyther no momento.</span>
                <button class="btn btn-primary" onclick="createTradeEvoPokemonForTest()">🎁 Receber Haunter/Kadabra p/ Testar Troca</button>
               </div>`;

    const offersHtml = CENTRAL_TRADE_OFFERS.map((of) => {
        const canAfford = (STATE.player?.gold || 0) >= of.costGold;
        return `<div class="hub-card">
            <div class="hub-card-left">
                <img class="hub-mon-avatar" src="${getSpriteUrl(of.giveDexId, of.giveShiny)}" alt="${of.giveName}">
                <div style="min-width:0;">
                    <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                        <span style="font-weight:900;font-size:12.5px;color:#ffe066;">${of.giveShiny ? "✨ SHINY " : ""}${of.giveName} <small style="color:#cbd5e1;">Lv.${of.giveLevel}</small></span>
                        <span style="font-size:10px;background:#1e293b;color:#38bdf8;padding:1px 6px;border-radius:99px;font-weight:800;">👤 ${of.trainerName}</span>
                    </div>
                    <div style="font-size:10.5px;color:#cbd5e1;margin-top:2px;">${of.desc}</div>
                </div>
            </div>
            <button class="btn ${canAfford ? "btn-primary" : ""}" onclick="executeHubPlayerTrade('${of.id}')">
                🤝 Trocar ($${of.costGold.toLocaleString()})
            </button>
        </div>`;
    }).join("");

    container.innerHTML = `
        <div class="hub-section-banner">
            <span>🔌 CABO LINK — EVOLUÇÃO POR TROCA ENTRE JOGADORES</span>
            <button class="emote-chip" onclick="createTradeEvoPokemonForTest()">+ Gerar Haunter/Kadabra</button>
        </div>
        ${linkHtml}

        <div class="hub-section-banner" style="margin-top:4px;">
            <span>🌐 MESA DE TROCAS DA CENTRAL (OFERTAS DE JOGADORES ONLINE)</span>
            <button class="emote-chip" onclick="executeWonderTrade()">🎲 Troca Surpresa ($800)</button>
        </div>
        ${offersHtml}
    `;
}

function renderCentralEvolveTab(container) {
    const allMons = [...(STATE.player?.party || []), ...(STATE.player?.pc_box || [])];
    const evoCards = [];

    for (const mon of allMons) {
        const sp = STATE.speciesById[mon.species_id] || {};
        const lk = LINK_CABLE_EVOLUTIONS[mon.species_id];
        const opts = sp.evolution_options ? [...sp.evolution_options] : [];
        if (lk && !opts.some((o) => o.species_id === lk.targetId)) {
            opts.push({
                species_id: lk.targetId,
                name: lk.targetName,
                level: 25,
                required_item_id: "stone_normal",
                required_item_qty: 1,
                isLinkCable: true,
            });
        }

        for (const opt of opts) {
            const targetSp = STATE.speciesById[opt.species_id] || { dex_id: mon.dex_id + 1, name: opt.name };
            const reqLv = opt.level || sp.evolve_level || 20;
            const reqStoneId = opt.required_item_id || "stone_normal";
            const reqQty = opt.required_item_qty || 1;
            const stoneObj = STATE.itemsMap[reqStoneId] || { name: reqStoneId };
            const haveQty = STATE.player.inventory[reqStoneId] || 0;
            const canEvo = mon.level >= reqLv && haveQty >= reqQty;

            evoCards.push(`<div class="hub-card">
                <div class="hub-card-left">
                    <img class="hub-mon-avatar" src="${getSpriteUrl(mon.dex_id, mon.is_shiny)}" alt="${mon.name}">
                    <span style="font-size:15px;color:#fde047;font-weight:900;">✨ ➔</span>
                    <img class="hub-mon-avatar" src="${getSpriteUrl(targetSp.dex_id, mon.is_shiny)}" alt="${opt.name}">
                    <div>
                        <div style="font-weight:900;font-size:12px;color:#fff;">
                            ${mon.is_shiny ? "✨ " : ""}${mon.name} (Lv.${mon.level}) ➔ <span style="color:#4ade80;">${opt.name}</span>
                        </div>
                        <div style="font-size:10.5px;color:#cbd5e1;">
                            Requisito: <strong>Lv.${reqLv}</strong> + <strong>${reqQty}x ${stoneObj.name}</strong> (Você tem: ${haveQty}) • Roll ×${(mon.quality_multiplier || 1.2).toFixed(2)}
                        </div>
                    </div>
                </div>
                <div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end;">
                    ${
                        canEvo
                            ? `<button class="btn btn-green" onclick="evolvePokemon('${mon.uid}', '${opt.species_id}', ${reqLv}, '${reqStoneId}', ${reqQty})">✨ Evoluir Agora!</button>`
                            : `<button class="btn btn-amber" onclick="instantAltarEvolveWithGold('${mon.uid}', '${opt.species_id}', ${reqLv})">⚡ Evoluir no Altar ($500)</button>`
                    }
                </div>
            </div>`);
        }
    }

    container.innerHTML = `
        <div class="hub-section-banner">
            <span>✨ ALTAR DE EVOLUÇÃO DO PROF. CARVALHO (NÍVEL, PEDRAS & CABO LINK)</span>
            <span style="font-size:10px;color:#a7f3d0;">Mantém 100% do Grau Mítico e IVs!</span>
        </div>
        ${
            evoCards.length > 0
                ? evoCards.join("")
                : `<div class="hub-card">
                    <span style="font-size:11.5px;color:#cbd5e1;">Todos os Pokémon atuais do seu Time já estão na forma final! Capture ou receba um Pokémon base para evoluir no Altar.</span>
                    <button class="btn btn-primary" onclick="createTradeEvoPokemonForTest()">🎁 Receber Pokémon p/ Evoluir</button>
                   </div>`
        }
    `;
}

function renderCentralSocialTab(container) {
    const players = STATE.tibia.hubPlayers || [];
    const playersHtml = players
        .map((hp) => {
            const trainerAvatarSrc = getTrainerModelDataUrl(hp.avatarModelId || "goku_saiyan");
            return `<div class="hub-card">
                <div class="hub-card-left">
                    <img class="hub-mon-avatar" src="${trainerAvatarSrc}" alt="${hp.name}" style="border-color:#fde047;">
                    <img class="hub-mon-avatar" src="${getSpriteUrl(hp.monDex, hp.monShiny)}" alt="${hp.monName}">
                    <div>
                        <div style="font-weight:900;font-size:12px;color:#fff;">
                            🟢 ${hp.name} <span style="color:#94a3b8;font-size:10.5px;">(Treinador Lv.${hp.level})</span>
                        </div>
                        <div style="font-size:10.5px;color:#fde047;">
                            Parceiro: ${hp.monShiny ? "✨ Shiny " : ""}${hp.monName} (${hp.monQuality}) • ${hp.roleLabel}
                        </div>
                    </div>
                </div>
                <div style="display:flex;gap:5px;">
                    <button class="btn" onclick="selectHubPlayerOnMap('${hp.id}')">🤝 Trocar</button>
                    <button class="btn btn-primary" onclick="challengeHubPlayerDuel('${hp.id}')">⚔️ Duelo 1v1</button>
                </div>
            </div>`;
        })
        .join("");

    container.innerHTML = `
        <div class="hub-section-banner">
            <span>💬 BATE-PAPO DA PRAÇA CENTRAL (SAFFRON PLAZA)</span>
            <span style="font-size:10px;color:#7dd3fc;">Aparece sobre o seu personagem no mapa!</span>
        </div>
        <div style="display:flex;gap:6px;">
            <input type="text" id="hub-custom-chat-input" class="zone-search" style="margin:0;flex:1;" placeholder="Digite uma mensagem para falar na Praça Central (ex: Procuro troca de Shiny!)..." onkeydown="if(event.key==='Enter') sendCustomHubChat()">
            <button class="btn btn-green" onclick="sendCustomHubChat()">💬 Falar no Mapa</button>
        </div>

        <div class="hub-section-banner" style="margin-top:4px;">
            <span>👥 TREINADORES ONLINE NA CIDADE CENTRAL (${players.length} JOGADORES)</span>
        </div>
        ${playersHtml}
    `;
}

function executeLinkCableEvolution(monUid, targetSpeciesId) {
    const allMons = [...STATE.player.party, ...STATE.player.pc_box];
    const mon = allMons.find((m) => m.uid === monUid);
    const targetSp = STATE.speciesById[targetSpeciesId];
    if (!mon || !targetSp) return;

    const oldName = mon.name;
    mon.species_id = targetSp.id;
    mon.dex_id = targetSp.dex_id;
    mon.name = targetSp.name;
    mon.elements = targetSp.elements || mon.elements;
    mon.moves = (targetSp.learn_moves || mon.moves || ["tackle"]).slice(0, 4);
    mon.evolves_to = targetSp.evolves_to;
    mon.evolve_level = targetSp.evolve_level || 0;
    mon.evolution_options = targetSp.evolution_options || [];
    levelUpPokemon(mon, 2);

    if (!STATE.player.pokedex_caught.includes(targetSp.id)) {
        STATE.player.pokedex_caught.push(targetSp.id);
    }

    spawnPokePixelCombatPopup(STATE.tibia.trainer.gx, STATE.tibia.trainer.gy, `EVOLUIU: ${mon.name}! ✨`, "heal", true);
    setTrainerSpeech(`Meu ${oldName} evoluiu para ${mon.name} no Cabo Link!`);
    addCombatLog(`<span style="color:#4ade80;font-weight:900;">🔌 [CABO LINK CENTRAL] Seu ${oldName} foi trocado e evoluiu para <strong>${mon.name} (Lv.${mon.level})</strong>!</span>`);
    showToast(`🎉 Cabo Link: ${oldName} evoluiu para ${mon.name}!`);
    scheduleStateSave(1500);
    renderAll();
}

function instantAltarEvolveWithGold(monUid, targetSpeciesId, reqLv) {
    if (STATE.player.gold < 500) {
        showToast("❌ Você precisa de $500 para usar a Energia Arcana do Altar de Evolução!");
        return;
    }
    const allMons = [...STATE.player.party, ...STATE.player.pc_box];
    const mon = allMons.find((m) => m.uid === monUid);
    const targetSp = STATE.speciesById[targetSpeciesId];
    if (!mon || !targetSp) return;

    STATE.player.gold -= 500;
    if (mon.level < reqLv) {
        levelUpPokemon(mon, reqLv - mon.level);
    }
    const oldName = mon.name;
    mon.species_id = targetSp.id;
    mon.dex_id = targetSp.dex_id;
    mon.name = targetSp.name;
    mon.elements = targetSp.elements || mon.elements;
    mon.moves = (targetSp.learn_moves || mon.moves || ["tackle"]).slice(0, 4);
    mon.evolves_to = targetSp.evolves_to;
    mon.evolve_level = targetSp.evolve_level || 0;
    mon.evolution_options = targetSp.evolution_options || [];
    levelUpPokemon(mon, 0);

    if (!STATE.player.pokedex_caught.includes(targetSp.id)) {
        STATE.player.pokedex_caught.push(targetSp.id);
    }

    spawnPokePixelCombatPopup(STATE.tibia.trainer.gx, STATE.tibia.trainer.gy, `EVOLUIU: ${mon.name}! ✨`, "heal", true);
    setTrainerSpeech(`Evoluí meu ${oldName} para ${mon.name} no Altar!`);
    addCombatLog(`<span style="color:#c084fc;font-weight:900;">✨ [ALTAR DE EVOLUÇÃO] Prof. Carvalho canalizou a pedra elemental e seu ${oldName} evoluiu para <strong>${mon.name} (Lv.${mon.level})</strong>!</span>`);
    showToast(`✨ ${oldName} evoluiu para ${mon.name} no Altar da Central!`);
    scheduleStateSave(1500);
    renderAll();
}

function createTradeEvoPokemonForTest() {
    const picks = ["haunter", "kadabra", "machoke", "graveler", "onix", "scyther"];
    const pickId = picks[Math.floor(Math.random() * picks.length)];
    const sp = STATE.speciesById[pickId] || STATE.species[0];
    if (!sp) return;
    const newMon = createClientPokemonInstance(sp, 45, Math.random() < 0.25, "Mítico_Medio");
    if (STATE.player.party.length < 6) {
        STATE.player.party.push(newMon);
    } else {
        STATE.player.pc_box.unshift(newMon);
    }
    syncStateToServer();
    renderAll();
    showToast(`🎁 Você recebeu um ${newMon.is_shiny ? "✨ Shiny " : ""}${newMon.name} (Lv.45 • Mítico) pronto para evoluir no Cabo Link ou Altar!`);
}

function executeHubPlayerTrade(offerId) {
    const offer = CENTRAL_TRADE_OFFERS.find((o) => o.id === offerId);
    if (!offer) return;
    if (STATE.player.gold < offer.costGold) {
        showToast(`❌ Você precisa de $${offer.costGold.toLocaleString()} para concluir esta troca com ${offer.trainerName}!`);
        return;
    }
    const sp = STATE.speciesById[offer.giveSpeciesId] || STATE.species.find((s) => s.dex_id === offer.giveDexId) || STATE.species[0];
    STATE.player.gold -= offer.costGold;

    const tradedMon = createClientPokemonInstance(sp, offer.giveLevel, offer.giveShiny, offer.giveQuality);
    if (STATE.player.party.length < 6) {
        STATE.player.party.push(tradedMon);
    } else {
        STATE.player.pc_box.unshift(tradedMon);
    }
    if (!STATE.player.pokedex_caught.includes(sp.id)) {
        STATE.player.pokedex_caught.push(sp.id);
    }

    const gradeInfo = classifyMythicalGrade(tradedMon);
    spawnPokePixelCombatPopup(STATE.tibia.trainer.gx, STATE.tibia.trainer.gy, `TRADE: ${tradedMon.name}! 🤝`, "exp", true);
    setTrainerSpeech(`Obrigado pela troca, ${offer.trainerName}!`);
    addCombatLog(`<span style="color:#38bdf8;font-weight:900;">🤝 [TROCA CONCLUÍDA] Você trocou com <strong>${offer.trainerName}</strong> na Central e recebeu <strong>${tradedMon.is_shiny ? "✨ SHINY " : ""}${tradedMon.name} (Lv.${tradedMon.level} • ${gradeInfo.shortLabel})</strong>!</span>`);
    showToast(`🤝 Troca realizada com ${offer.trainerName}! Recebeu ${tradedMon.name} (${gradeInfo.shortLabel})!`);
    scheduleStateSave(1500);
    renderAll();
}

function executeWonderTrade() {
    if (STATE.player.gold < 800) {
        showToast("❌ Você precisa de $800 para realizar uma Troca Surpresa (Wonder Trade)!");
        return;
    }
    STATE.player.gold -= 800;
    const sp = STATE.species[Math.floor(Math.random() * STATE.species.length)];
    const isShiny = Math.random() < 0.18;
    const quals = ["Raro", "Épico", "Lendário", "Mítico_Fraco", "Mítico_Medio", "Mítico_Forte"];
    const qPick = quals[Math.floor(Math.random() * quals.length)];
    const lvl = 50 + Math.floor(Math.random() * 45);

    const wonderMon = createClientPokemonInstance(sp, lvl, isShiny, qPick);
    if (STATE.player.party.length < 6) {
        STATE.player.party.push(wonderMon);
    } else {
        STATE.player.pc_box.unshift(wonderMon);
    }
    if (!STATE.player.pokedex_caught.includes(sp.id)) {
        STATE.player.pokedex_caught.push(sp.id);
    }

    const gradeInfo = classifyMythicalGrade(wonderMon);
    spawnPokePixelCombatPopup(STATE.tibia.trainer.gx, STATE.tibia.trainer.gy, `WONDER: ${wonderMon.name}! 🎲`, "gold", true);
    addCombatLog(`<span style="color:#fde047;font-weight:900;">🎲 [WONDER TRADE] Você recebeu um <strong>${isShiny ? "✨ SHINY " : ""}${wonderMon.name} (Lv.${lvl} • ${gradeInfo.shortLabel})</strong> na Troca Surpresa da Central!</span>`);
    showToast(`🎲 Wonder Trade: Você recebeu ${isShiny ? "✨ SHINY " : ""}${wonderMon.name} (Lv.${lvl} • ${gradeInfo.shortLabel})!`);
    scheduleStateSave(1500);
    renderAll();
}

function sendPlayerHubEmote(msg) {
    setTrainerSpeech(msg);
    spawnFloatingText(STATE.tibia.trainer.gx, STATE.tibia.trainer.gy, msg.slice(0, 18), "#fde047");
    addCombatLog(`<span style="color:#fde047;font-weight:800;">💬 [${STATE.player?.name || "Red"} na Central]: ${msg}</span>`);

    // Make a random online trainer in the plaza reply warmly!
    const players = STATE.tibia.hubPlayers || [];
    if (players.length > 0) {
        const responder = players[Math.floor(Math.random() * players.length)];
        const replies = [
            `Boa, ${STATE.player?.name || "Red"}! Vamos trocar na Mesa de Trade!`,
            "Top demais! Seu time está muito forte! ✨",
            "Bora um duelo amistoso na Arena PvP! ⚔️",
            "Salve! A Cidade Central está cheia hoje! 👋",
        ];
        responder.speechText = replies[Math.floor(Math.random() * replies.length)];
        responder.speechTimer = 110;
    }
}

function sendCustomHubChat() {
    const inp = document.getElementById("hub-custom-chat-input");
    if (!inp) return;
    const txt = inp.value.trim();
    if (!txt) return;
    inp.value = "";
    sendPlayerHubEmote(txt);
}

function challengeHubPlayerDuel(playerId) {
    const hp = (STATE.tibia.hubPlayers || []).find((x) => x.id === playerId);
    if (!hp) return;
    setTrainerSpeech(`Te desafio para um Duelo 1v1, ${hp.name}!`);
    hp.speechText = `Aceito seu desafio! Vai, ${hp.monName}!`;
    hp.speechTimer = 110;
    simulatePvPDuel(hp.monSpecies);
}

// =========================================================================
// 32-BIT PIXEL ART ANIME TRAINER AVATAR ENGINE (10 FAMOUS ANIME MODELS)
// =========================================================================

// =========================================================================
// OFFICIAL STANDARDIZED TRAINER SKINS ARCHITECTURE FOR POKÉLAND
// =========================================================================
const TRAINER_SKINS = [
    {
        id: "ethan",
        aliases: ["ethan_gold", "hgss_ethan", "trainer_male"],
        name: "Ethan / Gold",
        anime: "Pokémon HeartGold (Oficial)",
        title: "Campeão de Johto (New Bark)",
        region: "Johto",
        gender: "male",
        desc: "Protagonista oficial de HeartGold. Boné esportivo invertido, jaqueta e bolsa de viagem.",
        portraitUrl: "/img/trainers/hgss_ethan.png",
        sheetUrl: "/img/trainers/pp_TrainerMale02.png",
        iconUrl: "/img/trainers/icon_pp_TrainerMale02.png",
        topMain: "#2563eb",
    },
    {
        id: "lyra",
        aliases: ["lyra_ss", "hgss_lyra", "lyra_female", "trainer_female"],
        name: "Lyra / Kotone",
        anime: "Pokémon SoulSilver (Oficial)",
        title: "Heroína de Johto (New Bark)",
        region: "Johto",
        gender: "female",
        desc: "Protagonista oficial de SoulSilver. Chapéu branco de palha, macacão jeans e maria-chiquinha.",
        portraitUrl: "/img/trainers/hgss_lyra.png",
        sheetUrl: "/img/trainers/pp_TrainerFemale03.png",
        iconUrl: "/img/trainers/icon_pp_TrainerFemale03.png",
        topMain: "#ec4899",
    },
    {
        id: "red",
        aliases: ["red_champion", "hgss_red", "red_classic", "red_ash"],
        name: "Red Campeão",
        anime: "Pokémon HGSS (Mt. Silver)",
        title: "Lenda Viva do Mt. Silver",
        region: "Kanto",
        gender: "male",
        desc: "O lendário Campeão no cume do Mt. Silver. Boné clássico vermelho, jaqueta e olhar determinado.",
        portraitUrl: "/img/trainers/hgss_red.png",
        sheetUrl: "/img/trainers/pp_TrainerMale01.png",
        iconUrl: "/img/trainers/icon_pp_TrainerMale01.png",
        topMain: "#dc2626",
    },
    {
        id: "blue",
        aliases: ["blue_rival", "hgss_blue"],
        name: "Blue Rival",
        anime: "Pokémon HGSS (Viridian Gym)",
        title: "Líder de Ginásio de Viridian",
        region: "Kanto",
        gender: "male",
        desc: "O eterno rival e gênio tático de Kanto. Postura imponente e domínio estratégico supremo.",
        portraitUrl: "/img/trainers/hgss_blue.png",
        sheetUrl: "/img/trainers/pp_TrainerMale03.png",
        iconUrl: "/img/trainers/icon_pp_TrainerMale03.png",
        topMain: "#7c3aed",
    },
    {
        id: "silver",
        aliases: ["silver_rival", "hgss_silver"],
        name: "Silver Rival",
        anime: "Pokémon HGSS (Rival)",
        title: "Desafiante de Johto",
        region: "Johto",
        gender: "male",
        desc: "Treinador solitário de cabelos escarlates e determinação feroz em busca da verdadeira força.",
        portraitUrl: "/img/trainers/hgss_silver.png",
        sheetUrl: "/img/trainers/pp_TrainerMale05.png",
        iconUrl: "/img/trainers/icon_pp_TrainerMale05.png",
        topMain: "#b91c1c",
    },
    {
        id: "lance",
        aliases: ["lance_dragon", "hgss_lance"],
        name: "Lance Mestre Dragão",
        anime: "Campeão da Liga Johto HGSS",
        title: "Campeão do Planalto Índigo",
        region: "Kanto / Johto",
        gender: "male",
        desc: "Campeão da Liga Pokémon em HeartGold. Capa nobre cerimonial e domínio sobre Dragonite.",
        portraitUrl: "/img/trainers/hgss_lance.png",
        sheetUrl: "/img/trainers/pp_TrainerMale04.png",
        iconUrl: "/img/trainers/icon_pp_TrainerMale04.png",
        topMain: "#ea580c",
    },
    {
        id: "cynthia",
        aliases: ["cynthia_champ", "hgss_cynthia"],
        name: "Cynthia Campeã",
        anime: "Evento Sinjoh HGSS",
        title: "Campeã Suprema de Sinnoh",
        region: "Sinnoh",
        gender: "female",
        desc: "A imbatível Campeã nas Ruínas Sinjoh. Sobretudo negro, enfeites de Lucario e Garchomp.",
        portraitUrl: "/img/trainers/hgss_cynthia.png",
        sheetUrl: "/img/trainers/pp_TrainerFemale02.png",
        iconUrl: "/img/trainers/icon_pp_TrainerFemale02.png",
        topMain: "#1e1b4b",
    },
    {
        id: "jasmine",
        aliases: ["jasmine_steel", "hgss_jasmine"],
        name: "Jasmine Líder de Aço",
        anime: "Ginásio de Olivine HGSS",
        title: "Líder de Aço de Olivine",
        region: "Johto",
        gender: "female",
        desc: "Líder bondosa do Farol e Ginásio de Olivine. Defesa impenetrável com Steelix.",
        portraitUrl: "/img/trainers/hgss_jasmine.png",
        sheetUrl: "/img/trainers/pp_TrainerFemale05.png",
        iconUrl: "/img/trainers/icon_pp_TrainerFemale05.png",
        topMain: "#64748b",
    },
    {
        id: "clair",
        aliases: ["clair_gym", "hgss_clair"],
        name: "Clair Líder Dragão",
        anime: "Ginásio Blackthorn HGSS",
        title: "Mestra dos Dragões de Johto",
        region: "Johto",
        gender: "female",
        desc: "Última líder de ginásio de Johto. Traje azul cobalto e capa cerimonial dos dragões.",
        portraitUrl: "/img/trainers/hgss_clair.png",
        sheetUrl: "/img/trainers/pp_TrainerFemale04.png",
        iconUrl: "/img/trainers/icon_pp_TrainerFemale04.png",
        topMain: "#3b82f6",
    },
    {
        id: "morty",
        aliases: ["morty_ghost", "hgss_morty"],
        name: "Morty Líder Fantasma",
        anime: "Ginásio Ecruteak HGSS",
        title: "Vidente da Torre Queimada",
        region: "Johto",
        gender: "male",
        desc: "Místico de Ecruteak com cachecol roxo e sintonia com os Pokémon espectrais e Ho-Oh.",
        portraitUrl: "/img/trainers/hgss_morty.png",
        sheetUrl: "/img/trainers/pp_TrainerMale07.png",
        iconUrl: "/img/trainers/icon_pp_TrainerMale07.png",
        topMain: "#6366f1",
    },
    {
        id: "leaf",
        aliases: ["leaf_green"],
        name: "Leaf / Green",
        anime: "Pokémon FireRed / HGSS",
        title: "Exploradora de Kanto",
        region: "Kanto",
        gender: "female",
        desc: "Treinadora clássica com chapéu branco, bolsa de viagem e espírito aventureiro.",
        portraitUrl: "/img/trainers/icon_pp_TrainerFemale01.png",
        sheetUrl: "/img/trainers/pp_TrainerFemale01.png",
        iconUrl: "/img/trainers/icon_pp_TrainerFemale01.png",
        topMain: "#059669",
    },
    {
        id: "steven",
        aliases: ["steven_stone"],
        name: "Steven Stone",
        anime: "Campeão Hoenn (HGSS)",
        title: "Campeão Colecionador de Hoenn",
        region: "Hoenn",
        gender: "male",
        desc: "Nobre colecionador de pedras raras e anéis de aço que visita Pewter City em HGSS.",
        portraitUrl: "/img/trainers/icon_pp_TrainerMale06.png",
        sheetUrl: "/img/trainers/pp_TrainerMale06.png",
        iconUrl: "/img/trainers/icon_pp_TrainerMale06.png",
        topMain: "#0284c7",
    }
];

function getStandardTrainerSkin(idOrAlias) {
    if (!idOrAlias) return TRAINER_SKINS[0];
    const key = String(idOrAlias).toLowerCase().trim();
    const found = TRAINER_SKINS.find(s => s.id === key || (s.aliases && s.aliases.includes(key)));
    return found || TRAINER_SKINS[0];
}

const ANIME_TRAINER_MODELS = TRAINER_SKINS;

const _trainerSpriteCanvasCache = {};
const _trainerDataUrlCache = {};

function getActiveTrainerModelId() {
    const saved = STATE.tibia?.trainer?.avatarModelId || STATE.player?.avatar_model;
    if (saved && ANIME_TRAINER_MODELS.some((m) => m.id === saved)) {
        return saved;
    }
    const legacyMap = {
        red_ash: "ethan_gold",
        goku_saiyan: "red_champion",
        naruto_hokage: "lance_dragon",
        luffy_pirate: "steven_stone",
        gojo_sorcerer: "cynthia_champ",
        tanjiro_slayer: "tanjiro_slayer",
        ichigo_reaper: "rengoku_flame",
        vegeta_prince: "steven_stone",
        hatsune_miku: "lyra_ss",
        jotaro_stand: "clair_gym",
    };
    if (saved && legacyMap[saved]) {
        return legacyMap[saved];
    }
    return "ethan_gold";
}

function loadSavedTrainerAvatar() {
    try {
        const saved = localStorage.getItem("pokepixel_trainer_avatar_v1");
        const activeId = getActiveTrainerModelId();
        if (saved && ANIME_TRAINER_MODELS.some((m) => m.id === saved)) {
            STATE.tibia.trainer.avatarModelId = saved;
            if (STATE.player) STATE.player.avatar_model = saved;
        } else {
            STATE.tibia.trainer.avatarModelId = activeId;
            if (STATE.player) STATE.player.avatar_model = activeId;
        }
    } catch (e) {}
    populateTrainerAvatarSelect();
}

function populateTrainerAvatarSelect() {
    const sel = document.getElementById("trainer-avatar-select");
    if (!sel) return;
    const currentId = getActiveTrainerModelId();
    if (sel.options.length !== ANIME_TRAINER_MODELS.length) {
        sel.innerHTML = ANIME_TRAINER_MODELS.map(
            (m, idx) => `<option value="${m.id}">#${idx + 1} ${m.name} (${m.anime})</option>`
        ).join("");
    }
    sel.value = currentId;
}

function selectTrainerAvatarModel(modelId) {
    const model = ANIME_TRAINER_MODELS.find((m) => m.id === modelId);
    if (!model) return;
    STATE.tibia.trainer.avatarModelId = model.id;
    if (STATE.player) STATE.player.avatar_model = model.id;
    try {
        localStorage.setItem("pokepixel_trainer_avatar_v1", model.id);
    } catch (e) {}

    populateTrainerAvatarSelect();
    renderHud();
    if (STATE.tibia.centralSubTab === "avatars") {
        const container = document.getElementById("central-hub-content");
        if (container) renderCentralAvatarsTab(container);
    }
    spawnPokePixelCombatPopup(STATE.tibia.trainer.gx, STATE.tibia.trainer.gy, `SKIN: ${model.name.toUpperCase()}! ✨`, "heal", true);
    setTrainerSpeech(`Equipei o visual 32-bit de ${model.name} (${model.anime})!`);
    showToast(`🎨 Visual 32-Bit equipado: ${model.name} (${model.anime})!`);
}

function openTrainerAvatarSelector() {
    const panel = document.getElementById("float-panel-central");
    if (panel && panel.classList.contains("is-hidden")) {
        toggleFloatPanel("float-panel-central");
    }
    switchCentralSubTab("avatars");
}

function createPixelArtLayer(W = 64, H = 64) {
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const g = c.getContext("2d", { willReadFrequently: true });
    g.imageSmoothingEnabled = false;

    const p = (x, y, w, h, col) => {
        if (!col) return;
        g.fillStyle = col;
        g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    };

    // Integer scanline-filled ellipse (100% crisp pixel art, zero anti-aliasing blur)
    const disc = (cx, cy, rx, ry, col) => {
        if (!col) return;
        g.fillStyle = col;
        const icx = Math.round(cx);
        const icy = Math.round(cy);
        const irx = Math.max(1, Math.round(rx));
        const iry = Math.max(1, Math.round(ry));
        for (let dy = -iry; dy <= iry; dy++) {
            const normY = dy / (iry + 0.35);
            const span = Math.floor(irx * Math.sqrt(Math.max(0, 1 - normY * normY)));
            if (span >= 0) {
                g.fillRect(icx - span, icy + dy, span * 2 + 1, 1);
            }
        }
    };

    // Integer scanline-filled polygon (100% crisp pixel steps for anime hair spikes & capes)
    const poly = (pts, col) => {
        if (!col || !pts || pts.length < 3) return;
        g.fillStyle = col;
        let minY = 999;
        let maxY = -999;
        for (const [vx, vy] of pts) {
            if (vy < minY) minY = Math.floor(vy);
            if (vy > maxY) maxY = Math.ceil(vy);
        }
        minY = Math.max(0, minY);
        maxY = Math.min(H - 1, maxY);
        for (let y = minY; y <= maxY; y++) {
            const scanY = y + 0.5;
            const nodes = [];
            let j = pts.length - 1;
            for (let i = 0; i < pts.length; i++) {
                const [xi, yi] = pts[i];
                const [xj, yj] = pts[j];
                if ((yi < scanY && yj >= scanY) || (yj < scanY && yi >= scanY)) {
                    nodes.push(xi + ((scanY - yi) / (yj - yi)) * (xj - xi));
                }
                j = i;
            }
            nodes.sort((a, b) => a - b);
            for (let k = 0; k < nodes.length - 1; k += 2) {
                const xStart = Math.round(nodes[k]);
                const xEnd = Math.round(nodes[k + 1]);
                if (xEnd >= xStart) {
                    g.fillRect(xStart, y, Math.max(1, xEnd - xStart + 1), 1);
                }
            }
        }
    };

    // 1px Dark Pixel-Art Outline pass around all opaque pixels in this layer
    const outline = (hexCol = "#09090b") => {
        const imgData = g.getImageData(0, 0, W, H);
        const d = imgData.data;
        const rCol = parseInt(hexCol.slice(1, 3), 16);
        const gCol = parseInt(hexCol.slice(3, 5), 16);
        const bCol = parseInt(hexCol.slice(5, 7), 16);
        const alphaCopy = new Uint8Array(W * H);
        for (let i = 0; i < W * H; i++) {
            alphaCopy[i] = d[i * 4 + 3];
        }
        for (let y = 1; y < H - 1; y++) {
            for (let x = 1; x < W - 1; x++) {
                const idx = y * W + x;
                if (alphaCopy[idx] === 0) {
                    if (
                        alphaCopy[idx - 1] > 128 ||
                        alphaCopy[idx + 1] > 128 ||
                        alphaCopy[idx - W] > 128 ||
                        alphaCopy[idx + W] > 128
                    ) {
                        const pIdx = idx * 4;
                        d[pIdx] = rCol;
                        d[pIdx + 1] = gCol;
                        d[pIdx + 2] = bCol;
                        d[pIdx + 3] = 255;
                    }
                }
            }
        }
        g.putImageData(imgData, 0, 0);
    };

    return { c, g, p, disc, poly, outline };
}

function get32BitAnimeTrainerCanvas(modelId, dir = 0, step = 0) {
    const key = `hd64_${modelId}_${dir}_${step}`;
    if (_trainerSpriteCanvasCache[key]) return _trainerSpriteCanvasCache[key];

    const m = ANIME_TRAINER_MODELS.find((x) => x.id === modelId) || ANIME_TRAINER_MODELS[0];
    const W = 64;
    const H = 64;
    const outCanvas = document.createElement("canvas");
    outCanvas.width = W;
    outCanvas.height = H;
    const outCtx = outCanvas.getContext("2d");
    outCtx.imageSmoothingEnabled = false;

    const legL = step === 1 ? -2 : step === 2 ? 2 : 0;
    const legR = step === 1 ? 2 : step === 2 ? -2 : 0;
    const bob = step !== 0 ? -1 : 0;

    // =========================================================================
    // LAYER 0: MULTI-RING ANIME AURA & ENERGY SPARKS (BEHIND CHARACTER)
    // =========================================================================
    if (m.auraColor) {
        const aura = createPixelArtLayer(W, H);
        // Outer & Inner Energy Flame Silhouette
        aura.poly(
            [
                [32, 2 + bob],
                [46, 12 + bob],
                [52, 28 + bob],
                [49, 48 + bob],
                [42, 59],
                [22, 59],
                [15, 48 + bob],
                [12, 28 + bob],
                [18, 12 + bob],
            ],
            m.auraColor
        );
        outCtx.drawImage(aura.c, 0, 0);
    }

    // =========================================================================
    // LAYER 1: BACK PROPS, WEAPONS, CAPES & TWIN-TAILS (OUTLINED IN 1PX BLACK)
    // =========================================================================
    const backLayer = createPixelArtLayer(W, H);
    if (m.accessory === "zangetsu_sword") {
        // Ichigo's Giant Oversized Bandaged Zangetsu Greatsword diagonal across back
        backLayer.poly(
            [
                [44, 4 + bob],
                [51, 7 + bob],
                [24, 54 + bob],
                [17, 50 + bob],
            ],
            "#64748b"
        );
        backLayer.poly(
            [
                [46, 5 + bob],
                [51, 7 + bob],
                [24, 54 + bob],
                [21, 52 + bob],
            ],
            "#f8fafc"
        );
        // Wrapped white cloth hilt & trailing bandage ribbon
        backLayer.p(41, 2 + bob, 4, 7, "#e2e8f0");
        backLayer.p(41, 4 + bob, 4, 2, "#94a3b8");
        backLayer.p(38, 1 + bob, 4, 3, "#f8fafc");
    } else if (m.accessory === "ninja_scroll") {
        // Naruto's Large Sage Summoning Scroll strapped horizontally behind waist
        backLayer.p(14, 34 + bob, 36, 9, "#dc2626");
        backLayer.p(14, 35 + bob, 36, 3, "#ef4444");
        backLayer.p(11, 35 + bob, 4, 7, "#fef08a");
        backLayer.p(49, 35 + bob, 4, 7, "#fef08a");
        backLayer.p(18, 34 + bob, 3, 9, "#18181b");
        backLayer.p(43, 34 + bob, 3, 9, "#18181b");
    }
    if (m.hairStyle === "miku_twintails") {
        // Hatsune Miku's Flowing Long Twin-Tails with Gradient Shading & Hair Ties
        backLayer.poly(
            [
                [17, 14 + bob],
                [10, 16 + bob],
                [6, 36 + bob],
                [4, 54 + bob],
                [12, 55 + bob],
                [15, 36 + bob],
            ],
            m.hairColor
        );
        backLayer.poly(
            [
                [15, 16 + bob],
                [11, 18 + bob],
                [8, 36 + bob],
                [11, 50 + bob],
                [13, 35 + bob],
            ],
            m.hairHi
        );
        backLayer.poly(
            [
                [47, 14 + bob],
                [54, 16 + bob],
                [58, 36 + bob],
                [60, 54 + bob],
                [52, 55 + bob],
                [49, 36 + bob],
            ],
            m.hairColor
        );
        backLayer.poly(
            [
                [49, 16 + bob],
                [53, 18 + bob],
                [56, 36 + bob],
                [53, 50 + bob],
                [51, 35 + bob],
            ],
            m.hairHi
        );
        // Magenta/Black Square Vocaloid Ribbons (Chou-Chou)
        backLayer.p(12, 13 + bob, 6, 5, "#ec4899");
        backLayer.p(14, 14 + bob, 3, 3, "#18181b");
        backLayer.p(46, 13 + bob, 6, 5, "#ec4899");
        backLayer.p(47, 14 + bob, 3, 3, "#18181b");
    }
    backLayer.outline("#09090b");
    outCtx.drawImage(backLayer.c, 0, 0);

    // =========================================================================
    // LAYER 2: SCULPTED LEGS, BOOTS, TORSO, OUTFIT & ARMS (OUTLINED IN 1PX BLACK)
    // =========================================================================
    const bodyLayer = createPixelArtLayer(W, H);

    // --- A. Legs & Detailed Boots ---
    // Left Leg
    bodyLayer.p(21, 44 + legL, 8, 9, m.pantsColor);
    bodyLayer.p(21, 44 + legL, 2, 9, "#1e293b"); // Outer leg shadow
    bodyLayer.p(24, 45 + legL, 3, 6, m.topMain === m.pantsColor ? m.topMain : m.pantsColor);
    // Right Leg
    bodyLayer.p(35, 44 + legR, 8, 9, m.pantsColor);
    bodyLayer.p(41, 44 + legR, 2, 9, "#1e293b");
    // Left & Right Boots with Soles & Tongue Highlights
    bodyLayer.p(20, 52 + legL, 9, 7, m.bootsColor);
    bodyLayer.p(22, 53 + legL, 4, 3, "#ffffff"); // Boot tongue/trim highlight
    bodyLayer.p(19, 57 + legL, 10, 2, "#18181b"); // Boot sole
    bodyLayer.p(35, 52 + legR, 9, 7, m.bootsColor);
    bodyLayer.p(38, 53 + legR, 4, 3, "#ffffff");
    bodyLayer.p(35, 57 + legR, 10, 2, "#18181b");

    // --- B. Sculpted Torso, Jacket/Gi/Armor & Outfit Details ---
    // Tapered Torso Polygon
    bodyLayer.poly(
        [
            [18, 29 + bob],
            [46, 29 + bob],
            [44, 45 + bob],
            [20, 45 + bob],
        ],
        m.topMain
    );
    // Lower torso & side fold shading
    bodyLayer.p(20, 39 + bob, 24, 6, m.topShade);
    bodyLayer.p(19, 31 + bob, 3, 12, m.topShade);
    bodyLayer.p(42, 31 + bob, 3, 12, m.topShade);

    // Inner V-Neck / Shirt / Chest Detail
    bodyLayer.poly(
        [
            [26, 29 + bob],
            [38, 29 + bob],
            [35, 39 + bob],
            [29, 39 + bob],
        ],
        m.innerShirt
    );
    // Collar Lapels
    bodyLayer.p(24, 28 + bob, 16, 3, m.collarColor);
    bodyLayer.p(28, 30 + bob, 8, 2, m.innerShirt);

    // Character-Specific High-Detail Costume Elements
    if (m.id === "red_ash") {
        // Red's White Jacket Stripes, Gold Zipper & Yellow Backpack Straps
        bodyLayer.p(20, 30 + bob, 3, 12, "#facc15");
        bodyLayer.p(41, 30 + bob, 3, 12, "#facc15");
        bodyLayer.p(31, 31 + bob, 2, 13, "#f8fafc");
        bodyLayer.p(21, 41 + bob, 22, 2, "#ffffff");
    } else if (m.id === "goku_saiyan") {
        // Goku's Muscular Chest V-Neck, Blue Undershirt, Kame Emblem & Knotted Obi Sash
        bodyLayer.poly(
            [
                [27, 29 + bob],
                [37, 29 + bob],
                [34, 36 + bob],
                [30, 36 + bob],
            ],
            m.skin
        );
        bodyLayer.p(24, 29 + bob, 4, 8, "#1d4ed8");
        bodyLayer.p(36, 29 + bob, 4, 8, "#1d4ed8");
        // White Circle Kame Patch on Left Chest
        bodyLayer.disc(38, 35 + bob, 3, 3, "#ffffff");
        bodyLayer.p(37, 34 + bob, 2, 3, "#09090b");
    } else if (m.id === "naruto_hokage") {
        // Naruto's High Black Collar, White Zipper Line & Orange/Black Shoulders
        bodyLayer.p(20, 29 + bob, 24, 4, "#18181b");
        bodyLayer.p(31, 30 + bob, 2, 13, "#fde047");
        bodyLayer.p(35, 47 + legR, 8, 3, "#ffffff"); // Right thigh kunai bandage wrap
        bodyLayer.p(42, 46 + legR, 3, 5, "#18181b"); // Kunai holster
    } else if (m.id === "luffy_pirate") {
        // Luffy's Open Red Vest with Gold Buttons & Bare Chest with X-Scar
        bodyLayer.p(27, 29 + bob, 10, 13, m.skin);
        bodyLayer.p(28, 30 + bob, 8, 2, m.skinShade);
        // Detailed X-shaped Akainu Chest Scar
        bodyLayer.poly([[28, 32 + bob], [30, 32 + bob], [36, 38 + bob], [34, 38 + bob]], "#b91c1c");
        bodyLayer.poly([[34, 32 + bob], [36, 32 + bob], [30, 38 + bob], [28, 38 + bob]], "#b91c1c");
        // Gold Vest Buttons
        bodyLayer.p(24, 33 + bob, 2, 2, "#fde047");
        bodyLayer.p(24, 38 + bob, 2, 2, "#fde047");
        // White Frayed Denim Shorts Cuffs
        bodyLayer.p(21, 50 + legL, 8, 2, "#f8fafc");
        bodyLayer.p(35, 50 + legR, 8, 2, "#f8fafc");
    } else if (m.id === "gojo_sorcerer") {
        // Gojo's High-Collared Dark Jujutsu Uniform with Gold Buttons
        bodyLayer.p(23, 27 + bob, 18, 5, "#0f172a");
        bodyLayer.p(25, 34 + bob, 2, 2, "#eab308");
        bodyLayer.p(25, 39 + bob, 2, 2, "#eab308");
    } else if (m.id === "tanjiro_slayer") {
        // Tanjiro's Iconic Green-and-Black Ichimatsu Checkered Haori over Dark Corps Uniform
        for (let ty = 0; ty < 4; ty++) {
            for (let tx = 0; tx < 7; tx++) {
                const isBlk = (tx + ty) % 2 === 0;
                bodyLayer.p(19 + tx * 4, 30 + bob + ty * 4, 4, 4, isBlk ? "#111827" : "#10b981");
            }
        }
        // Dark Demon Slayer Gakuran center & white belt + gold buttons
        bodyLayer.p(28, 30 + bob, 8, 14, "#18181b");
        bodyLayer.p(31, 32 + bob, 2, 2, "#facc15");
        bodyLayer.p(31, 36 + bob, 2, 2, "#facc15");
        // Nichirin Katana Hilt at Left Hip
        bodyLayer.p(13, 41 + bob, 7, 3, "#facc15");
        bodyLayer.p(11, 42 + bob, 4, 2, "#18181b");
    } else if (m.id === "ichigo_reaper") {
        // Ichigo's Black Shihakusho, White Inner Collar & Red Chest Strap
        bodyLayer.poly([[20, 30 + bob], [24, 30 + bob], [42, 42 + bob], [38, 42 + bob]], "#dc2626");
        bodyLayer.p(30, 35 + bob, 4, 4, "#fef08a"); // Substitute Shinigami Badge
    } else if (m.id === "vegeta_prince") {
        // Vegeta's Curved Golden Shoulder Pauldrons & Ribbed White Saiyan Armor
        bodyLayer.poly([[11, 28 + bob], [24, 28 + bob], [22, 34 + bob], [13, 33 + bob]], "#facc15");
        bodyLayer.poly([[40, 28 + bob], [53, 28 + bob], [51, 33 + bob], [42, 34 + bob]], "#facc15");
        bodyLayer.p(14, 29 + bob, 8, 2, "#fef08a");
        bodyLayer.p(42, 29 + bob, 8, 2, "#fef08a");
        bodyLayer.p(21, 31 + bob, 22, 11, "#f8fafc");
        // Golden Ribbed Abdomen Plates
        bodyLayer.p(25, 35 + bob, 14, 7, "#eab308");
        bodyLayer.p(27, 36 + bob, 2, 5, "#a16207");
        bodyLayer.p(31, 36 + bob, 2, 5, "#a16207");
        bodyLayer.p(35, 36 + bob, 2, 5, "#a16207");
    } else if (m.id === "hatsune_miku") {
        // Hatsune Miku's Silver Cyber Top, Long Cyan Tie & Pleated Dark Skirt
        bodyLayer.poly([[30, 31 + bob], [34, 31 + bob], [35, 42 + bob], [32, 45 + bob], [29, 42 + bob]], "#06b6d4");
        bodyLayer.p(31, 32 + bob, 2, 9, "#67e8f9");
        // Pleated Skirt with Cyan Hem Trim
        bodyLayer.poly([[18, 42 + bob], [46, 42 + bob], [48, 49 + bob], [16, 49 + bob]], "#1e293b");
        bodyLayer.p(17, 48 + bob, 30, 2, "#06b6d4");
    } else if (m.id === "jotaro_stand") {
        // Jotaro's Long Flared Trench Coat Tails & Heavy Gold Collar Chain
        bodyLayer.poly([[18, 42 + bob], [26, 42 + bob], [24, 54 + bob], [15, 54 + bob]], m.topMain);
        bodyLayer.poly([[38, 42 + bob], [46, 42 + bob], [49, 54 + bob], [40, 54 + bob]], m.topMain);
        // Thick Gold Chain dangling from Collar
        bodyLayer.p(37, 29 + bob, 4, 10, "#facc15");
        bodyLayer.p(38, 30 + bob, 2, 8, "#fef08a");
    }

    // Belt & Optional Belt Pokéball
    bodyLayer.p(20, 42 + bob, 24, 3, m.beltColor);
    bodyLayer.p(30, 42 + bob, 4, 3, "#fef08a"); // Belt buckle
    if (m.accessory === "pokeball") {
        bodyLayer.disc(39, 43 + bob, 3, 3, "#ffffff");
        bodyLayer.p(36, 40 + bob, 6, 3, "#ef4444");
        bodyLayer.p(36, 43 + bob, 6, 1, "#09090b");
    }

    // --- C. Articulated Arms, Sleeves & Hands/Gloves ---
    const armCol = m.id === "goku_saiyan" || m.id === "luffy_pirate" ? m.skin : m.topMain;
    // Left Arm
    bodyLayer.p(13, 30 + bob + legR, 6, 10, armCol);
    bodyLayer.p(13, 39 + bob + legR, 6, 5, m.gloveColor);
    // Right Arm
    bodyLayer.p(45, 30 + bob + legL, 6, 10, armCol);
    bodyLayer.p(45, 39 + bob + legL, 6, 5, m.gloveColor);

    bodyLayer.outline("#09090b");
    outCtx.drawImage(bodyLayer.c, 0, 0);

    // =========================================================================
    // LAYER 3: SCULPTED HEAD, EARS, ANIME EYES & EXPRESSIONS (OUTLINED IN 1PX)
    // =========================================================================
    const headLayer = createPixelArtLayer(W, H);

    // Neck & Collar Shadow
    headLayer.p(28, 25 + bob, 8, 5, m.skinShade);

    // Left & Right Ears
    headLayer.p(15, 18 + bob, 4, 6, m.skin);
    headLayer.p(16, 19 + bob, 2, 4, m.skinShade);
    headLayer.p(45, 18 + bob, 4, 6, m.skin);
    headLayer.p(46, 19 + bob, 2, 4, m.skinShade);

    // Rounded Sculpted Anime Head & Tapered Chin/Jawline
    headLayer.disc(32, 18 + bob, 14, 11, m.skin);
    headLayer.poly(
        [
            [18, 19 + bob],
            [46, 19 + bob],
            [42, 27 + bob],
            [32, 29 + bob],
            [22, 27 + bob],
        ],
        m.skin
    );
    // Lower Cheek & Chin Shading
    headLayer.poly(
        [
            [20, 24 + bob],
            [44, 24 + bob],
            [41, 27 + bob],
            [32, 29 + bob],
            [23, 27 + bob],
        ],
        m.skinShade
    );

    headLayer.outline("#09090b");

    // Detailed Anime Facial Features (drawn inside the outlined head)
    if (dir !== 3) {
        const eyeShift = dir === 1 ? -2 : dir === 2 ? 2 : 0;

        if (m.hairStyle === "gojo_blindfold") {
            // Gojo's Textured Black Wraparound Blindfold + Glowing Cyan Six-Eyes Wisps
            headLayer.p(17, 15 + bob, 30, 7, "#09090b");
            headLayer.p(18, 16 + bob, 28, 5, "#1e293b");
            headLayer.p(22 + eyeShift, 17 + bob, 5, 3, "#38bdf8");
            headLayer.p(23 + eyeShift, 18 + bob, 3, 2, "#ffffff");
            headLayer.p(37 + eyeShift, 17 + bob, 5, 3, "#38bdf8");
            headLayer.p(38 + eyeShift, 18 + bob, 3, 2, "#ffffff");
        } else {
            // Left & Right Expressive 6x6 Anime Eyes
            for (const ex of [21 + eyeShift, 36 + eyeShift]) {
                // Dark Upper Eyelash Arch
                headLayer.p(ex, 16 + bob, 7, 2, "#09090b");
                // White Sclera
                headLayer.p(ex, 18 + bob, 7, 5, "#ffffff");
                // Colored Iris & Dark Pupil
                headLayer.p(ex + 2, 18 + bob, 4, 5, m.eyeColor);
                headLayer.p(ex + 3, 19 + bob, 2, 3, "#09090b");
                // Crisp 2x2 White Specular Anime Eye Highlight
                headLayer.p(ex + 1, 18 + bob, 2, 2, "#ffffff");
                // Expressive Eyebrow
                headLayer.p(ex, 14 + bob, 7, 1, "#18181b");
            }
        }

        // Nose Shadow & Confident Anime Mouth
        headLayer.p(32 + eyeShift, 22 + bob, 2, 2, m.skinShade);
        headLayer.p(30 + eyeShift, 25 + bob, 5, 1, "#7c2d12");
        if (m.id === "luffy_pirate" || m.id === "naruto_hokage" || m.id === "red_ash") {
            // Cheerful wide white grin
            headLayer.p(29 + eyeShift, 25 + bob, 7, 2, "#ffffff");
            headLayer.p(29 + eyeShift, 24 + bob, 7, 1, "#09090b");
        }

        // Naruto's 3 Cheek Whisker Marks per side
        if (m.id === "naruto_hokage") {
            for (const wy of [21, 23, 25]) {
                headLayer.p(19, wy + bob, 4, 1, "#9a3412");
                headLayer.p(41, wy + bob, 4, 1, "#9a3412");
            }
        }

        // Tanjiro's Demon Slayer Flame Scar & Rising-Sun Hanafuda Earrings
        if (m.id === "tanjiro_slayer") {
            headLayer.poly([[20, 10 + bob], [26, 11 + bob], [24, 15 + bob], [19, 14 + bob]], "#991b1b");
            // Dangling Hanafuda Earrings
            for (const erx of [14, 47]) {
                headLayer.p(erx, 23 + bob, 3, 6, "#ffffff");
                headLayer.p(erx, 23 + bob, 3, 2, "#ef4444");
                headLayer.p(erx, 28 + bob, 3, 1, "#09090b");
            }
        }
    } else {
        // Facing North: Back of Head covered by Hair
        headLayer.disc(32, 18 + bob, 14, 11, m.hairColor);
    }

    outCtx.drawImage(headLayer.c, 0, 0);

    // =========================================================================
    // LAYER 4: HIGH-DETAILED 32-BIT ANIME HAIR & HEADGEAR (OUTLINED IN 1PX)
    // =========================================================================
    const hairLayer = createPixelArtLayer(W, H);

    if (m.hairStyle === "cap_spiky") {
        // #1 RED / ASH: Spiky Black Side Locks + Curved Crimson/White League Cap
        hairLayer.poly([[14, 14 + bob], [21, 14 + bob], [18, 22 + bob], [11, 20 + bob]], m.hairColor);
        hairLayer.poly([[43, 14 + bob], [50, 14 + bob], [53, 20 + bob], [46, 22 + bob]], m.hairColor);
        // Curved Red Dome of League Cap
        hairLayer.disc(32, 11 + bob, 15, 7, m.capMain);
        // White Front Semicircle Emblem with Red Pokéball Arc
        hairLayer.disc(32, 11 + bob, 9, 4, m.capFront);
        hairLayer.p(28, 10 + bob, 8, 2, m.capMain);
        // Shaded Curved Cap Brim/Visor
        hairLayer.poly([[16, 13 + bob], [48, 13 + bob], [50, 16 + bob], [14, 16 + bob]], m.capMain);
        hairLayer.p(18, 15 + bob, 28, 2, "#991b1b");
    } else if (m.hairStyle === "goku_spikes") {
        // #2 SON GOKU: Iconic Asymmetrical 7-Horn Saiyan Hair Silhouette + Forehead Bangs
        hairLayer.disc(32, 11 + bob, 14, 6, m.hairColor);
        // 4 Left Saiyan Spikes (curving outward)
        hairLayer.poly([[20, 10 + bob], [5, 8 + bob], [18, 15 + bob]], m.hairColor);
        hairLayer.poly([[18, 13 + bob], [2, 15 + bob], [17, 19 + bob]], m.hairColor);
        hairLayer.poly([[18, 17 + bob], [6, 22 + bob], [19, 21 + bob]], m.hairColor);
        // 3 Right Saiyan Spikes (sweeping high)
        hairLayer.poly([[42, 9 + bob], [59, 5 + bob], [45, 15 + bob]], m.hairColor);
        hairLayer.poly([[44, 12 + bob], [62, 13 + bob], [46, 18 + bob]], m.hairColor);
        hairLayer.poly([[44, 16 + bob], [58, 20 + bob], [45, 21 + bob]], m.hairColor);
        // 2 Tall Crown Spikes
        hairLayer.poly([[22, 8 + bob], [19, 1 + bob], [30, 7 + bob]], m.hairColor);
        hairLayer.poly([[32, 7 + bob], [41, 0 + bob], [43, 9 + bob]], m.hairColor);
        // Forehead Bangs & Specular Blue-Grey Sheen
        hairLayer.poly([[24, 11 + bob], [27, 18 + bob], [29, 11 + bob]], m.hairColor);
        hairLayer.poly([[34, 11 + bob], [37, 18 + bob], [39, 11 + bob]], m.hairColor);
        hairLayer.disc(32, 9 + bob, 9, 3, m.hairHi);
    } else if (m.hairStyle === "naruto_headband") {
        // #3 NARUTO UZUMAKI: Multi-Spike Golden Hair + Konoha Metal Forehead Protector
        const spikes = [
            [[16, 12 + bob], [8, 6 + bob], [22, 9 + bob]],
            [[20, 9 + bob], [16, 1 + bob], [27, 7 + bob]],
            [[26, 7 + bob], [32, 0 + bob], [37, 7 + bob]],
            [[36, 7 + bob], [48, 1 + bob], [43, 9 + bob]],
            [[42, 9 + bob], [56, 6 + bob], [48, 12 + bob]],
        ];
        for (const sp of spikes) hairLayer.poly(sp, m.hairColor);
        hairLayer.disc(32, 9 + bob, 14, 5, m.hairColor);
        hairLayer.disc(32, 7 + bob, 10, 3, m.hairHi);
        // Dark Blue Cloth Headband & Engraved Silver Konoha Plate
        hairLayer.p(17, 10 + bob, 30, 5, m.headbandColor);
        hairLayer.p(24, 11 + bob, 16, 4, m.plateColor);
        hairLayer.p(25, 12 + bob, 14, 2, "#f8fafc");
        hairLayer.p(31, 12 + bob, 3, 2, "#0f172a"); // Leaf spiral engraving
    } else if (m.hairStyle === "straw_hat") {
        // #4 MONKEY D. LUFFY: Woven Golden Straw Hat with Red Band & Messy Black Hair
        // Black messy bangs & side locks under brim
        hairLayer.poly([[16, 13 + bob], [22, 13 + bob], [19, 20 + bob], [14, 18 + bob]], m.hairColor);
        hairLayer.poly([[42, 13 + bob], [48, 13 + bob], [50, 18 + bob], [45, 20 + bob]], m.hairColor);
        hairLayer.p(22, 13 + bob, 20, 3, m.hairColor);
        // Golden Straw Hat Dome
        hairLayer.disc(32, 9 + bob, 14, 6, m.hatMain);
        hairLayer.disc(32, 7 + bob, 10, 3, "#fef08a");
        // Iconic Red Ribbon Band
        hairLayer.p(18, 10 + bob, 28, 3, m.hatBand);
        // Wide Curved Woven Straw Brim
        hairLayer.poly([[6, 12 + bob], [58, 12 + bob], [60, 15 + bob], [4, 15 + bob]], m.hatMain);
        // Woven straw cross-hatch texture pixels
        for (let sx = 10; sx < 54; sx += 6) {
            hairLayer.p(sx, 13 + bob, 2, 1, "#a16207");
        }
    } else if (m.hairStyle === "gojo_blindfold") {
        // #5 SATORU GOJO: Gravity-Defying Snow-White Spiky Locks with Silver Shading
        const wSpikes = [
            [[16, 13 + bob], [9, 5 + bob], [23, 9 + bob]],
            [[21, 9 + bob], [18, 0 + bob], [29, 7 + bob]],
            [[28, 7 + bob], [33, 0 + bob], [38, 7 + bob]],
            [[36, 7 + bob], [46, 0 + bob], [43, 9 + bob]],
            [[41, 9 + bob], [55, 5 + bob], [48, 13 + bob]],
        ];
        for (const sp of wSpikes) hairLayer.poly(sp, "#e2e8f0");
        hairLayer.disc(32, 9 + bob, 14, 5, m.hairColor);
        hairLayer.disc(32, 7 + bob, 10, 4, "#ffffff");
    } else if (m.hairStyle === "tanjiro_scar" || m.hairStyle === "spiky_anime") {
        // #6 TANJIRO KAMADO / #7 ICHIGO KUROSAKI: Swept Multi-Layered Spiky Anime Hair
        const aSpikes = [
            [[15, 15 + bob], [7, 8 + bob], [22, 10 + bob]],
            [[19, 10 + bob], [14, 2 + bob], [27, 8 + bob]],
            [[25, 8 + bob], [32, 1 + bob], [38, 8 + bob]],
            [[36, 8 + bob], [49, 2 + bob], [44, 10 + bob]],
            [[42, 10 + bob], [57, 8 + bob], [49, 15 + bob]],
        ];
        for (const sp of aSpikes) hairLayer.poly(sp, m.hairColor);
        hairLayer.disc(32, 9 + bob, 14, 5, m.hairColor);
        hairLayer.disc(32, 7 + bob, 10, 3, m.hairHi);
        if (m.id === "ichigo_reaper") {
            // Ichigo's sharp orange bangs hanging between eyes
            hairLayer.poly([[27, 11 + bob], [32, 18 + bob], [36, 11 + bob]], m.hairColor);
        }
    } else if (m.hairStyle === "vegeta_flame") {
        // #8 PRINCE VEGETA: Tall Sweeping Flame-Shaped Widow's-Peak Saiyan Hair
        hairLayer.poly(
            [
                [17, 13 + bob],
                [11, 4 + bob],
                [23, 1 + bob],
                [32, 0 + bob],
                [41, 1 + bob],
                [53, 4 + bob],
                [47, 13 + bob],
            ],
            m.hairColor
        );
        hairLayer.poly(
            [
                [22, 10 + bob],
                [20, 2 + bob],
                [32, 0 + bob],
                [44, 2 + bob],
                [42, 10 + bob],
            ],
            m.hairHi
        );
        // Pronounced Widow's Peak on Forehead
        hairLayer.poly([[28, 11 + bob], [32, 16 + bob], [36, 11 + bob]], m.hairColor);
    } else if (m.hairStyle === "miku_twintails") {
        // #9 HATSUNE MIKU: Turquoise Bangs & Futuristic Glowing Cyan Headphones
        hairLayer.disc(32, 10 + bob, 14, 6, m.hairColor);
        hairLayer.disc(32, 8 + bob, 10, 3, m.hairHi);
        // Long Cyan Forehead Bangs
        hairLayer.poly([[20, 11 + bob], [24, 18 + bob], [28, 11 + bob]], m.hairColor);
        hairLayer.poly([[28, 11 + bob], [32, 19 + bob], [36, 11 + bob]], m.hairHi);
        hairLayer.poly([[36, 11 + bob], [40, 18 + bob], [44, 11 + bob]], m.hairColor);
        // Black & Neon-Cyan Vocaloid Headphones over Ears
        hairLayer.p(14, 13 + bob, 4, 9, "#0f172a");
        hairLayer.p(15, 15 + bob, 2, 5, "#06b6d4");
        hairLayer.p(46, 13 + bob, 4, 9, "#0f172a");
        hairLayer.p(47, 15 + bob, 2, 5, "#06b6d4");
    } else if (m.hairStyle === "jotaro_cap") {
        // #10 JOTARO KUJO: Peaked Black Cap Torn Into Spiky Hair + Gold Badges & Visor
        // Jagged torn back hair spikes merging with cap
        hairLayer.poly([[14, 12 + bob], [8, 5 + bob], [22, 7 + bob]], m.hairColor);
        hairLayer.poly([[42, 7 + bob], [56, 5 + bob], [50, 12 + bob]], m.hairColor);
        hairLayer.p(16, 5 + bob, 32, 8, m.capMain);
        // Golden Cap Band & Two Iconic Gold Pins (Hand Badge & Plate)
        hairLayer.p(16, 11 + bob, 32, 2, "#eab308");
        hairLayer.p(23, 7 + bob, 5, 4, "#facc15");
        hairLayer.p(33, 7 + bob, 4, 3, "#fef08a");
        // Angled Shadowing Peaked Visor
        hairLayer.poly([[14, 12 + bob], [50, 12 + bob], [47, 16 + bob], [17, 16 + bob]], "#09090b");
    }

    hairLayer.outline("#09090b");
    outCtx.drawImage(hairLayer.c, 0, 0);

    // =========================================================================
    // LAYER 5: FLOATING HIGH-DETAIL ANIME PARTICLE ACCENTS (KI / STAND / NOTES)
    // =========================================================================
    const fxLayer = createPixelArtLayer(W, H);
    if (m.accessory === "ki_sparks") {
        // Golden Lightning / Ki Sparks
        fxLayer.p(7, 26 + bob, 3, 6, "#fef08a");
        fxLayer.p(5, 30 + bob, 3, 5, "#facc15");
        fxLayer.p(54, 18 + bob, 3, 6, "#fef08a");
        fxLayer.p(56, 22 + bob, 3, 5, "#facc15");
    } else if (m.accessory === "six_eyes") {
        // Gojo's Limitless Blue Orbs
        fxLayer.disc(8, 24 + bob, 3, 3, "#38bdf8");
        fxLayer.disc(8, 24 + bob, 1, 1, "#ffffff");
        fxLayer.disc(56, 24 + bob, 3, 3, "#38bdf8");
        fxLayer.disc(56, 24 + bob, 1, 1, "#ffffff");
    } else if (m.accessory === "idol_notes") {
        // Miku's Floating Pixel Music Notes (♪)
        fxLayer.p(5, 8 + bob, 5, 2, "#f472b6");
        fxLayer.p(5, 8 + bob, 2, 6, "#f472b6");
        fxLayer.p(3, 13 + bob, 3, 3, "#f472b6");
        fxLayer.p(55, 10 + bob, 5, 2, "#22d3ee");
        fxLayer.p(58, 10 + bob, 2, 6, "#22d3ee");
        fxLayer.p(56, 15 + bob, 3, 3, "#22d3ee");
    } else if (m.accessory === "jojo_chain") {
        // JoJo's Iconic Purple "ゴ" (Menacing) Katakana Glyph
        fxLayer.p(4, 7 + bob, 7, 2, "#c084fc");
        fxLayer.p(9, 7 + bob, 2, 7, "#c084fc");
        fxLayer.p(4, 13 + bob, 7, 2, "#c084fc");
        fxLayer.p(12, 5 + bob, 1, 2, "#e879f9");
        fxLayer.p(14, 5 + bob, 1, 2, "#e879f9");
    }
    fxLayer.outline("#09090b");
    outCtx.drawImage(fxLayer.c, 0, 0);

    _trainerSpriteCanvasCache[key] = outCanvas;
    return outCanvas;
}

function drawOfficialCharacterSprite(ctx, sheetUrl, px, py, dir = 0, frame = 0, isWalking = false) {
    if (!sheetUrl) return false;
    const sheetImg = getCachedImage(sheetUrl);
    if (!sheetImg || !sheetImg.complete || sheetImg._failed || sheetImg.naturalWidth <= 0) {
        return false;
    }
    // Direction mapping for 4-directional RPG Maker sheets:
    // Row 0 = South / Down (dir=0)
    // Row 1 = West / Left (dir=1)
    // Row 2 = East / Right (dir=2)
    // Row 3 = North / Up (dir=3)
    const row = Math.max(0, Math.min(3, dir || 0));

    // Walking animation cycle: Col 0 = Left step, Col 1 = Standing Idle, Col 2 = Right step
    let col = 1;
    if (isWalking) {
        const step = Math.floor(frame * 0.16) % 4;
        col = step === 0 ? 0 : step === 1 ? 1 : step === 2 ? 2 : 1;
    }
    const sx = col * 144 + 36;
    const sy = row * 144 + 54;
    const sw = 72;
    const sh = 90;

    // Ground shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.40)";
    ctx.beginPath();
    ctx.ellipse(px + 24, py + 43, 13, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    // Draw 44x55 px official sprite grounded at py + 44
    ctx.drawImage(sheetImg, sx, sy, sw, sh, Math.round(px + 2), Math.round(py - 11), 44, 55);
    ctx.restore();
    return true;
}

function getTrainerModelDataUrl(modelId) {
    const s = getStandardTrainerSkin(modelId);
    if (s && s.portraitUrl) {
        return s.portraitUrl;
    }
    return "/img/trainers/hgss_ethan.png";
}

function draw32BitAnimeTrainerOnCanvas(ctx, modelId, px, py, dir = 0, frame = 0, isWalking = false) {
    const s = getStandardTrainerSkin(modelId);
    if (s && s.sheetUrl) {
        const ok = drawOfficialCharacterSprite(ctx, s.sheetUrl, px, py, dir, frame, isWalking);
        if (ok) return;
    }

    const cx = px + 24;
    // Soft ground shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
    ctx.beginPath();
    ctx.ellipse(cx, py + 42, 13, 5.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Walking stride frame when moving
    const step = frame % 24 < 8 ? 0 : frame % 24 < 16 ? 1 : 2;
    const spriteCanvas = get32BitAnimeTrainerCanvas(modelId, dir || 0, step);

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    // Draw 64x64 high-detailed sprite centered on the 48x48 SQM tile (52x52 footprint for rich detail)
    ctx.drawImage(spriteCanvas, Math.round(px - 2), Math.round(py - 5), 52, 52);
    ctx.restore();
}

function renderCentralAvatarsTab(container) {
    const activeId = getActiveTrainerModelId();
    const cardsHtml = ANIME_TRAINER_MODELS.map((m, idx) => {
        const isCurrent = m.id === activeId;
        const imgUrl = getTrainerModelDataUrl(m.id);
        return `<div class="avatar-model-card ${isCurrent ? "is-selected" : ""}" onclick="selectTrainerAvatarModel('${m.id}')">
            <span class="avatar-anime-tag">#${idx + 1} • ${m.anime}</span>
            <div class="avatar-preview-stage">
                <img src="${imgUrl}" alt="${m.name}" style="image-rendering:pixelated;max-height:68px;object-fit:contain;">
            </div>
            <div class="avatar-model-name">${m.name}</div>
            <div class="avatar-model-desc">${m.desc}</div>
            <button class="btn ${isCurrent ? "btn-green" : "btn-primary"}" style="width:100%;font-size:10.5px;padding:4px 6px;">
                ${isCurrent ? "✅ Visual Equipado" : "🎨 Equipar Avatar"}
            </button>
        </div>`;
    }).join("");

    container.innerHTML = `
        <div class="hub-section-banner">
            <span>🎨 GUARDA-ROUPA DE AVATARES (10 TREINADORES OFICIAIS DE HEARTGOLD & POKÉPIXEL)</span>
            <span style="font-size:10px;color:#fde047;">Sprites oficiais 4-direcionais no mapa e retratos oficiais no HUD e perfil!</span>
        </div>
        <div class="avatar-models-grid">
            ${cardsHtml}
        </div>
    `;
}

// ====================================================
// 1. SPELL VFX ENGINE (POKÉMON MOVES ANIMATIONS)
// ====================================================

function spawnSpellVfx(element, sx, sy, tx, ty, moveObj, isAoE) {
    if (STATE.settings && STATE.settings.vfxQuality === "off") return;
    const reduced = STATE.settings && STATE.settings.vfxQuality === "reduced";
    const pMult = reduced ? 0.5 : 1.0;

    const el = String(element || "normal").toLowerCase();
    const startX = sx * SQM_SIZE + 24;
    const startY = sy * SQM_SIZE + 24;
    const targetX = tx * SQM_SIZE + 24;
    const targetY = ty * SQM_SIZE + 24;

    const vfx = {
        id: "vfx_" + Math.random().toString(36).substring(2, 9),
        element: el,
        moveName: moveObj?.name || "Golpe",
        startX,
        startY,
        targetX,
        targetY,
        life: 26,
        maxLife: 26,
        isAoE: !!isAoE,
        particles: [],
    };

    if (el === "water" || el === "ice") {
        const count = Math.floor(20 * pMult);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = 1.6 + Math.random() * 3.4;
            vfx.particles.push({
                x: targetX,
                y: targetY,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd - 1.2,
                gravity: 0.15,
                size: 3 + Math.random() * 4.5,
                alpha: 1.0,
                color: Math.random() < 0.6 ? "#38bdf8" : "#93c5fd",
                type: "droplet",
            });
        }
    } else if (el === "fire") {
        const count = Math.floor(24 * pMult);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = 1.8 + Math.random() * 4.2;
            vfx.particles.push({
                x: targetX,
                y: targetY,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd - 0.9,
                gravity: -0.06,
                size: 4 + Math.random() * 5.5,
                alpha: 1.0,
                color: Math.random() < 0.35 ? "#f97316" : Math.random() < 0.7 ? "#ef4444" : "#fde047",
                type: "flame",
            });
        }
    } else if (el === "grass" || el === "bug") {
        const count = Math.floor(18 * pMult);
        for (let i = 0; i < count; i++) {
            const radius = 8 + Math.random() * 26;
            const angle = (i / count) * Math.PI * 2;
            vfx.particles.push({
                x: targetX + Math.cos(angle) * radius,
                y: targetY + Math.sin(angle) * radius,
                orbitAngle: angle,
                orbitRadius: radius,
                orbitSpeed: 0.18 + Math.random() * 0.12,
                size: 4 + Math.random() * 4,
                rotation: Math.random() * Math.PI,
                rotSpeed: 0.26,
                alpha: 1.0,
                color: Math.random() < 0.5 ? "#22c55e" : "#86efac",
                type: "leaf",
            });
        }
    } else if (el === "electric") {
        const count = Math.floor(18 * pMult);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = 2.2 + Math.random() * 4.0;
            vfx.particles.push({
                x: targetX,
                y: targetY,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                gravity: 0,
                size: 3 + Math.random() * 3.5,
                alpha: 1.0,
                color: Math.random() < 0.5 ? "#fef08a" : "#67e8f9",
                type: "spark",
            });
        }
    } else if (el === "psychic" || el === "ghost" || el === "dark" || el === "poison") {
        const count = Math.floor(20 * pMult);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = 1.4 + Math.random() * 2.8;
            vfx.particles.push({
                x: targetX,
                y: targetY,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                gravity: -0.04,
                size: 4 + Math.random() * 5,
                alpha: 0.95,
                color: Math.random() < 0.5 ? "#a855f7" : "#c084fc",
                type: "shadow_mist",
            });
        }
    } else if (el === "dragon") {
        const count = Math.floor(22 * pMult);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = 2.0 + Math.random() * 4.5;
            vfx.particles.push({
                x: targetX,
                y: targetY,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                gravity: 0,
                size: 3.5 + Math.random() * 4.5,
                alpha: 1.0,
                color: Math.random() < 0.5 ? "#06b6d4" : "#818cf8",
                type: "dragon_spark",
            });
        }
    } else {
        const count = Math.floor(16 * pMult);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = 1.6 + Math.random() * 3.4;
            vfx.particles.push({
                x: targetX,
                y: targetY,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                gravity: 0.08,
                size: 3 + Math.random() * 3.5,
                alpha: 0.95,
                color: Math.random() < 0.5 ? "#ffffff" : "#e2e8f0",
                type: "slash_dust",
            });
        }
    }

    if (!STATE.tibia.spellVfx) STATE.tibia.spellVfx = [];
    STATE.tibia.spellVfx.push(vfx);
}

function updateSingleSpellVfx(v, spd) {
    v.life -= spd;
    if (v.life <= 0) return false;

    for (const p of v.particles) {
        if (p.type === "leaf") {
            p.orbitAngle = (p.orbitAngle || 0) + (p.orbitSpeed || 0.15) * spd;
            p.orbitRadius = Math.max(2, (p.orbitRadius || 14) - 0.45 * spd);
            p.x = v.targetX + Math.cos(p.orbitAngle) * p.orbitRadius;
            p.y = v.targetY + Math.sin(p.orbitAngle) * p.orbitRadius;
            p.rotation = (p.rotation || 0) + (p.rotSpeed || 0.2) * spd;
            p.alpha -= 0.038 * spd;
        } else {
            p.x += (p.vx || 0) * spd;
            p.y += (p.vy || 0) * spd;
            if (p.gravity) p.vy += p.gravity * spd;
            p.alpha -= 0.042 * spd;
            p.size = Math.max(0.6, p.size - 0.08 * spd);
        }
    }
    return true;
}

function drawSpellVfx(ctx, tb) {
    if (STATE.settings && STATE.settings.vfxQuality === "off") return;
    if (!tb.spellVfx || tb.spellVfx.length === 0) return;
    for (const v of tb.spellVfx) {
        const progress = 1 - v.life / v.maxLife;
        const tx = v.targetX;
        const ty = v.targetY;
        const el = v.element;

        ctx.save();

        // 1. Shockwave rings
        const ringRadius = (v.isAoE ? 42 : 26) * Math.sin(progress * Math.PI * 0.85);
        if (ringRadius > 0) {
            ctx.beginPath();
            ctx.arc(tx, ty, ringRadius, 0, Math.PI * 2);
            ctx.lineWidth = Math.max(1, 3.5 * (1 - progress));
            ctx.strokeStyle =
                el === "fire" ? "rgba(249, 115, 22, 0.75)" :
                el === "water" ? "rgba(56, 189, 248, 0.78)" :
                el === "grass" ? "rgba(74, 222, 128, 0.78)" :
                el === "electric" ? "rgba(254, 240, 138, 0.9)" :
                el === "psychic" || el === "ghost" ? "rgba(192, 132, 252, 0.8)" :
                el === "dragon" ? "rgba(129, 140, 248, 0.85)" :
                "rgba(255, 255, 255, 0.75)";
            ctx.stroke();
        }

        // 2. Element Specific Visuals
        if (el === "electric") {
            ctx.save();
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = "#ffffff";
            ctx.shadowColor = "#fef08a";
            ctx.shadowBlur = 10;
            ctx.beginPath();
            let curX = tx + (Math.random() * 8 - 4);
            let curY = ty - 90;
            ctx.moveTo(curX, curY);
            for (let step = 0; step < 5; step++) {
                curX += (Math.random() * 16 - 8);
                curY += 18;
                ctx.lineTo(curX, curY);
            }
            ctx.lineTo(tx, ty);
            ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.restore();
        } else if (el === "normal" || el === "fighting" || el === "steel") {
            const slashLen = 22 * Math.min(1, progress * 2.5);
            ctx.save();
            ctx.globalAlpha = Math.max(0, 1 - progress);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#ffffff";
            ctx.shadowColor = "#38bdf8";
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.moveTo(tx - slashLen, ty - slashLen);
            ctx.lineTo(tx + slashLen, ty + slashLen);
            ctx.moveTo(tx + slashLen, ty - slashLen);
            ctx.lineTo(tx - slashLen, ty + slashLen);
            ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.restore();
        } else if (el === "psychic" || el === "ghost" || el === "dark") {
            const sphereRadius = 14 * Math.sin(progress * Math.PI);
            ctx.save();
            ctx.beginPath();
            ctx.arc(tx, ty, sphereRadius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(107, 33, 168, 0.65)";
            ctx.shadowColor = "#c084fc";
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.restore();
        }

        // 3. Render Particles (Batched without per-particle ctx.save/restore)
        for (const p of v.particles) {
            if (p.alpha <= 0) continue;
            ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
            ctx.fillStyle = p.color;

            if (p.type === "leaf") {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation || 0);
                ctx.beginPath();
                ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            } else if (p.type === "spark") {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y - p.size);
                ctx.lineTo(p.x + p.size * 0.6, p.y);
                ctx.lineTo(p.x, p.y + p.size);
                ctx.lineTo(p.x - p.size * 0.6, p.y);
                ctx.closePath();
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.globalAlpha = 1.0;

        ctx.restore();
    }
}

// ====================================================
// 2. SETTINGS & QUALITY OF LIFE (QoL) SYSTEM
// ====================================================

function openSettingsModal() {
    switchTab("settings");
    syncSettingsUi();
}

function closeSettingsModal() {
    switchTab("hunt");
}

function switchSettingsCategory(catId) {
    document.querySelectorAll(".settings-nav-pill").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.settingsCat === catId);
    });
    document.querySelectorAll(".settings-section-pane").forEach((pane) => {
        pane.classList.toggle("active", pane.id === `settings-section-${catId}`);
    });
}

function updateSetting(key, val) {
    if (!STATE.settings) STATE.settings = {};
    STATE.settings[key] = val;

    if (key === "btnSize") {
        document.body.setAttribute("data-btn-size", val);
        const scaleMap = { compact: "0.85", normal: "1.0", spacious: "1.15", large: "1.30" };
        document.documentElement.style.setProperty("--btn-scale", scaleMap[val] || "1.0");
        const labels = {
            compact: "Compacto (85% — Mais botões visíveis)",
            normal: "Normal (100% — Padrão)",
            spacious: "Espaçoso (115% — Toques Maiores)",
            large: "Grande (130% — Alta Acessibilidade)"
        };
        showToast(`📐 Escala de Botões: ${labels[val] || val}`);
    } else if (key === "showGrid") {
        showToast(`🗺️ Grade Visual de SQMs: ${val ? "ATIVADA" : "DESATIVADA (Cenário Limpo)"}`);
    } else if (key === "vfxQuality") {
        showToast(`✨ Efeitos de Golpes (VFX): ${val === "full" ? "Completos (60 FPS)" : val === "reduced" ? "Reduzidos" : "Desativados"}`);
    } else if (key === "uiScale") {
        document.documentElement.style.setProperty("--app-scale", `${val / 100}`);
        showToast(`🔍 Escala da Interface: ${val}%`);
    } else if (key === "spriteVersion") {
        changeGbaSpriteVersion(val);
    } else if (key === "cameraMode") {
        changeMapBgMode(val);
    } else if (key === "fontPreset") {
        document.body.setAttribute("data-font-preset", val);
        const labels = {
            "pokemon-hybrid": "✨ Híbrida PokéLand (Recomendado)",
            "pokemon-retro": "🕹️ Retrô Clássico (100% GBA / Pixel)",
            "pokemon-modern": "📱 Ultra Moderna (Inter HD)"
        };
        showToast(`🔤 Tipografia: ${labels[val] || val}`);
        if (typeof renderGameWorld === 'function') renderGameWorld();
    }

    saveSettings();
    syncSettingsUi();
}

function syncSettingsUi() {
    const s = STATE.settings || {};
    const chkGrid = document.getElementById("setting-chk-grid");
    if (chkGrid) chkGrid.checked = !!s.showGrid;

    const selVfx = document.getElementById("setting-sel-vfx");
    if (selVfx) selVfx.value = s.vfxQuality || "full";

    const selSprite = document.getElementById("setting-sel-sprites");
    if (selSprite) selSprite.value = s.spriteVersion || "pmd";

    const selCamera = document.getElementById("setting-sel-camera");
    if (selCamera) selCamera.value = s.cameraMode || "hd_ring";

    const selBtnScale = document.getElementById("setting-sel-btnscale");
    if (selBtnScale) selBtnScale.value = s.btnSize || "normal";
    document.body.setAttribute("data-btn-size", s.btnSize || "normal");
    const scaleMap = { compact: "0.85", normal: "1.0", spacious: "1.15", large: "1.30" };
    document.documentElement.style.setProperty("--btn-scale", scaleMap[s.btnSize || "normal"] || "1.0");

    const selFont = document.getElementById("setting-sel-font");
    if (selFont) selFont.value = s.fontPreset || "pokemon-hybrid";
    document.body.setAttribute("data-font-preset", s.fontPreset || "pokemon-hybrid");

    const volSlider = document.getElementById("setting-vol-slider");
    const volLbl = document.getElementById("setting-vol-label");
    if (volSlider) volSlider.value = s.masterVolume !== undefined ? s.masterVolume : 80;
    if (volLbl) volLbl.textContent = `${s.masterVolume !== undefined ? s.masterVolume : 80}%`;

    const chkSfx = document.getElementById("setting-chk-sfx");
    if (chkSfx) chkSfx.checked = s.sfxEnabled !== false;

    const chkChatSound = document.getElementById("setting-chk-chatsound");
    if (chkChatSound) chkChatSound.checked = s.chatNotifications !== false;

    const chkAutoTarget = document.getElementById("setting-chk-autotarget");
    if (chkAutoTarget) chkAutoTarget.checked = s.autoTarget !== false;

    const chkRelease = document.getElementById("setting-chk-release");
    if (chkRelease) chkRelease.checked = s.confirmRelease !== false;

    const selUiScale = document.getElementById("setting-sel-uiscale");
    if (selUiScale) selUiScale.value = String(s.uiScale || 100);
}

function loadSettings() {
    try {
        const raw = localStorage.getItem("pokeland_settings_v1");
        if (raw) {
            const data = JSON.parse(raw);
            STATE.settings = Object.assign(STATE.settings || {}, data);
        }
    } catch (e) {}
    if (STATE.settings && STATE.settings.uiScale && STATE.settings.uiScale !== 100) {
        document.documentElement.style.setProperty("--app-scale", `${STATE.settings.uiScale / 100}`);
    }
}

function saveSettings() {
    try {
        localStorage.setItem("pokeland_settings_v1", JSON.stringify(STATE.settings));
    } catch (e) {}
}

function resetSettingsToDefault() {
    STATE.settings = {
        showGrid: false,
        vfxQuality: "full",
        spriteVersion: "pmd",
        cameraMode: "hd_ring",
        fontPreset: "pokemon-hybrid",
        masterVolume: 80,
        sfxEnabled: true,
        chatNotifications: true,
        shinySound: true,
        autoTarget: true,
        confirmRelease: true,
        uiScale: 100,
    };
    saveSettings();
    syncSettingsUi();
    showToast("🔄 Configurações restauradas para os padrões oficiais de PokéLand!");
}

// ====================================================
// 3. MULTI-CHANNEL CHAT & WHISPER SYSTEM
// ====================================================

const CHAT_CHANNEL_METAS = {
    local: { label: "Local", color: "#4ade80", tagColor: "#15803d", placeholder: "Falar com jogadores e NPCs próximos..." },
    global: { label: "Global", color: "#38bdf8", tagColor: "#0369a1", placeholder: "Mensagem global no servidor PokéLand..." },
    trade: { label: "Trade", color: "#fbbf24", tagColor: "#b45309", placeholder: "Anúncios de compra, venda e troca de Pokémon..." },
    guild: { label: "Guild", color: "#34d399", tagColor: "#047857", placeholder: "Conversar com sua guilda de treinadores..." },
    system: { label: "Sistema", color: "#94a3b8", tagColor: "#334155", placeholder: "Visualização do log de combate e servidor..." },
    whisper: { label: "Whisper", color: "#f472b6", tagColor: "#be185d", placeholder: "Use: /w Jogador Mensagem (ou clique num nome)..." },
};

function initChatSystem() {
    if (!STATE.chat) {
        STATE.chat = {
            activeChannel: "local",
            unread: { local: 0, global: 0, trade: 0, guild: 0, system: 0, whisper: 0 },
            messages: [],
            lastWhisperTarget: "Ash_Kanto",
            lastWhisperSender: "Misty_Cerulean",
            settings: loadChatSettings(),
        };
    } else if (!STATE.chat.settings) {
        STATE.chat.settings = loadChatSettings();
    }

    // Seed Initial Welcome & Lore Community Messages
    if (STATE.chat.messages.length === 0) {
        addChatMessage("system", "Servidor", "Bem-vindo ao PokéLand! Sistema de Canais de Chat e Mensagens Diretas inicializado.");
        addChatMessage("local", "Red", "Olá treinadores! Pronto para desbravar as ilhas e capturar novos Pokémon na Praça.");
        addChatMessage("global", "Ash_Kanto", "Alguém aí explorando as Seafoam Caverns? Cuidado com o Articuno!");
        addChatMessage("trade", "Gary_Oak", "Vendo Dratini Lv.25 100% IV com Dragon Dance! Interessados mandem whisper /w Gary_Oak.");
        addChatMessage("guild", "Misty_Cerulean", "Lembrando que nossa guilda tem treino de Pokémon Aquáticos hoje às 20h!");
        addChatMessage("whisper", "Professor_Oak", "Parabéns por sua jornada, Treinador! Continue explorando os mistérios de PokéLand.", STATE.player?.name || "Red");
    }

    applyChatSettingsToUi();

    // Ambient community chat periodic timer
    setInterval(() => {
        triggerAmbientCommunityChat();
    }, 28000);
}

function triggerAmbientCommunityChat() {
    if (!STATE.chat) return;
    if (STATE.chat.settings && STATE.chat.settings.ambientCommunityChat === false) return;
    const pool = [
        { channel: "global", sender: "Brock_Pewter", text: "Minha Onix subiu para o nível 50 na hunt de Geodude!" },
        { channel: "trade", sender: "Lance_Dragon", text: "Compro Master Balls e Pedras de Evolução por ouro na Central." },
        { channel: "local", sender: "Treinador_Lucas", text: "A velocidade dos golpes e os efeitos visuais ficaram incríveis!" },
        { channel: "global", sender: "Cynthia_Sinnoh", text: "Quem tiver interesse em duelar no Coliseu de Batalha, me procure na Central." },
    ];
    const pick = pool[Math.floor(Math.random() * pool.length)];
    addChatMessage(pick.channel, pick.sender, pick.text);
}

function switchChatChannel(chName) {
    if (!CHAT_CHANNEL_METAS[chName]) return;
    STATE.chat.activeChannel = chName;
    if (STATE.chat.unread && STATE.chat.unread[chName]) {
        STATE.chat.unread[chName] = 0;
    }
    const badge = document.getElementById("whisper-unread-badge");
    if (badge && chName === "whisper") {
        badge.style.display = "none";
        badge.textContent = "0";
    }

    document.querySelectorAll(".chat-tab-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.chatChannel === chName);
    });

    const sel = document.getElementById("chat-channel-select");
    if (sel && chName !== "system") {
        sel.value = chName;
    }

    const input = document.getElementById("chat-input-text");
    if (input) {
        input.placeholder = CHAT_CHANNEL_METAS[chName].placeholder;
    }

    renderChatMessages();
}

function onChatChannelSelectChange(chName) {
    switchChatChannel(chName);
}

function handleChatInputKeyDown(e) {
    if (e.key === "Enter") {
        sendChatMessage();
    }
}

function quickWhisperTo(trainerName) {
    if (!trainerName) return;
    switchChatChannel("whisper");
    STATE.chat.lastWhisperTarget = trainerName;
    const input = document.getElementById("chat-input-text");
    if (input) {
        input.value = `/w ${trainerName} `;
        input.focus();
    }
}

function sendChatMessage() {
    const input = document.getElementById("chat-input-text");
    if (!input) return;
    const raw = input.value.trim();
    if (!raw) return;

    let targetChannel = STATE.chat.activeChannel || "local";
    let messageText = raw;
    let whisperTarget = null;

    // Check Slash Commands
    if (raw.startsWith("/w ") || raw.startsWith("/whisper ")) {
        const parts = raw.split(" ");
        if (parts.length >= 3) {
            targetChannel = "whisper";
            whisperTarget = parts[1];
            messageText = parts.slice(2).join(" ");
            STATE.chat.lastWhisperTarget = whisperTarget;
        } else {
            showToast("ℹ️ Formato de Whisper: /w NomeDoTreinador Mensagem");
            return;
        }
    } else if (raw.startsWith("/r ")) {
        targetChannel = "whisper";
        whisperTarget = STATE.chat.lastWhisperSender || STATE.chat.lastWhisperTarget || "Ash_Kanto";
        messageText = raw.substring(3).trim();
    } else if (raw.startsWith("/g ") || raw.startsWith("/guild ")) {
        targetChannel = "guild";
        messageText = raw.replace(/^\/(g|guild)\s+/, "");
    } else if (raw.startsWith("/trade ") || raw.startsWith("/t ")) {
        targetChannel = "trade";
        messageText = raw.replace(/^\/(trade|t)\s+/, "");
    } else if (raw.startsWith("/s ") || raw.startsWith("/global ")) {
        targetChannel = "global";
        messageText = raw.replace(/^\/(s|global)\s+/, "");
    }

    if (targetChannel === "system") {
        targetChannel = "local";
    }

    const myName = STATE.player.name || "Red";
    addChatMessage(targetChannel, myName, messageText, whisperTarget);

    if (targetChannel === "local") {
        setTrainerSpeech(messageText);
    }

    // Interactive whisper echo response for immersion
    if (targetChannel === "whisper" && whisperTarget) {
        setTimeout(() => {
            const replies = [
                `Olá ${myName}! Recebi seu whisper. Estou agora caçando na Rota Kanto!`,
                `Opa ${myName}! Vamos trocar Pokémon na Praça Central mais tarde?`,
                `Entendido! Boa sorte em suas caçadas em PokéLand!`,
            ];
            const replyTxt = replies[Math.floor(Math.random() * replies.length)];
            addChatMessage("whisper", whisperTarget, replyTxt, myName);
        }, 1200);
    }

    input.value = "";
}

function addChatMessage(channel, sender, text, recipient = null) {
    if (!STATE.chat) initChatSystem();
    const timeStr = new Date().toLocaleTimeString().substring(0, 5);

    const msgObj = {
        id: "msg_" + Math.random().toString(36).substring(2, 9),
        channel,
        sender,
        text,
        recipient,
        time: timeStr,
    };

    STATE.chat.messages.push(msgObj);
    if (STATE.chat.messages.length > 200) {
        STATE.chat.messages.shift();
    }

    if (STATE.chat && STATE.chat.isMinimized) {
        STATE.chat.minimizedUnreadCount = (STATE.chat.minimizedUnreadCount || 0) + 1;
        updateChatBubbleUnread();
    }

    if (channel === "whisper" && sender !== (STATE.player?.name || "Red")) {
        STATE.chat.lastWhisperSender = sender;
        if (STATE.chat.activeChannel !== "whisper") {
            STATE.chat.unread.whisper = (STATE.chat.unread.whisper || 0) + 1;
            const badge = document.getElementById("whisper-unread-badge");
            if (badge) {
                badge.style.display = "inline-flex";
                badge.textContent = String(STATE.chat.unread.whisper);
            }
            showToast(`✉️ Whisper de ${sender}: "${text.substring(0, 32)}..."`);
        }
    }

    // High performance optimization: append single message instead of wiping and rebuilding innerHTML
    appendChatMessageToDom(msgObj);
}

function appendChatMessageToDom(m) {
    const container = document.getElementById("chat-messages-container");
    if (!container) return;

    const curCh = STATE.chat.activeChannel || "local";
    const myName = STATE.player?.name || "Red";

    const s = STATE.chat?.settings || DEFAULT_CHAT_SETTINGS;
    // Strict channel isolation: channels do not communicate or leak into each other
    let isVisible = false;
    if (curCh === m.channel) {
        isVisible = true;
    } else if (!s.strictIsolation && s.allowSystemInOtherChannels && m.channel === "system" && curCh !== "whisper") {
        isVisible = true;
    }
    if (!isVisible) return;

    const meta = CHAT_CHANNEL_METAS[m.channel] || CHAT_CHANNEL_METAS.local;
    const isMe = m.sender === myName;
    const isWhisper = m.channel === "whisper";
    const isSystem = m.channel === "system";

    let headerTag = `<span class="chat-tag" style="background:${meta.tagColor};color:#fff;">${meta.label}</span>`;
    if (isWhisper) {
        if (isMe) {
            headerTag = `<span class="chat-tag is-whisper-out">PARA: ${m.recipient || "Treinador"}</span>`;
        } else {
            headerTag = `<span class="chat-tag is-whisper-in" onclick="quickWhisperTo('${m.sender}')" title="Clique para responder">DE: ${m.sender}</span>`;
        }
    }

    const senderClick = !isSystem && !isMe ? `onclick="quickWhisperTo('${m.sender}')" style="cursor:pointer;" title="Clique para sussurrar (/w)"` : "";

    const div = document.createElement("div");
    div.className = `chat-line ${isWhisper ? "is-whisper-row" : ""} ${isSystem ? "is-system-row" : ""}`;
    div.innerHTML = `
        <span class="chat-time">${m.time}</span>
        ${headerTag}
        ${!isSystem ? `<strong class="chat-sender" ${senderClick} style="color:${isMe ? "#ffe066" : meta.color};">${m.sender}:</strong>` : ""}
        <span class="chat-body">${m.text}</span>
    `;

    container.appendChild(div);

    // Keep DOM limited to max 75 nodes to eliminate memory leaks and GC pauses
    while (container.children.length > 75) {
        container.removeChild(container.firstChild);
    }
    container.scrollTop = container.scrollHeight;
}

function renderChatMessages() {
    const container = document.getElementById("chat-messages-container");
    if (!container) return;
    container.innerHTML = "";

    const curCh = STATE.chat.activeChannel || "local";
    const s = STATE.chat?.settings || DEFAULT_CHAT_SETTINGS;
    const filtered = STATE.chat.messages.filter((m) => {
        if (curCh === m.channel) return true;
        if (!s.strictIsolation && s.allowSystemInOtherChannels && m.channel === "system" && curCh !== "whisper") {
            return true;
        }
        return false;
    }).slice(-75);

    for (const m of filtered) {
        appendChatMessageToDom(m);
    }
}

// Redirect old combat log calls directly into the new chat system!
function addCombatLog(htmlText) {
    addChatMessage("system", "Sistema", htmlText);
}

// ====================================================
// 4. SUB-MENU CONTROLLERS FOR ALL HUD WINDOWS
// ====================================================

function switchPartySubmenu(subTab) {
    document.querySelectorAll(".party-submenu-pill").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.partySub === subTab);
    });

    const leadBanner = document.getElementById("pokebar-active-leader");
    const partyList = document.getElementById("tibia-pokebar-list");
    const cmdGrid = document.querySelector(".tibia-order-grid");
    const subContainer = document.getElementById("party-sub-container");

    if (subTab === "team") {
        if (leadBanner) leadBanner.style.display = "";
        if (partyList) partyList.style.display = "";
        if (cmdGrid) cmdGrid.style.display = "";
        if (subContainer) subContainer.style.display = "none";
        renderTibiaPokebar();
    } else {
        if (leadBanner) leadBanner.style.display = "none";
        if (partyList) partyList.style.display = "none";
        if (cmdGrid) cmdGrid.style.display = "none";
        if (subContainer) {
            subContainer.style.display = "block";
            renderPartySubmenuContent(subTab, subContainer);
        }
    }
}

function renderPartySubmenuContent(subTab, container) {
    const lead = getLeadPokemon();
    if (!lead) {
        container.innerHTML = `<div style="padding:15px;text-align:center;color:#94a3b8;">Nenhum Pokémon no time!</div>`;
        return;
    }

    if (subTab === "stats") {
        const ivTotal = Object.values(lead.ivs || {}).reduce((a, b) => a + b, 0);
        const grade = classifyMythicalGrade(lead);
        container.innerHTML = `
            <div class="party-sub-stats-box">
                <div style="font-size:12px;font-weight:900;color:#ffe066;margin-bottom:6px;">📊 Atributos de Combate — ${lead.name} (Lv.${lead.level})</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:11px;">
                    <div class="sub-stat-chip"><span>HP Máximo:</span> <strong>${lead.max_hp}</strong></div>
                    <div class="sub-stat-chip"><span>Ataque:</span> <strong>${lead.stats.atk}</strong></div>
                    <div class="sub-stat-chip"><span>Defesa:</span> <strong>${lead.stats.def}</strong></div>
                    <div class="sub-stat-chip"><span>Sp. Atk:</span> <strong>${lead.stats.spa}</strong></div>
                    <div class="sub-stat-chip"><span>Sp. Def:</span> <strong>${lead.stats.spd}</strong></div>
                    <div class="sub-stat-chip"><span>Velocidade:</span> <strong>${lead.stats.spe}</strong></div>
                </div>
                <div style="margin-top:10px;padding:8px;background:#090f18;border-radius:6px;border:1px solid #1f2e42;">
                    <div style="font-size:11px;font-weight:800;color:#38bdf8;">Classificação de Potencial:</div>
                    <div style="margin-top:4px;">${grade.badgeHtml}</div>
                    <div style="font-size:10px;color:#94a3b8;margin-top:4px;">Total de IVs: ${ivTotal} / 186 (Pontos de Gene)</div>
                </div>
            </div>
        `;
    } else if (subTab === "moves") {
        const moves = lead.moves || ["tackle"];
        const movesHtml = moves.map((mId, idx) => {
            const mv = STATE.movesMap[mId] || { name: mId, element: lead.elements[0] || "normal", power: 55 };
            const elInfo = ELEMENT_PT[mv.element] || ELEMENT_PT.normal;
            return `<div class="party-move-subcard">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <strong>m${idx + 1}: ${mv.name}</strong>
                    <span class="qual-pill" style="background:${elInfo.bg};color:${elInfo.fg};">${elInfo.label}</span>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-top:4px;">
                    <span>Poder: ${mv.power || 50}</span>
                    <span>Alcance: ${idx >= 2 ? "AoE 3x3" : "Alvo Único"}</span>
                </div>
            </div>`;
        }).join("");

        container.innerHTML = `
            <div style="display:flex;flex-direction:column;gap:6px;">
                <div style="font-size:11.5px;font-weight:900;color:#ffe066;">⚔️ Golpes Ativos no Combate:</div>
                ${movesHtml}
            </div>
        `;
    } else if (subTab === "items") {
        container.innerHTML = `
            <div style="display:flex;flex-direction:column;gap:6px;font-size:11px;">
                <div style="font-size:11.5px;font-weight:900;color:#ffe066;">🎒 Held Items Equipados:</div>
                <div class="party-move-subcard" style="display:flex;align-items:center;gap:8px;">
                    <span style="font-size:22px;">💎</span>
                    <div>
                        <strong>Amulet Coin (+20% Gold)</strong>
                        <div style="font-size:10px;color:#34d399;">Ativo no líder da equipe</div>
                    </div>
                </div>
                <div class="party-move-subcard" style="display:flex;align-items:center;gap:8px;">
                    <span style="font-size:22px;">⚡</span>
                    <div>
                        <strong>Exp. Share (Compartilha EXP)</strong>
                        <div style="font-size:10px;color:#60a5fa;">Garante 50% de EXP aos outros Pokémon</div>
                    </div>
                </div>
            </div>
        `;
    }
}

function switchAtlasSubmenu(regionId) {
    document.querySelectorAll(".atlas-submenu-pill").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.atlasSub === regionId);
    });

    const zoneList = document.getElementById("atlas-zone-list");
    if (!zoneList) return;

    const filtered = STATE.zones.filter((z) => {
        if (regionId === "kanto") return (z.min_level || 1) <= 30;
        if (regionId === "wild") return (z.min_level || 1) > 30 && (z.min_level || 1) <= 70;
        if (regionId === "mythic") return (z.min_level || 1) > 70;
        return true;
    });

    zoneList.innerHTML = filtered.map((z) => {
        const isCurrent = STATE.activeZone && STATE.activeZone.id === z.id;
        const sp = STATE.speciesById[z.primary_species_id] || {};
        return `<div class="zone-card ${isCurrent ? "active-zone" : ""}" onclick="teleportToZone('${z.id}')">
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <strong>${z.name}</strong>
                <span class="zone-badge">Lv. ${z.min_level}–${z.max_level}</span>
            </div>
            <div style="font-size:10px;color:#94a3b8;margin-top:2px;">Spawn Principal: ${sp.name || "Pokémon"}</div>
        </div>`;
    }).join("");
}

function switchShopSubmenu(catId) {
    document.querySelectorAll(".shop-submenu-pill").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.shopSub === catId);
    });
    // Re-render shop filtered by item category
    renderShopModal(catId);
}

function switchPcBoxSubmenu(subTab) {
    document.querySelectorAll(".pc-submenu-pill").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.pcSub === subTab);
    });
    renderPartyModal(subTab);
}

function switchDexSubmenu(subTab) {
    document.querySelectorAll(".dex-submenu-pill").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.dexSub === subTab);
    });
    renderPokedex(subTab);
}

function switchAutoFarmSubmenu(subTab) {
    document.querySelectorAll(".autofarm-submenu-pill").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.autofarmSub === subTab);
    });

    const grid = document.querySelector(".autofarm-modules-grid");
    const survival = document.getElementById("autofarm-survival-view");
    const autosell = document.getElementById("autofarm-autosell-view");
    const presets = document.querySelector(".autofarm-presets-bar");
    const visual = document.querySelector(".autofarm-visual-settings");
    const offline = document.getElementById("autofarm-offline-view");

    if (grid) grid.style.display = subTab === "modules" ? "flex" : "none";
    if (survival) {
        survival.style.display = subTab === "survival" ? "flex" : "none";
        if (subTab === "survival" && typeof syncAutoFarmSurvivalUi === "function") syncAutoFarmSurvivalUi();
    }
    if (autosell) {
        autosell.style.display = subTab === "autosell" ? "flex" : "none";
        if (subTab === "autosell" && typeof syncAutoFarmAutoSellUi === "function") syncAutoFarmAutoSellUi();
    }
    if (presets) presets.style.display = subTab === "presets" ? "flex" : "none";
    if (visual) visual.style.display = subTab === "visual" ? "block" : "none";
    if (offline) {
        offline.style.display = subTab === "offline" ? "flex" : "none";
        if (subTab === "offline") renderOfflineExpeditionUi();
    }
}

function renderPartyModal(subTab = "all") {
    const partyEl = document.getElementById("party-grid-container");
    if (partyEl) {
        partyEl.innerHTML = STATE.player.party
            .map((mon, idx) => renderPokemonManageCard(mon, idx, true))
            .join("");
    }

    const boxCnt = document.getElementById("pc-box-count");
    if (boxCnt) boxCnt.textContent = STATE.player.pc_box.length;
    const boxEl = document.getElementById("pcbox-grid-container");
    if (boxEl) {
        let mons = STATE.player.pc_box || [];
        if (subTab === "mythics") {
            mons = mons.filter(m => m.is_shiny || (m.quality && (m.quality.startsWith("Mítico") || m.quality === "Lendário" || m.quality === "Épico")));
        } else if (subTab === "elements") {
            mons = [...mons].sort((a, b) => {
                const spA = STATE.speciesById[a.species_id] || {};
                const spB = STATE.speciesById[b.species_id] || {};
                return (spA.element || "").localeCompare(spB.element || "");
            });
        }
        boxEl.innerHTML = mons
            .map((mon, idx) => renderPokemonManageCard(mon, idx, false))
            .join("");
        if (mons.length === 0) {
            boxEl.innerHTML = `<div style="grid-column:1/-1;padding:24px;text-align:center;color:#94a3b8;font-size:13px;">Nenhum Pokémon encontrado nesta categoria no PC Box.</div>`;
        }
    }
}

function renderShopModal(catId = "all") {
    renderShopAndInventory();
    const ballsHeader = document.querySelector("#tab-shop h3:nth-of-type(1)");
    const ballsGrid = document.getElementById("shop-capsules-grid");
    const stonesHeader = document.querySelector("#tab-shop h3:nth-of-type(2)");
    const stonesGrid = document.getElementById("shop-stones-grid");
    const bagPanel = document.querySelector("#tab-shop .admin-grid .panel:nth-of-type(2)");
    const shopPanel = document.querySelector("#tab-shop .admin-grid .panel:nth-of-type(1)");

    if (ballsGrid && stonesGrid && bagPanel && shopPanel) {
        if (catId === "all") {
            shopPanel.style.display = "block";
            bagPanel.style.display = "block";
            if (ballsHeader) ballsHeader.style.display = "block";
            ballsGrid.style.display = "grid";
            if (stonesHeader) stonesHeader.style.display = "block";
            stonesGrid.style.display = "grid";
        } else if (catId === "balls") {
            shopPanel.style.display = "block";
            bagPanel.style.display = "none";
            if (ballsHeader) ballsHeader.style.display = "block";
            ballsGrid.style.display = "grid";
            if (stonesHeader) stonesHeader.style.display = "none";
            stonesGrid.style.display = "none";
        } else if (catId === "stones") {
            shopPanel.style.display = "block";
            bagPanel.style.display = "none";
            if (ballsHeader) ballsHeader.style.display = "none";
            ballsGrid.style.display = "none";
            if (stonesHeader) stonesHeader.style.display = "block";
            stonesGrid.style.display = "grid";
        } else if (catId === "bag") {
            shopPanel.style.display = "none";
            bagPanel.style.display = "block";
        }
    }
}

let _cachedAdminFeedbacks = [];
let _cachedAdminUsers = [];

function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function openAdminDashboardWithTab(subTab = "feedbacks") {
    switchTab("admin");
    switchAdminSubmenu(subTab);
}

function switchAdminSubmenu(subTab) {
    document.querySelectorAll(".admin-submenu-pill").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.adminSub === subTab);
    });
    const presetsPanel = document.querySelector("#tab-admin .floating-modal-content > .panel:first-child");
    const adminGrid = document.querySelector("#tab-admin .admin-grid");
    const feedbacksPanel = document.getElementById("admin-feedbacks-panel");
    const usersPanel = document.getElementById("admin-users-panel");

    // Hide all panels
    if (presetsPanel) presetsPanel.style.display = "none";
    if (adminGrid) adminGrid.style.display = "none";
    if (feedbacksPanel) feedbacksPanel.style.display = "none";
    if (usersPanel) usersPanel.style.display = "none";

    const adminGridPanels = adminGrid ? adminGrid.querySelectorAll(".panel") : [];

    if (subTab === "presets") {
        if (presetsPanel) presetsPanel.style.display = "block";
    } else if (subTab === "rates") {
        if (adminGrid) {
            adminGrid.style.display = "grid";
            if (adminGridPanels[0]) adminGridPanels[0].style.display = "block";
            if (adminGridPanels[1]) adminGridPanels[1].style.display = "none";
        }
    } else if (subTab === "cb") {
        if (adminGrid) {
            adminGrid.style.display = "grid";
            if (adminGridPanels[0]) adminGridPanels[0].style.display = "none";
            if (adminGridPanels[1]) adminGridPanels[1].style.display = "block";
        }
    } else if (subTab === "feedbacks") {
        if (feedbacksPanel) {
            feedbacksPanel.style.display = "block";
            loadAdminFeedbacks();
        }
    } else if (subTab === "users") {
        if (usersPanel) {
            usersPanel.style.display = "block";
            loadAdminUsers();
        }
    }
}

async function refreshAdminBadges() {
    try {
        const [fbRes, userRes] = await Promise.all([
            fetch("/api/admin/feedback"),
            fetch("/api/admin/users")
        ]);
        if (fbRes.ok) {
            const fbData = await fbRes.json();
            if (fbData.ok && fbData.feedbacks) {
                _cachedAdminFeedbacks = fbData.feedbacks;
                const badge = document.getElementById("admin-feedbacks-badge");
                if (badge) badge.textContent = fbData.feedbacks.length;
                const stat = document.getElementById("admin-fb-stat-total");
                if (stat) stat.textContent = `${fbData.feedbacks.length} enviados`;
            }
        }
        if (userRes.ok) {
            const userData = await userRes.json();
            if (userData.ok && userData.users) {
                _cachedAdminUsers = userData.users;
                const badge = document.getElementById("admin-users-badge");
                if (badge) badge.textContent = userData.users.length;
                const stat = document.getElementById("admin-users-stat-total");
                if (stat) stat.textContent = `${userData.users.length} contas`;
            }
        }
    } catch (err) {
        console.warn("refreshAdminBadges error:", err);
    }
}

async function loadAdminFeedbacks(forceToast = false) {
    const container = document.getElementById("admin-fb-list-container");
    if (!container) return;
    if (_cachedAdminFeedbacks.length === 0) {
        container.innerHTML = `<div style="text-align:center;color:#9ca3af;padding:30px 0;">Carregando feedbacks...</div>`;
    }
    try {
        const res = await fetch("/api/admin/feedback");
        const data = await res.json();
        if (data.ok && data.feedbacks) {
            _cachedAdminFeedbacks = data.feedbacks;
            const badge = document.getElementById("admin-feedbacks-badge");
            if (badge) badge.textContent = data.feedbacks.length;
            const stat = document.getElementById("admin-fb-stat-total");
            if (stat) stat.textContent = `${data.feedbacks.length} enviados`;
            filterAdminFeedbacks();
            if (forceToast) showToast(`✅ ${data.feedbacks.length} feedbacks atualizados.`);
        } else {
            container.innerHTML = `<div style="text-align:center;color:#ef4444;padding:20px;">Falha ao carregar feedbacks.</div>`;
        }
    } catch (e) {
        console.error("loadAdminFeedbacks error:", e);
        container.innerHTML = `<div style="text-align:center;color:#ef4444;padding:20px;">Erro de conexão ao carregar feedbacks.</div>`;
    }
}

function filterAdminFeedbacks() {
    const search = (document.getElementById("admin-fb-search")?.value || "").toLowerCase().trim();
    const cat = document.getElementById("admin-fb-cat-filter")?.value || "all";

    const filtered = _cachedAdminFeedbacks.filter((fb) => {
        const matchCat = (cat === "all") || (fb.category === cat);
        const matchSearch = !search ||
            (fb.username || "").toLowerCase().includes(search) ||
            (fb.message || "").toLowerCase().includes(search) ||
            (fb.player_summary || "").toLowerCase().includes(search);
        return matchCat && matchSearch;
    });

    renderAdminFeedbacks(filtered);
}

function renderAdminFeedbacks(list) {
    const container = document.getElementById("admin-fb-list-container");
    if (!container) return;

    if (!list || list.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;color:#9ca3af;padding:40px 10px;background:#0d1117;border-radius:8px;border:1px dashed #30363d;">
                <div style="font-size:32px;margin-bottom:8px;">📬</div>
                <div style="font-weight:700;font-size:14px;color:#e2e8f0;">Nenhum feedback encontrado</div>
                <div style="font-size:12px;color:#64748b;margin-top:4px;">Nenhum feedback corresponde aos filtros selecionados no momento.</div>
            </div>
        `;
        return;
    }

    const catLabels = {
        bug: { label: "🐞 BUG", bg: "rgba(239, 68, 68, 0.15)", border: "#ef4444", text: "#fca5a5" },
        suggestion: { label: "💡 SUGESTÃO", bg: "rgba(59, 130, 246, 0.15)", border: "#3b82f6", text: "#93c5fd" },
        balance: { label: "⚖️ BALANCEAMENTO", bg: "rgba(234, 179, 8, 0.15)", border: "#eab308", text: "#fde047" },
        visual: { label: "🎨 VISUAL", bg: "rgba(168, 85, 247, 0.15)", border: "#a855f7", text: "#d8b4fe" },
        praise: { label: "⭐ ELOGIO", bg: "rgba(16, 185, 129, 0.15)", border: "#10b981", text: "#6ee7b7" }
    };

    container.innerHTML = list.map((fb) => {
        const catCfg = catLabels[fb.category] || { label: (fb.category || "GERAL").toUpperCase(), bg: "rgba(100,116,139,0.15)", border: "#64748b", text: "#cbd5e1" };
        const stars = "★".repeat(Math.max(1, Math.min(5, fb.rating || 5))) + "☆".repeat(5 - Math.max(1, Math.min(5, fb.rating || 5)));
        
        return `
            <div style="background:#0d1117;border:1px solid #30363d;border-left:4px solid ${catCfg.border};border-radius:8px;padding:12px 14px;display:flex;flex-direction:column;gap:8px;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span style="font-weight:800;color:#f8fafc;font-size:13.5px;">👤 ${escapeHtml(fb.username || "Anônimo")}</span>
                        <span style="font-size:10.5px;padding:2px 8px;border-radius:6px;background:${catCfg.bg};border:1px solid ${catCfg.border};color:${catCfg.text};font-weight:700;">${catCfg.label}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:12px;">
                        <span style="color:#f59e0b;font-size:14px;letter-spacing:1px;" title="Avaliação: ${fb.rating}/5">${stars}</span>
                        <span style="font-size:11.5px;color:#64748b;">🕒 ${fb.created_at || "Recente"}</span>
                    </div>
                </div>

                <div style="font-size:13px;line-height:1.5;color:#e2e8f0;background:rgba(255,255,255,0.02);padding:10px 12px;border-radius:6px;border:1px solid rgba(255,255,255,0.04);word-break:break-word;">
                    ${escapeHtml(fb.message || "")}
                </div>

                ${fb.player_summary ? `
                <div style="font-size:11px;color:#64748b;font-family:monospace;background:rgba(0,0,0,0.3);padding:6px 10px;border-radius:4px;display:flex;align-items:center;gap:6px;overflow-x:auto;">
                    <span>⚙️ Info da Sessão:</span>
                    <span style="color:#94a3b8;">${escapeHtml(fb.player_summary)}</span>
                </div>
                ` : ""}
            </div>
        `;
    }).join("");
}

async function loadAdminUsers(forceToast = false) {
    const tbody = document.getElementById("admin-users-tbody");
    if (!tbody) return;
    if (_cachedAdminUsers.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;color:#9ca3af;padding:24px;">Carregando contas cadastradas...</td></tr>`;
    }
    try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        if (data.ok && data.users) {
            _cachedAdminUsers = data.users;
            const badge = document.getElementById("admin-users-badge");
            if (badge) badge.textContent = data.users.length;
            const stat = document.getElementById("admin-users-stat-total");
            if (stat) stat.textContent = `${data.users.length} contas`;
            filterAdminUsers();
            if (forceToast) showToast(`✅ ${data.users.length} contas carregadas com sucesso.`);
        } else {
            tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;color:#ef4444;padding:20px;">Falha ao carregar lista de usuários.</td></tr>`;
        }
    } catch (e) {
        console.error("loadAdminUsers error:", e);
        tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;color:#ef4444;padding:20px;">Erro de conexão ao carregar usuários.</td></tr>`;
    }
}

function filterAdminUsers() {
    const search = (document.getElementById("admin-users-search")?.value || "").toLowerCase().trim();
    const filtered = _cachedAdminUsers.filter((u) => {
        if (!search) return true;
        return (u.username || "").toLowerCase().includes(search) ||
               String(u.id) === search ||
               (u.role || "").toLowerCase().includes(search);
    });
    renderAdminUsers(filtered);
}

function renderAdminUsers(list) {
    const tbody = document.getElementById("admin-users-tbody");
    if (!tbody) return;

    if (!list || list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;color:#9ca3af;padding:30px;">Nenhuma conta encontrada com o termo pesquisado.</td></tr>`;
        return;
    }

    tbody.innerHTML = list.map((u) => {
        const skin = u.avatar_model || "ethan_gold";
        const rolePill = u.role === "admin"
            ? `<span style="background:rgba(239,68,68,0.2);color:#fca5a5;border:1px solid #ef4444;padding:2px 7px;border-radius:4px;font-size:10.5px;font-weight:700;">ADMIN</span>`
            : `<span style="background:rgba(100,116,139,0.2);color:#94a3b8;border:1px solid #475569;padding:2px 7px;border-radius:4px;font-size:10.5px;">PLAYER</span>`;

        const portrait = (typeof getTrainerModelDataUrl === "function") ? getTrainerModelDataUrl(skin) : "/img/trainers/hgss_ethan.png";
        return `
            <tr style="border-bottom:1px solid #21262d;">
                <td style="padding:10px 12px;color:#64748b;font-weight:600;">#${u.id}</td>
                <td style="padding:10px 12px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <img src="${portrait}" alt="${skin}" style="width:32px;height:32px;image-rendering:pixelated;object-fit:contain;background:rgba(255,255,255,0.05);border-radius:4px;border:1px solid #30363d;" onerror="this.src=\'/img/trainers/hgss_ethan.png\'">
                        <div>
                            <div style="font-weight:700;color:#f3f4f6;">${escapeHtml(u.username)}</div>
                            <div style="font-size:10.5px;color:#64748b;">skin: ${skin}</div>
                        </div>
                    </div>
                </td>
                <td style="padding:10px 12px;">${rolePill}</td>
                <td style="padding:10px 12px;color:#fde047;font-weight:700;">Lv. ${u.level || 1}</td>
                <td style="padding:10px 12px;color:#fbbf24;">💰 ${(u.gold || 0).toLocaleString()}</td>
                <td style="padding:10px 12px;color:#38bdf8;">💎 ${(u.diamonds || 0).toLocaleString()}</td>
                <td style="padding:10px 12px;color:#e2e8f0;">🎒 ${u.party_count || 0}/6</td>
                <td style="padding:10px 12px;color:#64748b;font-size:11.5px;">${u.created_at || "—"}</td>
                <td style="padding:10px 12px;color:#64748b;font-size:11.5px;">${u.last_login || "—"}</td>
            </tr>
        `;
    }).join("");
}

// =========================================================
// POKÉLAND: OFFLINE EXPEDITION & FARM SYSTEM CONTROLLER
// =========================================================

function initOfflineFarmSystem(bootstrapData) {
    if (!STATE.player) return;
    if (!STATE.player.offline_farm) {
        STATE.player.offline_farm = {
            enabled: true,
            last_active: Date.now(),
            assigned_zone_id: null,
            auto_catch: true,
            ball_id: "capsule_ultra",
            catch_filter: "always",
            efficiency_level: 1,
            max_offline_hours: 12,
            total_offline_gold: 0,
            total_offline_exp: 0,
            total_offline_catches: 0,
        };
    }

    // Populate zone selectors for offline expedition
    const selPanel = document.getElementById("offline-route-select");
    const selModal = document.getElementById("offline-modal-zone-select");
    const zones = STATE.zones || [];

    const buildOptionsHtml = (selectedId) => {
        let html = `<option value="" ${!selectedId ? "selected" : ""}>📍 Rota Atual (Onde estiver caçando)</option>`;
        zones.forEach((z) => {
            const isSel = selectedId === z.id ? "selected" : "";
            html += `<option value="${z.id}" ${isSel}>${z.world_label}: ${z.name} (Lv. ${z.min_level})</option>`;
        });
        return html;
    };

    const curAssigned = STATE.player.offline_farm.assigned_zone_id || "";
    if (selPanel) selPanel.innerHTML = buildOptionsHtml(curAssigned);
    if (selModal) selModal.innerHTML = buildOptionsHtml(curAssigned);

    // Sync preferred ball selectors
    const curBall = STATE.player.offline_farm.ball_id || "capsule_ultra";
    const ballPanel = document.getElementById("offline-catch-ball");
    const ballModal = document.getElementById("offline-modal-ball-select");
    if (ballPanel) ballPanel.value = curBall;
    if (ballModal) ballModal.value = curBall;

    // Sync toggles
    syncOfflineTogglesUi();

    // Check if bootstrap returned an available offline progress report
    if (bootstrapData && bootstrapData.offline_report && bootstrapData.offline_report.available) {
        STATE.pendingOfflineReport = bootstrapData.offline_report;
        if (!window.location.search.includes('open_settings=1') && !window.location.search.includes('open_autofarm=1') && !window.location.search.includes('open_bag_pokemon=1') && !window.location.search.includes('open_pcbox=1') && !window.location.search.includes('open_mechanics=1') && !window.location.search.includes('open_pvp=1') && !window.location.search.includes('open_status=1') && !window.location.search.includes('open_status_team=1') && !window.location.search.includes('open_bag=1') && !window.location.search.includes('open_shop=1') && !window.location.search.includes('open_cashshop=1') && !window.location.search.includes('open_market=1') && !window.location.search.includes('open_market_admin=1') && !window.location.search.includes('open_market_sell=1') && !window.location.search.includes('hud_showcase=1') && !window.location.search.includes('clean_hunt=1') && !window.location.search.includes('open_pokemon_card=1') && !window.location.search.includes('open_desafio=')) {
            setTimeout(() => {
                showOfflineRewardsModal(bootstrapData.offline_report);
            }, 650);
        }
    } else {
        renderOfflineRewardsSection(null);
    }
}

function syncOfflineTogglesUi() {
    const off = (STATE.player && STATE.player.offline_farm) || {};
    const isFarmOn = off.enabled !== false;
    const isCatchOn = off.auto_catch !== false;

    // Auto-Farm Submenu Toggles
    const btnFarm = document.getElementById("btn-toggle-offline-farm");
    if (btnFarm) {
        btnFarm.className = isFarmOn ? "autofarm-switch-btn is-on" : "autofarm-switch-btn";
        const txt = btnFarm.querySelector(".switch-text");
        if (txt) txt.textContent = isFarmOn ? "ON" : "OFF";
    }

    const btnCatch = document.getElementById("btn-toggle-offline-catch");
    if (btnCatch) {
        btnCatch.className = isCatchOn ? "autofarm-switch-btn is-on" : "autofarm-switch-btn";
        const txt = btnCatch.querySelector(".switch-text");
        if (txt) txt.textContent = isCatchOn ? "ON" : "OFF";
    }

    // Modal Toggles
    const modalFarm = document.getElementById("btn-modal-toggle-offline");
    if (modalFarm) {
        modalFarm.className = isFarmOn ? "autofarm-switch-btn is-on" : "autofarm-switch-btn";
        const txt = modalFarm.querySelector(".switch-text");
        if (txt) txt.textContent = isFarmOn ? "ON" : "OFF";
    }

    const modalCatch = document.getElementById("btn-modal-toggle-offline-catch");
    if (modalCatch) {
        modalCatch.className = isCatchOn ? "autofarm-switch-btn is-on" : "autofarm-switch-btn";
        const txt = modalCatch.querySelector(".switch-text");
        if (txt) txt.textContent = isCatchOn ? "ON" : "OFF";
    }

    const badge = document.getElementById("offline-summary-badge");
    if (badge) {
        badge.textContent = isFarmOn ? "Status: ATIVO (Até 12 horas de progresso contínuo)" : "Status: PAUSADO";
        badge.style.color = isFarmOn ? "#38bdf8" : "#94a3b8";
    }
}

function renderOfflineExpeditionUi() {
    if (!STATE.player) return;
    const off = STATE.player.offline_farm || {};
    const assignedId = off.assigned_zone_id;
    const targetZone = assignedId ? STATE.zones.find(z => z.id === assignedId) : STATE.activeZone;
    const zLevel = targetZone ? targetZone.min_level : 15;
    const sp = targetZone && targetZone.primary_species_id ? STATE.speciesById[targetZone.primary_species_id] : null;

    // Rates calculation per hour
    const efficiency = 1.0 + ((off.efficiency_level || 1) - 1) * 0.15;
    const killsPerHour = Math.floor((3600 / 4.8) * efficiency);
    const baseGold = (sp?.gold_yield || 20) * (1 + zLevel * 0.08) * (STATE.config?.gold_mult || 1.0);
    const baseExp = (sp?.base_exp_yield || 50) * (1 + zLevel * 0.12) * (STATE.config?.exp_mult || 1.0);
    const goldPerHour = Math.floor(killsPerHour * baseGold);
    const expPerHour = Math.floor(killsPerHour * baseExp);
    const catchesPerHour = off.auto_catch !== false ? Math.floor(killsPerHour / 28) : 0;

    const elKills = document.getElementById("rate-kills");
    const elGold = document.getElementById("rate-gold");
    const elExp = document.getElementById("rate-exp");
    const elCatches = document.getElementById("rate-catches");
    const elEff = document.getElementById("offline-efficiency-tag");

    if (elKills) elKills.textContent = `~${killsPerHour.toLocaleString()}`;
    if (elGold) elGold.textContent = `+$${goldPerHour.toLocaleString()}`;
    if (elExp) elExp.textContent = `+${expPerHour.toLocaleString()}`;
    if (elCatches) elCatches.textContent = off.auto_catch !== false ? `~${catchesPerHour}` : "OFF";
    if (elEff) elEff.textContent = `Eficiência: ${Math.round(efficiency * 100)}%`;

    syncOfflineTogglesUi();
}

function switchOfflineCategory(category) {
    document.querySelectorAll(".offline-nav-pill").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.offlineCat === category);
    });

    const secRewards = document.getElementById("offline-section-rewards");
    const secConfig = document.getElementById("offline-section-config");
    const secSim = document.getElementById("offline-section-simulator");

    if (secRewards) secRewards.style.display = category === "rewards" ? "flex" : "none";
    if (secConfig) secConfig.style.display = category === "config" ? "flex" : "none";
    if (secSim) secSim.style.display = category === "simulator" ? "flex" : "none";

    if (category === "rewards") {
        renderOfflineRewardsSection(STATE.pendingOfflineReport);
    } else if (category === "config") {
        renderOfflineConfigSection();
    }
}

function renderOfflineConfigSection() {
    syncOfflineTogglesUi();
    const off = STATE.player?.offline_farm || {};
    const selModal = document.getElementById("offline-modal-zone-select");
    const ballModal = document.getElementById("offline-modal-ball-select");
    if (selModal) selModal.value = off.assigned_zone_id || "";
    if (ballModal) ballModal.value = off.ball_id || "capsule_ultra";
}

function renderOfflineRewardsSection(report) {
    const container = document.getElementById("offline-rewards-content");
    if (!container) return;

    if (!report || !report.available) {
        const off = STATE.player?.offline_farm || {};
        const z = off.assigned_zone_id ? STATE.zones.find(x => x.id === off.assigned_zone_id) : STATE.activeZone;
        container.innerHTML = `
            <div class="offline-summary-hero">
                <div class="offline-hero-title">💤 SUA EQUIPE ESTÁ EXPEDINDO AGORA!</div>
                <div class="offline-hero-sub">Rota Ativa: <strong>${z ? z.world_label + " — " + z.name : "Kanto Trilha"}</strong></div>
                <p style="font-size:12px;color:#94a3b8;max-width:560px;margin:10px auto 0 auto;line-height:1.5;">
                    Quando você fecha a aba ou sai do jogo, seu time continua caçando e coletando ouro, experiência e novos Pokémon por até <strong>12 horas</strong>. Ao retornar, o relatório detalhado de recompensas aparecerá aqui!
                </p>
            </div>
            <div class="settings-card" style="margin-top:10px;">
                <h3 class="settings-card-title">⚡ Rendimento Atual em Andamento</h3>
                <div class="offline-stats-hero-grid" style="margin-top:8px;">
                    <div class="offline-hero-stat-card">
                        <div class="offline-hero-stat-icon">⚔️</div>
                        <div class="offline-hero-stat-val">~750 / h</div>
                        <div class="offline-hero-stat-lbl">Inimigos Derrotados</div>
                    </div>
                    <div class="offline-hero-stat-card">
                        <div class="offline-hero-stat-icon">💰</div>
                        <div class="offline-hero-stat-val is-gold">+$15.000 / h</div>
                        <div class="offline-hero-stat-lbl">Ouro Estimado</div>
                    </div>
                    <div class="offline-hero-stat-card">
                        <div class="offline-hero-stat-icon">⚡</div>
                        <div class="offline-hero-stat-val is-exp">+30.000 / h</div>
                        <div class="offline-hero-stat-lbl">EXP Estimada</div>
                    </div>
                    <div class="offline-hero-stat-card">
                        <div class="offline-hero-stat-icon">🔴</div>
                        <div class="offline-hero-stat-val is-catch">~25 - 35 / h</div>
                        <div class="offline-hero-stat-lbl">Capturas Offline</div>
                    </div>
                </div>
            </div>
            <div style="margin-top:12px;text-align:center;">
                <button class="tibia-btn poke-cmd-btn is-blue" onclick="switchOfflineCategory('simulator')" style="padding:10px 18px;font-size:13px;">
                    🧪 Deseja testar agora? Abrir Simulador de Horas Offline ▸
                </button>
            </div>
        `;
        return;
    }

    // Build Celebratory Report View
    const capHours = 12;
    const elapsedHours = report.elapsed_seconds / 3600;
    const pct = Math.min(100, Math.round((elapsedHours / capHours) * 100));

    // Level-Ups HTML
    let levelUpsHtml = "";
    if (report.level_ups && report.level_ups.length > 0) {
        const cards = report.level_ups.map((lu) => {
            const portrait = getPmdPortraitUrl(lu.species_id || lu.dex_id);
            return `
                <div class="offline-levelup-card">
                    <img src="${portrait}" style="width:36px;height:36px;border-radius:4px;" alt="${lu.name}">
                    <div style="flex:1;min-width:0;">
                        <div style="font-weight:900;color:#fff;font-size:12px;">${lu.is_shiny ? "✨ " : ""}${lu.name}</div>
                        <div style="font-size:11px;font-weight:800;color:#4ade80;margin-top:2px;">
                            Lv. ${lu.old_level} ➔ <span style="font-size:13px;color:#fde047;">Lv. ${lu.new_level}</span> (+${lu.levels_gained} níveis!)
                        </div>
                    </div>
                </div>
            `;
        }).join("");
        levelUpsHtml = `
            <div class="settings-card">
                <h3 class="settings-card-title" style="color:#4ade80;">🆙 Subidas de Nível na Equipe (${report.level_ups.length}):</h3>
                <div class="offline-cards-grid" style="margin-top:8px;">${cards}</div>
            </div>
        `;
    }

    // Catches HTML
    let catchesHtml = "";
    if (report.catches && report.catches.length > 0) {
        const cards = report.catches.map((c) => {
            const portrait = getPmdPortraitUrl(c.species_id || c.dex_id);
            const ivTotal = c.ivs ? Object.values(c.ivs).reduce((a, b) => a + b, 0) : 100;
            return `
                <div class="offline-catch-card ${c.is_shiny ? "is-shiny" : ""}">
                    <img src="${portrait}" style="width:36px;height:36px;border-radius:4px;" alt="${c.name}">
                    <div style="flex:1;min-width:0;">
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <span style="font-weight:900;color:#fff;font-size:12px;">${c.is_shiny ? "✨ " : ""}${c.name}</span>
                            <span style="font-size:10px;color:#ffe066;font-weight:800;">Lv.${c.level}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:3px;font-size:10px;color:#94a3b8;">
                            <span>${c.quality || "Comum"}</span>
                            <span style="color:#38bdf8;">IV: ${ivTotal}/186</span>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
        catchesHtml = `
            <div class="settings-card">
                <h3 class="settings-card-title" style="color:#38bdf8;">🔴 Pokémon Capturados Offline (${report.catches.length}):</h3>
                <div class="offline-cards-grid" style="margin-top:8px;">${cards}</div>
            </div>
        `;
    }

    // Drops HTML
    let dropsHtml = "";
    if (report.items && report.items.length > 0) {
        const chips = report.items.map((it) => {
            return `
                <div class="offline-drop-chip">
                    <img src="${it.sprite}" style="width:20px;height:20px;" alt="">
                    <span>${it.name} <strong style="color:#ffe066;">×${it.qty}</strong></span>
                </div>
            `;
        }).join("");
        dropsHtml = `
            <div class="settings-card">
                <h3 class="settings-card-title">🎒 Drops de Itens & Recursos Coletados:</h3>
                <div class="offline-drops-flex" style="margin-top:8px;">${chips}</div>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="offline-summary-hero">
            <div class="offline-hero-title">🎉 BEM-VINDO DE VOLTA, TREINADOR!</div>
            <div class="offline-hero-sub">Sua equipe treinou na rota: <strong>${report.zone_world} — ${report.zone_name} (Lv. ${report.zone_level})</strong></div>
            <div class="offline-hero-gauge-box">
                <div class="offline-gauge-meta">
                    <span>Tempo Ausente: <strong>${report.time_formatted}</strong></span>
                    <span>${pct}% do Limite (12h máx)</span>
                </div>
                <div class="offline-gauge-track">
                    <div class="offline-gauge-fill" style="width:${pct}%;"></div>
                </div>
            </div>
        </div>

        <div class="offline-stats-hero-grid">
            <div class="offline-hero-stat-card">
                <div class="offline-hero-stat-icon">⚔️</div>
                <div class="offline-hero-stat-val">+${report.kills.toLocaleString()}</div>
                <div class="offline-hero-stat-lbl">Inimigos Derrotados</div>
            </div>
            <div class="offline-hero-stat-card">
                <div class="offline-hero-stat-icon">💰</div>
                <div class="offline-hero-stat-val is-gold">+$${report.gold.toLocaleString()}</div>
                <div class="offline-hero-stat-lbl">Ouro Coletado</div>
            </div>
            <div class="offline-hero-stat-card">
                <div class="offline-hero-stat-icon">⚡</div>
                <div class="offline-hero-stat-val is-exp">+${report.exp.toLocaleString()}</div>
                <div class="offline-hero-stat-lbl">EXP de Treinador</div>
            </div>
            <div class="offline-hero-stat-card">
                <div class="offline-hero-stat-icon">🔴</div>
                <div class="offline-hero-stat-val is-catch">+${(report.catches || []).length}</div>
                <div class="offline-hero-stat-lbl">Pokémon Capturados</div>
            </div>
        </div>

        ${levelUpsHtml}
        ${catchesHtml}
        ${dropsHtml}

        <div style="margin-top:14px;">
            <button class="offline-claim-big-btn" onclick="claimOfflineRewardsNow()">
                🎁 REIVINDICAR TODAS AS RECOMPENSAS
            </button>
        </div>
    `;
}

function showOfflineRewardsModal(report) {
    STATE.pendingOfflineReport = report;
    switchTab("offline");
    switchOfflineCategory("rewards");
    renderOfflineRewardsSection(report);
}

async function claimOfflineRewardsNow() {
    try {
        const headers = getAuthHeaders();
        const res = await fetch("/api/offline/claim", {
            method: "POST",
            headers,
            body: JSON.stringify({ report: STATE.pendingOfflineReport })
        });
        const data = await res.json();
        if (data.ok && data.player) {
            STATE.player = data.player;
            STATE.pendingOfflineReport = null;
            showToast(`🎁 Recompensas offline resgatadas com sucesso! +$${(data.report?.gold || 0).toLocaleString()} ouro e EXP creditados!`);
            renderAll();
            renderOfflineRewardsSection(null);
            setTimeout(() => {
                switchTab("hunt");
            }, 1200);
        } else {
            showToast(`⚠️ ${data.message || "Erro ao resgatar recompensas."}`);
        }
    } catch (e) {
        console.error("claimOfflineRewardsNow error:", e);
        showToast("❌ Erro de comunicação com o servidor.");
    }
}

async function triggerOfflineSimulation(hours) {
    showToast(`⏳ Simulando ${hours} hora(s) de treino offline...`);
    try {
        const headers = getAuthHeaders();
        const res = await fetch("/api/offline/simulate", {
            method: "POST",
            headers,
            body: JSON.stringify({ hours: hours, apply: true })
        });
        const data = await res.json();
        if (data.ok && data.report) {
            if (data.player) STATE.player = data.player;
            STATE.pendingOfflineReport = data.report;
            showToast(`✨ Simulação de ${hours}h concluída! Recompensas calculadas.`);
            renderAll();
            showOfflineRewardsModal(data.report);
        } else {
            showToast("❌ Erro ao simular farm offline.");
        }
    } catch (e) {
        console.error("triggerOfflineSimulation error:", e);
        showToast("❌ Falha na conexão com o servidor.");
    }
}

async function toggleOfflineFarmState(forceVal) {
    if (!STATE.player) return;
    const off = STATE.player.offline_farm = STATE.player.offline_farm || {};
    if (typeof forceVal === "boolean") {
        off.enabled = forceVal;
    } else {
        off.enabled = off.enabled === false;
    }
    syncOfflineTogglesUi();
    showToast(off.enabled ? "💤 Farm Offline ATIVADO: Sua equipe treinará enquanto estiver desconectado!" : "⚪ Farm Offline PAUSADO.");
    scheduleStateSave(800);
    try {
        await fetch("/api/offline/config", {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ enabled: off.enabled })
        });
    } catch (e) {}
}

async function toggleOfflineAutoCatch(forceVal) {
    if (!STATE.player) return;
    const off = STATE.player.offline_farm = STATE.player.offline_farm || {};
    if (typeof forceVal === "boolean") {
        off.auto_catch = forceVal;
    } else {
        off.auto_catch = off.auto_catch === false;
    }
    syncOfflineTogglesUi();
    renderOfflineExpeditionUi();
    showToast(off.auto_catch ? "🔴 Auto-Captura Offline ATIVADA: Pokébolas serão usadas para capturar monstros!" : "⚪ Auto-Captura Offline DESATIVADA.");
    scheduleStateSave(800);
    try {
        await fetch("/api/offline/config", {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ auto_catch: off.auto_catch })
        });
    } catch (e) {}
}

async function changeOfflineExpeditionZone(zoneId) {
    if (!STATE.player) return;
    const off = STATE.player.offline_farm = STATE.player.offline_farm || {};
    off.assigned_zone_id = zoneId || null;

    const selPanel = document.getElementById("offline-route-select");
    const selModal = document.getElementById("offline-modal-zone-select");
    if (selPanel) selPanel.value = zoneId || "";
    if (selModal) selModal.value = zoneId || "";

    renderOfflineExpeditionUi();
    const zoneName = zoneId ? STATE.zones.find(z => z.id === zoneId)?.name : "Rota Atual";
    showToast(`🧭 Rota Offline definida para: ${zoneName}`);
    scheduleStateSave(800);
    try {
        await fetch("/api/offline/config", {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ assigned_zone_id: off.assigned_zone_id })
        });
    } catch (e) {}
}

async function changeOfflineCatchBall(ballId) {
    if (!STATE.player) return;
    const off = STATE.player.offline_farm = STATE.player.offline_farm || {};
    off.ball_id = ballId;

    const ballPanel = document.getElementById("offline-catch-ball");
    const ballModal = document.getElementById("offline-modal-ball-select");
    if (ballPanel) ballPanel.value = ballId;
    if (ballModal) ballModal.value = ballId;

    showToast(`🔴 Pokébola Offline selecionada: ${ballId === "best" ? "Melhor Disponível" : ballId}`);
    scheduleStateSave(800);
    try {
        await fetch("/api/offline/config", {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ ball_id: off.ball_id })
        });
    } catch (e) {}
}

function openOfflineFarmModal() {
    switchTab("offline");
}

function openOfflineFarmSubmenu() {
    toggleAutoFarmMenu();
    switchAutoFarmSubmenu("offline");
}

function openLastOfflineReportModal() {
    switchTab("offline");
    switchOfflineCategory("rewards");
}

// Boot PokéLand Client
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGame);
} else {
    initGame();
}


// Re-render canvas when local font bundle is fully active
if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
        if (typeof renderGameWorld === 'function') renderGameWorld();
    });
}


// =========================================================
// ACTION BAR (8 QUICK USE SLOTS ON SCREEN BOTTOM CENTER)
// =========================================================
function renderActionBar() {
    const container = document.getElementById("quick-action-bar-slots");
    if (!container) return;

    if (!STATE.actionBarSlots || STATE.actionBarSlots.length !== 8) {
        STATE.actionBarSlots = ["capsule_basic", "capsule_great", "capsule_ultra", "capsule_master", "potion", "revive", "candy_rare", "stone_water"];
    }

    const inv = STATE.player?.inventory || {};

    container.innerHTML = STATE.actionBarSlots.map((itemId, idx) => {
        const slotNum = idx + 1;
        const item = STATE.itemsMap?.[itemId] || { name: itemId, type: "material" };
        const qty = inv[itemId] || 0;
        const sprite = typeof getItemSpriteUrl === "function" ? getItemSpriteUrl(itemId, item) : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
        const isBall = itemId.startsWith("capsule_") || itemId.includes("ball");

        return `
            <div class="actionbar-slot ${qty > 0 ? 'has-item' : 'is-empty'}" onclick="useActionBarSlot(${idx})" title="Slot ${slotNum} (Atalho: Alt+${slotNum}): ${item.name} (Quantidade: ${qty})">
                <span class="slot-key-badge">${slotNum}</span>
                <div class="slot-icon-box">
                    <img src="${sprite}" alt="${item.name}" style="max-width:24px;max-height:24px;image-rendering:pixelated;" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png';">
                </div>
                <span class="slot-qty-badge ${qty === 0 ? 'zero-qty' : ''}">${qty > 99 ? '99+' : qty}</span>
            </div>
        `;
    }).join("");
}

function useActionBarSlot(slotIdx) {
    if (!STATE.player || !STATE.actionBarSlots) return;
    const itemId = STATE.actionBarSlots[slotIdx];
    if (!itemId) return;

    const qty = STATE.player.inventory[itemId] || 0;
    const item = STATE.itemsMap?.[itemId] || { name: itemId };

    if (qty <= 0) {
        showToast(`⚠️ Você não possui ${item.name} na mochila!`);
        return;
    }

    // If it's a Pokeball, throw it at the target
    if (itemId.startsWith("capsule_") || itemId.includes("ball")) {
        STATE.tibia.selectedBallId = itemId;
        throwCapsule(itemId, false);
        renderActionBar();
        return;
    }

    // If it's a consumable (potion, revive, candy, stone)
    const lead = getLeadPokemon();
    if (!lead) {
        showToast("⚠️ Nenhum Pokémon ativo na equipe para usar este item!");
        return;
    }

    if (itemId.includes("potion")) {
        if (lead.hp >= lead.max_hp) {
            showToast(`❤️ ${lead.name} já está com 100% de HP!`);
            return;
        }
        lead.hp = Math.min(lead.max_hp, lead.hp + 200);
        STATE.player.inventory[itemId] = qty - 1;
        showToast(`🧪 Você usou ${item.name} em ${lead.name} (+200 HP)!`);
    } else if (itemId.includes("revive")) {
        if (lead.hp > 0) {
            showToast(`❤️ ${lead.name} ainda está consciente!`);
            return;
        }
        lead.hp = Math.floor(lead.max_hp / 2);
        STATE.player.inventory[itemId] = qty - 1;
        showToast(`✨ ${lead.name} foi revivido com 50% de HP!`);
    } else if (itemId.includes("candy")) {
        lead.level = Math.min(100, lead.level + 1);
        lead.exp = 0;
        lead.max_hp = Math.floor(lead.max_hp * 1.05);
        lead.hp = lead.max_hp;
        STATE.player.inventory[itemId] = qty - 1;
        showToast(`🍬 ${lead.name} subiu para o Nível ${lead.level}!`);
    } else {
        showToast(`📦 Item ${item.name} ativado com sucesso!`);
    }

    scheduleStateSave(1000);
    renderAll();
    renderActionBar();
}


// =========================================================
// TOPBAR MINIMIZE, COMPLETE RESTART & FLOATING UPDATE ANNOUNCER
// =========================================================

let INITIAL_SERVER_BUILD_TIME = null;
let UPDATE_ANNOUNCEMENT_SNOOZED_UNTIL = 0;

function toggleTopbarMinimize() {
    const bar = document.getElementById("top-menubar-hud");
    const subShelf = document.getElementById("topbar-sub-shelf");
    const icon = document.getElementById("topbar-minimize-icon");
    if (!bar) return;

    const isMin = bar.classList.toggle("is-minimized");
    document.body.classList.toggle("topbar-minimized", isMin);

    if (icon) icon.textContent = isMin ? "▼" : "▲";

    const btn = document.getElementById("btn-topbar-minimize");
    if (btn) btn.title = isMin ? "Expandir Barra Superior" : "Minimizar Barra Superior";

    if (isMin) {
        localStorage.setItem("pokeland_topbar_minimized", "true");
        showToast("📐 Barra Superior minimizada! Clique em '▼' para restaurar.");
    } else {
        localStorage.removeItem("pokeland_topbar_minimized");
        showToast("📐 Barra Superior expandida!");
    }
}
window.toggleTopbarMinimize = toggleTopbarMinimize;

function loadTopbarMinimizeState() {
    const isMin = localStorage.getItem("pokeland_topbar_minimized") === "true";
    if (isMin) {
        const bar = document.getElementById("top-menubar-hud");
        const icon = document.getElementById("topbar-minimize-icon");
        if (bar) bar.classList.add("is-minimized");
        document.body.classList.add("topbar-minimized");
        if (icon) icon.textContent = "▼";
        const btn = document.getElementById("btn-topbar-minimize");
        if (btn) btn.title = "Expandir Barra Superior";
    }
}

async function forceCompleteGameRestartAndClearCache() {
    let overlay = document.getElementById("game-restart-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "game-restart-overlay";
        overlay.className = "game-restart-overlay";
        overlay.innerHTML = `
            <div class="restart-box">
                <div class="restart-spinner">🔄</div>
                <div class="restart-title">REINICIANDO O POKÉLAND</div>
                <div class="restart-desc">Limpando todo o cache do navegador, dados temporários e recarregando os scripts mais recentes...</div>
                <div class="restart-progress-bar"><div class="restart-progress-fill"></div></div>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    overlay.style.display = "flex";

    try {
        if ("caches" in window) {
            const keys = await caches.keys();
            await Promise.all(keys.map((k) => caches.delete(k)));
        }
        if (window.sessionStorage) {
            sessionStorage.clear();
        }
        // Purge any stale cache keys in localStorage
        const keysToKeep = ["pokepixel_auth_user", "pokepixel_session_token", "pokeland_topbar_minimized"];
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const k = localStorage.key(i);
            if (k && !keysToKeep.includes(k) && (k.startsWith("cache_") || k.startsWith("pokepixel_cache") || k.includes("temp_"))) {
                localStorage.removeItem(k);
            }
        }
    } catch (err) {
        console.warn("Cache wipe warning:", err);
    }

    setTimeout(() => {
        const bustUrl = window.location.origin + window.location.pathname + "?hard_restart=" + Date.now();
        window.location.href = bustUrl;
    }, 700);
}
window.forceCompleteGameRestartAndClearCache = forceCompleteGameRestartAndClearCache;

function showFloatingUpdateAnnouncement(updateData = null) {
    const el = document.getElementById("floating-update-announcer");
    if (!el) return;

    if (updateData) {
        if (updateData.version) {
            const verEl = document.getElementById("update-announcer-version");
            if (verEl) verEl.textContent = updateData.version;
        }
        if (updateData.update_title) {
            const titleEl = document.getElementById("update-announcer-title");
            if (titleEl) titleEl.textContent = updateData.update_title;
        }
        if (updateData.update_message) {
            const msgEl = document.getElementById("update-announcer-message");
            if (msgEl) msgEl.textContent = updateData.update_message;
        }
    }

    el.classList.remove("is-hidden");
    if (typeof playUiSound === "function") playUiSound("notification");
}
window.showFloatingUpdateAnnouncement = showFloatingUpdateAnnouncement;

function dismissUpdateAnnouncement(snoozeSeconds = 300) {
    const el = document.getElementById("floating-update-announcer");
    if (el) el.classList.add("is-hidden");
    UPDATE_ANNOUNCEMENT_SNOOZED_UNTIL = Date.now() + snoozeSeconds * 1000;
    showToast(`⏱️ Aviso adiado por ${Math.round(snoozeSeconds / 60)} minutos.`);
}
window.dismissUpdateAnnouncement = dismissUpdateAnnouncement;

// Global Golden Broadcast Banner for Level 100 & Ultra-Rare Drops
let _globalBroadcastTimer = null;
function triggerGlobalGoldenBroadcast(title, subtitle, iconType = "crown", tier = "gold") {
    let banner = document.getElementById("global-broadcast-banner");
    if (!banner) {
        banner = document.createElement("div");
        banner.id = "global-broadcast-banner";
        banner.className = "global-broadcast-banner is-hidden";
        banner.innerHTML = `
            <div class="gbb-glow-effect"></div>
            <div class="gbb-icon-box" id="gbb-icon">👑</div>
            <div class="gbb-content">
                <div class="gbb-title" id="gbb-title">ANÚNCIO GLOBAL</div>
                <div class="gbb-subtitle" id="gbb-subtitle">Acontecimento épico no servidor</div>
            </div>
            <button class="gbb-close" onclick="dismissGlobalBroadcast()" title="Fechar">✕</button>
        `;
        document.body.appendChild(banner);
    }

    const iconMap = {
        crown: "👑",
        star: "🌟",
        sparkles: "✨",
        trophy: "🏆",
        fire: "🔥"
    };

    const iconEl = document.getElementById("gbb-icon");
    const titleEl = document.getElementById("gbb-title");
    const subtitleEl = document.getElementById("gbb-subtitle");

    if (iconEl) iconEl.textContent = iconMap[iconType] || "👑";
    if (titleEl) titleEl.textContent = title;
    if (subtitleEl) subtitleEl.innerHTML = subtitle;

    banner.className = `global-broadcast-banner tier-${tier}`;
    banner.classList.remove("is-hidden");

    // Add entry to combat log in styled gold
    if (typeof addCombatLog === "function") {
        addCombatLog(`
            <div style="background:linear-gradient(90deg, rgba(234,179,8,0.22), rgba(234,179,8,0.03)); border-left:4px solid #eab308; padding:5px 10px; margin:4px 0; border-radius:4px; box-shadow:0 0 10px rgba(234,179,8,0.2);">
                <div style="color:#fde047; font-weight:900; font-size:12px; letter-spacing:0.5px; display:flex; align-items:center; gap:6px;">
                    <span>${iconMap[iconType] || "👑"}</span> <span>${title}</span>
                </div>
                <div style="color:#f1f5f9; font-size:11.5px; margin-top:2px;">${subtitle}</div>
            </div>
        `);
    }

    if (typeof playUiSound === "function") {
        playUiSound("notification");
    }

    clearTimeout(_globalBroadcastTimer);
    _globalBroadcastTimer = setTimeout(() => {
        dismissGlobalBroadcast();
    }, 7000);
}
window.triggerGlobalGoldenBroadcast = triggerGlobalGoldenBroadcast;

function dismissGlobalBroadcast() {
    const banner = document.getElementById("global-broadcast-banner");
    if (banner) {
        banner.classList.add("is-hidden");
    }
}
window.dismissGlobalBroadcast = dismissGlobalBroadcast;

async function checkServerUpdateVersion() {
    try {
        const res = await fetch("/api/version?t=" + Date.now());
        if (!res.ok) return;
        const data = await res.json();
        if (!data || !data.ok) return;

        if (INITIAL_SERVER_BUILD_TIME === null) {
            INITIAL_SERVER_BUILD_TIME = data.build_timestamp || Date.now();
            return;
        }

        // If server build timestamp is newer than our initial boot timestamp:
        if (data.build_timestamp && data.build_timestamp > INITIAL_SERVER_BUILD_TIME) {
            if (Date.now() > UPDATE_ANNOUNCEMENT_SNOOZED_UNTIL) {
                showFloatingUpdateAnnouncement(data);
            }
        }
    } catch (err) {
        // Silent catch for background check
    }
}

// Start periodic update check every 35 seconds
setInterval(checkServerUpdateVersion, 35000);
setTimeout(checkServerUpdateVersion, 2000);

// =========================================================
// POKÉLAND: COMPLETE STATUS CARD (ON HOVER) SUBSYSTEM
// =========================================================
function getPokemonLetterGrade(iv) {
    if (iv >= 31) return { grade: "S+", color: "#22c55e" };
    if (iv >= 28) return { grade: "S", color: "#38bdf8" };
    if (iv >= 23) return { grade: "A", color: "#60a5fa" };
    if (iv >= 16) return { grade: "B", color: "#facc15" };
    if (iv >= 8) return { grade: "C", color: "#fb923c" };
    return { grade: "D", color: "#94a3b8" };
}

function showPokemonHoverCard(mon, event) {
    if (!mon) return;
    const cardEl = document.getElementById("pokemon-hover-card");
    if (!cardEl) return;

    const sp = (STATE.speciesById && STATE.speciesById[mon.species_id]) ||
               (STATE.species && STATE.species.find(s => s.id === mon.species_id || s.dex_id === mon.dex_id)) ||
               { name: mon.name, elements: mon.elements || ["normal"], base_stats: {} };

    const bs = sp.base_stats || { hp: 50, atk: 50, def: 50, spa: 50, spd: 50, spe: 50 };
    const level = mon.level || 1;
    const isShiny = !!mon.is_shiny;
    const gender = mon.gender === "F" || mon.gender === "female" ? "♀" : mon.gender === "M" || mon.gender === "male" ? "♂" : "⚲";
    const genderColor = gender === "♀" ? "#f472b6" : gender === "♂" ? "#60a5fa" : "#94a3b8";

    const ivs = mon.ivs || { hp: 15, atk: 15, def: 15, spa: 15, spd: 15, spe: 15 };
    const ivTotal = mon.iv_total || (ivs.hp + ivs.atk + ivs.def + ivs.spa + ivs.spd + ivs.spe);
    const ivPct = Math.min(100, Math.round((ivTotal / 186) * 100));

    const stats = mon.stats || {
        hp: mon.max_hp || 100,
        atk: Math.floor(bs.atk || 50),
        def: Math.floor(bs.def || 50),
        spa: Math.floor(bs.spa || 50),
        spd: Math.floor(bs.spd || 50),
        spe: Math.floor(bs.spe || 50)
    };
    const maxHp = mon.max_hp || stats.hp || 100;
    const curHp = mon.hp !== undefined ? mon.hp : maxHp;

    const cp = Math.floor((stats.atk * 1.4 + stats.spa * 1.4 + stats.def + stats.spd + stats.spe * 1.1 + maxHp * 0.8) * (mon.quality_multiplier || 1.0));
    const sellGold = typeof calculatePokemonGoldValue === "function" ? calculatePokemonGoldValue(mon) : 500;

    const elements = mon.elements || sp.elements || ["normal"];
    const elementsHtml = elements.map(el => {
        const elKey = String(el).toLowerCase();
        const info = (typeof ELEMENT_PT !== "undefined" && ELEMENT_PT[elKey]) || { label: el.toUpperCase(), bg: "#64748b" };
        const iconUrl = typeof getGen8TypeIconUrl === "function" ? getGen8TypeIconUrl(elKey) : "";
        return `<span style="background:${info.bg};color:#fff;display:inline-flex;align-items:center;gap:3px;padding:2px 7px;border-radius:6px;font-size:9.5px;font-weight:900;">
            ${iconUrl ? `<img src="${iconUrl}" style="width:12px;height:12px;object-fit:contain;">` : ""} ${info.label}
        </span>`;
    }).join(" ");

    const equippedMoves = (mon.moves && mon.moves.length > 0 ? mon.moves : (sp.learn_moves || ["tackle"])).slice(0, 4);
    const movesHtml = equippedMoves.map((mId, mIdx) => {
        const mv = (STATE.movesMap && STATE.movesMap[mId]) || { name: mId, element: elements[0] || "normal", power: 55 };
        const elKey = String(mv.element || "normal").toLowerCase();
        const iconUrl = typeof getGen8TypeIconUrl === "function" ? getGen8TypeIconUrl(elKey) : "";
        return `
            <div class="phc-move-item">
                ${iconUrl ? `<img src="${iconUrl}" class="phc-move-icon">` : ""}
                <div class="phc-move-info">
                    <div class="phc-move-name">${mv.name}</div>
                    <div class="phc-move-power">m${mIdx + 1} • PWR ${mv.power || 50}</div>
                </div>
            </div>
        `;
    }).join("");

    const statList = [
        { key: "hp", label: "HP", val: ivs.hp || 0, cur: maxHp },
        { key: "atk", label: "ATK", val: ivs.atk || 0, cur: stats.atk },
        { key: "def", label: "DEF", val: ivs.def || 0, cur: stats.def },
        { key: "spa", label: "SPA", val: ivs.spa || 0, cur: stats.spa },
        { key: "spd", label: "SPD", val: ivs.spd || 0, cur: stats.spd },
        { key: "spe", label: "SPE", val: ivs.spe || 0, cur: stats.spe },
    ];

    const ivCellsHtml = statList.map(s => {
        const gradeInfo = getPokemonLetterGrade(s.val);
        const fillPct = Math.round((s.val / 31) * 100);
        return `
            <div class="phc-iv-cell">
                <div class="phc-iv-lbl-row">
                    <span>${s.label}: ${s.cur}</span>
                    <span style="color:${gradeInfo.color};font-weight:900;">${s.val}/31 (${gradeInfo.grade})</span>
                </div>
                <div class="phc-iv-bar">
                    <div class="phc-iv-bar-fill" style="width:${fillPct}%;background:${gradeInfo.color};"></div>
                </div>
            </div>
        `;
    }).join("");

    const portraitUrl = typeof getPmdPortraitUrl === "function" ? getPmdPortraitUrl(mon.species_id || mon.dex_id) : `/img/pmd/${mon.species_id}/Portrait.png`;
    const fallbackUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mon.dex_id || 25}.png`;

    const qLabel = mon.quality || "Comum";
    const qClass = `quality-${qLabel.toLowerCase()}`;
    cardEl.className = `pokemon-hover-card ${qClass}`;

    cardEl.innerHTML = `
        <div class="phc-header-row">
            <div class="phc-portrait-box">
                <img src="${portraitUrl}" onerror="this.onerror=null;this.src='${fallbackUrl}';" class="phc-portrait-img">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" class="phc-ball-badge" title="Pokéball de Captura">
            </div>
            <div class="phc-info-col">
                <div class="phc-title-row">
                    <span class="phc-name">${isShiny ? '<span style="color:#facc15;">⭐</span> ' : ''}${mon.name}</span>
                    <span class="phc-level-badge">Lv. ${level}</span>
                </div>
                <div class="phc-tags-row">
                    <span class="phc-rarity-pill ${qClass}">${qLabel} (${(mon.quality_multiplier || 1.0).toFixed(2)}x)</span>
                    <span style="color:${genderColor};font-weight:900;font-size:13px;">${gender}</span>
                    <span class="phc-nature-txt">${mon.nature || "Adamant"}</span>
                </div>
                <div style="margin-top:5px;display:flex;gap:4px;">
                    ${elementsHtml}
                </div>
            </div>
        </div>

        <div class="phc-cp-banner">
            <div style="display:flex;gap:6px;align-items:center;">
                <span style="font-size:11px;font-weight:800;color:#94a3b8;">HP:</span>
                <span style="font-size:11.5px;color:#4ade80;font-weight:900;">${curHp} / ${maxHp}</span>
            </div>
            <div>
                <span style="font-size:11px;color:#94a3b8;font-weight:800;">PODER TOTAL:</span>
                <span class="phc-cp-val">CP ${cp.toLocaleString()}</span>
            </div>
        </div>

        <!-- Dedicated Visual Box: Rarity Multiplier -->
        <div class="phc-rarity-multiplier-box">
            <div class="phc-rmb-top">
                <div class="phc-rmb-left">
                    <span class="phc-rmb-icon">✨</span>
                    <div class="phc-rmb-titles">
                        <span class="phc-rmb-title">Multiplicador de Raridade</span>
                        <span class="phc-rmb-sub">${qLabel} ${isShiny ? 'Shiny' : ''}</span>
                    </div>
                </div>
                <div class="phc-rmb-badge ${qClass}">
                    <span class="phc-rmb-mult-val">${(mon.quality_multiplier || 1.0).toFixed(2)}x</span>
                    <span class="phc-rmb-bonus-pct">+${Math.round(((mon.quality_multiplier || 1.0) - 1.0) * 100)}% Atrib.</span>
                </div>
            </div>
            <div class="phc-rmb-meter-wrap">
                <div class="phc-rmb-track">
                    <div class="phc-rmb-fill ${qClass}" style="width: ${Math.min(100, Math.max(10, Math.round(((mon.quality_multiplier || 1.0) - 0.95) / (2.20 - 0.95) * 100)))}%;"></div>
                </div>
                <div class="phc-rmb-ticks">
                    <span class="${qLabel === 'Comum' ? 'is-active' : ''}">Comum<br>1.0x</span>
                    <span class="${qLabel === 'Incomum' ? 'is-active' : ''}">Incomum<br>1.15x</span>
                    <span class="${qLabel === 'Raro' ? 'is-active' : ''}">Raro<br>1.30x</span>
                    <span class="${qLabel === 'Épico' || qLabel === 'epico' ? 'is-active' : ''}">Épico<br>1.45x</span>
                    <span class="${qLabel === 'Lendário' || qLabel === 'lendario' ? 'is-active' : ''}">Lendário<br>1.65x</span>
                    <span class="${qLabel === 'Mítico' || qLabel === 'mitico' ? 'is-active' : ''}">Mítico<br>2.0x+</span>
                </div>
            </div>
            <div class="phc-rmb-effect-desc">
                Amplifica HP, ATK, DEF, SPA, SPD e SPE deste Pokémon em <strong style="color:#facc15;">+${Math.round(((mon.quality_multiplier || 1.0) - 1.0) * 100)}%</strong>.
            </div>
        </div>

        <div class="phc-section-title">
            <span>🧬 IVs Individuais (Genes)</span>
            <span style="color:${ivPct >= 90 ? '#4ade80' : ivPct >= 70 ? '#38bdf8' : '#facc15'};font-family:var(--font-mono);font-size:11px;">
                Total: ${ivTotal}/186 (${ivPct}% Perfeito)
            </span>
        </div>
        <div class="phc-iv-grid">
            ${ivCellsHtml}
        </div>

        <div class="phc-section-title">
            <span>⚔️ Golpes Selecionados (m1 - m4)</span>
            <span style="font-size:9.5px;color:#64748b;">Atalhos [1-4]</span>
        </div>
        <div class="phc-moves-grid">
            ${movesHtml}
        </div>

        <div class="phc-footer-row">
            <div>
                <span style="color:#94a3b8;">EXP Próximo Lv:</span>
                <strong style="color:#38bdf8;font-family:var(--font-mono);">${(mon.exp || 0).toLocaleString()} / ${(mon.exp_next || 1000).toLocaleString()}</strong>
            </div>
            <div>
                <span style="color:#94a3b8;">Valor na Loja:</span>
                <span class="phc-sell-gold">💰 $${sellGold.toLocaleString()}</span>
            </div>
        </div>
    `;

    cardEl.classList.remove("is-hidden");
    positionPokemonHoverCard(event);
}

function positionPokemonHoverCard(event) {
    const cardEl = document.getElementById("pokemon-hover-card");
    if (!cardEl || cardEl.classList.contains("is-hidden") || !event) return;

    const pad = 16;
    let x = event.clientX + pad;
    let y = event.clientY + pad;

    const w = cardEl.offsetWidth || 380;
    const h = cardEl.offsetHeight || 380;

    if (x + w > window.innerWidth - 10) {
        x = Math.max(10, event.clientX - w - pad);
    }
    if (y + h > window.innerHeight - 10) {
        y = Math.max(10, window.innerHeight - h - 10);
    }

    cardEl.style.left = `${Math.round(x)}px`;
    cardEl.style.top = `${Math.round(y)}px`;
}

function hidePokemonHoverCard() {
    const cardEl = document.getElementById("pokemon-hover-card");
    if (cardEl) cardEl.classList.add("is-hidden");
}

window.showPokemonHoverCard = showPokemonHoverCard;
window.hidePokemonHoverCard = hidePokemonHoverCard;
window.positionPokemonHoverCard = positionPokemonHoverCard;

// =========================================================
// POKÉLAND: CHALLENGE ARENA MAP ENVIRONMENTS (DESAFIOS)
// =========================================================
function enterChallengeArena(chType, options = {}) {
    // Preserve previous map state before entering challenge arena
    if (!STATE.tibia.activeChallenge) {
        STATE.tibia.previousMap = {
            isCentralHub: !!STATE.tibia.isCentralHub,
            zoneId: STATE.activeZone?.id || "route_1_prairie",
            trainerPos: { gx: STATE.tibia.trainer.gx, gy: STATE.tibia.trainer.gy },
            autoCatchWasEnabled: !!STATE.autoCatchEnabled,
            autoHuntWasEnabled: !!STATE.autoHuntEnabled,
        };
    }

    // Pause auto-hunt and auto-catch during arena battle
    if (STATE.autoHuntEnabled) toggleAutoHunt();
    STATE.autoCatchEnabled = false;

    const territoryName = options.territoryName || (options.territoryId === "indigo" ? "Indigo Citadel (Planalto)" : options.territoryId === "power" ? "Kanto Power Plant" : options.territoryId === "cinnabar" ? "Cinnabar Volcano Fortress" : "Silph Co. HQ (Saffron)");
    const rivalGuild = options.rivalGuild || (options.territoryId === "indigo" ? "Team Rocket Guild" : options.territoryId === "cinnabar" ? "Dragon Clan" : "Rival Guild Syndicate");
    const bossSpecies = options.bossSpecies || (options.territoryId === "indigo" ? "tyranitar" : options.territoryId === "power" ? "electabuzz" : options.territoryId === "cinnabar" ? "charizard" : "dragonite");
    const bossName = options.bossName || `Guardião de ${rivalGuild} - ${bossSpecies.charAt(0).toUpperCase() + bossSpecies.slice(1)}`;

    const arenaDefs = {
        gvg: {
            title: `COLISEU GV-G: ${territoryName.toUpperCase()}`,
            sub: `Disputa de Território contra ${rivalGuild}`,
            biome: "gvg",
            leaderSprite: options.leaderSprite || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/giovanni.png",
            bossSpecies: bossSpecies,
            bossName: bossName,
            bossLevel: options.bossLevel || 85,
            bossHp: options.bossHp || 65000,
            territoryId: options.territoryId || "silph",
            territoryName: territoryName,
            rivalGuild: rivalGuild,
        },
        pvp: {
            title: "ARENA DOS CAMPEÕES (PVP RANQUEADO)",
            sub: "Temporada Global 1v1 - Combate Oficial de Treinadores",
            biome: "electric",
            leaderSprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/blue.png",
            bossSpecies: "gengar",
            bossName: options.oppName || "Treinador Desafiante - Gengar",
            bossLevel: (STATE.player?.party[0]?.level || 50),
            bossHp: 38000,
        },
        gyms: {
            title: options.gymTitle || "GINÁSIO OFICIAL DA LIGA",
            sub: options.gymSub || "Disputa de Insígnia da Liga Pokémon",
            biome: options.gymBiome || "rock",
            leaderSprite: options.leaderSprite || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/brock.png",
            bossSpecies: options.bossSpecies || "onix",
            bossName: options.bossName || "Líder Brock - Onix",
            bossLevel: options.minLv || 25,
            bossHp: 45000,
        },
        elite4: {
            title: options.stageTitle || "PLANALTO ÍNDIGO - CÂMARA SUPREMA",
            sub: options.stageSub || "Elite dos 4 & Campeão da Liga",
            biome: "legendary",
            leaderSprite: options.leaderSprite || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/lance.png",
            bossSpecies: options.bossSpecies || "dragonite",
            bossName: options.bossName || "Mestre Lance - Dragonite Supremo",
            bossLevel: 90,
            bossHp: 120000,
        },
        safari: {
            title: "RESERVA SELVAGEM DO SAFARI ZONE",
            sub: "Área de Preservação - Encontros Raros & Safari Balls",
            biome: "safari",
            leaderSprite: null,
            bossSpecies: "chansey",
            bossName: "Chansey Rara do Safari",
            bossLevel: 45,
            bossHp: 18000,
        },
        worldboss: {
            title: "CRATERA DO TITÃ - WORLD BOSS LENDÁRIO",
            sub: "Mewtwo Armored Ancestral - Raid Global de Kanto",
            biome: "fire",
            leaderSprite: null,
            bossSpecies: "mewtwo",
            bossName: "Titã Mewtwo Armored",
            bossLevel: 100,
            bossHp: 5000000,
            curHp: 3840250,
        },
        dungeons: {
            title: options.dungeonName || "DUNGEONS CO-OP & CATACUMBAS",
            sub: "Exploração de Ruínas & Covil dos Guardiões",
            biome: "ghost",
            leaderSprite: null,
            bossSpecies: options.bossSpecies || "zapdos",
            bossName: options.bossName || "Guardião da Usina Abandonada",
            bossLevel: options.reqLv || 75,
            bossHp: 95000,
        }
    };

    const cfg = { ...(arenaDefs[chType] || arenaDefs.gvg), ...options, chType };

    if (options.skipAnimation) {
        STATE.tibia.isCentralHub = false;
        STATE.tibia.activeChallenge = cfg;
        spawnChallengeEntities(cfg);
        updateChallengeBannerUi(cfg);
        switchTab("hunt");
        renderBattleArena(true);
        return;
    }

    showTransitLoadscreen({
        destTitle: cfg.title,
        modeTag: cfg.chType === "gvg" ? "⚔️ GUERRA DE GUILDAS (GV-G) ⚔️" : "⚔️ DESAFIO DA LIGA POKÉMON ⚔️",
        pillMode: cfg.chType === "gvg" ? "🏰 Disputa de Território" : "🏛️ Arena Temática de Combate",
        subText: cfg.sub,
        ballType: chType === "worldboss" || chType === "elite4" || chType === "gvg" ? "master" : "ultra",
        durationMs: 750,
        onMiddle: () => {
            STATE.tibia.isCentralHub = false;
            STATE.tibia.activeChallenge = cfg;
            spawnChallengeEntities(cfg);
            updateChallengeBannerUi(cfg);
            switchTab("hunt");
            renderBattleArena(true);
            showToast(`⚔️ Você entrou no mapa: ${cfg.title}!`);
        }
    });
}

function leaveChallengeArena() {
    const prev = STATE.tibia.previousMap;
    const destTitle = prev?.isCentralHub ? "CIDADE CENTRAL (SAFFRON PLAZA)" : (STATE.activeZone?.name ? `${STATE.activeZone.world_label}: ${STATE.activeZone.name}` : "ROTA DE CAÇA (KANTO)");

    showTransitLoadscreen({
        destTitle: destTitle,
        modeTag: "🌿 RETORNO AO MAPA ANTERIOR 🌿",
        pillMode: prev?.isCentralHub ? "🏙️ Cidade Social Segura" : "Caça & Aventura Livre",
        subText: "Saindo da arena e restaurando o cenário anterior...",
        ballType: "poke",
        durationMs: 650,
        onMiddle: () => {
            STATE.tibia.activeChallenge = null;
            removeChallengeBannerUi();
            closeChallengeVictoryModal();

            if (prev && prev.autoCatchWasEnabled) {
                STATE.autoCatchEnabled = true;
            }

            if (prev && prev.isCentralHub) {
                enterCentralHubMap(true, null, true);
            } else {
                STATE.tibia.isCentralHub = false;
                buildRespawnMapAndMonsters();
            }
            renderBattleArena(true);
            showToast("🗺️ Você retornou com segurança da Arena!");
        }
    });
}

function updateChallengeBannerUi(cfg) {
    let banner = document.getElementById("challenge-arena-banner");
    if (!banner) {
        banner = document.createElement("div");
        banner.id = "challenge-arena-banner";
        banner.className = "challenge-arena-banner";
        const parent = document.getElementById("tab-hunt") || document.body;
        parent.appendChild(banner);
    }
    const isGvg = cfg.chType === "gvg";
    const subText = isGvg ? `🏰 [${cfg.rivalGuild || "Rival"}] vs [${(typeof ENDGAME_STATE !== "undefined" && ENDGAME_STATE.gvg?.guildName) || "Nossa Guilda"}]` : cfg.sub;
    banner.innerHTML = `
        <div class="challenge-banner-info">
            <span class="challenge-banner-title">⚔️ ${cfg.title}</span>
            <span class="challenge-banner-sub">${subText}</span>
        </div>
        <button class="challenge-banner-exit-btn" onclick="leaveChallengeArena()">🚪 Sair da Arena</button>
    `;
    banner.style.display = "flex";
}

function removeChallengeBannerUi() {
    const banner = document.getElementById("challenge-arena-banner");
    if (banner) banner.remove();
}

function spawnChallengeEntities(cfg) {
    const tb = STATE.tibia;
    tb.monsters = [];
    tb.corpses = [];

    // Build dedicated open arena collision matrix (walls only on boundary)
    const matrix = [];
    for (let r = 0; r < GRID_ROWS; r++) {
        const row = [];
        for (let c = 0; c < GRID_COLS; c++) {
            if (r === 0 || r === GRID_ROWS - 1 || c === 0 || c === GRID_COLS - 1) {
                row.push(1); // Boundary walls
            } else {
                row.push(0); // Clean arena walking floor
            }
        }
        matrix.push(row);
    }
    tb.mapMatrix = matrix;
    tb.pzOrigin = null;

    // Spawn the Challenge Boss
    const sp = STATE.speciesById[cfg.bossSpecies] || STATE.species[0] || { id: cfg.bossSpecies, name: cfg.bossSpecies, elements: ["normal"] };
    const bossHp = cfg.curHp || cfg.bossHp || 50000;
    const maxHp = cfg.bossHp || 50000;

    const bossMon = {
        uid: "boss_" + Math.random().toString(36).substr(2, 6),
        species_id: sp.id,
        dex_id: sp.dex_id || 150,
        name: cfg.bossName || sp.name,
        elements: sp.elements || ["normal"],
        level: cfg.bossLevel || 80,
        hp: bossHp,
        max_hp: maxHp,
        is_shiny: cfg.chType === "worldboss" || Math.random() < 0.25,
        quality: cfg.chType === "worldboss" ? "Mítico" : "Lendário",
        gx: 8,
        gy: 5,
        px: 8 * SQM_SIZE,
        py: 5 * SQM_SIZE,
        dir: 1,
        stepTimer: 40,
        attackTimer: 0,
        targetId: "player",
    };

    tb.monsters.push(bossMon);
    tb.targetId = bossMon.uid;
    STATE.wildEnemy = bossMon;

    // Reset trainer position at arena entry (bottom-center)
    tb.trainer.gx = 8;
    tb.trainer.gy = 9;
    tb.trainer.targetGx = 8;
    tb.trainer.targetGy = 9;
    tb.trainer.px = 8 * SQM_SIZE;
    tb.trainer.py = 9 * SQM_SIZE;
    tb.trainer.dir = 0;

    // Position companion beside trainer
    if (tb.summon) {
        tb.summon.gx = 7;
        tb.summon.gy = 9;
        tb.summon.targetGx = 7;
        tb.summon.targetGy = 9;
        tb.summon.px = 7 * SQM_SIZE;
        tb.summon.py = 9 * SQM_SIZE;
        tb.summon.dir = 0;
    }
}

function handleChallengeVictory(ch, enemy) {
    STATE.tibia.monsters = STATE.tibia.monsters.filter((m) => m.uid !== enemy.uid);
    STATE.tibia.targetId = null;
    STATE.wildEnemy = null;

    spawnFloatingText(enemy.gx, enemy.gy, "🏆 VITÓRIA!", "#facc15");

    if (ch.chType === "gvg") {
        const territoryId = ch.territoryId || "silph";
        const t = (typeof ENDGAME_STATE !== "undefined" && ENDGAME_STATE.gvg?.territories.find(x => x.id === territoryId)) || null;
        if (t) {
            t.owner = ENDGAME_STATE.gvg.guildName;
            t.contested = false;
            t.points = (t.points || 1000) + 500;
        }
        if (typeof ENDGAME_STATE !== "undefined" && ENDGAME_STATE.gvg) {
            ENDGAME_STATE.gvg.honorPoints = (ENDGAME_STATE.gvg.honorPoints || 0) + 500;
        }
        const goldReward = 25000;
        const diaReward = 15;
        const expReward = 4500;
        STATE.player.gold = (STATE.player.gold || 0) + goldReward;
        STATE.player.diamonds = (STATE.player.diamonds || 0) + diaReward;
        STATE.player.exp += expReward;
        while (STATE.player.exp >= STATE.player.exp_next && STATE.player.level < 100) {
            STATE.player.exp -= STATE.player.exp_next;
            STATE.player.level += 1;
            STATE.player.exp_next = getTrainerNextExp(STATE.player.level);
        }

        // Grant EXP to party
        for (let i = 0; i < STATE.player.party.length; i++) {
            const mon = STATE.player.party[i];
            mon.exp += expReward;
            while (mon.exp >= mon.exp_next && mon.level < 100) {
                mon.exp -= mon.exp_next;
                levelUpPokemon(mon, 1);
            }
        }

        addCombatLog(`<span style="color:#fbbf24;font-weight:900;">🏆 GUERRA DE GUILDAS VENCIDA! O território ${t ? t.name : ch.title} foi conquistado para sua guilda! (+$25,000 Ouro, +15 Diamantes, +500 Honra)</span>`);
        showToast("🏆 VITÓRIA GV-G! Território conquistado para sua guilda!");
        scheduleStateSave(1000);

        showChallengeVictoryModal({
            icon: "🏰",
            title: "VITÓRIA NA GUERRA DE GUILDAS!",
            subtitle: `Sua guilda conquistou o território: ${t ? t.name : ch.territoryName || ch.title}!`,
            rewards: [
                { icon: "💰", label: `+$${goldReward.toLocaleString()} Ouro da Guilda` },
                { icon: "💎", label: `+${diaReward} Diamantes Raros` },
                { icon: "🛡️", label: `+500 Pontos de Honra de Guilda` },
                { icon: "⭐", label: `+${expReward.toLocaleString()} EXP p/ Time` },
            ]
        });
    } else if (ch.chType === "gyms") {
        const gymId = ch.gymId || "pewter";
        if (!STATE.player.badges) STATE.player.badges = [];
        if (!STATE.player.badges.includes(gymId)) {
            STATE.player.badges.push(gymId);
        }
        const goldReward = 18000;
        const diaReward = 10;
        const expReward = 3500;
        STATE.player.gold = (STATE.player.gold || 0) + goldReward;
        STATE.player.diamonds = (STATE.player.diamonds || 0) + diaReward;
        STATE.player.exp += expReward;
        while (STATE.player.exp >= STATE.player.exp_next && STATE.player.level < 100) {
            STATE.player.exp -= STATE.player.exp_next;
            STATE.player.level += 1;
            STATE.player.exp_next = getTrainerNextExp(STATE.player.level);
        }
        addCombatLog(`<span style="color:#fbbf24;font-weight:900;">🏆 GINÁSIO VENCIDO! Você derrotou ${ch.bossName} e conquistou a Insígnia Oficial!</span>`);
        showToast("🏆 Insígnia Conquistada! Parabéns!");
        scheduleStateSave(1000);

        showChallengeVictoryModal({
            icon: "🏅",
            title: "INSÍGNIA OFICIAL CONQUISTADA!",
            subtitle: `Você derrotou ${ch.bossName} no ${ch.title}!`,
            rewards: [
                { icon: "🏅", label: `Insígnia Oficial (${gymId.toUpperCase()})` },
                { icon: "💰", label: `+$${goldReward.toLocaleString()} Ouro` },
                { icon: "💎", label: `+${diaReward} Diamantes` },
                { icon: "⭐", label: `+${expReward.toLocaleString()} EXP` },
            ]
        });
    } else {
        const goldReward = 20000;
        const diaReward = 10;
        STATE.player.gold = (STATE.player.gold || 0) + goldReward;
        STATE.player.diamonds = (STATE.player.diamonds || 0) + diaReward;
        showToast("🏆 Desafio Concluído! Recompensas creditadas!");
        showChallengeVictoryModal({
            icon: "⚔️",
            title: "DESAFIO CONCLUÍDO COM SUCESSO!",
            subtitle: `Você superou ${ch.title}!`,
            rewards: [
                { icon: "💰", label: `+$${goldReward.toLocaleString()} Ouro` },
                { icon: "💎", label: `+${diaReward} Diamantes` },
            ]
        });
    }
}

function showChallengeVictoryModal(info) {
    let modal = document.getElementById("modal-challenge-victory");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "modal-challenge-victory";
        modal.className = "challenge-victory-overlay";
        document.body.appendChild(modal);
    }
    const rewardsHtml = (info.rewards || []).map(r => `
        <div class="challenge-reward-item">
            <span style="font-size:20px;">${r.icon}</span>
            <span>${r.label}</span>
        </div>
    `).join("");

    modal.innerHTML = `
        <div class="challenge-victory-box">
            <div class="challenge-victory-icon">${info.icon || "🏆"}</div>
            <h2 class="challenge-victory-title">${info.title}</h2>
            <p class="challenge-victory-sub">${info.subtitle}</p>
            <div class="challenge-victory-rewards-grid">
                ${rewardsHtml}
            </div>
            <button class="challenge-victory-close-btn" onclick="leaveChallengeArena()">✓ Retornar ao Mapa</button>
        </div>
    `;
    modal.style.display = "flex";
}

function closeChallengeVictoryModal() {
    const modal = document.getElementById("modal-challenge-victory");
    if (modal) modal.style.display = "none";
}

function drawChallengeArenaBackground(ctx, tb, ch) {
    const f = tb.frame;
    const W = GRID_COLS * SQM_SIZE;
    const H = GRID_ROWS * SQM_SIZE;

    // Base Floor Palettes per Challenge Type
    const palettes = {
        gvg: { f1: "#1e293b", f2: "#0f172a", border: "#f59e0b", trim: "#fbbf24" },
        pvp: { f1: "#0f172a", f2: "#020617", border: "#38bdf8", trim: "#fde047" },
        gyms: { f1: "#1e1b4b", f2: "#0f0e26", border: "#818cf8", trim: "#a5b4fc" },
        elite4: { f1: "#1e293b", f2: "#090d16", border: "#eab308", trim: "#fef08a" },
        safari: { f1: "#14532d", f2: "#052e16", border: "#22c55e", trim: "#86efac" },
        worldboss: { f1: "#450a0a", f2: "#1c0404", border: "#c084fc", trim: "#e879f9" },
        dungeons: { f1: "#18181b", f2: "#09090b", border: "#a855f7", trim: "#c084fc" },
    };

    const pal = palettes[ch.chType] || palettes.gvg;

    // Draw Floor Grid Tiles
    for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
            const x = c * SQM_SIZE;
            const y = r * SQM_SIZE;
            const isAlt = (r + c) % 2 === 0;

            // Border walls vs arena fighting floor
            const isBorder = r === 0 || r === GRID_ROWS - 1 || c === 0 || c === GRID_COLS - 1;
            if (isBorder) {
                ctx.fillStyle = pal.f2;
                ctx.fillRect(x, y, SQM_SIZE, SQM_SIZE);
                ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y, SQM_SIZE, SQM_SIZE);
            } else {
                ctx.fillStyle = isAlt ? pal.f1 : pal.f2;
                ctx.fillRect(x, y, SQM_SIZE, SQM_SIZE);

                // Subtle grid seams
                ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
                ctx.strokeRect(x, y, SQM_SIZE, SQM_SIZE);
            }
        }
    }

    // Specific Thematic Centerpieces
    if (ch.chType === "gvg") {
        const cx = (GRID_COLS / 2) * SQM_SIZE;
        const cy = (GRID_ROWS / 2) * SQM_SIZE;
        ctx.save();

        // 1. Grand Castle Coliseum Center Seal
        ctx.beginPath();
        ctx.arc(cx, cy, 120, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(245, 158, 11, 0.55)";
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 105, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(239, 68, 68, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([10, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // 2. Center Territory Obelisk / Relic Pedestal
        ctx.beginPath();
        ctx.arc(cx, cy, 32, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245, 158, 11, 0.15)";
        ctx.fill();
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Guild Crossed Swords Crest in center
        ctx.font = getGameCanvasFont("ui", 18, "900");
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#fbbf24";
        ctx.fillText("⚔️", cx, cy);

        // 3. Guild Banners along top and bottom battlements
        // Top Banner (Rival Guild)
        ctx.fillStyle = "rgba(220, 38, 38, 0.75)";
        ctx.fillRect(4 * SQM_SIZE, 0, 8 * SQM_SIZE, 20);
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(4 * SQM_SIZE, 0, 8 * SQM_SIZE, 20);
        ctx.font = getGameCanvasFont("ui", 9, "900");
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`🛡️ GUILDA RIVAL: ${ch.rivalGuild || "OPONENTE"}`, cx, 14);

        // Bottom Banner (Player's Guild)
        ctx.fillStyle = "rgba(37, 99, 235, 0.75)";
        ctx.fillRect(4 * SQM_SIZE, H - 20, 8 * SQM_SIZE, 20);
        ctx.strokeStyle = "#60a5fa";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(4 * SQM_SIZE, H - 20, 8 * SQM_SIZE, 20);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`⚔️ SUA GUILDA: ${(typeof ENDGAME_STATE !== "undefined" && ENDGAME_STATE.gvg?.guildName) || "POKÉMASTERS ELITE"}`, cx, H - 7);

        // 4. Corner Braziers with Animated Flames
        const braziers = [
            { x: 2 * SQM_SIZE, y: 2 * SQM_SIZE },
            { x: (GRID_COLS - 3) * SQM_SIZE, y: 2 * SQM_SIZE },
            { x: 2 * SQM_SIZE, y: (GRID_ROWS - 3) * SQM_SIZE },
            { x: (GRID_COLS - 3) * SQM_SIZE, y: (GRID_ROWS - 3) * SQM_SIZE }
        ];
        for (const b of braziers) {
            ctx.fillStyle = "#334155";
            ctx.fillRect(b.x + 8, b.y + 16, SQM_SIZE - 16, SQM_SIZE - 20);
            ctx.strokeStyle = "#94a3b8";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(b.x + 8, b.y + 16, SQM_SIZE - 16, SQM_SIZE - 20);

            // Animated flame glow
            const flamePulse = 0.8 + Math.sin(f * 0.15 + b.x) * 0.25;
            ctx.fillStyle = `rgba(249, 115, 22, ${0.75 * flamePulse})`;
            ctx.beginPath();
            ctx.arc(b.x + 24, b.y + 14, 10 * flamePulse, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#fef08a";
            ctx.beginPath();
            ctx.arc(b.x + 24, b.y + 14, 4 * flamePulse, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    } else if (ch.chType === "gyms") {
        // Official League Battlefield Markings (Dividing Line & Center Ring)
        const cx = (GRID_COLS / 2) * SQM_SIZE;
        const cy = (GRID_ROWS / 2) * SQM_SIZE;
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, 105, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(129, 140, 248, 0.4)";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(1 * SQM_SIZE, cy);
        ctx.lineTo((GRID_COLS - 1) * SQM_SIZE, cy);
        ctx.strokeStyle = "rgba(165, 180, 252, 0.35)";
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 8]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = "rgba(250, 204, 21, 0.55)";
        ctx.lineWidth = 2;
        ctx.strokeRect((GRID_COLS / 2 - 2) * SQM_SIZE, (GRID_ROWS - 3) * SQM_SIZE, 4 * SQM_SIZE, 1.8 * SQM_SIZE);
        ctx.strokeRect((GRID_COLS / 2 - 2) * SQM_SIZE, 1.2 * SQM_SIZE, 4 * SQM_SIZE, 1.8 * SQM_SIZE);

        ctx.beginPath();
        ctx.arc(cx, cy, 26, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(238, 242, 255, 0.12)";
        ctx.fill();
        ctx.strokeStyle = "#818cf8";
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();
    } else if (ch.chType === "pvp") {
        // Grand Center Pokéball Ring
        const cx = (GRID_COLS / 2) * SQM_SIZE;
        const cy = (GRID_ROWS / 2) * SQM_SIZE;
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, 90, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 28, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fill();
        ctx.strokeStyle = "#facc15";
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();
    } else if (ch.chType === "worldboss") {
        // Glowing Magma & Psionic Rift in Center
        const cx = (GRID_COLS / 2) * SQM_SIZE;
        const cy = (GRID_ROWS / 2) * SQM_SIZE;
        const pulse = 1.0 + Math.sin(f * 0.08) * 0.15;
        ctx.save();
        const radGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 140 * pulse);
        radGrad.addColorStop(0, "rgba(192, 132, 252, 0.35)");
        radGrad.addColorStop(0.6, "rgba(239, 68, 68, 0.2)");
        radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 140 * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    } else if (ch.chType === "elite4") {
        // Royal Red Velvet Center Carpet
        const carpetX = 6 * SQM_SIZE;
        const carpetW = 4 * SQM_SIZE;
        ctx.fillStyle = "rgba(185, 28, 28, 0.65)";
        ctx.fillRect(carpetX, 0, carpetW, H);
        ctx.strokeStyle = "#fde047";
        ctx.lineWidth = 2;
        ctx.strokeRect(carpetX, 0, carpetW, H);
    }
}

function drawChallengeAtmosphereFX(ctx, tb, ch) {
    const f = tb.frame;
    const W = GRID_COLS * SQM_SIZE;
    const H = GRID_ROWS * SQM_SIZE;

    ctx.save();
    // Glowing drifting motes & stadium lights
    const count = ch.chType === "worldboss" ? 28 : ch.chType === "gvg" ? 24 : 14;
    for (let i = 0; i < count; i++) {
        const mx = (Math.sin(f * 0.02 + i * 1.5) * 0.5 + 0.5) * W;
        const my = (Math.cos(f * 0.025 + i * 1.8) * 0.5 + 0.5) * H;
        const mAlpha = 0.25 + Math.sin(f * 0.05 + i) * 0.2;
        ctx.fillStyle = ch.chType === "worldboss"
            ? `rgba(244, 63, 94, ${mAlpha})`
            : ch.chType === "gvg"
            ? `rgba(250, 204, 21, ${mAlpha})`
            : `rgba(253, 224, 71, ${mAlpha})`;
        ctx.beginPath();
        ctx.arc(mx, my, ch.chType === "gvg" ? 2.5 : 2, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
}

function drawChallengeEntities(ctx, tb, ch) {
    // If a Gym Leader or Rival Trainer sprite is configured, draw them at the top pedestal (gx: 8, gy: 2)
    if (ch.leaderSprite) {
        const lx = 8 * SQM_SIZE;
        const ly = 2 * SQM_SIZE;
        const leaderImg = getCachedImage(ch.leaderSprite);
        if (leaderImg && leaderImg.complete && leaderImg.naturalWidth > 0) {
            ctx.drawImage(leaderImg, lx + 4, ly - 8, 40, 48);
        }
        // Nameplate for Leader
        ctx.font = getGameCanvasFont("ui", 9, "900");
        ctx.textAlign = "center";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        const nameText = ch.chType === "gvg"
            ? `Capitão ${ch.rivalGuild || "Rival"}`
            : (ch.bossName ? ch.bossName.split(" - ")[0] : "Líder de Ginásio");
        ctx.strokeText(nameText, lx + 24, ly - 10);
        ctx.fillStyle = ch.chType === "gvg" ? "#f87171" : "#fde047";
        ctx.fillText(nameText, lx + 24, ly - 10);
    }
}

window.enterChallengeArena = enterChallengeArena;
window.leaveChallengeArena = leaveChallengeArena;
window.handleChallengeVictory = handleChallengeVictory;
window.showChallengeVictoryModal = showChallengeVictoryModal;
window.closeChallengeVictoryModal = closeChallengeVictoryModal;


/* =========================================================================
   SISTEMA DE REDIMENSIONAMENTO E REORGANIZAÇÃO DE BOTÕES DA TOP BAR
   ========================================================================= */
const TOPBAR_BUTTONS_CONFIG = [
    { id: "menubtn-trainer", label: "Treinador", icon: "👤", defaultDock: "topbar-nav-dock" },
    { id: "menubtn-pokebar", label: "Time", icon: "🔴", defaultDock: "topbar-nav-dock" },
    { id: "menubtn-atlas", label: "Mapas", icon: "🗺️", defaultDock: "topbar-nav-dock" },
    { id: "menubtn-actionbar", label: "Ação", icon: "⚡", defaultDock: "topbar-nav-dock" },
    { id: "topbtn-autofarm", label: "Auto-Farm", icon: "⚡", defaultDock: "topbar-nav-dock" },
    { id: "tabbtn-mechanics", label: "Desafios", icon: "🏆", defaultDock: "topbar-modals-dock" },
    { id: "tabbtn-pokedex", label: "Dex", icon: "📖", defaultDock: "topbar-modals-dock" },
    { id: "tabbtn-party", label: "PC Box", icon: "💻", defaultDock: "topbar-modals-dock" },
    { id: "tabbtn-bag", label: "Mochila", icon: "🎒", defaultDock: "topbar-modals-dock" },
    { id: "tabbtn-shop", label: "Loja", icon: "🏪", defaultDock: "topbar-modals-dock" },
    { id: "tabbtn-cashshop", label: "Cash Shop", icon: "💎", defaultDock: "topbar-modals-dock" },
    { id: "tabbtn-market", label: "Mercado", icon: "⚖️", defaultDock: "topbar-modals-dock" },
    { id: "topbtn-updatelog", label: "Updates", icon: "📜", defaultDock: "topbar-modals-dock" },
    { id: "menubtn-playtest", label: "Playtest", icon: "🚀", defaultDock: "topbar-modals-dock" },
    { id: "menubtn-feedback", label: "Feedback", icon: "🐞", defaultDock: "topbar-modals-dock" },
    { id: "tabbtn-settings", label: "Opções", icon: "⚙️", defaultDock: "topbar-modals-dock" },
    { id: "tabbtn-admin", label: "Admin", icon: "👑", defaultDock: "topbar-modals-dock" },
    { id: "dock-btn-restart-wrap", label: "Reiniciar", icon: "🔄", defaultDock: "topbar-modals-dock" },
    { id: "btn-top-logout", label: "Sair", icon: "🚪", defaultDock: "topbar-modals-dock" }
];

function setTopbarButtonsScale(scale, notify = true) {
    scale = Math.max(0.7, Math.min(1.8, Math.round(scale * 10) / 10));
    document.documentElement.style.setProperty('--topbar-btn-scale', scale);
    const menubar = document.getElementById('top-menubar-hud');
    if (menubar) {
        menubar.style.setProperty('--topbar-btn-scale', scale);
    }
    const percentStr = `${Math.round(scale * 100)}%`;
    const editDisplay = document.getElementById('hud-btn-scale-display');
    if (editDisplay) editDisplay.textContent = percentStr;
    const settingsDisplay = document.getElementById('settings-btn-scale-display');
    if (settingsDisplay) settingsDisplay.textContent = percentStr;

    try {
        localStorage.setItem('pokeland_topbar_btn_scale', String(scale));
    } catch (e) {}

    if (STATE.player) {
        STATE.player.hud_profile = STATE.player.hud_profile || {};
        STATE.player.hud_profile.topbar_btn_scale = scale;
        scheduleStateSave(800);
    }

    if (notify && typeof showToast === 'function') {
        showToast(`🔍 Tamanho dos botões: ${percentStr}`);
    }
}
window.setTopbarButtonsScale = setTopbarButtonsScale;

function changeTopbarButtonsScale(delta) {
    let current = 1.0;
    try {
        current = parseFloat(localStorage.getItem('pokeland_topbar_btn_scale') || '1.0');
    } catch (e) {}
    if (STATE.player?.hud_profile?.topbar_btn_scale) {
        current = parseFloat(STATE.player.hud_profile.topbar_btn_scale);
    }
    setTopbarButtonsScale(current + delta, true);
}
window.changeTopbarButtonsScale = changeTopbarButtonsScale;

function getTopbarButtonsOrder() {
    let saved = null;
    if (STATE.player?.hud_profile?.topbar_order && Array.isArray(STATE.player.hud_profile.topbar_order)) {
        saved = STATE.player.hud_profile.topbar_order;
    } else {
        try {
            const raw = localStorage.getItem('pokeland_topbar_btn_order');
            if (raw) saved = JSON.parse(raw);
        } catch (e) {}
    }

    if (saved && Array.isArray(saved) && saved.length > 0) {
        // Map merged buttons (Perfil + Status -> Treinador) & remove obsolete buttons (Central, HUD, Cinema)
        saved = saved.map(id => {
            if (id === 'menubtn-playerhud' || id === 'tabbtn-status') return 'menubtn-trainer';
            return id;
        }).filter(id => id !== 'menubtn-central' && id !== 'btn-toggle-hud-edit' && id !== 'btn-cinema-hud' && id !== 'btn-reset-hud-quick');
        saved = Array.from(new Set(saved));
    } else {
        saved = TOPBAR_BUTTONS_CONFIG.map(b => b.id);
    }

    const full = [...saved];
    TOPBAR_BUTTONS_CONFIG.forEach(b => {
        if (!full.includes(b.id)) full.push(b.id);
    });
    return full;
}

function toggleTrainerProfile() {
    toggleFloatingMenu('float-panel-player', 'menubtn-trainer');
}
window.toggleTrainerProfile = toggleTrainerProfile;

function applyTopbarButtonsLayout() {
    const order = getTopbarButtonsOrder();
    let detached = {};
    let hidden = [];
    let scale = 1.0;

    if (STATE.player?.hud_profile) {
        detached = STATE.player.hud_profile.detached_buttons || {};
        hidden = STATE.player.hud_profile.hidden_buttons || [];
        scale = STATE.player.hud_profile.topbar_btn_scale || 1.0;
    } else {
        try {
            const rawDetached = localStorage.getItem('pokeland_detached_buttons');
            if (rawDetached) detached = JSON.parse(rawDetached);
            const rawHidden = localStorage.getItem('pokeland_hidden_buttons');
            if (rawHidden) hidden = JSON.parse(rawHidden);
            const rawScale = localStorage.getItem('pokeland_topbar_btn_scale');
            if (rawScale) scale = parseFloat(rawScale);
        } catch (e) {}
    }

    setTopbarButtonsScale(scale, false);

    const navDock = document.getElementById('topbar-nav-dock');
    const modalsDock = document.getElementById('topbar-modals-dock');

    order.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        // Visibility
        if (hidden.includes(id)) {
            el.style.display = 'none';
            return;
        } else {
            if (el.style.display === 'none') el.style.display = '';
        }

        // Detached Floating
        if (detached[id]) {
            el.classList.add('is-detached-btn');
            el.style.position = 'fixed';
            el.style.left = detached[id].left;
            el.style.top = detached[id].top;
            el.style.zIndex = '545';
            if (!el.querySelector('.dock-back-pip')) {
                const pip = document.createElement('span');
                pip.className = 'dock-back-pip';
                pip.innerHTML = '⚓';
                pip.title = 'Encaixar de volta na barra superior';
                pip.onclick = (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    dockTopbarButton(id);
                };
                el.appendChild(pip);
            }
            if (el.parentNode !== document.body) {
                document.body.appendChild(el);
            }
        } else {
            // In Topbar
            el.classList.remove('is-detached-btn');
            if (id !== 'dock-btn-restart-wrap') {
                el.style.position = '';
                el.style.left = '';
                el.style.top = '';
            }
            el.style.zIndex = '';
            const pip = el.querySelector('.dock-back-pip');
            if (pip) pip.remove();

            const conf = TOPBAR_BUTTONS_CONFIG.find(b => b.id === id);
            const targetDock = (conf && conf.defaultDock === 'topbar-nav-dock') ? navDock : modalsDock;
            if (targetDock && el.parentNode !== targetDock) {
                targetDock.appendChild(el);
            }
        }
    });

    // Reorder inside docks according to sequence in order
    if (navDock) {
        order.forEach(id => {
            const el = document.getElementById(id);
            if (el && el.parentNode === navDock) navDock.appendChild(el);
        });
    }
    if (modalsDock) {
        order.forEach(id => {
            const el = document.getElementById(id);
            if (el && el.parentNode === modalsDock) modalsDock.appendChild(el);
        });
    }

    initTopbarDragAndDrop();
}
window.applyTopbarButtonsLayout = applyTopbarButtonsLayout;

function moveTopbarButton(btnId, delta) {
    const order = getTopbarButtonsOrder();
    const idx = order.indexOf(btnId);
    if (idx === -1) return;
    const targetIdx = idx + delta;
    if (targetIdx < 0 || targetIdx >= order.length) return;

    const temp = order[idx];
    order[idx] = order[targetIdx];
    order[targetIdx] = temp;

    saveTopbarButtonsState(order);
    applyTopbarButtonsLayout();
    renderTopbarOrganizer();
}
window.moveTopbarButton = moveTopbarButton;

function toggleTopbarButtonVisibility(btnId) {
    let hidden = [];
    if (STATE.player?.hud_profile?.hidden_buttons) {
        hidden = [...STATE.player.hud_profile.hidden_buttons];
    } else {
        try {
            const raw = localStorage.getItem('pokeland_hidden_buttons');
            if (raw) hidden = JSON.parse(raw);
        } catch (e) {}
    }

    if (hidden.includes(btnId)) {
        hidden = hidden.filter(id => id !== btnId);
        showToast("👁️ Botão reexibido na interface!");
    } else {
        hidden.push(btnId);
        showToast("🙈 Botão ocultado da interface!");
    }

    try {
        localStorage.setItem('pokeland_hidden_buttons', JSON.stringify(hidden));
    } catch (e) {}

    if (STATE.player) {
        STATE.player.hud_profile = STATE.player.hud_profile || {};
        STATE.player.hud_profile.hidden_buttons = hidden;
        scheduleStateSave(600);
    }

    applyTopbarButtonsLayout();
    renderTopbarOrganizer();
}
window.toggleTopbarButtonVisibility = toggleTopbarButtonVisibility;

function detachTopbarButton(btnId, left, top) {
    let detached = {};
    if (STATE.player?.hud_profile?.detached_buttons) {
        detached = { ...STATE.player.hud_profile.detached_buttons };
    } else {
        try {
            const raw = localStorage.getItem('pokeland_detached_buttons');
            if (raw) detached = JSON.parse(raw);
        } catch (e) {}
    }

    detached[btnId] = {
        left: `${Math.round(left)}px`,
        top: `${Math.round(top)}px`
    };

    try {
        localStorage.setItem('pokeland_detached_buttons', JSON.stringify(detached));
    } catch (e) {}

    if (STATE.player) {
        STATE.player.hud_profile = STATE.player.hud_profile || {};
        STATE.player.hud_profile.detached_buttons = detached;
        scheduleStateSave(600);
    }

    applyTopbarButtonsLayout();
    renderTopbarOrganizer();
    showToast("🚀 Botão destacado para flutuar livremente na tela!");
}
window.detachTopbarButton = detachTopbarButton;

function dockTopbarButton(btnId) {
    let detached = {};
    if (STATE.player?.hud_profile?.detached_buttons) {
        detached = { ...STATE.player.hud_profile.detached_buttons };
    } else {
        try {
            const raw = localStorage.getItem('pokeland_detached_buttons');
            if (raw) detached = JSON.parse(raw);
        } catch (e) {}
    }

    delete detached[btnId];

    try {
        localStorage.setItem('pokeland_detached_buttons', JSON.stringify(detached));
    } catch (e) {}

    if (STATE.player) {
        STATE.player.hud_profile = STATE.player.hud_profile || {};
        STATE.player.hud_profile.detached_buttons = detached;
        scheduleStateSave(600);
    }

    applyTopbarButtonsLayout();
    renderTopbarOrganizer();
    showToast("⚓ Botão reencaixado na Barra Superior!");
}
window.dockTopbarButton = dockTopbarButton;

function saveTopbarButtonsState(order) {
    try {
        localStorage.setItem('pokeland_topbar_btn_order', JSON.stringify(order));
    } catch (e) {}

    if (STATE.player) {
        STATE.player.hud_profile = STATE.player.hud_profile || {};
        STATE.player.hud_profile.topbar_order = order;
        scheduleStateSave(600);
    }
}

function resetTopbarButtonsOrder() {
    const defaultOrder = TOPBAR_BUTTONS_CONFIG.map(b => b.id);
    try {
        localStorage.removeItem('pokeland_topbar_btn_order');
        localStorage.removeItem('pokeland_detached_buttons');
        localStorage.removeItem('pokeland_hidden_buttons');
        localStorage.setItem('pokeland_topbar_btn_scale', '1.0');
    } catch (e) {}

    if (STATE.player) {
        STATE.player.hud_profile = STATE.player.hud_profile || {};
        STATE.player.hud_profile.topbar_order = defaultOrder;
        STATE.player.hud_profile.detached_buttons = {};
        STATE.player.hud_profile.hidden_buttons = [];
        STATE.player.hud_profile.topbar_btn_scale = 1.0;
        scheduleStateSave(600);
    }

    applyTopbarButtonsLayout();
    renderTopbarOrganizer();
    showToast("🔄 Ordem e layout dos botões restaurados para o padrão de fábrica!");
}
window.resetTopbarButtonsOrder = resetTopbarButtonsOrder;

function openTopbarOrganizerModal() {
    const modal = document.getElementById('modal-topbar-organizer');
    if (modal) {
        modal.classList.remove('is-hidden');
        renderTopbarOrganizer();
    }
}
window.openTopbarOrganizerModal = openTopbarOrganizerModal;

function closeTopbarOrganizerModal() {
    const modal = document.getElementById('modal-topbar-organizer');
    if (modal) modal.classList.add('is-hidden');
}
window.closeTopbarOrganizerModal = closeTopbarOrganizerModal;

function renderTopbarOrganizer() {
    const container = document.getElementById('topbar-organizer-list');
    if (!container) return;

    const order = getTopbarButtonsOrder();
    const countEl = document.getElementById('topbar-organizer-count');
    if (countEl) countEl.textContent = String(order.length);

    let detached = {};
    let hidden = [];
    if (STATE.player?.hud_profile) {
        detached = STATE.player.hud_profile.detached_buttons || {};
        hidden = STATE.player.hud_profile.hidden_buttons || [];
    } else {
        try {
            const rawD = localStorage.getItem('pokeland_detached_buttons');
            if (rawD) detached = JSON.parse(rawD);
            const rawH = localStorage.getItem('pokeland_hidden_buttons');
            if (rawH) hidden = JSON.parse(rawH);
        } catch (e) {}
    }

    container.innerHTML = order.map((btnId, idx) => {
        const conf = TOPBAR_BUTTONS_CONFIG.find(b => b.id === btnId) || { id: btnId, label: btnId, icon: "🔘" };
        const isDetached = Boolean(detached[btnId]);
        const isHidden = hidden.includes(btnId);

        let statusBadge = '<span class="organizer-item-status-pill" style="background:rgba(56,189,248,0.2);color:#38bdf8;">Na Barra</span>';
        if (isHidden) {
            statusBadge = '<span class="organizer-item-status-pill" style="background:rgba(239,68,68,0.2);color:#fca5a5;">Oculto</span>';
        } else if (isDetached) {
            statusBadge = '<span class="organizer-item-status-pill" style="background:rgba(250,204,21,0.2);color:#fde047;">Flutuando na Tela</span>';
        }

        return `
        <div class="topbar-organizer-item ${isHidden ? 'is-hidden-btn' : ''} ${isDetached ? 'is-floating-item' : ''}" data-organizer-btn-id="${btnId}">
            <div class="organizer-item-left">
                <span class="organizer-item-grip" title="Posição #${idx + 1}">⠿</span>
                <span class="organizer-item-title">
                    <span>${conf.icon}</span>
                    <span>${conf.label}</span>
                </span>
                ${statusBadge}
            </div>
            <div class="organizer-item-actions">
                <button class="btn btn-secondary btn-sm" onclick="moveTopbarButton('${btnId}', -1)" title="Mover para a esquerda / cima" ${idx === 0 ? 'disabled style="opacity:0.4;"' : ''}>
                    ◀
                </button>
                <button class="btn btn-secondary btn-sm" onclick="moveTopbarButton('${btnId}', 1)" title="Mover para a direita / baixo" ${idx === order.length - 1 ? 'disabled style="opacity:0.4;"' : ''}>
                    ▶
                </button>
                <button class="btn btn-secondary btn-sm" onclick="toggleTopbarButtonVisibility('${btnId}')" title="${isHidden ? 'Exibir botão' : 'Ocultar botão'}">
                    ${isHidden ? '👁️ Exibir' : '🙈 Ocultar'}
                </button>
                ${isDetached ? `
                    <button class="btn btn-gold btn-sm" onclick="dockTopbarButton('${btnId}')" title="Encaixar de volta na barra">
                        ⚓ Encaixar
                    </button>
                ` : `
                    <button class="btn btn-secondary btn-sm" onclick="detachTopbarButton('${btnId}', ${100 + (idx % 5) * 60}, ${150 + Math.floor(idx / 5) * 45})" title="Destacar como botão flutuante livre">
                        🚀 Destacar
                    </button>
                `}
            </div>
        </div>`;
    }).join("");
}

function initTopbarDragAndDrop() {
    const isEditMode = Boolean(window._isHudEditingMode);
    const topbarButtons = document.querySelectorAll('.floating-top-menubar .nav-btn, .draggable-btn-wrap');

    topbarButtons.forEach(btn => {
        const btnId = btn.id || btn.closest('.draggable-btn-wrap')?.id;
        if (!btnId) return;

        if (isEditMode) {
            btn.setAttribute('draggable', 'true');
            btn.ondragstart = (e) => {
                e.dataTransfer.setData('text/plain', btnId);
                btn.classList.add('is-dragging-nav-btn');
                window._draggedNavBtnId = btnId;
            };
            btn.ondragend = (e) => {
                btn.classList.remove('is-dragging-nav-btn');
                document.querySelectorAll('.drop-target-before, .drop-target-after').forEach(el => {
                    el.classList.remove('drop-target-before', 'drop-target-after');
                });

                // If dropped outside topbar on the viewport canvas, detach into a floating button!
                const menubar = document.getElementById('top-menubar-hud');
                if (menubar) {
                    const mbRect = menubar.getBoundingClientRect();
                    const isOutside = e.clientY < mbRect.top || e.clientY > mbRect.bottom || e.clientX < mbRect.left || e.clientX > mbRect.right;
                    if (isOutside && e.clientY > 0 && e.clientX > 0) {
                        detachTopbarButton(btnId, Math.max(10, e.clientX - 40), Math.max(10, e.clientY - 15));
                    }
                }
            };
            btn.ondragover = (e) => {
                e.preventDefault();
                const targetBtn = e.target.closest('.nav-btn, .draggable-btn-wrap');
                if (!targetBtn || targetBtn === btn) return;
                const rect = targetBtn.getBoundingClientRect();
                const isBefore = (e.clientX - rect.left) < (rect.width / 2);
                targetBtn.classList.toggle('drop-target-before', isBefore);
                targetBtn.classList.toggle('drop-target-after', !isBefore);
            };
            btn.ondragleave = (e) => {
                const targetBtn = e.target.closest('.nav-btn, .draggable-btn-wrap');
                if (targetBtn) targetBtn.classList.remove('drop-target-before', 'drop-target-after');
            };
            btn.ondrop = (e) => {
                e.preventDefault();
                const draggedId = e.dataTransfer.getData('text/plain') || window._draggedNavBtnId;
                const targetBtn = e.target.closest('.nav-btn, .draggable-btn-wrap');
                if (!targetBtn || !draggedId) return;
                const targetId = targetBtn.id || targetBtn.closest('.draggable-btn-wrap')?.id;
                if (!targetId || targetId === draggedId) return;

                const order = getTopbarButtonsOrder();
                const fromIdx = order.indexOf(draggedId);
                const toIdx = order.indexOf(targetId);
                if (fromIdx !== -1 && toIdx !== -1) {
                    order.splice(fromIdx, 1);
                    const rect = targetBtn.getBoundingClientRect();
                    const isBefore = (e.clientX - rect.left) < (rect.width / 2);
                    const insertIdx = isBefore ? toIdx : toIdx + 1;
                    order.splice(insertIdx, 0, draggedId);

                    saveTopbarButtonsState(order);
                    applyTopbarButtonsLayout();
                    renderTopbarOrganizer();
                    showToast("📋 Ordem dos botões reorganizada!");
                }
            };
        } else {
            btn.removeAttribute('draggable');
            btn.ondragstart = null;
            btn.ondragend = null;
            btn.ondragover = null;
            btn.ondragleave = null;
            btn.ondrop = null;
        }
    });
}
window.initTopbarDragAndDrop = initTopbarDragAndDrop;


/* ==========================================================================
   POKÉMON RARITY UPGRADE SYSTEM
   ========================================================================== */

const RARITY_TIER_ORDER = ["Comum", "Incomum", "Raro", "Épico", "Lendário", "Mítico"];

const RARITY_UPGRADE_CONFIG = {
    "Comum": {
        next: "Incomum",
        reqSacrifices: 2,
        goldCost: 1500,
        multRange: [1.10, 1.22],
        ivMin: 10,
        guaranteed31: 0
    },
    "Incomum": {
        next: "Raro",
        reqSacrifices: 2,
        goldCost: 5000,
        multRange: [1.25, 1.38],
        ivMin: 18,
        guaranteed31: 1
    },
    "Raro": {
        next: "Épico",
        reqSacrifices: 3,
        goldCost: 20000,
        multRange: [1.40, 1.55],
        ivMin: 24,
        guaranteed31: 1
    },
    "Épico": {
        next: "Lendário",
        reqSacrifices: 3,
        goldCost: 75000,
        multRange: [1.60, 1.75],
        ivMin: 27,
        guaranteed31: 2
    },
    "epico": {
        next: "Lendário",
        reqSacrifices: 3,
        goldCost: 75000,
        multRange: [1.60, 1.75],
        ivMin: 27,
        guaranteed31: 2
    },
    "Lendário": {
        next: "Mítico",
        reqSacrifices: 4,
        goldCost: 250000,
        multRange: [1.75, 2.10],
        ivMin: 29,
        guaranteed31: 3
    },
    "lendario": {
        next: "Mítico",
        reqSacrifices: 4,
        goldCost: 250000,
        multRange: [1.75, 2.10],
        ivMin: 29,
        guaranteed31: 3
    }
};

let CURRENT_UPGRADE_TARGET_UID = null;
let SELECTED_SACRIFICE_UIDS = new Set();

function openRarityUpgradeModal(monUid = null) {
    const modal = document.getElementById("modal-rarity-upgrade");
    if (!modal) return;

    const allPlayerMons = [
        ...(STATE.player?.party || []),
        ...(STATE.player?.pc_box || [])
    ];
    if (allPlayerMons.length === 0) {
        showToast("⚠️ Você não possui Pokémon disponíveis para aprimorar.");
        return;
    }

    if (monUid && findPokemonByUid(monUid)) {
        CURRENT_UPGRADE_TARGET_UID = monUid;
    } else if (!CURRENT_UPGRADE_TARGET_UID || !findPokemonByUid(CURRENT_UPGRADE_TARGET_UID)) {
        const candidate = allPlayerMons.find(m => {
            const q = (m.quality || "Comum").toLowerCase();
            return q !== "mítico" && q !== "mitico";
        }) || allPlayerMons[0];
        CURRENT_UPGRADE_TARGET_UID = candidate ? candidate.uid : null;
    }

    SELECTED_SACRIFICE_UIDS.clear();
    modal.classList.remove("is-hidden");
    modal.style.display = "flex";
    renderRarityUpgradeUi();
}

function closeRarityUpgradeModal() {
    const modal = document.getElementById("modal-rarity-upgrade");
    if (modal) {
        modal.classList.add("is-hidden");
        modal.style.display = "none";
    }
    SELECTED_SACRIFICE_UIDS.clear();
}

function selectUpgradeTarget(uid) {
    CURRENT_UPGRADE_TARGET_UID = uid;
    SELECTED_SACRIFICE_UIDS.clear();
    renderRarityUpgradeUi();
}

function toggleUpgradeSacrifice(uid) {
    if (uid === CURRENT_UPGRADE_TARGET_UID) return;
    const targetMon = findPokemonByUid(CURRENT_UPGRADE_TARGET_UID);
    if (!targetMon) return;
    const curQual = targetMon.quality || "Comum";
    const cfg = RARITY_UPGRADE_CONFIG[curQual];
    if (!cfg) return;

    if (SELECTED_SACRIFICE_UIDS.has(uid)) {
        SELECTED_SACRIFICE_UIDS.delete(uid);
    } else {
        if (SELECTED_SACRIFICE_UIDS.size >= cfg.reqSacrifices) {
            showToast(`⚠️ Você já selecionou os ${cfg.reqSacrifices} Pokémon necessários.`);
            return;
        }
        SELECTED_SACRIFICE_UIDS.add(uid);
    }
    renderRarityUpgradeUi();
}

function autoSelectUpgradeSacrifices() {
    if (!CURRENT_UPGRADE_TARGET_UID) return;
    const targetMon = findPokemonByUid(CURRENT_UPGRADE_TARGET_UID);
    if (!targetMon) return;
    const curQual = targetMon.quality || "Comum";
    const cfg = RARITY_UPGRADE_CONFIG[curQual];
    if (!cfg) return;

    SELECTED_SACRIFICE_UIDS.clear();

    // Prioritize low-tier, non-shiny Pokémon in PC Box
    const candidates = (STATE.player.pc_box || [])
        .filter(m => m.uid !== CURRENT_UPGRADE_TARGET_UID && !m.is_shiny)
        .sort((a, b) => {
            const qA = RARITY_TIER_ORDER.indexOf(a.quality || "Comum");
            const qB = RARITY_TIER_ORDER.indexOf(b.quality || "Comum");
            return qA - qB || (a.level || 1) - (b.level || 1);
        });

    for (const c of candidates) {
        if (SELECTED_SACRIFICE_UIDS.size >= cfg.reqSacrifices) break;
        SELECTED_SACRIFICE_UIDS.add(c.uid);
    }

    if (SELECTED_SACRIFICE_UIDS.size < cfg.reqSacrifices) {
        const partyCandidates = (STATE.player.party || [])
            .slice(1)
            .filter(m => m.uid !== CURRENT_UPGRADE_TARGET_UID && !m.is_shiny);
        for (const c of partyCandidates) {
            if (SELECTED_SACRIFICE_UIDS.size >= cfg.reqSacrifices) break;
            SELECTED_SACRIFICE_UIDS.add(c.uid);
        }
    }

    renderRarityUpgradeUi();
    if (SELECTED_SACRIFICE_UIDS.size < cfg.reqSacrifices) {
        showToast(`⚠️ Pokémon excedentes insuficientes no Box (${SELECTED_SACRIFICE_UIDS.size}/${cfg.reqSacrifices}).`);
    } else {
        showToast(`✅ ${SELECTED_SACRIFICE_UIDS.size} Pokémon selecionados para o aprimoramento.`);
    }
}

function findPokemonByUid(uid) {
    if (!uid) return null;
    return (STATE.player.party || []).find(m => m.uid === uid) ||
           (STATE.player.pc_box || []).find(m => m.uid === uid) || null;
}

function recalculatePokemonStats(mon) {
    if (!mon) return;
    const sp = (STATE.speciesById && STATE.speciesById[mon.species_id]) ||
               (STATE.species && STATE.species.find(s => s.id === mon.species_id || s.dex_id === mon.dex_id)) ||
               { base_stats: { hp: 50, atk: 50, def: 50, spa: 50, spd: 50, spe: 50 } };
    const bs = sp.base_stats || { hp: 50, atk: 50, def: 50, spa: 50, spd: 50, spe: 50 };
    const level = mon.level || 1;
    const qMult = mon.quality_multiplier || 1.0;
    const ivs = mon.ivs || { hp: 15, atk: 15, def: 15, spa: 15, spd: 15, spe: 15 };

    const effMult = Math.pow(qMult, 1.15);
    const atkGender = (mon.gender === "male" || mon.gender === "M") ? 1.10 : 1.0;
    const hpGender = (mon.gender === "female" || mon.gender === "F") ? 1.10 : 1.0;

    const maxHp = Math.max(20, Math.floor((((2 * (bs.hp || 50) + (ivs.hp || 15)) * level) / 100 + level + 10) * effMult * hpGender));
    mon.max_hp = maxHp;
    if (mon.hp === undefined || mon.hp > maxHp) {
        mon.hp = maxHp;
    }

    mon.stats = {
        hp: maxHp,
        atk: Math.floor((((2 * (bs.atk || 50) + (ivs.atk || 15)) * level) / 100 + 5) * effMult * atkGender),
        def: Math.floor((((2 * (bs.def || 50) + (ivs.def || 15)) * level) / 100 + 5) * effMult),
        spa: Math.floor((((2 * (bs.spa || 50) + (ivs.spa || 15)) * level) / 100 + 5) * effMult * atkGender),
        spd: Math.floor((((2 * (bs.spd || 50) + (ivs.spd || 15)) * level) / 100 + 5) * effMult),
        spe: Math.floor((((2 * (bs.spe || 50) + (ivs.spe || 15)) * level) / 100 + 5) * effMult),
    };
    mon.iv_total = (ivs.hp || 0) + (ivs.atk || 0) + (ivs.def || 0) + (ivs.spa || 0) + (ivs.spd || 0) + (ivs.spe || 0);
}

function renderRarityUpgradeUi() {
    const previewBox = document.getElementById("ru-target-preview-box");
    const grid = document.getElementById("ru-sacrifices-grid");
    const countEl = document.getElementById("ru-sacrifices-count");
    const goldCostEl = document.getElementById("ru-gold-cost");
    const playerGoldEl = document.getElementById("ru-player-gold");
    const actionBtn = document.getElementById("ru-action-btn");
    if (!previewBox || !grid) return;

    const allPlayerMons = [
        ...(STATE.player?.party || []).map(m => ({ ...m, _loc: "Equipe" })),
        ...(STATE.player?.pc_box || []).map(m => ({ ...m, _loc: "Box" }))
    ];

    if (!CURRENT_UPGRADE_TARGET_UID && allPlayerMons.length > 0) {
        CURRENT_UPGRADE_TARGET_UID = allPlayerMons[0].uid;
    }

    const targetMon = findPokemonByUid(CURRENT_UPGRADE_TARGET_UID);
    const playerGold = STATE.player.gold || 0;
    if (playerGoldEl) playerGoldEl.textContent = `$${playerGold.toLocaleString()}`;

    const targetSelectOptions = allPlayerMons.map(m => {
        const isSel = m.uid === CURRENT_UPGRADE_TARGET_UID;
        const q = m.quality || "Comum";
        return `<option value="${m.uid}" ${isSel ? "selected" : ""}>[${m._loc}] ${m.name} Lv.${m.level} (${q}${m.is_shiny ? " ✨" : ""})</option>`;
    }).join("");

    const targetDropdownHtml = `
        <div style="margin-bottom:12px;background:#1e293b;padding:8px 10px;border-radius:8px;border:1px solid #334155;">
            <label style="font-size:11px;font-weight:800;color:#cbd5e1;display:block;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.5px;">
                🎯 Escolha o Pokémon a Aprimorar:
            </label>
            <select class="form-control" onchange="selectUpgradeTarget(this.value)" style="width:100%;background:#0f172a;border:1px solid #475569;color:#f8fafc;padding:7px 10px;border-radius:6px;font-size:12.5px;font-weight:700;cursor:pointer;">
                ${targetSelectOptions}
            </select>
        </div>
    `;

    if (!targetMon) {
        previewBox.innerHTML = `
            ${targetDropdownHtml}
            <div style="text-align:center;color:#94a3b8;padding:20px;">Nenhum Pokémon selecionado. Escolha um Pokémon no seletor acima.</div>
        `;
        grid.innerHTML = "";
        if (actionBtn) actionBtn.disabled = true;
        return;
    }

    const curQual = targetMon.quality || "Comum";
    const curQualClass = `quality-${curQual.toLowerCase()}`;
    const cfg = RARITY_UPGRADE_CONFIG[curQual];
    const isMax = !cfg || curQual === "Mítico" || curQual === "mitico";

    const pmdUrl = typeof getPmdPortraitUrl === "function" ? getPmdPortraitUrl(targetMon.species_id || targetMon.dex_id) : `/img/pmd/${targetMon.species_id}/Portrait.png`;
    const spriteFallback = typeof getStandardSpriteFallback === "function" ? getStandardSpriteFallback(targetMon.dex_id, targetMon.is_shiny) : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${targetMon.dex_id || 25}.png`;

    if (isMax) {
        previewBox.innerHTML = `
            ${targetDropdownHtml}
            <div class="ru-mon-display">
                <img src="${pmdUrl}" onerror="this.onerror=null;this.src='${spriteFallback}';" class="ru-mon-sprite">
                <div>
                    <div style="font-weight:900;font-size:15px;color:#f8fafc;">
                        ${targetMon.is_shiny ? '✨ ' : ''}${targetMon.name}
                        <span style="font-size:12px;color:#94a3b8;">Lv.${targetMon.level}</span>
                    </div>
                    <div style="margin-top:4px;">
                        <span class="spk-quality-badge quality-mítico">MÍTICO (MAX)</span>
                    </div>
                </div>
            </div>
            <div style="background:rgba(239,68,68,0.15);border:1px solid #ef4444;border-radius:8px;padding:12px;text-align:center;color:#fca5a5;font-weight:700;font-size:12px;">
                👑 Este Pokémon já atingiu a RARIDADE MÁXIMA (Mítico)! Não pode ser aprimorado além deste nível.
            </div>
        `;
        grid.innerHTML = `<div style="text-align:center;color:#64748b;padding:40px;grid-column:1/-1;">Raridade máxima atingida.</div>`;
        if (countEl) countEl.textContent = "0/0";
        if (goldCostEl) goldCostEl.textContent = "$0";
        if (actionBtn) {
            actionBtn.disabled = true;
            actionBtn.textContent = "👑 Raridade Máxima";
        }
        return;
    }

    const nextQual = cfg.next;
    const nextQualClass = `quality-${nextQual.toLowerCase()}`;
    const curMult = targetMon.quality_multiplier || 1.0;

    previewBox.innerHTML = `
        ${targetDropdownHtml}
        <div class="ru-mon-display">
            <img src="${pmdUrl}" onerror="this.onerror=null;this.src='${spriteFallback}';" class="ru-mon-sprite">
            <div>
                <div style="font-weight:900;font-size:15px;color:#f8fafc;">
                    ${targetMon.is_shiny ? '✨ ' : ''}${targetMon.name}
                    <span style="font-size:12px;color:#94a3b8;">Lv.${targetMon.level}</span>
                </div>
                <div style="margin-top:4px;display:flex;gap:6px;align-items:center;">
                    <span class="spk-quality-badge ${curQualClass}">${curQual}</span>
                    <span class="ru-comp-arrow">➔</span>
                    <span class="spk-quality-badge ${nextQualClass}" style="box-shadow:0 0 10px rgba(99,102,241,0.5);">${nextQual}</span>
                </div>
            </div>
        </div>

        <div class="ru-comparison-card">
            <div class="ru-comp-row">
                <span style="color:#94a3b8;">Qualidade:</span>
                <div>
                    <span style="color:#cbd5e1;">${curQual}</span>
                    <span class="ru-comp-arrow">➔</span>
                    <strong style="color:#facc15;">${nextQual}</strong>
                </div>
            </div>
            <div class="ru-comp-row">
                <span style="color:#94a3b8;">Multiplicador:</span>
                <div>
                    <span>${curMult.toFixed(2)}x</span>
                    <span class="ru-comp-arrow">➔</span>
                    <strong style="color:#4ade80;">${cfg.multRange[0].toFixed(2)}x ~ ${cfg.multRange[1].toFixed(2)}x</strong>
                </div>
            </div>
            <div class="ru-comp-row">
                <span style="color:#94a3b8;">Bônus de Atributos:</span>
                <div>
                    <span>+${Math.round((curMult - 1.0) * 100)}%</span>
                    <span class="ru-comp-arrow">➔</span>
                    <strong style="color:#4ade80;">+${Math.round((cfg.multRange[0] - 1.0) * 100)}% a +${Math.round((cfg.multRange[1] - 1.0) * 100)}%</strong>
                </div>
            </div>
            <div class="ru-comp-row">
                <span style="color:#94a3b8;">Mínimo de IVs:</span>
                <div>
                    <span>Genes atuais</span>
                    <span class="ru-comp-arrow">➔</span>
                    <strong style="color:#38bdf8;">Min. ${cfg.ivMin}/31 em tudo</strong>
                </div>
            </div>
            ${cfg.guaranteed31 > 0 ? `
            <div class="ru-comp-row">
                <span style="color:#94a3b8;">Garantia de IV 31:</span>
                <strong style="color:#fbbf24;">${cfg.guaranteed31}x Atributo(s) Perfeito(s)</strong>
            </div>
            ` : ''}
        </div>

        <div style="font-size:11px;color:#94a3b8;line-height:1.4;">
            💡 <em>O aprimoramento consome os Pokémon sacrificados e recalcula instantaneamente os stats com os novos multiplicadores e bônus de genes!</em>
        </div>
    `;

    // Render Sacrifices Grid
    const eligibleList = [];
    (STATE.player.pc_box || []).forEach(m => {
        if (m.uid !== CURRENT_UPGRADE_TARGET_UID) eligibleList.push({ mon: m, src: "box" });
    });
    (STATE.player.party || []).forEach((m, pIdx) => {
        if (m.uid !== CURRENT_UPGRADE_TARGET_UID && pIdx !== 0) eligibleList.push({ mon: m, src: "party" });
    });

    if (eligibleList.length === 0) {
        grid.innerHTML = `<div style="text-align:center;color:#64748b;padding:30px;grid-column:1/-1;">Nenhum Pokémon excedente no Box ou Equipe disponível para sacrifício. Capture mais Pokémon selvagens!</div>`;
    } else {
        grid.innerHTML = eligibleList.map(({ mon }) => {
            const isSel = SELECTED_SACRIFICE_UIDS.has(mon.uid);
            const mQual = mon.quality || "Comum";
            const mSprite = typeof getStandardSpriteFallback === "function" ? getStandardSpriteFallback(mon.dex_id, mon.is_shiny) : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mon.dex_id || 25}.png`;
            const mPmd = typeof getPmdPortraitUrl === "function" ? getPmdPortraitUrl(mon.species_id || mon.dex_id) : `/img/pmd/${mon.species_id}/Portrait.png`;
            return `
                <div class="ru-sacrifice-card ${isSel ? 'is-selected' : ''}" onclick="toggleUpgradeSacrifice('${mon.uid}')">
                    <img src="${mPmd}" onerror="this.onerror=null;this.src='${mSprite}';" class="ru-sacrifice-sprite">
                    <span class="ru-sacrifice-name">${mon.is_shiny ? '✨ ' : ''}${mon.name}</span>
                    <span class="ru-sacrifice-sub">Lv.${mon.level} • <span class="spk-quality-badge quality-${mQual.toLowerCase()}">${mQual}</span></span>
                </div>
            `;
        }).join("");
    }

    if (countEl) countEl.textContent = `${SELECTED_SACRIFICE_UIDS.size}/${cfg.reqSacrifices}`;
    if (goldCostEl) goldCostEl.textContent = `$${cfg.goldCost.toLocaleString()}`;

    const hasEnoughGold = playerGold >= cfg.goldCost;
    const hasEnoughSacrifices = SELECTED_SACRIFICE_UIDS.size >= cfg.reqSacrifices;

    if (actionBtn) {
        actionBtn.disabled = !hasEnoughGold || !hasEnoughSacrifices;
        if (!hasEnoughSacrifices) {
            actionBtn.textContent = `Selecione ${cfg.reqSacrifices - SELECTED_SACRIFICE_UIDS.size} mais Pokémon`;
        } else if (!hasEnoughGold) {
            actionBtn.textContent = `Ouro Insuficiente ($${playerGold.toLocaleString()} / $${cfg.goldCost.toLocaleString()})`;
        } else {
            actionBtn.textContent = `⭐ Aprimorar para ${nextQual} ($${cfg.goldCost.toLocaleString()})`;
        }
    }
}

function executePokemonRarityUpgrade() {
    if (!CURRENT_UPGRADE_TARGET_UID) return;
    const targetMon = findPokemonByUid(CURRENT_UPGRADE_TARGET_UID);
    if (!targetMon) return;

    const curQual = targetMon.quality || "Comum";
    const cfg = RARITY_UPGRADE_CONFIG[curQual];
    if (!cfg) {
        showToast("⚠️ Este Pokémon já está na raridade máxima!");
        return;
    }

    if (SELECTED_SACRIFICE_UIDS.size < cfg.reqSacrifices) {
        showToast(`⚠️ Você precisa selecionar ${cfg.reqSacrifices} Pokémon como sacrifício.`);
        return;
    }

    if ((STATE.player.gold || 0) < cfg.goldCost) {
        showToast(`⚠️ Ouro insuficiente! Custo: $${cfg.goldCost.toLocaleString()}`);
        return;
    }

    // 1. Deduct Gold
    STATE.player.gold -= cfg.goldCost;

    // 2. Consume Sacrifices from party and pc_box
    const sacSet = new Set(SELECTED_SACRIFICE_UIDS);
    STATE.player.party = (STATE.player.party || []).filter(m => !sacSet.has(m.uid));
    STATE.player.pc_box = (STATE.player.pc_box || []).filter(m => !sacSet.has(m.uid));

    // 3. Upgrade Target Quality
    const oldQual = targetMon.quality;
    const nextQual = cfg.next;
    targetMon.quality = nextQual;

    // Roll new quality multiplier in new tier band
    let baseQm = cfg.multRange[0] + Math.random() * (cfg.multRange[1] - cfg.multRange[0]);
    if (targetMon.is_shiny && nextQual !== "Mítico" && nextQual !== "mitico") {
        baseQm += 0.20;
    } else if (targetMon.is_shiny && (nextQual === "Mítico" || nextQual === "mitico")) {
        baseQm = 2.20 + Math.random() * 0.40;
    }
    targetMon.quality_multiplier = +baseQm.toFixed(2);

    // Bump IVs below minimum of new tier
    targetMon.ivs = targetMon.ivs || { hp: 15, atk: 15, def: 15, spa: 15, spd: 15, spe: 15 };
    const statKeys = ["hp", "atk", "def", "spa", "spd", "spe"];
    for (const k of statKeys) {
        if ((targetMon.ivs[k] || 0) < cfg.ivMin) {
            targetMon.ivs[k] = cfg.ivMin;
        }
    }

    // Ensure guaranteed 31s
    if (cfg.guaranteed31 > 0) {
        const count31 = statKeys.filter(k => targetMon.ivs[k] >= 31).length;
        if (count31 < cfg.guaranteed31) {
            const need = cfg.guaranteed31 - count31;
            const non31Keys = statKeys.filter(k => targetMon.ivs[k] < 31).sort(() => Math.random() - 0.5);
            for (let i = 0; i < Math.min(need, non31Keys.length); i++) {
                targetMon.ivs[non31Keys[i]] = 31;
            }
        }
    }

    // Recalculate stats and CP
    recalculatePokemonStats(targetMon);

    // Clear selections
    SELECTED_SACRIFICE_UIDS.clear();

    // Feedback
    showToast(`🎉 SUCESSO! ${targetMon.name} ascendeu para a raridade ${nextQual.toUpperCase()} (${targetMon.quality_multiplier}x)!`);
    addCombatLog(`<span style="color:#a855f7;font-weight:900;">⭐ [APRIMORAMENTO] ${targetMon.name} foi aprimorado de ${oldQual} para ${nextQual.toUpperCase()} (+${Math.round((targetMon.quality_multiplier - 1.0) * 100)}% Atributos)!</span>`);

    scheduleStateSave(1000);
    renderAll();
    renderPartyAndBox();
    renderRarityUpgradeUi();
}


// Global ESC handler for Rarity Upgrade modal
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const ruModal = document.getElementById("modal-rarity-upgrade");
        if (ruModal && !ruModal.classList.contains("is-hidden")) {
            closeRarityUpgradeModal();
        }
    }
});
