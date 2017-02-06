'use strict'
import MobileDetect from 'mobile-detect'
import React from 'react' // eslint-disable-next-line
import styles from './ShareBt.scss'
import { FacebookButton, TwitterButton } from 'react-social'

class ShareBt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDesktop: true
    }
  }

  componentDidMount() {
    let md = new MobileDetect(window.navigator.userAgent)
    this.setState({
      isDesktop: (!md.mobile() && !md.tablet())
    })
  }


  render() {
    const { isDesktop } = this.state
    const { appId, fbIcon, lineIcon, url, title, twitterIcon } = this.props
    const lineUrl = `http://line.naver.jp/R/msg/text/?${encodeURI(title + ' ' + url)}`
    const lineJsx = isDesktop ? null : (
      <a href={lineUrl} className={styles.bt}>
        <img src={lineIcon} />
      </a>
    )
    return (
      <div className={styles['share-bt-container']}>
        <FacebookButton className={styles.bt} url={url} appId={appId}>
          <img src={fbIcon} />
        </FacebookButton>
        <TwitterButton className={styles.bt} message={title} url={url}>
          <img src={twitterIcon} />
        </TwitterButton>
        {lineJsx}
      </div>
    )
  }
}

export { ShareBt }
