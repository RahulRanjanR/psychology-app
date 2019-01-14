import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import QuizPage2 from '../../containers/QuizPage2';


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
        Your Temperament Style is :  <strong>{props.quizResult}</strong>


      </div>

    </CSSTransitionGroup>
  );
}

Result2.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default Result2;
