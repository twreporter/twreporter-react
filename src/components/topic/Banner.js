import { addStylesToPropsDecorator } from '../shared/ComponentDecorators'
import { date2yyyymmdd } from '../../utils/date'
import { TOPIC_LAST_UPDATED } from '../../constants/index'
import ArrowDownIcon from '../../../static/asset/arrow-down.svg'
import PropTypes from 'prop-types'
import React from 'react'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
import stylesBottom from './BannerBottom.scss'
import stylesBottomLeft from './BannerBottomLeft.scss'
import stylesCenter from './BannerCenter.scss'

const Container = styled.div`
  width: 100%;
  height: ${props => props.viewportHeight};
  position: relative;
  top: 0;
  left: 0;
  overflow: hidden;
`

class Banner extends React.PureComponent {
  constructor(props) {
    super(props)
    this._scrollToNextSection = this._scrollToNextSection.bind(this)
    this._refContainer = this._refContainer.bind(this)
  }

  _scrollToNextSection(e) {
    e.preventDefault()
    if (this._container) {
      smoothScroll(this._container.offsetHeight || this._container.clientHeight)
    }
  }

  /**
   * Add tail space when head is a fullwidth bracket for visually centering
   *
   * @param {string} text
   * @returns {string}
   * @memberof Banner
   */
  _addTailSpaceIfHeadIsFullwidthBracket(text) {
    if (typeof text === 'string') {
      const leftBrackets = [ '（', '【', '〔', '《', '〈', '｛', '『', '「' ]
      for (let i=0, length=leftBrackets.length; i<length; i++) {
        if (typeof text === 'string' && text.startsWith(leftBrackets[i])) {
          return (text + '  ')
        }
      }
    }
    return text
  }

  _refContainer(ele) {
    this._container = ele
  }

  render() {
    const { headline, title, subtitle, publishedDate, styles, viewportHeight, backgroundElement } = this.props
    return (
      <Container innerRef={this._refContainer} viewportHeight={viewportHeight} >
        {backgroundElement}
        <div className={styles['infos-flex-wrapper']} >
          {!headline ? null : <div className={styles['headline']} >{this._addTailSpaceIfHeadIsFullwidthBracket(headline)}</div>}
          <h1 className={styles['title']} >{title}</h1>
          {!subtitle ? null : <h2 className={styles['subtitle']} >{subtitle}</h2>}
          <div className={styles['dash']} ></div>
          {!publishedDate ? null : <div className={styles['published-date']} >{date2yyyymmdd(publishedDate, '.')+' '+TOPIC_LAST_UPDATED}</div>}
          <div className={styles['arrow-down-icon-wrapper']} onClick={this._scrollToNextSection} >
            <ArrowDownIcon />
          </div>
        </div>
      </Container>
    )
  }
}

Banner.defaultProps = {
  viewportHeight: '100vh'
}

Banner.propTypes = {
  backgroundElement: PropTypes.element.isRequired,
  viewportHeight: PropTypes.string,
  styles: PropTypes.object.isRequired,
  infosData: PropTypes.shape({
    headline: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired
  })
}

export default class BannerFactory {
  constructor() {
    this.CenterBanner = addStylesToPropsDecorator(Banner, stylesCenter)
    this.BottomLeftBanner = addStylesToPropsDecorator(Banner, stylesBottomLeft)
    this.BottomBanner = addStylesToPropsDecorator(Banner, stylesBottom)
  }
  buildWithTheme(themeName) {
    switch (themeName) {
      case 'center':
        return this.CenterBanner
      case 'bottom-left':
        return this.BottomLeftBanner
      case 'bottom':
        return this.BottomBanner
      default:
        return this.CenterBanner
    }
  }
}
