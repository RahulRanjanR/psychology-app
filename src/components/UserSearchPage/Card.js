import React from 'react';

const Card = ({ id, username, name, mbti }) => {
  return (
    <div className='tc grow calming-text-field br3 pa3 ma2 dib bw2 shadow-5'>
      <img alt='robots' src={`https://robohash.org/${id}?set=set2`} />
      <div>
        <h2>{username}</h2>
        <h3>{name}</h3>
        <p> {mbti}</p>
      </div>
    </div>
  );
}

export default Card;
