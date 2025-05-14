import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '@/modules/Auth';
import { locationApi } from './api/locationApi';
import { featuredVacanciesApi } from '@/modules/FeaturedVacancies/api/featuredVacanciesApi';

const store = configureStore({
    reducer: {
        authReducer,
        [locationApi.reducerPath]: locationApi.reducer,
        [featuredVacanciesApi.reducerPath]: featuredVacanciesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            locationApi.middleware,
            featuredVacanciesApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
