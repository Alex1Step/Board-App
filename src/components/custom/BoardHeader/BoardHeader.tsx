import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { BoardI } from '../../../redux/interfaces';
import { boardDeleting, changeBoardName, taskAdd } from '../../../redux/slice';
import AddButton from '../../base/AddButton/AddButton';
import ButtonComponent from '../../base/Button/ButtonComponent';
import InputComponent from '../../base/Input/InputComponent';
import Modal from '../Modal/Modal';
import styles from './BoardHeader.less';

const BoardHeader = ({ id, name }: BoardI): JSX.Element => {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    //Delete this board
    const deleteBoard = () => {
        dispatch(boardDeleting(id));
    };

    //Add new task to board this board
    const addNewTask = () => {
        dispatch(taskAdd(id));
    };
    //Rename this board
    const changeBoardNameHandler = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        dispatch(
            changeBoardName({
                boardID: id,
                newBoardName: event.target.value,
            }),
        );
    };

    //show or hide modal window
    const [isModal, setModal] = React.useState(false);
    const onClose = useCallback(() => setModal(false), []);

    return (
        <>
            <span className={styles.boardname} onClick={() => setModal(true)}>
                {name}
            </span>
            <Modal visible={isModal} title={t('description.changeBoardName')} onClose={onClose}>
                <InputComponent
                    type={'text'}
                    label={''}
                    value={name}
                    onChange={(event) => changeBoardNameHandler(event)}
                    withoutSubstitution={true}
                />
            </Modal>
            <div className={styles.boardButtonContainer}>
                <AddButton className={'addCard'} text={t('description.addTask')} type={'Task'} onClick={addNewTask} />
                <ButtonComponent onClick={deleteBoard} message={t('description.deleteBoard')} />
            </div>
        </>
    );
};

export default BoardHeader;
