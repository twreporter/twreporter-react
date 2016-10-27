'use strict'
import React from 'react'
import styles from './AuthorList.scss'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'

const _ = {
  forEach: forEach,
  get: get
}

const AuthorItem = (props) => {
  return (
    <div className={styles.authorItem}>
      <img src={props.imgUrl} alt={props.authorName} className={styles.authorImg} />
      <div className={styles.authorName} >{props.authorName}</div>
    </div>
  )
}

AuthorItem.propTypes = {
  imgUrl: React.PropTypes.string,
  authorName: React.PropTypes.string
}

AuthorItem.defaultProps = {
  imgUrl: '',
  authorName: '作者名稱'
}

class AuthorList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { inHouseReporters, correspondents } = this.props
    // console.log('inHouseReporters:', inHouseReporters)
    // Rendering inHouseReporters
    let inHouseListJSX = []
    _.forEach(inHouseReporters, (ele, index) => {
      inHouseListJSX.push(
        <AuthorItem key={index} authorName={_.get(ele, 'name')} imgUrl={_.get(ele, 'imgUrl')} />
      )}
    )
    // Rendering correspondent
    let corresListJSX =[]
    _.forEach(correspondents, (ele, index) => {
      corresListJSX.push(
        <AuthorItem key={index} authorName={_.get(ele, 'name')} imgUrl={_.get(ele, 'imgUrl')} />
      )}
    )
    return (
      <div className={styles.authorList} >
        {corresListJSX}
        {inHouseListJSX}
      </div>)
  }
}

AuthorList.propTypes = {
  inHouseReporters: React.PropTypes.array,
  correspondents: React.PropTypes.array
}

AuthorList.defaultProps = {
  inHouseReporters: [],
  correspondents: []
}

export default AuthorList
