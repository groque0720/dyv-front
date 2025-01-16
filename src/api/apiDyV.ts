import axios from 'axios';

const apiDyV = axios.create({
  baseURL: import.meta.env.VITE_API_DYV_URL,
});

apiDyV.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiDyV.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response && error.response.status === 401) {
    if (error.response && error.response.status === 401) {
      console.log(error);
      // Aquí puedes manejar la redirección a la página de inicio de sesión
      // Por ejemplo, redirige a /login
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export default apiDyV;
