import React, { Component } from 'react';
import  Logo from '../Logo/Logo';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import ErrorBoundry from './ErrorBoundry';
import Header from './Header';

import './MainPage.css';



class MainPage extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }


filterRobots = () => {
  return this.props.robots.filter(robot => {
  return robot.name.toLowerCase().includes(this.props.searchField.toLowerCase());
  })
}
  render() {
  /* robots*/  const {  onSearchChange, isPending } = this.props;

    return (
      <div className='tc'>
      <Logo />
        <Header/>
        <SearchBox searchChange={onSearchChange}/>
         <Scroll>
          { isPending ? <h1>Loading...</h1> :
            <ErrorBoundry>
              <CardList robots={this.filterRobots()} />
            </ErrorBoundry>
          }
        </Scroll>
      </div>
    );
  }
}

export default MainPage;
