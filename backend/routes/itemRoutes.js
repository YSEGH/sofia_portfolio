import express from "express";
import Item from "../models/Item.js";
import multer from "multer";
import { deleteFiles, uploadFiles } from "../config/s3.js";
import { isAuth } from "../config/middleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  isAuth,
  upload.fields([{ name: "files" }]),
  async (req, res) => {
    let result;
    const itemAdd = JSON.parse(req.body.item);
    let photos = [];

    const item = new Item({
      title: itemAdd.title,
      type: itemAdd.type,
      categories: itemAdd.categories,
      description: itemAdd.description,
      date: itemAdd.date,
      place: itemAdd.place,
      surface: itemAdd.surface,
      statut: itemAdd.statut,
      client: itemAdd.client,
    });

    /* Importation des fichiers */
    try {
      if (req.files.files) {
        for (let i = 0; i < req.files.files.length; i++) {
          const file = req.files.files[i];
          result = await uploadFiles(file);
          console.log(`${result.Key} ajouté`);
          photos.push({
            src: `/api/files/${result.Key}`,
            type: file.mimetype,
          });
        }
      }

      item.photos = photos;

      await item.save();
      return res.status(200).send({ message: "Ajouts effectués avec succés." });
    } catch (error) {
      return res
        .status(400)
        .send({ message: "Impossible d'importer les fichiers." });
    }
  }
);

router.get("/", async (req, res) => {
  const offset = req.query.offset ? Number(req.query.offset) : null;
  const per_page = req.query.per_page ? Number(req.query.per_page) : null;
  const filterID = req.query.itemId ? { _id: req.query.itemId } : {};
  const filterCategorie = req.query.filters
    ? { categorie: { $all: req.query.filters } }
    : {};
  try {
    const count = await Item.countDocuments({
      ...filterCategorie,
    });
    const items = await Item.find({
      ...filterID,
      ...filterCategorie,
    })
      .limit(per_page)
      .skip(offset);

    return res.status(200).send({ items: items, count: count });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Impossible de récupérer les données." });
  }
});

/* Recup all filters */
router.get("/filters", async (req, res) => {
  let filters = [];
  const filterCategorie = req.query.filters
    ? { categorie: { $all: req.query.filters } }
    : {};
  try {
    const items = await Item.find({
      ...filterCategorie,
    });

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.categorie.map((cate, i) => {
        const cateExist = filters.find(
          (x) => x.name.toLowerCase() === cate.toLowerCase()
        );
        if (cateExist) {
          filters.map((filter) =>
            filter.name === cate ? { ...filter, qty: filter.qty++ } : filter
          );
        } else {
          filters.push({ name: cate.toLowerCase(), qty: 1 });
        }
      });
    }
    return res.status(200).send(filters);
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Impossible de récupérer les filtres." });
  }
});

router.put("/file-delete", isAuth, async (req, res) => {
  let itemId = req.body.itemId;
  let filesToDelete = req.body.filesToDelete;

  try {
    const item = await Item.findById(itemId);
    let photos = item.photos;
    let newPhotos = [];

    for (let i = 0; i < filesToDelete.length; i++) {
      const file = filesToDelete[i];
      const fileKey = file.src.split("/")[3];
      const deleteResult = await deleteFiles(fileKey);
    }
    newPhotos = photos.filter((el) => {
      return !filesToDelete.find((element) => {
        return element.src === el.src;
      });
    });
    item.photos = newPhotos;
    await item.save();
    return res.status(200).send({ message: `Modifications enregistrées.` });
  } catch (error) {
    return res
      .status(400)
      .send({ message: `Impossible de supprimer le fichier.` });
  }
});

router.put(
  "/",
  isAuth,
  upload.fields([{ name: "files" }]),
  async (req, res) => {
    let result;
    let photos = [];
    const itemAdd = JSON.parse(req.body.item);
    console.log(req.files.files);
    try {
      const item = await Item.findById(itemAdd._id);
      /* Importation des fichiers */
      if (req.files.files) {
        for (let i = 0; i < req.files.files.length; i++) {
          const file = req.files.files[i];
          result = await uploadFiles(file);
          console.log(`${result.Key} ajouté`);
          photos.push({
            src: `/api/files/${result.Key}`,
            type: file.mimetype,
          });
        }
        item.photos = item.photos.concat(photos);
      }

      item.title = itemAdd.title;
      item.type = itemAdd.type;
      item.categories = itemAdd.categories;
      item.description = itemAdd.description;
      item.date = itemAdd.date ? itemAdd.date : item.date;
      item.place = itemAdd.place;
      item.surface = itemAdd.surface;
      item.client = itemAdd.client;
      item.statut = itemAdd.statut;

      await item.save();
      return res
        .status(200)
        .send({ message: "Les modifications ont été enregistrées." });
    } catch (error) {
      return res
        .status(400)
        .send({ message: "Impossible de sauvegarder les modifications." });
    }
  }
);

router.delete("/:itemId", isAuth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);

    console.log(item);
    /* Suppression des fichiers */
    for (let i = 0; i < item.photos.length; i++) {
      const file = item.photos[i];
      const oldFileKey = file.src.split("/")[3];
      console.log(oldFileKey);
      const deleteResult = await deleteFiles(oldFileKey);
    }

    /* Suppression de l'item de la BDD */
    await item.remove();
    return res
      .status(200)
      .send({ message: "Suppression effectuée avec succés." });
  } catch (error) {
    return res.status(400).send({ message: "Suppression impossible." });
  }
});

export default router;
