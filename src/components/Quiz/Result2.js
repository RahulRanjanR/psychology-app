import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';


function Result2(props) {
  return (
    <CSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div className='f2'>
         Temperament Style is <strong><i>{props.quizResult}</i></strong>
      </div>

    </CSSTransitionGroup>
  );
}

Result2.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default Result2;
