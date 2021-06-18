import React from 'react';
//components
import Card from '../../components/custom/Card/Card';
import ButtonComponent from '../../components/base/Button/ButtonComponent';
import AddButton from '../../components/base/AddButton/AddButton';
import Modal from '../../components/custom/Modal/Modal';
import InputComponent from '../../components/base/Input/InputComponent';
import { Divider } from 'antd';
//interfaces
import type { BoardI } from '../../redux/interfaces';
//redux
import { useDispatch } from 'react-redux';
import { boardDeleting, taskAdd, changeBoardName } from '../../redux/slice';
//styles
import styles from './Board.less';
//reactDND
import { useDrop } from 'react-dnd';
import { IdustbinProps } from './interfaces';

const ItemTypes = {
    BOX: 'box',
};

export const BoardContext = React.createContext(1);

const Board = ({ id, name, tasks }: BoardI, { allowedDropEffect }: IdustbinProps): JSX.Element => {
    const cls = [styles.Board];
    const dispatch = useDispatch();

    //prepare to create Task List
    const arrTasks = tasks
        ? tasks.map((t, i) => (
              <Card
                  key={i}
                  id={t.id}
                  taskName={t.taskName}
                  deadlineDate={t.deadlineDate}
                  priority={t.priority}
                  assignee={t.assignee}
                  description={t.description}
                  fromBoard={t.fromBoard}
              />
          ))
        : null;

    //handler for deleting this board
    function handleDeleteBoard() {
        dispatch(boardDeleting(id));
    }

    //handler for ADD new task to board
    function addNewTask() {
        dispatch(taskAdd(id));
    }
    //handler for rename board
    function handlerChangeBoardName(event: { target: HTMLInputElement | HTMLSelectElement }) {
        const chBName = {
            boardID: id,
            newBoardName: event.target.value,
        };
        dispatch(changeBoardName(chBName));
    }

    //MODAL window
    const [isModal, setModal] = React.useState(false);
    const onClose = () => setModal(false);

    //ReactDND for handle active board
    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.BOX,
            drop: () => ({
                name: id,
                allowedDropEffect,
            }),
            collect: (monitor: any) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [allowedDropEffect],
    );
    const isActive = canDrop && isOver;
    const backgroundColor = selectBackgroundColor(isActive, canDrop);

    //ReactDND support function
    function selectBackgroundColor(isActive: boolean, canDrop: boolean) {
        if (isActive) {
            cls.push(styles.active);
        } else if (canDrop) {
            cls.push(styles.noactive);
        }
    }

    return (
        <div className={cls.join(' ')} ref={drop}>
            <span className={styles.boardname} onClick={() => setModal(true)}>
                {name}
            </span>
            <Modal visible={isModal} title="Change BOARD name" onClose={onClose}>
                <InputComponent
                    type={'text'}
                    label={''}
                    value={name}
                    onChange={(event: { target: HTMLInputElement | HTMLSelectElement }) =>
                        handlerChangeBoardName(event)
                    }
                    withoutSubstitution={true}
                />
            </Modal>
            <div className={styles.boardButtonContainer}>
                <AddButton text={'Add new task'} type={'Task'} onClick={addNewTask} />
                <ButtonComponent onClick={handleDeleteBoard} message={'Delete this board'} />
            </div>
            <Divider />
            <BoardContext.Provider value={id}>{arrTasks}</BoardContext.Provider>
        </div>
    );
};

export default Board;
