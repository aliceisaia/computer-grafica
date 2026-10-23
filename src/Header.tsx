import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router";
import logo from "./assets/logo.svg";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/ingredienti", label: "Ingredienti", end: false },
  { to: "/chi-siamo", label: "Chi siamo", end: false },
];

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // Nella home l'intestazione è grande, nelle altre pagine è compatta
  const compact = pathname !== "/";

  // Il testo cercato sta nell'indirizzo (/?q=pasta), non in uno stato
  const query = params.get("q") ?? "";

  const handleChange = (value: string) => {
    navigate(value === "" ? "/" : `/?q=${encodeURIComponent(value)}`, {
      replace: true,
    });
  };

  return (
    <header className={compact ? "site-header site-header--compact" : "site-header"}>
      <Link to="/" className="site-header__brand">
        <span className="site-header__title">Topolino vuole il bis</span>
        <img src={logo} alt="" width={48} height={48} />
      </Link>

      <div className="site-header__bar">
        <nav aria-label="Principale">
          <ul className="nav">
            {links.map((link) => (
              <li key={link.to}>
                {/* NavLink aggiunge da solo aria-current="page" al link della pagina aperta */}
                <NavLink to={link.to} end={link.end}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <form role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search" className="visually-hidden">
            Cerca per titolo del film o del piatto
          </label>
          <input
            id="search"
            type="search"
            placeholder="cerca"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
          />
        </form>
      </div>
    </header>
  );
}

export default Header;
