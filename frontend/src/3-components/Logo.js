import React from "react";
import { Link } from "react-router-dom";
import "../1-css/Logo.css";

export default function Logo() {
  return (
    <Link className="logo" to="/a-propos">
      <h1>
        Seghrouchni <span>Sofia</span>
      </h1>
      <p>
        Architecture
        <span> & Paysagisme</span>
      </p>
    </Link>
  );
}
