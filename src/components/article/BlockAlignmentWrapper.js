'use strict'
import classNames from 'classnames'
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
      const { alignment, device } = this.props

      return (
        <div className={classNames(styles[`align-${alignment}`], { [styles['mobile']]: device === 'mobile' ? true : false })}>
          <WrappedComponent
            content={this.props.content}
            customeStyles={this.props.customeStyles}
            id={this.props.id}
          />
          {this.props.children}
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

