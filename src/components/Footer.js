import { copyrightTypes, donatePath } from '../constants/index'
import React, { Component } from 'react'
import styles from './Footer.scss'
import logoIcon from '../../static/asset/logo-mobile.svg'

export default class Footer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { copyright } = this.props
    let copyrightObj = copyrightTypes.default

    if (copyright == 'Copyrighted') {
      copyrightObj = copyrightTypes.copyrighted
    } else if (copyright == 'Creative-Commons') {
      copyrightObj = copyrightTypes.creativeCommons
    }
    
    let copyrightString = copyrightObj.string
    let copyrightImg = copyrightObj.image ? <img className={styles['cc-image']} src={copyrightObj.image} /> : null
    let copyrightLink = copyrightObj.link ?
                    (<a href={copyrightObj.link} rel="license" target="_blank" className={styles['cc-license']}>
                      {copyrightImg}
                      <p> {copyrightString} </p>
                      </a>) : null

    return (
      <div className={styles['footer']}>
        <div className="container inner-max">
          <div className="row">
            <div className="col-md-12">
              <div className="logo-container">
                <div className={styles['logo']}>
                  <a href="/" target="_self">
                      <img
                        className="logo-img"
                        src={logoIcon}
                      />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="us-container row text-center">
            <div className="item col-xs-3">
              <a href="/a/about-us-footer">
                  關於我們
              </a>
            </div>
            <div className="item col-xs-3">
              <a href="/a/contact-footer">
                  聯絡我們
              </a>
            </div>
            <div className="item col-xs-3">
              <a href="/a/privacy-footer">
                  隱私政策
              </a>
            </div>
            <div className="item col-xs-3">
              <a href={donatePath} target="_blank">
                  贊助我們
              </a>
            </div>
          </div>
        </div>

        <div className="row text-center">
          <div className={styles['social-container']}>
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

        <div className="open-source-container">
          <div className="container inner-max">
              <div className="row text-center">
                {copyrightLink}
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
