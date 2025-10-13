import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '@/modules/Auth';
import { locationApi } from './api/locationApi';
import { featuredVacanciesApi } from '@/modules/FeaturedVacancies';
import { topCompaniesApi } from '@/modules/TopCompanies';
import { featuredResumesApi } from '@/modules/FeaturedResumes';
import { resumesReducer } from '@/modules/Resumes';
import { resumesApi } from '@/modules/Resumes';
import { companiesApi, companiesReducer } from '@/modules/Companies';
import { singleVacancyApi } from '@/modules/SingleVacancy';
import { singleResumeApi } from '@/modules/SingleResume';
import { vacanciesApi } from '@/modules/Vacancies';
import { vacanciesReducer } from '@/modules/Vacancies';
import { invitationsApi } from './api/invitationsApi';
import { applicationsApi } from './api/applicationsApi';

const store = configureStore({
    reducer: {
        authReducer,
        [locationApi.reducerPath]: locationApi.reducer,
        [featuredVacanciesApi.reducerPath]: featuredVacanciesApi.reducer,
        [topCompaniesApi.reducerPath]: topCompaniesApi.reducer,
        [featuredResumesApi.reducerPath]: featuredResumesApi.reducer,
        [vacanciesApi.reducerPath]: vacanciesApi.reducer,
        [resumesApi.reducerPath]: resumesApi.reducer,
        [companiesApi.reducerPath]: companiesApi.reducer,
        [singleVacancyApi.reducerPath]: singleVacancyApi.reducer,
        [singleResumeApi.reducerPath]: singleResumeApi.reducer,
        [applicationsApi.reducerPath]: applicationsApi.reducer,
        [invitationsApi.reducerPath]: invitationsApi.reducer,
        vacanciesReducer,
        resumesReducer,
        companiesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            locationApi.middleware,
            featuredVacanciesApi.middleware,
            topCompaniesApi.middleware,
            featuredResumesApi.middleware,
            vacanciesApi.middleware,
            resumesApi.middleware,
            companiesApi.middleware,
            singleVacancyApi.middleware,
            singleResumeApi.middleware,
            applicationsApi.middleware,
            invitationsApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
