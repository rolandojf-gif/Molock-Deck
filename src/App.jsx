import { useMemo, useState } from "react";
import { CARDS } from "./data/cards";
import { INTELLIGENCE } from "./data/intelligence";

const MODE_CATEGORIES = {
  "Todo": null,
  "Abismo Cósmico": ["Tiempo cósmico", "Futuro profundo", "Fermi y cosmología"],
  "Guerra IA": ["Labs en guerra", "Señal IA del día", "AGI y Bostrom", "Duelos incómodos"],
  "Espejo Personal": ["Humano post-trabajo", "Moloch y teoría de juegos", "Preguntas para no dormir"],
  "Preguntas para no dormir": ["Preguntas para no dormir"],
};

const MODE_LIST = Object.keys(MODE_CATEGORIES);

const categories = ["Todas", ...Array.from(new Set(CARDS.map((card) => card.category)))];

const TREND_SYMBOL = {
  "up-strong": "▲▲",
  "up": "▲",
  "flat": "→",
  "down": "▼",
  "down-strong": "▼▼",
};

function getStoredFavorites() {
  try {
    return JSON.parse(localStorage.getItem("moloch-favorites")) || [];
  } catch {
    return [];
  }
}

function IntelCard({ card, variant = "primary" }) {
  return (
    <article className={`intel-card intel-card--${variant}`}>
      <header className="intel-head">
        <div className="intel-title-block">
          <h3 className="intel-title">{card.title}</h3>
          <span className="intel-subtitle">{card.subtitle}</span>
        </div>
        <span className={`intel-level intel-level--${card.level.toLowerCase()}`}>
          {card.level}
        </span>
      </header>

      <p className="intel-headline">{card.headline}</p>

      <ul className="intel-rows">
        {card.rows.map((row) => (
          <li key={row.name} className="intel-row">
            <span className={`intel-trend intel-trend--${row.trend}`}>
              {TREND_SYMBOL[row.trend] || "·"}
            </span>
            <span className="intel-row-name">{row.name}</span>
            <span className="intel-row-note">{row.note}</span>
          </li>
        ))}
      </ul>

      <footer className="intel-foot">
        <div className="intel-foot-row">
          <span className="intel-foot-label">Signal</span>
          <span>{card.signal}</span>
        </div>
        <div className="intel-foot-row">
          <span className="intel-foot-label">Risk / Opp</span>
          <span>{card.risk}</span>
        </div>
      </footer>
    </article>
  );
}

export default function App() {
  const [activeMode, setActiveMode] = useState("Todo");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [currentCard, setCurrentCard] = useState(CARDS[0]);
  const [favorites, setFavorites] = useState(getStoredFavorites());
  const [showFavorites, setShowFavorites] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedExpanded, setCopiedExpanded] = useState(false);
  const [deckOpen, setDeckOpen] = useState(false);

  const PROMPT_SUFFIX = `\n\nResponde en español de España. Quiero un análisis directo, técnico y sin suavidad corporativa. No me des una respuesta genérica ni motivacional. Si hay autoengaño, señálalo. Si mi premisa es floja, corrígela. Usa pensamiento de primeros principios, teoría de incentivos y consecuencias prácticas. Termina con una conclusión clara y accionable.`;

  const modeCards = useMemo(() => {
    const modeCats = MODE_CATEGORIES[activeMode];
    if (!modeCats) return CARDS;
    return CARDS.filter((card) => modeCats.includes(card.category));
  }, [activeMode]);

  const filteredCards = useMemo(() => {
    if (selectedCategory === "Todas") return modeCards;
    return modeCards.filter((card) => card.category === selectedCategory);
  }, [modeCards, selectedCategory]);

  const favoriteCards = CARDS.filter((card) => favorites.includes(card.id));
  const isFavorite = favorites.includes(currentCard.id);

  function selectMode(mode) {
    setActiveMode(mode);
    setSelectedCategory("Todas");
    setShowFavorites(false);
    setCopied(false);
    setCopiedExpanded(false);
  }

  function drawSimilarCard() {
    const pool = CARDS.filter((card) => card.category === currentCard.category);
    const candidates = pool.length > 1 ? pool.filter((card) => card.id !== currentCard.id) : pool;
    const nextIndex = Math.floor(Math.random() * candidates.length);
    setCurrentCard(candidates[nextIndex]);
    setShowFavorites(false);
    setCopied(false);
    setCopiedExpanded(false);
  }

  function drawCard() {
    const pool = filteredCards.length ? filteredCards : modeCards;
    const currentIndex = pool.findIndex((card) => card.id === currentCard.id);
    let nextIndex = Math.floor(Math.random() * pool.length);

    if (pool.length > 1 && nextIndex === currentIndex) {
      nextIndex = (nextIndex + 1) % pool.length;
    }

    setCurrentCard(pool[nextIndex]);
    setShowFavorites(false);
    setCopied(false);
    setCopiedExpanded(false);
  }

  function toggleFavorite() {
    const updated = isFavorite
      ? favorites.filter((id) => id !== currentCard.id)
      : [...favorites, currentCard.id];

    setFavorites(updated);
    localStorage.setItem("moloch-favorites", JSON.stringify(updated));
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(currentCard.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  async function copyExpandedPrompt() {
    await navigator.clipboard.writeText(currentCard.prompt + PROMPT_SUFFIX);
    setCopiedExpanded(true);
    setTimeout(() => setCopiedExpanded(false), 1400);
  }

  const visibleCards = showFavorites ? favoriteCards : [currentCard];

  return (
    <main className="app">
      <style>{`
        :root {
          --bg: #07070a;
          --surface: rgba(13, 13, 20, 0.82);
          --surface-2: rgba(255, 255, 255, 0.04);
          --border: rgba(255, 255, 255, 0.08);
          --border-strong: rgba(255, 255, 255, 0.16);
          --text: #f4f1ea;
          --text-dim: #a9a19a;
          --text-mute: #6f6962;
          --accent: #a99cff;
          --accent-warm: #ff8a9b;
          --mono: ui-monospace, "SF Mono", "JetBrains Mono", "Fira Code", Menlo, monospace;
          --green: #5ee7a3;
          --amber: #f5c451;
          --orange: #ff9354;
          --red: #ff5a72;
          --gray: #8a847d;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background:
            radial-gradient(circle at 12% 0%, rgba(116, 89, 255, 0.18), transparent 36%),
            radial-gradient(circle at 88% 18%, rgba(255, 90, 120, 0.10), transparent 32%),
            linear-gradient(180deg, #060609 0%, #050507 100%);
          background-attachment: fixed;
          color: var(--text);
        }

        .app {
          min-height: 100vh;
          padding: 36px 22px 64px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .shell {
          width: min(1180px, 100%);
        }

        /* ---------- Terminal header ---------- */

        .term-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
          justify-content: space-between;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-mute);
          padding: 10px 14px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface-2);
          margin-bottom: 22px;
        }

        .term-bar .live {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--accent);
        }

        .term-bar .live::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 8px var(--green);
          animation: pulse 1.8s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        .hero {
          margin-bottom: 28px;
        }

        .eyebrow {
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.22em;
          font-family: var(--mono);
          font-size: 11px;
          margin-bottom: 14px;
        }

        h1 {
          font-size: clamp(40px, 7vw, 72px);
          line-height: 0.92;
          margin: 0;
          letter-spacing: -0.05em;
          font-weight: 800;
        }

        .subtitle {
          color: var(--text-dim);
          font-size: 17px;
          max-width: 760px;
          margin: 16px 0 0;
          line-height: 1.5;
        }

        /* ---------- Moloch Signal banner ---------- */

        .signal-banner {
          margin: 24px 0 32px;
          padding: 24px 28px;
          border: 1px solid rgba(255, 90, 114, 0.32);
          border-left: 4px solid var(--red);
          border-radius: 14px;
          background:
            linear-gradient(90deg, rgba(255, 90, 114, 0.10), rgba(255, 90, 114, 0.02) 60%),
            rgba(13, 13, 20, 0.6);
        }

        .signal-banner .signal-label {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 10px;
        }

        .signal-banner blockquote {
          margin: 0;
          font-size: clamp(18px, 2.4vw, 22px);
          line-height: 1.4;
          font-weight: 500;
          color: #fbeae0;
        }

        .signal-banner .signal-context {
          margin-top: 10px;
          color: var(--text-dim);
          font-size: 13px;
          font-family: var(--mono);
        }

        /* ---------- Intelligence grid ---------- */

        .section-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-mute);
          margin: 36px 0 14px;
        }

        .section-label::after {
          content: "";
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .intel-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .intel-grid--secondary {
          grid-template-columns: 1fr;
        }

        .intel-card {
          border: 1px solid var(--border);
          background: var(--surface);
          border-radius: 14px;
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .intel-card:hover {
          border-color: var(--border-strong);
          transform: translateY(-1px);
        }

        .intel-head {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          justify-content: space-between;
        }

        .intel-title {
          margin: 0;
          font-size: 19px;
          letter-spacing: -0.02em;
          font-weight: 700;
        }

        .intel-subtitle {
          display: block;
          margin-top: 4px;
          color: var(--text-mute);
          font-size: 12px;
          font-family: var(--mono);
          letter-spacing: 0.05em;
        }

        .intel-level {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 5px 9px;
          border-radius: 999px;
          border: 1px solid currentColor;
          flex-shrink: 0;
        }

        .intel-level--low { color: var(--green); }
        .intel-level--medium { color: var(--amber); }
        .intel-level--high { color: var(--orange); }
        .intel-level--extreme {
          color: var(--red);
          background: rgba(255, 90, 114, 0.08);
        }

        .intel-headline {
          margin: 0;
          color: #ece6dc;
          font-size: 14.5px;
          line-height: 1.5;
        }

        .intel-rows {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid var(--border);
          padding-top: 12px;
        }

        .intel-row {
          display: grid;
          grid-template-columns: 28px 130px 1fr;
          gap: 10px;
          align-items: baseline;
          font-size: 13px;
          line-height: 1.45;
        }

        .intel-trend {
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 700;
          text-align: center;
        }

        .intel-trend--up,
        .intel-trend--up-strong { color: var(--green); }
        .intel-trend--flat { color: var(--gray); }
        .intel-trend--down,
        .intel-trend--down-strong { color: var(--red); }

        .intel-row-name {
          font-weight: 600;
          color: var(--text);
          font-size: 13px;
        }

        .intel-row-note {
          color: var(--text-dim);
        }

        .intel-foot {
          border-top: 1px dashed var(--border);
          padding-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 13px;
        }

        .intel-foot-row {
          display: grid;
          grid-template-columns: 90px 1fr;
          gap: 12px;
          align-items: baseline;
          color: var(--text-dim);
        }

        .intel-foot-label {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent);
        }

        /* ---------- Deck collapse ---------- */

        .deck-toggle {
          margin-top: 48px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 16px 22px;
          border: 1px solid var(--border);
          border-radius: 14px;
          background: var(--surface-2);
          color: var(--text);
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .deck-toggle:hover {
          border-color: var(--border-strong);
          background: rgba(255, 255, 255, 0.06);
        }

        .deck-toggle .chev {
          font-family: var(--mono);
          color: var(--accent);
        }

        .deck-section {
          margin-top: 22px;
        }

        /* ---------- Conversation deck (preserved) ---------- */

        .modes {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 0 0 16px;
        }

        .mode-btn {
          font-size: 13px;
          padding: 8px 16px;
        }

        .mode-btn.active {
          background: rgba(169, 156, 255, 0.22);
          border-color: rgba(169, 156, 255, 0.6);
          color: #d0c8ff;
        }

        .controls {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          margin: 0 0 22px;
        }

        .counter {
          color: var(--text-dim);
          margin: 0 0 18px;
          font-size: 13px;
          font-family: var(--mono);
        }

        select,
        button {
          border: 1px solid var(--border-strong);
          background: rgba(255, 255, 255, 0.06);
          color: var(--text);
          padding: 11px 14px;
          border-radius: 999px;
          font-size: 14px;
          font-family: inherit;
        }

        select { min-width: 210px; }

        button {
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease, border 0.15s ease;
        }

        button:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.11);
          border-color: rgba(255, 255, 255, 0.28);
        }

        .primary {
          background: linear-gradient(135deg, #8d7cff, #ff6680);
          color: white;
          border: none;
          font-weight: 700;
        }

        .card {
          border: 1px solid var(--border);
          background: var(--surface);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: clamp(22px, 4vw, 36px);
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.42);
          animation: rise 0.28s ease both;
        }

        @keyframes rise {
          from { opacity: 0; transform: translateY(10px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .category {
          display: inline-flex;
          color: var(--accent);
          border: 1px solid rgba(169, 156, 255, 0.25);
          background: rgba(169, 156, 255, 0.08);
          padding: 7px 11px;
          border-radius: 999px;
          font-size: 12px;
          font-family: var(--mono);
          letter-spacing: 0.06em;
          margin-bottom: 16px;
        }

        h2 {
          font-size: clamp(26px, 4vw, 42px);
          margin: 0 0 22px;
          letter-spacing: -0.04em;
          line-height: 1.05;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .section {
          border-top: 1px solid var(--border);
          padding-top: 16px;
        }

        .section.full { grid-column: 1 / -1; }

        .label {
          color: #ffb3c0;
          font-size: 11px;
          font-family: var(--mono);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          margin-bottom: 8px;
        }

        p {
          color: #e5ded3;
          line-height: 1.6;
          margin: 0;
        }

        .prompt {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 16px;
          color: #f6efe6;
          font-size: 14px;
        }

        .metrics {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 22px;
        }

        .metric {
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 8px 12px;
          color: var(--text-dim);
          background: rgba(255, 255, 255, 0.04);
          font-size: 12px;
          font-family: var(--mono);
        }

        .empty {
          color: var(--text-dim);
          padding: 26px;
          border: 1px dashed rgba(255,255,255,0.2);
          border-radius: 18px;
        }

        /* ---------- Responsive ---------- */

        @media (max-width: 900px) {
          .intel-grid { grid-template-columns: 1fr; }
          .intel-row { grid-template-columns: 24px 110px 1fr; }
        }

        @media (max-width: 760px) {
          .app { padding: 24px 14px 48px; }
          .grid { grid-template-columns: 1fr; }
          .modes { flex-direction: column; }
          .controls { align-items: stretch; flex-direction: column; }
          select, button { width: 100%; }
          .intel-foot-row { grid-template-columns: 1fr; gap: 4px; }
          .intel-row { grid-template-columns: 22px 1fr; }
          .intel-row-note { grid-column: 1 / -1; padding-left: 32px; color: var(--text-mute); }
        }
      `}</style>

      <div className="shell">

        {/* ---------- TERMINAL HEADER ---------- */}

        <div className="term-bar">
          <span className="live">Live signal</span>
          <span>Cycle: {INTELLIGENCE.cycle}</span>
          <span>Generated: {INTELLIGENCE.generatedAt}</span>
        </div>

        <section className="hero">
          <div className="eyebrow">Moloch Sonríe · Intelligence Terminal</div>
          <h1>Moloch Deck</h1>
          <p className="subtitle">
            Mapa estratégico de la carrera IA global. Frontier labs, compute, chips, energía,
            geopolítica y trabajo cognitivo, leídos como un único tablero de poder tecnológico.
          </p>
        </section>

        {/* ---------- MOLOCH SIGNAL ---------- */}

        <div className="signal-banner">
          <div className="signal-label">{INTELLIGENCE.signal.title} · {INTELLIGENCE.signal.timestamp || INTELLIGENCE.cycle}</div>
          <blockquote>"{INTELLIGENCE.signal.quote}"</blockquote>
          <div className="signal-context">{INTELLIGENCE.signal.context}</div>
        </div>

        {/* ---------- PRIMARY GRID ---------- */}

        <div className="section-label">Primary intelligence · 6 vectors</div>
        <div className="intel-grid">
          {INTELLIGENCE.primary.map((card) => (
            <IntelCard key={card.id} card={card} variant="primary" />
          ))}
        </div>

        {/* ---------- SECONDARY ---------- */}

        <div className="section-label">Secondary indicators</div>
        <div className="intel-grid intel-grid--secondary">
          {INTELLIGENCE.secondary.map((card) => (
            <IntelCard key={card.id} card={card} variant="secondary" />
          ))}
        </div>

        {/* ---------- DECK TOGGLE ---------- */}

        <button
          className="deck-toggle"
          onClick={() => setDeckOpen(!deckOpen)}
          aria-expanded={deckOpen}
        >
          <span>Conversation Deck · {CARDS.length} cartas</span>
          <span className="chev">{deckOpen ? "△ Ocultar" : "▽ Abrir"}</span>
        </button>

        {deckOpen && (
          <section className="deck-section">
            <div className="modes">
              {MODE_LIST.map((mode) => (
                <button
                  key={mode}
                  className={`mode-btn${activeMode === mode ? " active" : ""}`}
                  onClick={() => selectMode(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>

            <section className="controls">
              <select
                value={selectedCategory}
                onChange={(event) => {
                  setSelectedCategory(event.target.value);
                  setShowFavorites(false);
                  setCopied(false);
                  setCopiedExpanded(false);
                }}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>

              <button className="primary" onClick={drawCard}>
                Robar carta
              </button>

              <button onClick={drawSimilarCard}>
                Más como esta
              </button>

              <button onClick={copyPrompt}>
                {copied ? "Prompt copiado" : "Copiar prompt"}
              </button>

              <button onClick={copyExpandedPrompt}>
                {copiedExpanded ? "Prompt ampliado copiado" : "Copiar prompt ampliado"}
              </button>

              <button onClick={toggleFavorite}>
                {isFavorite ? "Quitar favorita" : "Guardar favorita"}
              </button>

              <button onClick={() => setShowFavorites(!showFavorites)}>
                {showFavorites ? "Volver a la carta" : `Favoritas (${favorites.length})`}
              </button>
            </section>

            <p className="counter">
              Cartas disponibles en esta selección: {filteredCards.length} / {CARDS.length}
            </p>

            {showFavorites && favoriteCards.length === 0 ? (
              <div className="empty">
                Todavía no has guardado favoritas. Moloch está decepcionado, pero se recuperará.
              </div>
            ) : (
              visibleCards.map((card) => (
                <article className="card" key={card.id}>
                  <div className="category">{card.category}</div>
                  <h2>{card.title}</h2>

                  <div className="grid">
                    <section className="section">
                      <div className="label">Idea central</div>
                      <p>{card.coreIdea}</p>
                    </section>

                    <section className="section">
                      <div className="label">Por qué importa</div>
                      <p>{card.whyItMatters}</p>
                    </section>

                    <section className="section full">
                      <div className="label">Pregunta incómoda</div>
                      <p>{card.question}</p>
                    </section>

                    <section className="section full">
                      <div className="label">Prompt listo para IA</div>
                      <p className="prompt">{card.prompt}</p>
                    </section>
                  </div>

                  <div className="metrics">
                    <div className="metric">Carta: {card.id} / {CARDS.length}</div>
                    <div className="metric">Vértigo: {card.vertigo}/5</div>
                    <div className="metric">Bullshit: {card.bullshit}/5</div>
                  </div>
                </article>
              ))
            )}
          </section>
        )}
      </div>
    </main>
  );
}
