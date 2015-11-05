import React, { Component, PropTypes } from 'react'

export default class Projects extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1"/>
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2"/>
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3"/>
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4"/>
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5"/>
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6"/>
            </div>
        )
    }
}

Projects.propTypes = { }
