import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiConfig } from '../../config/api-config'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: apiConfig.API_URL,
        prepareHeaders: (headers) => {
            headers.set("accept", "application/json");
            headers.set("content-type", "application/json");
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);
            return headers;
        }
    }),
    endpoints: () => ({}),
})