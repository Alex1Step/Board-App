import { RootState } from '../../redux/store';
import { BoardI } from '../interfaces';

const projectCreated = (state: RootState): boolean => state.projectReducer.projectCreated;
const user = (state: RootState): string => state.userReducer.userName;
const boards = (state: RootState): BoardI[] => state.boardReducer.boards;
const currentProject = (state: RootState): string => state.projectReducer.currentProject;
const isAdmin = (state: RootState): boolean => state.userReducer.isAdmin;
const assigneeList = (state: RootState): { [key: string]: string } | undefined => state.userReducer.assignee;
const projectsList = (state: RootState): { [key: string]: BoardI[] } | undefined => state.userReducer.listOfProjects;

const indexSelectors = { projectCreated, user, boards, currentProject, isAdmin, assigneeList, projectsList };

export default indexSelectors;
