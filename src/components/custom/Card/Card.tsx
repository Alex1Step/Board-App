import React, { useCallback, useState } from 'react';
import InputComponent from '../../base/Input/InputComponent';
import SelectComponent from '../../base/Select/SelectComponent';
import ButtonComponent from '../../base/Button/ButtonComponent';
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
import DateComponent from '../../base/DateComponent/DateComponent';
import { Divider } from 'antd';

const ItemTypes = {
    box: 'box',
};

const Card = (props: TaskI): JSX.Element => {
    const { id, taskName, deadlineDate, priority, assignee, description, fromBoard } = props;

    const assigneeList: { [key: string]: string } | undefined = useSelector(
        (state: RootState) => state.globalReducer.assignee,
    );

    const dispatch = useDispatch();
    const [blink, setBlink] = useState(1);

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

    //show or hide modal window
    const [isModal, setModal] = React.useState(false);
    const onClose = useCallback(() => setModal(false), []);

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

    //check role of user
    const stateForCheckRole = store.getState().globalReducer;
    const currentUser = stateForCheckRole.userName.replace(/[\s.,%]/g, '');
    let currentAssignee = '';
    if (stateForCheckRole.assignee) currentAssignee = stateForCheckRole.assignee[currentUser];
    const isAdmin = stateForCheckRole.isAdmin;

    const { t } = useTranslation();

    return (
        <>
            <Modal visible={isModal} title={t('description.edittask')} onClose={onClose}>
                <div
                    className={cn({
                        [styles.cardOnModal]: true,
                    })}
                >
                    <InputComponent
                        type={'text'}
                        label={t('description.task')}
                        value={taskName}
                        onChange={(event) => handleChange(event, Number(fromBoard), id, 'taskName')}
                    />
                    <Divider className={styles.dividerCustom} dashed={true} />
                    <DateComponent onChange={handleDateChange} value={deadlineDate} label={'Deadline'} />
                    {new Date(deadlineDate) < new Date() ? (
                        <span
                            className={cn({
                                [styles.attention]: true,
                                [styles.blink]: true,
                            })}
                        >
                            {t('description.attention')}
                        </span>
                    ) : null}
                    <Divider className={styles.dividerCustom} dashed={true} />
                    <SelectComponent
                        type={'select'}
                        options={['High', 'Medium', 'Low']}
                        labelForOptions={[
                            `${t('description.high')}`,
                            `${t('description.medium')}`,
                            `${t('description.low')}`,
                        ]}
                        label={t('description.priority')}
                        value={priority}
                        onChange={(event) => handleChange(event, Number(fromBoard), id, 'priority')}
                    />
                    <Divider className={styles.dividerCustom} dashed={true} />
                    <SelectComponent
                        type={'select'}
                        options={[...assigneeArray]}
                        labelForOptions={[...assigneeArray]}
                        label={t('description.assignee')}
                        value={assignee}
                        onChange={(event) => handleChange(event, Number(fromBoard), id, 'assignee')}
                    />
                    <Divider className={styles.dividerCustom} dashed={true} />
                    <InputComponent
                        withWrap={true}
                        type={'textarea'}
                        label={t('description.description')}
                        value={description}
                        onChange={(event) => handleChange(event, Number(fromBoard), id, 'description')}
                    />
                </div>
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
                <span className={styles.infoLine}>
                    {t('description.task')} {taskName}
                </span>
                <Divider className={styles.dividerCustom} dashed={true} />
                <span className={styles.infoLine}>
                    {t('description.deadline')} {deadlineDate}
                    {new Date(deadlineDate) < new Date() ? (
                        <span
                            className={cn({
                                [styles.attention]: true,
                                [styles.blink]: true,
                            })}
                        >
                            {t('description.attention')}
                        </span>
                    ) : null}
                </span>
                <Divider className={styles.dividerCustom} dashed={true} />
                <span className={styles.infoLine}>
                    {t('description.priority')} {priority}
                </span>
                <Divider className={styles.dividerCustom} dashed={true} />
                <span className={styles.infoLine}>
                    {t('description.assignee')} {assignee}
                </span>
                <Divider className={styles.dividerCustom} dashed={true} />
                <span className={styles.infoLine}>
                    {t('description.description')} {description}
                </span>
                <Divider className={styles.dividerCustom} dashed={true} />
                <div className={styles.cardButtonContainer}>
                    <ButtonComponent
                        onClick={() => {
                            dispatch(
                                taskDeleting({
                                    boardID: Number(fromBoard),
                                    taskID: id,
                                }),
                            );
                        }}
                        message={t('description.deleteTask')}
                    />
                </div>
            </div>
        </>
    );
};

export default Card;
