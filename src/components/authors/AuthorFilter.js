'use strict'
import React from 'react'
import styles from './AuthorList.scss'


class AuthorFilter extends React.Component {
  constructor(props) {
    super(props)
    this._handleChange = this._handleChange.bind(this)
  }

  render() {
    return (<div className={styles.authorSearch}><input value={this.props.keyword} ref="keyword" type="text" placeholder="input search keyword" onChange={this._handleChange} /></div>)
  }

  _handleChange() {
    // console.log('input change')
    this.props.passKeyword(this.refs.keyword.value)
  }
}

export default AuthorFilter
