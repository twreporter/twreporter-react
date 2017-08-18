import { Route, Router, browserHistory } from 'react-router'

import App from '../containers/App'
import Article from '../containers/Article'
import Author from '../containers/Author'
import AuthorsList from '../containers/AuthorsList'
import Category from '../containers/Category'
import Home from '../containers/Home'
import Photography from '../containers/Photography'
import React from 'react'
import ReactGA from 'react-ga'
import Search from '../containers/Search'
import Tag from '../containers/Tag'
import Topic from '../containers/Topic'
import TopicLandingPage from '../containers/TopicLandingPage'
import Topics from '../containers/Topics'

if (typeof window !== 'undefined') {
  // add Google Analytics
  ReactGA.initialize('UA-69336956-1')
  ReactGA.set({ page: window.location.pathname })
}


function scrollAndFireTracking() {
  if(window) {
    window.scrollTo(0, 0)
    // send Google Analytics Pageview event on router changed
    ReactGA.pageview(window.location.pathname)
  }
}

export default function (history = browserHistory) {
  return (
    <Router history={history} onUpdate={scrollAndFireTracking} >
      <Route path="/topics/:slug" component={TopicLandingPage} />
      <Route path="/" component={Home} />
      <Route path="/" component={App}>
        <Route path="topics" component={Topics} />
        <Route path="category/:category" component={Category} />
        <Route path="categories/:category" component={Category} />
        <Route path="topic/:topicId" component={Topic} />
        <Route path="tag/:tagId" component={Tag} />
        <Route path="photography" component={Photography} />
        <Route path="search" component={Search} />
        <Route path="a/:slug" component={Article} />
        <Route path="author/:authorId" component={Author} />
        <Route path="authors" component={AuthorsList} />
      </Route>
    </Router>
  )
}
