import { createSlice, current, PayloadAction, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import firebase from 'firebase';
//interfaces
import { AppDispatch, RootState } from './store';
import { IchangeValue } from '../components/custom/Card/interfaces';
import { moveTaskI, changeBoardNameI, TaskI, BoardI } from './interfaces';
import { LoginI } from '../pages/LogInLayout/LogInLayout';
//init state
import { initialState } from './initialState';

export const signIn = createAsyncThunk<string, LoginI, { dispatch: AppDispatch }>(
    'board/fetchIsSignIn',
    async (userData) => {
        let userInfo = '';
        const response = await firebase
            .auth()
            .signInWithEmailAndPassword(userData.username, userData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user?.email) userInfo = user.email;
            })
            .catch((error) => {
                console.log(error.message);
            });
        return userInfo;
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
        /*ASYNC!!!*/
        succesLogIn(state, action: PayloadAction<string>) {
            console.log(action.payload);
            state = state;
        },
        /*ASYNC!!!*/
        succesCreateNewUser(state, action: PayloadAction<string>) {
            const newUser = {
                userID: 0,
                userName: action.payload,
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
            firebase
                .database()
                .ref()
                .update({ [action.payload.substr(0, 5)]: newUser });
            return newUser;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.userName = action.payload;
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
    succesLogIn,
    succesCreateNewUser,
} = boardsSlice.actions;
export default boardsSlice.reducer;
