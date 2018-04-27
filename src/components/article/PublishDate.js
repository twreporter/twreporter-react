/*eslint no-unused-vars:0*/
'use strict'
import { date2yyyymmdd } from '../../utils/date'
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

    return (
      <span itemProp="datePublished" className={classNames(styles['publish-date'], commonStyles['desc-text-color'])}>
        {fDate}
      </span>
    )
  }
}
