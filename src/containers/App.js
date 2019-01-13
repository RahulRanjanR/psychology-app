
/* 01/10/2019 Objectives
------------------------------------------------------
(*) Change the routing for Register to after the QuizPage
(*)  Combine QuizPage and Register into one Page
------------------------------------------------------
^ 01/11/2019 Objectives
------------------------------------------------------
(*) Organize Folders
(*) Turn the QuizPage into a functional quiz format
() Integrate the questions to result in the correct types
------------------------------------------------------
^ 01/12/2019 Objectives
------------------------------------------------------
() Input the data into the user server/database as the user.type
()
------------------------------------------------------
*/

import React, { Component } from 'react';
// ***************** Quiz Features*****************
import '../components/Logo/Logo.css';
import quizQuestions from '../api/quizQuestions';
import Quiz from '../components/Quiz/Quiz';
import QuizPage from './QuizPage';
import Result from '../components/Quiz/Result';
// *****************smart-brain features*****************
import Clarifai from 'clarifai';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Navigation from '../components/Navigation/Navigation';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
// *****************smart-brain features*****************
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';
import MainPage from '../components/UserSearchPage/MainPage';
import './App.css';

const app = new Clarifai.App({
 apiKey: '9a8ca46ac9bf443a9d35f6de69d313f0'
});


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



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      counter: 0,
  questionId: 1,
  question: '',
  answerOptions: [],
  answer: '',
  answersCount: {
    Nintendo: 0,
    Microsoft: 0,
    Sony: 0
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
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
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

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
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
    const  { isSignedIn, imageUrl, route, box } = this.state;
      return (
        <div className="App">
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          {route === 'home'
            ? <div>

           <MainPage { ...this.props } />
           </div>
                  : (
                    route === 'signin'
                    ?
                    <Signin onRouteChange={this.onRouteChange} />
                    :  (
                      route === 'signout'
                      ?
                      <Signin onRouteChange={this.onRouteChange} />
                      : (
                        route === 'quiz'
                        ?
                        <QuizPage onRouteChange={this.onRouteChange}  />
                           : (
                             route === 'register'
                             ?
                             <Register onRouteChange={this.onRouteChange} />
                             :  (
                               route === 'mystery'
                               ?
                                 <div>
                                 <Rank />
                                 <ImageLinkForm
                                  onInputChange={this.onInputChange}
                                  onButtonSumbit={this.onButtonSubmit}
                                  question= {quizQuestions[0].question}

                                  />
                                 <FaceRecognition box={box} imageUrl={imageUrl} />
                                 </div>
                                 : (
                                 <h1>You seem lost...</h1>
                              )
                            )
                    )
                  )
                )
              )
            }
          </div>
        );
      }
    }

export default connect(mapStateToProps, mapDispatchToProps)(App)

//******************************************************************//

// goes in the render() for route page
    // return <MainPage { ...this.props } />

//******************************************************************//



/*

<div>
      <Logo />
      <Rank />
      <ImageLinkForm
       onInputChange={this.onInputChange}
       onButtonSumbit={this.onButtonSubmit}
       />
      <FaceRecognition box={box} imageUrl={imageUrl} />
      </div>

      */


    // const particlesOptions = {
    //     particles: {
    //       number: {
    //         value: 90,
    //         density: {
    //           emable: true,
    //           value_area: 800
    //         }
    //       }
    //     }
    //   }


    // insert this into the return if wanted
    // <Particles className='particles'
    //     params={particlesOptions}
    //   />
