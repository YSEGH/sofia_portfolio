import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiPhone, BiAt, BiMap } from "react-icons/bi";
import { ImWarning } from "react-icons/im";
import { GiPositionMarker } from "react-icons/gi";
import "../1-css/Footer.css";
import { getInfosHandler, resetInfos } from "../5-actions/infoActions";
export default function Contact() {
  const dispatch = useDispatch();

  const getInfos = useSelector((state) => state.getInfos);
  const { loading, infos, error } = getInfos;

  useEffect(() => {
    dispatch(getInfosHandler());
    return () => {
      dispatch(resetInfos());
    };
  }, []);

  return (
    <div className="footer">
      {!loading && (
        <div className="text-container">
          <p>
            <BiAt size={20} />
            {infos.email}
          </p>
          <p>
            <GiPositionMarker size={20} />
            {infos.city}, {infos.country}
          </p>

          <p>
            <BiPhone size={20} />
            {infos.phone}
          </p>
          <p className="construction-flag">
            <ImWarning />
            Site en construction
          </p>
        </div>
      )}
    </div>
  );
}
