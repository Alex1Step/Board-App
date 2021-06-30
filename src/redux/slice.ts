import { createSlice, current, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { IchangeValue } from '../components/custom/Card/interfaces';
import { moveTaskI, changeBoardNameI, TaskI, BoardI, GlobalState } from './interfaces';
import { LoginI } from '../pages/LogInLayout/interfaces';
import { initialState } from './initialState';
import indexApi from '../api/indexApi';
import { deleteTask } from '../helper/deleteTask';
import { deleteBoard } from '../helper/deleteBoard';
import deepCopy from '../helper/deepCopy';

export const onLeavePage = createAsyncThunk<void, string, { state: RootState }>(
    'board/pageUnload',
    async (user: string, thunkApi) => {
        // indexApi.sendToDatabaseApi(thunkApi.getState().globalReducer);
    },
);

export const onLoadPage = createAsyncThunk(
    'board/pageLoad',
    async (setData: React.Dispatch<React.SetStateAction<boolean>>) => {
        const userInfo: GlobalState = initialState;
        const user = localStorage.getItem('user');
        if (user) {
            // userInfo = await indexApi.fetchUserDataFromBaseApi(user);
        }
        setData(true);
        return userInfo;
    },
);
//done
export const createNewProject = createAsyncThunk(
    'board/createNewProject',
    async (prop: { projectTitle: string; redir: () => void }) => {
        const newProject: BoardI[] = { ...initialState.boards };
        const response = await indexApi.sendToDatabaseApi(newProject, prop.projectTitle);
        prop.redir();
        return newProject;
    },
);
//done
export const signIn = createAsyncThunk('board/signIn', async (userData: LoginI) => {
    let listOfProjects: { [key: string]: string } = {};
    let isAdmin = false;
    const userName = userData.username;
    const response = await indexApi.signInApi(userData.username, userData.password);
    if (response) {
        listOfProjects = await indexApi.fetchListOfProjectsApi();
        const admins = await indexApi.fetchListOfAdminsApi();
        if (userData.username.replace(/[\s.,%]/g, '') in admins) isAdmin = true;
    }
    return { listOfProjects, isAdmin, userName };
});
//done
export const signUp = createAsyncThunk('board/signUp', async (userData: LoginI) => {
    let listOfProjects: { [key: string]: string } = {};
    let isAdmin = false;
    const userName = userData.username;
    const response = await indexApi.signUpApi(userData.username, userData.password);
    if (response) {
        listOfProjects = await indexApi.fetchListOfProjectsApi();
        const admins = await indexApi.fetchListOfAdminsApi();
        if (userData.username.replace(/[\s.,%]/g, '') in admins) isAdmin = true;
    }
    return { listOfProjects, isAdmin, userName };
});
//done
export const loadBoard = createAsyncThunk('board/loadBoard', async (project: string) => {
    let thisBoards: BoardI[] = deepCopy(initialState.boards);
    thisBoards = await indexApi.fetchUserDataFromBaseApi(project);
    return { thisBoards, project };
});
//done
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
            return action.payload;
        });
        builder.addCase(onLeavePage.fulfilled, (state) => {
            return state;
        });
        builder.addCase(createNewProject.fulfilled, (state, action) => {
            state.boards = action.payload;
        });
        builder.addCase(loadBoard.fulfilled, (state, action) => {
            state.boards = action.payload.thisBoards;
            state.currentProject = action.payload.project;
        });
    },
});

export const { changeFromInput, boardDeleting, taskDeleting, taskAdd, boardAdd, changeBoardName, moveTask } =
    boardsSlice.actions;
export default boardsSlice.reducer;
