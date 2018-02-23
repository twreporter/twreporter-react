import { colors } from '../themes/common-variables'
import PropTypes from 'prop-types'

const bright = 'bright'
const dark = 'dark'
const titlePositionAbove = 'title-above'
const titlePositionUponLeft = 'title-upon-left'
const headerPositionUpon = 'header-upon'
const headerPositionAbove = 'header-above'

const themePropTypes = PropTypes.shape({
  color: PropTypes.shape({
    bg: PropTypes.string,
    font: PropTypes.string,
    footerBg: PropTypes.string,
    logo: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    topic: PropTypes.string
  }),
  position: PropTypes.shape({
    header: PropTypes.string,
    title: PropTypes.string
  })
})

const defaultTheme = {
  color: {
    bg: colors.gray.lightGray,
    font: colors.gray.gray25,
    footerBg: '#cdcdcd',
    logo: dark,
    subtitle: 'gray',
    title: colors.gray.gray25,
    topic: colors.primaryColor
  },
  position: {
    header: headerPositionAbove,
    title: titlePositionAbove
  }
}

const photoTheme = {
  color: {
    bg: colors.photographyColor,
    font: colors.white,
    footerBg: colors.photographyColor,
    logo: bright,
    subtitle: 'gray',
    title: colors.white,
    topic: colors.primaryColor
  },
  position: {
    header: headerPositionAbove,
    title: titlePositionAbove
  }
}

export default {
  defaultTheme,
  photoTheme,
  position: {
    header: {
      above: headerPositionAbove,
      upon: headerPositionUpon
    },
    title: {
      above: titlePositionAbove,
      uponLeft: titlePositionUponLeft
    }
  },
  themePropTypes,
  tone: {
    bright,
    dark
  }
}
