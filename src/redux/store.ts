import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice/projectSlice';
import userReducer from './slices/userSlice/userSlice';

const store = configureStore({
    reducer: {
        projectReducer,
        userReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
