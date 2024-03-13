// Conexión a la base de datos de Mongo Atlas:
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://mchouhy:coderhouse@cluster0.uc50yks.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("Conectado a la base de datos de Mongo Atlas"))
.catch(() => console.log("Error al intentar conectarse a la base de datos de Mongo Atlas."))