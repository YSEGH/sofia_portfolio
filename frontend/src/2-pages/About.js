import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../1-css/About.css";
import { getInfosHandler, resetInfos } from "../5-actions/infoActions";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../constants";
import axios from "axios";

export default function About() {
  const dispatch = useDispatch();

  const getInfos = useSelector((state) => state.getInfos);
  const { loading, infos, error } = getInfos;

  useEffect(() => {
    /*     axios.get("/a-propos");
     */ document.getElementsByTagName("meta")[3].content =
      "Sofia SEGHROUCHNI est une Architecte H.M.O.N.P - Paysagiste conceptrice (Indépendant). Indépendant École nationale supérieure d'architecture de Lyon";
    /*     console.log(document.getElementsByTagName("meta")[3].content);
     */ if (!loading) {
      window.scrollTo(0, 0);
    }
    return () => {};
  }, [loading]);

  useEffect(() => {
    document.title = "SOFIA SEGHROUCHNI - A propos";
    if (Object.keys(infos).length === 0) {
      dispatch(getInfosHandler());
    }
    return () => {};
  }, []);

  return (
    <div className="page about">
      {!loading && (
        <>
          <h1>A propos</h1>
          <div className="photo-container">
            {infos.aboutPhoto && (
              <img src={infos.aboutPhoto} alt="seghrouchni_sofia" />
            )}
          </div>
          <div className="text-container">
            {infos.aboutDescription && (
              <EditorJs
                tools={EDITOR_JS_TOOLS}
                data={infos.aboutDescription}
                readOnly
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
