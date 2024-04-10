import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const useGetFeatures =  (filters) => {
    return useQuery({
        queryKey: ['features', filters],
        queryFn: async () => {
            const response = await api.get('/features', {
                params: {
                    filters,
                    page: filters?.page,
                    per_page: filters?.per_page
                },
            });
            return response.data;
        }
    }
    );
};

export const useGetFeature = (featureId) => {
    return useQuery({
        queryKey: ['feature', featureId],
        queryFn: async () => {
            const response = await api.get(`/features/${featureId}`);
            return response.data;
        }
    }
    );
};

export const useCreateComment = (fnData) => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await api.post(`/features/${data.featureId}/comments`, data);
            return response.data;
        },
        onSuccess: () => {
            fnData();
        },
    });
};