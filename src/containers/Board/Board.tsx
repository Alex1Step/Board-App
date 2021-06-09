import React, { createContext } from "react";
import Card from "../../components/Card/Card"
import type { boardI, taskI } from '../../redux/slice'

import styles from './Board.less'

export const BoardContext = React.createContext(1)

const Board = ({ id, name, tasks }: boardI) => {

    let arrTasks = tasks.map( (t, i) => <Card 
        key={i}
        id={t.id}
        taskName={t.taskName}
        deadlineDate={t.deadlineDate}
        priority={t.priority}
        assignee={t.assignee}
        description={t.description}
    /> )

    return (
        <div className="Board">
            <p>board {name}</p>
            <BoardContext.Provider value={id}>
                {arrTasks}
            </BoardContext.Provider>
        </div>
    )
}

export default Board



// id: number,
// taskName: string,
// deadlineDate: string,
// priority: string,
// assignee: string,
// description: string