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
                        a.firstImage = "https://dh1rvgpokacch.cloudfront.net/atavist/60826/image/derivative/scale~2800x0x0x0~" + a.firstImage
                        return (
                            <a key={a.id} href={a.url}>
                                <img src={a.firstImage}/>
                            </a>
                        );
                    }
                })
            }
        </Carousel>
        )
        } else {
        return (        
            <Carousel>
            <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1"/>
            <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2"/>
            <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3"/>
            <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4"/>
            <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5"/>
            <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6"/>
                
            </Carousel>
            )
        }
    }
}

export { Features };

