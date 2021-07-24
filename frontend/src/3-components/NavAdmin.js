import React from "react";
import "../1-css/NavAdmin.css";
import { NavLink } from "react-router-dom";

export default function NavAdmin({ color }) {
  return (
    <ul className="nav-admin">
      <li>
        <NavLink
          activeClassName="active"
          activeStyle={{ textDecoration: "underline" }}
          to="/admin/mon-espace/mon-compte"
          style={{ color: color }}
          exact
        >
          Mon compte
        </NavLink>
      </li>
      <span>|</span>
      <li>
        <NavLink
          activeClassName="active"
          activeStyle={{ textDecoration: "underline" }}
          to="/admin/mon-espace/mes-realisations"
          style={{ color: color }}
          exact
        >
          Mes réalisations
        </NavLink>
      </li>
      <span>|</span>
      <li>
        <NavLink
          activeClassName="active"
          activeStyle={{ textDecoration: "underline" }}
          to="/admin/mon-espace/ajouter-realisation"
          style={{ color: color }}
        >
          Ajouter réalisation
        </NavLink>
      </li>
      <span>|</span>
      <li>
        <NavLink
          activeClassName="active"
          activeStyle={{ textDecoration: "underline" }}
          to="/admin/mon-espace/infos-generales"
          style={{ color: color }}
        >
          Infos générales
        </NavLink>
      </li>
    </ul>
  );
}
