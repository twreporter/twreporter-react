import React, { useContext } from 'react'
import PropTypes from 'prop-types'
// @twreporter
import { Title2 } from '@twreporter/react-components/lib/title-bar'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'
import { PillButton } from '@twreporter/react-components/lib/button'
import {
  TabletAndAbove,
  MobileOnly,
} from '@twreporter/react-components/lib/rwd'
import origins from '@twreporter/core/lib/constants/request-origins'
// context
import { CoreContext } from '../../../contexts'
// components
import Card from './card'
import MobileTitleBar from './mobile-title-bar'
import { Content, BenefitsContainer, CardListContainer } from './styles'

const RoleBenefits = ({ role, cards = {} }) => {
  const { releaseBranch } = useContext(CoreContext)

  const supportButton = () => (
    <PillButton
      text="立即贊助"
      size={PillButton.Size.S}
      releaseBranch={releaseBranch}
      style={PillButton.Style.DARK}
      onClick={() =>
        window.open(
          origins.forClientSideRendering[releaseBranch].support,
          '_blank'
        )
      }
    />
  )

  const renderCardList = roleKey => {
    if (!cards[roleKey]) return null

    return (
      <CardListContainer>
        {cards[roleKey].map((card, index) => (
          <Card
            key={index}
            icon={card.icon}
            badge={card.badge}
            links={card.links}
            disabled={card.status === 'disabled'}
            title={card.title}
            description={card.description}
          />
        ))}
      </CardListContainer>
    )
  }

  const roleHierarchy = {
    [MEMBER_ROLE.explorer]: {
      higher: [
        {
          key: MEMBER_ROLE.action_taker,
          title: '成為行動者',
          subtitle: '贊助任意金額，享更多回饋',
        },
        {
          key: MEMBER_ROLE.trailblazer,
          title: '成為開創者',
          subtitle: '每月贊助 500 元以上，享更多回饋',
        },
      ],
    },
    [MEMBER_ROLE.action_taker]: {
      higher: [
        {
          key: MEMBER_ROLE.trailblazer,
          title: '成為開創者',
          subtitle: '每月贊助 500 元以上，享更多回饋',
        },
      ],
    },
    [MEMBER_ROLE.trailblazer]: {
      higher: [],
    },
  }

  const currentRoleInfo = roleHierarchy[role.key]
  if (!currentRoleInfo) return null

  return (
    <Content>
      <BenefitsContainer>
        <Title2 title={`身為${role.name}的你，可享有以下回饋`} />
        {renderCardList(role.key)}
      </BenefitsContainer>

      {currentRoleInfo.higher.map(higherRole => (
        <BenefitsContainer key={higherRole.key}>
          <TabletAndAbove>
            <Title2
              title={higherRole.title}
              subtitle={higherRole.subtitle}
              renderButton={supportButton()}
            />
          </TabletAndAbove>
          <MobileOnly>
            <MobileTitleBar
              title={higherRole.title}
              subtitle={higherRole.subtitle}
              renderButton={supportButton()}
            />
          </MobileOnly>
          {renderCardList(higherRole.key)}
        </BenefitsContainer>
      ))}
    </Content>
  )
}

RoleBenefits.propTypes = {
  role: PropTypes.shape({
    id: PropTypes.string,
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    name_en: PropTypes.string,
  }),
  cards: PropTypes.shape({
    [MEMBER_ROLE.explorer]: PropTypes.array,
    [MEMBER_ROLE.action_taker]: PropTypes.array,
    [MEMBER_ROLE.trailblazer]: PropTypes.array,
  }),
}

export default RoleBenefits
