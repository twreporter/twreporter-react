import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Category extends Component {
    render() {
        const { tag } = this.props
        if (!tag) {
            return <div>No category selected</div>
        }

        return (
            <div>
                {tag}
                category page
            </div>
        )
    }
}

Category.propTypes = {
    tag: PropTypes.string.isRequired
}

