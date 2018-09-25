/*eslint no-unused-vars:0*/
'use strict'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import styles from './Introduction.scss'
import React, { Component } from 'react'

// lodash
import get from 'lodash/get'

export const Introduction = ({ data, fontSize }) => {
  let content
  let block = false
  let introArr = []

  let fontSizeStyle = {
    [styles['font-shrink']]: fontSize === 'small',
    [styles['font-default']]: fontSize === 'medium',
    [styles['font-enlarge']]: fontSize === 'large'
  }

  if (Array.isArray(data)) {
    content = data.map((ele, idx) => {
      let element = get(ele, [ 'content', 0 ])
      if (element.length > 0) {
        block = true
        let paragraph = get(ele, [ 'content', 0 ])
        introArr.push(<p key={ele.id || idx} dangerouslySetInnerHTML={{ __html: paragraph }}></p>)
        return paragraph
      }
    } )
  } else {
    if (content.length > 0) {
      block = true
      content = "<p>{get(data, [ 'content', 0 ])}</p>"
      introArr.push(<div dangerouslySetInnerHTML={{ __html: content }} />)
    }
  }

  if (block) {
    return (
      <div itemProp="description" className={classNames(styles['intro-container'], 'text-justify', fontSizeStyle)}>
        {introArr}
      </div>
    )
  } else {
    return (<div></div>)
  }
}
