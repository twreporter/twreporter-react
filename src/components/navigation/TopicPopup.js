import { Link } from 'react-router'
import { CHARACTERS_LIMIT, LINK_PREFIX, INTERACTIVE_ARTICLE_STYLE } from '../../constants/index'
import { replaceStorageUrlPrefix } from '../../utils/index'
import { shortenString } from '../../utils/index'
import classNames from 'classnames'
//import commonStyles from '../article/Common.scss'
import closeIcon from '../../../static/asset/icon-navbar-close.svg'
import LazyLoad from 'react-lazyload'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styles from './TopicPopup.scss'
import logoIcon from '../../../static/asset/icon-placeholder.svg'

// lodash
import get from 'lodash/get'
import uniq from 'lodash/uniq'

const Topic = (props) => {
  const { data, articleId } = props
  const isCurrentViewing = get(data, 'id', '') === articleId
  const style = get(data, 'style')
  const slug = get(data, 'slug', '')
  const link = style === INTERACTIVE_ARTICLE_STYLE ? LINK_PREFIX.INTERACTIVE_ARTICLE + slug : LINK_PREFIX.ARTICLE + slug
  const heroImgUrl = replaceStorageUrlPrefix(get(data, [ 'heroImage', 'resizedTargets', 'mobile', 'url' ], null))
  const currentClass = isCurrentViewing ? styles['current'] : null

  const topic = <div className={classNames(styles['topic'], currentClass)}>
    <div className={styles['img-outer']}>
      <div className={styles['img-box']}>
        <img src={logoIcon} className={styles['logo-icon']}/>
        <LazyLoad once={true}>
          <img className={styles['crop']} src={heroImgUrl}/>
        </LazyLoad>
      </div>
    </div>
    <div className={styles['text-box']}>
      <h3 className={styles['article-title']}>{data.title}</h3>
      <p className={styles['article-desc']}>{shortenString(data.ogDescription, CHARACTERS_LIMIT.TOPIC_DESC)}</p>
    </div>
  </div>
  const topicBox = isCurrentViewing ? <div> { topic } </div> : <Link to={link} target={style === INTERACTIVE_ARTICLE_STYLE ? '_blank' : undefined}> { topic } </Link>

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
    const uniqTopics = uniq(topicArr)
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
  isOpen: PropTypes.bool,
  onTopicBtnClick: PropTypes.func,
  pageTopic: PropTypes.string,
  topicArr: PropTypes.array
}

TopicPopup.defaultProps = {
  isOpen: false,
  onTopicBtnClick: null,
  pageTopic: '',
  topicArr: []
}
