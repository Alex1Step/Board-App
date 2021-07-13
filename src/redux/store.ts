import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cardReducer from './cardSlice/cardSlice';
import boardReducer from './boardSlice/boardSlice';
import projectReducer from './projectSlice/projectSlice';
import userReducer from './userSlice/userSlice';

const store = configureStore({
    reducer: {
        card: cardReducer,
        board: boardReducer,
        project: projectReducer,
        user: userReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
