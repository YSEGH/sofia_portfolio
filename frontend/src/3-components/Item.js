import React, { useEffect } from "react";
import "../1-css/Item.css";

export default function Item({ item }) {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className={`item`}>
      <div className="photo-container">
        <img src="/static-files/photo.jpg" />
      </div>
      <div className="text-container">
        <h1>{item.type}</h1>
        <h1>{item.title}</h1>
      </div>
    </div>
  );
}
