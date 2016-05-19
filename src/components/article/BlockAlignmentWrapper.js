'use strict'
import styles from './BlockAlignmentWrapper.scss'
import React, { Component } from 'react'

const getDisplayName = (WrappedComponent) => (
  WrappedComponent.displayName || WrappedComponent.name || 'Component'
)

// Export
export default function WrapComponent(WrappedComponent) {
  class Wrapper extends Component {
    constructor(props) {
      super(props)
    }

    render() {
      const { alignment } = this.props

      return (
        <div className={styles[`align-${alignment}`]}>
          <WrappedComponent
            {...this.props}
          />
        </div>
      )
    }
  }
  Wrapper.displayName = `Aligned(${getDisplayName(WrappedComponent)})`
  Wrapper.PropTypes = {
    alignment: React.PropTypes.string
  }
  Wrapper.defaultProps = {
    alignment: 'center'
  }

  return Wrapper
}

