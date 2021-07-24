import React, { useEffect, useRef, useState } from "react";
/* import { useDispatch, useSelector } from "react-redux";
 */ import EditorJs from "react-editor-js";
import "../1-css/FormAdmin.css";
import { useForm } from "react-hook-form";
import uniqId from "uniqid";
import { BiImport } from "react-icons/bi";
import { FaPortrait } from "react-icons/fa";
import { EDITOR_JS_TOOLS } from "../constants";
/* import {
  getInfosHandler,
  resetInfos,
  updateInfosHandler,
} from "../../3-actions/infoActions"; */
import { LoadingSVG } from "./LoadingComponents";
import { toast } from "react-toastify";

export default function FormRealisation({
  infos = { lastname: "", firstname: "", aboutPhoto: {} },
}) {
  const instanceRef = useRef(null);

  /*  const dispatch = useDispatch();
  const updateInfos = useSelector((state) => state.updateInfos);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = updateInfos;

  const getInfos = useSelector((state) => state.getInfos);
  const { loading: loadingGet, infos, error: errorGet } = getInfos;
*/
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const importFile = (fileImport) => {
    const newFile = fileImport;
    let previewFile = null;
    if (newFile.type.split("/")[0] === "image" && newFile.size > 1000000) {
      toast.error(
        `${newFile.name} est trop volumineux (+ 1Mo). Compression requise.`
      );
    } else {
      previewFile = Object.assign(newFile, {
        id: uniqId(),
        preview: URL.createObjectURL(newFile),
      });
    }
    if (previewFile) {
      setFile(previewFile);
    }
  };

  const onSubmit = async (dataForm) => {
    console.log(dataForm);
    /* const savedData = await instanceRef.current.save();
    const infosUpdated = {
      lastname: dataForm.lastname ? dataForm.lastname : infos.lastname,
      firstname: dataForm.firstname ? dataForm.firstname : infos.firstname,
      email: dataForm.email ? dataForm.email : infos.email,
      phone: dataForm.phone ? dataForm.phone : infos.phone,
      city: dataForm.city ? dataForm.city : infos.city,
      country: dataForm.country ? dataForm.country : infos.country,
      facebook: dataForm.facebook ? dataForm.facebook : infos.facebook,
      instagram: dataForm.instagram ? dataForm.instagram : infos.instagram,
      twitter: dataForm.twitter ? dataForm.twitter : infos.twitter,
      aboutDescription: savedData,
    };
    const formData = new FormData();
    formData.append("infos", JSON.stringify(infosUpdated));
    formData.append("image", file);
    dispatch(updateInfosHandler(formData)); */
  };

  /*  useEffect(() => {
    if (Object.keys(infos).length === 0) {
      dispatch(getInfosHandler());
    }
    if (successUpdate) {
      toast.success("Modifications enregistrées !");
      dispatch(resetInfos());
    }
    if (errorUpdate) {
      toast.error("Impossible d'enregistrer les modifications !");
      dispatch(resetInfos());
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
        <h2>Saisissez les infos générales</h2>
        <div className="form-group">
          <label>Titre</label>
          <input
            {...register("title")}
            placeholder="Titre"
            defaultValue={infos.title}
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input
            {...register("type")}
            placeholder="Ex. Aménagement, Réhabilitation"
            defaultValue={infos.type}
          />
        </div>
        <div className="form-group">
          <label>Lieu</label>
          <input
            {...register("place")}
            placeholder="Ex. Marseille, France"
            defaultValue={infos.place}
          />
        </div>
        <div className="form-group">
          <label>Client</label>
          <input
            {...register("client")}
            placeholder="Ex. Particulier, Professionnel"
            defaultValue={infos.client}
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            {...register("date")}
            placeholder="Date"
            type="date"
            defaultValue={infos.date}
          />
        </div>
        <div className="form-group">
          <label>Surface (m²)</label>
          <input
            {...register("area")}
            placeholder="Surface"
            defaultValue={infos.area}
          />
        </div>
        <div className="form-group">
          <label>Statut</label>
          <input
            {...register("statut")}
            placeholder="Ex. Terminé"
            defaultValue={infos.statut}
          />
        </div>
        <div className="form-group">
          <label>Présentation</label>
          <textarea
            {...register("presentation")}
            defaultValue={infos.presentation}
          />
        </div>
      </form>
      <div className="upload-zone-container one-file">
        <h2>Ajoutez la photo principale du projet</h2>
        <div className="apercu-zone one-image">
          {/* {!file ? (
            <img src={infos.aboutPhoto} />
          ) : file.type === "video/mp4" ? (
            <video src={file.preview} />
          ) : (
            <img src={file.preview} />
          )} */}
        </div>
        <div className="upload-zone">
          <BiImport size={120} />
          <p>Cliquez ou déposez votre fichier ici.</p>
          <input
            id="file"
            type="file"
            {...register("file")}
            onChange={(e) => {
              if (e.target.files[0]) {
                importFile(e.target.files[0]);
              }
            }}
          />
          <label
            htmlFor="file"
            className="drop-zone"
            onDragLeave={(e) => {
              e.preventDefault();
              const dropZone = document.getElementsByClassName("drop-zone")[0];
              dropZone.classList.remove("active");
              console.log("File is out zone");
            }}
            onDragOver={(e) => {
              e.preventDefault();
              const dropZone = document.getElementsByClassName("drop-zone")[0];
              dropZone.classList.add("active");
              console.log("File is over zone");
            }}
            onDrop={(e) => {
              e.preventDefault();
              const dropZone = document.getElementsByClassName("drop-zone")[0];
              dropZone.classList.remove("active");
              console.log("File is in the zone");
              importFile(e.dataTransfer.files[0]);
            }}
          ></label>
        </div>
      </div>
      <div className="upload-zone-container many-files">
        <h2>Ajouter les photos du projet</h2>
        <div className="apercu-zone one-image">
          {/* {!file ? (
            <img src={infos.aboutPhoto} />
          ) : file.type === "video/mp4" ? (
            <video src={file.preview} />
          ) : (
            <img src={file.preview} />
          )} */}
        </div>
        <div className="upload-zone">
          <BiImport size={120} />
          <p>Cliquez ou déposez votre fichier ici.</p>
          <input
            id="file"
            type="file"
            {...register("file")}
            onChange={(e) => {
              if (e.target.files[0]) {
                importFile(e.target.files[0]);
              }
            }}
          />
          <label
            htmlFor="file"
            className="drop-zone"
            onDragLeave={(e) => {
              e.preventDefault();
              const dropZone = document.getElementsByClassName("drop-zone")[0];
              dropZone.classList.remove("active");
              console.log("File is out zone");
            }}
            onDragOver={(e) => {
              e.preventDefault();
              const dropZone = document.getElementsByClassName("drop-zone")[0];
              dropZone.classList.add("active");
              console.log("File is over zone");
            }}
            onDrop={(e) => {
              e.preventDefault();
              const dropZone = document.getElementsByClassName("drop-zone")[0];
              dropZone.classList.remove("active");
              console.log("File is in the zone");
              importFile(e.dataTransfer.files[0]);
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
