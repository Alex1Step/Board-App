import React from 'react';
import './App.less';
import TasksLayout from './layouts/TasksLayout/TasksLayout'

const App: React.FC = () => {
  return (
    <div className="App">
      <TasksLayout />
    </div>
  );
}

export default App;