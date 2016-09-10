'use strict'
import React, { Component } from 'react'
import searchIcon from '../../../static/asset/search.svg'
import styles from './SearchBox.scss'

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
    window.location=`/search?q=${this.state.input}`
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
    return (
      <label className={styles['search-box-container']}>
        <div className="visible-xs">
          <a href="/search">
            <img src={searchIcon}/>
          </a>
        </div>
        <div className="hidden-xs">
          <img src={searchIcon} onClick={this._handleToggle.bind(this, true)}/>
          <SearchInput handleToggle={this._handleToggle.bind(this)} isToggled={this.state.isToggled}/>
        </div>
      </label>
    )
  }
}
