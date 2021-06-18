import React from 'react';
//COMPONENTS
import Board from '../../containers/Board/Board';
import AddButton from '../../components/base/AddButton/AddButton';
import { Button } from 'antd';
//REDUX
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { BoardI } from '../../redux/interfaces';
import { boardAdd, logOut } from '../../redux/slice';
//REACT DND
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './TasksLayout.less';
import { IfFirebaseAuthed } from '@react-firebase/auth';
import firebase from 'firebase';
import store from '../../redux/store';

const TasksLayout: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    const boards: BoardI[] = useSelector((state: RootState) => state.globalReducer.boards);
    const user: string = useSelector((state: RootState) => state.globalReducer.userName);
    const arrBoards = boards.map((b, i) => <Board key={i} id={b.id} name={b.name} tasks={b.tasks} />);

    //add board - handler
    function addBoard() {
        dispatch(boardAdd());
    }

    const logOutHandler = () => {
        dispatch(logOut());
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <header>
                {user !== '' ? (
                    <Button type="primary" danger onClick={logOutHandler}>
                        Logout
                    </Button>
                ) : null}
            </header>
            <section className={styles.TasksLayout}>
                <h1>{user}</h1>
                <AddButton onClick={addBoard} text={'Add new board'} type={'Board'} />
                <section className={styles.boardsContainer}>{arrBoards}</section>
            </section>
        </DndProvider>
    );
};

export default TasksLayout;
