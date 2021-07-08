import React from 'react';
import styles from './Header.less';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, refreshBoardPage } from '../../../redux/slice';
import { RootState } from '../../../redux/store';

const Header = (): JSX.Element => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const history = useHistory();
    const user: string = useSelector((state: RootState) => state.globalReducer.userName);

    const beforeRefreshPage = () => {
        dispatch(refreshBoardPage(user));
    };

    const logOutHandler = () => {
        localStorage.removeItem('user');
        dispatch(logOut(user));
        history.push('/about');
    };

    return (
        <header className={styles.header}>
            {window.location.href.includes('boards') && (
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
            {window.location.href.includes('user') && (
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