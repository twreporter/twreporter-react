import React, { Component, PropTypes } from 'react'
import { FacebookLikeButton, FacebookShareButton, TwitterButton } from 'react-social-buttons'
if (process.env.BROWSER) {
        require("./Header.css");
}

export default class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let url = "https://www.twreporter.org/";
        return (
            <div className="uh">
                <FacebookShareButton url={url} />
            </div>
        )
    }
}

Header.propTypes = { }
