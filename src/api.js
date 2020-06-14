import axios from 'axios';

const api = axios.create({
    baseURL: 'https://agendatelefonica.herokuapp.com/',
});

export default api;