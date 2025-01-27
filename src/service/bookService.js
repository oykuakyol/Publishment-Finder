
import axios from 'axios';

const API_KEY = 'kghBXFCwN06ZfkFgTFHIwzo2fDMh0HfI';
const BASE_URL = 'https://api.nytimes.com/svc/books/v3/lists/names.json';

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        'api-key': API_KEY,
      },
    });
  
   console.log(response);
    return response.data.results; // Kitap listesi döner
  } catch (error) {
    console.error('API Error (fetchBooks):', error);
    return [];
  }
};

export const fetchBookDetails = async (isbn) => {
  try {
    const response = await axios.get(`https://api.example.com/book/${isbn}`, {
      params: {
        'api-key': API_KEY,
      },
    });
    return response.data; // Kitap detayları döner
  } catch (error) {
    console.error('API Error (fetchBookDetails):', error);
    return null;
  }
};
