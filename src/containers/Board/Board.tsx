import React from "react";
//components
import Card from "../../components/Card/Card"
import ButtonComponent from "../../components/UI/Button/ButtonComponent"
import AddButton from '../../components/UI/AddButton/AddButton'
import Modal from '../../components/Modal/Modal'
import InputComponent from '../../components/UI/Input/InputComponent'
import { Divider } from 'antd';
//interfaces
import type { BoardI } from '../../redux/slice'
//redux
import { useDispatch } from 'react-redux'
import { boardDeleting, taskAdd, changeBoardName } from '../../redux/slice'
//styles
import styles from './Board.less'
//DND START
import { useDrop } from 'react-dnd'
export const ItemTypes = {
    BOX: 'box',
}
export interface DustbinProps {
    allowedDropEffect: string
}
function selectBackgroundColor(isActive: boolean, canDrop: boolean) {
  if (isActive) {
    return 'rgb(55, 136, 212)'
  } else if (canDrop) {
    return 'white'
  }
}
//DND END


export const BoardContext = React.createContext(1)

const Board = ({ id, name, tasks }: BoardI, { allowedDropEffect }: DustbinProps) => {

  const dispatch = useDispatch()

  //prepare to create Task List
  let arrTasks = tasks.map( (t, i) => <Card 
    key={i}
    id={t.id}
    taskName={t.taskName}
    deadlineDate={t.deadlineDate}
    priority={t.priority}
    assignee={t.assignee}
    description={t.description}
    fromBoard={t.fromBoard}
  /> )

  //handler to deleting this board
  function handleDeleteBoard() {
    dispatch(boardDeleting(id))
  }

  //handler for ADD new task to board
  function addNewTask() {
    dispatch(taskAdd(id))
  }

  function handlerChangeBoardName(event: { target: HTMLInputElement | HTMLSelectElement }) {
    const chBName = {
      boardID: id,
      newBoardName: event.target.value
    }
    dispatch(changeBoardName(chBName))
  }

    //MODAL
    const [isModal, setModal] = React.useState(false)
    const onClose = () => setModal(false)
//DND START
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
)
const isActive = canDrop && isOver
const backgroundColor = selectBackgroundColor(isActive, canDrop)
//DND END   

    let cls = [
      styles.Board
    ]

    return (
        <div className={cls.join(" ")} ref={drop} style={{ backgroundColor }}>
            <span className={styles.boardname} onClick={() => setModal(true)}>{name}</span>
            <Modal
                visible={isModal}
                title='Change BOARD name'
                onClose={onClose}
            >
                <InputComponent 
                    type={"text"} 
                    label={""} 
                    value={name} 
                    onChange={(event: { target: HTMLInputElement | HTMLSelectElement }) => handlerChangeBoardName(event)} 
                    withoutSubstitution={true}
                />
            </Modal>
            <div className={styles["board-button-container"]}>
            <AddButton text={"Add new task"} type={"Task"} onClick={addNewTask} />
            <ButtonComponent onClick={ handleDeleteBoard } message={"Delete this board"} /> 
            </div>
            <Divider />
            <BoardContext.Provider value={id}>
                {arrTasks}
            </BoardContext.Provider>
        </div>
    )
}

export default Board