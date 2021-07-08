import { TaskI } from '../../redux/interfaces';

export interface IdropResult {
    allowedDropEffect: string;
    dropEffect: string;
    name: string;
}

export interface ICardContainer {
    taskInfo: TaskI;
    isAdmin: boolean;
    currentAssignee: string;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
