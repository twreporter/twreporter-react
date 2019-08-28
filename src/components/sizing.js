import styled from 'styled-components'
import mq from '../utils/media-query'
import PropTypes from 'prop-types'

const width = {
  tablet: {
    small: 556,
    medium: 672,
    large: 768
  },
  desktop: {
    small: 664,
    medium: 833,
    large: 1024
  },
  hd: {
    small: 700,
    medium: 880,
    large: 1440
  }
}

const Sizing = styled.div`
  margin: 0 auto;
  ${mq.tabletOnly`
    max-width: ${props => width.tablet[props.size]}px;
  `}
  ${mq.desktopOnly`
    max-width: ${props => width.desktop[props.size]}px;
  `}
  ${mq.hdOnly`
    max-width: ${props => width.hd[props.size]}px;
  `}
`

Sizing.propTypes = {
  size: PropTypes.oneOf([ 'small', 'medium', 'large' ]).isRequired
}

export default Sizing
