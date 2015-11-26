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
        const { features } = this.props
        if (features) {
            return (
                <ul className="listing">
                    { _.map(features, (a) => {
                        var re = /^[\w\d]/
                        let img_existing = re.exec(a.firstImage)
                        if (img_existing != null) {
                            return (
                                <FeaturesItem article={a} key={a.id}/>
                            );
                        }})
                    }
                 </ul>
             )
        } else {
            return ( <div> </div>)
        }
    }
}

export { Features };

