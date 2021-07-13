import React, { useCallback, useEffect, useState } from 'react';

import { Route, Switch } from 'react-router-dom';

import UserPage from './pages/UserPage/UserPage';
import TasksLayout from './pages/TasksLayout/TasksLayout';
import Burger from './components/custom/Navigation/Burger/Burger';
import Pull from './components/custom/Navigation/Pull/Pull';
import LogInLayout from './pages/LogInLayout/LogInLayout';
import RegLayout from './pages/RegLayout/RegLayout';
import AboutLayout from './pages/AboutLayout/AboutLayout';
import Preloader from './components/custom/Preloader/Preloader';
import { Button } from 'antd';

import { onLoadPage } from './redux/slice';
import { useDispatch } from 'react-redux';
import store from './redux/store';

import i18n from './i18n';
import { useTranslation } from 'react-i18next';

import styles from './App.less';

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
        { to: '/user', text: `${t('description.projects')}`, exact: true },
    ];

    const beforeUnloadPage = useCallback(() => {
        localStorage.setItem('user', store.getState().globalReducer.userName);
    }, []);

    useEffect(() => {
        dispatch(onLoadPage(setData));
        window.addEventListener('beforeunload', beforeUnloadPage);
        return () => {
            window.removeEventListener('beforeunload', beforeUnloadPage);
        };
    }, []);

    const changeLanguage = useCallback((language: string | undefined) => {
        i18n.changeLanguage(language);
    }, []);

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
