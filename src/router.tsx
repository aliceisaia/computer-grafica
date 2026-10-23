import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Home from "./Home";
import Ingredienti from "./Ingredienti";
import ChiSiamo from "./ChiSiamo";
import Ricetta from "./Ricetta";
import NotFound from "./NotFound";

// La mappa del sito: ogni indirizzo (path) mostra un componente
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // /
      { path: "ingredienti", element: <Ingredienti /> }, // /ingredienti
      { path: "chi-siamo", element: <ChiSiamo /> }, // /chi-siamo
      { path: "ricette/:slug", element: <Ricetta /> }, // /ricette/krabby-patty
      { path: "*", element: <NotFound /> }, // qualsiasi altro indirizzo
    ],
  },
]);
