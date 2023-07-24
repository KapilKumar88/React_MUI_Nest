import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { apiSlice } from './services/api-slice';
import userSlice from './slices/user-slice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
});

setupListeners(store.dispatch)