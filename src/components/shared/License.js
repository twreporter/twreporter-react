import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { colors, lineHeight, typography } from '../../themes/common-variables'

const Text = styled.p`
  color: ${colors.gray.gray50};
  font-size: ${typography.font.size.medium};
  line-height: ${lineHeight.lineHeightBase};
`

const Container = styled.div`
  text-align: center;
  padding: 15px 24px 15px 24px;
`

export default class License extends React.PureComponent {

  static defaultProps = {
    publishedDate: ''
  }
  static propTypes = {
    license: PropTypes.string.isRequired,
    publishedDate: PropTypes.string
  }

  _extractYear(publishedDate) {
    const date = publishedDate ? new Date(publishedDate) : new Date()
    return date.getFullYear()
  }

  render() {
    const { license, publishedDate } = this.props
    const year = this._extractYear(publishedDate)
    let licenseJSX = ''

    if (license.toLowerCase() === 'copyrighted') {
      licenseJSX = <Text>© { year } All rights Reserved</Text>
    } else {
      licenseJSX = <Text>本文依 CC 創用姓名標示-非商業性-禁止改作3.0台灣授權條款釋出</Text>
    }

    return (
      <Container>
        {licenseJSX}
      </Container>
    )
  }
}

