import React from 'react';
import './FaceRecognition.css'
import psychology from '../Logo/psychology.png';
import hmm from './hmm.png'

const FaceRecognition = ({imageUrl, boxes}) => {
  return  (
    <div className='center ma'>
    <div className='absolute mt2'>
      <img id='inputImage' alt='' src={imageUrl} width='600px' height= 'auto'/>
    {boxes.map(box => {
    return  <img alt='' src={hmm}  key ={box.topRow}className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}/>
    })
    }

      </div>
    </div>
  );
}

export default FaceRecognition;
