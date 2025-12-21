import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChatWithRelations } from '@/shared/types/database.types';
import { RootState } from '@/store';

interface IChatsSliceState {
    activeChatData: ChatWithRelations | null;
}

const initialState: IChatsSliceState = {
    activeChatData: null,
};

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setActiveChatData: (
            state,
            action: PayloadAction<ChatWithRelations | null>
        ) => {
            state.activeChatData = action.payload;
        },
    },
});

export const { setActiveChatData } = chatsSlice.actions;

export const selectActiveChatData = (state: RootState) =>
    state.chatsReducer.activeChatData;

export const chatsReducer = chatsSlice.reducer;
