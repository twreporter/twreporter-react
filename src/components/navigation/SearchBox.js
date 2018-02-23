'use strict'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SearchIcon from '../../../static/asset/search.svg'
import WhiteSearchIcon from '../../../static/asset/white-search-icon.svg'
import cx from 'classnames'
import pt from '../../constants/page-themes'
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
      [styles.dark]: theme === pt.tone.dark
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
  handleToggle: PropTypes.func,
  theme: PropTypes.string
}

SearchInput.defaultProps = {
  handleToggle: undefined,
  theme: pt.tone.bright
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
    const Icon = theme === pt.tone.bright ? SearchIcon : WhiteSearchIcon

    return (
      <div className={cx(styles['search-box-container'], expandClass)}>
        <div className={styles['visible-xs']}>
          <a href={`/${SEARCH_PATH}`}>
            <Icon />
          </a>
        </div>
        <div className={styles['hidden-xs']}>
          <Icon onClick={this._handleToggle.bind(this, true)} />
          <SearchInput handleToggle={this._handleToggle.bind(this)} isToggled={isToggled} theme={theme}/>
        </div>
      </div>
    )
  }
}

SearchBox.propTypes = {
  theme: PropTypes.string
}

SearchBox.defaultProps = {
  theme: pt.tone.bright
}
