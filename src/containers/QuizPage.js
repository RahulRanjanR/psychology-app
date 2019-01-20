import React, { Component } from 'react';
// ***************** Quiz Features*****************
import '../components/Logo/Logo.css';
import quizQuestions from '../api/quizQuestions';
import Quiz from '../components/Quiz/Quiz';
import Result from '../components/Quiz/Result';
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



class QuizPage extends Component {
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
    Structure: 0,
    Starter: 0,
    Finisher: 0,
    Background: 0,
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
    console.log("result " + result);
    console.log("result[0] " + result[0] + " : result[1] " + result[1]);
    // Guardian

    if(result[0].includes('Structure') && result[1].includes('Guardian')) {
      this.setState({ result: result[0] + " & " + result[1] + " : ESTJ "});
  }    if(result[0].includes('Structure') && result[1].includes('Artisan')) {
        this.setState({ result: result[0] + " & " + result[1] + " : ESTP "});
    }    if(result[0].includes('Structure') && result[1].includes('Intellectual')) {
          this.setState({ result: result[0] + " & " + result[1] + " : ENTJ "});
      }    if(result[0].includes('Structure') && result[1].includes('Idealist')) {
            this.setState({ result: result[0] + " & " + result[1] + " : ENFJ "});
            // Artisan

        }    if(result[0].includes('Starter') && result[1].includes('Guardian')) {
              this.setState({ result: result[0] + " & " + result[1] + " : ESFJ "});
          }    if(result[0].includes('Starter') && result[1].includes('Artisan')) {
                this.setState({ result: result[0] + " & " + result[1] + " : ESFP "});
            }    if(result[0].includes('Starter') && result[1].includes('Intellectual')) {
                  this.setState({ result: result[0] + " & " + result[1] + " : ENTP "});
              }    if(result[0].includes('Starter') && result[1].includes('Idealist')) {
                    this.setState({ result: result[0] + " & " + result[1] + " : ENFP "});
                    // Intellectual

                }    if(result[0].includes('Finisher') && result[1].includes('Guardian')) {
                      this.setState({ result: result[0] + " & " + result[1] + " : ISTJ "});
                  }    if(result[0].includes('Finisher') && result[1].includes('Artisan')) {
                        this.setState({ result: result[0] + " & " + result[1] + " : ISTP "});
                    }    if(result[0].includes('Finisher') && result[1].includes('Intellectual')) {
                          this.setState({ result: result[0] + " & " + result[1] + " : INTJ "});
                      }    if(result[0].includes('Finisher') && result[1].includes('Idealist')) {
                            this.setState({ result: result[0] + " & " + result[1] + " : INFJ "});
                            // Idealist

                        }    if(result[0].includes('Background') && result[1].includes('Guardian')) {
                              this.setState({ result: result[0] + " & " + result[1] + " : ISFJ "});
                          }    if(result[0].includes('Background') && result[1].includes('Artisan')) {
                                this.setState({ result: result[0] + " & " + result[1] + " : ISFP "});
                            }    if(result[0].includes('Background') && result[1].includes('Intellectual')) {
                                  this.setState({ result: result[0] + " & " + result[1] + " : INTP "});
                              }     if(result[0].includes('Background') && result[1].includes('Idealist')) {
                                    this.setState({ result: result[0] + " & " + result[1] + " : INFP "});
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
  return <Result quizResult={this.state.result} />;
}


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width ),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    }

  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }


  onInputChange = (event) => {
      this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input})
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() {
      return (
          <div>
          <ColoredLine color="black" />

          <div className="App">
          <div className="App-header ma4 mt0">

          <h2 className='f1'>Typing Yourself & Others </h2>
          </div>

           {this.state.result ? this.renderResult() : this.renderQuiz()}
           </div>
           <ColoredLine color="black" />
           </div>
        );
      }
    }

export default connect(mapStateToProps, mapDispatchToProps)(QuizPage)
