import { useState } from "react";
import { recipes } from "./recipes";

// Estraiamo gli ID univoci e li ordiniamo
const ids = [
  ...new Set(recipes.flatMap((r) => r.ingredients.map((i) => i.id))),
].sort((a, b) => a.localeCompare(b, "it"));

// Funzione per rendere i nomi belli (es. farina-00 -> Farina 00)
const formatName = (id: string) => 
  id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

function Ingredienti() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const MAX_INGREDIENTI = 3;

  const toggleIngredient = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    } else {
      if (selectedIds.length < MAX_INGREDIENTI) {
        setSelectedIds((prev) => [...prev, id]);
      } else {
        alert(`Puoi selezionare al massimo ${MAX_INGREDIENTI} ingredienti!`);
      }
    }
  };

  const removeIngredient = (id: string) => {
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  // Filtro per la ricerca
  const filteredIds = ids.filter((id) => 
    formatName(id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logica per trovare le ricette che contengono TUTTI gli ingredienti scelti
  const matchingRecipes = selectedIds.length > 0 
    ? recipes.filter((recipe) => {
        const recipeIngredientIds = recipe.ingredients.map((i) => i.id);
        return selectedIds.every((selectedId) => recipeIngredientIds.includes(selectedId));
      })
    : [];

  return (
    <div className="page" style={{ paddingBottom: "50px" }}>
      <h1>Ingredienti</h1>
      <p>Seleziona fino a un massimo di {MAX_INGREDIENTI} ingredienti che hai in casa per scoprire cosa preparare.</p>

      {/* AREA RIEPILOGO */}
      <div style={{ marginBottom: "30px", padding: "20px", backgroundColor: "#222", borderRadius: "8px", border: "1px solid #333" }}>
        <h3 style={{ marginTop: 0, fontSize: "1.1rem", color: "#eee" }}>
          Hai selezionato ({selectedIds.length}/{MAX_INGREDIENTI}):
        </h3>
        {selectedIds.length === 0 ? (
          <p style={{ color: "#888", margin: 0 }}>Nessun ingrediente selezionato. Scegline qualcuno qui sotto!</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {selectedIds.map((id) => (
              <div key={id} style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#fff", color: "#000", padding: "6px 12px", borderRadius: "20px", fontWeight: "bold" }}>
                {formatName(id)}
                <button 
                  onClick={() => removeIngredient(id)}
                  style={{ background: "none", border: "none", color: "#d32f2f", cursor: "pointer", fontSize: "1.1rem", padding: 0, display: "flex" }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BARRA DI RICERCA */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Cerca un ingrediente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "12px 16px",
            fontSize: "1rem",
            backgroundColor: "#222",
            border: "1px solid #444",
            borderRadius: "8px",
            color: "#fff",
            outline: "none",
            boxSizing: "border-box"
          }}
        />
      </div>

      {/* GRIGLIA INGREDIENTI (Sistemata e a prova di errore) */}
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
          gap: "12px", 
          marginBottom: "40px",
          maxHeight: "450px", 
          overflowY: "auto",
          paddingRight: "10px"
        }}
      >
        {filteredIds.length > 0 ? (
          filteredIds.map((id) => {
            const isSelected = selectedIds.includes(id);
            return (
              <label 
                key={id} 
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  backgroundColor: isSelected ? "#333" : "#1e1e1e",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  border: isSelected ? "1px solid #fff" : "1px solid #333",
                  transition: "all 0.2s",
                  boxSizing: "border-box"
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleIngredient(id)}
                  disabled={selectedIds.length >= MAX_INGREDIENTI && !isSelected}
                  style={{ 
                    width: "18px", 
                    height: "18px", 
                    cursor: "pointer",
                    accentColor: "#fff",
                    margin: 0
                  }}
                />
                <span style={{ fontSize: "1rem", color: "#fff" }}>{formatName(id)}</span>
              </label>
            );
          })
        ) : (
          <p style={{ color: "#888" }}>Nessun ingrediente trovato per "{searchTerm}".</p>
        )}
      </div>

      {/* SEZIONE RISULTATI */}
      {selectedIds.length > 0 && (
        <div style={{ borderTop: "1px solid #444", paddingTop: "20px" }}>
          <h2>Ricette che puoi preparare:</h2>
          
          {matchingRecipes.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {matchingRecipes.map((recipe) => (
                <li key={recipe.id} style={{ backgroundColor: "#222", padding: "15px", borderRadius: "6px", marginBottom: "10px", fontSize: "1.1rem", border: "1px solid #333" }}>
                  <strong style={{ color: "#fff" }}>{recipe.title}</strong> <span style={{ color: "#888" }}>({recipe.film})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#ff6b6b", backgroundColor: "rgba(255, 107, 107, 0.1)", padding: "15px", borderRadius: "8px", border: "1px solid #ff6b6b" }}>
              Nessuna ricetta trovata con questa combinazione. Prova a togliere un ingrediente!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Ingredienti;