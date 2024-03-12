// Importación de Mongoose:
import mongoose from "mongoose";

// Definición de un "Schema": objeto que define la forma de los documentos:
const productSchema = new mongoose.Schema({
      title: {
            type: String,
            required: true
      },
      description: {
            type: String,
            required: true
      },
      price: {
            type: Number,
            required: true
      },
      thumbnails: {
            type: [String]
      },
      stock: {
            type: Number,
            required: true
      },
      code: {
            type: String,
            required: true
      },
      status: {
            type: Boolean,
            required: true
      },
      category: {
            type: String,
            required: true
      }
});

// Exportación del model:
export const productModel = mongoose.model("products", productSchema);

