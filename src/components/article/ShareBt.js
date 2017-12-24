'use strict'
import FbIcon from '../../../static/asset/fb.svg'
import LineIcon from '../../../static/asset/line.svg'
import MobileDetect from 'mobile-detect'
import React from 'react' // eslint-disable-next-line
import TwitterIcon from '../../../static/asset/twitter.svg'
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
    const { appId, url, title } = this.props
    const lineUrl = `http://line.naver.jp/R/msg/text/?${encodeURI(title + ' ' + url)}`
    const lineJsx = isDesktop ? null : (
      <a href={lineUrl} className={styles.bt}>
        <LineIcon />
      </a>
    )
    return (
      <div className={styles['share-bt-container']}>
        <FacebookButton className={styles.bt} url={url} appId={appId}>
          <FbIcon />
        </FacebookButton>
        <TwitterButton className={styles.bt} message={title} url={url}>
          <TwitterIcon />
        </TwitterButton>
        {lineJsx}
      </div>
    )
  }
}

export { ShareBt }
