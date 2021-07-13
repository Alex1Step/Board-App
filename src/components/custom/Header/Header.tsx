import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { Button } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { logOut, refreshBoardPage } from '../../../redux/userSlice/userSlice';

import indexSelectors from '../../../redux/selectors/indexSelectors';

import { useTranslation } from 'react-i18next';

import styles from './Header.less';

const Header = (): React.ReactElement => {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const history = useHistory();

    const user: string = useSelector(indexSelectors.user);

    const beforeRefreshPage = useCallback(() => {
        dispatch(refreshBoardPage(user));
    }, []);

    const logOutHandler = useCallback(() => {
        localStorage.removeItem('user');
        dispatch(logOut(user));
        history.push('/about');
    }, []);

    return (
        <header className={styles.header}>
            {history.location.pathname.includes('boards') && (
                <Button
                    className={styles.projectButton}
                    type="primary"
                    onClick={() => {
                        beforeRefreshPage();
                        history.push('/user');
                    }}
                >
                    {t('description.projects')}
                </Button>
            )}
            {history.location.pathname.includes('user') && (
                <div className={styles.userName}>
                    <p>{user}</p>
                </div>
            )}
            <Button className={styles.logoutBtn} type="primary" danger onClick={logOutHandler}>
                {t('description.logout')}
            </Button>
        </header>
    );
};

export default Header;
