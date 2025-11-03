import React, { forwardRef } from 'react';
import './Posts.css';
import { Avatar } from '@mui/material';
import InputOption from './InputOption';
import { ChatOutlined, SendOutlined, ShareOutlined, ThumbUpAltSharp } from '@mui/icons-material';
const Post = forwardRef( ({ name, description, message, photoUrl },ref) => {
  return (
    <div ref={ref} className='Posts'>
      <div className='PostsHeader'>
        <Avatar src={photoUrl}>{name[0]}</Avatar>
        <div className='PostsInfo'>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className='PostsBody'>
        <p>{message}</p>
      </div>
      <div className='PostsButtons'>
        <InputOption Icon={ThumbUpAltSharp} title='Like' color='gray' />
        <InputOption Icon={ChatOutlined} title='Comment' color='gray' />
        <InputOption Icon={ShareOutlined} title='Share' color='gray' />
        <InputOption Icon={SendOutlined} title='Send' color='gray' />
      </div>
    </div>
  );
});

export default Post;
