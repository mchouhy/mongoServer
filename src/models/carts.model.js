// Importación de Mongoose:
import mongoose from "mongoose";

// Definición de un "Schema": objeto que define la forma de los documentos:
const cartSchema = new mongoose.Schema({
      products: [
            {
                  product: {
                        type: mongoose.Schema.Types.ObjectId,
                        reference: 'Product',
                        required: true
                  },
                  quantity: {
                        type: Number,
                        required: true
                  }
            }
      ]
});

// Middleware pre que realiza la población automáticamente - "pre hook":
// cartSchema.pre('findOne', (next) => {
//       this.populate('products.product', '_id title price');
//       next();
// });

// Exportación del model:
export const cartsModel = mongoose.model("carts", cartSchema);
