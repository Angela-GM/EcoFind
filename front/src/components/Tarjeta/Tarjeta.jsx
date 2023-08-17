import React, { useState, useEffect } from 'react';
import './Tarjeta.css';
import { Link } from 'react-router-dom';
import { useLikesContext } from '../NotificationBadge/LikesContext';
import Corazon from '../NotificationBadge/Corazon';
import { fetchProducts } from '../../services/ApiConection';
import { updateProductLikeStatus }  from '../../services/ApiConection';

const Tarjeta = ({ cardId, linkto }) => {
  const { likedCards, handleLike } = useLikesContext();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts(searchQuery);
        setProducts(productsData);
      } catch (error) {
        console.error(error.message);
      }
    };

    getProducts();
  }, [searchQuery]);

  const handleLikeClick = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, isFavorite: !product.isFavorite }
        : product
    );

    setProducts(updatedProducts);

    // Llamar a la función para actualizar el estado "favorite" del producto en el backend
    updateProductLikeStatus(productId, !likedCards[productId]);

    // Llamar a la función handleLike del contexto para actualizar el estado local de likedCards
    handleLike(productId, !likedCards[productId]);
  };

  return (
    <section>
      {/* Input de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQuery}
          placeholder="Buscar productos..."
          className="search-input"
        />
      </div>

      <div className="flex-container">
        {/* Utilizar map para mostrar todos los productos */}
        {products.map((product) => (
          <div className="containerTarjeta" key={product.id}>
            <img className="imgTarjeta" src={product.image_url} alt="Imagentarjeta" />
            <div className="botonesTarjeta">
              <h2 className="prodName">{product.name}</h2>
              <div className="botonesTarjeta2">
              <button className="price">{product.price + '€'}</button>               
               <Corazon
                  isLiked={product.isFavorite}
                  onClick={() => handleLikeClick(product.id)} // Pasar el id del producto
                />
              </div>
            </div>
            <Link className='btn-detalle' style={{ textDecoration: "none", color: "white" }} to={`/products/${product._id}`}>
              Ver Detalles
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tarjeta;
