import React from 'react';
import { Divider } from 'antd';
import type { BoardI } from '../../redux/interfaces';
import styles from './Board.less';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { IdustbinProps } from './interfaces';
import cn from 'classnames';
import BoardHeader from '../../components/custom/BoardHeader/BoardHeader';
import CardList from '../../components/custom/CardList/CardList';

const ItemTypes = {
    box: 'box',
};

const Board = ({ id, name, tasks }: BoardI, { allowedDropEffect }: IdustbinProps): JSX.Element => {
    //ReactDND for handle active board
    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.box,
            drop: () => ({
                name: id,
                allowedDropEffect,
            }),
            collect: (monitor: DropTargetMonitor<unknown, unknown>) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [allowedDropEffect],
    );
    const isActive = canDrop && isOver;

    return (
        <div
            className={cn({
                [styles.board]: true,
                [styles.active]: isActive,
                [styles.noactive]: !isActive && canDrop,
            })}
            ref={drop}
        >
            <BoardHeader id={id} name={name} tasks={tasks} />
            <Divider />
            <CardList tasks={[...tasks]} />
        </div>
    );
};

export default Board;
