import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  type: { type: String, default: "" },
  place: { type: String, default: "" },
  photos: { type: Array, default: [] },
  categories: { type: Array, default: [] },
  description: { type: String, default: "" },
  date: { type: String, default: "" },
  surface: { type: String, default: "" },
  statut: { type: String, default: "" },
  client: { type: String, default: "" },
});

const itemModel = mongoose.model("item", itemSchema);

export default itemModel;
