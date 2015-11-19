import React, { Component, PropTypes } from 'react'
import Carousel from 'nuka-carousel'
import _ from 'lodash';
if (process.env.BROWSER) {
    require("./Daily.css");
}

export default class Daily extends Component {
    mixins: [Carousel.ControllerMixin]
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { articles } = this.props
        if (articles.length > 0 || !articles) {
        return (
            <div>
            <h2 className="daily-news"><div className="what">What''s</div><div className="new"> New</div></h2>
            <ul className="daily-itemlist">
                { _.map(articles, (a) => {
                    var re = /^[\w\d]/
                    let img_existing = re.exec(a.firstImage)
                    if (img_existing != null) {
                        let thumbnail = "https://twreporter.atavist.com/data/files/organization/60826/image/derivative/scale~213x143~" + a.firstImage
                        return (
                            <li key={a.id} className="daily-item">
                                <a href={a.url}>
                                    <img className="daily-image" src={thumbnail}/>
                                </a>
                                <div className="daily-title">{a.title}</div>
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

export { Daily };

