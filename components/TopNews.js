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
                    var re = /^[\w\d]/
                    let img_existing = re.exec(a.firstImage)
                    if (img_existing != null) {
                        let slideshowImage = "https://dh1rvgpokacch.cloudfront.net/atavist/60826/image/derivative/scale~2800x0x0x0~" + a.firstImage
                        return (
                            <a key={a.id} href={a.url}>
                                <img src={slideshowImage}/>
                            </a>
                        );
                    }
                })
            }
        </Carousel>
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

