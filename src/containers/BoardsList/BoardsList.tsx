import React from 'react';
import styles from './BoardsList.less';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { BoardI } from '../../redux/interfaces';
import Board from '../../containers/Board/Board';

const BoardsList = (): JSX.Element => {
    const boards: BoardI[] = useSelector((state: RootState) => state.globalReducer.boards);

    return (
        <section className={styles.boardsContainer}>
            {boards &&
                boards.map((board, index) => {
                    if (board !== null)
                        return <Board key={index} id={board.id} name={board.name} tasks={board.tasks} />;
                })}
        </section>
    );
};

export default BoardsList;
