import "./Header.css";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Destinations",
      path: "/destinations",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];
  const pageLocation = useLocation();
  const navigate = useNavigate();

  function toggleSidebar() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  function isNotHome() {
    if (pageLocation.pathname === "/") {
      return false;
    } else {
      return true;
    }
  }

  return (
    <header className={`header ${isNotHome() ? "header--solid" : ""}`}>
      <h1 className="header__title" onClick={() => navigate("/")}>
        <i className="icon__menu" onClick={toggleSidebar}></i>
        <span className="header__text">
          <i className="header__logo icon__suitcase"></i>
          Demo Tour
        </span>
      </h1>
      <nav className="nav">
        <ul className="nav__list">
          {navLinks.map((link, index) => (
            <li key={index} className="nav__item">
              <Link
                className={`nav__link ${
                  pageLocation.pathname === link.path ? "nav__link--active" : ""
                }`}
                to={link.path}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <section className={`mobile__menu ${isOpen ? "mobile__menu--open" : ""}`}>
        <div className="menu__content">
          <h2 className="menu__title">Menu</h2>
          <ul className="menu__list">
            {navLinks.map((link, index) => (
              <li key={index} className="menu__item">
                <Link
                  className={`menu__link ${
                    pageLocation.pathname === link.path
                      ? "menu__link--active"
                      : ""
                  }`}
                  to={link.path}
                  onClick={toggleSidebar}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </header>
  );
}

export default Header;
