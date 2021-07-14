import { createAsyncThunk } from '@reduxjs/toolkit';
import { BoardI } from '../../interfaces';
import { initialState } from '../../initialState';
import indexApi from '../../../api/indexApi';
import deepCopy from '../../../utils/deepCopy';

export const loadBoard = createAsyncThunk('project/loadBoard/fulfilled', async (project: string) => {
    let thisBoards: BoardI[] = deepCopy(initialState.boards);
    thisBoards = await indexApi.fetchUserDataFromBaseApi(project);
    return { thisBoards, project };
});
