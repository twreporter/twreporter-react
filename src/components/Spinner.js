import { google } from '@twreporter/core/lib/constants/storage'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const spinnerLogoUrl = `${google.schema}://${google.hostname}/${google.bucket}/images/spinner-logo.gif`

const Container = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  opacity: ${props => (props.show ? '1' : '0')};
  transition: opacity 0.5s ease;
`

const LoadingSpinner = props => (
  <Container show={props.show} className={props.className}>
    <img src={replaceGCSUrlOrigin(spinnerLogoUrl)} alt={props.alt} />
  </Container>
)

LoadingSpinner.propTypes = {
  show: PropTypes.bool,
  alt: PropTypes.string,
  className: PropTypes.string,
}

LoadingSpinner.defaultProps = {
  show: true,
  alt: '載入中...',
}

export default LoadingSpinner
