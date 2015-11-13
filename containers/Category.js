import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux'
import { loadArticles } from '../actions/articles'
import _ from 'lodash'
import NotFound from './NotFound'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default class Category extends Component {
    static fetchData({ store }) {
        return store.dispatch(loadArticles(this.tags));
    }
    constructor(props) {
        super(props)
        this.tags = this.props.params.category
        this.props.loadArticles(this.tags);
    }

    render() {
        var { router } = this.context;
        if (this.props.articles.length > 0) {
            return (
                <div>
                    <Header/>
                    <NavBar/>
                    {
                        _.map(this.props.articles, (a)=> {
                            return (
                                <p key={a.id}> { a.title }</p>
                        )})
                    }
                    {this.props.children}
                    <Footer/>
                </div>
            )
        } else {
            console.log("not found");
            return (
                    <div><NotFound/></div>
            )
        }
    }
}

function mapStateToProps (state) {
      return { 
          articles: state.articles 
      };
}

export { Category };
export default connect(mapStateToProps, { loadArticles })(Category);
