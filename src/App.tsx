import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.less';
import TasksLayout from './pages/TasksLayout/TasksLayout';
import Burger from './components/custom/Navigation/Burger/Burger';
import Pull from './components/custom/Navigation/Pull/Pull';
import LogInLayout from './pages/LogInLayout/LogInLayout';
import RegLayout from './pages/RegLayout/RegLayout';
import AboutLayout from './pages/AboutLayout/AboutLayout';
import { onLoadPage } from './redux/slice';
import { useDispatch } from 'react-redux';
import Preloader from './components/custom/Preloader/Preloader';
import store from './redux/store';
import i18n from './i18n';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import UserPage from './pages/UserPage/UserPage';

const App: React.FC = () => {
    const dispatch = useDispatch();

    const [data, setData] = useState(false);

    const [burgerOpen, setBurgerOpen] = useState(false);

    const handlerBurger = useCallback(() => setBurgerOpen(!burgerOpen), [burgerOpen]);

    const handlerBurgerClose = useCallback(() => setBurgerOpen(false), []);

    const { t } = useTranslation();

    const links = [
        { to: '/about', text: `${t('description.aboutLink')}`, exact: true },
        { to: '/login', text: `${t('description.loginLink')}`, exact: true },
        { to: '/register', text: `${t('description.registerLink')}`, exact: true },
        { to: '/user', text: 'Projects', exact: true },
    ];

    const beforeUnloadPage = () => {
        localStorage.setItem('user', store.getState().globalReducer.userName);
    };

    useEffect(() => {
        dispatch(onLoadPage(setData));
        window.addEventListener('beforeunload', beforeUnloadPage);
        return () => {
            window.removeEventListener('beforeunload', beforeUnloadPage);
        };
    }, []);

    const changeLanguage = (language: string | undefined) => {
        i18n.changeLanguage(language);
    };

    return data ? (
        <>
            <Burger isOpen={burgerOpen} onClick={handlerBurger} />
            <Pull isOpen={burgerOpen} onClick={handlerBurgerClose} listOfLinks={links} />

            <Switch>
                <Route path="/boards" component={TasksLayout} />
                <Route path="/login" component={LogInLayout} />
                <Route path="/register" component={RegLayout} />
                <Route path="/user" component={UserPage} />
                <Route path="/" component={AboutLayout} />
            </Switch>
            <div className={styles.languageButtons}>
                <Button type="primary" className={styles.langBtn} ghost onClick={() => changeLanguage('en')}>
                    EN
                </Button>
                <Button type="primary" className={styles.langBtn} ghost onClick={() => changeLanguage('ru')}>
                    RU
                </Button>
            </div>
        </>
    ) : (
        <Preloader />
    );
};

export default App;
