import axios from "axios";
const { data: session } = useSession();

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        Authorization: `Bearer ${session.user.access}`,
    },
});

// Rental
export const getRentalUser = async () => {
    try {
        const response = await api.get('/api/v1/rental/auth-user/');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar cars:', error);
        throw error;
    }
};