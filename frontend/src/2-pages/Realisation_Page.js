import React from "react";
import "../1-css/Realisation_Page.css";
import { MdClose } from "react-icons/md";

export default function Realisation_Page() {
  const displayImage = (e) => {
    e.stopPropagation();
    if (e.target.tagName === "IMG") {
      return;
    }
    let modal;
    if (e.target.classList.contains("photo-content")) {
      modal = e.target;
    } else {
      modal = e.target.parentNode;
    }
    if (modal.classList.contains("active")) {
      modal.classList.remove("active");
    } else {
      modal.classList.add("active");
    }
  };

  return (
    <div className="page realisation-page">
      <div className="text-container">
        <h1>Nom du projet</h1>
        <div className="photo-container">
          <img src="/static-files/photo.jpg" />
        </div>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </p>
        <ul>
          <li>
            Lieu : <span>Marseille, France.</span>
          </li>
          <li>
            Type : <span>Aménagement.</span>
          </li>
          <li>
            Client : <span>Particulier.</span>
          </li>
          <li>
            Date : <span>2019-2020.</span>
          </li>
          <li>
            Surface : <span>54 500m².</span>
          </li>
          <li>
            Statut : <span>Terminé.</span>
          </li>
        </ul>
      </div>
      <div className="photos-container">
        <div className="photo-container">
          <div className="photo-content" onClick={(e) => displayImage(e)}>
            <MdClose size={20} onClick={(e) => displayImage(e)} />
            <img src="/static-files/photo.jpg" />
          </div>
        </div>
        <div className="photo-container">
          <div className="photo-content" onClick={(e) => displayImage(e)}>
            <MdClose size={20} onClick={(e) => displayImage(e)} />
            <img src="/static-files/photo-2.jpg" />
          </div>
        </div>
        <div className="photo-container">
          <div className="photo-content" onClick={(e) => displayImage(e)}>
            <MdClose size={20} onClick={(e) => displayImage(e)} />
            <img src="/static-files/photo.jpg" />
          </div>
        </div>
        <div className="photo-container">
          <div className="photo-content" onClick={(e) => displayImage(e)}>
            <MdClose size={20} onClick={(e) => displayImage(e)} />
            <img src="/static-files/photo-2.jpg" />
          </div>
        </div>
        <div className="photo-container">
          <div className="photo-content" onClick={(e) => displayImage(e)}>
            <MdClose size={20} onClick={(e) => displayImage(e)} />
            <img src="/static-files/photo.jpg" />
          </div>
        </div>
        <div className="photo-container">
          <div className="photo-content" onClick={(e) => displayImage(e)}>
            <MdClose size={20} onClick={(e) => displayImage(e)} />
            <img src="/static-files/photo-2.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
}
