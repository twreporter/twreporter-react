import ErrorPage from '@twreporter/react-components/lib/error'
import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  componentDidCatch(error, info) {
    console.warn(error, info) // eslint-disable-line no-console
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage errorType="500" />
    }
    return this.props.children
  }
}

export default ErrorBoundary
