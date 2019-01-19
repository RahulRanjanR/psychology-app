import React, {Component} from 'react';
//**************************************
class Header extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false
  }
  render() {
    console.log('header')
    return (
      <div>
        <h1 className='f1'>The Psychology Community </h1>
      </div>
    );
  }
};

export default Header;
