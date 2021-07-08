import React from 'react';
import Card from '../Card/Card';
import { TaskI } from '../../../redux/interfaces';

const CardList = (props: { tasks: Array<TaskI> }): JSX.Element => {
    return (
        <>
            {props.tasks &&
                props.tasks.map((task, index) => (
                    <Card
                        key={index}
                        id={task.id}
                        taskName={task.taskName}
                        deadlineDate={task.deadlineDate}
                        priority={task.priority}
                        assignee={task.assignee}
                        description={task.description}
                        fromBoard={task.fromBoard}
                    />
                ))}
        </>
    );
};

export default CardList;
