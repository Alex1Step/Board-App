import { createAsyncThunk } from '@reduxjs/toolkit';
import indexApi from '../../../api/indexApi';

export const deleteProject = createAsyncThunk('project/deleteProject', async (project: string) => {
    indexApi.deleteProjectFromDBApi(project);
    return project;
});
