import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from '../containers/App'
import Article from '../containers/Article'
import Author from '../containers/Author'
import AuthorsList from '../containers/AuthorsList'
import Blank from '../containers/Blank'
import Category from '../containers/Category'
import Home from '../containers/Home'
import Photography from '../containers/Photography'
import Search from '../containers/Search'
import Tag from '../containers/Tag'
import Topic from '../containers/Topic'
import TopicLandingPage from '../containers/TopicLandingPage'

export default function (history = browserHistory) {
  return (
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
      <Route path="/topics/:slug" component={TopicLandingPage} />
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="category/:category" component={Category} />
        <Route path="topic/:topicId" component={Topic} />
        <Route path="tag/:tagId" component={Tag} />
        <Route path="photography" component={Photography} />
        <Route path="search" component={Search} />
        <Route path="check" component={Blank} />
        <Route path="a/:slug" component={Article} />
        <Route path="author/:authorId" component={Author} />
        <Route path="authors" component={AuthorsList} />

      </Route>
    </Router>
  )
}
