import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../1-css/Home.css";

export default function Home() {
  useEffect(() => {
    document.title = "SOFIA SEGHROUCHNI - Architecte paysagiste";

    return () => {};
  }, []);
  return (
    <div className="home">
      <h1>
        <span>Sofia</span>
        Seghrouchni
      </h1>

      <img src="/static-files/skyline_marseille_lg.png" />
      <p>
        Architecture
        <span> & Paysagisme</span>
      </p>
    </div>
  );
}
