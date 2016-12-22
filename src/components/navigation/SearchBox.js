'use strict'
import React, { Component } from 'react'
import cx from 'classnames'
import searchIcon from '../../../static/asset/search.svg'
import whiteSearchIcon from '../../../static/asset/white-search-icon.svg'
import styles from './SearchBox.scss'
import { BRIGHT, DARK } from '../../constants/index'

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
    if (typeof this.props.handleToggle === 'function') {
      this.props.handleToggle(isToggled)
    }
  }

  _handleSubmit(event) {
    event.preventDefault()
    window.location=`/${SEARCH_PATH}?q=${this.state.input}`
  }

  render() {
    const { theme } = this.props
    const themeStyle = {
      [styles.dark]: theme === DARK
    }
    if (this.props.isToggled) {
      return (
        <form className={styles['search-form']} onSubmit={this.handleSubmit}>
          <input
            className={cx(styles['search-input'], themeStyle)}
            ref="searchInput"
            type="text"
            placeholder="搜尋報導者文章"
            onChange={this.handleInputChange}
            onBlur={this.handleBlur}
          />
        </form>
      )
    }
    return null
  }
}

SearchInput.propTypes = {
  handleToggle: React.PropTypes.func,
  theme: React.PropTypes.string
}

SearchInput.defaultProps = {
  handleToggle: undefined,
  theme: BRIGHT
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
    const { theme } = this.props
    const { isToggled } = this.state
    const expandClass = {
      [styles.expand]: isToggled
    }
    const imgSrc = theme === BRIGHT ? searchIcon : whiteSearchIcon

    return (
      <label className={cx(styles['search-box-container'], expandClass)}>
        <div className="visible-xs">
          <a href={`/${SEARCH_PATH}`}>
            <img src={imgSrc}/>
          </a>
        </div>
        <div className="hidden-xs">
          <img src={imgSrc} onClick={this._handleToggle.bind(this, true)}/>
          <SearchInput handleToggle={this._handleToggle.bind(this)} isToggled={isToggled} theme={theme}/>
        </div>
      </label>
    )
  }
}

SearchBox.propTypes = {
  theme: React.PropTypes.string
}

SearchBox.defaultProps = {
  theme: BRIGHT
}
