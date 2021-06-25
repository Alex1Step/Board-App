import { GlobalState } from './interfaces';

export const initialState = {
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
} as GlobalState;
