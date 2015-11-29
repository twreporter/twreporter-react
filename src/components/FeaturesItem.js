import React, { Component, PropTypes } from 'react'
import Parallex from './Parallex'

if (process.env.BROWSER) {
    require("./FeaturesItem.css");
}
export default class FeaturesItem extends Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
    }

    render() {
        const { article } = this.props
        let firstImage = "https://twreporter.atavist.com/data/files/organization/60826/image/derivative/scale~1185x0~" + article.firstImage
        var style = { backgroundImage: 'url(' + article.firstImage + ')' }
        return (
            <li className="listing-item" key={article.id}>
                <a href={article.url}>
                    <div className="featuresimage-wrap">
                        <img className="listing-img" src={firstImage}/>
                    </div>
                    <div className="listing-projectborder clearfix">
                        <div className="feature-categorycontainer">
                            <div className="feature-category">台</div>
                            <div className="feature-category">灣</div>
                        </div>
                        <div className="listing-project">
                            <div className="listing-projectpublished">{article.lastPublish}</div>
                            <div className="listing-title">{article.title}</div>
                            <div className="listing-excerpt">{article.excerpt}</div>
                            <div className="listing-author">{article.author_display}</div>
                        </div>
                    </div>
                </a>
            </li>
        )
    }
}
