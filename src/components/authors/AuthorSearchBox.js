import PropTypes from 'prop-types'
import React from 'react'
import { SEARCHING_AUTHOR_NAME } from '../../constants/authors-list'
import SearchByAlgolia from '../powered/Algolia'
import resetIcon from '../../../static/asset/reset.svg'
import searchIcon from '../../../static/asset/search.svg'
import styles from './AuthorSearchBox.scss'
import get from 'lodash/get'

const _ = {
  get
}

class AuthorSearchBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState = { keywords: '' }
    this._handleClickButton = this._handleClickButton.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._handleChange = this._handleChange.bind(this)
    this._handleClickReset = this._handleClickReset.bind(this)
    this.sendSearchAuthors = this.props.sendSearchAuthors.bind(this)
  }

  // Save user input keywords to this.state when typing
  _handleChange(event) {
    event.preventDefault()
    const input = _.get(event, 'target.value', '')
    return this.setState({ keywords: input })
  }

  // Send search request when submit the form (press enter) or click the button
  _handleSubmit(event) {
    event.preventDefault()
    const keywords = this.state.keywords
    this.sendSearchAuthors(keywords)
    if (keywords === '') {
      return this.props.changeListTo('authorsList')
    }
    return this.props.changeListTo('searchedAuthorsList')
  }

  _handleClickButton(event) {
    event.preventDefault()
    const keywords = this.state.keywords
    this.sendSearchAuthors(keywords)
    if (keywords === '') {
      return this.props.changeListTo('authorsList')
    }
    return this.props.changeListTo('searchedAuthorsList')
  }

// Clear the search input and state and send blank search when click reset
  _handleClickReset(event) {
    event.preventDefault()
    this.setState(this.initialState)
    return this.props.changeListTo('authorsList')
  }

  render() {
    return (
      <div className={styles['searchbox-wrapper']}>
        <form noValidate="novalidate"
          className={styles['searchbox']}
          onReset={this._handleChange}
          onSubmit={this._handleSubmit} >
          <input
            type="search"
            className={styles['input-box']}
            name="searchAuthor"
            value={this.state.keywords}
            placeholder={SEARCHING_AUTHOR_NAME}
            onChange={this._handleChange}
            autoComplete="off"
            required="required" />
          <button
            type="button"
            className={styles['submit-button']}
            onClick={this._handleClickButton}>
            <img src={searchIcon}/>
          </button>
          <button
            type="reset"
            className={styles['reset-button']}
            title="Clear the search query."
            onClick={this._handleClickReset}>
            <img src={resetIcon}/>
          </button>
        </form>
        <SearchByAlgolia />
      </div>
    )
  }
}

AuthorSearchBox.propTypes = {
  sendSearchAuthors: PropTypes.func.isRequired,
  changeListTo: PropTypes.func.isRequired
}

export default AuthorSearchBox
