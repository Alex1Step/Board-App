import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { BoardI } from '../../interfaces';
import indexApi from '../../../api/indexApi';

export const refreshBoardPage = createAsyncThunk<
    | {
          [key: string]: BoardI[];
      }
    | undefined,
    string,
    { state: RootState }
>('user/refreshPage', async (user: string, thunkApi) => {
    indexApi.sendToDatabaseApi(
        thunkApi.getState().projectReducer.boards,
        thunkApi.getState().projectReducer.currentProject,
    );
    const newProject = thunkApi.getState().projectReducer.listOfProjects;
    return newProject;
});
