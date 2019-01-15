import React, { Component } from 'react';
import Tilt from 'react-tilt'
import psychology from '../Logo/psychology.png';

import './Register.css';

class LinkTag extends Component {
constructor(props) {
  super(props);
  this.handleClick = this.handleClick.bind(this);
}
handleClick(event) {
  event.preventDefault();
  const mouseClick = event.nativeEvent.which;
  if (mouseClick === 1) {
    // Left mouse click - open in modal ...
    window.open('https://csjoseph.life/category/depth-psychology/typeyourself/');

  } else if (mouseClick === 3) {
    // Right mouse click - open in new tab ...
    window.open('https://csjoseph.life/category/depth-psychology/typeyourself/');
  }
}


render() {
  return (
    <div  className=""
 >
      <a  href="https://csjoseph.life/category/depth-psychology/typeyourself/" onClick={this.handleClick} onContextMenu={this.handleClick}>
      <Tilt className="Tilt br2 shadow-2 center" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner tc pa3 ">

        <img style={{paddingTop: '5px'}}alt='psychology logo'src={psychology}
        />
         </div>
      </Tilt>
      </a>
    </div>
  );
}
};
export default LinkTag;
