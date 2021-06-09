import React from "react";
import Input from '../UI/Input/Input'
import type { taskI } from '../../redux/slice'
import { BoardContext } from '../../containers/Board/Board'

import * as styles from './Card.less'

const Card = ({ id, taskName, deadlineDate, priority, assignee, description }: taskI) => {    
    const cls = [
        styles.Card,  
        styles.painted
      ]
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEventHandler<HTMLSelectElement>, boardID: number, taskID: number) {
        console.log("I`m from board: " + boardID + " and from task " + taskName);
    }

    return (
        <BoardContext.Consumer>
            { value => <div className={cls.join(" ")}>
            <Input 
                type={"text"} 
                label={"Task"} 
                value={taskName} 
                onChange={ (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEventHandler<HTMLSelectElement>) => handleChange(e,value, id) }
            />
            <Input type={"text"} label={"Deadline"} value={deadlineDate} onChange={ (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEventHandler<HTMLSelectElement>) => handleChange(e, value, id) } />
            <Input type={"select"} label={"Priority"} value={priority} onChange={ (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEventHandler<HTMLSelectElement>) => handleChange(e, value, id) } />
            <Input type={"text"} label={"Assignee"} value={assignee} onChange={ (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEventHandler<HTMLSelectElement>) => handleChange(e, value, id) } />
            <Input type={"text"} label={"Description"} value={description} onChange={ (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEventHandler<HTMLSelectElement>) => handleChange(e, value, id) } />
        </div> }
        </BoardContext.Consumer>
    )
}

export default Card