import React from 'react'
import styled from 'styled-components'
import { colorSupportive } from '@twreporter/core/lib/constants/color'

const ErrorContainer = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  a, a:link, a:active, a:visited {
    color: ${colorSupportive.heavy};
  }
  a:hover {
    color: ${colorSupportive.dark};
  }
`

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
      return (
        <ErrorContainer>
          <h1>有東西出錯了。</h1>
          <p>
            您可以返回
            <a href="https://twreporter.org">報導者首頁</a>
            ，或聯絡客服信箱
            <a href="mailto:contact@twreporter.org"> contact@twreporter.org</a>
            。
          </p>
        </ErrorContainer>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 
