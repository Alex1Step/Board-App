import { RootState } from '../../redux/store';
import { BoardI } from '../interfaces';

const projectCreated = (state: RootState): boolean => state.globalReducer.projectCreated;
const user = (state: RootState): string => state.globalReducer.userName;
const boards = (state: RootState): BoardI[] => state.globalReducer.boards;
const currentProject = (state: RootState): string => state.globalReducer.currentProject;
const isAdmin = (state: RootState): boolean => state.globalReducer.isAdmin;
const assigneeList = (state: RootState): { [key: string]: string } | undefined => state.globalReducer.assignee;

const indexSelectors = { projectCreated, user, boards, currentProject, isAdmin, assigneeList };

export default indexSelectors;
