export interface moveTaskI {
    destinationBoard: string;
    fromBoard: string | number;
    taskID: number;
}

export interface changeBoardNameI {
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

export interface GlobalState {
    userID: number;
    userName: string;
    boards: BoardI[];
}