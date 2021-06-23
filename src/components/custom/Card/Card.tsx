import React, { useState } from 'react';
//COMPONENTS
import InputComponent from '../../base/Input/InputComponent';
import SelectComponent from '../../base/Select/SelectComponent';
import ButtonComponent from '../../base/Button/ButtonComponent';
//interfaces
import { TaskI } from '../../../redux/interfaces';
import { IchangeValue } from './interfaces';
//context
import { BoardContext } from '../../../containers/Board/Board';
//REDUX
import { useDispatch } from 'react-redux';
import { changeFromInput, taskDeleting, moveTask } from '../../../redux/slice';
//STYLES
import styles from './Card.less';
import cn from 'classnames';
//ReactDND
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { IdropResult } from './interfaces';
const ItemTypes = {
    BOX: 'box',
};

const Card = (props: TaskI): JSX.Element => {
    const { id, taskName, deadlineDate, priority, assignee, description, fromBoard } = props;
    const dispatch = useDispatch();
    const [blink, setBlink] = useState(1);

    //handler for listening changes in inputs
    function handleChange(
        event: { target: HTMLInputElement | HTMLSelectElement },
        boardID: number,
        taskID: number,
        inputID: string,
    ) {
        const newValue: IchangeValue = {
            boardID: boardID,
            taskID: taskID,
            inputID: inputID,
            payLoad: event.target.value,
        };
        dispatch(changeFromInput(newValue));
    }

    //ReactDND for work with active cards
    const [{ opacity }, drag] = useDrag(
        () => ({
            type: ItemTypes.BOX,
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

    return (
        <BoardContext.Consumer>
            {(value) => (
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
                        label={'Task:'}
                        value={taskName}
                        onChange={(event: { target: HTMLInputElement | HTMLSelectElement }) =>
                            handleChange(event, value, id, 'taskName')
                        }
                    />
                    <InputComponent
                        type={'date'}
                        label={'Deadline:'}
                        value={deadlineDate}
                        onChange={(event: { target: HTMLInputElement | HTMLSelectElement }) =>
                            handleChange(event, value, id, 'deadlineDate')
                        }
                    />
                    <SelectComponent
                        type={'select'}
                        label={'Priority:'}
                        value={priority}
                        onChange={(event: { target: HTMLInputElement | HTMLSelectElement }) =>
                            handleChange(event, value, id, 'priority')
                        }
                    />
                    <InputComponent
                        type={'text'}
                        label={'Assignee:'}
                        value={assignee}
                        onChange={(event: { target: HTMLInputElement | HTMLSelectElement }) =>
                            handleChange(event, value, id, 'assignee')
                        }
                    />
                    <InputComponent
                        type={'text'}
                        label={'Description:'}
                        value={description}
                        onChange={(event: { target: HTMLInputElement | HTMLSelectElement }) =>
                            handleChange(event, value, id, 'description')
                        }
                    />
                    <div className={styles.cardButtonContainer}>
                        <ButtonComponent
                            onClick={() => {
                                const taskReq = {
                                    boardID: value,
                                    taskID: id,
                                    message: 'Delete this task',
                                };
                                dispatch(taskDeleting(taskReq));
                            }}
                        />
                    </div>
                </div>
            )}
        </BoardContext.Consumer>
    );
};

export default Card;
