import React, { useCallback, useState } from 'react';
import { TaskI } from '../../../redux/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { changeFromInput, taskDeleting, moveTask } from '../../../redux/slice';
import styles from './Card.less';
import cn from 'classnames';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { IdropResult } from './interfaces';
import { useTranslation } from 'react-i18next';
import Modal from '../Modal/Modal';
import store, { RootState } from '../../../redux/store';
import { Moment } from 'moment';

import CardForm from './CardForm/CardForm';
import CardView from './CardView/CardView';

const ItemTypes = {
    box: 'box',
};

const Card = (props: TaskI): JSX.Element => {
    const { id, taskName, deadlineDate, priority, assignee, description, fromBoard } = props;

    const assigneeList: { [key: string]: string } | undefined = useSelector(
        (state: RootState) => state.globalReducer.assignee,
    );

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const [blink, setBlink] = useState(1);

    //show or hide modal window
    const [isModal, setModal] = React.useState(false);
    const onClose = useCallback(() => setModal(false), []);

    const forCompare = {
        taskName: 'New Task',
        deadlineDate: 'default',
        assignee: 'anybody',
        description: 'to do',
    };

    let assigneeArray: Array<string> = [];
    if (assigneeList) {
        assigneeArray = Object.values(assigneeList);
    }

    //check role of user
    const stateForCheckRole = store.getState().globalReducer;
    const currentUser = stateForCheckRole.userName.replace(/[\s.,%]/g, '');
    let currentAssignee = '';
    if (stateForCheckRole.assignee) currentAssignee = stateForCheckRole.assignee[currentUser];
    const isAdmin = stateForCheckRole.isAdmin;

    //handler for listening changes in inputs
    const handleChange = (
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
    };

    const deleteTask = () => {
        dispatch(
            taskDeleting({
                boardID: Number(fromBoard),
                taskID: id,
            }),
        );
    };

    //ReactDND for work with active cards
    const [, drag] = useDrag(
        () => ({
            type: ItemTypes.box,
            item: { taskName },
            end(item, monitor) {
                const dropResult = monitor.getDropResult() as IdropResult;
                if (item && dropResult) {
                    const moveTaskInfo = {
                        destinationBoard: dropResult.name,
                        fromBoard: fromBoard,
                        taskID: id,
                    };
                    dispatch(moveTask(moveTaskInfo));
                }
            },
            collect: (monitor: DragSourceMonitor) => ({
                opacity: monitor.isDragging() ? 0.9 : 1,
            }),
        }),
        [taskName],
    );

    const handleDateChange = (value: Moment | null, dateString: string) => {
        dispatch(
            changeFromInput({
                boardID: fromBoard,
                taskID: id,
                inputID: 'deadlineDate',
                payLoad: dateString,
            }),
        );
    };

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
            <div
                ref={
                    taskName === forCompare.taskName ||
                    deadlineDate === forCompare.deadlineDate ||
                    assignee === forCompare.assignee ||
                    description === forCompare.description
                        ? null
                        : drag
                }
                className={cn({
                    [styles.card]: true,
                    [styles[`${priority.toLowerCase()}`]]: true,
                    [styles.blink]: blink && priority === 'none',
                })}
                onClick={() => {
                    setBlink(0);
                    if (currentAssignee === assignee || isAdmin) setModal(true);
                }}
            >
                <CardView taskInfo={{ ...props }} deleteFunc={deleteTask} />
            </div>
        </>
    );
};

export default Card;
