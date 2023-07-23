import { apiSlice } from "../api-slice"

const authApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
            }),
        }),
        login: build.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation
} = authApi;