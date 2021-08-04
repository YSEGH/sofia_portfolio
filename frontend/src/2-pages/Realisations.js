import React, { useEffect } from "react";
import "../1-css/Realisations.css";
import FilterContainer from "../3-components/FilterContainer";
import Item from "../3-components/Item";

export default function Realisations() {
  useEffect(() => {
    document.title = "2SAP - Mes réalisations";
    return () => {};
  }, []);

  const items = [
    { title: "Title", type: "Aménagement", img: "/static-files/p1.jpg" },
    { title: "Title", type: "Restaurant", img: "/static-files/p2.jpg" },
    { title: "Title", type: "Réhabilitation", img: "/static-files/p3.jpg" },
    { title: "Title", type: "Construction", img: "/static-files/p4.jpg" },
    { title: "Title", type: "Aménagement", img: "/static-files/p5.jpg" },
    { title: "Title", type: "Consultation", img: "/static-files/p6.jpg" },
  ];

  return (
    <div className="page realisations">
      <FilterContainer />
      <div className="items-container">
        {items.map((item, i) => (
          <Item item={item} key={i} />
        ))}
      </div>
    </div>
  );
}
