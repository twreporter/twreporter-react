import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux'
import { loadArticles } from '../actions/articles'
import _ from 'lodash'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import Features from '../components/Features'
import TopNews from '../components/TopNews'
import Daily from '../components/Daily'
import Footer from '../components/Footer'
import SystemError from '../components/SystemError'

export default class Home extends Component {
    static fetchData({ store }) {
        return store.dispatch(loadArticles());
    }
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.loadArticles();
    }

    render() {
        const {articles} = this.props
        if (articles.length > 0) {
        return (
            <div>
                <Header/>
                <NavBar/>
                <TopNews articles={articles}/>
                <Daily articles={articles}/>
                <Features articles={articles}/>
                {this.props.children}
                <Footer/>
            </div>
        )
        } else {
            return ( <SystemError/> )
        }
    }
}

function mapStateToProps (state) {
      return { articles: state.articles };
}

export { Home };
export default connect(mapStateToProps, { loadArticles })(Home);
