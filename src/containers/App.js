import React, { Component } from 'react';
// *****************smart-brain features*****************
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
// *****************smart-brain features*****************
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';
import MainPage from '../components/MainPage';
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
    }
  }

  onInputChange = (event) => {
      this.setState({input: event.target.value});
  }
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        // do something with response
      },
      function(err) {
        // there was an error
      }
    );
  }

  render() {
    return (
      <div className="App">

        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
         onInputChange={this.onInputChange}
         onButtonSumbit={this.onButtonSubmit}
         />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

//******************************************************************//

// goes in the render() for route page
    // return <MainPage { ...this.props } />

//******************************************************************//







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
