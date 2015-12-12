import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux'
import { loadArticles } from '../actions/articles'
import _ from 'lodash'
import Daily from '../components/Daily'
import Features from '../components/Features'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SystemError from '../components/SystemError'
import TopNews from '../components/TopNews'
if (process.env.BROWSER) {
    require("./Home.css");
}

export default class Home extends Component {
    static fetchData({ store }) {
        let params = ["hp-projects", "review", "feature"]
        return store.dispatch(loadArticles(params));
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
        const {articles, device} = this.props
        const topnews_num = 5;
        let topnews = articles["feature"]
        let features = articles["hp-projects"]
        let daily = articles.review
        if (Array.isArray(topnews)) {
            if (topnews.length < topnews_num) {
                let less = topnews_num - topnews.length
                topnews = topnews.concat(features.slice(0, less))
                features = features.slice(less)
            } else {
                topnews = topnews.slice(0,topnews_num);
            }
        }
        if (topnews || features) {
            return (
                <div>
                    <NavBar/>
                    <TopNews topnews={topnews} device={device}/>
                    <Daily daily={daily} device={device} />
                    <Features features={features} device={device}/>
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
      return { articles: state.articles, device: state.device };
}

export { Home };
export default connect(mapStateToProps, { loadArticles })(Home);
