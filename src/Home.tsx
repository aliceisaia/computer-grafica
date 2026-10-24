import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { formatDuration, recipes } from "./recipes";
import type { Difficulty, Recipe, Studio } from "./types";
import "./home.css";

const studios: { id: Studio; label: string }[] = [
  { id: "disney", label: "Disney" },
  { id: "dreamworks", label: "DreamWorks" },
  { id: "nickelodeon", label: "Nickelodeon" },
  { id: "altri", label: "Altri cartoni" },
];

const difficulties: Difficulty[] = ["facile", "media", "difficile"];
const maxTimes = [30, 60, 120];
const tasteOptions = [...new Set(recipes.flatMap((r) => r.taste))];

type Filters = {
  tastes: string[];
  difficulty: Difficulty | null;
  maxTime: number | null;
};

const noFilters: Filters = { tastes: [], difficulty: null, maxTime: null };

/* ---------- Card di una ricetta ---------- */
function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="card">
      <Link to={`/ricette/${recipe.slug}`} className="card__link">
        <img
          src={`/${recipe.image}`}
          alt={recipe.title}
          width={240}
          height={160}
          loading="lazy"
        />
        <h3 className="card__title">{recipe.title}</h3>
      </Link>
      <p className="card__film">{recipe.film}</p>
      <p className="card__meta">
        {formatDuration(recipe.totalTimeMinutes)} · {recipe.difficulty}
      </p>
      <ul className="badges">
        {recipe.taste.map((t) => (
          <li key={t} className="badge">
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ---------- Una riga per studio (Disney, DreamWorks, ...) ---------- */
function StudioRow({ id, label, items }: { id: string; label: string; items: Recipe[] }) {
  const headingId = `studio-${label}`;
  return (
      <section aria-labelledby={headingId} className={`studio-row studio-row--${id}`}>
      <h2 id={headingId}>{label}</h2>
      <ul className="studio-row__list">
        {items.map((recipe) => (
          <li key={recipe.slug}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Pannello filtri laterale ---------- */
type FilterPanelProps = {
  filters: Filters;
  onChange: (filters: Filters) => void;
};

function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const toggleTaste = (taste: string) =>
    onChange({
      ...filters,
      tastes: filters.tastes.includes(taste)
        ? filters.tastes.filter((t) => t !== taste)
        : [...filters.tastes, taste],
    });

  return (
    <aside id="filters" className="filters" aria-label="Filtri">
      <fieldset>
        <legend>Di che cosa hai voglia?</legend>
        {tasteOptions.map((taste) => (
          <label key={taste} className="filters__check">
            <input
              type="checkbox"
              checked={filters.tastes.includes(taste)}
              onChange={() => toggleTaste(taste)}
            />
            {taste}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Difficoltà</legend>
        <div className="chips">
          {difficulties.map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={filters.difficulty === d}
              onClick={() =>
                onChange({
                  ...filters,
                  difficulty: filters.difficulty === d ? null : d,
                })
              }
            >
              {d}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Tempo di preparazione</legend>
        <div className="chips">
          {maxTimes.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={filters.maxTime === t}
              onClick={() =>
                onChange({ ...filters, maxTime: filters.maxTime === t ? null : t })
              }
            >
              fino a {t} min
            </button>
          ))}
        </div>
      </fieldset>

      <button type="button" className="filters__reset" onClick={() => onChange(noFilters)}>
        Azzera filtri
      </button>
    </aside>
  );
}

/* ---------- La pagina Home ---------- */
function Home() {
  // il testo cercato arriva dall'indirizzo: /?q=pasta
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";

  const [filters, setFilters] = useState<Filters>(noFilters);
  const [panelOpen, setPanelOpen] = useState(false);

  // stato derivato: si ricalcola a ogni render, non si memorizza
  const q = query.trim().toLowerCase();
  const visible = recipes.filter(
    (r) =>
      (q === "" ||
        r.title.toLowerCase().includes(q) ||
        r.film.toLowerCase().includes(q)) &&
      (filters.tastes.length === 0 ||
        filters.tastes.some((t) => r.taste.includes(t))) &&
      (filters.difficulty === null || r.difficulty === filters.difficulty) &&
      (filters.maxTime === null || r.totalTimeMinutes <= filters.maxTime),
  );

  const activeCount =
    filters.tastes.length +
    (filters.difficulty !== null ? 1 : 0) +
    (filters.maxTime !== null ? 1 : 0);

  return (
    <div className="home">
      <h1 className="visually-hidden">Ricette dei cartoni animati</h1>

      <div className="home__toolbar">
        <p aria-live="polite">
          {visible.length} di {recipes.length} ricette
        </p>
        <button
          type="button"
          aria-expanded={panelOpen}
          aria-controls="filters"
          onClick={() => setPanelOpen(!panelOpen)}
        >
          Filtri{activeCount > 0 && ` (${activeCount})`}
        </button>
      </div>

      <div className={panelOpen ? "home__layout home__layout--panel" : "home__layout"}>
        <div>
          {visible.length === 0 && (
            <p className="empty">Nessuna ricetta trovata: prova a cambiare ricerca o filtri.</p>
          )}
          {studios.map((studio) => {
            const items = visible.filter((r) => r.studio === studio.id);
            return items.length > 0 ? (
              <StudioRow key={studio.id} id={studio.id} label={studio.label} items={items} />
            ) : null;
          })}
        </div>

        {panelOpen && <FilterPanel filters={filters} onChange={setFilters} />}
      </div>
    </div>
  );
}

export default Home;
