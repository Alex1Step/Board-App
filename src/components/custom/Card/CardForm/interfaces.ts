import { TaskI } from '../../../../redux/interfaces';
import { Moment } from 'moment';

export interface ICardForm {
    taskInfo: TaskI;
    assigneeArray: Array<string>;
    changeFunc: (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
        boardID: number,
        taskID: number,
        inputID: string,
    ) => void;
    changeDateFunc: (value: Moment | null, dateString: string) => void;
}
