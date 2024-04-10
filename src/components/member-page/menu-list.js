import React, { useContext } from 'react'
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

const DividerContainer = styled.div`
  margin: 16px 0px;
`

const originsForClient = origins.forClientSideRendering
const MemberMenuList = () => {
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

  const itemJSX = MenuData.map(({ type, text, path }, idx) => {
    const isActive = pathname === path
    if (type === ListType.NORMAL) {
      return (
        <div key={idx}>
          <TabletAndBelow>
            <MenuButton
              text={text}
              link={{ isExternal: false, to: path }}
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
              link={{ isExternal: false, to: path }}
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
  })

  return <div>{itemJSX}</div>
}

export default MemberMenuList
