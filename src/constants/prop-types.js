import PropTypes from 'prop-types'

const img = PropTypes.shape({
  height: PropTypes.number,
  width: PropTypes.number,
  url: PropTypes.string,
})

const imgSet = PropTypes.shape({
  tiny: img,
  mobile: img,
  desktop: img,
  tablet: img,
  original: img,
})

const imgSizes = PropTypes.shape({
  tablet: PropTypes.string,
  desktop: PropTypes.string,
  hd: PropTypes.string,
})

const imgObj = PropTypes.shape({
  description: PropTypes.string,
  url: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  copyright: PropTypes.string,
  resizedTargets: PropTypes.shape({
    mobile: img,
    tablet: img,
    desktop: img,
    tiny: img,
  }),
})

const videoObj = PropTypes.shape({
  filetype: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
})

const theme = PropTypes.shape({
  color: PropTypes.shape({
    bg: PropTypes.string,
    font: PropTypes.string,
    footerBg: PropTypes.string,
    logo: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    topic: PropTypes.string,
  }),
  position: PropTypes.shape({
    header: PropTypes.string,
    title: PropTypes.string,
  }),
})

export default {
  img,
  imgSet,
  imgSizes,
  imgObj,
  theme,
  videoObj,
}
