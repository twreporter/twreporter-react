import React, { Component, PropTypes } from 'react'
import Carousel from 'nuka-carousel'
import _ from 'lodash';

export default class Features extends Component {
    mixins: [Carousel.ControllerMixin]
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { articles } = this.props
        if (articles.length > 0 || !articles) {
        return (
        <Carousel>
            { _.map(articles, (a) => {
                        return (
                            <a key={a.id} href={a.url}>
                                <img src={a.preview_image}/>
                            </a>
                        );
                })
            }
        </Carousel>
        )
        } 
    }
}

export { Features };

