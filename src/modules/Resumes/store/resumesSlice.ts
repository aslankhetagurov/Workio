import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { IJobSearchForm } from '@/shared/components/JobSearchForm/JobSearchForm';
import { ResumeWithExperiencesAndEducations } from '@/shared/types/database.types';

interface IResumesSlice {
    resumesSearchFilters: IJobSearchForm | null;
    editableResume: ResumeWithExperiencesAndEducations | null;
}

const initialState: IResumesSlice = {
    resumesSearchFilters: null,
    editableResume: null,
};

const resumesSlice = createSlice({
    name: 'resumes',
    initialState,
    reducers: {
        setResumesSearchFilters: (state, action) => {
            state.resumesSearchFilters = action.payload;
        },
        setEditableResume: (state, action) => {
            state.editableResume = action.payload;
        },
    },
});

const { reducer, actions } = resumesSlice;

export const { setResumesSearchFilters, setEditableResume } = actions;

export const selectResumesSearchFilters = (state: RootState) =>
    state.resumesReducer.resumesSearchFilters;

export const selectEditableResume = (state: RootState) =>
    state.resumesReducer.editableResume;

export const resumesReducer = reducer;
