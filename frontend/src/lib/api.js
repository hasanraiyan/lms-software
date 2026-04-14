import axios from 'axios';

// Create an Axios instance configured to point at our protected API endpoints
export const api = axios.create({
  // The base URL matches the vite proxy (or an absolute URL in production)
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject the JWT accessToken automatically on outbound requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// We can add response interceptors later here to auto-refresh the token if a 401 is encountered using the `refreshToken`.

export default api;
