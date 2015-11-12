import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux'
import { loadArticles } from '../actions/articles'
import _ from 'lodash'

export default class Category extends Component {
    static fetchData({ store }) {
        return store.dispatch(loadArticles(this.tags));
    }
    constructor(props) {
        super(props)
        this.tags = this.props.params.category
    }

    componentDidMount() {
        this.props.loadArticles(this.tags);
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
      return { 
          articles: state.articles 
      };
}

export { Category };
export default connect(mapStateToProps, { loadArticles })(Category);
