import { NavLink } from "react-router-dom";

import "./Header.scss";
import { useState } from "react";

const Header = () => {
  const [hamburger, setHamburger] = useState(false);
  const openHamburger = () => {
    setHamburger(!hamburger);
  };
  return (
    <header className="sticky-top">
      <div className="container">
        <div className="nav">
          <div className="nav-brand">
            <NavLink to="/crud" className="portfolios__logo">
              Joxa_Portfolios
            </NavLink>

            <i
              className="fa-solid fa-bars"
              style={{ color: "#ffffff" }}
              onClick={openHamburger}
            ></i>
          </div>
          <div
            className={hamburger ? `nav-menus` : `nav-menus nav-menus__none`}
          >
            <ul className="nav-menu">
              <NavLink className="nav-menu__link" to="/crud">
                Skills
              </NavLink>
              <NavLink className="nav-menu__link" to="/experiences">
                Experiences
              </NavLink>
              <NavLink className="nav-menu__link" to="/education">
                Education
              </NavLink>
              <NavLink className="nav-menu__link" to="/portfolio">
                Portfolio
              </NavLink>
              <NavLink className="nav-menu__link" to="/home">
                View portfolio
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
