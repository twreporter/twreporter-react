import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import querystring from 'querystring'
// context
import { CoreContext } from '../../contexts'
// @twreporter
import {
  TabletAndBelow,
  DesktopAndAbove,
} from '@twreporter/react-components/lib/rwd'
import {
  colorBrand,
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'
import { MenuButton } from '@twreporter/react-components/lib/button'
import Divider from '@twreporter/react-components/lib/divider'
import origins from '@twreporter/core/lib/constants/request-origins'
// constants
import { ListType, MENU_LIST_DATA } from '../../constants/membership-menu'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'
// const lodash
import includes from 'lodash/includes'
const _ = {
  includes,
}

const DividerContainer = styled.div`
  margin: 16px 0px;
`

const originsForClient = origins.forClientSideRendering
const MemberMenuList = ({ role = { key: MEMBER_ROLE.explorer, name: '' } }) => {
  const { pathname } = useLocation()
  const { releaseBranch } = useContext(CoreContext)
  const MenuData = MENU_LIST_DATA

  const handleClick = (e, path) => {
    e.preventDefault()
    const query = querystring.stringify({
      destination: `${originsForClient[releaseBranch]['main']}`,
    })
    window.location = `${path}?${query}`
  }

  const itemJSX = MenuData.map(
    ({ type, text, path, link, target, excludeRole = [] }, idx) => {
      if (_.includes(excludeRole, role.key)) {
        return
      }
      const isActive = pathname === path
      if (type === ListType.NORMAL || type === ListType.LINK) {
        const linkObject = {
          isExternal: type === ListType.LINK,
          to: type === ListType.LINK ? link : path,
          target: target || '_self',
        }
        return (
          <div key={idx}>
            <TabletAndBelow>
              <MenuButton
                text={text}
                link={linkObject}
                color={isActive ? colorBrand.heavy : colorGrayscale.gray800}
                hoverBgColor={colorOpacity['black_0.05']}
                activeBgColor={colorOpacity['black_0.1']}
                paddingLeft={0}
                paddingRight={0}
              />
            </TabletAndBelow>
            <DesktopAndAbove>
              <MenuButton
                text={text}
                link={linkObject}
                color={isActive ? colorBrand.heavy : colorGrayscale.gray800}
                hoverBgColor={colorOpacity['black_0.05']}
                activeBgColor={colorOpacity['black_0.1']}
                paddingLeft={16}
                paddingRight={16}
              />
            </DesktopAndAbove>
          </div>
        )
      }

      if (type === ListType.DIVIDER) {
        return (
          <DividerContainer key={idx}>
            <Divider />
          </DividerContainer>
        )
      }

      if (type === ListType.LOGOUT) {
        const apiPath = `${originsForClient[releaseBranch]['api']}${path}`
        return (
          <div key={idx}>
            <TabletAndBelow>
              <MenuButton
                text={text}
                hoverBgColor={colorOpacity['black_0.05']}
                activeBgColor={colorOpacity['black_0.1']}
                paddingLeft={0}
                paddingRight={0}
                onClick={e => handleClick(e, apiPath)}
              />
            </TabletAndBelow>
            <DesktopAndAbove>
              <MenuButton
                text={text}
                hoverBgColor={colorOpacity['black_0.05']}
                activeBgColor={colorOpacity['black_0.1']}
                paddingLeft={16}
                paddingRight={16}
                onClick={e => handleClick(e, apiPath)}
              />
            </DesktopAndAbove>
          </div>
        )
      }
    }
  )

  return <div>{itemJSX}</div>
}

MemberMenuList.propTypes = {
  role: PropTypes.shape({
    id: PropTypes.string,
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    name_en: PropTypes.string,
  }),
}

export default MemberMenuList
