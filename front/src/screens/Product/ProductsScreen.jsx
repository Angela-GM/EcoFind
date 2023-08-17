import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateProductLikeStatus } from "../../services/ApiConection";
import axios from "axios";
import { Link } from 'react-router-dom';

import { AiOutlineArrowLeft } from 'react-icons/ai';

import Chat from '../../components/chat/Chat'

import Header from "../../components/Header/Header";
import "../Product/ProductScreen.css";

export default function ProductsScreen() {
  const { productId } = useParams();
  console.log(productId);
  const [products, setProducts] = useState([]); // Inicializar el estado del producto con null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://xzk6zy-8000.csb.app' ||'http://localhost:8000'
        );
        if (response.status === 200) {
          const data = response.data;
          setProducts(data);
          console.log(data); // Imprime los datos para verificar si se reciben correctamente
        }
      } catch (error) {
        console.error({
          message: "\n\nInvalid endpoint: `/beers/`. Did you mean `/beers`?\n",
          code: 404,
        });
      }
    };
    fetchData(); // Llama a la función fetchData en lugar de fetchProducts
  }, [productId]);

  const product = products.find((product) => product._id === productId);
  console.log(product);


  const handleLikeClick = async () => {
    if (product) {
      try {
        // Actualizar el estado "favorite" del producto en el backend
        await updateProductLikeStatus(product._id, !product.isFavorite);
        // Actualizar el estado local del producto con el nuevo estado "favorite"
        setProducts((prevProduct) => ({ ...prevProduct, isFavorite: !prevProduct.isFavorite }));
      } catch (error) {
        console.error("Error updating product like status:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <Link className="btnAtras" to={`/`}>
            Volver
            </Link>
      <div className="container">
        {product ? ( // Verificar si el producto existe antes de mostrar sus detalles
          <div>
            <div className="imagenProducto">
              <img className="imgProducto" src={product.image_url} alt="imagenProducto"></img>
            </div>

            <div className="description">
              <div>
                <h1 style={{ textAlign: "left" }}>{product.name}</h1>
                <h2 style={{ textAlign: "left" }}>{product.price + '€'}</h2>
                <button className="btnCompra" onClick={handleLikeClick}>
                  {product.isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                </button>
                <div className="textDescription">
                  <h3 style={{ maxWidth: "250px" }}>{product.description}</h3>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Cargando producto...</p>
        )}
        <Chat/>
      </div>
    </>
  );
}
