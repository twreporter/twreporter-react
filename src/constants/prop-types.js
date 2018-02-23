import PropTypes from 'prop-types'

const imgPt = PropTypes.shape({
  height: PropTypes.number,
  width: PropTypes.number,
  url: PropTypes.string
})

const imgSetPt = PropTypes.shape({
  tiny: imgPt,
  mobile: imgPt,
  desktop: imgPt,
  tablet: imgPt,
  original: imgPt
})

const imgSizesPt = PropTypes.shape({
  tablet: PropTypes.string,
  desktop: PropTypes.string,
  hd: PropTypes.string
})

const imgObjPt = PropTypes.shape({
  description: PropTypes.string,
  url: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  copyright: PropTypes.string,
  resizedTargets: PropTypes.shape({
    mobile: imgPt,
    tablet: imgPt,
    desktop: imgPt,
    tiny: imgPt
  })
})

export default {
  imgPt,
  imgSetPt,
  imgSizesPt,
  imgObjPt
}
