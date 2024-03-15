// Importación del Router de Express JS:
import { Router } from "express";
// Importación del manejador de productos:
import { ProductManager } from '../controllers/productManager.js';
// Creación del Router de Products:
const productsRouter = Router();
// Llamado de la función constructora:
const productManager = new ProductManager;

// Rutas de productos:
// Get que retorna todos los productos o los productos limitados aplicando un query:
productsRouter.get("/", async (request, response) => {
    try {  
        const limit = request.query.limit;
        const products = await productManager.getProducts();
        if(limit) {
            response.json(products.slice(0, limit));
        } else {
            response.json(products);
        }
    } catch (error) {
        console.log('Error al obtener los productos de Mongo Atlas.', error);
        response.status(500).json({ error: 'Error interno del servidor.' });
    }
})

// Get que retorna un producto por id ingresado:
productsRouter.get("/:prodId", async (request, response) => {
    // Se define la variable que aplica el request params del id a ingresar por el cliente:
    const { prodId } = request.params;
    try {
        const product = await productManager.getProductById(prodId);
        if(!product) {
            return response.json({error: "Producto no encontrado."});
        }
        response.json(product);
    } catch (error) {
        response.status(500).json({error: 'No existe un producto con el id ingresado.'});
    }
})

// Post que agrega un nuevo producto al archivo json de productos:
productsRouter.post("/", async (request, response) => {
    const newProduct = request.body;
    try {
        await productManager.addProduct(newProduct);
        response.status(201).json({message: 'Producto agregado con éxito.'});
    } catch (error) {
        response.status(500).json({error: 'Error. No se pudo agregar el producto.'});
    }
})

// Put que actualiza el producto seleccionado por id:
productsRouter.put("/:prodId", async (request, response) => {
    const { prodId } = request.params;
    const updatedProduct = request.body;
    try {
        await productManager.updateProduct(prodId, updatedProduct);
        response.status(201).json({message: "Producto actualizado exitosamente."});
    } catch (error) {
        response.status(500).json({error: 'No se pudo actualizar el producto.'});
    }
})

// Delete que elimina el producto seleccionado por id:
productsRouter.delete("/:prodId", async (request, response) => {
    const { prodId } = request.params;
    try {
        await productManager.deleteProductById(prodId);
        response.status(201).json({message: "Producto eliminado con éxito."});
    } catch (error) {
        response.status(500).json({error: 'No se pudo eliminar el producto.'});
    }
})

// Exportación del router para utilizarlo desde app.js:
export { productsRouter };