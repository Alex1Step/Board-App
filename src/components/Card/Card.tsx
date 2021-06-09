import React from "react";
import Input from '../UI/Input/Input'
import type { taskI } from '../../redux/slice'

import * as styles from './Card.less'

const Card = ({ id, taskName, deadlineDate, priority, assignee, description }: taskI) => {    
    const cls = [
        styles.Card,  
        styles.painted
      ]
    

    return (
        <div className={cls.join(" ")}>
            <Input type={"text"} label={"Task"} value={taskName} onChange={ () => console.log("1")} />
            <Input type={"text"} label={"Deadline"} value={deadlineDate} onChange={ () => console.log("2")} />
            <Input type={"select"} label={"Priority"} value={priority} onChange={ () => console.log("3")} />
            <Input type={"text"} label={"Assignee"} value={assignee} onChange={ () => console.log("4")} />
            <Input type={"text"} label={"Description"} value={description} onChange={ () => console.log("5")} />
        </div>
    )
}

export default Card