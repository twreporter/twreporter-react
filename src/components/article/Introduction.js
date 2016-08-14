/*eslint no-unused-vars:0*/
'use strict'
import _ from 'lodash'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import styles from './Introduction.scss'
import React, { Component } from 'react'

export const Introduction = ({ data }) => {
  let content
  let block = false
 
  if (Array.isArray(data)) {
    content = data.map((ele, idx) => {
      let element = _.get(ele, [ 'content', 0 ])
      if (element.length > 0) {
        block = true
        return (
          <p key={ele.id || idx}>{_.get(ele, [ 'content', 0 ])}</p>
        )
      }
    } )
  } else {
    if (content.length > 0) {
      block = true
      content = "<p>{_.get(data, [ 'content', 0 ])}</p>"
    } 
  }

  if (block) {
    return (
      <div className={classNames(styles['intro-container'], 'text-justify', commonStyles['text-color'])}>
        {content}
      </div>
    )
  } else {
    return (<div></div>)
  }
}
