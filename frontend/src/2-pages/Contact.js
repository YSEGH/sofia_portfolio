import React from "react";
import FormContact from "../3-components/FormContact";
import "../1-css/Contact.css";
export default function Contact() {
  return (
    <div className="page contact">
      <div className="text-container">
        <div className="background-color"></div>
        <div className="background-text">
          <div className="infos-details">
            <p>SEGHROUCHNI Sofia</p>
            <p>Marseille, France</p>
            <p>segh.sofia@gmail.com</p>
            <p>0620706551</p>
          </div>
        </div>
      </div>
      <FormContact />
    </div>
  );
}
