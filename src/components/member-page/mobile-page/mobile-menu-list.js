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
import { getLogoutLink } from '@twreporter/universal-header/lib/utils/links'

const MobileMemberMenuListConatiner = styled.div`
  max-width: 320px;
  width: 100%;
  min-widht: 296px;
  margin: auto;
`

const DividerContainer = styled.div`
  margin: 24px 0px;
`

const MobileMemberMenuList = ({ releaseBranch = BRANCH.master }) => {
  const MenuData = [
    {
      type: 'normal',
      text: '贊助紀錄',
      path: '/member/donation',
    },
    {
      type: 'normal',
      text: '電子報設定',
      path: '/member/email-subscription',
    },
    {
      type: 'divider',
    },
    {
      type: 'normal',
      text: '我的書籤',
      path: '/bookmarks',
    },
    {
      type: 'divider',
    },
    {
      type: 'logout',
      text: '登出',
      path: getLogoutLink(releaseBranch).to,
    },
  ]

  const handleClick = (e, path) => {
    e.preventDefault()
    const redirectURL = window.location.href
    const query = querystring.stringify({
      destination: redirectURL,
    })
    window.location = `${path}?${query}`
  }

  const itemJSX = MenuData.map(({ type, text, path }, idx) => {
    if (type === 'normal') {
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

    if (type === 'divider') {
      return (
        <DividerContainer key={idx}>
          <Divider />
        </DividerContainer>
      )
    }

    if (type === 'logout') {
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
