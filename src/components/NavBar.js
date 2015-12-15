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
                    <a href="#"><img src="/asset/logo.png"/></a>
                </div>
            </div>
        )
    }
}

