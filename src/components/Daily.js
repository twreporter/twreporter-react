import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { ts2yyyymmdd } from '../lib/date-transformer';
import { imageComposer } from '../lib/image-composer';

if (process.env.BROWSER) {
    require("./Daily.css");
}

export default class Daily extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { daily, device } = this.props
        let dailyTop = []
        if ( daily ) { dailyTop = daily.slice(0, 6); }
	return dailyTop ? (
	    <div className="daily">
		<h2 className="daily-news">
		    <div className="what">觀&nbsp;點</div>
		</h2>
		<div className="daily-itemlistwrapprt">
		<ul className="daily-itemlist">
		    { _.map(dailyTop, (a, index) => {
                const pubDate = ts2yyyymmdd(a.lastPublish * 1000, '.');
                if (a.isPublishedVersion) {
                    let thumbnail = imageComposer(a, device);
                    let url = (a.storyLink) ? a.storyLink : "https://www.twreporter.org/a/" + a.slug
                    return (
                        <a href={url} key={a.id}>
                            <li className="daily-item">
                                <img className="daily-image" src={thumbnail}/>
                                <div className="daily_lastpublish">{pubDate}</div>
                                <div className="daily-title">{a.title}</div>
                            </li>
                        </a>
                    );
                }
			})
		    }
		</ul>
		</div>
	    </div>
	) : null;
    }
}

export { Daily };

