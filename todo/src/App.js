import './App.scss';
import React, { useState } from 'react';
import Todo from './Todo'
import { todo_list } from './todos'

function App() {
  const [list, setTodo_list] = useState(todo_list)
  return (
    <div className="App">
      {
        list.map((val) =>
          <Todo data = {val} />
        )
      }
    </div>
  );
}

export default App;
