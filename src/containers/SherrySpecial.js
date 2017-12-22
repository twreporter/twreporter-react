import { Article, mapStateToProps } from './Article'
import { connect } from 'react-redux'
import FadeText from '@twreporter/react-components/lib/fade-text'
import customizedPathSet from '../constants/customized-article-path'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import twreporterRedux from '@twreporter/redux'
import withLayout, { defaultTheme } from '../helpers/with-layout'
import ZoomInImage from '../components/article/zoom-in-leading-image'

const _ = {
  get
}

const setting = {
  fadeText: {
    style: {
      background: 'black',
      fontColor: 'white'
    },
    duration: {
      textInOut: 5,
      bgOut: 1
    },
    frame: {
      one: '父母吸毒、家人入獄、貧困、失業、重病……台灣每年至少2萬名少年，在這樣的風險環境裡成長生活。',
      two: '他們為金錢憂慮、被教育和社會排除，他們很早進入童工之門、放棄學習。',
      three: '對這群少年而言，活下去，都是一場搏鬥。'
    }
  },
  zoomInImage: {
    duration: {
      imageZoomIn: 3,
      textIn: 1
    }
  }
}

const fadeText = setting.fadeText
const zoomInImage = setting.zoomInImage
const textArr = [ fadeText.frame.one, fadeText.frame.two, fadeText.frame.three ]


const { actions } = twreporterRedux
const { fetchAFullPost } = actions
const IF_DELEGATE_IMAGE = true

const params = { slug: customizedPathSet.HIGH_RISK_YOUTH }

class SherrySpecial extends Article {
  static fetchData(props) {
    const { store, pathname } = props
    const regexp = /[^\/]+(?=\/$|$)/
    const slug = _.get(pathname.match(regexp), 0, '')
    const localProps = {
      store,
      params: {
        slug
      }
    }
    return Article.fetchData(localProps)
  }

  render() {
    const { entities, theme, location } = this.props
    const originalPathname = _.get(location, 'pathname', '')
    return (
      <div>
        <FadeText.component
          bgColor={fadeText.style.background}
          textArr={textArr}
          fontColor={fadeText.style.fontColor}
          duration={fadeText.duration.textInOut}
          bgOutDuration={fadeText.duration.bgOut}
          ifLock={false}
          ifUnlock={false}
        />
        {
          IF_DELEGATE_IMAGE ?
          <ZoomInImage
            theme={theme}
            entities={entities}
            params={params}
            pathname={originalPathname}
            totalDelay={fadeText.duration.textInOut * textArr.length + fadeText.duration.bgOut}
            imageDuration={zoomInImage.duration.imageZommIn}
            textDuration={zoomInImage.duration.textIn}
          /> : null
        }
        {super.render()}
      </div>
    )
  }
}

const enhancedMapStateToProps = (state) => {
  const superProps = mapStateToProps(state)
  superProps.ifDelegateImage = IF_DELEGATE_IMAGE
  superProps.params = params
  return superProps
}

SherrySpecial.propTypes = {
  entities: PropTypes.object,
  selectedPost: PropTypes.object,
  theme: PropTypes.object,
  params: PropTypes.object,
  ifDelegateImage: PropTypes.bool
}

SherrySpecial.defaultProps = {
  entities: {},
  selectedPost: {},
  theme: defaultTheme,
  params: {},
  ifDelegateImage: false
}

export default connect(enhancedMapStateToProps, { fetchAFullPost })(withLayout(SherrySpecial, { lockSrcollY: true }))
