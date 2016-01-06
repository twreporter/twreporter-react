import React, { Component } from 'react'

if (process.env.BROWSER) {
  require('./Footer.css')
}

export default class Footer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="logo-container">
            <div className="logo">
              <a href="/" target="_self">
                  <img
                    className="logo-img"
                    src="/asset/footer-logo-desktop.png"
                  />
              </a>
            </div>
          </div>
          <div className="social-container">
            <div className="item">
              <a href="https://www.facebook.com/twreporter/" target="_blank">
                  <img className="fb" src="/asset/FB"/>
              </a>
            </div>
            <div className="item">
              <a href="https://www.instagram.com/twreporter/" target="_blank" >
                  <img className="ig" src="/asset/IG.png" />
              </a>
            </div>
          </div>
          <div className="us-container">
            <div className="item">
              <a href="/a/about-us-footer">
                  關於我們
              </a>
            </div>
            <div className="item">
              <a href="/a/contact-footer">
                  聯絡我們
              </a>
            </div>
            <div className="item">
              <a href="/a/privacy-footer">
                  隱私政策
              </a>
            </div>
            <div className="item">
              <a href="https://twreporter.backme.tw:443/cashflow/checkout?project_id=175&reward_id=718">
                  贊助我們
              </a>
            </div>
          </div>
        </div>
        <div className="open-source-container">
          <div className="items">
            <div className="item">
              <a href="http://creativecommons.org/licenses/by-nc-nd/3.0/tw/" rel="license" target="_blank">
                <img className="cc-logo img" src="/asset/cc.png" />
                <span className="cc-license"> 除另有註明，網站內容皆採用創用CC姓名標示-非商業性-禁止改作授權條款</span>
              </a>
            </div>
            <div className="item">
              <a href="https://github.com/twreporter" target="_blank">
                <img src="/asset/github.png" className="img" />
                <span> github.com/twreporter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
