import React from 'react';
import styles from './BoardsContainer.less';
import AddButton from '../../components/base/AddButton/AddButton';
import { boardAdd } from '../../redux/slice';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import BoardsList from '../BoardsList/BoardsList';

const BoardsContainer = (): JSX.Element => {
    const { t } = useTranslation();
    const currentProject: string = useSelector((state: RootState) => state.globalReducer.currentProject);
    const dispatch = useDispatch();

    const addBoard = () => {
        dispatch(boardAdd());
    };

    return (
        <section className={styles.tasksLayout}>
            <div className={styles.container}>
                <h1>{currentProject}</h1>
            </div>
            <AddButton className={'addBoard'} onClick={addBoard} text={t('description.addBoard')} type="Board" />
            <BoardsList />
        </section>
    );
};

export default BoardsContainer;
