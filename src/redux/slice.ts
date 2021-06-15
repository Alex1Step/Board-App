import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import type { changeValue } from '../components/Card/Card';

interface moveTaskI {
    destinationBoard: string;
    fromBoard: string | number;
    taskID: number;
}

interface changeBoardNameI {
    boardID: number;
    newBoardName: string;
}

export interface TaskI {
    [index: string]: string | number;
    id: number;
    taskName: string;
    deadlineDate: string;
    priority: string;
    assignee: string;
    description: string;
    fromBoard: string | number;
}

export interface BoardI {
    id: number;
    name: string;
    tasks: TaskI[];
}

interface GlobalState {
    userID: number;
    userName: string;
    boards: BoardI[];
}

const initialState = {
    userID: 0,
    userName: 'Alex Stepanchuk',
    boards: [
        {
            id: 0,
            name: 'board-1',
            tasks: [
                {
                    id: 0,
                    taskName: 'First Task',
                    deadlineDate: '11.01.2011',
                    priority: 'High',
                    assignee: 'Mike',
                    description: 'TODO for First Task',
                    fromBoard: 0,
                },
                {
                    id: 1,
                    taskName: 'Second Task',
                    deadlineDate: '22.02.2022',
                    priority: 'Low',
                    assignee: 'Jake',
                    description: 'TODO for Second Task',
                    fromBoard: 0,
                },
                {
                    id: 2,
                    taskName: 'Third Task',
                    deadlineDate: '21.12.2021',
                    priority: 'Medium',
                    assignee: 'JakeJones',
                    description: 'TODO for Third Task',
                    fromBoard: 0,
                },
            ],
        },
        {
            id: 1,
            name: 'board-2',
            tasks: [
                {
                    id: 0,
                    taskName: 'First Task of Board-2',
                    deadlineDate: '33.03.2033',
                    priority: 'Medium',
                    assignee: 'Jane',
                    description: 'TODO for First Task of Board-2',
                    fromBoard: 1,
                },
                {
                    id: 1,
                    taskName: 'Second Task of Board-2',
                    deadlineDate: '44.04.2044',
                    priority: 'Low',
                    assignee: 'MAry',
                    description: 'TODO for Second Task of Board-2',
                    fromBoard: 1,
                },
            ],
        },
        {
            id: 2,
            name: 'board-3',
            tasks: [
                {
                    id: 0,
                    taskName: 'First Task of Board-3',
                    deadlineDate: '55.55.2055',
                    priority: 'Medium',
                    assignee: 'Person1',
                    description: 'TODO for First Task of Board-3',
                    fromBoard: 2,
                },
                {
                    id: 1,
                    taskName: 'Second Task of Board-3',
                    deadlineDate: '66.66.2066',
                    priority: 'Low',
                    assignee: 'Person2',
                    description: 'TODO for Second Task of Board-3',
                    fromBoard: 2,
                },
            ],
        },
    ],
} as GlobalState;

const boardsSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        changeFromInput(state, action: PayloadAction<changeValue>) {
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
            //push new task to destination board
            state.boards[destination].tasks.push(relocatebleTask);
            //delete from old board
            delete state.boards[from].tasks[action.payload.taskID];
            // console.log(current(state));
        },
    },
});

export const { changeFromInput, boardDeleting, taskDeleting, taskAdd, boardAdd, changeBoardName, moveTask } =
    boardsSlice.actions;
export default boardsSlice.reducer;
