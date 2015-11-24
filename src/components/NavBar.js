import React, { Component, PropTypes } from 'react'
if (process.env.BROWSER) {
    require("./NavBar.css");
}

export default class NaviBar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
                <ul className="nav-menu">
                    <li className="nav-menuitem">台灣</li>
                    <li className="nav-menuitem">國際</li>
                    <li className="nav-menuitem">評論</li>
                    <li className="nav-menuitem">文化</li>
                    <li className="nav-menuitem">影像</li>
                    <li className="nav-menuitem">媒體</li>
                </ul>
        )
    }
}

