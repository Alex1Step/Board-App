import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
//COMPONENTS
import Board from '../../containers/Board/Board';
import AddButton from '../../components/base/AddButton/AddButton';
import { Button } from 'antd';
import Preloader from '../../components/custom/Preloader/Preloader';
//REDUX
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { boardAdd, logOut } from '../../redux/slice';
//REACT DND
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
//STYLES
import styles from './TasksLayout.less';
//interfaces
import { BoardI } from '../../redux/interfaces';

const TasksLayout: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    const [data, setData] = useState(true);

    const boards: BoardI[] = useSelector((state: RootState) => state.globalReducer.boards);
    const user: string = useSelector((state: RootState) => state.globalReducer.userName);

    const arrBoards = boards
        ? boards.map((b, i) => {
              if (b !== null) return <Board key={i} id={b.id} name={b.name} tasks={b.tasks} />;
          })
        : null;

    function addBoard() {
        dispatch(boardAdd());
    }

    const history = useHistory();

    const logOutHandler = () => {
        setData(false);
        dispatch(logOut(user));
        setTimeout(() => history.push('/about'), 1000);
    };

    return data ? (
        <DndProvider backend={HTML5Backend}>
            <>
                <header>
                    <Button type="primary" danger onClick={logOutHandler}>
                        Logout
                    </Button>
                </header>
                <section className={styles.TasksLayout}>
                    <h1>{user}</h1>
                    <AddButton onClick={addBoard} text={'Add new board'} type={'Board'} />
                    <section className={styles.boardsContainer}>{arrBoards}</section>
                </section>
            </>
        </DndProvider>
    ) : (
        <Preloader />
    );
};

export default TasksLayout;
