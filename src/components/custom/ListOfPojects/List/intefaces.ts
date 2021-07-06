import { BoardI } from '../../../../redux/interfaces';

export interface Ilist {
    loadThisBoard: (proj: string) => void;
    deleteCurrentProject?: (proj: string) => void;
    checkRole?: (project: string) => boolean;
    projectsList: { [key: string]: BoardI[] };
    isAdmin: boolean;
}
