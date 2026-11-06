# PokéLand Custom Edition (`pokeland-clone`)

A high-performance standalone web RPG remake inspired by **PokéLand**, powered by an authentic extracted database (**400 Pokémon species**, **377 hunt zones across 4 worlds**, **617 moves**, **983 items**, **22 capsules**, **Dekao's Pokédex PvP ratings**, and official **HeartGold/SoulSilver 32-bit trainer sprites**).

## 🚀 Key Features

1. **Persistent SQLite 3 Database & Authentication**:
   - Secure login portal (`/login.html`) with PBKDF2-HMAC-SHA256 password encryption.
   - Individual player saves stored directly in `data/pokepixel.db`.
   - Character creation with 10 official HGSS trainer skins and 7 starter Pokémon.
2. **PokéLand MMORPG Engine**:
   - 60 FPS canvas with decoupled multi-frame PMD sprite animations (`Attack`, `Walk`, `Idle`, `Hurt`, `Faint`).
   - Wild Pokémon idle behaviors: emotion bubbles (`❤️`, `!`, `?`, `💤`, `🎵`, `💀`), hops, breathing squash-and-stretch.
   - Saffron Central Social Hub with trading center, evolution shrine, social lounges, and transit loadscreen.
3. **Optimized Client & Server Architecture**:
   - High-throughput static caching headers (`Cache-Control: public, max-age=86400`).
   - Debounced state synchronization preventing server request flooding during fast auto-hunting.
   - Throttled minimap radar rendering and dirty-checking rendering loops.
   - Resizable HUD bars and top menu bar with user-defined layouts saved in `localStorage`.

## 🎮 Quick Start

Double-click [`start_game.bat`](./start_game.bat) or run:

```powershell
python server.py
```

Then open **`http://localhost:8080`** or **`http://localhost:8080/login.html`** in your browser.

## 📁 Project Structure

- [`server.py`](./server.py) — Local Python HTTP & API server with SQLite database integration and static asset caching.
- [`db.py`](./db.py) — SQLite 3 relational database manager, user authentication, password hashing, and session token handling.
- [`public/index.html`](./public/index.html), [`public/styles.css`](./public/styles.css), [`public/app.js`](./public/app.js) — PokéLand game client, top menu bar, canvas rendering, and modal systems.
- [`public/login.html`](./public/login.html) — Dedicated retro-modern login and trainer registration portal.
- [`data/`](./data/) — SQLite database (`pokepixel.db`) and authentic game datasets (`species.json`, `items.json`, `worlds.json`, `zones.json`, `moves.json`).
