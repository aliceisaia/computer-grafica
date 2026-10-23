import { Link, useParams } from "react-router";
import { formatDuration, recipes } from "./recipes";
import NotFound from "./NotFound";
import type { Ingredient } from "./types";

function formatIngredient(i: Ingredient): string {
  return [i.quantity, i.unit, i.name]
    .filter((part) => part !== null && part !== "")
    .join(" ");
}

function Ricetta() {
  // :slug nell'indirizzo /ricette/:slug finisce qui
  const { slug } = useParams();
  const recipe = recipes.find((r) => r.slug === slug);

  // un indirizzo che non corrisponde a nessuna ricetta è un caso normale
  if (!recipe) return <NotFound />;

  return (
    <div className="page recipe">
      <p>
        <Link to="/">← Tutte le ricette</Link>
      </p>

      <div className="recipe__top">
        <img src={`/${recipe.image}`} alt={recipe.title} width={480} height={320} />
        <div>
          <h1>{recipe.title}</h1>
          <p className="recipe__meta">
            {recipe.film} · {formatDuration(recipe.totalTimeMinutes)} ·{" "}
            {recipe.difficulty} · {recipe.numberPeople} persone
          </p>
          <p>{recipe.description}</p>
        </div>
      </div>

      <h2>Ingredienti</h2>
      <ul>
        {recipe.ingredients.map((i) => (
          <li key={i.id}>{formatIngredient(i)}</li>
        ))}
      </ul>

      <h2>Preparazione</h2>
      <ol>
        {recipe.steps.map((step) => (
          <li key={step.id}>{step.text}</li>
        ))}
      </ol>
    </div>
  );
}

export default Ricetta;
