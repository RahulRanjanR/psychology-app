import React from 'react';
const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signout')} className= 'f3 link dim black underline pa3 pointer'> Sign Out </p>
        </nav>
      );
    } else {
      return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => onRouteChange('signin')} className= 'f3 link dim black underline pa3 pointer'> Sign In </p>
        <p onClick={() => onRouteChange('register')} className= 'f3 link dim black underline pa3 pointer'> Register </p>
      </nav>
     );
  }
}

export default Navigation;

/*
Change Register to a different route other than 'home'
                            OR
Change this page to a form quiz that then links to a page just like this one

*/
