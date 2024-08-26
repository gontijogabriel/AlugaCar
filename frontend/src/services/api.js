import axios from "axios";
import { useSession } from "next-auth/react";


const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});


const createAuthApi = () => {
    const { data: session } = useSession();
    return axios.create({
        baseURL: 'http://127.0.0.1:8000',
        headers: {
            Authorization: `Bearer ${session.user.access || ''}`,
        },
    });
};


export const getCars = async () => {
    try {
        const response = await api.get('/api/v1/cars');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar carros:', error);
        throw error;
    }
};

export const getDetailCar = async (carId) => {
    try {
        const response = await api.get(`/api/v1/cars/${carId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar detalhes do carro:', error);
        throw error;
    }
};

export const getCarDataFilters = async () => {
    try {
        const response = await api.get('/api/v1/cars/filter');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados do filtro dos carros:', error);
        throw error;
    }
};


export const getRentalUser = async () => {
    try {
        const authApi = createAuthApi();
        const response = await authApi.get('/api/v1/rental/auth-user/');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar rentals do usuário:', error);
        throw error;
    }
};