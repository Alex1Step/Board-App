import { createSlice, current, PayloadAction, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import firebase from 'firebase';
//interfaces
import store, { AppDispatch, RootState } from './store';
import { IchangeValue } from '../components/custom/Card/interfaces';
import { moveTaskI, changeBoardNameI, TaskI, BoardI, GlobalState } from './interfaces';
import { LoginI } from '../pages/LogInLayout/LogInLayout';
//init state
import { initialState } from './initialState';
//api
import MyApi from '../API//MyApi';

export const signIn = createAsyncThunk('board/signIn', async (userData: LoginI) => {
    let userInfo: GlobalState = {
        userID: 0,
        userName: '',
        boards: [
            {
                id: 0,
                name: 'My first board',
                tasks: [
                    {
                        id: 0,
                        taskName: 'My first task',
                        deadlineDate: 'default',
                        priority: 'default',
                        assignee: 'default',
                        description: 'default',
                        fromBoard: 0,
                    },
                ],
            },
        ],
    };
    const response = await MyApi.signInApi(userData.username, userData.password).then(async (response) => {
        if (response && response.email) {
            await MyApi.fetchUserDataFromBaseApi(response.email).then((response) => {
                if (response) {
                    userInfo = response;
                }
            });
        }
    });
    return userInfo;
});

export const signUp = createAsyncThunk('board/signUp', async (userData: LoginI) => {
    const newUser: GlobalState = {
        userID: 0,
        userName: '',
        boards: [
            {
                id: 0,
                name: 'My first board',
                tasks: [
                    {
                        id: 0,
                        taskName: 'My first task',
                        deadlineDate: 'default',
                        priority: 'default',
                        assignee: 'default',
                        description: 'default',
                        fromBoard: 0,
                    },
                ],
            },
        ],
    };
    const response = await MyApi.signUpApi(userData.username, userData.password).then((response) => {
        if (response && response.email) {
            newUser.userName = response.email;
            MyApi.sendToDatabaseApi(newUser);
        }
    });
    return newUser;
});

export const logOut = createAsyncThunk<void, string, { state: RootState }>(
    'board/logOut',
    async (user: string, thunkApi) => {
        await MyApi.sendToDatabaseApi(thunkApi.getState().globalReducer);
        await MyApi.logOutApi().then(() => {
            console.log('LOGGED OUT');
        });
        return;
    },
);

const boardsSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        changeFromInput(state, action: PayloadAction<IchangeValue>) {
            state.boards[Number(action.payload.boardID)].tasks[Number(action.payload.taskID)][
                action.payload.inputID.toString()
            ] = action.payload.payLoad;
        },
        boardDeleting(state, action: PayloadAction<number>) {
            delete state.boards[action.payload];
        },
        taskDeleting(state, action: PayloadAction<{ boardID: number; taskID: number }>) {
            delete state.boards[action.payload.boardID].tasks[action.payload.taskID];
        },
        taskAdd(state, action: PayloadAction<number>) {
            const newTask: TaskI = {
                id: current(state).boards[action.payload].tasks?.length || 0,
                taskName: 'default',
                deadlineDate: 'default',
                priority: 'default',
                assignee: 'default',
                description: 'default',
                fromBoard: action.payload,
            };

            state.boards[action.payload].tasks
                ? state.boards[action.payload].tasks.push(newTask)
                : (state.boards[action.payload].tasks = [newTask]);
        },
        boardAdd(state) {
            const newBoard: BoardI = {
                id: current(state).boards?.length || 0,
                name: 'default',
                tasks: [],
            };
            state.boards ? state.boards.push(newBoard) : (state.boards = [newBoard]);
        },
        changeBoardName(state, action: PayloadAction<changeBoardNameI>) {
            state.boards[action.payload.boardID].name = action.payload.newBoardName;
        },
        moveTask(state, action: PayloadAction<moveTaskI>) {
            const destination = Number(action.payload.destinationBoard);
            const from = Number(action.payload.fromBoard);
            //remember task
            const relocatebleTask = Object.assign({}, state.boards[from].tasks[action.payload.taskID]);
            //change task
            relocatebleTask.fromBoard = destination;
            //find new id for relocateble tsk
            const newTaskId = state.boards[destination].tasks
                ? state.boards[destination].tasks.reduce((r, v) => (v.id > r ? v.id : r), 0) + 1
                : 0;
            relocatebleTask.id = Number(newTaskId);
            // console.log(relocatebleTask);
            //delete from old board
            delete state.boards[from].tasks[action.payload.taskID];
            //push new task to destination board
            state.boards[destination].tasks
                ? state.boards[destination].tasks.push(relocatebleTask)
                : (state.boards[destination].tasks = [relocatebleTask]);
            // console.log(current(state));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(logOut.fulfilled, (state) => {
            return initialState;
        });
    },
});

export const { changeFromInput, boardDeleting, taskDeleting, taskAdd, boardAdd, changeBoardName, moveTask } =
    boardsSlice.actions;
export default boardsSlice.reducer;
