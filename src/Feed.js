import { CalendarViewDay, Create, EventNote, Image, Subscriptions } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import './Feed.css';
import InputOption from './InputOption';
import Post from './Post';
import { DescriptionCollection, PostsCollection } from './Firebase';
import {  getDocs,addDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move';
// import { selectDescription } from './features/descriptionSlice';

function Feed() {
  const user = useSelector(selectUser);
  // const descriptionArray = useSelector(selectDescription);
  // const descriptionText = descriptionArray.filter((item) => item.uid === user.uid)[0]?.description
  
  console.log(user);
  const [input,setInput] = useState('');
  const [posts, setPosts] = useState([]);
  const [description,setDescription] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(PostsCollection);
      const descriptionSnapshot = await getDocs(DescriptionCollection);
      const userDocs = descriptionSnapshot.docs.filter(doc => doc.data().userID === user.uid);
      setDescription(userDocs[0].data().userDescription)
      setPosts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    };
  
    fetchData();
  }, [user.uid]);
    //this entire code above with useEffect hook, it is a real-time listener. 
    // As the post gets updated in firebase, it get updated in the 'posts' state variable. 
//this arrow function inside the useEffect hook performs only when the feed is loading for the first time.
//The second empty array is the dependency parameter which is optional and if passed empty, means the function parameter performs only once. 
const sendPost = async (e) => {
    e.preventDefault();
  
    try {
        const docRef = await addDoc(PostsCollection, {
            name: user.displayName,
            description: description,
            message: input,
            photoUrl: user?.photoURL,
            timestamp: serverTimestamp(),
          });
        const newPost = {
            id: docRef.id,
            data: {
              name: user.displayName,
              description: description,
              message: input,
              photoUrl: user?.photoURL,
            },
          };
      
          setPosts((prevPosts) => [newPost, ...prevPosts]); // Update posts state
          setInput(''); // Clear input field
          console.log('Document written with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

    //the 'e' is a parameter and it is short for an event. In this case, the click
  return (
    <div className='Feed'>
        <div className='FeedInputContainer'>
            <div className='FeedInput'>
                <Create/>
                <form>
                    <input type="text" value={input} onChange={e => setInput(e.target.value)}></input>
                    <button  type="submit" onClick={sendPost}>Send</button>
                </form>
            </div>
            <div className='FeedInputOptions'>
                <InputOption Icon={Image} title="Photo" color="#70B5F9" />
                <InputOption Icon={Subscriptions} title="Video" color="#E7A33E" />
                <InputOption Icon={EventNote} title="Event" color="#C0CBCD" />
                <InputOption Icon={CalendarViewDay} title="Write article" color="#7FC15E" />
                 
            </div>
        </div>
        <FlipMove>
        {posts.map( ({id, data:{name, description,message,photoUrl,userDescription}}) => (
        <Post 
        key={id}
        name={name}
        description={description}
        message={message}
        photoUrl={photoUrl}
        userDescription={userDescription}/>) )}
        </FlipMove>
        {/* This above notation has a arrow function as an argument to the in-built map function of the 
        'posts' state variable. The brackets that encloses the 'Post' tag basically returns the Post view */}
    </div>
  )
  //The input option shown above will help in putting options at the end of the top post or 
  //at the end of posts in the feed.
}


export default Feed