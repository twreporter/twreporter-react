import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      hideInstruction: false
    }
  }

  componentDidCatch(error, info) {
    console.error('An error was catched in React ErrorBoundary:', error, info) // eslint-disable-line no-console
    this.setState({ hasError: true })
    this._error = error
    this._info = info
  }

  hide = () => {
    this.setState({
      hideInstruction: true
    })
  }

  render() {
    if (this.state.hasError && !this.state.hideInstruction) {
      return (
        <div style={{ background: '#F1F1F1' }}>
          {this.props.children}
          <section style={{ background: 'white', width: '90%', maxWidth: '1024px', padding: '12px 26px', margin: '0', border: '1px solid black', position: 'fixed', bottom: '10px', left: '5%', zIndex: '9999', boxShadow: '2px 4px 5px black' }}>
            <strong style={{ fontSize: '1.2em' }}>我們偵測到您的瀏覽器在顯示網頁時遇到某些問題，您可嘗試以下步驟排解：</strong>
            <ul>
              <li>在確認網路連線正常的狀況下，重新整理網頁。</li>
              <li>目前已知 Exactly、 NewsGuard 等瀏覽器擴充套件會造成本站網頁功能毀損。如果您有安裝以上套件，請移除或停用後再次重新整理網頁試試看。 </li>
              <li>如果問題仍無法解決，請 email 聯繫我們：<a href="mailto:developer@twreporter.org">developer@twreporter.org</a>。或透過<a href="https://m.me/1646675415580324" target="_blank">臉書私訊</a>，由小編為您服務。</li>
            </ul>
            <div style={{ textAlign: 'right' }}><button onClick={this.hide} onKeyPress={this.hide} style={{ padding: '5px 10px' }}>我知道了</button></div>
          </section>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
