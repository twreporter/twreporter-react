/*eslint no-unused-vars:0*/
'use strict'
import _ from 'lodash'
import classNames from 'classnames'
import styles from './Introduction.scss'
import React, { Component } from 'react'

export const Introduction = ({ data }) => {
  let content = Array.isArray(data) ? data.map((ele) => {
    return (
      <p>{_.get(ele, [ 'content', 0 ])}</p>
    )
  } ) : <p>{_.get(data, [ 'content', 0 ])}</p>

  if (content.length > 0) {
    return (
      <div className={classNames('inner-max', 'center-block', styles.introContainer)}>
        {content}
      </div>
    )
  } else {
    return (<div></div>)
  }
}
