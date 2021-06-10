import React from "react";
//COMPONENTS
import Input from '../UI/Input/Input'
import Select from '../UI/Select/Select'
import Button from "../UI/Button/Button"
//TYPES
import { boardDeleting, taskI } from '../../redux/slice'
import { BoardContext } from '../../containers/Board/Board'
//REDUX
import { useDispatch, useSelector } from 'react-redux'
import { changeFromInput, taskDeleting } from '../../redux/slice'

import * as styles from './Card.less'

export type changeValue = {
    boardID: number,
    taskID: number,
    inputID: string,
    payLoad: string
}

const Card = ({ id, taskName, deadlineDate, priority, assignee, description }: taskI) => {    
    const cls = [
        styles.Card,  
        styles.painted
      ]
    
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

    function handleDeleteTask() {
        let taskReq = {
            boardID: boardID,
            
        }
        dispatch(taskDeleting(id))
    }

    return (
        <BoardContext.Consumer>
            { value => <div className={cls.join(" ")}>
            <Button onClick={ handleDeleteTask }/>
            <Input 
                type={"text"} 
                label={"Task"} 
                value={taskName} 
                onChange={ (event: { target: HTMLInputElement | HTMLSelectElement }) => handleChange(event, value, id, "taskName") }
            />
            <Input 
                type={"text"} 
                label={"Deadline"} 
                value={deadlineDate} 
                onChange={ (event: { target: HTMLInputElement | HTMLSelectElement }) => handleChange(event, value, id, "deadlineDate") }
            />
            <Select 
                type={"select"} 
                label={"Priority"} 
                value={priority} 
                onChange={ (event: { target: HTMLInputElement | HTMLSelectElement }) => handleChange(event, value, id, "priority") }
            />
            <Input 
                type={"text"} 
                label={"Assignee"} 
                value={assignee} 
                onChange={ (event: { target: HTMLInputElement | HTMLSelectElement }) => handleChange(event, value, id, "assignee") }
            />
            <Input 
                type={"text"} 
                label={"Description"} 
                value={description} 
                onChange={ (event: { target: HTMLInputElement | HTMLSelectElement }) => handleChange(event, value, id, "description") }
            />
        </div> }
        </BoardContext.Consumer>
    )
}

export default Card