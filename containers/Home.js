import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux'
import { loadArticles } from '../actions/articles'
import _ from 'lodash'

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
        return (
            <div>
            {
                _.map(this.props.articles, (a)=> {
                    return (
                        <p key={a.id}> { a.title }</p>
                        );
                })
            }
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps (state) {
      return { articles: state.articles };
}

export { Home };
export default connect(mapStateToProps, { loadArticles })(Home);
