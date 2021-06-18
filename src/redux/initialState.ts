import { GlobalState } from './interfaces';

export const initialState = {
    userID: 0,
    userName: '',
    boards: [
        {
            id: 0,
            name: 'My First Board',
            tasks: [
                {
                    id: 0,
                    taskName: 'My First Task',
                    deadlineDate: '11.01.2011',
                    priority: 'Low',
                    assignee: 'Name',
                    description: 'To Do',
                    fromBoard: 0,
                },
            ],
        },
    ],
} as GlobalState;
