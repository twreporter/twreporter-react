import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// @twreporter
import { P2, P3 } from '@twreporter/react-components/lib/text/paragraph'
import { InheritLinkButton } from '@twreporter/react-components/lib/button'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'
// lodash
import map from 'lodash/map'
const _ = {
  map,
}

const PromotionBox = styled.div`
  ${props => (props.$hide ? 'display: none;' : '')}
  & {
    color: ${colorGrayscale.gray600};
  }
  a,
  a:active,
  a:visited {
    color: ${colorGrayscale.gray600};
  }
  a {
    text-underline-offset: 4px;
    text-decoration-line: underline !important;
  }
`

const TextType = Object.freeze({
  P2: 'p2',
  P3: 'p3',
})

const getLink = link => ({ to: link, isExternal: true, target: '_blank' })

const getPromotionJSX = (type = TextType.P2) => {
  const TextComponent = type === TextType.P2 ? P2 : P3
  const InlineComponent = styled(TextComponent)`
    display: unset;
  `

  return {
    [MEMBER_ROLE.trailblazer]: [
      <InlineComponent key="promotion-trailblazer-detail-1">
        ・申請成為國家兩廳院「廳院人」會員（
        <InheritLinkButton
          link={getLink(
            'https://docs.google.com/forms/d/108kjczL7_zva7p0sQMWoHFPqWGIfvMavgik5HYX8mM4/edit'
          )}
          type={InheritLinkButton.Type.UNDERLINE}
          TextComponent={TextComponent}
          text={'申請／展延會籍'}
        />
        ｜
        <InheritLinkButton
          link={getLink('https://npac-ntch.org/members')}
          type={InheritLinkButton.Type.UNDERLINE}
          TextComponent={TextComponent}
          text={'查詢會籍'}
        />
        ）
      </InlineComponent>,
      <InlineComponent key="promotion-trailblazer-detail-2">
        ・報導者出版品與周邊 85 折（請至
        <InheritLinkButton
          link={getLink('https://twreporter.waca.ec/')}
          type={InheritLinkButton.Type.UNDERLINE}
          TextComponent={TextComponent}
          text={'報導者 Books & Goods'}
        />
        使用折扣碼：KU8R6aY9Mx36）
      </InlineComponent>,
      <InlineComponent key="promotion-trailblazer-detail-3">
        ・讀墨 Readmoo 報導者電子書 85 折（請至
        <InheritLinkButton
          link={getLink('https://readmoo.pse.is/79gkpv')}
          type={InheritLinkButton.Type.UNDERLINE}
          TextComponent={TextComponent}
          text={'讀墨平台'}
        />
        使用折扣碼：thereporter-15off）
      </InlineComponent>,
    ],
    [MEMBER_ROLE.action_taker]: [
      <InlineComponent key="promotion-action-taker-detail-1">
        ・報導者出版品與周邊 9 折（請至
        <InheritLinkButton
          link={getLink('https://twreporter.waca.ec/')}
          type={InheritLinkButton.Type.UNDERLINE}
          TextComponent={TextComponent}
          text={'報導者 Books & Goods'}
        />
        使用折扣碼：LLsWj66BFr3v）
      </InlineComponent>,
      <InlineComponent key="promotion-action-taker-detail-2">
        ・讀墨 Readmoo 報導者電子書 9 折（請至
        <InheritLinkButton
          link={getLink('https://readmoo.pse.is/79gkpv')}
          type={InheritLinkButton.Type.UNDERLINE}
          TextComponent={TextComponent}
          text={'讀墨平台'}
        />
        使用折扣碼：thereporter-10off）
      </InlineComponent>,
    ],
  }
}

const Promotion = memo(
  ({
    role = { key: MEMBER_ROLE.explorer, name: '' },
    className = '',
    type = TextType.P2,
  }) => {
    const promotion = getPromotionJSX(type)
    const TextComponent = type === TextType.P2 ? P2 : P3

    return (
      <PromotionBox
        $hide={role.key === MEMBER_ROLE.explorer}
        className={className}
      >
        <TextComponent
          text={`${role.name}回饋`}
          weight={TextComponent.Weight.BOLD}
        />
        {_.map(promotion[role.key], (jsx, index) => (
          <div key={`promotion-${role.key}-${index}`}>{jsx}</div>
        ))}
      </PromotionBox>
    )
  }
)
Promotion.propTypes = {
  role: PropTypes.shape({
    id: PropTypes.string,
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    name_en: PropTypes.string,
  }),
  className: PropTypes.string,
  type: PropTypes.oneOf[(TextType.P2, TextType.P3)],
}
Promotion.Type = TextType
Promotion.displayName = 'Merchandise-Promotion'

export default Promotion
