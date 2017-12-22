'use strict'
import React from 'react'

function getWrappedComponetDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

/**
 * Add classNames object to props
 *
 * @export
 * @param {object} WrappedComponent - The React component to be wrapped
 * @param {object} styles - The classNames object translated from imported scss/css file
 * @returns
 */
export function addStylesToPropsDecorator(WrappedComponent, styles) {
  return class WithStyles extends React.Component {
    static displayName = `WithStyles(${getWrappedComponetDisplayName(WrappedComponent)})`
    render() {
      return <WrappedComponent {...this.props} styles={styles} />
    }
  }
}


/**
 * Wrap a componet with a div with specific styles
 *
 * @param {object} WrappedComponent - The React component to be wrapped
 * @param {object} wrappertStyles  - The styles assined to wrapper div
 * @returns
 */
export function addStyledWrapperDecorator(WrappedComponent, wrappertStyles) {
  return class WrapWithStyledDiv extends React.Component {
    static displayName = `wrapWithStyledDiv(${getWrappedComponetDisplayName(WrappedComponent)})`
    render() {
      return (
      <div style={wrappertStyles}>
        <WrappedComponent {...this.props} />
      </div>)
    }
  }
}
