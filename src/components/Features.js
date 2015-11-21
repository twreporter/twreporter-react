import React, { Component, PropTypes } from 'react'
import Carousel from 'nuka-carousel'
import FeaturesItem from './FeaturesItem'
import _ from 'lodash';
if (process.env.BROWSER) {
    require("./Features.css");
}

export default class Features extends Component {
    mixins: [Carousel.ControllerMixin]
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { articles } = this.props
            if (articles.length > 0 || !articles) {
                return (
                        <ul className="listing">
                        { _.map(articles, (a) => {
                           var re = /^[\w\d]/
                           let img_existing = re.exec(a.firstImage)
                            if (img_existing != null) {
                            return (
                                <FeaturesItem article={a} key={a.id}/>
                                );
                            }
                                                 })
                        }
                        </ul>
                       )
        } else {
            return ( <div> </div>)
        }
    }
}

export { Features };

