import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { refreshBoardPage, resetProjectCreated } from '../../redux/slice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './TasksLayout.less';
import BoardsContainer from '../../containers/BoardsContainer/BoardsContainer';
import Header from '../../components/custom/Header/Header';

const TasksLayout: React.FC = () => {
    const dispatch = useDispatch();

    const user: string = useSelector((state: RootState) => state.globalReducer.userName);

    const beforeRefreshPage = useCallback(() => {
        dispatch(refreshBoardPage(user));
    }, []);

    useEffect(() => {
        window.addEventListener('beforeunload', beforeRefreshPage);
        dispatch(resetProjectCreated());
        return () => {
            window.removeEventListener('beforeunload', beforeRefreshPage);
        };
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.wrapper}>
                <Header />
                <BoardsContainer />
            </div>
        </DndProvider>
    );
};

export default TasksLayout;
