import React from "react";
//components
import Card from "../../components/Card/Card"
import Button from "../../components/UI/Button/Button"
import AddButton from '../../components/UI/AddButton/AddButton'
import Modal from '../../components/Modal/Modal'
import Input from '../../components/UI/Input/Input'
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
      return 'darkgreen'
    } else if (canDrop) {
      return 'darkkhaki'
    } else {
      return '#222'
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
      name: `${allowedDropEffect} Dustbin`,
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
//DND END   

    return (
        <div className="Board" ref={drop}>
            <p className={styles.boardname} onClick={() => setModal(true)}>{name}</p>
            <Modal
                visible={isModal}
                title='Change BOARD name'
                content={<p>Please input new NAME</p>}
                footer={<button onClick={onClose}>Закрыть</button>}
                onClose={onClose}
            >
                <Input 
                    type={"text"} 
                    label={""} 
                    value={name} 
                    onChange={(event: { target: HTMLInputElement | HTMLSelectElement }) => handlerChangeBoardName(event)} 
                    withoutSubstitution={true}
                />
            </Modal>
            <Button onClick={ handleDeleteBoard }/> 
            <AddButton text={"Add new task"} type={"Task"} onClick={addNewTask} />
            <BoardContext.Provider value={id}>
                {arrTasks}
            </BoardContext.Provider>
        </div>
    )
}

export default Board