import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
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
    return (
      <span itemProp="datePublished" className={classNames(styles['publish-date'], commonStyles['desc-text-color'])}>
        {date2yyyymmdd(date, '.')}
      </span>
    )
  }
}
