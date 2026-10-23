import { Outlet } from "react-router";
import Header from "./Header";
import "./pages.css";

// Parte comune a tutte le pagine: l'intestazione resta,
// al posto di <Outlet /> compare la pagina scelta dall'indirizzo
function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
