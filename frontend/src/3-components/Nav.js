import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../1-css/Nav.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { FiInstagram, FiFacebook } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { userLogoutHandler, userReset } from "../5-actions/userActions";

export default function Nav() {
  const dispatch = useDispatch();

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

  const logoutUser = useSelector((state) => state.logoutUser);
  const { success: successLogout } = logoutUser;

  const loginUser = useSelector((state) => state.loginUser);
  const { success: successLogin } = loginUser;

  useEffect(() => {
    if (successLogout) {
      dispatch(userReset());
    }
    return () => {};
  }, [successLogout, successLogin]);

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
          <li>
            <NavLink activeClassName="active" to="/a-propos" exact>
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

          {localStorage.getItem("token") ? (
            <>
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
            </>
          ) : null}
          {localStorage.getItem("token") ? (
            <>
              <span>|</span>
              <li>
                <NavLink
                  activeClassName="logout"
                  to="/a-propos"
                  onClick={() => dispatch(userLogoutHandler())}
                  exact
                >
                  <BiLogOut size={25} />
                </NavLink>
              </li>
            </>
          ) : null}
        </ul>
        {/* 
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
