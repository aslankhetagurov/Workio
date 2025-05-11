import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '@/modules/Auth';
import { locationApi } from './api/locationApi';

const store = configureStore({
    reducer: {
        authReducer,
        [locationApi.reducerPath]: locationApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(locationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
