export const config = {
  apiBaseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://sasyamrita-backend.onrender.com'
    : 'http://localhost:5000'
}; 