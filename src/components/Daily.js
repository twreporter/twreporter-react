import React, { Component, PropTypes } from 'react'
import _ from 'lodash';
if (process.env.BROWSER) {
    require("./Daily.css");
}

export default class Daily extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { daily } = this.props
        let daily_top = []
        if ( daily ) { daily_top = daily.slice(0, 6); }
        if (daily_top) {
            return (
                <div>
                    <h2 className="daily-news"><div className="what">What&#39;s</div><div className="new"> New</div></h2>
                    <div className="daily-line"></div>
                    <ul className="daily-itemlist">
                        { _.map(daily_top, (a) => {
                            var re = /^[\w\d]/
                            let img_existing = re.exec(a.firstImage)
                            var d = new Date()
                            d.setTime(a.lastPublish*1000)
                            var d_str = d.toISOString().substring(0,10);
                            if (a.isPublishedVersion) {
                                let thumbnail = (a.firstImage) ? "https://www.twreporter.org/data/files/organization/60826/image/derivative/scale~213x143~" + a.firstImage : a.preview_image
                                let url = (a.story_link) ? a.story_link : "https://www.twreporter.org/a/" + a.slug 
                                return (
                                    <a href={url} key={a.id}>
                                        <li className="daily-item">
                                            <img className="daily-image" src={thumbnail}/>
                                            <div className="daily_lastpublish">{d_str}</div>
                                            <div className="daily-title">{a.title}</div>
                                        </li>
                                    </a>
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

