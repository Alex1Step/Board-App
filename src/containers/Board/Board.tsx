import React, { useCallback } from 'react';
import Card from '../../components/custom/Card/Card';
import ButtonComponent from '../../components/base/Button/ButtonComponent';
import AddButton from '../../components/base/AddButton/AddButton';
import Modal from '../../components/custom/Modal/Modal';
import InputComponent from '../../components/base/Input/InputComponent';
import { Divider } from 'antd';
import type { BoardI } from '../../redux/interfaces';
import { useDispatch } from 'react-redux';
import { boardDeleting, taskAdd, changeBoardName } from '../../redux/slice';
import styles from './Board.less';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { IdustbinProps } from './interfaces';
import cn from 'classnames';

const ItemTypes = {
    box: 'box',
};

export const BoardContext = React.createContext(1);

const Board = ({ id, name, tasks }: BoardI, { allowedDropEffect }: IdustbinProps): JSX.Element => {
    const dispatch = useDispatch();

    //Delete this board
    const deleteBoard = () => {
        dispatch(boardDeleting(id));
    };

    //Add new task to board this board
    const addNewTask = () => {
        dispatch(taskAdd(id));
    };
    //Rename this board
    const changeBoardNameHandler = (event: { target: HTMLInputElement | HTMLSelectElement }) => {
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

    //ReactDND for handle active board
    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.box,
            drop: () => ({
                name: id,
                allowedDropEffect,
            }),
            collect: (monitor: DropTargetMonitor<unknown, unknown>) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [allowedDropEffect],
    );
    const isActive = canDrop && isOver;

    return (
        <div
            className={cn({
                [styles.board]: true,
                [styles.active]: isActive,
                [styles.noactive]: !isActive && canDrop,
            })}
            ref={drop}
        >
            <span className={styles.boardname} onClick={() => setModal(true)}>
                {name}
            </span>
            <Modal visible={isModal} title="Change BOARD name" onClose={onClose}>
                <InputComponent
                    type={'text'}
                    label={''}
                    value={name}
                    onChange={(event: { target: HTMLInputElement | HTMLSelectElement }) =>
                        changeBoardNameHandler(event)
                    }
                    withoutSubstitution={true}
                />
            </Modal>
            <div className={styles.boardButtonContainer}>
                <AddButton text={'Add new task'} type={'Task'} onClick={addNewTask} />
                <ButtonComponent onClick={deleteBoard} message={'Delete this board'} />
            </div>
            <Divider />
            <BoardContext.Provider value={id}>
                {tasks &&
                    tasks.map((task, index) => {
                        if (task && task.priority !== 'invalid') {
                            return (
                                <Card
                                    key={index}
                                    id={task.id}
                                    taskName={task.taskName}
                                    deadlineDate={task.deadlineDate}
                                    priority={task.priority}
                                    assignee={task.assignee}
                                    description={task.description}
                                    fromBoard={task.fromBoard}
                                />
                            );
                        }
                    })}
            </BoardContext.Provider>
        </div>
    );
};

export default Board;
