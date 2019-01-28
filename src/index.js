import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import 'tachyons';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { requestRobots, searchRobots } from './UserSearchPageExtras/reducers'


const logger = createLogger()

const rootReducers = combineReducers({requestRobots, searchRobots})

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger))

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
