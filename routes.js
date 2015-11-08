import React from 'react';                                                                                                                   
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from './store/configureStore';

import Home from './containers/Home';

export default function(history) {
    return (
       <Router history={history}>
          <Route path="/" component={Home}>
          </Route>
      </Router>
    );
};

