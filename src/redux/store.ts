import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slice';

const store = configureStore({
    reducer: {
        globalReducer: rootReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
