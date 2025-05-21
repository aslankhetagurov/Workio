import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/store/index';
import { Tables } from '@/shared/types/database.types';

interface IAuthModalState {
    userData: Tables<'users'> | null;
    authModalIsOpen: boolean;
}

const initialState: IAuthModalState = {
    userData: null,
    authModalIsOpen: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleAuthModal: (state) => {
            state.authModalIsOpen = !state.authModalIsOpen;
        },
        setUserData: (state, action: PayloadAction<Tables<'users'> | null>) => {
            state.userData = action.payload;
        },
    },
});

export const { setUserData, toggleAuthModal } = authSlice.actions;

export const selectAuthModalIsOpen = (state: RootState) =>
    state.authReducer.authModalIsOpen;
export const selectUserData = (state: RootState) => state.authReducer.userData;

export const authReducer = authSlice.reducer;
