import React, { useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { BoardI } from '../../../redux/interfaces';
import { changeBoardName } from '../../../redux/boardSlice/boardSlice';

import InputComponent from '../../base/Input/InputComponent';
import Modal from '../Modal/Modal';
import BoardControls from './BoardControls/BoardControls';

import { useTranslation } from 'react-i18next';

import styles from './BoardHeader.less';

const BoardHeader = ({ id, name }: BoardI): React.ReactElement => {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    //Rename this board
    const changeBoardNameHandler = useCallback(
        (
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
        },
        [],
    );

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
                    type="text"
                    label=""
                    value={name}
                    onChange={(event) => changeBoardNameHandler(event)}
                    withoutSubstitution={true}
                />
            </Modal>
            <BoardControls id={id} />
        </>
    );
};

export default BoardHeader;
