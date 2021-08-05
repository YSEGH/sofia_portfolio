import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiPhone, BiAt, BiMap } from "react-icons/bi";
import { GiPositionMarker } from "react-icons/gi";
import "../1-css/Contact.css";
import { getInfosHandler, resetInfos } from "../5-actions/infoActions";

export default function Contact() {
  const dispatch = useDispatch();

  const getInfos = useSelector((state) => state.getInfos);
  const { loading, infos, error } = getInfos;

  useEffect(() => {
    document.title = "2SAP - Contact";
    dispatch(getInfosHandler());
    return () => {
      dispatch(resetInfos());
    };
  }, []);

  return (
    !loading && (
      <div className="page contact">
        <h1>Gardons contact</h1>
        <p>
          N’hésitez pas à me contacter, je vous répondrai dans les meilleurs
          délais.
        </p>
        <div className="text-container">
          <p>
            <GiPositionMarker size={30} />
            {infos.city}, {infos.country}
          </p>
          <p>
            <BiAt size={30} />
            {infos.email}
          </p>
          <p>
            <BiPhone size={30} />
            {infos.phone}
          </p>
        </div>
      </div>
    )
  );
}
