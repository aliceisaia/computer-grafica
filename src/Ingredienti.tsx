import { recipes } from "./recipes";

// Tutti gli ingredienti del JSON, senza doppioni, in ordine alfabetico
const names = [
  ...new Set(recipes.flatMap((r) => r.ingredients.map((i) => i.name))),
].sort((a, b) => a.localeCompare(b, "it"));

function Ingredienti() {
  return (
    <div className="page">
      <h1>Ingredienti</h1>
      <p>
        Qui costruiremo la selezione degli ingredienti dello schizzo. Per ora
        elenchiamo quelli presenti nelle ricette.
      </p>
      <ul className="ingredient-list">
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Ingredienti;
