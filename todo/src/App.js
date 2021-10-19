import './App.scss';
import React, { useState, useEffect } from 'react';
import Todo from './Todo'
import AddIcon from '@mui/icons-material/Add';
import { Fab, TextField } from '@mui/material'
import axios from 'axios';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
  const URL = "http://localhost:8000"
  const [list, setList] = useState([])
  const [text, setText] = useState('')
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const get_list = async () => {
      await getTodos()
    }
    get_list()
  }, [])

  const getTodos = async () => {
    axios.get('http://localhost:8000/list/')
      .then(res => {
        const data = res.data
        setList(data)
      })
      .catch(err => {
        alert(err)
      })
  }

  const onSubmit = () => {
    const data = {
      "text": text,
      "done": false,
      "planned_date": value.toISOString(),
    }
    axios.post(`${URL}/list/`, data)
      .then(res => {
        const data = res.data
        setList([...list, data])
        setText('')
      })
      .catch(err => {
        if (!text) {
          alert("Пустой")
        } else {
          alert(err)
        }
      })
  }

  const deleteTodo = (data) => {
    const result = window.confirm("Удалить?");
    if (result) {
      axios.delete(`${URL}/list/${data?.id}`)
        .then(res => {
          if (res.status === 204) {
            setList(list.filter((item) => item.id !== data.id))
          }
        })
        .catch(err => {
          alert(err)
        })
    }
  }

  const patchTodo = (req) => {
    const data = {
      "text": req.text,
      "done": !req.done,
      "planned_date": req.planned_date
    }
    axios.patch(`${URL}/list/${req.id}/`, data)
      .catch(err => {
        alert(err)
      })
  }

  return (
    <div className="App">
      
      <div className="ListHolder">

        {
          list.map((val, index) =>
            <Todo key={index} data={val} delete={deleteTodo} patch={patchTodo} />
          )
        }

      </div>
      
      <div className="input-bar">

        <LocalizationProvider className="input-date" dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Дата выполнения"
            value={value}
            ampm = {false}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>   
             
        <TextField
          className="input-line"
          id="outlined-basic"
          label="Добавьте задачу"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Fab className="input-btn" onClick={onSubmit} size="medium" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        
      </div>

    </div>
  );
}

export default App;
