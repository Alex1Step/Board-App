import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.less';
import TasksLayout from './pages/TasksLayout/TasksLayout';
import Burger from './components/custom/Navigation/Burger/Burger';
import Pull from './components/custom/Navigation/Pull/Pull';
import LogInLayout from './pages/LogInLayout/LogInLayout';
import RegLayout from './pages/RegLayout/RegLayout';
import AboutLayout from './pages/AboutLayout/AboutLayout';
import MyApi from './api/indexApi';
import { onLeavePage, onLoadPage } from './redux/slice';
import { useDispatch } from 'react-redux';
import Preloader from './components/custom/Preloader/Preloader';
import store from './redux/store';

const App: React.FC = () => {
    const dispatch = useDispatch();

    const [data, setData] = useState(false);

    const [burgerOpen, setBurgerOpen] = useState(false);

    const handlerBurger = () => {
        setBurgerOpen(!burgerOpen);
    };

    const handlerBurgerClose = () => {
        setBurgerOpen(false);
    };

    const links = [
        { to: '/about', text: 'About', exact: true },
        { to: '/boards', text: 'Boards', exact: true },
        { to: '/login', text: 'Log In', exact: true },
        { to: '/register', text: 'Register', exact: true },
    ];

    function beforeUnloadPage() {
        localStorage.setItem('user', store.getState().globalReducer.userName.replace(/[\s.,%]/g, ''));
        const user = MyApi.currentUserApi();
        if (user?.email) dispatch(onLeavePage(user?.email));
    }

    useEffect(() => {
        dispatch(onLoadPage(setData));
        window.addEventListener('beforeunload', beforeUnloadPage);
        return () => {
            window.removeEventListener('beforeunload', beforeUnloadPage);
        };
    }, []);

    return data ? (
        <div className="App">
            <Burger isOpen={burgerOpen} onClick={handlerBurger} />
            <Pull isOpen={burgerOpen} onClick={handlerBurgerClose} listOfLinks={links} />
            <Switch>
                <Route path="/boards" component={TasksLayout} />
                <Route path="/login" component={LogInLayout} />
                <Route path="/register" component={RegLayout} />
                <Route path="/" component={AboutLayout} />
            </Switch>
        </div>
    ) : (
        <Preloader />
    );
};

export default App;
