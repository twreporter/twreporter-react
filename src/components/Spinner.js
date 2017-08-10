import React from 'react'
import { google } from '../conf/storage'
import { replaceStorageUrlPrefix } from '../utils/url-processor'

const spinnerLogoUrl = `${google.schema}://${google.hostname}/${google.bucket}/images/spinner-logo.gif`

const LoadingSpinner = (props) => (
  <div className={props.className}>
    <img src={replaceStorageUrlPrefix(spinnerLogoUrl)} alt={props.alt}/>
  </div>
)

LoadingSpinner.propTypes = {
  alt: React.PropTypes.string,
  className: React.PropTypes.string
}

LoadingSpinner.defaultProps = {
  alt: '資料載入中'
}

export default LoadingSpinner
