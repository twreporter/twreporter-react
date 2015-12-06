import React, { Component, PropTypes } from 'react'
import Parallex from './Parallex'

if (process.env.BROWSER) {
    require("./FeaturesItem.css");
}
export default class FeaturesItem extends Component {
    constructor(props, context) {
        super(props, context)
    }
    handleResize() {
        var listingItem = document.getElementsByClassName('listing-item')
        for (var i = 0; i < listingItem.length; i++) {
            listingItem[i].style.height = window.screen.availWidth*0.75 + 'px'
        }
    }
    componentDidMount() {
        //this.handleResize()
        //window.addEventListener('resize', this.handleResize);
    }

    render() {
        const { article } = this.props
        let firstImage = "https://www.twreporter.org/data/files/organization/60826/image/derivative/scale~24050x0~" + article.firstImage
        let url = (article.story_link) ? article.story_link : "https://www.twreporter.org/a/" + article.slug 
        var d = new Date()
        d.setTime(article.lastPublish*1000)
        var d_str = d.toISOString().substring(0,10);
        return (
            <li className="listing-item" key={article.id}>
                <a href={url}>
                    <div className="featuresimage-wrap">
                        <img className="listing-img" src={firstImage}/>
                    </div>
                    <div className="feature-categorycontainer">
                        <div className="feature-category">台</div>
                        <div className="feature-category">灣</div>
                    </div>
                    <div className="listing-projectborder clearfix">
                        <div className="listing-project">
                            <div className="listing-projectpublished">{d_str}</div>
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
