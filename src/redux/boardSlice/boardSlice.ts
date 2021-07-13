import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { changeBoardNameI, BoardI } from '../interfaces';
import { initialState } from '../initialState';
import { deleteBoard } from '../../utils/deleteBoard';
import deepCopy from '../../utils/deepCopy';

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
    },
});

export const { boardDeleting, boardAdd, changeBoardName } = boardSlice.actions;
export default boardSlice.reducer;
