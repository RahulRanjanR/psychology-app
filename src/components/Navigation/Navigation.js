import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';

const Navigation = ({ onRouteChange, isSignedIn, toggleModal }) => {
    if (isSignedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signout')} className= 'f3 link dim black underline pa3 pointer'> Sign Out </p>
          <p onClick={() => onRouteChange('home')} className= 'f3 link dim black underline pa3 pointer'> Main Page </p>
          <p onClick={() => onRouteChange('face')} className= 'f3 link dim black underline pa3 pointer'> Face Recognition </p>
          <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} />

        </nav>
      );
    }
     else  {
      return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => onRouteChange('signin')} className= 'f3 link dim black underline pa3 pointer'> Sign In </p>
        <p onClick={() => onRouteChange('register')} className= 'f3 link dim black underline pa3 pointer'> Register </p>

      </nav>
     );
  }
}

export default Navigation;
