import React, { useEffect, useState } from "react";
import "../1-css/FilterContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { getFiltersHandler } from "../5-actions/itemActions";
import { MdClose, MdAdd } from "react-icons/md";
import { useParams } from "react-router";

export default function FilterContainer({ props }) {
  const dispatch = useDispatch();
  const { page = 1, filters: filtersParams = null } = useParams();

  const getFilters = useSelector((state) => state.getFilters);
  const { loading: loadingFilters, filters, error: errorFilters } = getFilters;

  const [filtersSelected, setFiltersSelected] = useState(
    filtersParams ? filtersParams.split("&") : []
  );

  const displayFilter = () => {
    const filterContainer = document.querySelector(
      ".filter-container-absolute"
    );
    const filterButton = document.querySelector(".filters-button");
    if (filterContainer.classList.contains("open")) {
      filterContainer.classList.remove("open");
      filterContainer.classList.add("close");
      filterButton.classList.remove("active");
    } else {
      filterContainer.classList.remove("close");
      filterContainer.classList.add("open");
      filterButton.classList.add("active");
    }
  };
  const selectFilterHandler = (filter, target) => {
    const filterDiv = document.querySelectorAll(`.${target.classList[0]}`);
    let filtersArray;
    let filterExist = filtersSelected.find((x) => x === filter.name);

    if (filterExist) {
      for (let i = 0; i < filterDiv.length; i++) {
        filterDiv[i].classList.remove("active");
      }
      filtersArray = filtersSelected.filter((x) => x !== filter.name);
      setFiltersSelected(filtersArray);
    } else {
      for (let i = 0; i < filterDiv.length; i++) {
        filterDiv[i].classList.add("active");
      }
      filtersArray = [...filtersSelected, filter.name];
      setFiltersSelected(filtersArray);
    }
    let filtersParams;
    if (filtersArray.length) {
      filtersParams = filtersArray.join("&");
    } else {
      filtersParams = "";
    }
    props.history.push(`/mes-realisations/${page}/${filtersParams}`);
  };

  useEffect(() => {
    dispatch(getFiltersHandler(filtersSelected));
    return () => {};
  }, [filtersParams]);

  return (
    <div className="filter-container">
      <div className="filter-container-list">
        <ul>
          {filters.map((filter, i) =>
            i < 3 ? (
              <li key={i}>
                <a
                  className={`filter-${filter.name} ${
                    filtersSelected.includes(filter.name) ? "active" : ""
                  }`}
                  onClick={(e) => selectFilterHandler(filter, e.target)}
                >
                  {filter.name} ({filter.qty})
                </a>
              </li>
            ) : null
          )}
        </ul>
        <button
          className="filters-button"
          style={{ visibility: filters.length > 3 ? "visible" : "hidden" }}
          onClick={() => displayFilter()}
        >
          Filtre(s) <MdAdd size={15} />
        </button>
      </div>
      <div className="filter-container-absolute">
        <MdClose
          className="close-icon"
          size={25}
          onClick={() => displayFilter()}
        />
        <h2>Filtre(s)</h2>
        <ul>
          {filters.map((filter, i) => (
            <li key={i}>
              <a
                className={`filter-${filter.name} ${
                  filtersSelected.includes(filter.name) ? "active" : ""
                }`}
                onClick={(e) => selectFilterHandler(filter, e.target)}
              >
                {filter.name} ({filter.qty})
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
