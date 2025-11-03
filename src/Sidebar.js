import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Avatar } from '@mui/material';
import LinkedInBackground from './linkedin-background.jpg';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { DescriptionCollection } from './Firebase';
import { getDocs } from 'firebase/firestore';
function Sidebar() {
  const user = useSelector(selectUser);
  const [description,setDescription] = useState('')
  useEffect(
   ()=>{
    const fetchDescription = async() =>{
      const descriptionSnapshot = await getDocs(DescriptionCollection);
      const userDocs = descriptionSnapshot.docs.filter(doc => doc.data().userID === user.uid); 
       
      setDescription(userDocs[0].data().userDescription)
    }
    fetchDescription()
   }
  ,[user.uid])
  console.log(description);
  const recentItem = (topic) => {
    return (
      <div className='SidebarRecentItem'>
        <span className='SidebarHash'>#</span>
        <p>{topic}</p>
      </div>
    );
  };

  return (
    <div className='Sidebar'>
      <div className='SidebarTop'>
        <img src={LinkedInBackground} alt='' />
        <Avatar className='SidebarAvatar' src={user?.photoURL}>{user.email[0]}</Avatar>
        <h2>{user.displayName}</h2>
        <h4>{description}</h4> {/* Render the description here */}
      </div>

      <div className='SidebarStats'>
        <div className='SidebarStat'>
          <p>Who viewed your profile?</p>
          <p className='SidebarStatNumber'>83</p>
        </div>
        <div className='SidebarStat'>
          <p>Impressions on Posts</p>
          <p className='SidebarStatNumber'>994</p>
        </div>
      </div>

      <div className='SidebarBottom'>
        <p>Recent</p>
        {recentItem('React')}
        {recentItem('NodeJS')}
        {recentItem('MongoDB')}
        {recentItem('Python')}
        {recentItem('Java')}
        {recentItem('Web Development')}
      </div>
    </div>
  );
}

export default Sidebar;
