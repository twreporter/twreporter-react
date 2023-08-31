import React from 'react'
import styled from 'styled-components'
import querystring from 'querystring'

import {
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'
import { MenuButton } from '@twreporter/react-components/lib/button'
import Divider from '@twreporter/react-components/lib/divider'
import origins from '@twreporter/core/lib/constants/request-origins'

import routes from '../../../constants/routes'
import menuListType from '../../../constants/menu-list-type'

const MobileMemberMenuListConatiner = styled.div`
  max-width: 320px;
  width: 100%;
  min-widht: 296px;
  margin: auto;
`

const DividerContainer = styled.div`
  margin: 16px 0px;
`

const originsForClient = origins.forClientSideRendering
const MobileMemberMenuList = ({ releaseBranch = BRANCH.master }) => {
  const MenuData = [
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
    if (type === menuListType.normal) {
      return (
        <MenuButton
          key={idx}
          text={text}
          link={{ isExternal: false, to: path }}
          color={colorGrayscale.gray800}
          hoverBgColor={colorOpacity['black_0.05']}
          activeBgColor={colorOpacity['black_0.1']}
          paddingLeft={16}
          paddingRight={16}
        />
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
        <MenuButton
          key={idx}
          text={text}
          hoverBgColor={colorOpacity['black_0.05']}
          activeBgColor={colorOpacity['black_0.1']}
          paddingLeft={16}
          paddingRight={16}
          onClick={e => handleClick(e, path)}
        />
      )
    }
  })
  return (
    <MobileMemberMenuListConatiner>{itemJSX}</MobileMemberMenuListConatiner>
  )
}

MobileMemberMenuList.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export default MobileMemberMenuList
