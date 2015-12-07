import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

if (process.env.BROWSER) {
    require("./FeaturesItem.css");
}

export default class FeaturesItem extends Component {
    constructor(props, context) {
        super(props, context)

        // scrollController and scrollScene are used for ScrollMagic
        this.scrollController = null
        this.scrollScene = null
    }

    _handleResize() {
        // only for desktop, we have the parallax animation
        if (window.innerWidth  > 800 ) {

            if (!this.scrollController) {
                // init controller
                this.scrollController = new ScrollMagic.Controller()
            }

            if (this.scrollScene) {
                // remove scene from controller
                this.scrollScene.remove()
            }

            if (!this.scrollScene) {
                // create a scene
                this.scrollScene = new ScrollMagic.Scene({
                    triggerElement: '#parallax-trigger'+this.props.article.id,
                    triggerHook: 0, // don't trigger until #parallax-trigger hits the top of the viewport,
                    // right now we set is as 90% by heuristic.
                    // TODO compute the best duration percentage
                    duration: '90%'
                })
            }

            this.scrollScene
            // duration will be different after resizing
            // TODO compute the best duration after resizing
            // .duration(duration)
            .setPin('#parallax-trigger'+this.props.article.id, {pushFollowers: false}) // pins the element for the the scene's duration
            .addIndicators()
            .addTo(this.scrollController)

        } else {
            if (this.scrollScene) {
                // remove the pin from the scene and reset the pin element to its initial position (spacer is removed)
                this.scrollScene.removePin(true)
                // remove scene from controller it belonged to
                this.scrollScene.remove();
            }
        }
    }

    componentDidMount() {
        this._handleResize()
        window.addEventListener('resize', this._handleResize.bind(this));
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
                    <div id={'parallax-trigger'+this.props.article.id} className="featuresimage-wrap">
                        <img  ref='listImg' width='1800px' height='1200px' className="listing-img" src={firstImage}/>
                    </div>
                    <div ref='parallaxIndicator'>
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
                    </div>
                </a>
            </li>
        )
    }
}
