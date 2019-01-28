import React, { Component } from 'react';
// ***************** Quiz Features*****************
import quizQuestions from '../api/quizQuestions';
import InfoPage from '../components/Quiz/InfoPage/InfoPage';
import QuizPage from './QuizPage';
// *****************smart-brain features*****************
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Navigation from '../components/Navigation/Navigation';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../UserSearchPageExtras/actions';
import MainPage from '../components/UserSearchPage/MainPage';
import './App.css';

// auth
import Profile from '../components/Profile/Profile';
import Modal from '../components/Modal/Modal';


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

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  counter: 0,
  user: {
    id: '',
    name: '',
    email: '',
    mbti: '',
    entries: 0,
    joined: '',
    age: 0,
    pet: ''
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.id) {
            fetch(`http://localhost:3000/profile/${data.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            })
            .then(response => response.json())
            .then(user => {
              if (user && user.email) {
                this.loadUser(user)
                this.onRouteChange('home');
              }
            })
          }
        })
        .catch(console.log)
    }
  }


loadUser = (data) => {
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    mbti: data.mbti,
    entries: data.entries,
    joined: data.joined
  }})
}
  calculateFaceLocations = (data) => {
    return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width ,
        topRow: clarifaiFace.top_row * height  ,
        rightCol: width - (clarifaiFace.right_col * width ),
        bottomRow: height - (clarifaiFace.bottom_row * height )
      }
    });
  }


  displayFaceBoxes = (boxes) => {
    this.setState({boxes: boxes})
  }


  onInputChange = (event) => {
      this.setState({input: event.target.value});
  }
// update the entry number of the user each time an image is submitted
onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('token')
        },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      return this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  toggleModal = () => {
    this.setState(state => ({
      ...state,
      isProfileOpen: !state.isProfileOpen,
    }));
  }

  render() {
    const  { isSignedIn, imageUrl, route, boxes, isProfileOpen, user  } = this.state;
      return (
        <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal}/>
                {
                  isProfileOpen &&
                  <Modal>
                    <Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} user={user} loadUser={this.loadUser} />
                  </Modal>
                }
                {route === 'home'
            ? <div>
                <MainPage { ...this.props } />
              </div>
                  : (
                    route === 'signin'
                    ?
                    <Signin loadUser={this.loadUser}  onRouteChange={this.onRouteChange} />
                    :  (
                      route === 'signout'
                      ?
                      <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
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
                               <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                                 : (
                                   <div>
                                   <Rank name={this.state.user.name} entries={this.state.user.entries} />
                                   <ImageLinkForm
                                    onInputChange={this.onInputChange}
                                    onPictureSubmit={this.onPictureSubmit}
                                    question= {quizQuestions[0].question}
                                    />
                                   <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
                                   </div>
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
