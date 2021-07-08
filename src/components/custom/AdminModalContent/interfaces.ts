import { IAssignee } from '../../../containers/AdminPanel/interfaces';

export interface IAdminModalContent {
    isModal: boolean;
    title: string;
    setProjectTitle: React.Dispatch<React.SetStateAction<string>>;
    addAssignee: (values: { user: IAssignee }) => void;
}
