import React, { useState } from 'react';
import InputComponent from '../../base/Input/InputComponent';
import SelectComponent from '../../base/Select/SelectComponent';
import ButtonComponent from '../../base/Button/ButtonComponent';
import { TaskI } from '../../../redux/interfaces';
import { useDispatch } from 'react-redux';
import { changeFromInput, taskDeleting, moveTask } from '../../../redux/slice';
import styles from './Card.less';
import cn from 'classnames';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { IdropResult } from './interfaces';
import { useTranslation } from 'react-i18next';

const ItemTypes = {
    box: 'box',
};

const Card = (props: TaskI): JSX.Element => {
    const { id, taskName, deadlineDate, priority, assignee, description, fromBoard } = props;

    const dispatch = useDispatch();
    const [blink, setBlink] = useState(1);

    //handler for listening changes in inputs
    const handleChange = (
        event: { target: HTMLInputElement | HTMLSelectElement },
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

    const { t } = useTranslation();

    return (
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
            onClick={() => setBlink(0)}
        >
            <InputComponent
                type={'text'}
                label={t('description.task')}
                value={taskName}
                onChange={(event: { target: HTMLInputElement | HTMLSelectElement }) =>
                    handleChange(event, Number(fromBoard), id, 'taskName')
                }
            />
            <InputComponent
                type={'date'}
                label={t('description.deadline')}
                value={deadlineDate}
                onChange={(event: { target: HTMLInputElement | HTMLSelectElement }) =>
                    handleChange(event, Number(fromBoard), id, 'deadlineDate')
                }
            />
            <SelectComponent
                type={'select'}
                options={['High', 'Medium', 'Low']}
                labelForOptions={[`${t('description.high')}`, `${t('description.medium')}`, `${t('description.low')}`]}
                label={t('description.priority')}
                value={priority}
                onChange={(event: { target: HTMLInputElement | HTMLSelectElement }) =>
                    handleChange(event, Number(fromBoard), id, 'priority')
                }
            />
            <InputComponent
                type={'text'}
                label={t('description.assignee')}
                value={assignee}
                onChange={(event: { target: HTMLInputElement | HTMLSelectElement }) =>
                    handleChange(event, Number(fromBoard), id, 'assignee')
                }
            />
            <InputComponent
                type={'text'}
                label={t('description.description')}
                value={description}
                onChange={(event: { target: HTMLInputElement | HTMLSelectElement }) =>
                    handleChange(event, Number(fromBoard), id, 'description')
                }
            />
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
    );
};

export default Card;
