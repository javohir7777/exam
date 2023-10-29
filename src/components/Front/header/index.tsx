import { NavLink } from "react-router-dom";

import "./FrontHeader.scss";
import { useState } from "react";
const FrontHeader = () => {
  const [hamburger, setHamburger] = useState(false);
  const openHamburger = () => {
    setHamburger(!hamburger);
  };
  return (
    <header className="front-header sticky-top">
      <div className="container">
        <nav className="nav-menu">
          <p className="nav-brand">
            <NavLink to="/home" className="nav-menu__link">
              Home
            </NavLink>
            <i
              className="fa-solid fa-bars fas"
              style={{ color: "#ffffff" }}
              onClick={openHamburger}
            ></i>
          </p>
          <ul
            className={
              hamburger ? `nav-munu__items` : `nav-munu__items nav-menus__none`
            }
          >
            <div className="menus">
              <NavLink to="/home/experiences" className="nav-menu__link">
                Experiences
              </NavLink>
              <NavLink to="/home/education" className="nav-menu__link">
                Education
              </NavLink>
              <NavLink to="/home/portfolio" className="nav-menu__link">
                Portfolio
              </NavLink>
              <NavLink to="/home/testmonial" className="nav-menu__link">
                Testmonial
              </NavLink>
              <NavLink to="/home/contactUs" className="nav-menu__link">
                Contact us
              </NavLink>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default FrontHeader;
