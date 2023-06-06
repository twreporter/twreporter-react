import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import {
  TabletAndBelow,
  DesktopAndAbove,
} from '@twreporter/react-components/lib/rwd'
import {
  colorBrand,
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'
import { MenuButton } from '@twreporter/react-components/lib/button'
import Divider from '@twreporter/react-components/lib/divider'
import { getLogoutLink } from '@twreporter/universal-header/lib/utils/links'

import routes from '../../constants/routes'
import menuListType from '../../constants/menu-list-type'

const DividerContainer = styled.div`
  margin: 16px 0px;
`

const MemberMenuList = ({ releaseBranch = BRANCH.master }) => {
  const { pathname } = useLocation()
  const MenuData = [
    {
      type: menuListType.normal,
      text: '會員資料',
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
      path: routes.bookmarkListPage.path,
    },
    {
      type: menuListType.divider,
    },
    {
      type: menuListType.logout,
      text: '登出',
      path: getLogoutLink(releaseBranch).to,
    },
  ]

  const handleClick = (e, path) => {
    e.preventDefault()
    window.location = '/'
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

MemberMenuList.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export default MemberMenuList
