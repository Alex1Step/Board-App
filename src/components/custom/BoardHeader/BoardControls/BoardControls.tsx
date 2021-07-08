import React from 'react';
import styles from './BoardControls.less';
import AddButton from '../../../base/AddButton/AddButton';
import ButtonComponent from '../../../base/Button/ButtonComponent';
import { boardDeleting, taskAdd } from '../../../../redux/slice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const BoardControls = (props: { id: number }): JSX.Element => {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    //Delete this board
    const deleteBoard = () => {
        dispatch(boardDeleting(props.id));
    };

    //Add new task to board this board
    const addNewTask = () => {
        dispatch(taskAdd(props.id));
    };

    return (
        <div className={styles.boardButtonContainer}>
            <AddButton className={'addCard'} text={t('description.addTask')} type={'Task'} onClick={addNewTask} />
            <ButtonComponent onClick={deleteBoard} message={t('description.deleteBoard')} />
        </div>
    );
};

export default BoardControls;
