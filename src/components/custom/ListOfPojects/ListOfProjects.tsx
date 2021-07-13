import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../../../redux/store';
import { BoardI } from '../../../redux/interfaces';
import { deleteProject, loadBoard } from '../../../redux/slice';

import List from './List/List';

import replacer from '../../../utils/replacer';
import { useTranslation } from 'react-i18next';

import styles from './ListOfProjects.less';

const ListOfProjects = (): React.ReactElement => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const projectsList: { [key: string]: BoardI[] } | undefined = useSelector(
        (state: RootState) => state.globalReducer.listOfProjects,
    );

    //check role of user
    const stateForCheckRole = store.getState().globalReducer;
    const currentUser = replacer(stateForCheckRole.userName);
    let currentAssignee = '';
    if (stateForCheckRole.assignee) currentAssignee = stateForCheckRole.assignee[currentUser];

    const checkRole = useCallback((project: string): boolean => {
        let flag = false;
        if (stateForCheckRole.listOfProjects) {
            Object.values(stateForCheckRole.listOfProjects[project]).forEach((board) => {
                board.tasks.forEach((element) => {
                    if (element.assignee === currentAssignee) flag = true;
                });
            });
        }
        return flag;
    }, []);

    const loadThisBoard = useCallback((proj: string) => {
        dispatch(loadBoard(proj));
    }, []);

    const deleteCurrentProject = useCallback((proj: string) => {
        dispatch(deleteProject(proj));
    }, []);

    const isAdmin = store.getState().globalReducer.isAdmin;

    return (
        <>
            <h1 className={styles.projectsTitle}>{t('description.projects')}</h1>
            <List
                projectsList={projectsList!}
                loadThisBoard={loadThisBoard}
                deleteCurrentProject={isAdmin ? deleteCurrentProject : undefined}
                checkRole={!isAdmin ? checkRole : undefined}
                isAdmin={isAdmin}
            />
        </>
    );
};

export default ListOfProjects;
