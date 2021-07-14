import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import indexApi from '../../../api/indexApi';

export const logOut = createAsyncThunk<void, string, { state: RootState }>(
    'user/logOut',
    async (user: string, thunkApi) => {
        indexApi.sendToDatabaseApi(
            thunkApi.getState().projectReducer.boards,
            thunkApi.getState().projectReducer.currentProject,
        );
        indexApi.logOutApi();
    },
);
