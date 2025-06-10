import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { IJobSearchForm } from '@/shared/components/JobSearchForm/JobSearchForm';

interface IVacanciesSlice {
    vacanciesSearchFilters: IJobSearchForm | null;
}

const initialState: IVacanciesSlice = {
    vacanciesSearchFilters: null,
};

const vacanciesSlice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.vacanciesSearchFilters = action.payload;
        },
    },
});

const { reducer, actions } = vacanciesSlice;

export const { setFilters } = actions;
export const selectVacanciesSearchFilters = (state: RootState) =>
    state.vacanciesReducer.vacanciesSearchFilters;

export const vacanciesReducer = reducer;
