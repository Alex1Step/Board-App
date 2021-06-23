import { createSlice, current, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
//interfaces
import { RootState } from './store';
import { IchangeValue } from '../components/custom/Card/interfaces';
import { moveTaskI, changeBoardNameI, TaskI, BoardI, GlobalState } from './interfaces';
import { LoginI } from '../pages/LogInLayout/interfaces';
//init state
import { initialState } from './initialState';
//api
import MyApi from '../api/indexApi';

export const onLeavePage = createAsyncThunk<void, string, { state: RootState }>(
    'board/pageUnload',
    async (user: string, thunkApi) => {
        await MyApi.sendToDatabaseApi(thunkApi.getState().globalReducer);
        return;
    },
);

export const onLoadPage = createAsyncThunk(
    'board/pageLoad',
    async (setData: React.Dispatch<React.SetStateAction<boolean>>) => {
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
                            taskName: 'New Task',
                            deadlineDate: 'default',
                            priority: 'Low',
                            assignee: 'anybody',
                            description: 'to do',
                            fromBoard: 0,
                        },
                    ],
                },
            ],
        };
        // const email = await MyApi.currentUserApi()?.email;
        const user = localStorage.getItem('user');
        if (user) {
            await MyApi.fetchUserDataFromBaseApi(user).then((response) => {
                if (response) {
                    userInfo = response;
                    setData(true);
                }
            });
        } else {
            setData(true);
        }
        return userInfo;
    },
);

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
                        taskName: 'New Task',
                        deadlineDate: 'default',
                        priority: 'Low',
                        assignee: 'anybody',
                        description: 'to do',
                        fromBoard: 0,
                    },
                ],
            },
        ],
    };
    await MyApi.signInApi(userData.username, userData.password).then(async (response) => {
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
                        taskName: 'New Task',
                        deadlineDate: 'default',
                        priority: 'Low',
                        assignee: 'anybody',
                        description: 'to do',
                        fromBoard: 0,
                    },
                ],
            },
        ],
    };
    await MyApi.signUpApi(userData.username, userData.password).then((response) => {
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
        await MyApi.logOutApi();
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
                taskName: 'New Task',
                deadlineDate: 'default',
                priority: 'none',
                assignee: 'anybody',
                description: 'to do',
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
                tasks: [
                    {
                        id: 0,
                        taskName: 'New Task',
                        deadlineDate: 'default',
                        priority: 'Low',
                        assignee: 'anybody',
                        description: 'to do',
                        fromBoard: current(state).boards?.length || 0,
                    },
                ],
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
            const relocatebleTask = JSON.parse(JSON.stringify(state.boards[from].tasks[action.payload.taskID]));
            //change task
            relocatebleTask.fromBoard = destination;
            //find new id for relocateble tsk
            const newTaskId = state.boards[destination].tasks
                ? state.boards[destination].tasks.reduce((r, v) => (v && v.id > r ? v.id : r), 0) + 1
                : 0;
            relocatebleTask.id = Number(newTaskId);
            const tempState = JSON.parse(JSON.stringify(current(state)));
            // //delete from old board
            const clearTask = {
                id: action.payload.taskID,
                taskName: '',
                deadlineDate: '',
                priority: 'invalid',
                assignee: '',
                description: '',
                fromBoard: from,
            };
            tempState.boards[from].tasks.splice(action.payload.taskID, 1, clearTask);
            //push new task to destination board
            tempState.boards[destination].tasks
                ? tempState.boards[destination].tasks.push(relocatebleTask)
                : (tempState.boards[destination].tasks = [relocatebleTask]);
            return tempState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            return action.payload;
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
    },
});

export const { changeFromInput, boardDeleting, taskDeleting, taskAdd, boardAdd, changeBoardName, moveTask } =
    boardsSlice.actions;
export default boardsSlice.reducer;
