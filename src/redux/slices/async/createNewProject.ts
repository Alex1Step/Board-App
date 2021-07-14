import { createAsyncThunk } from '@reduxjs/toolkit';
import { BoardI } from '../../interfaces';
import { initialState } from '../../initialState';
import indexApi from '../../../api/indexApi';

export const createNewProject = createAsyncThunk('project/createNewProject', async (projectTitle: string) => {
    const newProject: BoardI[] = [...initialState.boards];
    const title = projectTitle;
    await indexApi.sendToDatabaseApi(newProject, projectTitle);
    return { newProject, title };
});
