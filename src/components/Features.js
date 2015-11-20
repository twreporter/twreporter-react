import React, { Component, PropTypes } from 'react'
import Carousel from 'nuka-carousel'
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
                                a.firstImage = "https://twreporter.atavist.com/data/files/organization/60826/image/derivative/scale~1185x0~" + a.firstImage
                                var style = { 
                                    backgroundImage: 'url(' + a.firstImage + ')' }
                            return (
                                <li className="listing-item" style={style} key={a.id}>
                                <a href={a.url}>
                                <div className="listing-projectborder">
                                  <div className="listing-project">
                                    <div className="listing-projectpublished">{a.lastPublish}</div>
                                    <div className="listing-title">{a.title}</div>
                                    <div className="listing-excerpt">{a.excerpt}</div>
                                  </div>
                                </div>
                                </a>
                                </li>
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

