import React, { useState } from 'react';
import './Login.css';
import LinkedinLargeLogo from './linkedin-large.svg';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './Firebase';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
import { addDoc, serverTimestamp } from 'firebase/firestore';
// import { addDescription } from './features/descriptionSlice';
import { DescriptionCollection } from './Firebase';
// import { Description } from '@mui/icons-material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilepic] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const register = () => {
    if (!name) {
      return alert('Please enter a full name');
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Update user profile
        await updateProfile(user, {
          displayName: name,
          photoURL: profilePic,
        });

        // Profile update successful
        console.log('User profile updated successfully');
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: name,
            photoURL: profilePic,
          })
        );
        // dispatch(addDescription({
        //   uid:user.uid,
        //   description: description
        // }))
      const docRef = await addDoc(DescriptionCollection, {
        userID: user.uid,
        userDescription: description,
        timestamp: serverTimestamp(),

      });

      console.log("Description written with ",docRef.id)
        
        console.log(user);
      })
      .catch((error) => {
        // Handle any errors
        return alert('Error updating user profile:', error);
      });
  };

  const loginToApp = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
        
        
      })
      .catch((error) => {
        return alert(error);
      });
  };

  return (
    <div className='Login'>
      <img src={LinkedinLargeLogo} alt='Linkedin Large Logo' />
      <form>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Full name (required if registering)' />
        <input type='text' value={profilePic} onChange={(e) => setProfilepic(e.target.value)} placeholder='Profile Pic URL' />
        <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description (if signing up)' />

        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <button type='submit' onClick={loginToApp}>
          Sign In
        </button>
      </form>
      <p>
        Not a member? <span className='LoginRegister' onClick={register}>Register Now</span>
      </p>
    </div>
  );
}

export default Login;
