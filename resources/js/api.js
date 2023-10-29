import axios from 'axios';

// Create a custom Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    Accept: "application/json",
    'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2),
  },
});

// Add an interceptor to include the token in the Authorization header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
