import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Board from '../../containers/Board/Board';
import AddButton from '../../components/base/AddButton/AddButton';
import { Button } from 'antd';
import Preloader from '../../components/custom/Preloader/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { boardAdd, logOut } from '../../redux/slice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './TasksLayout.less';
import { BoardI } from '../../redux/interfaces';
import { useTranslation } from 'react-i18next';

const TasksLayout: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [data, setData] = useState(true);

    const boards: BoardI[] = useSelector((state: RootState) => state.globalReducer.boards);
    const user: string = useSelector((state: RootState) => state.globalReducer.userName);

    const addBoard = () => {
        dispatch(boardAdd());
    };

    const logOutHandler = () => {
        setData(false);
        localStorage.removeItem('user');
        dispatch(logOut(user));
        history.push('/about');
    };

    const { t } = useTranslation();

    return data ? (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.wrapper}>
                <header>
                    <Button className={styles.logoutBtn} type="primary" danger onClick={logOutHandler}>
                        {t('description.logout')}
                    </Button>
                </header>
                <section className={styles.tasksLayout}>
                    <div className={styles.container}>
                        <h1>{user}</h1>
                    </div>
                    <AddButton
                        className={'addBoard'}
                        onClick={addBoard}
                        text={t('description.addBoard')}
                        type={'Board'}
                    />
                    <section className={styles.boardsContainer}>
                        {boards
                            ? boards.map((b, i) => {
                                  if (b !== null) return <Board key={i} id={b.id} name={b.name} tasks={b.tasks} />;
                              })
                            : null}
                    </section>
                </section>
            </div>
        </DndProvider>
    ) : (
        <Preloader />
    );
};

export default TasksLayout;
