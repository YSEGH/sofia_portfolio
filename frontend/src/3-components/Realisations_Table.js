import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemHandler,
  getItemsHandler,
  resetGetItem,
  resetItemSuccess,
} from "../5-actions/itemActions";
import { BiSearch } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Realisations_Table() {
  const dispatch = useDispatch();

  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingGet, items, error: errorGet } = getItem;

  const deleteItem = useSelector((state) => state.deleteItem);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = deleteItem;

  const onClickDeleteItem = (itemId) => {
    dispatch(deleteItemHandler(itemId));
  };

  useEffect(() => {
    dispatch(getItemsHandler());
    return () => {
      dispatch(resetGetItem());
    };
  }, []);

  useEffect(() => {
    if (successDelete) {
      dispatch(resetGetItem());
      dispatch(getItemsHandler());
      toast.success("Suppression effectuée !");
      dispatch(resetItemSuccess());
    }
    if (errorDelete) {
      toast.error(errorDelete);
      dispatch(resetItemSuccess());
    }
    return () => {};
  }, [successDelete, errorDelete]);

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        title="Mes réalisations"
        options={{
          exportButton: false,
          pageSize: 5,
        }}
        style={{ boxShadow: "none", margin: "3rem auto", fontWeight: "200" }}
        columns={[
          { title: "Titre", field: "title" },
          { title: "Type", field: "type" },
          { title: "Statut", field: "statut" },
          {
            render: (RowData) => (
              <Link
                className="button-page-contenu"
                to={`/admin/mon-espace/realisation/${RowData._id}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <BiSearch size={30} />
              </Link>
            ),
          },
          {
            render: (RowData) => (
              <>
                <button
                  className="button-delete-contenu"
                  onClick={() => onClickDeleteItem(RowData._id)}
                >
                  <MdDelete size={30} />
                </button>
              </>
            ),
          },
        ]}
        data={items}
      />
    </div>
  );
}
