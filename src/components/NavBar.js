import React, { Component, PropTypes } from 'react'
var Menu = require('react-burger-menu').slide;

if (process.env.BROWSER) {
    require("./NavBar.css");
}

export default class NaviBar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Menu>
                <a id="home" className="menu-item" href="/">首頁</a>
                <a id="about" className="menu-item" href="/about">國際</a>
                <a id="contact" className="menu-item" href="/contact">評論</a>
                <a onClick={ this.showSettings } className="menu-item--small" href="">文化</a>
            </Menu>
        )
    }
}

