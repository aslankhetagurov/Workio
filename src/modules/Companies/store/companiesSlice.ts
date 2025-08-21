import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { ICompanySearchForm } from '../components/CompaniesSearchForm/CompaniesSearchForm';
import { CompanyWithUserAndVacanciesAndReviews } from '@/shared/types/database.types';

interface ICompaniesSlice {
    companiesSearchFilters: ICompanySearchForm | null;
    editableCompany: CompanyWithUserAndVacanciesAndReviews | null;
}

const initialState: ICompaniesSlice = {
    companiesSearchFilters: null,
    editableCompany: null,
};

const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        setCompaniesSearchFilters: (
            state,
            action: PayloadAction<ICompanySearchForm | null>
        ) => {
            state.companiesSearchFilters = action.payload;
        },
        setEditableCompany: (
            state,
            action: PayloadAction<CompanyWithUserAndVacanciesAndReviews | null>
        ) => {
            state.editableCompany = action.payload;
        },
    },
});

const { reducer, actions } = companiesSlice;

export const { setCompaniesSearchFilters, setEditableCompany } = actions;
export const selectCompaniesSearchFilters = (state: RootState) =>
    state.companiesReducer.companiesSearchFilters;
export const selectEditableCompany = (state: RootState) =>
    state.companiesReducer.editableCompany;

export const companiesReducer = reducer;
