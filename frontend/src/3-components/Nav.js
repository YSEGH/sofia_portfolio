import React from "react";
import "../1-css/Nav.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { FiInstagram, FiFacebook } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function Nav() {
  const displayNav = () => {
    const nav = document.getElementsByClassName("nav")[0];
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      nav.classList.add("close");
    } else {
      nav.classList.remove("close");
      nav.classList.add("open");
    }
  };
  return (
    <div className="nav close">
      <GiHamburgerMenu
        size={40}
        className="nav-burger"
        onClick={() => displayNav()}
      />
      <div className="nav-content">
        <Logo />
        <ul className="nav-ul">
          {/* <li>
            <NavLink activeClassName="active" to="/" exact>
              <AiOutlineHome size={20} />
            </NavLink>
          </li>
          <span>|</span> */}
          <li>
            <NavLink activeClassName="active" to="/" exact>
              A propos
            </NavLink>
          </li>
          <span>|</span>
          <li>
            <NavLink activeClassName="active" to="/missions">
              Missions
            </NavLink>
          </li>
          <span>|</span>
          <li>
            <NavLink activeClassName="active" to="/mes-realisations">
              Mes réalisations
            </NavLink>
          </li>
          <span>|</span>
          <li>
            <NavLink activeClassName="active" to="/contact">
              Contact
            </NavLink>
          </li>
          <span>|</span>
          <li>
            <NavLink
              activeClassName="active"
              to="/admin/mon-espace"
              style={{ fontWeight: 200 }}
            >
              Admin
            </NavLink>
          </li>
        </ul>
        {/* <div className="network-container">
          <a href={`${infos.instagram}`} target="_blank">
            <FiInstagram size={20} />
          </a>
          <a href={`${infos.facebook}`} target="_blank">
            <FiFacebook size={20} />
          </a>
        </div> */}
        {/* {localStorage.getItem("token") ? (
            <li>
              <NavLink activeClassName="active" to="/admin/mon-compte">
                Admin
              </NavLink>
            </li>
          ) : null}
          {localStorage.getItem("token") ? (
            <li>
              <NavLink
                activeClassName="logout"
                to="/"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                }}
                exact
              >
                <BiLogOut size={25} />
              </NavLink>
            </li>
          ) : null}
        </ul>
        <div className="network-container">
          <a href={`${infos.instagram}`} target="_blank">
            <FiInstagram size={20} />
          </a>
          <a href={`${infos.facebook}`} target="_blank">
            <FiFacebook size={20} />
          </a>
        </div> */}
      </div>
    </div>
  );
}
{
  /* <div className="nav">
      <GiHamburgerMenu
        size={40}
        className="nav-burger"
        onClick={() => displayNav()}
      />
      <div className="logo-container">
        <p>
          SEGHROUCHNI <span>Sofia</span>
        </p>
        <p>
          Architecture <span>& Paysagisme</span>
        </p>
      </div>
      <ul className="nav-ul close">
        <li>
          <NavLink activeClassName="active" to="/" exact>
            A propos
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/missions">
            Missions
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/mes-realisations">
            Mes réalisations
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/contact">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/admin/mon-espace">
            Admin
          </NavLink>
        </li>
        {localStorage.getItem("token") ? (
          <li>
            <NavLink activeClassName="active" to="/admin/mon-espace">
              Admin
            </NavLink>
          </li>
        ) : null}
        {localStorage.getItem("token") ? (
          <li>
            <NavLink
              activeClassName="logout"
              to="/"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
              }}
              exact
            >
              <BiLogOut size={25} />
            </NavLink>
          </li>
        ) : null}
      </ul>
    </div> */
}
