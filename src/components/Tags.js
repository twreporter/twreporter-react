import React, { Component, PropTypes } from 'react'
import Carousel from 'nuka-carousel'
import _ from 'lodash';
if (process.env.BROWSER) {
    require("./Tags.css")
}

export default class Tags extends Component {
    mixins: [Carousel.ControllerMixin]
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { articles } = this.props
        if (articles.length > 0 || !articles) {
        return (
            <div className="category-container">
                <div className="category-name">
                    <div className="name-title">台</div>
                    <div className="name-title">灣</div>
                </div>
                <div className="category-items">
                    <ul className="tag-listing">
                        { _.map(articles, (a) => {
                            var re = /^[\w\d]/
                            let img_existing = re.exec(a.firstImage)
                            if (img_existing != null) {
                                let thumbnail = "https://twreporter.atavist.com/data/files/organization/60826/image/derivative/scale~600x600~" + a.firstImage
                                return (
                                    <li className="tag-item" key={a.id}>
                                        <div className="itemimage-wrap">
                                            <img className="category-itemimage" src={thumbnail}/>
                                        </div>
                                        <a href={a.url}>
                                            <div className="tag-itemdesc">
                                                <div className="tag-itemtitle">{a.title}</div>
                                                <div className="tag-itemexcerpt">{a.excerpt}</div>
                                            </div>
                                        </a>
                                    </li>
                                );}
                            })
                        }
                    </ul>
                </div>
            </div>
        )
        } else {
            return (<div> </div>)
        }
    }
}

export { Tags };

