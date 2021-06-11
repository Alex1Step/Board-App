import React from 'react'
import Board from '../../containers/Board/Board'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import { BoardI } from '../../redux/slice'

import styles from './TasksLayout.less'


const TasksLayout = () => { 
    const boards: BoardI[] = useSelector((state: RootState) => state.globalReducer.boards)
    let arrBoards = boards.map( (b, i) => <Board key={i} id={b.id} name={b.name} tasks={b.tasks} /> )        

    const cls = [
        styles.TasksLayout
      ]
    

    return (
        <div className={cls.join(" ")}>
            {arrBoards}
        </div>
    )
}

export default TasksLayout