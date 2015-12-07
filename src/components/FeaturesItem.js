import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

if (process.env.BROWSER) {
    require("./FeaturesItem.css");
}

const IMG_WIDTH = 1800;
const IMG_HEIGHT = 1200;

export default class FeaturesItem extends Component {
    constructor(props, context) {
        super(props, context)

        // scrollController and scrollScene are used for ScrollMagic
        this.scrollController = null
        this.scrollScene = null
    }

    _resizeImage() {
        let img = ReactDOM.findDOMNode(this.refs.listImg);
        let height;
        let width;
        if (window.innerWidth > window.innerHeight) {
            height = ((window.innerWidth / IMG_WIDTH) * IMG_HEIGHT)
            width = window.innerWidth
        } else {
            height = window.innerHeight
            width = ((window.innerHeight / IMG_HEIGHT) * IMG_WIDTH)
        }
        img.style.marginTop = ( window.innerHeight - height ) + 'px'
        img.style.marginLeft = ( window.innerWidth - width ) + 'px'
        img.style.height = height + 'px'
        img.style.width = width + 'px'
    }

    _handleResize() {
        // resize image
         this._resizeImage()

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
                })
            }

            this.scrollScene
            .duration(window.innerHeight)
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
        let d = new Date()
        d.setTime(article.lastPublish*1000)
        let d_str = d.toISOString().substring(0,10);
        let tags = article.tags
        let cat_display = "專題"                                                                                       
        for (let i = 0; i < tags.length; i++) {
            if (tags[i].substring(0,4) == 'cat:') {
                cat_display = tags[i].substring(4)
                break
            }
        } 

        return (
            <li className="listing-item" key={article.id}>
                <a href={url}>
                    <div id={'parallax-trigger'+this.props.article.id} className="featuresimage-wrap">
                        <img  ref='listImg' width='1800px' height='1200px' className="listing-img" src={firstImage}/>
                    </div>
                    <div ref='parallaxIndicator' className='listing-projectcontainer'>
                        <div className="listing-projectborder clearfix">
                            <div className="feature-categorycontainer">
                                <div className="feature-category">{cat_display.substring(0,1)}</div>
                                <div className="feature-category">{cat_display.substring(2,1)}</div>
                            </div>
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
