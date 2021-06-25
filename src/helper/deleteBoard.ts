import { GlobalState, BoardI, TaskI } from '../redux/interfaces';

export const deleteBoard = (tempState: GlobalState, boardID: number): GlobalState => {
    tempState.boards.splice(boardID, 1);
    tempState.boards.forEach((board: BoardI, index: number) => {
        board.id = index;
        board.tasks.forEach((task: TaskI) => (task.fromBoard = index));
    });
    return tempState;
};
