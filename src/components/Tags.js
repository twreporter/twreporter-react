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
        let cat_display = "台灣"
        if (articles.length > 0 || !articles) {
        return (
            <div className="category-items">
                <div className="category-name">
                    <div className="name-title">{cat_display.substring(0,1)}</div>
                    <div className="name-title">{cat_display.substring(2,1)}</div>
                </div>
                <ul className="tag-listing">
                { _.map(articles, (a) => {
                    var d = new Date()
                    d.setTime(a.lastPublish*1000)
                    var d_str = d.toISOString().substring(0,10)
                    var re = /^[\w\d]/
                    let img_existing = re.exec(a.firstImage)
                    var url = "https://www.twreporter.org/a/" + a.slug
                    if (img_existing != null) {
                        let thumbnail = "https://www.twreporter.org/data/files/organization/60826/image/derivative/scale~600x600~" + a.firstImage
                        return (
                            <li className="tag-item" key={a.id}>
                                <a href={url}>
                                    <div className="itemimage-wrap">
                                        <img className="category-itemimage" src={thumbnail}/>
                                    </div>
                                    <div className="tag-itemdesc">
                                        <div className="tag-itemtitle">{a.title}</div>
                                        <div className="tag-itemexcerpt">{a.excerpt}</div>
                                        <div className="tag-itempublished">{d_str}</div>
                                    </div>
                                </a>
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

