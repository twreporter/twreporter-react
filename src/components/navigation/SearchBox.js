'use strict'
import { Link } from 'react-router'
import React, { Component } from 'react'
import classNames from 'classnames'
import searchIcon from '../../../static/asset/search.svg'
import styles from './SearchBox.scss'

const SEARCH_PATH = 'search'

class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: props.inputValue
    }
    this.handleInputChange = this._handleInputChange.bind(this)
    this.handleBlur = this._handleToggle.bind(this, false)
    this.handleSubmit = this._handleSubmit.bind(this)
  }

  _handleInputChange(event) {
    event.preventDefault()
    this.setState({ input: event.target.value })
  }

  _handleToggle(isToggled, event) { // eslint-disable-line
    this.props.handleToggle(isToggled)
  }

  _handleSubmit(event) {
    event.preventDefault()
    window.location=`/${SEARCH_PATH}?q=${this.state.input}`
  }

  render() {
    if (this.props.isToggled) {
      return (
        <form className={styles['search-form']} onSubmit={this.handleSubmit}>
          <input className={styles['search-input']} ref="searchInput" type="text" placeholder="搜尋報導者文章" onChange={this.handleInputChange} onBlur={this.handleBlur}/>
        </form>
      )
    }
    return null
  }
}

export default class SearchBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggled: false
    }
  }

  _handleToggle(isToggled, event) { // eslint-disable-line
    this.setState({
      isToggled: isToggled
    })
  }

  render() {
    let expandClass = {
      [styles.expand]: this.state.isToggled
    }
    return (
      <div className={classNames(expandClass)}>
        <label className={classNames(styles['search-box-container'], expandClass)}>
          <div className="visible-xs">
            <Link to={`/${SEARCH_PATH}`}>
              <img src={searchIcon}/>
            </Link>
          </div>
          <div className="hidden-xs">
            <img src={searchIcon} onClick={this._handleToggle.bind(this, true)}/>
            <SearchInput handleToggle={this._handleToggle.bind(this)} isToggled={this.state.isToggled}/>
          </div>
        </label>
      </div>
    )
  }
}
