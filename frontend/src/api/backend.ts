// src/api/backend.js
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Replace with Django backend URL

export const fetchSomething = async () => {
  try {
    const response = await axios.get(`${API_URL}/api`);  // replace with endpoint
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
