import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const data = error.response?.data;

    return Promise.reject({
      status: error.response?.status,
      message: data?.message || error.message || 'Something went wrong.',
      errors: data?.errors || null,
    });
  }
);

export const getStations = () => API.get('/stations');
export const createStation = (data) => API.post('/stations', data);
export const getStationDetails = (id) => API.get(`/stations/${id}`);

export default API;