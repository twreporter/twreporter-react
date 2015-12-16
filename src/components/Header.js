import React, { Component, PropTypes } from 'react'
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
            </div>
        )
    }
}

Header.propTypes = { }
