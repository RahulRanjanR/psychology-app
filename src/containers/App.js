import React, { Component } from 'react';
// ***************** Quiz Features*****************
import '../components/Logo/Logo.css';
import quizQuestions from '../api/quizQuestions';
import InfoPage from '../components/Quiz/InfoPage/InfoPage';
import QuizPage from './QuizPage';
// *****************smart-brain features*****************
import Clarifai from 'clarifai';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Navigation from '../components/Navigation/Navigation';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
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


// making state for dynamic inputs
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

    }
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
                        <div>
                        <QuizPage onRouteChange={this.onRouteChange}  />
                        </div>
                           : (
                             route === 'info'
                             ?
                             <InfoPage onRouteChange={this.onRouteChange}  />
                             :  (
                               route === 'register'
                               ?
                               <Register onRouteChange={this.onRouteChange} />
                                 : (
                                   <div>
                                   <Rank />
                                   <ImageLinkForm
                                    onInputChange={this.onInputChange}
                                    onButtonSumbit={this.onButtonSubmit}
                                    question= {quizQuestions[0].question}
                                    />
                                   <FaceRecognition box={box} imageUrl={imageUrl} />
                                   </div>                              )
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
