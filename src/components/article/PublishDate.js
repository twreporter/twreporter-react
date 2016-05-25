/*eslint no-unused-vars:0*/
'use strict'
import { ts2yyyymmdd } from '../../lib/date-transformer'
import React, { Component } from 'react'
import { FormattedDate } from 'react-intl'
import styles from './PublishDate.scss'

export class PublishDate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false
    }
  }

  componentDidMount() {
    this.setState({ isLoaded: true })
  }

  render() {
    const { date } = this.props
    const dateTime = new Date(date)
    let fDate = ts2yyyymmdd(dateTime, '/')

    // avoid the server-side rendered date being inconsistent with the client-side results rendered by react-intl
    if(this.state.isLoaded) {
      fDate = <FormattedDate value={ dateTime } day="numeric" month="numeric" year="numeric" />
    }

    return (
      <div className={styles.publishDate}>
        {fDate}
      </div>
    )
  }
}
