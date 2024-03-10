// Importación de Mongoose:
import mongoose from "mongoose";

// Definición de un "Schema": objeto que define la forma de los documentos:
const productSchema = new mongoose.Schema({
      title: String,
      description: String,
      price: Number,
      thumbnails: String,
      stock: Number,
      code: String,
      status: Boolean,
      category: String
});

// Exportación del model:
export const productsModel =  mongoose.model("products", productSchema);

