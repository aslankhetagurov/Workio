import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { IJobSearchForm } from '@/shared/components/JobSearchForm/JobSearchForm';
import { VacancyWithCompany } from '@/shared/types/database.types';

interface IVacanciesSlice {
    vacanciesSearchFilters: IJobSearchForm | null;
    editableVacancy: VacancyWithCompany | null;
}

const initialState: IVacanciesSlice = {
    vacanciesSearchFilters: null,
    editableVacancy: null,
};

const vacanciesSlice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.vacanciesSearchFilters = action.payload;
        },
        setEditableVacancy: (state, action) => {
            state.editableVacancy = action.payload;
        },
    },
});

const { reducer, actions } = vacanciesSlice;

export const { setFilters, setEditableVacancy } = actions;

export const selectVacanciesSearchFilters = (state: RootState) =>
    state.vacanciesReducer.vacanciesSearchFilters;
export const selectEditableVacancy = (state: RootState) =>
    state.vacanciesReducer.editableVacancy;

export const vacanciesReducer = reducer;
