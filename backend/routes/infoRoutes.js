import express from "express";
import Info from "../models/Info.js";
import multer from "multer";
import { deleteFiles, uploadFiles } from "../config/s3.js";
import { isAuth } from "../config/middleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.put("/", isAuth, upload.single("image"), async (req, res) => {
  const updateInfos = JSON.parse(req.body.infos);
  let filePath = null;
  try {
    const info = await Info.findById("610afa12cdc17b8484dbfaed");

    if (req.file) {
      /* Delete old AboutPhoto */
      if (info.aboutPhoto) {
        try {
          const oldFileKey = info.aboutPhoto.split("/")[3];
          const deleteResult = await deleteFiles(oldFileKey);
        } catch (error) {
          return res
            .status(400)
            .send({ message: `Impossible de supprimer la précédente photo.` });
        }
      }
      /* Upload new AboutPhoto */
      try {
        let result = await uploadFiles(req.file);
        console.log(`${result.Key} ajouté`);
        if (result) {
          filePath = `/api/files/${result.Key}`;
        }
      } catch (error) {
        return res
          .status(400)
          .send({ message: `Impossible d'importer "${photo.name}"` });
      }
    }
    /* Update details infos */
    info.lastname = updateInfos.lastname;
    info.firstname = updateInfos.firstname;
    info.email = updateInfos.email;
    info.phone = updateInfos.phone;
    info.city = updateInfos.city;
    info.country = updateInfos.country;
    info.facebook = updateInfos.facebook ? updateInfos.facebook : "";
    info.instagram = updateInfos.instagram ? updateInfos.instagram : "";
    info.twitter = updateInfos.twitter ? updateInfos.twitter : "";
    info.aboutDescription = updateInfos.aboutDescription;
    info.aboutPhoto = filePath ? filePath : info.aboutPhoto;

    await info.save();
    return res
      .status(200)
      .send({ message: "Les modifications ont été enregistrées." });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Impossible de sauvegarder les modifications." });
  }
});

router.get("/", async (req, res) => {
  try {
    const infos = await Info.findById("610afa12cdc17b8484dbfaed");
    return res.status(200).send(infos);
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Impossible de récupérer les données." });
  }
});

export default router;
