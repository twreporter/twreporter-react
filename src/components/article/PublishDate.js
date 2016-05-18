/*eslint no-unused-vars:0*/
'use strict'
import React, { Component } from 'react'
import { FormattedDate } from 'react-intl'
import styles from './PublishDate.scss'

export class PublishDate extends Component {
  constructor(props) {
    super(props)
  }

  setHtml(html) {
    return { __html: html }
  }

  render() {
    const { date } = this.props
    const dateTime = new Date(date)
    return (
      <div className={styles.publishDate}>
        <FormattedDate value={ dateTime } day="numeric" month="numeric" year="numeric" />
      </div>
    )
  }
}
