import React, { Component } from 'react';
// ***************** Quiz Features*****************

import quizQuestions2 from '../api/quizQuestions2';
import Quiz from '../components/Quiz/Quiz';
import Result2 from '../components/Quiz/Result2';

// *****************smart-brain features*****************
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';

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
    Guardian: 0,
    Artisan: 0,
    Intellectual: 0,
    Idealist: 0
  },
  result: ''
    }

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    const shuffledAnswerOptions = quizQuestions2.map(question =>
      this.shuffleArray(question.answers)
    );
    this.setState({
      question: quizQuestions2[0].question,
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

  if (this.state.questionId < quizQuestions2.length) {
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
    question: quizQuestions2[counter].question,
    answerOptions: quizQuestions2[counter].answers,
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
      if(result[0].includes('Guardian')) {
        this.setState({ result: result[0] + " : ESTJ , ESFJ , ISTJ , ISFJ "});

    } else if
        (result[0].includes('Artisan')) {
          this.setState({ result: result[0] + " : ESTP , ESFP , ISTP , ISFP "});
        }
        else if
            (result[0].includes('Intellectual')) {
              this.setState({ result: result[0] + " : ENTJ , ENTP , INTJ , INTP "});
            }
            else if
                (result[0].includes('Idealist')) {
                  this.setState({ result: result[0] + " : ENFJ , ENFP , INFJ , INFP "});
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
      questionTotal={quizQuestions2.length}
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
