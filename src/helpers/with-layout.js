import Footer from '@twreporter/react-components/lib/footer'
import Header from '@twreporter/react-components/lib/header'
import PropTypes from 'prop-types'
import React from 'react'
import hoistStatics from 'hoist-non-react-statics'
import pt from '../constants/page-themes'
import styled from 'styled-components'
import merge from 'lodash/merge'

const  _  = {
  merge
}

const Container = styled.div`
  background-color: ${props => props.bgColor};
  min-height: 100vh;
  overflow-x: hidden;
`

class Layout extends React.PureComponent {
  render() {
    const { theme, isIndex, pathname } = this.props
    return (
      <Container bgColor={theme.color.bg}>
        <Header
          isIndex={isIndex}
          bgColor={theme.color.bg}
          fontColor={theme.color.font}
          logoColor={theme.color.logo}
          pathName={pathname}
        />
        {this.props.children}
        <Footer
          fontColor={theme.color.font}
          bgColor={theme.color.footerBg}
        />
      </Container>
    )
  }
}

Layout.propTypes = {
  theme: pt.themePropTypes
}

Layout.defaultProps = pt.defaultTheme

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
      theme: pt.themePropTypes,
      isIndex: PropTypes.bool
    }

    static defaultProps = {
      theme: pt.defaultTheme,
      isIndex: false
    }

    render() {
      const { theme, isIndex, location, ...passThroughProps } = this.props
      const { pathname } = location
      const _theme = _.merge({}, pt.defaultTheme, theme)
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
