import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import "./Header.scss";

const Header = () => {
  const [hamburger, setHamburger] = useState(false);
  const navigate = useNavigate();

  const openHamburger = () => {
    setHamburger(!hamburger);
  };

  const logout = () => {
    navigate("/");
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
              <a
                className="text-decoration-none text-white"
                onClick={() => logout()}
              >
                <LogoutIcon />
              </a>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
