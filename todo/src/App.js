import './App.scss';
import React, { useState, useEffect } from 'react';
import Todo from './Todo'
import AddIcon from '@mui/icons-material/Add';
import { Fab, TextField } from '@mui/material'
import axios from 'axios';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function App() {
  const URL = "http://localhost:8000"
  const [list, setList] = useState([])
  const [text, setText] = useState('')
  const [value, setValue] = useState(new Date());
  const [image, setImage] = useState("")

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
    let formData = new FormData()
    formData.append('text', text)
    formData.append('done', false)
    formData.append('planned_date', value.toISOString())
    formData.append('image', image)

    axios.post(`${URL}/list/`, formData)
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
    let formData = new FormData()
    formData.append('text', req.text)
    formData.append('done', !req.done)
    if (typeof req.planned_date == "object") {
      formData.append('planned_date', req.planned_date.toISOString())
    }
    if (typeof req.image !== "string" && req.image !==null) {
      formData.append('image', req.image)
    }
    axios.patch(`${URL}/list/${req.id}/`, formData)
    .then(res=>{
        const newlist = list.map(val=>{
          if(val.id==res.data.id){
            val = res.data
          }
          return val
        }) 
        setList(newlist)
      })
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
            ampm={false}
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

        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          style={{ display: 'none' }}
          label="Добавить фото"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />


        <div className="photo-add">
          <label for="icon-button-file">
            <AddAPhotoIcon />
          </label>

          {image &&
            <>
              <p> {image.name} </p>

              <svg onClick={() => setImage(null)} className="del" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z" fill="#2E3A59" />
              </svg>
            </>
          }

        </div>
      </div>

    </div>
  );
}

export default App;
