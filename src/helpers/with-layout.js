import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import Footer from '@twreporter/react-components/lib/footer'
import HeaderComposite from '@twreporter/react-components/lib/header'
import { layout } from '../themes/common-variables'

const { Header } = HeaderComposite

const STYLE_VARIABLES = {
  BG_COLOR: {
    DEFAULT: '#f1f1f1',
    PHOTO: '#08192d'
  },
  FONT_COLOR: {
    DEFAULT: '#404040',
    PHOTO: '#FFFFFF'
  },
  SUBTITLE_FONT_COLOR: {
    DEFAULT: 'gray'
  },
  FOOTER_BG_COLOR:{
    DEFAULT: '#cdcdcd',
    PHOTO: '#08192d'
  },
  HEADER_POSITION:{
    DEFAULT: 'header-above'
  },
  TITLE_POSITION: {
    DEFAULT: 'title-above'
  },
  TOPIC_COLOR: {
    DEFAULT: '#c71b0a'
  },
  LOGO_COLOR: {
    PHOTO: Header.logoColor.dark
  }
}

const defaultTheme = {
  bgColor: STYLE_VARIABLES.BG_COLOR.DEFAULT,
  fontColor: STYLE_VARIABLES.FONT_COLOR.DEFAULT,
  footerBgColor: STYLE_VARIABLES.FOOTER_BG_COLOR.DEFAULT,
  headerPosition: STYLE_VARIABLES.HEADER_POSITION.DEFAULT,
  logoColor: Header.logoColor.dark.DEFAULT,
  subtitleColor: STYLE_VARIABLES.SUBTITLE_FONT_COLOR.DEFAULT,
  titleColor: STYLE_VARIABLES.FONT_COLOR.DEFAULT,
  titlePosition: STYLE_VARIABLES.TITLE_POSITION.DEFAULT,
  topicColor: STYLE_VARIABLES.TOPIC_COLOR.DEFAULT
}

const photoTheme = {
  bgColor: STYLE_VARIABLES.BG_COLOR.PHOTO,
  fontColor: STYLE_VARIABLES.FONT_COLOR.PHOTO,
  footerBgColor: STYLE_VARIABLES.FOOTER_BG_COLOR.PHOTO,
  headerPosition: STYLE_VARIABLES.HEADER_POSITION.DEFAULT,
  logoColor: Header.logoColor.bright,
  subtitleColor: STYLE_VARIABLES.FONT_COLOR.PHOTO,
  titleColor: STYLE_VARIABLES.FONT_COLOR.PHOTO,
  titlePosition: STYLE_VARIABLES.TITLE_POSITION.DEFAULT,
  topicColor: STYLE_VARIABLES.TOPIC_COLOR.DEFAULT
}

const Container = styled.div`
  background-color: ${props => props.bgColor};
  min-height: 100vh;
  overflow-x: hidden;
  ${props => !props.special ? '' : css`
    height: 100vh;
    overflow-y: hidden;
  `}
`

const HeaderContainer = styled.div`
  ${props => {
    switch (props.headerPosition) {
      case 'header-above':
        return ''
      default:
        return css`
          @media (min-width: ${layout.desktop.large}) {
            display: none;
          }
        `
    }
  }}
`

class Layout extends React.Component {
  render() {
    const { bgColor, footerBgColor, fontColor, logoColor, headerPosition, isIndex, pathname, lockScrollY } = this.props
    return (
      <Container bgColor={bgColor} id="page-container" lockScrollY={lockScrollY}>
        {/* `id="page-container"` is for `components/zoom-in-leading-image.js` to enable scrollY after animation end */}
        <HeaderContainer headerPosition={headerPosition}>
          <Header
            isIndex={isIndex}
            bgColor={bgColor}
            fontColor={fontColor}
            logoColor={logoColor}
            pathName={pathname}
            headerPosition={headerPosition}
            footerBgColor={footerBgColor}
          />
        </HeaderContainer>
        {this.props.children}
        <Footer
          fontColor={fontColor}
          bgColor={footerBgColor}
        />
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
  bgColor: STYLE_VARIABLES.BG_COLOR,
  fontColor: STYLE_VARIABLES.FONT_COLOR,
  footerBgColor: STYLE_VARIABLES.FOOTER_BG_COLOR,
  headerPosition: STYLE_VARIABLES.HEADER_POSITION,
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
export default function withLayout(WrappedComponent, options = {}) {
  const { lockScrollY } = options
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
      const { theme, isIndex, location, ...passThroughProps } = this.props
      const { pathname } = location
      return (
        <Layout
          isIndex={isIndex}
          pathname={pathname}
          lockScrollY={lockScrollY}
          {...theme}
        >
          <WrappedComponent
            theme={theme}
            location={location}
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
