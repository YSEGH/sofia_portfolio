import React, { useEffect } from "react";
import "../1-css/About.css";

export default function About() {
  useEffect(() => {
    document.title = "2SAP - A propos";
    return () => {};
  }, []);

  return (
    <div className="page about">
      <h1>A propos</h1>
      <div className="photo-container">
        <img src="/static-files/photo-2.jpg" />
      </div>
      <div className="text-container">
        <p>
          Le Lorem Ipsum est simplement du faux texte employé dans la
          composition et la mise en page avant impression. Le Lorem Ipsum est le
          faux texte standard de l'imprimerie depuis les années 1500, quand un
          imprimeur anonyme assembla ensemble des morceaux de texte pour
          réaliser un livre spécimen de polices de texte.
          <br />
          <br />
          Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à
          la bureautique informatique, sans que son contenu n'en soit modifié.
          Il a été popularisé dans les années 1960 grâce à la vente de feuilles
          Letraset contenant des passages du Lorem Ipsum, et, plus récemment,
          par son inclusion dans des applications de mise en page de texte,
          comme Aldus PageMaker. Le Lorem Ipsum est simplement du faux texte
          employé dans la composition et la mise en page avant impression. Le
          Lorem Ipsum est le faux texte standard de l'imprimerie depuis les
          années 1500, quand un imprimeur anonyme assembla ensemble des morceaux
          de texte pour réaliser un livre spécimen de polices de texte.
        </p>
      </div>
    </div>
  );
}
