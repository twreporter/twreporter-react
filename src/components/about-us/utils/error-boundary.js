import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isError: false }
  }

  static getDerivedStateFromError(error) {
    return { isError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo)
  }


  render() {
    if (this.state.isError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary 
