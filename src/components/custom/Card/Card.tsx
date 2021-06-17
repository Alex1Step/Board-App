import React from 'react';
//COMPONENTS
import InputComponent from '../../base/Input/InputComponent';
import SelectComponent from '../../base/Select/SelectComponent';
import ButtonComponent from '../../base/Button/ButtonComponent';
//TYPES
import { TaskI } from '../../../redux/slice';
import { IchangeValue } from './interfaces';
import { BoardContext } from '../../../containers/Board/Board';
//REDUX
import { useDispatch } from 'react-redux';
import { changeFromInput, taskDeleting, moveTask } from '../../../redux/slice';
//STYLES
import * as styles from './Card.less';
//DND START
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { IdropResult } from './interfaces';

export const ItemTypes = {
    BOX: 'box',
};
//DND END

const Card = ({ id, taskName, deadlineDate, priority, assignee, description, fromBoard }: TaskI): JSX.Element => {
    const cls = [styles.Card, styles.painted];

    const colorsByPriority: { [key: string]: string } = {
        High: 'linear-gradient(45deg, rgb(255, 0, 0) 30%, rgb(255, 157, 0))',
        Medium: 'linear-gradient(225deg, rgb(164, 180, 71), rgb(255, 236, 0) 100%)',
        Low: 'linear-gradient(225deg, rgb(0, 238, 196), rgb(15, 255, 0) 100%)',
    };

    const dispatch = useDispatch();

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

    //DND START
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
    //DND END

    return (
        <BoardContext.Consumer>
            {(value) => (
                <div
                    ref={drag}
                    className={cls.join(' ')}
                    style={{
                        background: colorsByPriority[priority],
                        boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)',
                    }}
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
