"use strict"

import React from 'react'
import Router, {Route} from 'react-router'
import App from './App/App.jsx'
import Category from './Category/Category.jsx'
import HTML from './HTML/HTML.jsx'


import './index.css'

const routes = (
    <Route handler={App} path="/">
    <Route name="about" path="/about" handler={HTML} />
    <Route name="category" path="/category/:category" handler={Category} />
    </Route>
);

if(typeof document !== 'undefined') {
    const root = document.getElementById('root');
    Router.run(routes, Router.HashLocation, (Root) => {
        React.render(<Root/>, root);
    });
}
