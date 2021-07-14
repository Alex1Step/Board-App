import React, { useCallback, useEffect } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BoardsContainer from '../../containers/BoardsContainer/BoardsContainer';
import Header from '../../components/custom/Header/Header';

import { useSelector, useDispatch } from 'react-redux';
import { refreshBoardPage } from '../../redux/slices/async/refreshBoardPage';
import { resetProjectCreated } from '../../redux/slices/projectSlice/projectSlice';

import indexSelectors from '../../redux/selectors/indexSelectors';

import styles from './TasksLayout.less';

const TasksLayout: React.FC = () => {
    const dispatch = useDispatch();

    const user: string = useSelector(indexSelectors.user);

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
