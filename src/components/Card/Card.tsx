import React, { useRef, useEffect } from "react";
//COMPONENTS
import Input from '../UI/Input/Input'
import Select from '../UI/Select/Select'
import Button from "../UI/Button/Button"
//TYPES
import { TaskI } from '../../redux/slice'
import { BoardContext } from '../../containers/Board/Board'
//REDUX
import { useDispatch } from 'react-redux'
import { changeFromInput, taskDeleting } from '../../redux/slice'

import * as styles from './Card.less'

export type changeValue = {
    boardID: number,
    taskID: number,
    inputID: string,
    payLoad: string
}

const Card = ({ id, taskName, deadlineDate, priority, assignee, description }: TaskI) => {    
 
    const cls = [
        styles.Card,  
        styles.painted
      ]
    
    let colorsByPriority: {[key:string]: string} = {
        High: "red",
        Medium: "yellow",
        Low: "green"
    }
    

    const dispatch = useDispatch()

    function handleChange(event: { target: HTMLInputElement | HTMLSelectElement }, boardID: number, taskID: number, inputID: string) {
        let newValue: changeValue = {
            boardID: boardID,
            taskID: taskID,
            inputID: inputID,
            payLoad: event.target.value
        }
        dispatch(changeFromInput(newValue))      
    }

    return (
        <BoardContext.Consumer>
            { value => <div className={cls.join(" ")} style={ {background: colorsByPriority[priority]} }>
                <Button onClick={ () => {
                    let taskReq = {
                        boardID: value,
                        taskID: id
                    }
                    dispatch(taskDeleting(taskReq))
                } }/>
                <Input 
                    type={"text"} 
                    label={"Task:"} 
                    value={taskName} 
                    onChange={ (event: { target: HTMLInputElement | HTMLSelectElement }) => handleChange(event, value, id, "taskName") }
                />
                <Input 
                    type={"date"} 
                    label={"Deadline:"} 
                    value={deadlineDate} 
                    onChange={ (event: { target: HTMLInputElement | HTMLSelectElement }) => handleChange(event, value, id, "deadlineDate") }
                />
                <Select 
                    type={"select"} 
                    label={"Priority:"} 
                    value={priority} 
                    onChange={ (event: { target: HTMLInputElement | HTMLSelectElement }) => handleChange(event, value, id, "priority") }
                />
                <Input 
                    type={"text"} 
                    label={"Assignee:"} 
                    value={assignee} 
                    onChange={ (event: { target: HTMLInputElement | HTMLSelectElement }) => handleChange(event, value, id, "assignee") }
                />
                <Input 
                    type={"text"} 
                    label={"Description:"} 
                    value={description} 
                    onChange={ (event: { target: HTMLInputElement | HTMLSelectElement }) => handleChange(event, value, id, "description") }
                />
            </div> }
        </BoardContext.Consumer>
    )
}

export default Card