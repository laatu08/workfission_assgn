import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const addProduct = (product) => axios.post(API_URL, product);
export const getProducts = () => axios.get(API_URL);
