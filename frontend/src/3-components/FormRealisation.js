import React, { useEffect, useState } from "react";
/* import { useDispatch, useSelector } from "react-redux";
 */
import "../1-css/FormAdmin.css";
import { useForm } from "react-hook-form";
import uniqId from "uniqid";
import { BiImport } from "react-icons/bi";
import { FaPortrait } from "react-icons/fa";
/* import {
  getitemHandler,
  resetitem,
  updateitemHandler,
} from "../../3-actions/infoActions"; */
import { LoadingSVG } from "./LoadingComponents";
import { toast } from "react-toastify";

export default function FormRealisation({ update = false, item = {} }) {
  /*  const dispatch = useDispatch();
  const updateitem = useSelector((state) => state.updateitem);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = updateitem;

  const getitem = useSelector((state) => state.getitem);
  const { loading: loadingGet, item, error: errorGet } = getitem;
*/
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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

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
    /* const formData = new FormData();
    let newItem = {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      date: data.date,
      categorie: categories,
      place: data.place,
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
    } */
  };

  /*  useEffect(() => {
    if (Object.keys(item).length === 0) {
      dispatch(getitemHandler());
    }
    if (successUpdate) {
      toast.success("Modifications enregistrées !");
      dispatch(resetitem());
    }
    if (errorUpdate) {
      toast.error("Impossible d'enregistrer les modifications !");
      dispatch(resetitem());
    }
    return () => {}; 
  }, [successUpdate, errorUpdate]);*/

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
            {...register("title")}
            placeholder="Titre"
            defaultValue={item.title}
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input
            {...register("type")}
            placeholder="Ex. Aménagement, Réhabilitation"
            defaultValue={item.type}
          />
        </div>
        <div className="form-group">
          <label>Lieu</label>
          <input
            {...register("place")}
            placeholder="Ex. Marseille, France"
            defaultValue={item.place}
          />
        </div>
        <div className="form-group">
          <label>Client</label>
          <input
            {...register("client")}
            placeholder="Ex. Particulier, Professionnel"
            defaultValue={item.client}
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            {...register("date")}
            placeholder="Date"
            type="date"
            defaultValue={item.date}
          />
        </div>
        <div className="form-group">
          <label>Surface (m²)</label>
          <input
            {...register("area")}
            placeholder="Surface"
            defaultValue={item.area}
          />
        </div>
        <div className="form-group">
          <label>Statut</label>
          <input
            {...register("statut")}
            placeholder="Ex. Terminé"
            defaultValue={item.statut}
          />
        </div>
        <div className="form-group">
          <label>Présentation</label>
          <textarea
            {...register("presentation")}
            defaultValue={item.presentation}
          />
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
        <h2>Fichiers</h2>
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
        /*         disabled={loadingUpdate ? true : false}
         */
      >
        {/*         {loadingUpdate ? <LoadingSVG /> : "Valider les modifications"}
         */}
      </button>
    </div>
  );
}
