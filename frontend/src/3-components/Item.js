import React, { useEffect } from "react";
import "../1-css/Item.css";
import { Link } from "react-router-dom";

export default function Item({ item }) {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Link className={`item `} to={`/realisation/${item._id}`}>
      <img src={item.photos[item.photos.length - 1].src} alt={item.title} />
      <div className="mask"></div>
      <h1 className="item-title">{item.title}</h1>
      <p className="item-subtitle">{item.type}</p>
    </Link>
  );
}
