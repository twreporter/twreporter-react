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
import { MY_READING } from '@twreporter/core/lib/constants/feature-flag'

// contants
import routesOld from '../../constants/routes-old'
import routesNew from '../../constants/routes'
import menuListType from '../../constants/menu-list-type'

const routes = MY_READING ? routesNew : routesOld

const DividerContainer = styled.div`
  margin: 16px 0px;
`

const originsForClient = origins.forClientSideRendering
const MemberMenuList = () => {
  const { pathname } = useLocation()
  const { releaseBranch } = useContext(CoreContext)
  const MenuData = [
    {
      type: menuListType.normal,
      text: '個人資料',
      path: routes.memberPage.path,
    },
    {
      type: menuListType.normal,
      text: '贊助紀錄',
      path: routes.memberPage.memberDonationPage.path,
    },
    {
      type: menuListType.normal,
      text: '電子報設定',
      path: routes.memberPage.memberEmailSubscriptionPage.path,
    },
    {
      type: menuListType.divider,
    },
    {
      type: menuListType.normal,
      text: '我的書籤',
      path: routes.bookmarkListPage.path.slice(0, 10),
    },
    {
      type: menuListType.divider,
    },
    {
      type: menuListType.logout,
      text: '登出',
      path: `${originsForClient[releaseBranch]['api']}/v2/auth/logout`,
    },
  ]

  const handleClick = (e, path) => {
    e.preventDefault()
    const query = querystring.stringify({
      destination: `${originsForClient[releaseBranch]['main']}`,
    })
    window.location = `${path}?${query}`
  }

  const itemJSX = MenuData.map(({ type, text, path }, idx) => {
    const isActive = pathname === path
    if (type === menuListType.normal) {
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

    if (type === menuListType.divider) {
      return (
        <DividerContainer key={idx}>
          <Divider />
        </DividerContainer>
      )
    }

    if (type === menuListType.logout) {
      return (
        <div key={idx}>
          <TabletAndBelow>
            <MenuButton
              text={text}
              hoverBgColor={colorOpacity['black_0.05']}
              activeBgColor={colorOpacity['black_0.1']}
              paddingLeft={0}
              paddingRight={0}
              onClick={e => handleClick(e, path)}
            />
          </TabletAndBelow>
          <DesktopAndAbove>
            <MenuButton
              text={text}
              hoverBgColor={colorOpacity['black_0.05']}
              activeBgColor={colorOpacity['black_0.1']}
              paddingLeft={16}
              paddingRight={16}
              onClick={e => handleClick(e, path)}
            />
          </DesktopAndAbove>
        </div>
      )
    }
  })

  return <div>{itemJSX}</div>
}

export default MemberMenuList
