import React from "react";
import "../1-css/Realisations.css";
import FilterContainer from "../3-components/FilterContainer";
import Item from "../3-components/Item";

export default function Realisations() {
  const items = [
    { title: "Title", type: "Aménagement" },
    { title: "Title", type: "Restaurant" },
    { title: "Title", type: "Réhabilitation" },
    { title: "Title", type: "Construction" },
    { title: "Title", type: "Aménagement" },
    { title: "Title", type: "Consultation" },
  ];

  return (
    <div className="page realisations">
      <h1>Mes réalisations</h1>
      <FilterContainer />
      <div className="items-container">
        {items.map((item, i) => (
          <Item item={item} key={i} />
        ))}
      </div>
    </div>
  );
}
