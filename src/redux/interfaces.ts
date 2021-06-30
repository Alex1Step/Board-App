export interface moveTaskI {
    destinationBoard: string;
    fromBoard: number;
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
    fromBoard: number;
}

export interface BoardI {
    id: number;
    name: string;
    tasks: TaskI[];
}

export interface GlobalState {
    listOfProjects?: { [key: string]: string };
    isAdmin?: boolean;
    userID: number;
    userName: string;
    boards: BoardI[];
}
