import React, { useCallback } from 'react';

import { TaskI } from '../../../redux/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { changeFromInput } from '../../../redux/slices/projectSlice/projectSlice';
import store from '../../../redux/store';

import CardContainer from '../../../containers/CardContainer/CardContainer';
import CardForm from './CardForm/CardForm';
import Modal from '../Modal/Modal';

import indexSelectors from '../../../redux/selectors/indexSelectors';
import replacer from '../../../utils/replacer';

import { Moment } from 'moment';
import { useTranslation } from 'react-i18next';

const Card = (props: TaskI): React.ReactElement => {
    const { id, fromBoard } = props;

    const assigneeList: { [key: string]: string } | undefined = useSelector(indexSelectors.assigneeList);

    const dispatch = useDispatch();

    const { t } = useTranslation();

    //show or hide modal window
    const [isModal, setModal] = React.useState(false);
    const onClose = useCallback(() => setModal(false), []);

    let assigneeArray: Array<string> = [];
    if (assigneeList) {
        assigneeArray = Object.values(assigneeList);
    }

    //check role of user
    const stateForCheckRole = store.getState().userReducer;
    const currentUser = replacer(stateForCheckRole.userName);
    let currentAssignee = '';
    if (stateForCheckRole.assignee) currentAssignee = stateForCheckRole.assignee[currentUser];
    const isAdmin = stateForCheckRole.isAdmin;

    //handler for listening changes in inputs
    const handleChange = useCallback(
        (
            event:
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLSelectElement>
                | React.ChangeEvent<HTMLTextAreaElement>,
            boardID: number,
            taskID: number,
            inputID: string,
        ) => {
            dispatch(
                changeFromInput({
                    boardID: boardID,
                    taskID: taskID,
                    inputID: inputID,
                    payLoad: event.target.value,
                }),
            );
        },
        [],
    );

    const handleDateChange = useCallback((value: Moment | null, dateString: string) => {
        dispatch(
            changeFromInput({
                boardID: fromBoard,
                taskID: id,
                inputID: 'deadlineDate',
                payLoad: dateString,
            }),
        );
    }, []);

    return (
        <>
            <Modal visible={isModal} title={t('description.edittask')} onClose={onClose}>
                <CardForm
                    taskInfo={{ ...props }}
                    assigneeArray={assigneeArray}
                    changeFunc={handleChange}
                    changeDateFunc={handleDateChange}
                />
            </Modal>
            <CardContainer
                taskInfo={{ ...props }}
                isAdmin={isAdmin}
                currentAssignee={currentAssignee}
                setModal={setModal}
            />
        </>
    );
};

export default Card;
