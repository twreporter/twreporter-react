"use strict"
import React from 'react'
import {Link} from 'react-router'
import NavBar from '../NavBar/NavBar.jsx'
import Transmit from 'react-transmit'
import './App.css'

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
            <NavBar/>
        </div>
        )
   }
}

export default Transmit.createContainer(App, {
    queries: {}
})
