import React from 'react'
import algoliaLogo from '../../../static/asset/algolia-logo.svg'
import styles from './Powered.scss'

const SearchByAlgolia = () => (
  <a className={styles['algolia-logo']} href="https://www.algolia.com">
    <img src={algoliaLogo} alt="search by algolia" />
  </a>
)

export default SearchByAlgolia
