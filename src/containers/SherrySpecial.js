import { Article, mapStateToProps } from './Article'
import React, { PureComponent } from 'react'
import recognizer, { twrSubstring } from '../helpers/url-recognizer'
import withLayout, { defaultTheme } from '../helpers/with-layout'

import { FadeText } from '@twreporter/react-components'
import ZoomInImage from '../components/article/zoom-in-leading-image'
import { connect } from 'react-redux'
import get from 'lodash/get'
import twreporterRedux from '@twreporter/redux'

const _ = {
  get
}


// Fade Text Style
const BG_COLOR = 'black'
const FONT_COLOR = 'white'
// Frame Text
const FRAME_ONE = '父母吸毒、家人入獄、家庭分崩離析，台灣每年至少2萬名少年成長在這樣的環境。'
const FRAME_TWO = '他們很早進入童工之門，做著高風險低薪的零工，被迫承擔大人的責任。'
const FRMAE_THREE = '對這群少年而言，活下去，都是一場搏鬥。'
// FadeText Duration Setting
const FadeTextDuration = 5
const bgOutDuration = 1
// ZoomInImage Duration Setting
const imageDuration = 3
const textDuration = 1

const textArr = [ FRAME_ONE, FRAME_TWO, FRMAE_THREE ]

const { actions } = twreporterRedux
const { fetchAFullPost } = actions
const IF_DELEGATE_IMAGE = true


class SherrySpecial extends PureComponent {
  static fetchData(props) {
    return Article.fetchData(props)
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { fetchAFullPost, entities, selectedPost, theme, location } = this.props
    const originalPathname = _.get(location, 'pathname', '')
    const pathname = twrSubstring(originalPathname)
    const params = recognizer({}, pathname)
    return (
      <div>
        <FadeText
          bgColor={BG_COLOR}
          textArr={textArr}
          fontColor={FONT_COLOR}
          duration={FadeTextDuration}
          bgOutDuration={bgOutDuration}
        />
        {
          IF_DELEGATE_IMAGE ?
          <ZoomInImage
            theme={theme}
            entities={entities}
            params={params}
            pathname={originalPathname}
            totalDelay={FadeTextDuration * textArr.length + bgOutDuration}
            imageDuration={imageDuration}
            textDuration={textDuration}
          /> : null
        }
        <Article
          fetchAFullPost={fetchAFullPost}
          entities={entities}
          selectedPost={selectedPost}
          theme={theme}
          params={params}
          ifDelegateImage={IF_DELEGATE_IMAGE}
        />
      </div>
    )
  }
}


SherrySpecial.propTypes = {
  entities: React.PropTypes.object,
  selectedPost: React.PropTypes.object,
  theme: React.PropTypes.object,
  params: React.PropTypes.object
}

SherrySpecial.defaultProps = {
  entities: {},
  selectedPost: {},
  theme: defaultTheme,
  params: {}
}

export default connect(mapStateToProps, { fetchAFullPost })(withLayout(SherrySpecial))
