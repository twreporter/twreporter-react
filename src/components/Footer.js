import { copyrightTypes, donatePath } from '../constants/index'
import classNames from 'classnames'
import logoFB from '../../static/asset/icon-facebook.svg'
import logoGithub from '../../static/asset/icon-github.svg'
import logoIcon from '../../static/asset/logo-mobile.svg'
import logoIG from '../../static/asset/icon-instagram.svg'
import logoLine from '../../static/asset/icon-line.svg'
import logoRss from '../../static/asset/icon-rss.svg'
import React, { Component } from 'react'
import styles from './Footer.scss'

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
              <div className={styles['logo-container']}>
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

          <div className={classNames('row', 'text-center', styles['us-container'])}>
            <div>
              <a href="/a/about-us-footer">
                  關於我們
              </a>
            </div>
            <div>
              <a href="/a/contact-footer">
                  聯絡我們
              </a>
            </div>
            <div>
              <a href="/a/privacy-footer">
                  隱私政策
              </a>
            </div>
            <div className={styles['support']}>
              <a href={donatePath} target="_blank">
                  贊助我們
              </a>
            </div>
          </div>

          <div className="row text-center">
            <div className={styles['social-container']}>
                <div className={styles['item']}>
                  <a href="https://www.facebook.com/twreporter/" target="_blank">
                      <img src={ logoFB }/>
                  </a>
                </div>
                <div className={styles['item']}>
                  <a href="https://www.instagram.com/twreporter/" target="_blank" >
                      <img src={logoIG} />
                  </a>
                </div>
                <div className={styles['item']}>
                  <a href="http://line.me/ti/p/%40nbs5015j" target="_blank" >
                      <img src={logoLine} />
                  </a>
                </div>
                <div className={styles['item']}>
                  <a href="https://github.com/twreporter" target="_blank" >
                      <img src={logoGithub} />
                  </a>
                </div>
                <div className={styles['item']}>
                  <a href="https://www.twreporter.org/a/rss2.xml" target="_blank" >
                      <img src={logoRss} />
                  </a>
                </div>
              </div>
          </div>
        </div>

        <div className="open-source-container">
          <div className="container inner-max">
              <div className="row text-center">
                {copyrightLink}
              </div>
          </div>
        </div>
      </div>
    )
  }
}
