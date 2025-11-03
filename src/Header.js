import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import LinkedInLogo from './linkedin-logo-png-2026.png';
import HeaderOption from './HeaderOption';
import { BusinessCenter, Chat, Home, Notifications, SupervisorAccount } from '@mui/icons-material';

import { useDispatch } from 'react-redux';
import { logout } from './features/userSlice';
import { auth } from './Firebase';

function Header() {

  const dispatch = useDispatch()
  const logoutOfApp = () =>{
    dispatch(logout());
    auth.signOut();
  }

  //Logging out on clicking the 'Me' button. 
  return (
    <div className='Header'>
      <div className='Header-Left'>
        <img src={LinkedInLogo} alt='Logo' />
        <div className='Header-Left-Search'>
          <SearchIcon />
          <input type='text' placeholder='Search'></input>
        </div>
      </div>
      <div className='Header-Right'>
        <HeaderOption Icon={Home} title='Home' />
        <HeaderOption Icon={SupervisorAccount} title='My Network' />
        <HeaderOption Icon={BusinessCenter} title='Jobs' />
        <HeaderOption Icon={Chat} title='Messaging' />
        <HeaderOption Icon={Notifications} title='Notification' />
        <HeaderOption avatar={true} title='Me' onClick={logoutOfApp}/> {/* Pass the imported image */}
      {/*In the last HeaderOption, we can see that the avatar prop is now a boolean value.
      This is because, everytime the HeaderOption component is rendered, Avatar in-built component will also render,
      as it is inside the div where the icons are placed. So, the avatar dependency check is required. 
      Now, when the user just logs in, the avatar cannot be displayed as we cannot pass the photoURL.
      Hence, the only way is to make a boolean on whether the Avatar in-built component should be shown or not. */}
      </div>
    </div>
  );
}

export default Header;
