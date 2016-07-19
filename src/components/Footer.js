import React, { Component } from 'react'
import { donatePath } from '../constants/index'

if (process.env.BROWSER) {
  require('./Footer.css')
}

export default class Footer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { copyright } = this.props
    let copyright_img = '/asset/cc.png'
    let copyright_string = '除另有註明，網站內容皆採用創用CC姓名標示-非商業性-禁止改作授權條款'

    if (copyright == 'Copyrighted') {
      copyright_img = '/asset/cc.png'
      copyright_string = 'Copyright 2015-2016 報導者'
    } else if (copyright == 'Creative-Commons') {
      copyright_img = '/asset/cc.png'
      copyright_string = '創用CC姓名標示-非商業性-禁止改作授權條款'
    }
    return (
      <div className="footer">
        <div className="container inner-max">
          <div className="row">
            <div className="col-md-12">
              <div className="logo-container">
                <div className="logo">
                  <a href="/" target="_self">
                      <img
                        className="logo-img"
                        src="/asset/logo-desk.svg"
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
            </div>
          </div>
          <div className="us-container row">
            <div className="item col-md-3 col-sm-3 col-xs-6">
              <a href="/a/about-us-footer">
                  關於我們
              </a>
            </div>
            <div className="item col-md-3 col-sm-3 col-xs-6">
              <a href="/a/contact-footer">
                  聯絡我們
              </a>
            </div>
            <div className="item col-md-3 col-sm-3 col-xs-6">
              <a href="/a/privacy-footer">
                  隱私政策
              </a>
            </div>
            <div className="item col-md-3 col-sm-3 col-xs-6">
              <a href={donatePath} target="_blank">
                  贊助我們
              </a>
            </div>
          </div>
        </div>
        <div className="open-source-container">
          <div className="container inner-max">
            <div className="items">
              <div className="item">
                <a href="http://creativecommons.org/licenses/by-nc-nd/3.0/tw/" rel="license" target="_blank">
                  <img className="cc-logo img" src={copyright_img} />
                  <span className="cc-license"> {copyright_string} </span>
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
      </div>
    )
  }
}
