import './App.scss';
import Checkbox from '@mui/material/Checkbox';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Button, TextField } from '@mui/material'
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


export default function Todo(props) {
  const [checked, setChecked] = useState(props.data.done)
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState(props.data.text)
  const [value, setValue] = useState(new Date(props.data.planned_date));

  const getDate = (e) => {
    if (e) {
      const date = new Date(e)
      const days = ['вск', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
      const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
      const now = new Date(date);
      return `${now.getDate()} ${months[now.getMonth()]}, ${days[now.getDay()]}`;
    } else {
      return "∞"
    }
  }

  const getDateTime = (e) => {
    const date = new Date(e)
    const days = ['вск', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const now = new Date(date);
    return `${now.getDate()} ${months[now.getMonth()]}, ${days[now.getDay()]}, ${date.toLocaleTimeString()}`;
  }

  return (
    <todo className="todo">

      <Checkbox size='medium'
        checked={checked}
        onChange={() => {
          setChecked(!checked)
          props.patch(props.data)
        }}
        value={checked}
        inputProps={{
          'aria-label': 'Checkbox',
        }}
      />
      {
        edit &&
        <div className="edit">
          <TextField
            variant="standard"
            multiline
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              value={value}
              ampm={false}
              onChange={(newValue) => {
                setValue(newValue);
              }}
            />
          </LocalizationProvider>

          <Button
            className="edit-btn"
            onClick={() => {
              props.data.text = text
              props.data.planned_date = value
              props.patch(props.data)
              setEdit(false)
            }}
            color='success'
            variant="contained">Изменить</Button>
        </div>
        ||
        <p>{props.data.text}</p>
      }


      <span className="date">
        <EditIcon onClick={() => { setEdit(!edit) }} fontSize='small' />
        {getDate(props.data.date)} - {getDateTime(props.data.planned_date)}
      </span>

      <svg onClick={() => props.delete(props.data)} className="del" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z" fill="#2E3A59" />
      </svg>

    </todo>
  )
}