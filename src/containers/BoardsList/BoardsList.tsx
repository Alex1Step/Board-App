import React from 'react';

import { useSelector } from 'react-redux';
import { BoardI } from '../../redux/interfaces';

import Board from '../../containers/Board/Board';

import indexSelectors from '../../redux/selectors/indexSelectors';

import styles from './BoardsList.less';

const BoardsList = (): React.ReactElement => {
    const boards: BoardI[] = useSelector(indexSelectors.boards);

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
