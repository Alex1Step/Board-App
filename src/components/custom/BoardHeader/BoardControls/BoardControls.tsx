import React, { useCallback } from 'react';

import AddButton from '../../../base/AddButton/AddButton';
import ButtonComponent from '../../../base/Button/ButtonComponent';

import { boardDeleting, taskAdd } from '../../../../redux/slices/projectSlice/projectSlice';

import { useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

import styles from './BoardControls.less';

const BoardControls = (props: { id: number }): React.ReactElement => {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    //Delete this board
    const deleteBoard = useCallback(() => {
        dispatch(boardDeleting(props.id));
    }, []);

    //Add new task to board this board
    const addNewTask = useCallback(() => {
        dispatch(taskAdd(props.id));
    }, []);

    return (
        <div className={styles.boardButtonContainer}>
            <AddButton className="addCard" text={t('description.addTask')} type="Task" onClick={addNewTask} />
            <ButtonComponent onClick={deleteBoard} message={t('description.deleteBoard')} />
        </div>
    );
};

export default BoardControls;
