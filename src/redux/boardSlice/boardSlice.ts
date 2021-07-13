import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { changeBoardNameI, BoardI } from '../interfaces';
import { initialState } from '../initialState';
import { deleteBoard } from '../../utils/deleteBoard';
import deepCopy from '../../utils/deepCopy';
import { IchangeValue } from '../../components/custom/Card/interfaces';
import { moveTaskI, TaskI } from '../interfaces';
import { deleteTask } from '../../utils/deleteTask';

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        boardDeleting(state, action: PayloadAction<number>) {
            return deleteBoard(deepCopy(current(state)), action.payload);
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
        changeFromInput(state, action: PayloadAction<IchangeValue>) {
            const { boardID, taskID, inputID, payLoad } = action.payload;
            state.boards[boardID].tasks[taskID][inputID] = payLoad;
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
});

export const { boardDeleting, boardAdd, changeBoardName, changeFromInput, taskDeleting, taskAdd, moveTask } =
    boardSlice.actions;
export default boardSlice.reducer;
