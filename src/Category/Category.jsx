"use strict"
import React from 'react'
import Transmit from 'react-transmit'
import './Category.css'


class Category extends React.Component {

    constructor (props) { super(props)
    }

    render() {
        return <div class="class">category</div>
    }
}

export default Transmit.createContainer(Category, { queries: {}})
