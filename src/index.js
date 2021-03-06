
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';

import Store from './store';

import App from './Containers/App';

ReactDOM.render(
  <Provider
    store={Store}>
      <App/>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
