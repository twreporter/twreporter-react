import Loadable from '@loadable/component'
import PropTypes from 'prop-types'
import React from 'react'
// assets
import anim1 from '../../../../static/asset/about-us/animation/section1-1.json'
import anim2 from '../../../../static/asset/about-us/animation/section1-2.json'
import anim3 from '../../../../static/asset/about-us/animation/section1-3.json'
const Lottie = Loadable(() =>
  import(/* webpackChunkName: "lottie" */ '../utils/lottie')
)

const LoadableLottie = ({ dataIndex = 0, options = {}, ...props }) => {
  const animations = [anim1, anim2, anim3]
  const lottieOptions = options
  lottieOptions.animationData = animations[dataIndex]

  return <Lottie options={lottieOptions} {...props} />
}
LoadableLottie.propTypes = {
  dataIndex: PropTypes.number,
  options: PropTypes.object,
}

export default LoadableLottie
