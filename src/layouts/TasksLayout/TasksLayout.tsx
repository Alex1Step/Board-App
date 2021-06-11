import React from 'react'
import Board from '../../containers/Board/Board'
import AddButton from '../../components/UI/AddButton/AddButton'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../redux/store'
import { BoardI } from '../../redux/slice'
import { boardAdd } from '../../redux/slice'

import styles from './TasksLayout.less'


const TasksLayout = () => { 
    const dispatch = useDispatch()
    const boards: BoardI[] = useSelector((state: RootState) => state.globalReducer.boards)
    let arrBoards = boards.map( (b, i) => <Board key={i} id={b.id} name={b.name} tasks={b.tasks} /> )        
    
    function addBoard() {
        dispatch(boardAdd())
    }

    return (
        <div className={styles.TaskLayout}>
            <AddButton onClick={addBoard} text={"Add new board"} type={"Board"} />
            <section style={ {display: 'flex', flexDirection: 'row', justifyContent: 'space-around'} }>
                {arrBoards}
            </section>
        </div>
    )
}

export default TasksLayout