
let SELECTION_SET_FOR_SELL = new Set();
let SHOP_SELL_FILTERS = {
    source: "all",
    type: "all",
    quality: "all",
    shiny: "all",
    search: "",
    sort: "gold_desc"
};

function calculatePokemonGoldValue(mon) {
    if (!mon) return 0;
    const lv = mon.level || 1;
    // Option A: Rebalanced sustainable gold economy
    const base = 25 + lv * 12;

    const q = (mon.quality || "Comum").toLowerCase();
    let qMult = 1.0;
    if (q === "incomum") qMult = 1.5;
    else if (q === "raro") qMult = 2.5;
    else if (q === "épico" || q === "epico") qMult = 4.5;
    else if (q === "lendário" || q === "lendario") qMult = 10.0;
    else if (q === "mítico" || q === "mitico") qMult = 20.0;

    const ivTotal = mon.iv_total || Object.values(mon.ivs || {}).reduce((a, b) => a + (typeof b === "number" ? b : 0), 0);
    const ivFactor = 1.0 + (ivTotal / 186.0);

    let total = Math.floor(base * qMult * ivFactor);

    if (mon.is_shiny) {
        total = Math.floor(total * 3.0);
    }

    return Math.max(15, total);
}
window.calculatePokemonGoldValue = calculatePokemonGoldValue;

// =========================================================
// POKÉLAND: BAG, LOJA (GOLD), CASH SHOP & GLOBAL MARKET
// =========================================================

let CURRENT_BAG_SUB = "all";
let CURRENT_SHOP_SUB = "all";
let CURRENT_CASH_SUB = "all";
let CURRENT_MARKET_SUB = "browse";
let MARKET_SEARCH_DEBOUNCE_TIMER = null;

// =========================================================
// 1. BAG / MOCHILA INDEPENDENTE
// =========================================================

function switchBagSubmenu(subTab) {
    CURRENT_BAG_SUB = subTab;
    document.querySelectorAll(".bag-submenu-pill").forEach(pill => {
        pill.classList.toggle("active", pill.dataset.bagSub === subTab);
    });
    renderBagModal();
}

function filterBagItems() {
    renderBagModal();
}

function renderBagModal() {
    if (!STATE.player) return;
    const inv = STATE.player.inventory || {};
    const searchVal = (document.getElementById("bag-search-input")?.value || "").toLowerCase().trim();

    // Collect all Pokemons (Party + PC Box) as capsule items in Bag
    const partyMons = (STATE.player.party || []).map((m, idx) => ({ ...m, isParty: true, partyIdx: idx }));
    const boxMons = (STATE.player.pc_box || []).map((m, idx) => ({ ...m, isParty: false, boxIdx: idx }));
    const allMons = [...partyMons, ...boxMons];

    // Update Header Badges
    const totalItemSlots = Object.values(inv).filter(q => q > 0).length;
    const capLbl = document.getElementById("bag-capacity-label");
    if (capLbl) capLbl.textContent = `📦 Itens: ${totalItemSlots}/400 • 👾 Pokémon: ${allMons.length} cápsulas`;

    const goldLbl = document.getElementById("bag-gold-label");
    if (goldLbl) goldLbl.textContent = `$${(STATE.player.gold || 0).toLocaleString()}`;

    const diaLbl = document.getElementById("bag-diamond-label");
    if (diaLbl) diaLbl.textContent = `💎 ${(STATE.player.diamonds || 0).toLocaleString()}`;

    const container = document.getElementById("bag-items-grid-container");
    if (!container) return;

    // Filter Items
    let validEntries = [];
    if (CURRENT_BAG_SUB !== "pokemon") {
        validEntries = Object.entries(inv).filter(([id, qty]) => {
            if (!qty || qty <= 0) return false;
            const item = STATE.itemsMap[id] || { name: id, type: "material" };
            const name = (item.name || id).toLowerCase();

            if (searchVal && !name.includes(searchVal)) return false;

            if (CURRENT_BAG_SUB === "balls") {
                return id.startsWith("capsule_") || id.includes("ball") || item.type === "capsule";
            } else if (CURRENT_BAG_SUB === "potions") {
                return id.includes("potion") || id.includes("revive") || id.includes("candy") || item.type === "consumable";
            } else if (CURRENT_BAG_SUB === "stones") {
                return id.startsWith("stone_") || id.includes("stone") || item.type === "evolution";
            } else if (CURRENT_BAG_SUB === "valuable") {
                return !id.startsWith("capsule_") && !id.startsWith("stone_") && !id.includes("potion");
            }
            return true;
        });
    }

    // Filter Pokemons as Items in Bag
    let validMons = [];
    if (CURRENT_BAG_SUB === "all" || CURRENT_BAG_SUB === "pokemon") {
        validMons = allMons.filter(m => {
            if (!searchVal) return true;
            const name = (m.name || "").toLowerCase();
            const qual = (m.quality || "").toLowerCase();
            const nat = (m.nature || "").toLowerCase();
            const elems = (m.elements || []).join(" ").toLowerCase();
            return name.includes(searchVal) || qual.includes(searchVal) || nat.includes(searchVal) || elems.includes(searchVal);
        });
    }

    if (validEntries.length === 0 && validMons.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: #94a3b8;">
                <span style="font-size: 36px; display: block; margin-bottom: 8px;">🎒</span>
                Nenhum item ou Pokémon encontrado nesta visualização da mochila.
            </div>
        `;
        return;
    }

    // Render Items HTML
    const itemsHtml = validEntries.map(([itemId, qty]) => {
        const item = STATE.itemsMap[itemId] || { name: itemId, type: "material", sell_price: 10, description: "Item coletado em PokéLand." };
        const sprite = getItemSpriteUrl(itemId, item);
        const sellPrice = item.sell_price || Math.max(5, Math.floor((item.price || 20) / 2));
        const isConsumable = itemId.includes("potion") || itemId.includes("revive") || itemId.includes("candy") || itemId.startsWith("stone_");

        return `
            <div class="bag-item-card">
                <div class="bag-item-header">
                    <div class="bag-item-icon-box">
                        <img src="${sprite}" alt="${item.name}" style="max-width:28px;max-height:28px;image-rendering:pixelated;" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png';">
                    </div>
                    <div class="bag-item-title-box">
                        <div class="bag-item-name" title="${item.name}">${item.name}</div>
                        <div class="bag-item-qty">x${qty.toLocaleString()}</div>
                    </div>
                </div>
                <div class="bag-item-desc" title="${item.description || ''}">${item.description || 'Suprimento do Treinador.'}</div>
                <div class="bag-item-actions">
                    ${isConsumable ? `<button class="btn btn-green" onclick="useBagItem('${itemId}')" title="Usar item no Pokémon ativo">🧪 Usar</button>` : ''}
                    <button class="btn btn-amber" onclick="sellItemToNpc('${itemId}', 1)" title="Vender 1x ao NPC por $${sellPrice}">💰 Vender ($${sellPrice})</button>
                    <button class="btn btn-blue" onclick="openMarketSellFromBag('${itemId}')" title="Criar anúncio deste item no Mercado Global">⚖️ Anunciar</button>
                </div>
            </div>
        `;
    }).join("");

    // Render Pokemons as Capsule Items HTML
    const monsHtml = validMons.map(mon => {
        const pmdUrl = `/img/pmd/${mon.species_id}/Portrait.png`;
        const ivTotal = mon.iv_total || Object.values(mon.ivs || {}).reduce((a, b) => a + b, 0);
        const hpPct = Math.min(100, Math.max(0, Math.floor(((mon.hp || 1) / (mon.max_hp || 1)) * 100)));
        const stats = mon.stats || { hp: mon.max_hp, atk: 120, def: 110, spa: 100, spd: 100, spe: 115 };
        const bst = Object.values(stats).reduce((a, b) => a + (typeof b === "number" ? b : 0), 0);

        return `
            <div class="bag-item-card bag-pokemon-card ${mon.isParty ? 'is-party-mon' : ''}">
                <div class="bag-item-header">
                    <div class="bag-item-icon-box" style="position:relative;background:radial-gradient(circle,rgba(56,189,248,0.25) 0%,rgba(15,23,42,0.9) 70%);border:1.5px solid ${mon.isParty ? '#eab308' : '#38bdf8'};">
                        <img src="${pmdUrl}" alt="${mon.name}" style="max-width:32px;max-height:32px;image-rendering:pixelated;" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mon.dex_id || 25}.png';">
                        ${mon.is_shiny ? '<span style="position:absolute;top:-4px;right:-4px;font-size:12px;filter:drop-shadow(0 0 3px #facc15);">✨</span>' : ''}
                    </div>
                    <div class="bag-item-title-box">
                        <div class="bag-item-name" style="color:#f8fafc;font-weight:800;display:flex;align-items:center;gap:5px;">
                            <span>${mon.name}</span>
                            <span style="font-family:var(--font-mono);color:#fde047;font-size:11px;">Lv.${mon.level}</span>
                        </div>
                        <div class="bag-item-qty" style="color:${mon.isParty ? '#fde047' : '#94a3b8'};font-weight:700;">${mon.isParty ? '⚡ No Time' : '📦 No PC Box'}</div>
                    </div>
                </div>

                <div style="display:flex;justify-content:space-between;align-items:center;margin:3px 0;">
                    <span class="spk-quality-badge quality-${(mon.quality || 'comum').toLowerCase()}">${mon.quality || 'Comum'}</span>
                    <span style="font-size:10px;color:#94a3b8;font-family:var(--font-mono);">IV: ${ivTotal}/186 • BST: ${bst}</span>
                </div>

                <div class="bag-item-desc" style="font-size:10.5px;color:#cbd5e1;line-height:1.3;">
                    ${(mon.elements || ['normal']).map(t => t.toUpperCase()).join('/')} • HP: ${mon.hp}/${mon.max_hp} (${hpPct}%) • ${mon.nature || 'Adamant'}
                </div>

                <div class="bag-item-actions">
                    ${mon.isParty ? `<button class="btn btn-green" onclick="healPartyMember('${mon.uid}')" title="Curar HP deste Pokémon">💖 Curar</button>` : `<button class="btn btn-blue" onclick="movePokemonToPartyFromBag('${mon.uid}')" title="Colocar na equipe de batalha">➕ Ao Time</button>`}
                    ${mon.isParty ? `<button class="btn btn-gold" onclick="makePartyLeader('${mon.uid}')" title="Tornar Líder">👑 Líder</button>` : `<button class="btn btn-blue" onclick="openTrainerStatusModal('team')" title="Ver Status">📊 Detalhes</button>`}
                    <button class="btn btn-gold" onclick="sellSinglePokemonToShop('${mon.uid}')" title="Vender diretamente para a Loja por Ouro">💰 Vender ($${calculatePokemonGoldValue(mon).toLocaleString()})</button>
                    <button class="btn btn-blue" onclick="openMarketSellPokemonFromBag('${mon.uid}')" title="Anunciar este Pokémon no Mercado Global">⚖️ Anunciar</button>
                </div>
            </div>
        `;
    }).join("");

    container.innerHTML = itemsHtml + monsHtml;
}

function movePokemonToPartyFromBag(uid) {
    if (!STATE.player) return;
    if (STATE.player.party.length >= 6) {
        showToast("⚠️ Sua equipe já está cheia (máximo de 6 Pokémon)!");
        return;
    }
    const idx = (STATE.player.pc_box || []).findIndex(p => p.uid === uid);
    if (idx === -1) return;

    const [mon] = STATE.player.pc_box.splice(idx, 1);
    STATE.player.party.push(mon);
    showToast(`👾 ${mon.name} foi adicionado à sua equipe ativa!`);
    scheduleStateSave(1000);
    renderAll();
    renderBagModal();
}

function openMarketSellPokemonFromBag(uid) {
    switchTab("market");
    if (typeof switchMarketSubmenu === "function") {
        switchMarketSubmenu("sell");
    }
    setTimeout(() => {
        const typeSelect = document.getElementById("market-sell-type");
        if (typeSelect) {
            typeSelect.value = "pokemon";
            if (typeof updateMarketSellOptions === "function") updateMarketSellOptions();
        }
        const monSelect = document.getElementById("market-sell-item-select");
        if (monSelect) monSelect.value = uid;
    }, 150);
}

function getItemSpriteUrl(itemId, item) {
    if (item && item.sprite_url) return item.sprite_url;
    if (itemId.startsWith("capsule_") || itemId.includes("ball")) {
        const ballName = itemId.replace("capsule_", "").replace("ball_", "").replace("_", "-");
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${ballName}-ball.png`;
    }
    if (itemId.startsWith("stone_")) {
        const stoneName = itemId.replace("stone_", "");
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${stoneName}-stone.png`;
    }
    if (itemId.includes("potion")) return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png";
    if (itemId.includes("revive")) return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/revive.png";
    if (itemId.includes("candy")) return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png";
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
}

function useBagItem(itemId) {
    if (!STATE.player || !STATE.player.inventory[itemId] || STATE.player.inventory[itemId] <= 0) return;
    const lead = getLeadPokemon();
    if (!lead) {
        showToast("⚠️ Nenhum Pokémon ativo na equipe para usar este item.");
        return;
    }

    if (itemId.includes("potion") || itemId.includes("curas")) {
        let healAmt = 200;
        if (itemId.includes("super")) healAmt = 500;
        else if (itemId.includes("hyper")) healAmt = 1200;
        else if (itemId.includes("max")) healAmt = lead.max_hp;

        if (lead.hp >= lead.max_hp) {
            showToast(`❤️ ${lead.name} já está com HP máximo!`);
            return;
        }
        lead.hp = Math.min(lead.max_hp, lead.hp + healAmt);
        STATE.player.inventory[itemId]--;
        showToast(`✨ ${lead.name} recuperou +${healAmt} HP!`);
        scheduleStateSave(1000);
        renderAll();
    } else if (itemId.includes("revive")) {
        if (lead.hp > 0) {
            showToast(`⚠️ ${lead.name} não está derrotado!`);
            return;
        }
        lead.hp = Math.floor(lead.max_hp * (itemId.includes("max") ? 1.0 : 0.5));
        STATE.player.inventory[itemId]--;
        showToast(`💖 ${lead.name} foi revivido e voltou ao combate!`);
        scheduleStateSave(1000);
        renderAll();
    } else if (itemId.includes("candy")) {
        lead.level = (lead.level || 1) + 1;
        lead.max_hp = Math.floor(lead.max_hp * 1.04) + 10;
        lead.hp = lead.max_hp;
        STATE.player.inventory[itemId]--;
        showToast(`🎉 ${lead.name} subiu para o Nível ${lead.level}!`);
        scheduleStateSave(1000);
        renderAll();
    } else if (itemId.startsWith("stone_")) {
        showToast(`💎 Use a Pedra de Evolução diretamente na aba PC Box ou Pokédex para evoluir.`);
    } else {
        showToast("ℹ️ Este item é usado em cenários ou missões específicas.");
    }
}

function sellItemToNpc(itemId, qty = 1) {
    const inv = STATE.player.inventory || {};
    if (!inv[itemId] || inv[itemId] < qty) return;
    const item = STATE.itemsMap[itemId] || { name: itemId, price: 20 };
    const unitSell = item.sell_price || Math.max(5, Math.floor((item.price || 20) / 2));
    const totalEarned = unitSell * qty;

    inv[itemId] -= qty;
    if (inv[itemId] <= 0) delete inv[itemId];
    STATE.player.gold = (STATE.player.gold || 0) + totalEarned;

    showToast(`💰 Vendeu ${qty}x ${item.name} ao NPC por $${totalEarned.toLocaleString()}!`);
    scheduleStateSave(1200);
    renderAll();
}

function openMarketSellFromBag(itemId) {
    switchTab("market");
    switchMarketSubmenu("sell");
    toggleMarketSellType("item");
    const sel = document.getElementById("market-sell-item-select");
    if (sel && itemId) {
        sel.value = itemId;
        updateMarketSellItemPreview();
    }
}

// =========================================================
// 2. LOJA DE ITENS EM OURO (POKÉMART - GOLD ONLY)
// =========================================================

const GOLD_SHOP_CATALOG = [
    // Pokébolas
    { id: "capsule_basic", name: "Pokéball", category: "balls", price: 200, icon: "poke-ball", desc: "Pokébola padrão para capturar criaturas selvagens." },
    { id: "capsule_great", name: "Great Ball", category: "balls", price: 600, icon: "great-ball", desc: "Taxa de captura 1.5x superior à Pokébola normal." },
    { id: "capsule_super", name: "Super Ball", category: "balls", price: 1200, icon: "ultra-ball", desc: "Taxa de captura 2.0x com melhor pegada." },
    { id: "capsule_ultra", name: "Ultra Ball", category: "balls", price: 2500, icon: "ultra-ball", desc: "Taxa de captura 3.0x de alto rendimento." },
    { id: "capsule_heavy", name: "Heavy Ball", category: "balls", price: 3000, icon: "heavy-ball", desc: "Especialmente calibrada para monstros pesados." },
    { id: "capsule_fast", name: "Fast Ball", category: "balls", price: 3000, icon: "fast-ball", desc: "Taxa excelente em Pokémon ágeis e fugitivos." },
    { id: "capsule_net", name: "Net Ball", category: "balls", price: 3500, icon: "net-ball", desc: "Eficácia 3.5x contra criaturas de Água e Inseto." },
    { id: "capsule_dusk", name: "Dusk Ball", category: "balls", price: 3500, icon: "dusk-ball", desc: "Taxa 3.5x ampliada em cavernas e rotas noturnas." },

    // Poções e Curas
    { id: "item_potion", name: "Potion", category: "potions", price: 300, icon: "potion", desc: "Restaura 200 pontos de vida (HP) do Pokémon." },
    { id: "item_super_potion", name: "Super Potion", category: "potions", price: 700, icon: "super-potion", desc: "Restaura 500 pontos de vida (HP) imediatamente." },
    { id: "item_hyper_potion", name: "Hyper Potion", category: "potions", price: 1500, icon: "hyper-potion", desc: "Restaura 1,200 pontos de HP de monstros fortes." },
    { id: "item_max_potion", name: "Max Potion", category: "potions", price: 2500, icon: "max-potion", desc: "Restaura 100% de todo o HP máximo do Pokémon." },
    { id: "item_revive", name: "Revive", category: "potions", price: 1500, icon: "revive", desc: "Ressuscita um Pokémon derrotado com 50% de HP." },
    { id: "item_max_revive", name: "Max Revive", category: "potions", price: 4000, icon: "max-revive", desc: "Ressuscita Pokémon com 100% de HP e cura plena." },

    // Pedras de Evolução
    { id: "stone_fire", name: "Fire Stone", category: "stones", price: 1200, icon: "fire-stone", desc: "Pedra de fogo para evoluir Vulpix, Growlithe e Eevee." },
    { id: "stone_water", name: "Water Stone", category: "stones", price: 1200, icon: "water-stone", desc: "Pedra de água para evoluir Poliwhirl, Shellder e Staryu." },
    { id: "stone_electric", name: "Thunder Stone", category: "stones", price: 1200, icon: "thunder-stone", desc: "Pedra elétrica para evoluir Pikachu e Eevee." },
    { id: "stone_grass", name: "Leaf Stone", category: "stones", price: 1200, icon: "leaf-stone", desc: "Pedra da folha para evoluir Gloom, Weepinbell e Exeggcute." },
    { id: "stone_moon", name: "Moon Stone", category: "stones", price: 1200, icon: "moon-stone", desc: "Pedra lunar pura para evoluir Nidorino, Nidorina e Clefairy." },
    { id: "stone_sun", name: "Sun Stone", category: "stones", price: 1200, icon: "sun-stone", desc: "Pedra solar radiante para evoluir Gloom e Sunkern." },
    { id: "shiny_stone", name: "Shiny Stone", category: "stones", price: 5000, icon: "shiny-stone", desc: "Pedra de luz radiante para evoluções especiais e raras." },

    // Utilitários e Doces
    { id: "item_escape_rope", name: "Escape Rope", category: "utility", price: 550, icon: "escape-rope", desc: "Corda de fuga para retornar instantaneamente à Praça Central." },
    { id: "item_super_repel", name: "Super Repel", category: "utility", price: 500, icon: "super-repel", desc: "Aroma repelente que previne emboscadas selvagens." },
    { id: "item_exp_candy_m", name: "EXP Candy M", category: "utility", price: 2000, icon: "exp-candy-m", desc: "Concede +5,000 pontos de EXP ao Pokémon ativo." },
    { id: "item_rare_candy", name: "Rare Candy", category: "utility", price: 10000, icon: "rare-candy", desc: "Doce lendário que sobe 1 nível completo instantaneamente." }
];

function switchShopSubmenu(subTab) {
    CURRENT_SHOP_SUB = subTab;
    document.querySelectorAll(".shop-submenu-pill").forEach(pill => {
        pill.classList.toggle("active", pill.dataset.shopSub === subTab);
    });
    renderGoldShop();
}

function renderGoldShop() {
    if (!STATE.player) return;
    const goldLbl = document.getElementById("shop-gold-label");
    if (goldLbl) goldLbl.textContent = `$${(STATE.player.gold || 0).toLocaleString()}`;

    const container = document.getElementById("gold-shop-grid-container");
    if (!container) return;

    if (CURRENT_SHOP_SUB === "sell_pokemon") {
        renderShopSellPokemonView();
        return;
    }

    const filtered = GOLD_SHOP_CATALOG.filter(it => {
        if (CURRENT_SHOP_SUB === "all") return true;
        return it.category === CURRENT_SHOP_SUB;
    });

    container.innerHTML = filtered.map(it => {
        const owned = (STATE.player.inventory && STATE.player.inventory[it.id]) || 0;
        const iconUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${it.icon}.png`;

        return `
            <div class="gold-shop-card">
                <div class="shop-card-top">
                    <div class="shop-card-icon">
                        <img src="${iconUrl}" alt="${it.name}" style="max-width:32px;max-height:32px;image-rendering:pixelated;" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';">
                    </div>
                    <div class="shop-card-meta">
                        <div class="shop-card-name">${it.name}</div>
                        <div class="shop-card-price-gold">$${it.price.toLocaleString()}</div>
                        <div style="font-size:10.5px;color:#94a3b8;">Na Mochila: <strong style="color:#e2e8f0;">${owned}</strong></div>
                    </div>
                </div>
                <div class="shop-card-desc">${it.desc}</div>
                <div class="shop-card-qty-row">
                    <button class="btn btn-primary" style="flex:1;" onclick="buyGoldShopItem('${it.id}', ${it.price}, 1)">Comprar 1x ($${it.price})</button>
                    <button class="qty-mini-btn" onclick="buyGoldShopItem('${it.id}', ${it.price}, 5)">5x</button>
                    <button class="qty-mini-btn" onclick="buyGoldShopItem('${it.id}', ${it.price}, 10)">10x</button>
                    <button class="qty-mini-btn" onclick="buyGoldShopItem('${it.id}', ${it.price}, 50)">50x</button>
                </div>
            </div>
        `;
    }).join("");
}

function buyGoldShopItem(itemId, unitPrice, qty) {
    const cost = unitPrice * qty;
    if ((STATE.player.gold || 0) < cost) {
        showToast(`❌ Ouro insuficiente! Você precisa de $${cost.toLocaleString()}.`);
        return;
    }
    STATE.player.gold -= cost;
    STATE.player.inventory[itemId] = (STATE.player.inventory[itemId] || 0) + qty;
    const catItem = GOLD_SHOP_CATALOG.find(i => i.id === itemId) || { name: itemId };
    showToast(`🛒 Comprou ${qty}x ${catItem.name} por $${cost.toLocaleString()}!`);
    scheduleStateSave(1000);
    renderAll();
}

// =========================================================
// 3. CASH SHOP (EXCLUSIVO DIAMANTES 💎)
// =========================================================

const CASH_SHOP_CATALOG = [
    {
        id: "cs_master_ball",
        name: "Master Ball Original",
        category: "balls",
        badge: "Garantia 100%",
        badgeClass: "badge-ball",
        price: 150,
        icon: "master-ball",
        desc: "A melhor Pokébola existente. Captura garantida em qualquer criatura sem falhas."
    },
    {
        id: "cs_pixel_ball",
        name: "Pixel Ball Holográfica",
        category: "balls",
        badge: "Colecionador",
        badgeClass: "badge-ball",
        price: 80,
        icon: "cherish-ball",
        desc: "Pokébola comemorativa 8-bit com partículas holográficas exclusivas ao ser lançada."
    },
    {
        id: "cs_shiny_charm",
        name: "Amuleto Shiny Permanente",
        category: "boosters",
        badge: "Buff Eterno",
        badgeClass: "badge-mythic",
        price: 500,
        icon: "shiny-charm",
        desc: "Aumenta drasticamente a probabilidade de encontrar Pokémon Shiny para 1 em 64."
    },
    {
        id: "cs_exp_booster",
        name: "Booster de EXP 2x (7 Dias)",
        category: "boosters",
        badge: "Aceleração",
        badgeClass: "badge-boost",
        price: 250,
        icon: "lucky-egg",
        desc: "Dobra toda a experiência recebida em abates de caçada e expedições offline por 7 dias."
    },
    {
        id: "cs_master_key",
        name: "Chave Mestra dos Portais",
        category: "boosters",
        badge: "Acesso Total",
        badgeClass: "badge-vip",
        price: 350,
        icon: "secret-key",
        desc: "Desbloqueia permanentemente o acesso livre a todas as Ilhas Lendárias e Safaris Especiais."
    },
    {
        id: "cs_vip_pass",
        name: "Passe VIP Supremo (30 Dias)",
        category: "boosters",
        badge: "Status VIP",
        badgeClass: "badge-vip",
        price: 400,
        icon: "pass",
        desc: "+50% Ouro e EXP, Auto-Farm com velocidade turbo (1.0s) e capacidade ilimitada de mochila."
    },
    {
        id: "cs_mythic_egg",
        name: "Ovo Mítico Garantido",
        category: "eggs",
        badge: "100% IVs",
        badgeClass: "badge-mythic",
        price: 600,
        icon: "mystery-egg",
        desc: "Choca instantaneamente um Mew, Celebi, Jirachi ou Deoxys Nível 50 com 31 IVs perfeitos!"
    },
    {
        id: "cs_champion_skin",
        name: "Skin Treinador Campeão (Red)",
        category: "boosters",
        badge: "Cosmético",
        badgeClass: "badge-vip",
        price: 300,
        icon: "red-card",
        desc: "Traje lendário oficial do Campeão de Kanto com efeitos de aura dourada no mapa."
    },
    {
        id: "cs_iv_reset",
        name: "Reroll de IVs Perfeitos",
        category: "boosters",
        badge: "Competitivo",
        badgeClass: "badge-boost",
        price: 100,
        icon: "ability-capsule",
        desc: "Rola novamente os 6 IVs do Pokémon líder com garantia mínima de 25 a 31 em cada atributo."
    }
];

function switchCashShopSubmenu(subTab) {
    CURRENT_CASH_SUB = subTab;
    document.querySelectorAll(".cash-submenu-pill").forEach(pill => {
        pill.classList.toggle("active", pill.dataset.cashSub === subTab);
    });
    renderCashShop();
}

function renderCashShop() {
    if (!STATE.player) return;
    const diaVal = STATE.player.diamonds || 0;
    const diaLbl = document.getElementById("cashshop-diamond-label");
    if (diaLbl) diaLbl.textContent = `💎 ${diaVal.toLocaleString()} Diamantes`;

    const heroVal = document.getElementById("cashshop-hero-val");
    if (heroVal) heroVal.textContent = `💎 ${diaVal.toLocaleString()}`;

    const container = document.getElementById("cashshop-grid-container");
    if (!container) return;

    const filtered = CASH_SHOP_CATALOG.filter(it => {
        if (CURRENT_CASH_SUB === "all") return true;
        return it.category === CURRENT_CASH_SUB;
    });

    container.innerHTML = filtered.map(it => {
        const iconUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${it.icon}.png`;

        return `
            <div class="cashshop-card">
                <span class="cashshop-card-badge ${it.badgeClass}">${it.badge}</span>
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:48px;height:48px;background:rgba(8,14,26,0.9);border:1px solid rgba(56,189,248,0.4);border-radius:8px;display:flex;align-items:center;justify-content:center;">
                        <img src="${iconUrl}" alt="${it.name}" style="max-width:34px;max-height:34px;image-rendering:pixelated;" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png';">
                    </div>
                    <div>
                        <div style="font-size:14px;font-weight:900;color:#f8fafc;">${it.name}</div>
                        <div class="cashshop-card-price"><span>💎</span> ${it.price} Diamantes</div>
                    </div>
                </div>
                <div style="font-size:11.5px;color:#94a3b8;line-height:1.4;min-height:34px;">${it.desc}</div>
                <button class="btn btn-primary" style="background:linear-gradient(180deg,#0284c7,#0369a1);border-color:#38bdf8;font-weight:800;padding:8px;" onclick="buyCashShopItem('${it.id}', ${it.price})">
                    💎 Adquirir por 💎 ${it.price}
                </button>
            </div>
        `;
    }).join("");
}

function buyCashShopItem(serviceId, diamondPrice) {
    if ((STATE.player.diamonds || 0) < diamondPrice) {
        showToast(`❌ Diamantes insuficientes! Você possui 💎 ${STATE.player.diamonds || 0} e este item custa 💎 ${diamondPrice}.`);
        return;
    }

    STATE.player.diamonds -= diamondPrice;
    const item = CASH_SHOP_CATALOG.find(i => i.id === serviceId);

    // Apply specific service effects
    if (serviceId === "cs_master_ball") {
        STATE.player.inventory["capsule_master"] = (STATE.player.inventory["capsule_master"] || 0) + 1;
        showToast(`🎉 Master Ball adicionada à sua mochila! Captura 100% garantida.`);
    } else if (serviceId === "cs_pixel_ball") {
        STATE.player.inventory["e834a843-486a-4f38-95c4-cfda5febe4a5"] = (STATE.player.inventory["e834a843-486a-4f38-95c4-cfda5febe4a5"] || 0) + 1;
        showToast(`🎉 Pixel Ball exclusiva adicionada!`);
    } else if (serviceId === "cs_master_key") {
        STATE.player.has_master_key = true;
        if (STATE.config) STATE.config.unlock_legendary_islands = true;
        showToast(`🔑 Chave Mestra ativada! Todas as Ilhas Lendárias foram liberadas!`);
    } else if (serviceId === "cs_mythic_egg") {
        // Hatch random mythic
        const mythics = ["mew", "celebi", "jirachi", "deoxys"];
        const chosen = mythics[Math.floor(Math.random() * mythics.length)];
        const spec = STATE.speciesById[chosen] || { id: chosen, name: chosen.toUpperCase() };
        const newPk = {
            uid: "cs_mythic_" + Math.random().toString(36).substring(2, 7),
            species_id: spec.id,
            name: spec.name,
            level: 50,
            is_shiny: Math.random() < 0.25,
            hp: 350, max_hp: 350,
            nature: "Timid", gender: "genderless",
            quality: "Mítico", quality_multiplier: 1.85,
            ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
            iv_total: 186,
            moves: ["psychic", "shadow_ball", "recover", "calm_mind"]
        };
        if (STATE.player.party.length < 6) STATE.player.party.push(newPk);
        else STATE.player.pc_box.push(newPk);
        showToast(`🥚✨ O Ovo Mítico chocou um ${newPk.name} ${newPk.is_shiny ? 'Shiny ✨' : ''} com 31 IVs Perfeitos!`);
    } else if (serviceId === "cs_iv_reset") {
        const lead = getLeadPokemon();
        if (lead) {
            lead.ivs = {
                hp: 25 + Math.floor(Math.random() * 7),
                atk: 25 + Math.floor(Math.random() * 7),
                def: 25 + Math.floor(Math.random() * 7),
                spa: 25 + Math.floor(Math.random() * 7),
                spd: 25 + Math.floor(Math.random() * 7),
                spe: 25 + Math.floor(Math.random() * 7)
            };
            lead.iv_total = Object.values(lead.ivs).reduce((a, b) => a + b, 0);
            showToast(`⚡ IVs de ${lead.name} renovados com perfeição! Total: ${lead.iv_total}/186.`);
        }
    } else {
        showToast(`✨ Adquiriu ${item ? item.name : serviceId}! Benefício ativado.`);
    }

    scheduleStateSave(1000);
    renderAll();
}

// =========================================================
// 4. MERCADO GLOBAL (MARKETPLACE COM 5% SERVER HOLD TAX)
// =========================================================

function switchMarketSubmenu(subTab) {
    CURRENT_MARKET_SUB = subTab;
    document.querySelectorAll(".market-submenu-pill").forEach(pill => {
        pill.classList.toggle("active", pill.dataset.marketSub === subTab);
    });
    document.querySelectorAll(".market-sub-view").forEach(view => {
        view.classList.toggle("active", view.id === `market-sub-${subTab}`);
    });

    if (subTab === "browse") {
        fetchMarketListings();
    } else if (subTab === "my") {
        loadMyMarketListings();
    } else if (subTab === "sell") {
        populateMarketSellDropdowns();
    } else if (subTab === "admin") {
        loadServerHoldData();
    }
}

function debounceMarketSearch() {
    clearTimeout(MARKET_SEARCH_DEBOUNCE_TIMER);
    MARKET_SEARCH_DEBOUNCE_TIMER = setTimeout(() => {
        fetchMarketListings();
    }, 350);
}

async function fetchMarketListings() {
    const cat = document.getElementById("market-filter-category")?.value || "all";
    const curr = document.getElementById("market-filter-currency")?.value || "all";
    const sort = document.getElementById("market-filter-sort")?.value || "recent";
    const query = document.getElementById("market-search-input")?.value || "";

    const container = document.getElementById("market-listings-container");
    if (!container) return;
    container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:30px;color:#94a3b8;">🔄 Carregando ofertas do Mercado Global...</div>`;

    try {
        const url = `/api/market/listings?category=${cat}&currency=${curr}&sort=${sort}&query=${encodeURIComponent(query)}`;
        const res = await fetch(url);
        const data = await res.json();
        renderMarketListings(data.listings || []);
    } catch (e) {
        container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:30px;color:#f87171;">Erro ao carregar anúncios: ${e.message}</div>`;
    }
}

function renderMarketListings(listings) {
    const container = document.getElementById("market-listings-container");
    if (!container) return;

    if (!listings || listings.length === 0) {
        container.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:40px 20px;color:#94a3b8;">
                <span style="font-size:36px;display:block;margin-bottom:8px;">⚖️</span>
                Nenhum anúncio encontrado com estes filtros no Mercado Global.
            </div>
        `;
        return;
    }

    container.innerHTML = listings.map(l => {
        const isDia = l.currency === "diamond";
        const priceFmt = isDia ? `💎 ${l.price}` : `$${l.price.toLocaleString()}`;
        const taxFmt = isDia ? `💎 ${l.tax_amount}` : `$${l.tax_amount.toLocaleString()}`;
        const isMyListing = STATE.user && STATE.user.id === l.seller_id;

        let iconHtml = "";
        let metaHtml = "";

        if (l.listing_type === "pokemon" && l.pokemon) {
            const pk = l.pokemon;
            const pmdUrl = `/img/pmd/${pk.species_id}/Portrait.png`;
            iconHtml = `
                <img src="${pmdUrl}" alt="${pk.name}" style="width:40px;height:40px;image-rendering:pixelated;" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pk.dex_id || 25}.png';">
            `;
            metaHtml = `
                <div style="font-size:11px;color:#cbd5e1;margin-top:2px;">
                    <span style="color:#fde047;font-weight:700;">Lv.${pk.level}</span> • 
                    <span style="color:#60a5fa;">${pk.nature || 'Normal'}</span> • 
                    IVs: <strong>${pk.iv_total || 150}</strong>
                    ${pk.is_shiny ? '<span style="color:#facc15;font-weight:900;"> ✨ SHINY</span>' : ''}
                </div>
            `;
        } else {
            const itemSprite = getItemSpriteUrl(l.item_id || "item", { sprite_url: null });
            iconHtml = `
                <img src="${itemSprite}" alt="${l.title}" style="max-width:32px;max-height:32px;image-rendering:pixelated;" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';">
            `;
            metaHtml = `
                <div style="font-size:11px;color:#cbd5e1;margin-top:2px;">
                    Lote: <strong style="color:#34d399;">x${l.item_quantity || 1}</strong> • ${l.item_desc || 'Item consumível'}
                </div>
            `;
        }

        return `
            <div class="market-listing-card">
                <div class="market-card-header">
                    <div class="market-card-icon">${iconHtml}</div>
                    <div class="market-card-meta">
                        <div class="market-card-title">${l.title}</div>
                        <div class="market-card-seller">Vendedor: <strong style="color:#93c5fd;">${l.seller_name}</strong></div>
                        ${metaHtml}
                    </div>
                </div>

                <div class="market-card-price-row">
                    <span class="market-card-price-label">Preço ao Comprador:</span>
                    <span class="market-card-price-val ${isDia ? 'val-diamond' : 'val-gold'}">${priceFmt}</span>
                </div>
                <div class="market-card-tax-hint">Taxa do Servidor (5% Hold): ${taxFmt}</div>

                <div style="margin-top:4px;">
                    ${isMyListing ? `
                        <button class="btn" style="width:100%;opacity:0.75;" disabled>Seu Próprio Anúncio</button>
                    ` : `
                        <button class="btn ${isDia ? 'btn-primary' : 'btn-gold'}" style="width:100%;padding:7px;font-weight:800;" onclick="buyMarketListingAction(${l.id}, '${l.title.replace(/'/g, "\\'")}', '${l.currency}', ${l.price})">
                            🛒 Comprar Agora (${priceFmt})
                        </button>
                    `}
                </div>
            </div>
        `;
    }).join("");
}

async function buyMarketListingAction(listingId, title, currency, price) {
    const isDia = currency === "diamond";
    const myBalance = isDia ? (STATE.player.diamonds || 0) : (STATE.player.gold || 0);

    if (myBalance < price) {
        showToast(`❌ Saldo insuficiente! Você possui ${isDia ? `💎 ${myBalance}` : `$${myBalance.toLocaleString()}`} e o item custa ${isDia ? `💎 ${price}` : `$${price.toLocaleString()}`}.`);
        return;
    }

    try {
        const headers = getAuthHeaders();
        const res = await fetch("/api/market/buy", {
            method: "POST",
            headers,
            body: JSON.stringify({ listing_id: listingId })
        });
        const data = await res.json();
        if (data.ok) {
            showToast(`🎉 Compra concluída com sucesso! '${title}' foi entregue.`);
            if (data.player) STATE.player = data.player;
            renderAll();
            fetchMarketListings();
        } else {
            showToast(`❌ Erro: ${data.error || 'Falha ao processar compra.'}`);
        }
    } catch (e) {
        showToast(`❌ Erro de conexão: ${e.message}`);
    }
}

async function loadMyMarketListings() {
    try {
        const headers = getAuthHeaders();
        const res = await fetch("/api/market/my-listings", { headers });
        const data = await res.json();

        const activeContainer = document.getElementById("my-active-listings-container");
        const soldContainer = document.getElementById("my-sold-listings-container");

        if (activeContainer) {
            if (!data.active || data.active.length === 0) {
                activeContainer.innerHTML = `<div style="grid-column:1/-1;color:#94a3b8;font-size:12px;padding:12px;">Você não possui nenhum anúncio ativo no momento.</div>`;
            } else {
                activeContainer.innerHTML = data.active.map(l => `
                    <div class="market-listing-card">
                        <div style="font-weight:800;color:#f8fafc;">${l.title}</div>
                        <div style="font-size:11.5px;color:#94a3b8;">Preço: <strong style="color:${l.currency === 'diamond' ? '#38bdf8' : '#facc15'}">${l.currency === 'diamond' ? `💎 ${l.price}` : `$${l.price.toLocaleString()}`}</strong> • Você receberá 95%: <strong>${l.currency === 'diamond' ? `💎 ${l.seller_proceeds}` : `$${l.seller_proceeds.toLocaleString()}`}</strong></div>
                        <button class="btn btn-red" style="margin-top:6px;width:100%;font-size:11px;" onclick="cancelMarketListingAction(${l.id})">❌ Cancelar e Recuperar Item</button>
                    </div>
                `).join("");
            }
        }

        if (soldContainer) {
            if (!data.sold || data.sold.length === 0) {
                soldContainer.innerHTML = `<div style="grid-column:1/-1;color:#94a3b8;font-size:12px;padding:12px;">Nenhuma venda realizada recentemente.</div>`;
            } else {
                soldContainer.innerHTML = data.sold.map(l => `
                    <div class="market-listing-card" style="border-color:rgba(34,197,94,0.4);">
                        <div style="font-weight:800;color:#86efac;">✅ VENDIDO: ${l.title}</div>
                        <div style="font-size:11px;color:#94a3b8;">Comprador: <strong>${l.buyer_name || 'Treinador'}</strong> • Líquido Creditado: <strong>${l.currency === 'diamond' ? `💎 ${l.seller_proceeds}` : `$${l.seller_proceeds.toLocaleString()}`}</strong> (5% Tax Retida: ${l.currency === 'diamond' ? `💎 ${l.tax_amount}` : `$${l.tax_amount.toLocaleString()}`})</div>
                    </div>
                `).join("");
            }
        }
    } catch (e) {
        console.error("loadMyMarketListings error:", e);
    }
}

async function cancelMarketListingAction(listingId) {
    try {
        const headers = getAuthHeaders();
        const res = await fetch("/api/market/cancel", {
            method: "POST",
            headers,
            body: JSON.stringify({ listing_id: listingId })
        });
        const data = await res.json();
        if (data.ok) {
            showToast("✅ Anúncio cancelado! O item ou Pokémon retornou à sua posse.");
            if (data.player) STATE.player = data.player;
            renderAll();
            loadMyMarketListings();
        } else {
            showToast(`❌ Erro: ${data.error}`);
        }
    } catch (e) {
        showToast(`❌ Erro de conexão: ${e.message}`);
    }
}

function toggleMarketSellType(type) {
    const itemSec = document.getElementById("market-sell-item-section");
    const pkSec = document.getElementById("market-sell-pokemon-section");
    const itemLbl = document.getElementById("sell-type-item-lbl");
    const pkLbl = document.getElementById("sell-type-pokemon-lbl");

    if (type === "item") {
        if (itemSec) itemSec.style.display = "block";
        if (pkSec) pkSec.style.display = "none";
        itemLbl?.classList.add("active");
        pkLbl?.classList.remove("active");
    } else {
        if (itemSec) itemSec.style.display = "none";
        if (pkSec) pkSec.style.display = "block";
        itemLbl?.classList.remove("active");
        pkLbl?.classList.add("active");
    }
    updateMarketSellTaxPreview();
}

function populateMarketSellDropdowns() {
    if (!STATE.player) return;

    // Items
    const itemSel = document.getElementById("market-sell-item-select");
    if (itemSel) {
        const entries = Object.entries(STATE.player.inventory || {}).filter(([, qty]) => qty > 0);
        if (entries.length === 0) {
            itemSel.innerHTML = `<option value="">Nenhum item disponível na mochila</option>`;
        } else {
            itemSel.innerHTML = entries.map(([id, qty]) => {
                const it = STATE.itemsMap[id] || { name: id };
                return `<option value="${id}">${it.name} (Possui: ${qty})</option>`;
            }).join("");
        }
    }

    // Pokémon
    const pkSel = document.getElementById("market-sell-pokemon-select");
    if (pkSel) {
        const allPks = [
            ...(STATE.player.party || []).map((p, idx) => ({ ...p, loc: `Equipe (#${idx + 1})` })),
            ...(STATE.player.pc_box || []).map(p => ({ ...p, loc: "PC Box" }))
        ];

        if (allPks.length <= 1) {
            pkSel.innerHTML = `<option value="">Você precisa de pelo menos 2 Pokémon para anunciar um</option>`;
        } else {
            pkSel.innerHTML = allPks.map(p => `
                <option value="${p.uid}">${p.name} Lv.${p.level} [${p.quality || 'Comum'}] ${p.is_shiny ? '✨' : ''} (${p.loc})</option>
            `).join("");
        }
    }

    updateMarketSellItemPreview();
    updateMarketSellPokemonPreview();
    updateMarketSellTaxPreview();
}

function updateMarketSellItemPreview() {
    // Optional item sprite sync
    updateMarketSellTaxPreview();
}

function updateMarketSellPokemonPreview() {
    const pkSel = document.getElementById("market-sell-pokemon-select");
    const previewBox = document.getElementById("market-sell-pokemon-preview-card");
    if (!pkSel || !previewBox) return;

    const chosenUid = pkSel.value;
    const allPks = [...(STATE.player.party || []), ...(STATE.player.pc_box || [])];
    const pk = allPks.find(p => p.uid === chosenUid);

    if (!pk) {
        previewBox.innerHTML = "";
        return;
    }

    const pmdUrl = `/img/pmd/${pk.species_id}/Portrait.png`;
    previewBox.innerHTML = `
        <div style="background:rgba(15,23,42,0.9);border:1px solid rgba(56,189,248,0.3);border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:12px;">
            <img src="${pmdUrl}" alt="${pk.name}" style="width:40px;height:40px;image-rendering:pixelated;" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pk.dex_id || 25}.png';">
            <div style="font-size:12px;color:#e2e8f0;">
                <strong style="color:#facc15;">${pk.name}</strong> Lv.${pk.level} ${pk.is_shiny ? '✨ Shiny' : ''} • Natureza: ${pk.nature || 'Normal'}<br>
                Qualidade: <strong>${pk.quality || 'Comum'}</strong> • IV Total: <strong>${pk.iv_total || 150}/186</strong>
            </div>
        </div>
    `;
    updateMarketSellTaxPreview();
}

function updateMarketSellTaxPreview() {
    const priceInput = document.getElementById("market-sell-price");
    const currSelect = document.getElementById("market-sell-currency");
    const grossEl = document.getElementById("market-tax-preview-gross");
    const taxEl = document.getElementById("market-tax-preview-tax");
    const netEl = document.getElementById("market-tax-preview-net");

    if (!priceInput || !grossEl || !taxEl || !netEl) return;

    const price = Math.max(1, parseInt(priceInput.value, 10) || 0);
    const curr = currSelect?.value || "gold";
    const isDia = curr === "diamond";

    // 5% Server Hold Tax calculated on every transaction
    const tax = Math.max(1, Math.round(price * 0.05));
    const net = price - tax;

    grossEl.textContent = isDia ? `💎 ${price.toLocaleString()}` : `$${price.toLocaleString()}`;
    taxEl.textContent = isDia ? `-💎 ${tax.toLocaleString()}` : `-$${tax.toLocaleString()}`;
    netEl.textContent = isDia ? `+💎 ${net.toLocaleString()}` : `+$${net.toLocaleString()}`;
}

async function submitNewMarketListing() {
    const isItem = document.querySelector("input[name='sell_ltype']:checked")?.value === "item";
    const curr = document.getElementById("market-sell-currency")?.value || "gold";
    const price = parseInt(document.getElementById("market-sell-price")?.value, 10) || 0;

    if (price <= 0) {
        showToast("⚠️ O preço do anúncio deve ser maior que zero!");
        return;
    }

    const payload = {
        listing_type: isItem ? "item" : "pokemon",
        currency: curr,
        price: price
    };

    if (isItem) {
        const itemId = document.getElementById("market-sell-item-select")?.value;
        const qty = parseInt(document.getElementById("market-sell-item-qty")?.value, 10) || 1;
        if (!itemId) {
            showToast("⚠️ Selecione um item válido da mochila!");
            return;
        }
        const itemObj = STATE.itemsMap[itemId] || { name: itemId, type: "item" };
        payload.item_id = itemId;
        payload.item_quantity = qty;
        payload.title = `${itemObj.name} (x${qty})`;
        payload.category = itemId.startsWith("capsule_") ? "pokeball" : itemId.startsWith("stone_") ? "stone" : itemId.includes("potion") ? "potion" : "item";
    } else {
        const pkUid = document.getElementById("market-sell-pokemon-select")?.value;
        if (!pkUid) {
            showToast("⚠️ Selecione um Pokémon da lista!");
            return;
        }
        const allPks = [...(STATE.player.party || []), ...(STATE.player.pc_box || [])];
        const pk = allPks.find(p => p.uid === pkUid);
        if (!pk) {
            showToast("⚠️ Pokémon não encontrado!");
            return;
        }
        payload.pokemon_uid = pkUid;
        payload.title = `${pk.name} Lv.${pk.level}${pk.is_shiny ? ' ✨' : ''}`;
        payload.category = "pokemon";
    }

    try {
        const headers = getAuthHeaders();
        const res = await fetch("/api/market/list", {
            method: "POST",
            headers,
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.ok) {
            showToast(`🚀 Anúncio publicado no Mercado Global! Preço: ${curr === 'diamond' ? `💎 ${price}` : `$${price.toLocaleString()}`}`);
            if (data.player) STATE.player = data.player;
            renderAll();
            switchMarketSubmenu("my");
        } else {
            showToast(`❌ Erro: ${data.error}`);
        }
    } catch (e) {
        showToast(`❌ Erro de conexão: ${e.message}`);
    }
}

// =========================================================
// 5. SERVER HOLD / TREASURY (ADMIN ONLY - 5% TAX REVENUE)
// =========================================================

async function loadServerHoldData() {
    try {
        const headers = getAuthHeaders();
        const res = await fetch("/api/market/admin/hold?test_admin=" + (STATE.user && STATE.user.is_admin ? "1" : "0"), { headers });
        if (res.status === 403) {
            showToast("🔒 Acesso Restrito: Apenas administradores possuem acesso ao Cofre do Servidor.");
            switchMarketSubmenu("browse");
            return;
        }
        const data = await res.json();
        if (!data.ok) {
            showToast(`❌ Erro: ${data.error}`);
            return;
        }

        const hold = data.server_hold || {};
        const goldEl = document.getElementById("admin-hold-gold");
        if (goldEl) goldEl.textContent = `$${(hold.total_gold_tax || 0).toLocaleString()}`;

        const diaEl = document.getElementById("admin-hold-diamonds");
        if (diaEl) diaEl.textContent = `💎 ${(hold.total_diamond_tax || 0).toLocaleString()}`;

        const txEl = document.getElementById("admin-hold-txs");
        if (txEl) txEl.textContent = (hold.total_transactions || 0).toLocaleString();

        const tbody = document.getElementById("admin-hold-tx-tbody");
        if (tbody) {
            if (!data.transactions || data.transactions.length === 0) {
                tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:#94a3b8;">Nenhuma transação registrada no livro razão.</td></tr>`;
            } else {
                tbody.innerHTML = data.transactions.map(tx => {
                    const isDia = tx.currency === "diamond";
                    const gross = isDia ? `💎 ${tx.gross_price}` : `$${tx.gross_price.toLocaleString()}`;
                    const tax = isDia ? `💎 ${tx.tax_amount}` : `$${tx.tax_amount.toLocaleString()}`;
                    const net = isDia ? `💎 ${tx.seller_proceeds}` : `$${tx.seller_proceeds.toLocaleString()}`;

                    return `
                        <tr>
                            <td>#${tx.id}</td>
                            <td style="font-size:11px;color:#94a3b8;">${tx.created_at || 'Agora'}</td>
                            <td><strong style="color:#f8fafc;">${tx.title}</strong></td>
                            <td style="color:#93c5fd;">${tx.seller_name}</td>
                            <td style="color:#86efac;">${tx.buyer_name}</td>
                            <td style="font-family:var(--font-mono);font-weight:800;">${gross}</td>
                            <td style="font-family:var(--font-mono);font-weight:900;color:#f87171;">${tax}</td>
                            <td style="font-family:var(--font-mono);font-weight:800;color:#4ade80;">${net}</td>
                        </tr>
                    `;
                }).join("");
            }
        }
    } catch (e) {
        showToast(`❌ Erro ao consultar Cofre do Servidor: ${e.message}`);
    }
}

// Check admin role to show/hide admin hold tab in market
function syncMarketAdminVisibility() {
    const adminTab = document.getElementById("market-tab-admin-hold");
    if (!adminTab) return;
    const isAdmin = Boolean(STATE.user && (STATE.user.is_admin || STATE.user.role === "admin" || STATE.user.username?.toLowerCase() === "admin"));
    adminTab.style.display = isAdmin ? "inline-flex" : "none";
}


// =========================================================
// =========================================================
// POKÉMART: SISTEMA DE VENDA & RESGATE DE POKÉMON POR OURO (FLOATING MODAL & BATCH SELL)
// =========================================================

function openPokemartSellModal(initialSource = null) {
    if (initialSource && ["all", "party", "box"].includes(initialSource)) {
        SHOP_SELL_FILTERS.source = initialSource;
    }
    const modal = document.getElementById("modal-pokemart-sell");
    if (modal) {
        modal.style.display = "flex";
        renderPokemartSellModal();
    }
}
window.openPokemartSellModal = openPokemartSellModal;

function closePokemartSellModal() {
    const modal = document.getElementById("modal-pokemart-sell");
    if (modal) {
        modal.style.display = "none";
    }
    // Refresh background views if open
    if (typeof renderPartyAndBox === "function") renderPartyAndBox();
    if (typeof renderGoldShop === "function") renderGoldShop();
    if (typeof renderBagModal === "function") renderBagModal();
    if (typeof renderHud === "function") renderHud();
}
window.closePokemartSellModal = closePokemartSellModal;

function setShopSellSource(src) {
    if (["all", "box", "party"].includes(src)) {
        SHOP_SELL_FILTERS.source = src;
        renderPokemartSellModal();
        if (typeof renderShopSellPokemonView === "function") renderShopSellPokemonView();
    }
}
window.setShopSellSource = setShopSellSource;

function updateShopSellModalFilters() {
    const qEl = document.getElementById("modal-sell-filter-quality");
    const tEl = document.getElementById("modal-sell-filter-type");
    const shEl = document.getElementById("modal-sell-filter-shiny");
    const srtEl = document.getElementById("modal-sell-filter-sort");
    const srcEl = document.getElementById("modal-sell-filter-search");
    if (qEl) SHOP_SELL_FILTERS.quality = qEl.value;
    if (tEl) SHOP_SELL_FILTERS.type = tEl.value;
    if (shEl) SHOP_SELL_FILTERS.shiny = shEl.value;
    if (srtEl) SHOP_SELL_FILTERS.sort = srtEl.value;
    if (srcEl) SHOP_SELL_FILTERS.search = (srcEl.value || "").toLowerCase().trim();
    renderPokemartSellModal();
    if (typeof renderShopSellPokemonView === "function") renderShopSellPokemonView();
}
window.updateShopSellModalFilters = updateShopSellModalFilters;

function updateShopSellFilters() {
    SHOP_SELL_FILTERS.source = document.getElementById("shop-sell-filter-source")?.value || SHOP_SELL_FILTERS.source || "all";
    SHOP_SELL_FILTERS.type = document.getElementById("shop-sell-filter-type")?.value || "all";
    SHOP_SELL_FILTERS.quality = document.getElementById("shop-sell-filter-quality")?.value || "all";
    SHOP_SELL_FILTERS.shiny = document.getElementById("shop-sell-filter-shiny")?.value || "all";
    SHOP_SELL_FILTERS.sort = document.getElementById("shop-sell-filter-sort")?.value || "gold_desc";
    SHOP_SELL_FILTERS.search = (document.getElementById("shop-sell-filter-search")?.value || "").toLowerCase().trim();
    renderShopSellPokemonView();
    renderPokemartSellModal();
}
window.updateShopSellFilters = updateShopSellFilters;

function toggleSelectMonForSell(monUid) {
    const party = STATE.player?.party || [];
    const leaderUid = party.length > 0 ? party[0].uid : null;
    if (monUid === leaderUid) {
        showToast("⚠️ O Pokémon Líder está protegido e não pode ser selecionado para venda!");
        return;
    }
    if (SELECTION_SET_FOR_SELL.has(monUid)) {
        SELECTION_SET_FOR_SELL.delete(monUid);
    } else {
        SELECTION_SET_FOR_SELL.add(monUid);
    }
    renderPokemartSellModal();
    renderShopSellPokemonView();
}
window.toggleSelectMonForSell = toggleSelectMonForSell;

function selectAllFilteredMonsForSell() {
    const list = getFilteredMonsForSell();
    const leaderUid = STATE.player?.party?.[0]?.uid;
    let added = 0;
    list.forEach(m => {
        if (m.uid !== leaderUid) {
            SELECTION_SET_FOR_SELL.add(m.uid);
            added++;
        }
    });
    showToast(`☑️ ${added} Pokémon selecionados para venda em lote!`);
    renderPokemartSellModal();
    renderShopSellPokemonView();
}
window.selectAllFilteredMonsForSell = selectAllFilteredMonsForSell;

function clearAllMonsSelectedForSell() {
    SELECTION_SET_FOR_SELL.clear();
    showToast("🧹 Seleção de venda limpa!");
    renderPokemartSellModal();
    renderShopSellPokemonView();
}
window.clearAllMonsSelectedForSell = clearAllMonsSelectedForSell;

function selectDuplicateMonsForSell() {
    if (!STATE.player) return;
    const party = STATE.player.party || [];
    const box = STATE.player.pc_box || [];
    const leaderUid = party.length > 0 ? party[0].uid : null;

    const groups = {};
    const allMons = [
        ...party.map(m => ({ ...m, isParty: true })),
        ...box.map(m => ({ ...m, isParty: false }))
    ];

    allMons.forEach(m => {
        if (m.uid === leaderUid) return;
        const sid = m.species_id;
        if (!groups[sid]) groups[sid] = [];
        groups[sid].push(m);
    });

    let selectedCount = 0;
    for (const sid in groups) {
        const list = groups[sid];
        if (list.length > 1) {
            list.sort((a, b) => {
                if (a.is_shiny && !b.is_shiny) return -1;
                if (!a.is_shiny && b.is_shiny) return 1;
                const ivA = a.iv_total || 0;
                const ivB = b.iv_total || 0;
                return ((b.level || 1) * 100 + ivB) - ((a.level || 1) * 100 + ivA);
            });
            for (let i = 1; i < list.length; i++) {
                SELECTION_SET_FOR_SELL.add(list[i].uid);
                selectedCount++;
            }
        }
    }

    showToast(`🔁 ${selectedCount} Pokémon repetidos selecionados (as melhores cópias foram preservadas)!`);
    renderPokemartSellModal();
    renderShopSellPokemonView();
}
window.selectDuplicateMonsForSell = selectDuplicateMonsForSell;

function selectCommonMonsForSell() {
    if (!STATE.player) return;
    const party = STATE.player.party || [];
    const box = STATE.player.pc_box || [];
    const leaderUid = party.length > 0 ? party[0].uid : null;

    let selectedCount = 0;
    [...party, ...box].forEach(m => {
        if (m.uid === leaderUid) return;
        if (!m.is_shiny && (m.quality || "Comum") === "Comum") {
            SELECTION_SET_FOR_SELL.add(m.uid);
            selectedCount++;
        }
    });

    showToast(`⚪ ${selectedCount} Pokémon Comuns selecionados para venda!`);
    renderPokemartSellModal();
    renderShopSellPokemonView();
}
window.selectCommonMonsForSell = selectCommonMonsForSell;

function getFilteredMonsForSell() {
    if (!STATE.player) return [];
    const party = (STATE.player.party || []).map((m, idx) => ({ ...m, isParty: true, partyIdx: idx }));
    const box = (STATE.player.pc_box || []).map((m, idx) => ({ ...m, isParty: false, boxIdx: idx }));

    let all = [];
    if (SHOP_SELL_FILTERS.source === "party") all = party;
    else if (SHOP_SELL_FILTERS.source === "box") all = box;
    else all = [...party, ...box];

    return all.filter(m => {
        if (SHOP_SELL_FILTERS.search) {
            const name = (m.name || "").toLowerCase();
            const sid = (m.species_id || "").toLowerCase();
            if (!name.includes(SHOP_SELL_FILTERS.search) && !sid.includes(SHOP_SELL_FILTERS.search)) return false;
        }

        if (SHOP_SELL_FILTERS.type !== "all") {
            if (!(m.elements || []).includes(SHOP_SELL_FILTERS.type)) return false;
        }

        if (SHOP_SELL_FILTERS.quality !== "all") {
            if ((m.quality || "Comum") !== SHOP_SELL_FILTERS.quality) return false;
        }

        if (SHOP_SELL_FILTERS.shiny === "shiny_only" && !m.is_shiny) return false;
        if (SHOP_SELL_FILTERS.shiny === "non_shiny" && m.is_shiny) return false;

        return true;
    }).sort((a, b) => {
        const valA = calculatePokemonGoldValue(a);
        const valB = calculatePokemonGoldValue(b);
        if (SHOP_SELL_FILTERS.sort === "gold_desc") return valB - valA;
        if (SHOP_SELL_FILTERS.sort === "gold_asc") return valA - valB;
        if (SHOP_SELL_FILTERS.sort === "lvl_desc") return (b.level || 1) - (a.level || 1);
        if (SHOP_SELL_FILTERS.sort === "iv_desc") return (b.iv_total || 0) - (a.iv_total || 0);
        if (SHOP_SELL_FILTERS.sort === "name_asc") return (a.name || "").localeCompare(b.name || "");
        return 0;
    });
}
window.getFilteredMonsForSell = getFilteredMonsForSell;

function renderPokemartSellModal() {
    const container = document.getElementById("pokemart-sell-modal-content");
    if (!container) return;

    const goldLabel = document.getElementById("pokemart-sell-modal-gold-label");
    if (goldLabel) goldLabel.textContent = `$${(STATE.player?.gold || 0).toLocaleString()}`;

    const party = STATE.player?.party || [];
    const box = STATE.player?.pc_box || [];
    const leaderUid = party.length > 0 ? party[0].uid : null;
    const filteredMons = getFilteredMonsForSell();

    const allPlayerMons = [...party, ...box];
    let selectedGold = 0;
    let selectedCount = 0;

    SELECTION_SET_FOR_SELL.forEach(uid => {
        if (uid === leaderUid) return;
        const found = allPlayerMons.find(m => m.uid === uid);
        if (found) {
            selectedGold += calculatePokemonGoldValue(found);
            selectedCount++;
        }
    });

    container.innerHTML = `
        <!-- SOURCE TABS PILLS -->
        <div class="pokemart-sell-source-pills">
            <button class="pokemart-source-pill ${SHOP_SELL_FILTERS.source === 'all' ? 'active' : ''}" onclick="setShopSellSource('all')">
                <span>🌐</span>
                <span>Todos os Pokémon (${allPlayerMons.length})</span>
            </button>
            <button class="pokemart-source-pill ${SHOP_SELL_FILTERS.source === 'box' ? 'active' : ''}" onclick="setShopSellSource('box')">
                <span>📦</span>
                <span>Apenas PC Box (${box.length})</span>
            </button>
            <button class="pokemart-source-pill ${SHOP_SELL_FILTERS.source === 'party' ? 'active' : ''}" onclick="setShopSellSource('party')">
                <span>🎒</span>
                <span>Apenas Mochila / Time (${party.length})</span>
            </button>
        </div>

        <!-- FILTERS TOOLBAR -->
        <div class="shop-sell-filter-container">
            <div class="shop-sell-filter-grid">
                <div class="shop-sell-filter-item">
                    <label>Qualidade / Raridade</label>
                    <select id="modal-sell-filter-quality" onchange="updateShopSellModalFilters()">
                        <option value="all" ${SHOP_SELL_FILTERS.quality === "all" ? "selected" : ""}>⭐ Todas as Qualidades</option>
                        <option value="Comum" ${SHOP_SELL_FILTERS.quality === "Comum" ? "selected" : ""}>Comum</option>
                        <option value="Incomum" ${SHOP_SELL_FILTERS.quality === "Incomum" ? "selected" : ""}>Incomum</option>
                        <option value="Raro" ${SHOP_SELL_FILTERS.quality === "Raro" ? "selected" : ""}>Raro</option>
                        <option value="Épico" ${SHOP_SELL_FILTERS.quality === "Épico" ? "selected" : ""}>Épico</option>
                        <option value="Lendário" ${SHOP_SELL_FILTERS.quality === "Lendário" ? "selected" : ""}>Lendário</option>
                        <option value="Mítico" ${SHOP_SELL_FILTERS.quality === "Mítico" ? "selected" : ""}>Mítico</option>
                    </select>
                </div>

                <div class="shop-sell-filter-item">
                    <label>Tipo Elemental</label>
                    <select id="modal-sell-filter-type" onchange="updateShopSellModalFilters()">
                        <option value="all" ${SHOP_SELL_FILTERS.type === "all" ? "selected" : ""}>🌈 Todos os Tipos</option>
                        <option value="fire" ${SHOP_SELL_FILTERS.type === "fire" ? "selected" : ""}>🔥 Fogo</option>
                        <option value="water" ${SHOP_SELL_FILTERS.type === "water" ? "selected" : ""}>💧 Água</option>
                        <option value="grass" ${SHOP_SELL_FILTERS.type === "grass" ? "selected" : ""}>🌿 Planta</option>
                        <option value="electric" ${SHOP_SELL_FILTERS.type === "electric" ? "selected" : ""}>⚡ Elétrico</option>
                        <option value="normal" ${SHOP_SELL_FILTERS.type === "normal" ? "selected" : ""}>⚪ Normal</option>
                        <option value="psychic" ${SHOP_SELL_FILTERS.type === "psychic" ? "selected" : ""}>🔮 Psíquico</option>
                        <option value="ice" ${SHOP_SELL_FILTERS.type === "ice" ? "selected" : ""}>🧊 Gelo</option>
                        <option value="dragon" ${SHOP_SELL_FILTERS.type === "dragon" ? "selected" : ""}>🐲 Dragão</option>
                        <option value="ghost" ${SHOP_SELL_FILTERS.type === "ghost" ? "selected" : ""}>👻 Fantasma</option>
                        <option value="rock" ${SHOP_SELL_FILTERS.type === "rock" ? "selected" : ""}>🪨 Pedra</option>
                        <option value="ground" ${SHOP_SELL_FILTERS.type === "ground" ? "selected" : ""}>⛰️ Terra</option>
                        <option value="flying" ${SHOP_SELL_FILTERS.type === "flying" ? "selected" : ""}>🦅 Voador</option>
                        <option value="bug" ${SHOP_SELL_FILTERS.type === "bug" ? "selected" : ""}>🐛 Inseto</option>
                        <option value="poison" ${SHOP_SELL_FILTERS.type === "poison" ? "selected" : ""}>🧪 Venenoso</option>
                        <option value="fighting" ${SHOP_SELL_FILTERS.type === "fighting" ? "selected" : ""}>🥋 Lutador</option>
                        <option value="steel" ${SHOP_SELL_FILTERS.type === "steel" ? "selected" : ""}>⚙️ Aço</option>
                        <option value="dark" ${SHOP_SELL_FILTERS.type === "dark" ? "selected" : ""}>🌑 Noturno</option>
                        <option value="fairy" ${SHOP_SELL_FILTERS.type === "fairy" ? "selected" : ""}>✨ Fada</option>
                    </select>
                </div>

                <div class="shop-sell-filter-item">
                    <label>Filtro Shiny</label>
                    <select id="modal-sell-filter-shiny" onchange="updateShopSellModalFilters()">
                        <option value="all" ${SHOP_SELL_FILTERS.shiny === "all" ? "selected" : ""}>✨ Todos</option>
                        <option value="non_shiny" ${SHOP_SELL_FILTERS.shiny === "non_shiny" ? "selected" : ""}>🛡️ Apenas Não-Shinies</option>
                        <option value="shiny_only" ${SHOP_SELL_FILTERS.shiny === "shiny_only" ? "selected" : ""}>✨ Somente Shinies</option>
                    </select>
                </div>

                <div class="shop-sell-filter-item">
                    <label>Ordenar Por</label>
                    <select id="modal-sell-filter-sort" onchange="updateShopSellModalFilters()">
                        <option value="gold_desc" ${SHOP_SELL_FILTERS.sort === "gold_desc" ? "selected" : ""}>💰 Maior Valor de Ouro</option>
                        <option value="gold_asc" ${SHOP_SELL_FILTERS.sort === "gold_asc" ? "selected" : ""}>💵 Menor Valor de Ouro</option>
                        <option value="lvl_desc" ${SHOP_SELL_FILTERS.sort === "lvl_desc" ? "selected" : ""}>📊 Maior Nível</option>
                        <option value="iv_desc" ${SHOP_SELL_FILTERS.sort === "iv_desc" ? "selected" : ""}>🧬 Maior Total de IVs</option>
                        <option value="name_asc" ${SHOP_SELL_FILTERS.sort === "name_asc" ? "selected" : ""}>🔤 Nome (A-Z)</option>
                    </select>
                </div>

                <div class="shop-sell-filter-item" style="grid-column: span 2;">
                    <label>Buscar Nome ou Espécie</label>
                    <input type="text" id="modal-sell-filter-search" placeholder="🔍 Ex: Pikachu, Charizard, Pidgey..." value="${SHOP_SELL_FILTERS.search}" oninput="updateShopSellModalFilters()">
                </div>
            </div>

            <!-- BATCH ACTION CONTROLS -->
            <div class="shop-sell-batch-bar">
                <div class="shop-sell-quick-btns">
                    <button class="shop-sell-btn-quick" onclick="selectAllFilteredMonsForSell()">☑️ Marcar Filtrados (${filteredMons.length})</button>
                    <button class="shop-sell-btn-quick" onclick="selectDuplicateMonsForSell()">🔁 Marcar Repetidos</button>
                    <button class="shop-sell-btn-quick" onclick="selectCommonMonsForSell()">⚪ Marcar Comuns</button>
                    <button class="shop-sell-btn-quick" onclick="clearAllMonsSelectedForSell()">❌ Desmarcar Todos</button>
                </div>
                <div style="font-size:11.5px;color:#94a3b8;margin-left:auto;">
                    Exibindo <strong style="color:#f1f5f9;">${filteredMons.length}</strong> de <strong style="color:#fde047;">${allPlayerMons.length}</strong> Pokémon
                </div>
            </div>
        </div>

        <!-- SCROLLABLE CARDS GRID -->
        <div class="shop-sell-cards-grid">
            ${filteredMons.length === 0 ? `
                <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; color: #94a3b8;">
                    <div style="font-size: 36px; margin-bottom: 8px;">🔍</div>
                    <div style="font-size: 14px; font-weight: 700; color: #cbd5e1;">Nenhum Pokémon encontrado nesta categoria</div>
                    <div style="font-size: 12px; margin-top: 4px; color: #64748b;">Tente ajustar a busca ou os filtros de qualidade/tipo acima.</div>
                </div>
            ` : filteredMons.map(mon => {
                const isLeader = mon.uid === leaderUid;
                const isSelected = SELECTION_SET_FOR_SELL.has(mon.uid);
                const goldVal = calculatePokemonGoldValue(mon);
                const pmdUrl = `/img/pmd/${mon.species_id}/Portrait.png`;
                const fallbackUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mon.dex_id || 25}.png`;
                const ivTotal = mon.iv_total || Object.values(mon.ivs || {}).reduce((a, b) => a + (typeof b === "number" ? b : 0), 0);

                return `
                    <div class="shop-sell-card ${isSelected ? 'is-selected' : ''} ${isLeader ? 'is-leader-mon' : ''}" 
                         onclick="if(!event.target.closest('button') && !event.target.closest('.shop-sell-checkbox')) toggleSelectMonForSell('${mon.uid}')">
                        <div class="shop-sell-card-top">
                            <div class="shop-sell-checkbox-wrap">
                                <input type="checkbox" class="shop-sell-checkbox" 
                                       ${isSelected ? 'checked' : ''} 
                                       ${isLeader ? 'disabled title="Líder do Time (Protegido)"' : ''} 
                                       onclick="event.stopPropagation()" 
                                       onchange="toggleSelectMonForSell('${mon.uid}')">
                            </div>
                            <div class="shop-sell-portrait-box">
                                <img src="${pmdUrl}" alt="${mon.name}" style="max-width:32px;max-height:32px;image-rendering:pixelated;" onerror="this.onerror=null;this.src='${fallbackUrl}';">
                                ${mon.is_shiny ? '<span style="position:absolute;top:-4px;right:-4px;font-size:11px;">✨</span>' : ''}
                            </div>
                            <div class="shop-sell-meta">
                                <div class="shop-sell-name-row">
                                    <span style="display:flex;align-items:center;gap:4px;">
                                        <span>${mon.name}</span>
                                        <span style="font-size:11px;color:#fde047;font-family:var(--font-mono);">Lv.${mon.level}</span>
                                    </span>
                                    <span class="shop-sell-origin-badge ${mon.isParty ? 'origin-party' : 'origin-box'}">
                                        ${isLeader ? '👑 Líder' : mon.isParty ? '🎒 Time #' + (mon.partyIdx + 1) : '📦 PC Box'}
                                    </span>
                                </div>
                                <div style="display:flex;justify-content:space-between;align-items:center;margin-top:3px;font-size:10px;color:#94a3b8;">
                                    <span class="spk-quality-badge quality-${(mon.quality || 'comum').toLowerCase()}">${mon.quality || 'Comum'}</span>
                                    <span>IVs: <strong style="color:#e2e8f0;">${ivTotal}/186</strong></span>
                                </div>
                            </div>
                        </div>

                        <div class="shop-sell-price-row">
                            <span style="font-size:11px;color:#94a3b8;">Valor de Resgate:</span>
                            <span class="shop-sell-gold-tag">+$${goldVal.toLocaleString()} Ouro</span>
                        </div>

                        <div class="shop-sell-card-actions">
                            ${isLeader ? `
                                <button class="btn" style="flex:1;font-size:11px;opacity:0.6;cursor:not-allowed;" disabled title="O Pokémon Líder não pode ser vendido. Troque o líder se desejar vendê-lo.">🔒 Líder Protegido</button>
                            ` : `
                                <button class="btn btn-gold" style="flex:1;font-size:11px;font-weight:800;" onclick="sellSinglePokemonToShop('${mon.uid}')">
                                    💰 Vender Avulso ($${goldVal.toLocaleString()})
                                </button>
                            `}
                        </div>
                    </div>
                `;
            }).join("")}
        </div>

        <!-- STICKY BOTTOM ACTION BAR -->
        <div class="pokemart-sell-bottom-bar">
            <div class="pokemart-sell-summary-stats">
                <span>Selecionados: <strong class="pokemart-sell-count-badge">${selectedCount}</strong></span>
                <span>•</span>
                <span>Total a Receber: <strong class="pokemart-sell-gold-total">+$${selectedGold.toLocaleString()} Ouro</strong></span>
            </div>
            <button class="pokemart-btn-batch-sell" onclick="sellSelectedPokemonToShop()" ${selectedCount === 0 ? "disabled" : ""}>
                <span>💰</span>
                <span>VENDER ${selectedCount} POKÉMON SELECIONADOS (+$${selectedGold.toLocaleString()} OURO)</span>
            </button>
        </div>
    `;
}
window.renderPokemartSellModal = renderPokemartSellModal;

function renderShopSellPokemonView() {
    const container = document.getElementById("gold-shop-grid-container");
    if (!container) return;

    const goldLbl = document.getElementById("shop-gold-label");
    if (goldLbl) goldLbl.textContent = `$${(STATE.player?.gold || 0).toLocaleString()}`;

    const party = STATE.player?.party || [];
    const leaderUid = party.length > 0 ? party[0].uid : null;
    const filteredMons = getFilteredMonsForSell();

    let selectedGold = 0;
    let selectedCount = 0;
    const allPlayerMons = [...party, ...(STATE.player?.pc_box || [])];
    SELECTION_SET_FOR_SELL.forEach(uid => {
        if (uid === leaderUid) return;
        const found = allPlayerMons.find(m => m.uid === uid);
        if (found) {
            selectedGold += calculatePokemonGoldValue(found);
            selectedCount++;
        }
    });

    container.innerHTML = `
        <div style="grid-column: 1 / -1; width: 100%;">
            <!-- HERO BANNER -->
            <div class="shop-sell-hero-banner">
                <div>
                    <div class="shop-sell-hero-title">
                        <span>🏪</span>
                        <span>Balcão de Resgate de Pokémon (PokéMart Oficial)</span>
                    </div>
                    <div class="shop-sell-hero-desc">
                        Venda seus Pokémon da <strong>Mochila</strong> ou do <strong>PC Box</strong> em troca de <strong>Ouro ($)</strong> imediato. O Líder do Time está protegido contra vendas acidentais.
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                    <button class="btn btn-gold" style="font-weight:900;padding:8px 16px;box-shadow:0 0 14px rgba(250,204,21,0.3);" onclick="openPokemartSellModal()">
                        🚀 Abrir Balcão Flutuante
                    </button>
                    <div style="text-align:right;">
                        <div style="font-size:11px;color:#94a3b8;">Total em Posse:</div>
                        <div style="font-size:15px;font-weight:900;color:#fde047;font-family:var(--font-mono);">${allPlayerMons.length} Pokémon</div>
                    </div>
                </div>
            </div>

            <!-- FILTERS CONTAINER -->
            <div class="shop-sell-filter-container">
                <div class="shop-sell-filter-grid">
                    <div class="shop-sell-filter-item">
                        <label>Origem / Localização</label>
                        <select id="shop-sell-filter-source" onchange="updateShopSellFilters()">
                            <option value="all" ${SHOP_SELL_FILTERS.source === "all" ? "selected" : ""}>📦 Todos (Mochila + PC)</option>
                            <option value="party" ${SHOP_SELL_FILTERS.source === "party" ? "selected" : ""}>🎒 Apenas Mochila (Time)</option>
                            <option value="box" ${SHOP_SELL_FILTERS.source === "box" ? "selected" : ""}>📦 Apenas PC Box</option>
                        </select>
                    </div>

                    <div class="shop-sell-filter-item">
                        <label>Tipo Elemental</label>
                        <select id="shop-sell-filter-type" onchange="updateShopSellFilters()">
                            <option value="all" ${SHOP_SELL_FILTERS.type === "all" ? "selected" : ""}>🌈 Todos os Tipos</option>
                            <option value="fire" ${SHOP_SELL_FILTERS.type === "fire" ? "selected" : ""}>🔥 Fogo</option>
                            <option value="water" ${SHOP_SELL_FILTERS.type === "water" ? "selected" : ""}>💧 Água</option>
                            <option value="grass" ${SHOP_SELL_FILTERS.type === "grass" ? "selected" : ""}>🌿 Planta</option>
                            <option value="electric" ${SHOP_SELL_FILTERS.type === "electric" ? "selected" : ""}>⚡ Elétrico</option>
                            <option value="normal" ${SHOP_SELL_FILTERS.type === "normal" ? "selected" : ""}>⚪ Normal</option>
                            <option value="psychic" ${SHOP_SELL_FILTERS.type === "psychic" ? "selected" : ""}>🔮 Psíquico</option>
                            <option value="ice" ${SHOP_SELL_FILTERS.type === "ice" ? "selected" : ""}>🧊 Gelo</option>
                            <option value="dragon" ${SHOP_SELL_FILTERS.type === "dragon" ? "selected" : ""}>🐲 Dragão</option>
                            <option value="ghost" ${SHOP_SELL_FILTERS.type === "ghost" ? "selected" : ""}>👻 Fantasma</option>
                            <option value="rock" ${SHOP_SELL_FILTERS.type === "rock" ? "selected" : ""}>🪨 Pedra</option>
                            <option value="ground" ${SHOP_SELL_FILTERS.type === "ground" ? "selected" : ""}>⛰️ Terra</option>
                            <option value="flying" ${SHOP_SELL_FILTERS.type === "flying" ? "selected" : ""}>🦅 Voador</option>
                            <option value="bug" ${SHOP_SELL_FILTERS.type === "bug" ? "selected" : ""}>🐛 Inseto</option>
                            <option value="poison" ${SHOP_SELL_FILTERS.type === "poison" ? "selected" : ""}>🧪 Venenoso</option>
                            <option value="fighting" ${SHOP_SELL_FILTERS.type === "fighting" ? "selected" : ""}>🥋 Lutador</option>
                            <option value="steel" ${SHOP_SELL_FILTERS.type === "steel" ? "selected" : ""}>⚙️ Aço</option>
                            <option value="dark" ${SHOP_SELL_FILTERS.type === "dark" ? "selected" : ""}>🌑 Noturno</option>
                            <option value="fairy" ${SHOP_SELL_FILTERS.type === "fairy" ? "selected" : ""}>✨ Fada</option>
                        </select>
                    </div>

                    <div class="shop-sell-filter-item">
                        <label>Raridade / Qualidade</label>
                        <select id="shop-sell-filter-quality" onchange="updateShopSellFilters()">
                            <option value="all" ${SHOP_SELL_FILTERS.quality === "all" ? "selected" : ""}>⭐ Todas as Qualidades</option>
                            <option value="Comum" ${SHOP_SELL_FILTERS.quality === "Comum" ? "selected" : ""}>Comum</option>
                            <option value="Incomum" ${SHOP_SELL_FILTERS.quality === "Incomum" ? "selected" : ""}>Incomum</option>
                            <option value="Raro" ${SHOP_SELL_FILTERS.quality === "Raro" ? "selected" : ""}>Raro</option>
                            <option value="Épico" ${SHOP_SELL_FILTERS.quality === "Épico" ? "selected" : ""}>Épico</option>
                            <option value="Lendário" ${SHOP_SELL_FILTERS.quality === "Lendário" ? "selected" : ""}>Lendário</option>
                            <option value="Mítico" ${SHOP_SELL_FILTERS.quality === "Mítico" ? "selected" : ""}>Mítico</option>
                        </select>
                    </div>

                    <div class="shop-sell-filter-item">
                        <label>Filtro Shiny</label>
                        <select id="shop-sell-filter-shiny" onchange="updateShopSellFilters()">
                            <option value="all" ${SHOP_SELL_FILTERS.shiny === "all" ? "selected" : ""}>✨ Todos</option>
                            <option value="non_shiny" ${SHOP_SELL_FILTERS.shiny === "non_shiny" ? "selected" : ""}>🛡️ Apenas Não-Shinies</option>
                            <option value="shiny_only" ${SHOP_SELL_FILTERS.shiny === "shiny_only" ? "selected" : ""}>✨ Somente Shinies</option>
                        </select>
                    </div>

                    <div class="shop-sell-filter-item">
                        <label>Ordenar Por</label>
                        <select id="shop-sell-filter-sort" onchange="updateShopSellFilters()">
                            <option value="gold_desc" ${SHOP_SELL_FILTERS.sort === "gold_desc" ? "selected" : ""}>💰 Maior Valor de Ouro</option>
                            <option value="gold_asc" ${SHOP_SELL_FILTERS.sort === "gold_asc" ? "selected" : ""}>💵 Menor Valor de Ouro</option>
                            <option value="lvl_desc" ${SHOP_SELL_FILTERS.sort === "lvl_desc" ? "selected" : ""}>📊 Maior Nível</option>
                            <option value="iv_desc" ${SHOP_SELL_FILTERS.sort === "iv_desc" ? "selected" : ""}>🧬 Maior Total de IVs</option>
                            <option value="name_asc" ${SHOP_SELL_FILTERS.sort === "name_asc" ? "selected" : ""}>🔤 Nome (A-Z)</option>
                        </select>
                    </div>

                    <div class="shop-sell-filter-item" style="grid-column: span 2;">
                        <label>Buscar Nome ou Espécie</label>
                        <input type="text" id="shop-sell-filter-search" placeholder="🔍 Ex: Pikachu, Charizard..." value="${SHOP_SELL_FILTERS.search}" oninput="updateShopSellFilters()">
                    </div>
                </div>

                <!-- BATCH ACTION CONTROLS -->
                <div class="shop-sell-batch-bar">
                    <div class="shop-sell-quick-btns">
                        <button class="shop-sell-btn-quick" onclick="selectAllFilteredMonsForSell()">☑️ Marcar Filtrados</button>
                        <button class="shop-sell-btn-quick" onclick="selectDuplicateMonsForSell()">🔁 Marcar Repetidos</button>
                        <button class="shop-sell-btn-quick" onclick="selectCommonMonsForSell()">⚪ Marcar Comuns</button>
                        <button class="shop-sell-btn-quick" onclick="clearAllMonsSelectedForSell()">❌ Desmarcar Todos</button>
                    </div>

                    <div style="display:flex;align-items:center;gap:12px;margin-left:auto;">
                        <div style="font-size:12px;color:#cbd5e1;">
                            Selecionados: <strong style="color:#fde047;">${selectedCount}</strong> • 
                            Total: <strong style="color:#4ade80;font-family:var(--font-mono);font-size:13px;">$${selectedGold.toLocaleString()} Ouro</strong>
                        </div>
                        <button class="btn btn-gold" style="font-weight:900;padding:7px 16px;box-shadow:0 0 14px rgba(250,204,21,0.25);" onclick="sellSelectedPokemonToShop()" ${selectedCount === 0 ? "disabled" : ""}>
                            💰 VENDER ${selectedCount} SELECIONADOS ($${selectedGold.toLocaleString()})
                        </button>
                    </div>
                </div>
            </div>

            <!-- CARDS GRID -->
            <div class="shop-sell-cards-grid">
                ${filteredMons.length === 0 ? `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8;">
                        <div style="font-size: 32px; margin-bottom: 6px;">🔍</div>
                        Nenhum Pokémon encontrado com os filtros atuais.
                    </div>
                ` : filteredMons.map(mon => {
                    const isLeader = mon.uid === leaderUid;
                    const isSelected = SELECTION_SET_FOR_SELL.has(mon.uid);
                    const goldVal = calculatePokemonGoldValue(mon);
                    const pmdUrl = `/img/pmd/${mon.species_id}/Portrait.png`;
                    const fallbackUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mon.dex_id || 25}.png`;
                    const ivTotal = mon.iv_total || Object.values(mon.ivs || {}).reduce((a, b) => a + (typeof b === "number" ? b : 0), 0);

                    return `
                        <div class="shop-sell-card ${isSelected ? 'is-selected' : ''} ${isLeader ? 'is-leader-mon' : ''}"
                             onclick="if(!event.target.closest('button') && !event.target.closest('.shop-sell-checkbox')) toggleSelectMonForSell('${mon.uid}')">
                            <div class="shop-sell-card-top">
                                <div class="shop-sell-checkbox-wrap">
                                    <input type="checkbox" class="shop-sell-checkbox" ${isSelected ? 'checked' : ''} ${isLeader ? 'disabled title="Líder do Time (Protegido)"' : ''} onclick="event.stopPropagation()" onchange="toggleSelectMonForSell('${mon.uid}')">
                                </div>
                                <div class="shop-sell-portrait-box">
                                    <img src="${pmdUrl}" alt="${mon.name}" style="max-width:32px;max-height:32px;image-rendering:pixelated;" onerror="this.onerror=null;this.src='${fallbackUrl}';">
                                    ${mon.is_shiny ? '<span style="position:absolute;top:-4px;right:-4px;font-size:11px;">✨</span>' : ''}
                                </div>
                                <div class="shop-sell-meta">
                                    <div class="shop-sell-name-row">
                                        <span style="display:flex;align-items:center;gap:4px;">
                                            <span>${mon.name}</span>
                                            <span style="font-size:11px;color:#fde047;font-family:var(--font-mono);">Lv.${mon.level}</span>
                                        </span>
                                        <span class="shop-sell-origin-badge ${mon.isParty ? 'origin-party' : 'origin-box'}">
                                            ${isLeader ? '👑 Líder' : mon.isParty ? '🎒 Time #' + (mon.partyIdx + 1) : '📦 PC Box'}
                                        </span>
                                    </div>
                                    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:3px;font-size:10px;color:#94a3b8;">
                                        <span class="spk-quality-badge quality-${(mon.quality || 'comum').toLowerCase()}">${mon.quality || 'Comum'}</span>
                                        <span>IVs: <strong style="color:#e2e8f0;">${ivTotal}/186</strong></span>
                                    </div>
                                </div>
                            </div>

                            <div class="shop-sell-price-row">
                                <span style="font-size:11px;color:#94a3b8;">Valor de Resgate:</span>
                                <span class="shop-sell-gold-tag">+$${goldVal.toLocaleString()} Ouro</span>
                            </div>

                            <div class="shop-sell-card-actions">
                                ${isLeader ? `
                                    <button class="btn" style="flex:1;font-size:11px;opacity:0.6;cursor:not-allowed;" disabled title="O Pokémon Líder não pode ser vendido. Troque o líder se desejar vendê-lo.">🔒 Líder Protegido</button>
                                ` : `
                                    <button class="btn btn-gold" style="flex:1;font-size:11px;font-weight:800;" onclick="sellSinglePokemonToShop('${mon.uid}')">
                                        💰 Vender p/ Loja ($${goldVal.toLocaleString()})
                                    </button>
                                `}
                            </div>
                        </div>
                    `;
                }).join("")}
            </div>
        </div>
    `;
}
window.renderShopSellPokemonView = renderShopSellPokemonView;

function sellSinglePokemonToShop(monUid) {
    if (!STATE.player) return;
    const party = STATE.player.party || [];
    const box = STATE.player.pc_box || [];

    const isPartyLeader = party.length > 0 && party[0].uid === monUid;
    if (isPartyLeader) {
        showToast("⚠️ O Pokémon Líder não pode ser vendido! Defina outro líder antes.");
        return;
    }

    const totalMons = party.length + box.length;
    if (totalMons <= 1) {
        showToast("⚠️ Você não pode vender seu único Pokémon restante!");
        return;
    }

    const pIdx = party.findIndex(m => m.uid === monUid);
    const bIdx = box.findIndex(m => m.uid === monUid);

    let mon = null;
    let isParty = false;
    if (pIdx !== -1) {
        mon = party[pIdx];
        isParty = true;
    } else if (bIdx !== -1) {
        mon = box[bIdx];
    } else {
        showToast("❌ Pokémon não encontrado no Time ou PC Box.");
        return;
    }

    const goldVal = calculatePokemonGoldValue(mon);
    const isSpecial = mon.is_shiny || mon.quality === "Mítico" || mon.quality === "Lendário" || mon.quality === "Épico";
    const msg = isSpecial
        ? `⚠️ ATENÇÃO: ${mon.is_shiny ? "✨ SHINY " : ""}${mon.name} (${mon.quality || "Especial"}) é muito raro!\n\nDeseja realmente vendê-lo para a Loja por $${goldVal.toLocaleString()} Ouro?`
        : `Vender ${mon.is_shiny ? "✨ " : ""}${mon.name} (Lv.${mon.level}) para a Loja por $${goldVal.toLocaleString()} Ouro?`;

    if (!confirm(msg)) return;

    if (isParty) {
        party.splice(pIdx, 1);
    } else {
        box.splice(bIdx, 1);
    }

    SELECTION_SET_FOR_SELL.delete(monUid);
    STATE.player.gold = (STATE.player.gold || 0) + goldVal;

    // Feedback
    if (typeof spawnFloatingText === "function" && STATE.tibia?.trainer) {
        spawnFloatingText(STATE.tibia.trainer.gx, STATE.tibia.trainer.gy, `+$${goldVal.toLocaleString()} Gold`, "#facc15");
    }
    if (typeof addCombatLog === "function") {
        addCombatLog(`<span style="color:#fde047;font-weight:800;">💰 [LOJA] Você vendeu <strong>${mon.is_shiny ? "✨ " : ""}${mon.name} (Lv.${mon.level})</strong> por <strong>$${goldVal.toLocaleString()} Ouro</strong>!</span>`);
    }
    showToast(`💰 Vendido com sucesso: ${mon.is_shiny ? "✨ " : ""}${mon.name} por $${goldVal.toLocaleString()} Ouro!`);

    scheduleStateSave(1200);

    // Refresh UI
    if (typeof renderPokemartSellModal === "function") renderPokemartSellModal();
    if (typeof renderShopSellPokemonView === "function") renderShopSellPokemonView();
    if (typeof renderBagModal === "function") renderBagModal();
    if (typeof renderGoldShop === "function") renderGoldShop();
    if (typeof renderPartyAndBox === "function") renderPartyAndBox();
    if (typeof renderTibiaPokebar === "function") renderTibiaPokebar();
    if (typeof renderHud === "function") renderHud();
}
window.sellSinglePokemonToShop = sellSinglePokemonToShop;

function sellSelectedPokemonToShop() {
    if (!STATE.player || SELECTION_SET_FOR_SELL.size === 0) {
        showToast("ℹ️ Selecione ao menos 1 Pokémon para vender.");
        return;
    }

    const party = STATE.player.party || [];
    const box = STATE.player.pc_box || [];
    const leaderUid = party.length > 0 ? party[0].uid : null;

    let totalGold = 0;
    const toSellList = [];

    for (const uid of SELECTION_SET_FOR_SELL) {
        if (uid === leaderUid) continue; // Skip leader
        const mon = party.find(m => m.uid === uid) || box.find(m => m.uid === uid);
        if (mon) {
            toSellList.push(mon);
            totalGold += calculatePokemonGoldValue(mon);
        }
    }

    if (toSellList.length === 0) {
        showToast("⚠️ Nenhum Pokémon elegível para venda entre os selecionados.");
        return;
    }

    const remainingCount = (party.length + box.length) - toSellList.length;
    if (remainingCount < 1) {
        showToast("⚠️ Você não pode vender todos os seus Pokémon! Mantenha pelo menos 1.");
        return;
    }

    const hasSpecial = toSellList.some(m => m.is_shiny || m.quality === "Mítico" || m.quality === "Lendário" || m.quality === "Épico");
    const confirmPrompt = hasSpecial
        ? `⚠️ ATENÇÃO: Dentre os ${toSellList.length} Pokémon selecionados, existem espécimes RAROS ou SHINIES!\n\nConfirmar venda de ${toSellList.length} Pokémon por um total de $${totalGold.toLocaleString()} Ouro?`
        : `Confirmar venda de ${toSellList.length} Pokémon selecionados por $${totalGold.toLocaleString()} Ouro?`;

    if (!confirm(confirmPrompt)) return;

    // Execute batch removal
    const uidsToSell = new Set(toSellList.map(m => m.uid));
    STATE.player.party = party.filter(m => !uidsToSell.has(m.uid));
    STATE.player.pc_box = box.filter(m => !uidsToSell.has(m.uid));
    STATE.player.gold = (STATE.player.gold || 0) + totalGold;
    SELECTION_SET_FOR_SELL.clear();

    if (typeof spawnFloatingText === "function" && STATE.tibia?.trainer) {
        spawnFloatingText(STATE.tibia.trainer.gx, STATE.tibia.trainer.gy, `+$${totalGold.toLocaleString()} Gold`, "#facc15");
    }
    if (typeof addCombatLog === "function") {
        addCombatLog(`<span style="color:#fde047;font-weight:900;">💰 [LOJA - VENDA EM LOTE] Você vendeu <strong>${toSellList.length} Pokémon</strong> por um total de <strong>$${totalGold.toLocaleString()} Ouro</strong>!</span>`);
    }
    showToast(`💰 Venda em Lote Concluída: ${toSellList.length} Pokémon vendidos por $${totalGold.toLocaleString()} Ouro!`);

    scheduleStateSave(1200);

    // Refresh UI everywhere
    if (typeof renderPokemartSellModal === "function") renderPokemartSellModal();
    if (typeof renderShopSellPokemonView === "function") renderShopSellPokemonView();
    if (typeof renderBagModal === "function") renderBagModal();
    if (typeof renderGoldShop === "function") renderGoldShop();
    if (typeof renderPartyAndBox === "function") renderPartyAndBox();
    if (typeof renderTibiaPokebar === "function") renderTibiaPokebar();
    if (typeof renderHud === "function") renderHud();
}
window.sellSelectedPokemonToShop = sellSelectedPokemonToShop;
