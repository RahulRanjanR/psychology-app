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
        <h1 className='f1'>Know Thyself & Others </h1>
      </div>
    );
  }
};

export default Header;
