import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Footer } from '@twreporter/react-components'
import { Header } from '@twreporter/react-components'

// lodash
import get from 'lodash/get'
const _ = {
  get
}

const Container = styled.div`
  background-color: ${props => props.bgColor};
  min-height: 100vh;
  overflow-x: hidden;
`

const DEFAULT_VALUES = {
  BG_COLOR: '#f1f1f1',
  FONT_COLOR: '#404040',
  FOOTER_BG_COLOR: '#cdcdcd',
  PHOTO_BG_COLOR: '#08192d',
  PHOTO_FONT_COLOR: '#FFFFFF',
  PHOTO_FOOTER_BG_COLOR: '#08192d',
  PHOTO_LOGO_COLOR: Header.logoColor.dark,
  POSITION: 'above',
  TOPIC_COLOR: '#c71b0a'
}

const defaultTheme = {
  bgColor: DEFAULT_VALUES.BG_COLOR,
  fontColor: DEFAULT_VALUES.FONT_COLOR,
  footerBgColor: DEFAULT_VALUES.FOOTER_BG_COLOR,
  headerPosition: DEFAULT_VALUES.POSITION,
  logoColor: Header.logoColor.dark,
  subtitleColor: DEFAULT_VALUES.FONT_COLOR,
  titleColor: DEFAULT_VALUES.FONT_COLOR,
  titlePosition: DEFAULT_VALUES.POSITION,
  topicColor: DEFAULT_VALUES.TOPIC_COLOR
}

const photoTheme = {
  bgColor: DEFAULT_VALUES.PHOTO_BG_COLOR,
  fontColor: DEFAULT_VALUES.PHOTO_FONT_COLOR,
  footerBgColor: DEFAULT_VALUES.PHOTO_FOOTER_BG_COLOR,
  headerPosition: DEFAULT_VALUES.POSITION,
  logoColor: Header.logoColor.bright,
  subtitleColor: DEFAULT_VALUES.PHOTO_FONT_COLOR,
  titleColor: DEFAULT_VALUES.PHOTO_FONT_COLOR,
  titlePosition: DEFAULT_VALUES.POSITION,
  topicColor: DEFAULT_VALUES.TOPIC_COLOR
}

class Layout extends React.Component {
  render() {
    const { bgColor, footerBgColor, fontColor, logoColor, headerPosition } = this.props
    return (
      <Container
        bgColor={bgColor}
      >
        { headerPosition === DEFAULT_VALUES.POSITION ? (
          <Header
            isIndex={this.props.isIndex}
            bgColor={bgColor}
            fontColor={fontColor}
            logoColor={logoColor}
            pathName={this.props.pathname}
          />
        ) : null
        }
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
  pathname: PropTypes.string.isRequired
}

Layout.defaultProps = {
  bgColor: DEFAULT_VALUES.BG_COLOR,
  fontColor: DEFAULT_VALUES.FONT_COLOR,
  footerBgColor: DEFAULT_VALUES.FOOTER_BG_COLOR,
  headerPosition: DEFAULT_VALUES.POSITION,
  isIndex: false,
  logoColor: Header.logoColor.dark
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
export default function withLayout(WrappedComponent) {
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
