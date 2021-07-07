import React from 'react';
import styles from './CardList.less';
import Card from '../Card/Card';
import { TaskI } from '../../../redux/interfaces';

const CardList = (tasks: Array<TaskI>) => {
    return (
        tasks &&
        tasks.map((task, index) => (
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
        ))
    );
};

export default CardList;
