import React, { Component, PropTypes } from 'react'

export default class NaviBar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <ul>
                    <li>台灣</li>
                    <li>國際</li>
                    <li>評論</li>
                    <li>文化</li>
                    <li>影像</li>
                    <li>媒體</li>
                </ul>
            </div>
        )
    }
}

