import React, { Component, PropTypes } from 'react'

if (process.env.BROWSER) {
    require("./FeaturesItem.css");
}
export default class FeaturesItem extends Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
    var Parallax = require('scroll-parallax');
        var parallax = new Parallax('.parallax', {
            offsetYBounds: 1600,
            intensity: 10,
            center: 1
        })
        parallax.on('image:loaded', function() {
            console.log(arguments)
        })
        parallax.on('images:loaded', function() {
            console.log(arguments)
        })
        parallax.init()
    }

    render() {
        const { article } = this.props
        article.firstImage = "https://twreporter.atavist.com/data/files/organization/60826/image/derivative/scale~1185x0~" + article.firstImage
        var style = { backgroundImage: 'url(' + article.firstImage + ')' }
        return (
            <li className="listing-item" key={article.id}>
                <a href={article.url}>
                   <img className="parallax" src={article.firstImage}/>
                   <div className="listing-projectborder">
                      <div className="listing-project">
                          <div className="listing-projectpublished">{article.lastPublish}</div>
                          <div className="listing-title">{article.title}</div>
                          <div className="listing-excerpt">{article.excerpt}</div>
                      </div>
                   </div>
                </a>
            </li>
        )
    }
}
