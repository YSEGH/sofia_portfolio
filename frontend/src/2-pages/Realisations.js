import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../1-css/Realisations.css";
import Item from "../3-components/Item";
import {
  LoadingSpinnerFullPage,
  LoadingSVG,
} from "../3-components/LoadingComponents";
import { getItemsHandler, resetGetItem } from "../5-actions/itemActions";

export default function Realisations(props) {
  const dispatch = useDispatch();
  const { page = 1, filters: filtersParams = null } = useParams();
  const per_page = 12;
  const filters = filtersParams ? filtersParams.split("&") : [];

  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingGet, items, count, error: errorGet } = getItem;

  const showMore = (e) => {
    e.preventDefault();
    let newPage = Number(page) + 1;
    let newOffset = newPage * per_page - per_page;
    dispatch(getItemsHandler(newOffset, per_page, filters));
    props.history.push(
      `/mes-realisations/${newPage}/${filtersParams ? filtersParams : ""}`
    );
  };

  useEffect(() => {
    document.title = "SOFIA SEGHROUCHNI - Réalisations";
    return () => {};
  }, []);

  useEffect(() => {
    dispatch(getItemsHandler(0, page * per_page, filters));
    return () => {
      dispatch(resetGetItem());
    };
  }, [filtersParams]);

  return (
    <div className="page realisations">
      <div className="items-container">
        {items.map((item, i) => (
          <Item item={item} key={i} />
        ))}
      </div>
      {count > items.length ? (
        <div className="show-more-div">
          <button
            className="show-more"
            onClick={(e) => showMore(e)}
            disabled={loadingGet ? true : false}
          >
            {loadingGet ? <LoadingSVG /> : "Afficher plus"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
