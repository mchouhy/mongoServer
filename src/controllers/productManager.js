// Importación del módulo nativo de Node: "FileSystem", específicamente el de promesas, asignado a la variable "fs".
import { promises as fs } from "fs"
// Importación de model de productos:
import { productModel } from "../models/products.model.js";

//Función de clase constructora que recibe la ruta a trabajar desde el momento de generar la instancia:
export class ProductManager {
      // Función que agrega los objetos de productos a Mongo Atlas:
      addProduct = async ({title, description, code, price, stock, category, thumbnails}) => {
            try {
                  if(!title || !description || !code || !price || !stock || !category || !thumbnails) {
                        return console.log("Error. Es obligatorio completar todos los campos para agregar el producto.");
                  }

                  const existingProduct = await productModel.findOne({code: code});
                  if(existingProduct) {
                        return console.log("Error. Ya existe un producto en la base de datos con el código ingresado. Intente nuevamente.");
                  }

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

                  newProduct.save();
                 
                  
            } catch (error) {
                  console.log(`Error al agregar el producto: ${product.title}.`, error);
            }
      }

      // Función que actualiza las propiedades de los objetos de productos almacenados en el archivo JSON. Si no existe el producto que se pretende actualizar se devuelve un mensaje de error.
      updateProduct = async (prodId, {title, description, price, thumbnails, code, stock, status, category}) => {
            try {
                  //Lectura del archivo JSON y parse.
                  const productsDB = await this.getProducts()
                  const productToUpdate = productsDB.find(prod => prod.id === prodId)
                  if (productToUpdate) {
                        productToUpdate.title = title || productToUpdate.title
                        productToUpdate.description = description || productToUpdate.description
                        productToUpdate.price = price || productToUpdate.price
                        productToUpdate.thumbnails = thumbnails || productToUpdate.thumbnails
                        productToUpdate.code = code || productToUpdate.code
                        productToUpdate.stock = stock || productToUpdate.stock
                        productToUpdate.status = status || productToUpdate.status
                        productToUpdate.category = category || productToUpdate.category
                        const updatedProductsToJSON = JSON.stringify(productsDB, null, 2)
                        await fs.writeFile(this.path, updatedProductsToJSON, 'utf-8')
                        return console.log(`El producto con el id: ${prodId} se ha actualizado con éxito en la base de datos. Estos son sus detalles actualizados: `, productToUpdate)
                  } else {
                        return console.log(`Error al actualizar. No existe un producto en la base de datos con el número de id: ${prodId}.`)
                  }
            } catch (error) {
                  console.log('Error al leer la base de datos, intente nuevamente.', error)

            }

      }

      deleteProductById = async (prodId) => {
            try {
                  //Lectura del archivo JSON y parse.
                  const productsDB = await this.getProducts()
                  const indexToRemove = productsDB.findIndex(prod => prod.id === prodId)
                  if (indexToRemove !== -1) {
                        productsDB.splice(indexToRemove, 1)
                        await fs.writeFile(this.path, JSON.stringify(productsDB, null, 2), 'utf-8')
                        return console.log(`El producto identificado con el id: ${prodId} ha sido eliminado con éxito y se ha actualizado el listado de productos.`)
                  } else {
                        return console.log(`Error al eliminar. El producto identificado con el id: ${prodId} no existe.`)
                  }
            } catch (error) {
                  console.log('Error al consultar la base de datos.', error)
            }

      }
      
}