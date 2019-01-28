import React, { Component } from 'react';
import Tilt from 'react-tilt'
import psychology from '../Logo/psychology.png';
import './Logo.css';
class Logo extends Component {
constructor(props) {
  super(props);
  this.handleClick = this.handleClick.bind(this);
}
handleClick(event) {
  event.preventDefault();
  const mouseClick = event.nativeEvent.which;
  if (mouseClick === 1) {
    // Left mouse click - open in modal ...
    window.open('https://csjoseph.life/');

  } else if (mouseClick === 3) {
    // Right mouse click - open in new tab ...
    window.open('https://csjoseph.life/');
  }
}


render() {
  return (
    <div  className=""
 >
      <Tilt className="Tilt br2 shadow-2 center" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
      <a  href="https://csjoseph.life/category/depth-psychology/typeyourself/" onClick={this.handleClick} onContextMenu={this.handleClick}>

        <div className="Tilt-inner tc pa3 ">

        <img style={{paddingTop: '5px'}}alt='psychology logo'src={psychology}
        />
         </div>
         </a>

      </Tilt>
    </div>
  );
}
};
export default Logo;
