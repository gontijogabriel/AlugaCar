import axios from "axios";
import { useSession } from "next-auth/react";

const api_url = process.env.NEXT_PUBLIC_API_BASEURL;

const api = axios.create({
    baseURL: api_url,
});

const createAuthApi = () => {
    const { data: session } = useSession();
    return axios.create({
        baseURL: api_url,
        headers: {
            Authorization: `Bearer ${session?.user?.access}`,
        },
    });
};

export const getCars = async (query) => {
    try {
        let response;
        if (query === undefined || Object.keys(query).length === 0) {
            response = await api.get(`/api/v1/cars/`);
        } else {
            const queryString = new URLSearchParams(query).toString();
            response = await api.get(`/api/v1/cars/?${queryString}`);
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar carros:', error);
        throw error;
    }
};


export const getDetailCar = async (carId) => {
    console.log(carId)
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

// export const authUser = async (email, password) => {
//     try {
//         const response = await axios.post('/auth/token', {
//             email: email,
//             password: password
//         }, {
//             headers: {
//                 'Content-type': 'application/json'
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Erro ao autenticar o usuário:', error);
//         throw error;
//     }
// };

export const getRentalUser = async () => {
    try {
        const authApi = createAuthApi();
        const response = await authApi.get('/api/v1/rental/auth-user');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar rentals do usuário:', error);
        throw error;
    }
};