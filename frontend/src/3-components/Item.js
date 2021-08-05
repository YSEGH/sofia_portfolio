import React, { useEffect } from "react";
import "../1-css/Item.css";
import { MdPlace, MdDateRange, MdWork } from "react-icons/md";
import { IoEarthOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Item({ item }) {
  /*   const image = item.photos.filter(
    (photo) => photo.type.split("/")[0] !== "video"
  ); */

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
