import React from 'react'

import { connect } from 'react-redux'
import { loadMultiTaggedArticles, loadArticles } from '../actions/articles'
import Tags from '../components/Tags'
import Footer from '../components/Footer'
import DesktopNavBar from '../components/DesktopNavBar'
import MobileNavBar from '../components/MobileNavBar'
import SystemError from '../components/SystemError'
import TopNews from '../components/TopNews'
import { Home } from './Home'
if (process.env.BROWSER) {
  require('./Home.css')
}

export default class Photography extends Home {
  static fetchData({ store }) {
    let params = [ 'photo-reviews', 'photo-features' ]
    return store.dispatch(loadMultiTaggedArticles(params))
  }
  constructor(props, context) {
    super(props, context)
    this.loadMoreArticles = this.loadMoreArticles.bind(this, 'photo-reviews')
    this.params = [ 'photo-reviews', 'photo-features' ]
  }

  render() {
    const { articles } = this.props
    const { device } = this.context
    let topnewsItems = articles['photo-features'] && articles['photo-features'].items || []
    let review = articles['photo-reviews'] || {
      hasMore: true
    }
    let reviewItems = review.items || []
    const style = {
      backgroundColor: '#2C323E',
      color: '#FFFFEB'
    }
    const NavBar = device === 'desktop' ? DesktopNavBar : MobileNavBar
    if (topnewsItems || reviewItems) {
      return (
        <div style={style}>
          <NavBar bgStyle="dark"/>
          <TopNews topnews={topnewsItems} />
          <Tags
            articles={reviewItems || []}
            bgStyle="dark"
            hasMore={review.hasMore}
            loadMore={this.loadMoreArticles}
          />
          {this.props.children}
          <Footer/>
        </div>
      )
    } else {
      return ( <SystemError/> )
    }
  }
}

function mapStateToProps(state) {
  return { articles: state.articles }
}

Photography.contextTypes = {
  device: React.PropTypes.string
}

export { Photography }
export default connect(mapStateToProps, { loadMultiTaggedArticles, loadArticles })(Photography)
