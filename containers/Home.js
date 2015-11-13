import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux'
import { loadArticles } from '../actions/articles'
import _ from 'lodash'
import Header from '../components/Header'
import Features from '../components/Features'
import TopNews from '../components/TopNews'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default class Home extends Component {
    static fetchData({ store }) {
        return store.dispatch(loadArticles("review"));
    }
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.loadArticles("review");
    }

    render() {
        const {articles} = this.props
        return (
            <div>
                <Header/>
                <NavBar/>
                <TopNews articles={articles}/>
                <Features articles={articles}/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps (state) {
      return { articles: state.articles };
}

export { Home };
export default connect(mapStateToProps, { loadArticles })(Home);
