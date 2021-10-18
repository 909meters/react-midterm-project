import './App.scss';
import React, { useState } from 'react';
import Todo from './Todo'
import { todo_list } from './todos'
import TextField from '@mui/material/TextField';

function App() {
  const [list, setTodo_list] = useState(todo_list)
  return (
    <div className="App">
      {
        list.map((val) =>
          <Todo data = {val} />
        )
      }
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </div>
  );
}

export default App;
