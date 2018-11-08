/* import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; */
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

import 'whatwg-fetch';
import './index.css';

import React from 'react';
import { render } from 'react-dom';

import App from './App';

const renderApp = () => {
  render(<App />, document.getElementById('root'));
};

const tryToRenderApp = () => {
  const loadedStates = ['complete', 'loaded', 'interactive'];

  if (loadedStates.includes(document.readyState) && document.body) {
    renderApp();
  } else {
    window.addEventListener('DOMContentLoaded', renderApp, false);
  }
};

tryToRenderApp();
