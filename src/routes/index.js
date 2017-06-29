import { IndexRoute, Route, Router, browserHistory } from 'react-router'

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
import { SignUpForm, SignInForm, ActivePage, AuthenticationScreen, Features, SignOut } from 'twreporter-registration'


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
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="category/:category" component={Category} />
        <Route path="topic/:topicId" component={Topic} />
        <Route path="tag/:tagId" component={Tag} />
        <Route path="photography" component={Photography} />
        <Route path="search" component={Search} />
        <Route path="a/:slug" component={Article} />
        <Route path="author/:authorId" component={Author} />
        <Route path="authors" component={AuthorsList} />
        <Route path="signup" component={SignUpForm} />
        <Route path="signin" component={SignInForm}
                             title={'Sign In to TWReporter'}
                             browserHistory={browserHistory}
                             signInRedirectPath = {'/features'}
                             location={'http://testtest.twreporter.org:3000/features'}
                             domain={'twreporter.org'}
                             account={true}
                             google={true}
                             facebook={true}
                             defaultStyle={true}/>
        <Route path="activate" component={ActivePage} />
        <Route path="features" component={AuthenticationScreen(Features)} redirectPath={'/signin'} />
        <Route path="signout" component={SignOut} />
      </Route>
    </Router>
  )
}
