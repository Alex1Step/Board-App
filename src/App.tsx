import React, { useState } from 'react';
import './App.less';
import TasksLayout from './layouts/TasksLayout/TasksLayout'
import Burger from './components/Navigation/Burger/Burger'
import Pull from './components/Navigation/Pull/Pull'

const App: React.FC = () => {
  let [burgerOpen, setBurgerOpen] = useState(false)
  
  const handlerBurger = () => {
    setBurgerOpen(!burgerOpen)
  }

  const handlerBorgerClose = () => {
    setBurgerOpen(false)
  }

  return (
    <div className="App">
      <Burger isOpen={burgerOpen} onClick={ handlerBurger } />
      <Pull isOpen={burgerOpen} onClick={ handlerBorgerClose } />
      <TasksLayout />
    </div>
  );
}

export default App;