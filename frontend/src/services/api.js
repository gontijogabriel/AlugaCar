import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

// User

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

// Rental

