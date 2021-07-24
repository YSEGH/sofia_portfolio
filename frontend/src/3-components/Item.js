import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../1-css/Item.css";

export default function Item({ item }) {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className={`item`}>
      <Link to={`/mes-realisations/${1}`}>
        <div className="photo-container">
          <img src="/static-files/photo.jpg" />
        </div>
      </Link>
      <div className="text-container">
        <Link to={`/mes-realisations/${1}`}>
          <h1>{item.type}</h1>
        </Link>
        <h1>{item.title}</h1>
      </div>
    </div>
  );
}
