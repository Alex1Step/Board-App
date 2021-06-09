import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import { increment, decrement } from '../../redux/slice'



const TasksLayout = () => { 
    const counter = useSelector((state: RootState) => state.reducer.counter)
    const dispatch = useDispatch()

    return (
        <div className="tasksLayout">
            <p>{counter}</p>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>+</button>
        </div>
    )
}

export default TasksLayout