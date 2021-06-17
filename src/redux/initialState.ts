import { GlobalState } from './interfaces';

export const initialState = {
    userID: 0,
    userName: '',
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
