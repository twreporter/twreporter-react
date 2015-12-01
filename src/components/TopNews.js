import React, { Component, PropTypes } from 'react'
import Carousel from 'nuka-carousel'
import _ from 'lodash';
if (process.env.BROWSER) {
    require("./TopNews.css");
}

export default class TopNews extends Component {
    mixins: [Carousel.ControllerMixin]
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { topnews } = this.props
        if (topnews && topnews.length > 0) {
            return (
                <Carousel>
                    { _.map(topnews, (a) => {
                        var d = new Date()
                        d.setTime(a.lastPublish*1000)
                        var d_str = d.toISOString().substring(0,10)
                        var url = "https://www.twreporter.org/a/" + a.slug
                        return (
                            <a key={a.id} href={url}>
                                <div className="topnews_categorycontainer">
                                    <div className="topnews_category">台</div>
                                    <div className="topnews_category">灣</div>
                                </div>
                                <div className="topnewsimage-wrap">
                                    <img className="carousel-image" src={a.preview_image}/>
                                </div>
                                <div className="carousel-item">
                                    <div className="carousel-published">{d_str}</div>
                                    <div className="carousel-itemtitle">{a.title}</div>
                                    <div className="carousel-excerpt">{a.excerpt}</div>
                                    <div className="carousel-author">{a.author_display}</div>
                                 </div>
                            </a>
                        );
                        })
                    }
                </Carousel>
            )
        } else {
            return ( <div></div> )
        } 
    }
}

export { TopNews };

