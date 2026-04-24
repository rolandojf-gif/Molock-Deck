import { useMemo, useState } from "react";
import { CARDS } from "./data/cards";

const MODE_CATEGORIES = {
  "Todo": null,
  "Abismo Cósmico": ["Tiempo cósmico", "Futuro profundo", "Fermi y cosmología"],
  "Guerra IA": ["Labs en guerra", "Señal IA del día", "AGI y Bostrom", "Duelos incómodos"],
  "Espejo Personal": ["Humano post-trabajo", "Moloch y teoría de juegos", "Preguntas para no dormir"],
  "Preguntas para no dormir": ["Preguntas para no dormir"],
};

const MODE_LIST = Object.keys(MODE_CATEGORIES);

const categories = ["Todas", ...Array.from(new Set(CARDS.map((card) => card.category)))];

function getStoredFavorites() {
  try {
    return JSON.parse(localStorage.getItem("moloch-favorites")) || [];
  } catch {
    return [];
  }
}

export default function App() {
  const [activeMode, setActiveMode] = useState("Todo");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [currentCard, setCurrentCard] = useState(CARDS[0]);
  const [favorites, setFavorites] = useState(getStoredFavorites());
  const [showFavorites, setShowFavorites] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const visibleCards = showFavorites ? favoriteCards : [currentCard];

  return (
    <main className="app">
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background:
            radial-gradient(circle at top left, rgba(116, 89, 255, 0.22), transparent 34%),
            radial-gradient(circle at bottom right, rgba(255, 90, 120, 0.12), transparent 30%),
            #07070a;
          color: #f4f1ea;
        }

        .app {
          min-height: 100vh;
          padding: 48px 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .shell {
          width: min(980px, 100%);
        }

        .hero {
          margin-bottom: 28px;
        }

        .eyebrow {
          color: #a99cff;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 12px;
          margin-bottom: 12px;
        }

        h1 {
          font-size: clamp(42px, 8vw, 84px);
          line-height: 0.9;
          margin: 0;
          letter-spacing: -0.07em;
        }

        .subtitle {
          color: #c7c0b6;
          font-size: 18px;
          max-width: 720px;
          margin: 18px 0 0;
        }

        .modes {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 28px 0 16px;
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
          margin: 0 0 28px;
        }

        .counter {
          color: #a9a19a;
          margin: -14px 0 22px;
          font-size: 14px;
        }

        select,
        button {
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.08);
          color: #f4f1ea;
          padding: 12px 14px;
          border-radius: 999px;
          font-size: 15px;
        }

        select {
          min-width: 210px;
        }

        button {
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease, border 0.15s ease;
        }

        button:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.13);
          border-color: rgba(255, 255, 255, 0.26);
        }

        .primary {
          background: linear-gradient(135deg, #8d7cff, #ff6680);
          color: white;
          border: none;
          font-weight: 700;
        }

        .card {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(13, 13, 20, 0.82);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: clamp(22px, 4vw, 42px);
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.42);
          animation: rise 0.28s ease both;
        }

        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.99);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .category {
          display: inline-flex;
          color: #a99cff;
          border: 1px solid rgba(169, 156, 255, 0.25);
          background: rgba(169, 156, 255, 0.08);
          padding: 7px 11px;
          border-radius: 999px;
          font-size: 13px;
          margin-bottom: 18px;
        }

        h2 {
          font-size: clamp(30px, 5vw, 54px);
          margin: 0 0 24px;
          letter-spacing: -0.05em;
          line-height: 1;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .section {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 18px;
        }

        .section.full {
          grid-column: 1 / -1;
        }

        .label {
          color: #ffb3c0;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin-bottom: 8px;
        }

        p {
          color: #e5ded3;
          line-height: 1.6;
          margin: 0;
        }

        .prompt {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          padding: 16px;
          color: #f6efe6;
        }

        .metrics {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
        }

        .metric {
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          padding: 9px 12px;
          color: #d9d1c7;
          background: rgba(255, 255, 255, 0.06);
        }

        .empty {
          color: #c7c0b6;
          padding: 28px;
          border: 1px dashed rgba(255,255,255,0.2);
          border-radius: 22px;
        }

        @media (max-width: 760px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .modes {
            flex-direction: column;
          }

          .controls {
            align-items: stretch;
            flex-direction: column;
          }

          select,
          button {
            width: 100%;
          }
        }
      `}</style>

      <div className="shell">
        <section className="hero">
          <div className="eyebrow">Moloch sonríe</div>
          <h1>Moloch Deck</h1>
          <p className="subtitle">
            Cartas para iniciar conversaciones que no deberías abrir si querías dormir pronto.
          </p>
        </section>

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
            }}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          <button className="primary" onClick={drawCard}>
            Robar carta
          </button>

          <button onClick={copyPrompt}>
            {copied ? "Copiado. Ya no hay vuelta atrás." : "Copiar prompt"}
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
      </div>
    </main>
  );
}
