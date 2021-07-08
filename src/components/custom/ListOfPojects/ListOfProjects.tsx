import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../../../redux/store';
import { useTranslation } from 'react-i18next';
import { BoardI } from '../../../redux/interfaces';
import List from './List/List';
import styles from './ListOfProjects.less';
import { deleteProject, loadBoard } from '../../../redux/slice';

const ListOfProjects = (): JSX.Element => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const projectsList: { [key: string]: BoardI[] } | undefined = useSelector(
        (state: RootState) => state.globalReducer.listOfProjects,
    );

    //check role of user
    const stateForCheckRole = store.getState().globalReducer;
    const currentUser = stateForCheckRole.userName.replace(/[\s.,%]/g, '');
    let currentAssignee = '';
    if (stateForCheckRole.assignee) currentAssignee = stateForCheckRole.assignee[currentUser];

    const checkRole = (project: string): boolean => {
        let flag = false;
        if (stateForCheckRole.listOfProjects) {
            Object.values(stateForCheckRole.listOfProjects[project]).forEach((board) => {
                board.tasks.forEach((element) => {
                    if (element.assignee === currentAssignee) flag = true;
                });
            });
        }
        return flag;
    };

    const loadThisBoard = (proj: string) => {
        dispatch(loadBoard(proj));
    };

    const deleteCurrentProject = (proj: string) => {
        dispatch(deleteProject(proj));
    };

    return (
        <>
            <h1 className={styles.projectsTitle}>{t('description.projects')}</h1>

            {store.getState().globalReducer.isAdmin ? (
                <List
                    projectsList={projectsList!}
                    loadThisBoard={loadThisBoard}
                    deleteCurrentProject={deleteCurrentProject}
                    isAdmin={store.getState().globalReducer.isAdmin!}
                />
            ) : (
                <List
                    projectsList={projectsList!}
                    loadThisBoard={loadThisBoard}
                    checkRole={checkRole}
                    isAdmin={store.getState().globalReducer.isAdmin!}
                />
            )}
        </>
    );
};

export default ListOfProjects;