import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from '../store/configureStore';

import Home from '../containers/Home';
import Category from '../containers/Category';
import NotFound from '../containers/NotFound';

export default function(history) {
    return (
        <Router history={history}>
            <Route path="/" component={Home}/>
            <Route path="/category/:category" component={Category}/>
            <Route path="*" component={NotFound} status={404} />
        </Router>
    );
};
