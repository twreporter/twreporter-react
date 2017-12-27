import React from 'react'
import AlgoliaLogo from '../../../static/asset/algolia-logo.svg'
import styles from './Powered.scss'

const SearchByAlgolia = () => (
  <a className={styles['algolia-logo']} href="https://www.algolia.com">
    <AlgoliaLogo />
  </a>
)

export default SearchByAlgolia
