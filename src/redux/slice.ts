import { createSlice, current, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { IchangeValue } from '../components/custom/Card/interfaces';
import { moveTaskI, changeBoardNameI, TaskI, BoardI } from './interfaces';
import { LoginI } from '../pages/LogInLayout/interfaces';
import { IAssignee } from '../containers/AdminPanel/interfaces';
import { initialState } from './initialState';
import indexApi from '../api/indexApi';
import { deleteTask } from '../utils/deleteTask';
import { deleteBoard } from '../utils/deleteBoard';
import deepCopy from '../utils/deepCopy';
import replacer from '../utils/replacer';

export const deleteProject = createAsyncThunk('board/deleteProject', async (project: string) => {
    indexApi.deleteProjectFromDBApi(project);
    return project;
});

export const addNewAssignee = createAsyncThunk('board/addNewAssignee', async (user: IAssignee) => {
    const changedAssignee = {
        email: replacer(user.email),
        name: user.name,
    };
    indexApi.newAssigneeToDBApi(changedAssignee);
    return changedAssignee;
});

export const refreshBoardPage = createAsyncThunk<void, string, { state: RootState }>(
    'board/refreshPage/fullfiled',
    async (user: string, thunkApi) => {
        indexApi.sendToDatabaseApi(
            thunkApi.getState().globalReducer.boards,
            thunkApi.getState().globalReducer.currentProject,
        );
    },
);

export const onLoadPage = createAsyncThunk(
    'board/pageLoad',
    async (setData: React.Dispatch<React.SetStateAction<boolean>>) => {
        const user = localStorage.getItem('user');
        let listOfProjects: { [key: string]: BoardI[] } = {};
        let listOfAssignee: { [key: string]: string } = {};
        let isAdmin = false;
        let userName = '';
        if (user) {
            userName = user;
            listOfProjects = await indexApi.fetchListOfProjectsApi();
            listOfAssignee = await indexApi.fetchListOfAssigneeApi();
            const admins = await indexApi.fetchListOfAdminsApi();
            if (replacer(user) in admins) isAdmin = true;
        }
        setData(true);
        return { listOfProjects, listOfAssignee, isAdmin, userName };
    },
);

export const createNewProject = createAsyncThunk('board/createNewProject', async (projectTitle: string) => {
    const newProject: BoardI[] = [...initialState.boards];
    const title = projectTitle;
    await indexApi.sendToDatabaseApi(newProject, projectTitle);
    return { newProject, title };
});

export const signIn = createAsyncThunk('board/signIn', async (userData: LoginI) => {
    let listOfProjects: { [key: string]: BoardI[] } = {};
    let listOfAssignee: { [key: string]: string } = {};
    let isAdmin = false;
    const userName = userData.username;
    const response = await indexApi.signInApi(userData.username, userData.password);
    if (response) {
        listOfProjects = await indexApi.fetchListOfProjectsApi();
        listOfAssignee = await indexApi.fetchListOfAssigneeApi();
        const admins = await indexApi.fetchListOfAdminsApi();
        if (replacer(userData.username) in admins) isAdmin = true;
    }
    return { listOfProjects, isAdmin, userName, listOfAssignee };
});

export const signUp = createAsyncThunk('board/signUp', async (userData: LoginI) => {
    let listOfProjects: { [key: string]: BoardI[] } = {};
    let isAdmin = false;
    const userName = userData.username;
    const response = await indexApi.signUpApi(userData.username, userData.password);
    if (response) {
        listOfProjects = await indexApi.fetchListOfProjectsApi();
        const admins = await indexApi.fetchListOfAdminsApi();
        if (replacer(userData.username) in admins) isAdmin = true;
    }
    return { listOfProjects, isAdmin, userName };
});

export const loadBoard = createAsyncThunk('board/loadBoard', async (project: string) => {
    let thisBoards: BoardI[] = deepCopy(initialState.boards);
    thisBoards = await indexApi.fetchUserDataFromBaseApi(project);
    return { thisBoards, project };
});

export const logOut = createAsyncThunk<void, string, { state: RootState }>(
    'board/logOut/fullfiled',
    async (user: string, thunkApi) => {
        indexApi.sendToDatabaseApi(
            thunkApi.getState().globalReducer.boards,
            thunkApi.getState().globalReducer.currentProject,
        );
        indexApi.logOutApi();
    },
);

const boardsSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        changeFromInput(state, action: PayloadAction<IchangeValue>) {
            const { boardID, taskID, inputID, payLoad } = action.payload;
            state.boards[boardID].tasks[taskID][inputID] = payLoad;
        },
        boardDeleting(state, action: PayloadAction<number>) {
            return deleteBoard(deepCopy(current(state)), action.payload);
        },
        taskDeleting(state, action: PayloadAction<{ boardID: number; taskID: number }>) {
            const { boardID, taskID } = action.payload;
            return deleteTask(deepCopy(current(state)), boardID, taskID);
        },
        taskAdd(state, action: PayloadAction<number>) {
            const newTask: TaskI = { ...initialState.boards[0].tasks[0] };
            newTask.id = current(state).boards[action.payload].tasks?.length || 0;
            newTask.priority = 'none';
            newTask.fromBoard = action.payload;

            state.boards[action.payload].tasks
                ? state.boards[action.payload].tasks.push(newTask)
                : (state.boards[action.payload].tasks = [newTask]);
        },
        boardAdd(state) {
            const newBoard: BoardI = deepCopy(initialState.boards[0]);
            newBoard.id = current(state).boards?.length || 0;
            newBoard.name = 'default';
            newBoard.tasks[0].fromBoard = current(state).boards?.length || 0;

            state.boards ? state.boards.push(newBoard) : (state.boards = [newBoard]);
        },
        changeBoardName(state, action: PayloadAction<changeBoardNameI>) {
            state.boards[action.payload.boardID].name = action.payload.newBoardName;
        },
        resetProjectCreated(state) {
            state.projectCreated = false;
        },
        moveTask(state, action: PayloadAction<moveTaskI>) {
            const { destinationBoard, fromBoard, taskID } = action.payload;
            const destination = Number(destinationBoard);
            const from = fromBoard;

            const relocatebleTask = { ...state.boards[from].tasks[taskID] };
            relocatebleTask.fromBoard = destination;
            relocatebleTask.id = state.boards[destination].tasks ? state.boards[destination].tasks.length : 0;
            const tempState = deepCopy(current(state));

            tempState.boards[destination].tasks
                ? tempState.boards[destination].tasks.push(relocatebleTask)
                : (tempState.boards[destination].tasks = [relocatebleTask]);

            return deleteTask(tempState, from, taskID);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.listOfProjects = action.payload.listOfProjects;
            state.assignee = action.payload.listOfAssignee;
            state.isAdmin = action.payload.isAdmin;
            state.userName = action.payload.userName;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.listOfProjects = action.payload.listOfProjects;
            state.isAdmin = action.payload.isAdmin;
            state.userName = action.payload.userName;
        });
        builder.addCase(logOut.fulfilled, () => {
            return initialState;
        });
        builder.addCase(onLoadPage.fulfilled, (state, action) => {
            state.listOfProjects = action.payload.listOfProjects;
            state.assignee = action.payload.listOfAssignee;
            state.isAdmin = action.payload.isAdmin;
            state.userName = action.payload.userName;
        });
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
        builder.addCase(refreshBoardPage.fulfilled, (state) => {
            return state;
        });
        builder.addCase(addNewAssignee.fulfilled, (state, action) => {
            const tempState = deepCopy(state);
            tempState.assignee[action.payload.email] = action.payload.name;
            return tempState;
        });
        builder.addCase(deleteProject.fulfilled, (state, action) => {
            const tempState = deepCopy(state);
            delete tempState.listOfProjects[action.payload];
            return tempState;
        });
    },
});

export const {
    changeFromInput,
    boardDeleting,
    taskDeleting,
    taskAdd,
    boardAdd,
    changeBoardName,
    moveTask,
    resetProjectCreated,
} = boardsSlice.actions;
export default boardsSlice.reducer;
