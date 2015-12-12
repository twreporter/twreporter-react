import React, { Component, PropTypes } from 'react';
import FeaturesItem from './FeaturesItem';
import _ from 'lodash';
import { imageComposer } from '../lib/image-composer';

if (process.env.BROWSER) {
    require("./Features.css");
}

export default class Features extends Component {
    mixins: [Carousel.ControllerMixin]
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { features, device } = this.props
        if (Array.isArray(features)) {
            return (
                <div className="features-list clearfix">
                    <div className="features">更多深度報導</div>
                    <ul className="listing">
                        { _.map(features, (a) => {
                            let articleImage = imageComposer(a, device);
                            if (articleImage) {
                                return (
                                    <FeaturesItem article={a} image={articleImage} key={a.id}/>
                                );
                            }})
                        }
                    </ul>
                 </div>
             )
        } else {
            return ( <div> </div>)
        }
    }
}

export { Features };

