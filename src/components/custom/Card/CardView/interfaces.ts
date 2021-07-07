import { TaskI } from '../../../../redux/interfaces';

export interface ICardView {
    taskInfo: TaskI;
    deleteFunc: () => void;
}
