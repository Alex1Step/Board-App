import React, { useCallback, useState } from 'react';

import CardView from '../../components/custom/Card/CardView/CardView';

import { useDrag, DragSourceMonitor } from 'react-dnd';

import { ICardContainer, IdropResult } from './interfaces';
import { taskDeleting, moveTask } from '../../redux/slices/projectSlice/projectSlice';
import { useDispatch } from 'react-redux';

import cn from 'classnames';

import styles from './CardContainer.less';

const ItemTypes = {
    box: 'box',
};

const CardContainer = (props: ICardContainer): React.ReactElement => {
    const { taskInfo, isAdmin, currentAssignee, setModal } = props;
    const { id, taskName, deadlineDate, priority, assignee, description, fromBoard } = taskInfo;

    const dispatch = useDispatch();

    const [blink, setBlink] = useState(1);

    const forCompare = {
        taskName: 'New Task',
        deadlineDate: 'default',
        assignee: 'anybody',
        description: 'to do',
    };

    const deleteTask = useCallback(() => {
        dispatch(
            taskDeleting({
                boardID: Number(fromBoard),
                taskID: id,
            }),
        );
    }, []);

    //ReactDND for work with active cards
    const [, drag] = useDrag(
        () => ({
            type: ItemTypes.box,
            item: { taskName },
            end(item, monitor) {
                const dropResult = monitor.getDropResult() as IdropResult;
                if (item && dropResult) {
                    const moveTaskInfo = {
                        destinationBoard: dropResult.name,
                        fromBoard: fromBoard,
                        taskID: id,
                    };
                    dispatch(moveTask(moveTaskInfo));
                }
            },
            collect: (monitor: DragSourceMonitor) => ({
                opacity: monitor.isDragging() ? 0.9 : 1,
            }),
        }),
        [taskInfo.taskName],
    );

    return (
        <div
            ref={
                taskName === forCompare.taskName ||
                deadlineDate === forCompare.deadlineDate ||
                assignee === forCompare.assignee ||
                description === forCompare.description
                    ? null
                    : drag
            }
            className={cn({
                [styles.card]: true,
                [styles[`${priority.toLowerCase()}`]]: true,
                [styles.blink]: blink && priority === 'none',
            })}
            onClick={() => {
                setBlink(0);
                if ((currentAssignee === assignee || isAdmin) && setModal) setModal(true);
            }}
        >
            <CardView taskInfo={{ ...taskInfo }} deleteFunc={deleteTask} />
        </div>
    );
};

export default CardContainer;
