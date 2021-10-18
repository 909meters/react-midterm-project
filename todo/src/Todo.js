import './App.scss';
import Checkbox from '@mui/material/Checkbox';
import React, {useState} from 'react';

export default function Todo(props) {
  const [checked, setChecked] = useState(props.data.done)  

  return (
    <todo className="todo">

      <Checkbox size='medium' 
        checked={checked}
        onChange={ (item)=>{
          setChecked(item)
        }} 
        value={checked}
        inputProps={{
          'aria-label': 'Checkbox',
        }}
      />

      <p className="right">{props.data.text}</p>

      <svg className="del" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z" fill="#2E3A59" />
      </svg>

    </todo>
  )
}