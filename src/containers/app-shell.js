import PropTypes from 'prop-types'
import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
// context
import { CoreContext } from '../contexts'
// managers
import uiManager from '../managers/ui-manager'
// constants
import colors from '../constants/colors'
import uiConst from '../constants/ui'
// components
import ErrorBoundary from '../components/ErrorBoundary'
import MembershipPromo from '../components/membership-promo'
// @twreporter
import Footer from '@twreporter/react-components/lib/footer'
import { Header } from '@twreporter/universal-header/lib/index'
import zIndexConst from '@twreporter/core/lib/constants/z-index'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
// lodash
import get from 'lodash/get'
import values from 'lodash/values'
const _ = {
  get,
  values,
}

const AppBox = styled.div`
  background-color: ${props => props.backgroundColor};
`

const ContentBlock = styled.div`
  position: relative;
`

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: ${zIndexConst.header};
`

// TODO add `pink` theme to universal-header
const PinkBackgroundHeader = styled.div`
  position: relative;
  background-color: ${colors.pink};
`

const renderFooter = (footerType, releaseBranch) => {
  switch (footerType) {
    case uiConst.footer.none: {
      return null
    }
    case uiConst.footer.default:
    default: {
      return <Footer releaseBranch={releaseBranch} />
    }
  }
}

const renderHeader = (
  headerType,
  releaseBranch,
  pathname,
  referrerPath,
  hamburgerContext
) => {
  let headerTheme
  switch (headerType) {
    case uiConst.header.none:
      return null
    case uiConst.header.transparent:
    case uiConst.header.pink:
      headerTheme = 'transparent'
      break
    case uiConst.header.photo:
      headerTheme = 'photography'
      break
    default:
      headerTheme = 'normal'
      break
  }

  let headerElement = (
    <Header
      theme={headerTheme}
      releaseBranch={releaseBranch}
      isLinkExternal={false}
      pathname={pathname}
      referrerPath={referrerPath}
      hamburgerContext={hamburgerContext}
    />
  )

  if (headerType === uiConst.header.pink) {
    headerElement = <PinkBackgroundHeader>{headerElement}</PinkBackgroundHeader>
  }

  return (
    <HeaderContainer className="hidden-print">{headerElement}</HeaderContainer>
  )
}

const AppShell = ({
  headerType = uiConst.header.default,
  footerType = uiConst.footer.default,
  backgroundColor = colorGrayscale.gray100,
  children,
  pathname,
}) => {
  const { referrerPath, releaseBranch } = useContext(CoreContext)
  const [showHamburger, setShowHamburger] = useState(false)
  const hamburgerContext = { showHamburger, setShowHamburger }

  return (
    <ErrorBoundary>
      <AppBox backgroundColor={backgroundColor}>
        <ContentBlock>
          {renderHeader(
            headerType,
            releaseBranch,
            pathname,
            referrerPath,
            hamburgerContext
          )}
          {children}
          {renderFooter(footerType, releaseBranch)}
        </ContentBlock>
      </AppBox>
      <MembershipPromo pathname={pathname} showHamburger={showHamburger} />
    </ErrorBoundary>
  )
}
AppShell.propTypes = {
  backgroundColor: PropTypes.string,
  footerType: PropTypes.oneOf(_.values(uiConst.footer)),
  headerType: PropTypes.oneOf(_.values(uiConst.header)),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  pathname: PropTypes.string.isRequired,
}

function mapStateToProps(state, ownProps) {
  return Object.assign(
    {
      pathname: _.get(ownProps.location, 'pathname', ''),
    },
    uiManager.getLayoutObj(state, ownProps.location)
  )
}

export default connect(mapStateToProps)(AppShell)
