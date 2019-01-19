import React from 'react';
const Navigation = ({route, onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signout')} className= 'f3 link dim black underline pa3 pointer'> Sign Out </p>
          <p onClick={() => onRouteChange('face')} className= 'f3 link dim black underline pa3 pointer'> Face Recognition </p>
        </nav>
      );

    } if  (onRouteChange === 'home'){

      return (<p onClick={() => onRouteChange('home')} className= 'f3 link dim black underline pa3 pointer'> Main Page </p>
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
