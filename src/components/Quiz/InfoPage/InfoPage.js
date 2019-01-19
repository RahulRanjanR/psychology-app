import React from 'react';
import  Logo from '../../Logo/Logo';




const InfoPage = ({onRouteChange}) => {
  return  (
    <div>
<Logo />

      <h1>
<div className=' w-30 bg-light-purple center'>
How to use?
</div>
    <div>
     1. Choose the Interaction Style
      </div>
        <div>
        2. Choose the Temperament Style
        </div>
        <div>
        3. Register
        </div>

  </h1>
  <div className="">
  <input
  onClick={() => onRouteChange('quiz')}
  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
  type="submit"
  value="Take The Quiz"/>

    </div>
    </div>
  );
}


export default InfoPage;
