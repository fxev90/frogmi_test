import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const useGetFeatures = (filters) => {
    return useQuery({
        queryKey: ['features'],
        queryFn: async () => {
            const response = await api.get('/features', {
                params: {
                    filters,
                },
            });
            return response.data;
        }
    }
    );
};

export const useCreateComment = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await api.post(`/features/${data.featureId}/comments`, data);
            return response.data;
        }
    });
};