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
      <div className="photo-container">
        <img src="/static-files/archi.jpg" />
      </div>
      <div className="text-container">
        <h1>
          <span>Sofia</span>
          <br />
          Seghrouchni
        </h1>
        <p>
          Architecture
          <span> & Paysagisme</span>
        </p>
      </div>
    </div>
  );
}
