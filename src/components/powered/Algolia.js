import AlgoliaLogo from '../../../static/asset/algolia-logo.svg'
import React from 'react'
import styled from 'styled-components'

const LogoWrapper = styled.a`
  display: block;
  margin: 0 auto;
  text-align: center;
  padding: 3px 0;
  svg {
    height: 14px;
  }
`

const SearchByAlgolia = () => (
  <LogoWrapper href="https://www.algolia.com">
    <AlgoliaLogo />
  </LogoWrapper>
)

export default SearchByAlgolia
