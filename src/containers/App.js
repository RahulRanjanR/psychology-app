import React, { Component } from 'react';
// *****************smart-brain features*****************
import Particles from 'react-particles-js';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
// *****************smart-brain features*****************
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';
import MainPage from '../components/MainPage';
import './App.css';

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



class App extends Component {
  render() {
    return (
      <div className="App">

        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
  {/*
        <FaceRecognition />
        */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

// goes in the render() for route page
    // return <MainPage { ...this.props } />
