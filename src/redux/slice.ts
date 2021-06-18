import { createSlice, current, PayloadAction, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import firebase from 'firebase';
//interfaces
import { AppDispatch, RootState } from './store';
import { IchangeValue } from '../components/custom/Card/interfaces';
import { moveTaskI, changeBoardNameI, TaskI, BoardI, GlobalState } from './interfaces';
import { LoginI } from '../pages/LogInLayout/LogInLayout';
//init state
import { initialState } from './initialState';
//api
import MyApi from '../API//MyApi';

export const signIn = createAsyncThunk<string, LoginI, { dispatch: AppDispatch }>('board/signIn', async (userData) => {
    let userInfo = '';
    const response = await MyApi.signInApi(userData.username, userData.password).then((response) => {
        if (response && response.email) userInfo = response.email;
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
        //prepare new clean board for new user
        if (response && response.email) {
            newUser.userName = response.email;
            MyApi.sendToDatabaseApi(newUser);
        }
    });
    return newUser;
});

export const logOut = createAsyncThunk<void>('board/logOut', async () => {
    await MyApi.logOutApi().then(() => {
        console.log('LOGGED OUT');
    });
    return;
});

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
                id: current(state).boards[action.payload].tasks.length,
                taskName: 'default',
                deadlineDate: 'default',
                priority: 'default',
                assignee: 'default',
                description: 'default',
                fromBoard: action.payload,
            };

            state.boards[action.payload].tasks.push(newTask);
        },
        boardAdd(state) {
            const newBoard: BoardI = {
                id: current(state).boards.length,
                name: 'default',
                tasks: [],
            };
            state.boards.push(newBoard);
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
            const newTaskId = state.boards[destination].tasks.reduce((r, v) => (v.id > r ? v.id : r), 0) + 1;
            relocatebleTask.id = Number(newTaskId);
            // console.log(relocatebleTask);
            //delete from old board
            delete state.boards[from].tasks[action.payload.taskID];
            //push new task to destination board
            state.boards[destination].tasks.push(relocatebleTask);
            // console.log(current(state));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            console.log('from SIGNIN: ' + action.payload);
            state.userName = action.payload;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(logOut.fulfilled, (state) => {
            console.log('from LOGOUT');
            return initialState;
        });
    },
});

export const { changeFromInput, boardDeleting, taskDeleting, taskAdd, boardAdd, changeBoardName, moveTask } =
    boardsSlice.actions;
export default boardsSlice.reducer;
