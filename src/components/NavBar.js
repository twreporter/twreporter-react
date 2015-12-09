import React, { Component, PropTypes } from 'react'
var Menu = require('react-burger-menu').slide;

if (process.env.BROWSER) {
    require("./NavBar.css");
    require("./NavBurg.css");
}

export default class NaviBar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="nav-menu">
                <div className="nav_logo">
                    <a href="#"><img height="205" height="81" src="/asset/logo.png"/></a>
                </div>
                <div className="listing-menu">
                    <ul className="menu-items">
                        <li className="nav-item"><a id="home" className="menu-item" href="/">台灣</a></li>
                        <li className="nav-item"><a id="about" className="menu-item" href="/about">國際</a></li>
                        <li className="nav-item"><a id="contact" className="menu-item" href="/contact">評論</a></li>
                        <li className="nav-item"><a id="contact" className="menu-item" href="/contact">文化</a></li>
                        <li className="nav-item"><a id="contact" className="menu-item" href="/contact">影像</a></li>
                        <li className="nav-item"><a id="contact" className="menu-item" href="/contact">專題</a></li>
                        <li className="nav-item"><a id="contact" className="menu-item" href="/contact">媒體</a></li>
                    </ul>
                </div>
                <div className="berg">
                    <Menu right>
                        <a id="home" className="menu-item" href="/">台灣</a>
                        <a id="about" className="menu-item" href="/about">國際</a>
                        <a id="contact" className="menu-item" href="/contact">評論</a>
                        <a id="contact" className="menu-item" href="/contact">文化</a>
                        <a id="contact" className="menu-item" href="/contact">影像</a>
                        <a id="contact" className="menu-item" href="/contact">專題</a>
                        <a id="contact" className="menu-item" href="/contact">媒體</a>
                    </Menu>
                </div>
            </div>
        )
    }
}

