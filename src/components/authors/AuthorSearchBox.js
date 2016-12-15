import React from 'react'
import { SEARCHING_AUTHOR_NAME } from '../../constants/authors-list'
import searchIcon from '../../../static/asset/search.svg'
import resetIcon from '../../../static/asset/reset.svg'
import styles from './AuthorSearchBox.scss'

const AuthorSearchBox = () => {

  function _handleButton() {
    event.preventDefault()
    console.log('click') // eslint-disable-line
  }

  return (<div>
    <div className={styles['searchbox-wrapper']}>
      <form noValidate="novalidate" onSubmit={()=>{return false}} className={styles['searchbox']}>
        <input type="search" name="searchAuthor" placeholder={SEARCHING_AUTHOR_NAME} className={styles['input-box']} required="required" />
        <button type="button" className={styles['submit-button']} onClick={_handleButton.bind(this)}>
          <img src={searchIcon}/>
        </button>
        <button type="reset" title="Clear the search query." className={styles['reset-button']}>
          <img src={resetIcon}/>
        </button>
      </form>
    </div>
  </div>)
}

export default AuthorSearchBox
