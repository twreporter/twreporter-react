import React, { Component, PropTypes } from 'react'
import Carousel from 'nuka-carousel'
import _ from 'lodash';

export default class TopNews extends Component {
    mixins: [Carousel.ControllerMixin]
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { topnews } = this.props
        if (topnews.length > 0 || !topnews) {
            return (
                <Carousel>
                    { _.map(topnews, (a) => {
                        return (
                            <a key={a.id} href={a.url}>
                                 <img src={a.preview_image}/>
                            </a>
                        );
                        })
                    }
                </Carousel>
            )
        } else {
            return ( <div></div> )
        } 
    }
}

export { TopNews };

