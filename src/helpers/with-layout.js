import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Footer } from '@twreporter/react-components'
import { Header } from '@twreporter/react-components'
import { layout } from '../themes/common-variables'

// lodash
import get from 'lodash/get'
const _ = {
  get
}

const SpecialContainer = styled.div`
  background-color: ${props => props.bgColor};
  min-height: 100vh;
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
`

const Container = styled.div`
  background-color: ${props => props.bgColor};
  min-height: 100vh;
  overflow-x: hidden;
`

const HeaderContainer = styled.div`
  @media (min-width: ${layout.desktop.large}) {
    display: none;
  }
`

const DEFAULT_VALUES = {
  BG_COLOR: '#f1f1f1',
  FONT_COLOR: '#404040',
  SUBTITLE_FONT_COLOR: 'gray',
  FOOTER_BG_COLOR: '#cdcdcd',
  PHOTO_BG_COLOR: '#08192d',
  PHOTO_FONT_COLOR: '#FFFFFF',
  PHOTO_FOOTER_BG_COLOR: '#08192d',
  PHOTO_LOGO_COLOR: Header.logoColor.dark,
  HEADER_POSITION: 'header-above',
  TITLE_POSITION: 'title-above',
  TOPIC_COLOR: '#c71b0a'
}

const defaultTheme = {
  bgColor: DEFAULT_VALUES.BG_COLOR,
  fontColor: DEFAULT_VALUES.FONT_COLOR,
  footerBgColor: DEFAULT_VALUES.FOOTER_BG_COLOR,
  headerPosition: DEFAULT_VALUES.HEADER_POSITION,
  logoColor: Header.logoColor.dark,
  subtitleColor: DEFAULT_VALUES.SUBTITLE_FONT_COLOR,
  titleColor: DEFAULT_VALUES.FONT_COLOR,
  titlePosition: DEFAULT_VALUES.TITLE_POSITION,
  topicColor: DEFAULT_VALUES.TOPIC_COLOR
}

const photoTheme = {
  bgColor: DEFAULT_VALUES.PHOTO_BG_COLOR,
  fontColor: DEFAULT_VALUES.PHOTO_FONT_COLOR,
  footerBgColor: DEFAULT_VALUES.PHOTO_FOOTER_BG_COLOR,
  headerPosition: DEFAULT_VALUES.HEADER_POSITION,
  logoColor: Header.logoColor.bright,
  subtitleColor: DEFAULT_VALUES.PHOTO_FONT_COLOR,
  titleColor: DEFAULT_VALUES.PHOTO_FONT_COLOR,
  titlePosition: DEFAULT_VALUES.TITLE_POSITION,
  topicColor: DEFAULT_VALUES.TOPIC_COLOR
}

class Layout extends React.Component {
  render() {
    const { bgColor, footerBgColor, fontColor, logoColor, headerPosition, special } = this.props
    const JSXheader = <Header
      isIndex={this.props.isIndex}
      bgColor={bgColor}
      fontColor={fontColor}
      logoColor={logoColor}
      pathName={this.props.pathname}
      headerPosition={headerPosition}
      footerBgColor={footerBgColor}
    />
    const content = (() => {
      return (
        <div>
          { headerPosition === DEFAULT_VALUES.HEADER_POSITION ? (
            <div>
              { JSXheader }
            </div>
          )
           : (
            <HeaderContainer>
              { JSXheader }
            </HeaderContainer>
          )
          }
          {this.props.children}
          <Footer
            fontColor={fontColor}
            bgColor={footerBgColor}
          />
        </div>
      )
    })()
    if (special) {
      return (
        <SpecialContainer
          bgColor={bgColor}
          id="pageContainer"
        >
          {content}
        </SpecialContainer>
      )
    }
    return (
      <Container
        bgColor={bgColor}
      >
        {content}
      </Container>
    )
  }
}

Layout.propTypes = {
  bgColor: PropTypes.string,
  fontColor: PropTypes.string,
  footerBgColor: PropTypes.string,
  headerPosition: PropTypes.string,
  isIndex: PropTypes.bool,
  logoColor: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  special: PropTypes.bool
}

Layout.defaultProps = {
  bgColor: DEFAULT_VALUES.BG_COLOR,
  fontColor: DEFAULT_VALUES.FONT_COLOR,
  footerBgColor: DEFAULT_VALUES.FOOTER_BG_COLOR,
  headerPosition: DEFAULT_VALUES.HEADER_POSITION,
  isIndex: false,
  logoColor: Header.logoColor.dark,
  special: false
}

/**
 * Get react component display name
 *
 * @param {object} WrappedComponent
 * @returns {string} display name of react component
 */
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

/**
 * This function is a high order function, which add more functionality onto wrapped components.
 *
 * @param {object} WrappedComponent react component to be wrapped
 * @returns {object} React component wrapped with Layout component
 */
export default function withLayout(WrappedComponent, special) {
  return class WithLayout extends React.Component {
    static displayName = `WithLayout(${getDisplayName(WrappedComponent)})`
    static propTypes = {
      theme: PropTypes.shape({
        bgColor: PropTypes.string,
        fontColor: PropTypes.string,
        footerBgColor: PropTypes.string,
        headerPosition: PropTypes.string,
        logoColor: PropTypes.string,
        subtitleColor: PropTypes.string,
        titleColor: PropTypes.string,
        titlePosition: PropTypes.string,
        topicColor: PropTypes.string
      }),
      isIndex: PropTypes.bool
    }
    static defaultProps = {
      theme: defaultTheme,
      isIndex: false
    }

    static fetchData(props) {
      if (WrappedComponent.fetchData) {
        return WrappedComponent.fetchData(props)
      }
      return Promise.resolve()
    }

    render() {
      const { theme, isIndex, ...passThroughProps } = this.props
      const pathname = _.get(this.props, 'location.pathname')
      return (
        <Layout
          isIndex={isIndex}
          headerPosition={theme.headerPosition}
          fontColor={theme.fontColor}
          footerBgColor={theme.footerBgColor}
          bgColor={theme.bgColor}
          logoColor={theme.logoColor}
          pathname={pathname}
          special={special}
        >
          <WrappedComponent
            theme={theme}
            {...passThroughProps}
          />
        </Layout>
      )

    }
  }
}

export {
  defaultTheme,
  photoTheme
}
