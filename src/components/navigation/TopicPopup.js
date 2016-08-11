import _ from 'lodash'
import { Link } from 'react-router'
import { LINK_PREFIX, CHARACTERS_LIMIT } from '../../constants/index'
import { shortenString } from '../../lib/string-processor'
import classNames from 'classnames'
//import commonStyles from '../article/Common.scss'
import closeIcon from '../../../static/asset/icon-navbar-close.svg'
import LazyLoad from 'react-lazy-load'
import React, { Component } from 'react'
import styles from './TopicPopup.scss'

const Topic = (props) => {
  const { data, articleId } = props
  const isCurrentViewing = _.get(data, 'id', '') === articleId
  const link =  LINK_PREFIX.ARTICLE + _.get(data, 'slug', '')
  const heroImgUrl = _.get(data, [ 'heroImage', 'image', 'resizedTargets', 'mobile', 'url' ], null)
  const currentClass = isCurrentViewing ? styles['current'] : null

  const topic = <div className={classNames(styles['topic'], currentClass)}>
          <div className={styles['img-outer']}>
            <div className={styles['img-box']}>
              <LazyLoad>
                <img className={styles['crop']} src={heroImgUrl}/>
              </LazyLoad>
            </div>
          </div>
          <div className={styles['text-box']}>
            <h3 className={styles['article-title']}>{data.title}</h3>
            <p className={styles['article-desc']}>{shortenString(data.ogDescription, CHARACTERS_LIMIT.TOPIC_DESC)}</p>
          </div>
        </div>
  const topicBox = isCurrentViewing ? <div> { topic } </div> : <Link to={link}> { topic } </Link>

  return (
    <div className="col-md-12 col-lg-6">
      {topicBox}
    </div>
  )
}

export default class TopicPopup extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { isOpen, onTopicBtnClick, pageTopic, topicArr, articleId } = this.props
    const uniqTopics = _.uniq(topicArr)
    let displayClass = isOpen ? styles.open : styles.close
    let topicList = []

    for(let i=0; i<uniqTopics.length; i++) {
      topicList.push(<Topic key={i} data={uniqTopics[i]} articleId={articleId}/>)
    }

    return (
      <div className={classNames(styles.popup, displayClass)}>
        <div className={styles.closeBtn} onClick={onTopicBtnClick}>
          <img src={closeIcon} />
        </div>
        <div className={styles['topic-wrapper']}>
          <div className={classNames('container', styles['list-outer'])}>
            <div className="row text-center">
              <h2 className={styles['topic-title']}> {pageTopic} </h2>
            </div>
            <div className="row">
              {topicList}
            </div>
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
