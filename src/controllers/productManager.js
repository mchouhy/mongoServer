// Importación de model de productos:
import { productModel } from "../models/products.model.js";

//Función de clase manejadora de los productos:
export class ProductManager {
      // Función que trae los productos de la base de datos de Mongo Atlas:
      getProducts = async () => {
            try {
                  const products = await productModel.find();
                  if (!products) {
                        return console.log("No existen productos agregados a la base de datos.");
                  }
                  return products;
            } catch (error) {
                  console.log("Error al intentar ejecutar getProducts", error);
            }
      }

      // Función que trae productos por id:
      getProductById = async (id) => {
            try {
                  const product = await productModel.findById(id);
                  if (!product) {
                        return console.log("No existe un producto con el id ingresado.");
                  }
                  return product;
            } catch (error) {
                  console.log("Error al intentar ejecutar getProductById", error);
            }

      }
      // Función que agrega los objetos de productos a Mongo Atlas:
      addProduct = async ({ title, description, code, price, stock, category, thumbnails }) => {
            try {
                  // Validación para que de error en caso de que falte completar un campo requerido:
                  if (!title || !description || !code || !price || !stock || !category || !thumbnails) {
                        return console.log("Error. Es obligatorio completar todos los campos para agregar el producto.");
                  }
                  // Función de mongoose que busca si existe un producto con la propiedad pasada por parámetro:
                  const existingProduct = await productModel.findOne({ code: code });
                  if (existingProduct) {
                        return console.log("Error. Ya existe un producto en la base de datos con el código ingresado. Intente nuevamente.");
                  }
                  // Variable que guarda el nuevo producto si se pasan las validaciones:
                  const newProduct = new productModel({
                        title,
                        description,
                        code,
                        price,
                        stock,
                        category,
                        thumbnails: thumbnails || [],
                        status: true
                  });
                  // Función de mongoose que guarda el nuevo producto en la base de datos:
                  await newProduct.save();
            } catch (error) {
                  console.log(`Error al intentar agregar el producto: ${title}.`, error);
            }
      }

      // Función que actualiza las propiedades de los objetos de productos almacenados en el archivo JSON. Si no existe el producto que se pretende actualizar se devuelve un mensaje de error.
      updateProduct = async (id, updatedProduct) => {
            try {
                  // Función de mongoose que busca en la base de datos por id y actualiza el producto:
                  const updateProduct = await productModel.findByIdAndUpdate(id, updatedProduct);
                  if (!updateProduct) {
                        return console.log("No existe un producto con el id ingresado");
                  }
                  return console.log(`El producto con el id: ${id} se ha actualizado con éxito en la base de datos. Estos son sus detalles actualizados: `, updateProduct);
            } catch (error) {
                  console.log('Error al leer la base de datos, intente nuevamente.', error)

            }

      }

      deleteProductById = async (id) => {
            try {
                  const deleteProduct = await productModel.findByIdAndDelete(id);
                  if (!deleteProduct) {
                        return console.log("No existe un producto con el id ingresado");
                  }
                  return console.log(`El producto con el id: ${id} se ha eliminado con éxito en la base de datos. Este es el producto que fue eliminado: `, deleteProduct);
            } catch (error) {
                  console.log('Error al eliminar el producto de la base de datos.', error)
            }
      }
}