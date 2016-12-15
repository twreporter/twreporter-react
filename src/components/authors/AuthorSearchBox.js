import React from 'react'
import { SEARCHING_AUTHOR_NAME } from '../../constants/authors-list'
import resetIcon from '../../../static/asset/reset.svg'
import searchIcon from '../../../static/asset/search.svg'
import styles from './AuthorSearchBox.scss'

class AuthorSearchBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState = { keywords: '' }
    this._handleClickButton = this._handleClickButton.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._handleChange = this._handleChange.bind(this)
  }

  _handleChange(event) {
    event.preventDefault()
    const input = event.target.value
    if (!input) return this.setState(this.initialState)
    this.setState({ keywords: input })
    console.log('change')// eslint-disable-line
  }

  _handleSubmit(event) {
    event.preventDefault()
    console.log('submit')// eslint-disable-line
    console.log(this.state.keywords)// eslint-disable-line
  }

  _handleClickButton(event) {
    event.preventDefault()
    console.log('click') // eslint-disable-line
    console.log(this.state.keywords)// eslint-disable-line
  }

  // _refCallback(input) {
  //   console.log(this)
  //   console.log(input)
  // }

  render() {
    return (<div>
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
            onClick={this._handleChange}>
            <img src={resetIcon}/>
          </button>
        </form>
      </div>
    </div>)
  }
}

export default AuthorSearchBox
