import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.less';
import TasksLayout from './pages/TasksLayout/TasksLayout';
import Burger from './components/custom/Navigation/Burger/Burger';
import Pull from './components/custom/Navigation/Pull/Pull';
import LogInLayout from './pages/LogInLayout/LogInLayout';
import RegLayout from './pages/RegLayout/RegLayout';
import AboutLayout from './pages/AboutLayout/AboutLayout';

const App: React.FC = () => {
    const [burgerOpen, setBurgerOpen] = useState(false);

    const handlerBurger = () => {
        setBurgerOpen(!burgerOpen);
    };

    const handlerBurgerClose = () => {
        setBurgerOpen(false);
    };

    const links = [
        { to: '/boards', text: 'Boards', exact: true },
        { to: '/login', text: 'Log In', exact: true },
        { to: '/register', text: 'Register', exact: true },
        { to: '/about', text: 'About', exact: true },
    ];

    return (
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
    );
};

export default App;
