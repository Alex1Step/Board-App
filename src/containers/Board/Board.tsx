import React, { createContext } from "react";
import Card from "../../components/Card/Card"
import Button from "../../components/UI/Button/Button"
import type { boardI } from '../../redux/slice'
import { useDispatch } from 'react-redux'
import { boardDeleting } from '../../redux/slice'

import styles from './Board.less'

export const BoardContext = React.createContext(1)

const Board = ({ id, name, tasks }: boardI) => {

    const dispatch = useDispatch()

    let arrTasks = tasks.map( (t, i) => <Card 
        key={i}
        id={t.id}
        taskName={t.taskName}
        deadlineDate={t.deadlineDate}
        priority={t.priority}
        assignee={t.assignee}
        description={t.description}
    /> )

    function handleDeleteBoard() {
        dispatch(boardDeleting(id))
    }

    return (
        <div className="Board">
            <p>board {name}</p>
            <Button onClick={ handleDeleteBoard }/>
            <BoardContext.Provider value={id}>
                {arrTasks}
            </BoardContext.Provider>
        </div>
    )
}

export default Board