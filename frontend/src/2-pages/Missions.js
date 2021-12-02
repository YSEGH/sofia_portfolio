import React, { useEffect } from "react";
import "../1-css/Missions.css";

export default function Missions() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "SOFIA SEGHROUCHNI - Missions";
    return () => {};
  }, []);

  return (
    <div className="page missions">
      <h1>
        Architecture <span>& paysagisme</span>
      </h1>
    </div>
  );
}
