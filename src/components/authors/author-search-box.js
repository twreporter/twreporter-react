import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
// utils
import mq from '../../utils/media-query'
// components
import PoweredByAlgolia from './algolia'
// assets
import ResetIcon from '../../../static/asset/reset.svg'
import SearchIcon from '../../../static/asset/search.svg'
// @twreporter
import { fontWeight } from '@twreporter/core/lib/constants/font'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const fadeInLeft = keyframes`
  0% {
    transform: translate(-20%, 0);
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Container = styled.div`
  margin: 0 auto;
  width: 250px;
  ${mq.tabletAndBelow`
    margin-top: 30px;
    margin-bottom: 23px;
  `}
  ${mq.desktopAndAbove`
     margin-top: 60px;
     margin-bottom: 20px;
  `}
`

const Form = styled.form`
  position: relative;
  height: 30px;
`

const Input = styled.input`
  display: inline-block;
  transition: background 0.4s ease;
  font-size: 15px;
  letter-spacing: 0.4px;
  font-weight: ${fontWeight.normal};
  border: 1px solid ${colorGrayscale.gray400};
  border-radius: 15px;
  color: ${colorGrayscale.gray800};
  background: ${colorGrayscale.gray100};
  padding: 0 48px 0 20px;
  width: 100%;
  height: 100%;
  appearance: none; /* remove platform specific styling of search input */
  &:focus {
    outline: 0;
    background: ${colorGrayscale.white};
  }
  &:active {
    outline: 0;
  }
  &::placeholder {
    color: ${colorGrayscale.gray300};
  }
`

const ResetBtn = styled.button`
  display: ${props => (props.$show ? 'block' : 'none')};
  position: absolute;
  top: 1px;
  right: 30px;
  height: 100%;
  margin: 0;
  border: 0;
  padding: 0;
  background: transparent;
  user-select: none;
  animation: ${fadeInLeft} 300ms ease;
  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: 0;
  }

  & svg {
    display: inline-block;
    margin: 4px;
    vertical-align: middle;
    width: 10px;
    height: 10px;
  }
`

const SubmitBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 100%;
  margin: 0;
  border: 0;
  border-radius: 0 15px 15px 0;
  padding: 0;
  background: transparent;
  user-select: none;

  &:hover,
  &:active {
    cursor: pointer;
  }

  &:focus {
    outline: 0;
  }

  & svg {
    width: 15px;
    height: 15px;
    vertical-align: middle;
  }
`

const AuthorSearchBox = ({ sendSearchAuthors, setSearching }) => {
  const [keywords, setKeywords] = useState('')

  // Save user input keywords to state when typing
  const handleChange = event => {
    event.preventDefault()
    const input = _.get(event, 'target.value', '')
    setKeywords(input)
  }

  // Send search request when submit the form (press enter) or click the button
  const handleSubmit = event => {
    event.preventDefault()
    sendSearchAuthors(keywords)
    setSearching(Boolean(keywords))
  }

  // Clear the search input and state and send blank search when click reset
  const handleReset = event => {
    event.preventDefault()
    setKeywords('')
    setSearching(false)
  }

  return (
    <Container>
      <Form
        noValidate="novalidate"
        onReset={handleChange}
        onSubmit={handleSubmit}
      >
        <Input
          type="search"
          name="searchAuthor"
          value={keywords}
          placeholder="搜尋作者"
          onChange={handleChange}
          autoComplete="off"
          required="required"
        />
        <SubmitBtn type="button" onClick={handleSubmit}>
          <SearchIcon />
        </SubmitBtn>
        <ResetBtn
          type="reset"
          title="Clear the search query"
          onClick={handleReset}
          $show={Boolean(keywords)}
        >
          <ResetIcon />
        </ResetBtn>
      </Form>
      <PoweredByAlgolia />
    </Container>
  )
}

AuthorSearchBox.propTypes = {
  sendSearchAuthors: PropTypes.func.isRequired,
  setSearching: PropTypes.func.isRequired,
}

export default AuthorSearchBox
