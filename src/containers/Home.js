import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux'
import { loadArticles } from '../actions/articles'
import _ from 'lodash'
import Features from '../components/Features'
import TopNews from '../components/TopNews'
import Daily from '../components/Daily'
import Footer from '../components/Footer'
import SystemError from '../components/SystemError'
if (process.env.BROWSER) {
    require("./Home.css");
}

export default class Home extends Component {
    static fetchData({ store }) {
        return store.dispatch(loadArticles());
    }
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (!this.props.articles) {
            this.props.loadArticles();
        }
    }

    render() {
        const {articles} = this.props
        if (articles.length > 0) {
        return (
            <div>
                <div className="header">
                    <ul className="menu">
                        <li className="menu-item">台灣</li>
                        <li className="menu-item">國際</li>
                        <li className="menu-item">評論</li>
                        <li className="menu-item">文化</li>
                        <li className="menu-item">影像</li>
                        <li className="menu-item">專題</li>
                        <li className="menu-item">媒體</li>
                    </ul>
                </div>
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
