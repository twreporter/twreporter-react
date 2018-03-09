import { colors, font } from '../constants/styles'
import { screen } from '../utils/screen'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  color: ${colors.secondary};
  padding-left: 15px;
  border-left: 1px solid ${colors.secondary};
  ${screen.mobile`
    margin-bottom: 27px;
  `}
  ${screen.tabletAbove`
    margin-bottom: 44px;
  `}
`

const Chinese = styled.div`
  font-family: ${font.family.chinese};
  font-weight: ${font.weight.bold};
  font-size: 16px;
  letter-spacing: 3.8px;
  white-space: nowrap;
`

const English = styled.div`
  font-family: ${font.family.english.roboto};
  font-style: italic;
  font-weight: ${font.weight.bold};
  font-size: 14px;
  margin-top: .5em;
  letter-spacing: .3px;
  white-space: nowrap;
`


export default class CategoriesTitle extends PureComponent {
  static propTypes = {
    chinese: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired
  }

  render() {
    const { chinese, english } = this.props
    return (
      <Container>
        {!chinese ? null : <Chinese>{chinese}</Chinese> }
        {!english ? null : <English>{english}</English>}
      </Container>
    )
  }
}
