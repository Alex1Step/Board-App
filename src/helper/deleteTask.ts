import { GlobalState, TaskI } from '../redux/interfaces';

export const deleteTask = (tempState: GlobalState, boardID: number, taskID: number): GlobalState => {
    tempState.boards[boardID].tasks.splice(taskID, 1);
    tempState.boards[boardID].tasks.forEach((element: TaskI, index: number) => {
        console.log(element.id, index);
        element.id = index;
    });
    return tempState;
};
