import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { ICompanySearchForm } from '../components/CompaniesSearchForm/CompaniesSearchForm';

interface ICompaniesSlice {
    companiesSearchFilters: ICompanySearchForm | null;
}

const initialState: ICompaniesSlice = {
    companiesSearchFilters: null,
};

const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        setCompaniesSearchFilters: (state, action) => {
            state.companiesSearchFilters = action.payload;
        },
    },
});

const { reducer, actions } = companiesSlice;

export const { setCompaniesSearchFilters } = actions;
export const selectCompaniesSearchFilters = (state: RootState) =>
    state.companiesReducer.companiesSearchFilters;

export const companiesReducer = reducer;
