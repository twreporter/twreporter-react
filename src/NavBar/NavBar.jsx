" use strict"
import React from 'react'
import {RouteHandler} from 'react-router'
import Transmit from 'react-transmit'
import {Link} from 'react-router'
import './NavBar.css'

class NavBar extends React.Component {
    render() {
        return (<div class="nav">
                <Link to="about">關於我們</Link>
                <Link to="category" params={{category: "review"}}>評論</Link>
                <RouteHandler/>
                </div>)
    }
}

export default Transmit.createContainer(NavBar, {})
