import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = '/auth/signin';
                return Promise.reject(new Error("Sesión expirada"));
            }

            return Promise.reject(error);
        }

        return Promise.reject(new Error("No se pudo conectar con el servidor"));
    }
);

export default api;