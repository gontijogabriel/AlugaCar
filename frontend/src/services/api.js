import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

// Cars
export const getCars = async () => {
    try {
        const response = await api.get('/api/v1/cars');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar cars:', error);
        throw error;
    }
};

export const getDetailCar = async (carId) => {
    try {
        const response = await api.get(`/api/v1/cars/${carId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar cars:', error);
        throw error;
    }
};

export const getCarDataFilters = async () => {
    try {
        const response = await api.get(`/api/v1/cars/filter`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados do filtro dos carros:', error);
        throw error;
    }
};

