'use strict'
import React from 'react'

function getWrappedComponetDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
} 

/**
 * Add classNames object to props
 * 
 * @export
 * @param {any} WrappedComponent - The React component to be wrapped
 * @param {any} styles - The classNames object translated from imported scss/css file
 * @returns 
 */
export function addStylesToProps(WrappedComponent, styles) {
  return class WithStyles extends React.Component {
    static displayName = `WithStyles(${getWrappedComponetDisplayName(WrappedComponent)})`
    render() {
      return <WrappedComponent {...this.props} styles={styles} />
    }
  }
}
