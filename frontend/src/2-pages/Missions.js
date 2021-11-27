import React, { useEffect } from "react";
import "../1-css/Missions.css";

export default function Missions() {
  useEffect(() => {
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
