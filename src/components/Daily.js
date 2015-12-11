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
        let dailyTop = []
        if ( daily ) { dailyTop = daily.slice(0, 6); }
	return dailyTop ? (
	    <div className="daily">
		<h2 className="daily-news">
		    <div className="what">觀 點</div>
		</h2>
		<div className="daily-line"></div>

		<div className="daily-itemlistwrapprt">
		<ul className="daily-itemlist">
		    { _.map(dailyTop, (a, index) => {

			var t = new Date(a.lastPublish * 1000).toString().split(' ');
            if (a.isPublishedVersion) {
			    let thumbnail;
                if (a.firstImage && (a.firstImage.indexOf('.png') > -1 || a.firstImage.indexOf('.jpg') > -1)) {
                    thumbnail = a.firstImage;
                } else if (a.previewImage) {
                   thumbnail = a.previewImage
                } else if (a.facebookImage) {
                    thumbnail = "https://twreporter.atavist.com/data/files/organization/60826/image/derivative/scale~1200x1200~" + a.facebookImage
                }
			    let url = (a.storyLink) ? a.storyLink : "https://www.twreporter.org/a/" + a.slug
			    return (
				<a href={url}>
				    <li key={a.id} className="daily-item">
					    <img className="daily-image" src={thumbnail}/>
				        <div className="daily_lastpublish">{[t[1], t[2], t[3]].join('.')}</div>
				        <div className="daily-title">{a.title}</div>
				    </li>
				</a>
			    );}
			})
		    }
		</ul>
		</div>
	    </div>
	) : null;
    }
}

export { Daily };

