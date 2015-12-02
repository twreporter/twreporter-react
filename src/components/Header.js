import React, { Component, PropTypes } from 'react'
import { FacebookLikeButton, FacebookShareButton, TwitterButton } from 'react-social-buttons'

export default class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let url = "https://www.twreporter.org/";
        return (
            <div className="uh">
                <FacebookShareButton url={url} />
                This is header
            </div>
        )
    }
}

Header.propTypes = { }
