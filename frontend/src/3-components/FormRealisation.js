import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "../1-css/FormAdmin.css";
import { useForm } from "react-hook-form";
import uniqId from "uniqid";
import { BiImport } from "react-icons/bi";
import { FaPortrait } from "react-icons/fa";
import {
  getItemsHandler,
  addItemHandler,
  updateItemHandler,
  resetItemSuccess,
  resetGetItem,
} from "../5-actions/itemActions";
import { LoadingSVG } from "./LoadingComponents";
import { toast } from "react-toastify";

export default function FormRealisation({ update = false }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { itemId } = useParams();

  const addItem = useSelector((state) => state.addItem);
  const { loading: loadingAdd, success: successAdd, error: errorAdd } = addItem;

  const updateItem = useSelector((state) => state.updateItem);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = updateItem;

  const getItem = useSelector((state) => state.getItem);
  const { loading: loadingGet, items, error: errorGet } = getItem;

  const [item, setItem] = useState({});
  const [files, setFiles] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);

  const submitCategory = (e) => {
    e.preventDefault();
    if (e.target[0].value) {
      const category = categories;
      setCategories([...category, e.target[0].value.toLowerCase()]);
      setCategoryName("");
    }
  };
  const removeCategory = (name) => {
    const category = categories.filter((item) => item !== name);
    setCategories(category);
  };

  const importFiles = (filesImport) => {
    const oldFiles = files;
    const newfiles = filesImport;
    const previewFile = newfiles.filter((image, i) => {
      if (image.type.split("/")[0] === "image" && image.size > 1000000) {
        toast.error(
          `${image.name} est trop volumineux (+1Mo). Compression requise.`
        );
        return;
      } else {
        return Object.assign(image, {
          id: uniqId(),
          imported: false,
          preview: URL.createObjectURL(image),
        });
      }
    });
    setFiles(oldFiles.concat(previewFile));
  };

  const deleteFile = (fileDelete) => {
    let newFiles;
    if (fileDelete.imported === false) {
      newFiles = files.filter((file) => file.id !== fileDelete.id);
    } else {
      setFilesToDelete([...filesToDelete, fileDelete]);
      newFiles = files.filter((file) => file.src !== fileDelete.src);
    }
    setFiles(newFiles);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    let newItem = {
      title: data.title ? data.title : item.title,
      type: data.type ? data.type : item.type,
      description: data.description ? data.description : item.description,
      date: data.date ? data.date : item.date,
      categories: categories,
      place: data.place ? data.place : item.place,
      surface: data.surface ? data.surface : item.surface,
      statut: data.statut ? data.statut : item.statut,
      client: data.client ? data.client : item.client,
    };
    if (update) {
      newItem._id = item._id;
    }
    formData.append("item", JSON.stringify(newItem));
    for (let i = 0; i < files.length; i++) {
      if (!files[i].imported) {
        formData.append("files", files[i]);
      }
    }
    if (update) {
      dispatch(updateItemHandler(item._id, formData, filesToDelete));
    } else {
      dispatch(addItemHandler(formData));
    }
  };

  useEffect(() => {
    if (update) {
      dispatch(getItemsHandler(null, null, null, itemId));
    }
    if (!update) {
      setItem({});
      reset({});
      setFiles([]);
      setCategories([]);
    }
    return () => {
      dispatch(resetGetItem());
    };
  }, [update]);

  useEffect(() => {
    if (update && items[0]) {
      if (items[0]._id === itemId) {
        setFiles(items[0].photos);
        setCategories(items[0].categories);
        setItem(items[0]);
      }
    }
    return () => {};
  }, [items[0]]);

  useEffect(() => {
    if (successAdd) {
      toast.success("Ajouté avec succés !");
      reset({});
      setFiles([]);
      setCategories([]);
      dispatch(resetItemSuccess());
    }
    if (successUpdate) {
      toast.success("Modifications enregistrées !");
      setFilesToDelete([]);
      dispatch(resetGetItem());
      dispatch(resetItemSuccess());
      dispatch(getItemsHandler(null, null, null, itemId));
    }
    if (errorAdd) {
      toast.error(errorAdd);
      dispatch(resetItemSuccess());
    }
    if (errorUpdate) {
      toast.error("Impossible d'enregistrer les modifications !");
      dispatch(resetItemSuccess());
    }
    return () => {};
  }, [successAdd, successUpdate, errorAdd, errorUpdate]);

  return (
    <div className="form-admin">
      <form
        id="form-realisation"
        className="form-realisation"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Informations</h2>
        <div className="form-group">
          <label>Titre</label>
          <input
            {...register("title", { required: !update ? true : false })}
            placeholder="Titre"
            defaultValue={item.title}
          />
          {errors.title && (
            <span className="danger">Merci de saisir un titre.</span>
          )}
        </div>
        <div className="form-group">
          <label>Type</label>
          <input
            {...register("type", { required: !update ? true : false })}
            placeholder="Ex. Aménagement, Réhabilitation"
            defaultValue={item.type}
          />
          {errors.title && (
            <span className="danger">Merci de saisir le type.</span>
          )}
        </div>
        <div className="form-group">
          <label>Lieu</label>
          <input
            {...register("place", { required: !update ? true : false })}
            placeholder="Ex. Marseille, France"
            defaultValue={item.place}
          />
          {errors.title && (
            <span className="danger">Merci de saisir le lieu.</span>
          )}
        </div>
        <div className="form-group">
          <label>Client</label>
          <input
            {...register("client", { required: !update ? true : false })}
            placeholder="Ex. Particulier, Professionnel"
            defaultValue={item.client}
          />
          {errors.title && (
            <span className="danger">Merci de saisir la nature du client.</span>
          )}
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            {...register("date", { required: !update ? true : false })}
            placeholder="Date"
            type="date"
            defaultValue={item.date}
          />
          {errors.title && (
            <span className="danger">Merci de saisir la date.</span>
          )}
        </div>
        <div className="form-group">
          <label>Surface (m²)</label>
          <input
            {...register("surface", { required: !update ? true : false })}
            placeholder="Surface"
            defaultValue={item.surface}
          />
          {errors.title && (
            <span className="danger">Merci de saisir la surface.</span>
          )}
        </div>
        <div className="form-group">
          <label>Statut</label>
          <input
            {...register("statut", { required: !update ? true : false })}
            placeholder="Ex. Terminé"
            defaultValue={item.statut}
          />
          {errors.title && (
            <span className="danger">Merci de saisir le statut.</span>
          )}
        </div>
        <div className="form-group">
          <label>Présentation</label>
          <textarea
            {...register("description", { required: !update ? true : false })}
            defaultValue={update ? item.description : ""}
          />
          {errors.title && (
            <span className="danger">
              Merci de saisir un texte de présentation.
            </span>
          )}
        </div>
      </form>
      <form
        id={"form-category"}
        className="form-category"
        onSubmit={(e) => submitCategory(e)}
      >
        <h2>Catégories</h2>
        <div className="category-input-container">
          <input
            value={categoryName}
            className="category-input"
            placeholder="Catégories"
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button type="submit" form={"form-category"}>
            +
          </button>
        </div>
        <div className="categories-container">
          {categories.map((item, i) => (
            <span onClick={() => removeCategory(item)} key={i}>
              {item}
            </span>
          ))}
        </div>
      </form>
      <div className="upload-zone-container">
        <h2>Photos</h2>
        <div className="apercu-zone many-images">
          {files.length > 0 ? (
            files.map((file, i) =>
              file.type === "video/mp4" ? (
                <video
                  key={i}
                  src={file.preview ? file.preview : file.src}
                  onClick={() => deleteFile(file)}
                />
              ) : (
                <img
                  key={i}
                  src={file.preview ? file.preview : file.src}
                  onClick={() => deleteFile(file)}
                />
              )
            )
          ) : (
            <FaPortrait size={250} />
          )}
        </div>
        <div className="upload-zone">
          <BiImport size={120} />
          <p>Cliquez ou déposez vos fichiers ici.</p>
          <input
            id={"files"}
            type="file"
            multiple
            {...register("files")}
            onChange={(e) => {
              if (e.target.files.length > 0) {
                importFiles([...e.target.files]);
              }
            }}
          />
          <label
            htmlFor={"files"}
            className="drop-zone"
            onDragLeave={(e) => {
              e.preventDefault();
              const dropZone = document.getElementsByClassName("drop-zone")[0];
              dropZone.classList.remove("active");
            }}
            onDragOver={(e) => {
              e.preventDefault();
              const dropZone = document.getElementsByClassName("drop-zone")[0];
              dropZone.classList.add("active");
            }}
            onDrop={(e) => {
              e.preventDefault();
              const dropZone = document.getElementsByClassName("drop-zone")[0];
              dropZone.classList.remove("active");
              importFiles([...e.dataTransfer.files]);
            }}
          ></label>
        </div>
      </div>
      <button
        form="form-realisation"
        type="submit"
        disabled={loadingUpdate || loadingAdd ? true : false}
      >
        {loadingUpdate || loadingAdd ? <LoadingSVG /> : "Valider"}
      </button>
    </div>
  );
}
