import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import boardReducer from './boardSlice/boardSlice';
import projectReducer from './projectSlice/projectSlice';
import userReducer from './userSlice/userSlice';

const store = configureStore({
    reducer: {
        boardReducer,
        projectReducer,
        userReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
