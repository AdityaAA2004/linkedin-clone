import React from 'react';
import './HeaderOption.css';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
function HeaderOption({Icon, avatar,title,onClick}) {
  const user= useSelector(selectUser);
  return (
    <div onClick={onClick} className='headerOption'>
        {Icon && <Icon className='headerOptionIcon'/>}
        {avatar && <Avatar className= 'HeaderOptionIcon' src={user?.photoURL}>{user?.email[0]}</Avatar>}
        {/*The ?. means null safe call. It basically indicates to the program that the photoURL can be null.*/}
        <h3 className='headerOptionTitle'>{title}</h3>
    </div>
  )
}

export default HeaderOption