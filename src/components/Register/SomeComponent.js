import React, { Component } from 'react';
import './Register.css';

class SomeComponent extends Component {
constructor(props) {
  super(props);
  this.handleClick = this.handleClick.bind(this);
}
handleClick(event) {
  event.preventDefault();
  const mouseClick = event.nativeEvent.which;
  if (mouseClick === 1) {
    // Left mouse click - open in modal ...
    window.open('https://csjoseph.life/category/seasons/season-three/page/6/');

  } else if (mouseClick === 3) {
    // Right mouse click - open in new tab ...
    window.open('https://csjoseph.life/category/seasons/season-three/page/6/');
  }
}


render() {
  return (
    <div  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
 >
      <a  href="https://csjoseph.life/category/seasons/season-three/page/6" onClick={this.handleClick} onContextMenu={this.handleClick}>
      Who is the .... type?
      </a>
    </div>
  );
}
};
export default SomeComponent;
