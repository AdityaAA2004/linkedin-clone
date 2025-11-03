import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import Login from './Login';
import { auth } from './Firebase';
import Widgets from './Widgets';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  console.log(user);

useEffect(() => {
  auth.onAuthStateChanged(userAuth => {
    if(userAuth){
      //User is logged in.
      dispatch(login({
        email: userAuth.email,
        uid: userAuth.uid,
        displayName: userAuth.displayName,
        photoURL: userAuth.photoURL,
      }))
    }

    // if the user is logged in, push the user details into the userSlice for storage using Redux. 
    else{
      //User is logged out.
      dispatch(logout())
    }
  })
},[dispatch]) // the dispatch will activate only when the authentication state changes. 

  return (
    <div className="App">
      <Header />
      {user ? (
        <div className='AppBody'>
          <Sidebar />
          <Feed />
          <Widgets/>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
