import React, { Component, PropTypes } from 'react'
import Carousel from 'nuka-carousel'
import _ from 'lodash';

export default class Tags extends Component {
    mixins: [Carousel.ControllerMixin]
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { articles } = this.props
        if (articles.length > 0 || !articles) {
        return (
            <div>
            <h2>What's New</h2>
            <ul>
                { _.map(articles, (a) => {
                    var re = /^[\w\d]/
                    let img_existing = re.exec(a.firstImage)
                    if (img_existing != null) {
                        let thumbnail = "https://twreporter.atavist.com/data/files/organization/60826/image/derivative/scale~451x225~" + a.firstImage
                        return (
                            <li key={a.id}>
                                <a href={a.url}>
                                    <img src={thumbnail}/>
                                </a>
                                {a.title}
                                {a.excerpt}
                            </li>
                        );}
                    })
                }
            </ul>
            </div>
        )
        } else {
            return (<div> </div>)
        }
    }
}

export { Tags };

