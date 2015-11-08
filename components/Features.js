import React, { Component, PropTypes } from 'react'
import { loadArticles } from '../actions/articles'
import Carousel from 'nuka-carousel'
import _ from 'lodash';


function loadData(props) {
    loadArticle('', [])
}

export default class Features extends Component {
    mixins: [Carousel.ControllerMixin]
    constructor(props) {
        super(props)
    }

    static fetchData({ store }) {
        return store.dispatch(loadArticles());
    }

    componentWillMount() {
        this.props.loadArticles()
    }

    render() {
        return (
        <Carousel>
            <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1"/>
            <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2"/>
            <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3"/>
            <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4"/>
            <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5"/>
            <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6"/>
        </Carousel>
        )
    }
}

function mapStateToProps (state) {
    return { articles: state.articles };
}

export { Features };

export default connect(mapStateToProps, { loadArticles })(Article);


Features.propTypes = { }
