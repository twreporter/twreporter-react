'use strict'
import React from 'react'
import styles from './AuthorList.scss'


class AuthorFilter extends React.Component {
  constructor(props) {
    super(props)
    this._handleChange = this._handleChange.bind(this)
  }

  render() {
    return (<div className={styles.authorSearch}><input type="text" placeholder="input search keyword" onChange={this._handleChange} /></div>)
  }

  _handleChange(event) {
    // console.log('input change')
    let k = event.target.value
    this.props.passKeyword(k)
  }
}

export default AuthorFilter
