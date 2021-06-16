import React from 'react';
//COMPONENTS
import Board from '../../containers/Board/Board';
import AddButton from '../../components/UI/AddButton/AddButton';
import { Button } from 'antd';
//REDUX
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { BoardI } from '../../redux/slice';
import { boardAdd } from '../../redux/slice';
//DND START
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
//DND END

import styles from './TasksLayout.less';
import { IfFirebaseAuthed } from '@react-firebase/auth';
import firebase from 'firebase';

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
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log('LOGGED OUT');
            })
            .catch((error) => {
                console.log('NOT LOGGED OUT');
            });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <header>
                <IfFirebaseAuthed>
                    {() => {
                        return (
                            <Button type="primary" danger onClick={logOutHandler}>
                                Logout
                            </Button>
                        );
                    }}
                </IfFirebaseAuthed>
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
