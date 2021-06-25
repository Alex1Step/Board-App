import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer from './slice';

const store = configureStore({
    reducer: {
        globalReducer: rootReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
