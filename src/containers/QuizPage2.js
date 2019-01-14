import React, { Component } from 'react';
// ***************** Quiz Features*****************

import quizQuestions from '../api/quizQuestions';
import Quiz from '../components/Quiz/Quiz';
import Result2 from '../components/Quiz/Result2';

// *****************smart-brain features*****************
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';

const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 5
      }}
  />
);

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}



class QuizPage2 extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      counter: 0,
  questionId: 1,
  question: '',
  answerOptions: [],
  answer: '',
  answersCount: {
    Direct_Initiating_Control: 0,
    Informative_Initiating_Movement: 0,
    Direct_Responding_Movement: 0,
    Informative_Responding_Control: 0
  },
  result: ''
    }

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    const shuffledAnswerOptions = quizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

      // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }

      handleAnswerSelected(event) {
  this.setUserAnswer(event.currentTarget.value);

  if (this.state.questionId < quizQuestions.length) {
    setTimeout(() => this.setNextQuestion(), 300);
  } else {
    setTimeout(() => this.setResults(this.getResults()), 300);
  }
}

setUserAnswer(answer) {
  this.setState((state, props) => ({
    answersCount: {
      ...state.answersCount,
      [answer]: state.answersCount[answer] + 1
    },
    answer: answer
  }));
}

setNextQuestion() {
  const counter = this.state.counter + 1;
  const questionId = this.state.questionId + 1;

  this.setState({
    counter: counter,
    questionId: questionId,
    question: quizQuestions[counter].question,
    answerOptions: quizQuestions[counter].answers,
    answer: ''
  });
}

getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);
    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    console.log(result);
    console.log(result[0]);
    if (result.length === 1) {
      this.setState({ result: "anyone"  });
      if(result[0].includes('Direct_Initiating_Control')) {
        this.setState({ result: "ohhh yeeee"  });
    }
  }
}

  renderQuiz() {
  return (
    <Quiz
      answer={this.state.answer}
      answerOptions={this.state.answerOptions}
      questionId={this.state.questionId}
      question={this.state.question}
      questionTotal={quizQuestions.length}
      onAnswerSelected={this.handleAnswerSelected}
    />
  );
}

renderResult() {
  return <Result2 quizResult={this.state.result} />;
}



  render() {
      return (
<div>
           {this.state.result ? this.renderResult() : this.renderQuiz()}
           </div>
        );
      }
    }

export default connect(mapStateToProps, mapDispatchToProps)(QuizPage2)
