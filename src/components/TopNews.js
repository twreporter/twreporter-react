import React, { Component, PropTypes } from 'react'
import Slider from 'react-slick'
import { ts2yyyymmdd } from '../lib/date-transformer'
if (process.env.BROWSER) {
    require("./TopNews.css");
}

export default class TopNews extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentDidMount() {
        // this.handleResize()
        // window.addEventListener('resize', this.handleResize);
    }
    render() {
        const { topnews } = this.props
        let settings = {
            dots: true,
            infinite: true,
            speed: 1500,
            autoplay: true,
            autoplaySpeed: 4500,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            lazyLoad: false,
            useCSS: true
        };
	return Array.isArray(topnews) ? (
	    <Slider {...settings}>
            {topnews.map((a) => {
                const pubDate = ts2yyyymmdd(a.lastPublish * 1000, '.');
                let tags = a.tags
                let catDisplay = "專題"
                for (let i = 0; i < tags.length; i++) {
                    if (tags[i].substring(0,4) == 'cat:') {
                        catDisplay = tags[i].substring(4)
                        break
                    }
                }
                return (
                    <a
                        key={a.id}
                        href={(a.slug) ? "https://www.twreporter.org/a/" + a.slug : a.storyLink}
                        className="topnewsimage-wrap"
                        style={{
                            backgroundImage: 'url(' + a.previewImage + ')',
                        }}
                        >
                        <div className="topnews_categorycontainer">
                            <div className="topnews_category">{catDisplay.substring(0,1)}</div>
                            <div className="topnews_category">{catDisplay.substring(2,1)}</div>
                        </div>
                        <div className="carousel-item">
                            <div className="carousel-itemtitle">{a.title}</div>
                            <div className="carousel-excerpt">{a.excerpt}</div>
                            <div className="carousel-published">
                                {pubDate}
                            </div>
                        </div>
                    </a>
                );
            })}
	    </Slider>
	) : null;
    }
}

export { TopNews };

