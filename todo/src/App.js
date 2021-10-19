import './App.scss';
import React, { useState } from 'react';
import Todo from './Todo'
import { todo_list } from './todos'
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';

function App() {
  const [list, setTodo_list] = useState(todo_list)
  return (
    <div className="App">
      {
        list.map((val) =>
          <Todo data = {val} />
        )
      }
      <div className="input-bar">

        <TextField fullWidth id="outlined-basic" label="Добавьте задачу" variant="outlined" />
        
        <Fab size="medium" color="primary" aria-label="add">
          <AddIcon />
        </Fab>

      </div>
    </div>
  );
}

export default App;
