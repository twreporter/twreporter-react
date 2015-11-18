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
        <ul>
            { _.map(articles, (a) => {
                    var re = /^[\w\d]/
                    let img_existing = re.exec(a.firstImage)
                    if (img_existing != null) {
                        a.firstImage = "https://twreporter.atavist.com/data/files/organization/60826/image/derivative/scale~1185x0~" + a.firstImage
                        return (
                            <li key={a.id}>
                                <a href={a.url}>
                                    <img src={a.firstImage}/>
                                </a>
                            </li>
                        );
                    }
                })
            }
        </ul>
        )
        } else {
        return (        
            <div>
            </div>
            )
        }
    }
}

export { Features };

