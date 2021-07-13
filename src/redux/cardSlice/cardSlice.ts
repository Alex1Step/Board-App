import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { IchangeValue } from '../../components/custom/Card/interfaces';
import { moveTaskI, TaskI } from '../interfaces';
import { initialState } from '../initialState';
import { deleteTask } from '../../utils/deleteTask';
import deepCopy from '../../utils/deepCopy';

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
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

export const { changeFromInput, taskDeleting, taskAdd, moveTask } = userSlice.actions;
export default userSlice.reducer;
