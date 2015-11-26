import React, { Component, PropTypes } from 'react'
import Carousel from 'nuka-carousel'
import _ from 'lodash';
if (process.env.BROWSER) {
    require("./TopNews.css");
}

export default class TopNews extends Component {
    mixins: [Carousel.ControllerMixin]
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { topnews } = this.props
        if (topnews && topnews.length > 0) {
            return (
                <Carousel>
                    { _.map(topnews, (a) => {
                        return (
                            <a key={a.id} href={a.url}>
                                <img className="carousel-image" src={a.preview_image}/>
                                <div className="carousel-item">
                                    <div className="carousel-itemtitle">{a.title}</div>
                                    <div className="carousel-excerpt">{a.excerpt}</div>
                                </div>
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

