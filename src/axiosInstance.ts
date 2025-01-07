import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://mocki.io/v1',
    timeout: 3000, 
});

export default axiosInstance;