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
            {boards
                ? boards.map((b, i) => {
                      if (b !== null) return <Board key={i} id={b.id} name={b.name} tasks={b.tasks} />;
                  })
                : null}
        </section>
    );
};

export default BoardsList;
