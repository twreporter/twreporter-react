import constPageThemes from '../constants/page-themes'
import constPropTypes from '../constants/prop-types'
import Footer from '@twreporter/react-components/lib/footer'
import Header from '@twreporter/react-components/lib/header'
import hoistStatics from 'hoist-non-react-statics'
import merge from 'lodash/merge'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const  _  = {
  merge
}

const Container = styled.div`
  background-color: ${props => props.bgColor};
`

const HeaderContainer = styled.div`
  position: relative;
  z-index: 100;
`

class Layout extends React.PureComponent {
  render() {
    const { theme, isIndex, pathname } = this.props
    return (
      <Container bgColor={theme.color.bg}>
        <HeaderContainer>
          <Header
            isIndex={isIndex}
            fontColor={theme.color.font}
            logoColor={theme.color.logo}
            pathName={pathname}
            headerPosition={theme.position.header}
          />
        </HeaderContainer>
        {this.props.children}
        <Footer
          bgColor={constPageThemes.defaultTheme.color.footerBg}
        />
      </Container>
    )
  }
}

Layout.propTypes = {
  theme: constPropTypes.theme
}

Layout.defaultProps = constPageThemes.defaultTheme

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
  class WithLayout extends React.Component {
    static displayName = `WithLayout(${getDisplayName(WrappedComponent)})`

    static propTypes = {
      theme: constPropTypes.theme,
      isIndex: PropTypes.bool
    }

    static defaultProps = {
      theme: constPageThemes.defaultTheme,
      isIndex: false
    }

    render() {
      const { theme, isIndex, location, ...passThroughProps } = this.props
      const { pathname } = location
      const _theme = _.merge({}, constPageThemes.defaultTheme, theme)
      return (
        <Layout
          isIndex={isIndex}
          pathname={pathname}
          theme={_theme}
        >
          <WrappedComponent
            theme={_theme}
            location={location}
            {...passThroughProps}
          />
        </Layout>
      )
    }
  }

  return hoistStatics(WithLayout, WrappedComponent)
}
