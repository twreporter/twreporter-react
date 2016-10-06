/*eslint no-unused-vars:0*/
'use strict'
import { date2yyyymmdd } from '../../lib/date-transformer'
import { FormattedDate } from 'react-intl'
import React, { Component } from 'react'
import commonStyles from './Common.scss'
import classNames from 'classnames'
import styles from './PublishDate.scss'

export class PublishDate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMounted: false
    }
  }

  componentDidMount() {
    this.setState({ isMounted: true })
  }

  render() {
    const { date } = this.props
    const dateTime = new Date(date)
    let fDate = date2yyyymmdd(date, '.')

    // avoid the server-side rendered date being inconsistent with the client-side results rendered by react-intl
    if(this.state.isMounted) {
      fDate = <FormattedDate value={ dateTime } day="numeric" month="numeric" year="numeric" />
    }

    return (
      <span className={classNames(styles['publish-date'], commonStyles['desc-text-color'])}>
        {fDate}
      </span>
    )
  }
}
