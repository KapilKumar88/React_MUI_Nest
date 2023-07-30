import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiConfig } from '../../config/api-config'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: apiConfig.API_URL,
        prepareHeaders: (headers) => {
            const localStorageItems = JSON.parse(localStorage.getItem("user"));
            headers.set("Authorization", `Bearer ${localStorageItems?.accessToken}`);
            return headers;
        }
    }),
    endpoints: () => ({}),
});