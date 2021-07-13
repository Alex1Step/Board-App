import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BoardI } from '../interfaces';
import { initialState } from '../initialState';
import indexApi from '../../api/indexApi';
import deepCopy from '../../utils/deepCopy';

export const deleteProject = createAsyncThunk('board/deleteProject', async (project: string) => {
    indexApi.deleteProjectFromDBApi(project);
    return project;
});

export const createNewProject = createAsyncThunk('board/createNewProject', async (projectTitle: string) => {
    const newProject: BoardI[] = [...initialState.boards];
    const title = projectTitle;
    await indexApi.sendToDatabaseApi(newProject, projectTitle);
    return { newProject, title };
});

export const loadBoard = createAsyncThunk('board/loadBoard', async (project: string) => {
    let thisBoards: BoardI[] = deepCopy(initialState.boards);
    thisBoards = await indexApi.fetchUserDataFromBaseApi(project);
    return { thisBoards, project };
});

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        resetProjectCreated(state) {
            state.projectCreated = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createNewProject.fulfilled, (state, action) => {
            const tempState = deepCopy(state);
            tempState.boards = action.payload.newProject;
            tempState.currentProject = action.payload.title;
            tempState.listOfProjects[`${action.payload.title}`] = [];
            tempState.projectCreated = true;
            return tempState;
        });
        builder.addCase(loadBoard.fulfilled, (state, action) => {
            state.boards = action.payload.thisBoards;
            state.currentProject = action.payload.project;
        });
        builder.addCase(deleteProject.fulfilled, (state, action) => {
            const tempState = deepCopy(state);
            delete tempState.listOfProjects[action.payload];
            return tempState;
        });
    },
});

export const { resetProjectCreated } = projectSlice.actions;
export default projectSlice.reducer;
