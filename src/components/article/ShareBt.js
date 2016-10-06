'use strict'
import { FacebookButton, TwitterButton } from 'react-social'
import classNames from 'classnames'
import styles from './ShareBt.scss'
import React from 'react' // eslint-disable-next-line

export const ShareBt = (props) => {
  const { appId, fbIcon, lineIcon, url, title, twitterIcon } = props
  const lineUrl = `http://line.naver.jp/R/msg/text/?${encodeURI(title + ' ' + url)}`
  return (
    <div className={styles['share-bt-container']}>
      <FacebookButton className={styles.bt} url={url} appId={appId}>
        <img src={fbIcon} />
      </FacebookButton>
      <TwitterButton className={styles.bt} message={title} url={url}>
        <img src={twitterIcon} />
      </TwitterButton>
      <a href={lineUrl} className={classNames(styles.bt, styles.line)}>
        <img src={lineIcon} />
      </a>
    </div>
  )
}
