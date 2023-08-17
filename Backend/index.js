import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import productsRoutes from './routes/routes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/products', productsRoutes);

const uri = process.env.URI; // Reemplaza esto con tu cadena de conexión de MongoDB Atlas
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
  try {
    await client.connect();
    console.log('Conexión exitosa a la base de datos');

    const db = client.db('Ecofind'); // Reemplaza 'nombre-de-tu-base-de-datos'
    const collection = db.collection('ecofind'); // Reemplaza 'nombre-de-tu-coleccion'

    // Configura la colección en el objeto de respuesta local
    app.locals.collection = collection;

    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  } catch (error) {
    console.log(`Error de conexión: ${error}`);
  }
})();
