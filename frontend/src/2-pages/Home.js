import React from "react";
import { Link } from "react-router-dom";
import "../1-css/Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="background-top"></div>
      <div className="background-bottom">
        <div className="text-container">
          <h1>
            Seghrouchni <span>Sofia</span>
          </h1>
          <p>
            Architecture
            <span> & Paysagisme</span>
          </p>
          <div className="button-container">
            <Link to="/a-propos">A propos</Link>
            <Link to="/mes-realisations">Mes réalisations</Link>
          </div>
        </div>
      </div>
      <div className="photo-container">
        <img src="/static-files/archi.jpg" />
      </div>
    </div>
  );
}
