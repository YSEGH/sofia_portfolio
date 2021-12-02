import React, { useEffect, useState } from "react";
import "../1-css/Realisation_Page.css";
import { MdClose } from "react-icons/md";
import { useParams } from "react-router-dom";
import { getItemsHandler, resetGetItem } from "../5-actions/itemActions";
import { useDispatch, useSelector } from "react-redux";

export default function Realisation_Page() {
  const [item, setItem] = useState(null);

  const dispatch = useDispatch();
  const { itemId } = useParams();

  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingGet, items, error: errorGet } = getItem;

  useEffect(() => {
    dispatch(getItemsHandler(null, null, null, itemId));
    return () => {
      dispatch(resetGetItem());
    };
  }, []);

  useEffect(() => {
    if (!loadingGet) {
      window.scrollTo(0, 0);
    }
    return () => {};
  }, [loadingGet]);

  useEffect(() => {
    if (items[0] && items[0]._id === itemId) {
      setItem(items[0]);
    }
    return () => {};
  }, [items[0]]);

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
    item && (
      <div className="page realisation-page">
        <div className="text-container">
          <h1>{item.title}</h1>
          <div className="photo-container">
            <img
              src={item.photos[item.photos.length - 1].src}
              alt={item.title}
            />
          </div>
          <p>{item.description}</p>
          <ul>
            <li>
              Lieu : <span>{item.place}</span>
            </li>
            <li>
              Type : <span>{item.type}</span>
            </li>
            <li>
              Client : <span>{item.client}</span>
            </li>
            <li>
              Date : <span>{item.date}</span>
            </li>
            <li>
              Surface : <span>{item.surface}</span>
            </li>
            <li>
              Statut : <span>{item.statut}</span>
            </li>
          </ul>
        </div>
        <div className="photos-container">
          {item.photos.map((photo, i) => (
            <div className="photo-container" key={i}>
              <div className="photo-content" onClick={(e) => displayImage(e)}>
                <MdClose size={20} onClick={(e) => displayImage(e)} />
                <img src={photo.src} alt={item.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
