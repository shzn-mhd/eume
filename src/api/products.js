import axios from 'utils/axios';

// ⬇️ this is the loader for the detail route
export async function loader() {
  try {
    const response = await axios.get('/api/products/list');
    return response.data.products;
  } catch (error) {
    return error;
  }
}

export async function filterProducts(filter) {
  return await axios.post('/api/products/filter', { filter });
}

export async function productLoader({ params }) {
  try {
    const response = await axios.post('/api/product/details', { id: params.id });
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function getRelatedProducts(id) {
  return await axios.post('/api/product/related', { id });
}

export async function getProductReviews() {
  return await axios.get('/api/review/list');
}
