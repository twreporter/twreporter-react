import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { CinemagraphHelper } from 'twreporter-react-components'
import desktopBg from '../../static/asset/cinemagraph/q2-01-what-is-going-on-in-syria-desktop_BG.jpg'
import tabletBg from '../../static/asset/cinemagraph/q2-01-what-is-going-on-in-syria-tablet_BG.jpg'
import mobileBg from '../../static/asset/cinemagraph/q2-01-what-is-going-on-in-syria-desktop_BG.jpg'
import desktopFg from '../../static/asset/cinemagraph/q2-01-what-is-going-on-in-syria-desktop_FG.png'
import tabletFg from '../../static/asset/cinemagraph/q2-01-what-is-going-on-in-syria-tablet_FG.png'
import mobileFg from '../../static/asset/cinemagraph/q2-01-what-is-going-on-in-syria-mobile_FG.png'
import { connect } from 'react-redux'

const cinemagraph = new CinemagraphHelper('what-is-going-on-in-syria-02')
const EFFECT_TYPES = cinemagraph.getEffectTypes()

cinemagraph.addLayer('BG')
  .setBgPosition('center center', 'mobile')
  .setBgPosition('center center', 'tablet')
  .setBgPosition('center center', 'desktop')
  .setBgSize('cover', 'mobile')
  .setBgSize('cover', 'tablet')
  .setBgSize('cover', 'desktop')
  .setImageMeta({
    id: 'slide01_BG',
    description: 'the background of slide01'
  })
  .setImagePath(mobileBg, 'mobile')
  .setImagePath(tabletBg, 'tablet')
  .setImagePath(desktopBg, 'desktop')
  .setAnimationOptions({
    duration: '3s',
    fillMode: 'both'
  })
  .setCustomKeyframes({
    from: {
      transform: 'scale(1.2) translate3d(-30px,0,0)'
    },
    to: {
      transform: 'scale(1) translate3d(0,0,0)'
    }
  }, 'all')
  .setAnimationName('all')

cinemagraph.addLayer('FG')
  .setImageMeta({
    id: 'slide01_FG',
    description: 'the foreground of slide01'
  })
  .setAnimationOptions({
    duration: '3s',
    fillMode: 'both'
  }, 'all')
  .setImagePath(mobileFg, 'mobile')
  .setBgPosition('center center', 'mobile')
  .setBgSize('contain', 'mobile')
  .setKeyframesByType(EFFECT_TYPES.MOVE_Y, '0', '-40px', 'mobile')
  .setKeyframesByType(EFFECT_TYPES.SCALE, '1', '3', 'mobile')
  .setAnimationName('mobile')
  .setImagePath(tabletFg, 'tablet')
  .setBgPosition('center center', 'tablet')
  .setBgSize('cover', 'tablet')
  .setKeyframesByType(EFFECT_TYPES.MOVE_Y, '0', '50px', 'tablet')
  .setKeyframesByType(EFFECT_TYPES.MOVE_X, '0', '-240px', 'tablet')
  .setKeyframesByType(EFFECT_TYPES.SCALE, '2', '4', 'tablet')
  .setAnimationName('tablet')
  .setImagePath(desktopFg, 'desktop')
  .setBgPosition('center center', 'desktop')
  .setBgSize('cover', 'desktop')
  .setKeyframesByType(EFFECT_TYPES.SCALE, '4', '1', 'desktop')
  .setAnimationName('desktop')

const Cinemagraph = cinemagraph.getComponent()

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
`

const ReRenderBtn = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, .6);
  z-index: 99;
`

class SlideContainer extends PureComponent {
  constructor(props) {
    super(props)
    this._handleFocus = this._handleFocus.bind(this)
    this.state = {
      isFocus: true
    }
  }

  _handleFocus() {
    this.setState({
      isFocus: !this.state.isFocus
    })
  }

  render() {
    return (
      <Container>
        <Cinemagraph isFocus={this.state.isFocus} />
        <ReRenderBtn onClick={this._handleFocus} />
      </Container>
    )
  }
}

const Slides = () => (
  <div>
    <SlideContainer />
  </div>
)

export default connect()(Slides)
