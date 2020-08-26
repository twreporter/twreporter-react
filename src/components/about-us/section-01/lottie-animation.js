// polyfill webpack require.ensure for node environment
import mq from '../utils/media-query'
import Loadable from 'react-loadable'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

const animationLength = 3

const Container = styled.div`
  width: 100%;
  height: 38.39%;
  ${mq.tabletOnly`
    width: 528px;
    height: 245px;
    margin: 0 auto;
  `}
  ${mq.mobileOnly`
    width: 100%;
    height: 136px;
  `}
`

export default class LottieAnim extends PureComponent {
  static propTypes = {
    animDidUpdate: PropTypes.func,
    currentAnimIndex: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.currentData = 0
  }
  _animationUpdate = () => {
    this.currentData = this.props.currentAnimIndex
    let dataIndex = ++this.currentData % animationLength
    this.props.animDidUpdate(dataIndex)
  }
  _getLottieComponent = () => {
    const modulePlaceHolder = null
    const LoadableComponent = Loadable.Map({
      loader: {
        Lottie: () =>
          import(
            /* webpackChunkName: "lottie" */
            '../utils/lottie'
          ),
        anim1: () =>
          import(
            /* webpackChunkName: "aboutus-section1-anim1" */
            '../../../../static/asset/about-us/animation/section1-1.json'
          ),
        anim2: () =>
          import(
            /* webpackChunkName: "aboutus-section1-anim2" */
            '../../../../static/asset/about-us/animation/section1-2.json'
          ),
        anim3: () =>
          import(
            /* webpackChunkName: "aboutus-section1-anim3" */
            '../../../../static/asset/about-us/animation/section1-3.json'
          ),
      },
      render(loaded, props) {
        if (loaded.Lottie) {
          const Lottie = loaded.Lottie.default
          const { anim1, anim2, anim3 } = loaded
          this.animations = [anim1, anim2, anim3]
          props.options.animationData = this.animations[props.dataIndex]
          return <Lottie {...props} />
        }
        return modulePlaceHolder
      },
      loading() {
        return modulePlaceHolder
      },
    })
    return LoadableComponent
  }
  render() {
    let options = {
      loop: true,
      autoplay: true,
    }
    const Lottie = this._getLottieComponent()
    return (
      <Container>
        <Lottie
          options={options}
          isStopped={false}
          isPaused={false}
          eventListeners={[
            {
              eventName: 'loopComplete',
              callback: () => this._animationUpdate(),
            },
          ]}
          dataIndex={this.props.currentAnimIndex}
        />
      </Container>
    )
  }
}
