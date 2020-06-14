import axios from 'axios';

const api = axios.create({
    baseURL: 'https://listamotos1.herokuapp.com',
});

export default api;