'use strict'
import React from 'react'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import style from './AuthorList.scss'

const AuthorItem = (props) => {
  return (
    <div className={style.authorItem}>
      <img src={props.imgUrl} alt={props.authorName} className={style.authorImg} />
      <div className={style.authorName} >{props.authorName}</div>
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
  constructor() {
    super()
  }
  render() {
    let inHouseReporters = this.props.inHouseReporters
    // Rendering inHouseReporters
    let inHouseListJSX = []
    forEach(inHouseReporters, (ele) => {
      inHouseListJSX.push(
        <AuthorItem authorName={get(ele, 'name')} imgUrl={get(ele, 'imgUrl')} />
      )}
    )
    // Rendering correspondent
    let correspondents = this.props.correspondents
    let corresListJSX =[]
    forEach(correspondents, (ele) => {
      corresListJSX.push(
        <AuthorItem authorName={get(ele, 'name')} imgUrl={get(ele, 'imgUrl')} />
      )}
    )
    return (
      <div className={style.authorList} >
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
