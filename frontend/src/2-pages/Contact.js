import React, { useEffect } from "react";
import { BiPhone, BiAt, BiMap } from "react-icons/bi";
import { GiPositionMarker } from "react-icons/gi";
import "../1-css/Contact.css";

export default function Contact() {
  useEffect(() => {
    document.title = "2SAP - Contact";
    return () => {};
  }, []);

  return (
    <div className="page contact">
      <h1>Gardons contact</h1>
      <p>
        N’hésitez pas à me contacter, je vous répondrai dans les meilleurs
        délais.
      </p>
      <div className="text-container">
        {/* <p>SEGHROUCHNI Sofia</p> */}
        <p>
          <GiPositionMarker size={30} />
          Marseille, France
        </p>
        <p>
          <BiAt size={30} />
          segh.sofia@gmail.com
        </p>
        <p>
          <BiPhone size={30} />
          0620706551
        </p>
      </div>
    </div>
  );
}
