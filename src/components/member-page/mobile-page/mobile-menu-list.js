import React, { useContext } from 'react'
import styled from 'styled-components'
import querystring from 'querystring'

// context
import { CoreContext } from '../../../contexts'

// @twreporter
import {
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'
import { MenuButton } from '@twreporter/react-components/lib/button'
import Divider from '@twreporter/react-components/lib/divider'
import origins from '@twreporter/core/lib/constants/request-origins'

// feature toggle
import {
  ListType as ListTypeOld,
  MENU_LIST_DATA_MOBILE as MENU_LIST_DATA_MOBILE_OLD,
} from '../../../constants/membership-menu-old'
import {
  ListType as ListTypeNew,
  MENU_LIST_DATA_MOBILE as MENU_LIST_DATA_MOBILE_NEW,
} from '../../../constants/membership-menu'
import { MY_READING } from '@twreporter/core/lib/constants/feature-flag'
const ListType = MY_READING ? ListTypeNew : ListTypeOld
const MENU_LIST_DATA_MOBILE = MY_READING
  ? MENU_LIST_DATA_MOBILE_NEW
  : MENU_LIST_DATA_MOBILE_OLD

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
const MobileMemberMenuList = () => {
  const { releaseBranch } = useContext(CoreContext)
  const MenuData = MENU_LIST_DATA_MOBILE

  const handleClick = (e, path) => {
    e.preventDefault()
    const query = querystring.stringify({
      destination: `${originsForClient[releaseBranch]['main']}`,
    })
    window.location = `${path}?${query}`
  }

  const itemJSX = MenuData.map(({ type, text, path }, idx) => {
    if (type === ListType.NORMAL) {
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
        <MenuButton
          key={idx}
          text={text}
          hoverBgColor={colorOpacity['black_0.05']}
          activeBgColor={colorOpacity['black_0.1']}
          paddingLeft={16}
          paddingRight={16}
          onClick={e => handleClick(e, apiPath)}
        />
      )
    }
  })
  return (
    <MobileMemberMenuListConatiner>{itemJSX}</MobileMemberMenuListConatiner>
  )
}

export default MobileMemberMenuList
