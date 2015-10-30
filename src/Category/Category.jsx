"use strict"
import React from 'react'
import Transmit from 'react-transmit'
import './Category.css'


class Category extends React.Component {

    constructor (props) { super(props)
    }

    componentDidMount() {
        const category = this.props.params.category
    }

    render() {
        return (
        <div class="class">
            {this.props.params.category}
        </div>)
    }
}

export default Transmit.createContainer(Category, { queries: {}})
