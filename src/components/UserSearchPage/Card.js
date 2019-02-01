import React from 'react';

const Card = ({ name, email, id, mbti }) => {
  return (
    <div className='tc grow calming-text-field br3 pa3 ma2 dib bw2 shadow-5'>
      <img alt='robots' src={`https://avatars2.githubusercontent.com/u/42805189?v=4$`} />
      <div>
        <h2>{name}</h2>
        <p>{mbti}</p>
      </div>
    </div>
  );
}

export default Card;
