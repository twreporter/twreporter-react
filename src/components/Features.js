import React, { Component, PropTypes } from 'react'
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
        if (Array.isArray(features)) {
            return (
                <div className="features-list clearfix">
                    <div className="features">FEATURES</div>
                    <ul className="listing">
                        { _.map(features, (a) => {
                            let articleImage;
                            if (a.firstImage && (a.firstImage.indexOf('.png') > -1 || a.firstImage.indexOf('.jpg') > -1)) {
                               articleImage = a.firstImage;
                            } else if (a.previewImage) {
                                articleImage = a.previewImage;
                            }
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

