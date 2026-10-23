import { Link } from "react-router";

function NotFound() {
  return (
    <div className="page">
      <h1>Pagina non trovata</h1>
      <p>L'indirizzo che hai scritto non esiste, o la ricetta è stata spostata.</p>
      <p>
        <Link to="/">Torna alla home</Link>
      </p>
    </div>
  );
}

export default NotFound;
