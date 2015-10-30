"use strict"
import React from 'react'
import {Link} from 'react-router'
import Transmit from 'react-transmit'
import './App.css'

import {RouteHandler} from 'react-router'

class App extends React.Component {
    static propTypes = { id: React.PropTypes.string }
    static contextTypes = { router: React.PropTypes.func }
    constructor(props) { super(props)
        var showNavBar = true; //window.innerWidth < 600 ? false:true;

        this.state = {
            showNavBar: showNavBar,
            navList: null
        }
    }
    componentWillMount() {
        if(typeof window !== 'undefined' && window.screen.availWidth <= 600) {
            this.setState({ showNavBar: false });
        }
    }
    render() {
        return (
        <div className="index">
            <Link to="about">關於我們</Link>
            <Link to="category" params={{category: "review"}}>評論</Link>
            <RouteHandler/>
        </div>
        )
   }
}

export default Transmit.createContainer(App, {
    queries: {}
})
