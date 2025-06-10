import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { IJobSearchForm } from '@/shared/components/JobSearchForm/JobSearchForm';

interface IResumesSlice {
    resumesSearchFilters: IJobSearchForm | null;
}

const initialState: IResumesSlice = {
    resumesSearchFilters: null,
};

const resumesSlice = createSlice({
    name: 'resumes',
    initialState,
    reducers: {
        setResumesSearchFilters: (state, action) => {
            state.resumesSearchFilters = action.payload;
        },
    },
});

const { reducer, actions } = resumesSlice;

export const { setResumesSearchFilters } = actions;
export const selectResumesSearchFilters = (state: RootState) =>
    state.resumesReducer.resumesSearchFilters;

export const resumesReducer = reducer;
