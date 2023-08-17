import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:8000' || 'https://xzk6zy-8000.csb.app',
});

export const fetchProducts = async (searchQuery) => { // Agrega el parámetro searchQuery
  try {
    const response = await apiService.get(
      searchQuery === ""
        ? "/products"
        : `/products/search/${searchQuery}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};

// Función para actualizar el estado "favorite" de un producto
export const updateProductLikeStatus = async (productId, isFavorite) => {
  try {
    // Enviar la solicitud PUT al endpoint correspondiente para actualizar el estado "favorite" del producto
    await apiService.put(`/products/${productId}/like`, { isFavorite });
  } catch (error) {
    throw new Error('Error updating product like status');
  }
};
