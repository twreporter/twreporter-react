import React, { Component } from 'react'

export default class SystemError extends Component {
  render() {
    return (
      <div>
        <div className="nav-menu">
          <div className="nav_logo">
            <a href="#"><img height="81" src="/asset/logo.png"/></a>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img className="error_img" src="/asset/500.jpg" width="80%" height="auto"/>
        </div>
      </div>
    )
  }
}
