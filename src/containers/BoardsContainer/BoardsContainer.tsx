import React, { useCallback } from 'react';

import AddButton from '../../components/base/AddButton/AddButton';
import BoardsList from '../BoardsList/BoardsList';

import { boardAdd } from '../../redux/boardSlice/boardSlice';
import { useDispatch, useSelector } from 'react-redux';

import indexSelectors from '../../redux/selectors/indexSelectors';

import { useTranslation } from 'react-i18next';

import styles from './BoardsContainer.less';

const BoardsContainer = (): React.ReactElement => {
    const { t } = useTranslation();
    const currentProject: string = useSelector(indexSelectors.currentProject);
    const dispatch = useDispatch();

    const addBoard = useCallback(() => {
        dispatch(boardAdd());
    }, []);

    return (
        <section className={styles.tasksLayout}>
            <div className={styles.container}>
                <h1>{currentProject}</h1>
            </div>
            <AddButton className="addBoard" onClick={addBoard} text={t('description.addBoard')} type="Board" />
            <BoardsList />
        </section>
    );
};

export default BoardsContainer;
