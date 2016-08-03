import React, { Component } from 'react'
import styles from './TopicPopup.scss'
import classNames from 'classnames'
import { LINK_PREFIX } from '../../constants/index'
import closeIcon from '../../../static/asset/icon-navbar-close.svg'

const Topic = (props) => {
  const { data } = props
  return (
    <div className="col-md-12 col-lg-6">
      <a href={LINK_PREFIX.ARTICLE + data.slug}>{data.title}</a>
    </div>
  )
}

export default class TopicPopup extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { isOpen, onTopicBtnClick, pageTopic, topicArr } = this.props

    let displayClass = isOpen ? styles.open : styles.close
    let topicList = []

    for(let i=0; i<topicArr.length; i++) {
      topicList.push(<Topic data={topicArr[i]} />)
    }

    console.log('***topicArr', topicArr)

    return (
      <div className={classNames(styles.popup, displayClass)}>
        <div className={styles.closeBtn} onClick={onTopicBtnClick}>
          <img src={closeIcon} />
        </div>
        <div className={classNames('container', styles['list-outer'])}>
          <div className="row text-center">
            <h2 className={styles['topic-title']}> {pageTopic} </h2>
          </div>
          <div className="row">
            {topicList}
          </div>
        </div>
      </div>
    )
  }
}

TopicPopup.propTypes = {
  isOpen: React.PropTypes.bool,
  onTopicBtnClick: React.PropTypes.func,
  pageTopic: React.PropTypes.string,
  topicArr: React.PropTypes.array
}

TopicPopup.defaultProps = {
  isOpen: false,
  onTopicBtnClick: null,
  pageTopic: '',
  topicArr: []
}
