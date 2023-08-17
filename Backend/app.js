import express from 'express';
import cors from 'cors';
import db from './database/db.js';
import productsRoutes from './routes/routes.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/products', productsRoutes);


try {
  await db.authenticate();
  console.log('Conexión exitosa a la base de datos');
} catch (error) {
  console.log(`Error de conexión: ${error}`);
}

app.listen(8000, () => {
  console.log('Server is up and running at http://localhost:8000/');
});
