import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import axios from 'axios'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { H3 } from '@twreporter/react-components/lib/text/headline'
import mq from '@twreporter/core/lib/utils/media-query'
import { Title2 } from '@twreporter/react-components/lib/title-bar'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'
import { PillButton } from '@twreporter/react-components/lib/button'
import {
  TabletAndAbove,
  MobileOnly,
} from '@twreporter/react-components/lib/rwd'
import FetchingWrapper from '@twreporter/react-components/lib/is-fetching-wrapper'
import origins from '@twreporter/core/lib/constants/request-origins'
// context
import { CoreContext } from '../../../contexts'
// components
import Card from './card'
import MobileTitleBar from './mobile-title-bar'
// lodash
import groupBy from 'lodash/groupBy'
const _ = {
  groupBy,
}

const ExclusiveOffersContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 32px;
  flex-direction: column;
  ${mq.mobileOnly`
    gap: 24px;
  `}
`

const PageTitle = styled(H3)`
  color: ${colorGrayscale.gray800};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 64px;
`

const RoleBenefitContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const CardListContainer = styled.div`
  margin-top: 24px;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  ${mq.hdOnly`
    grid-template-columns: repeat(3, 1fr);
  `}
  ${mq.mobileOnly`
    grid-template-columns: repeat(1, 1fr);
  `}
`

const Loading = styled.div``
const LoadingMask = FetchingWrapper(Loading)

const ExclusiveOffers = ({ role }) => {
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { releaseBranch } = useContext(CoreContext)

  const getRoleCards = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios(
        `https://twreporter.org/assets/exclusive-offers/${releaseBranch}/${role.key}.json`
      )
      const groupedCards = _.groupBy(data, 'role')
      setCards(groupedCards || [])
    } catch (err) {
      console.error('Error fetching role cards:', err)
      setError('Failed to load exclusive offers')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getRoleCards()
  }, [role])

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

  const contentJSX = () => {
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
        <RoleBenefitContainer>
          <Title2 title={`身為${role.name}的你，可享有以下回饋`} />
          {renderCardList(role.key)}
        </RoleBenefitContainer>

        {currentRoleInfo.higher.map(higherRole => (
          <RoleBenefitContainer key={higherRole.key}>
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
          </RoleBenefitContainer>
        ))}
      </Content>
    )
  }

  if (error) {
    return (
      <ExclusiveOffersContainer>
        <PageTitle text="支持方案專屬回饋" />
        <div>{error}</div>
      </ExclusiveOffersContainer>
    )
  }

  return (
    <ExclusiveOffersContainer>
      <PageTitle text="支持方案專屬回饋" />
      <LoadingMask isFetching={isLoading} showSpinner={isLoading}>
        {contentJSX()}
      </LoadingMask>
    </ExclusiveOffersContainer>
  )
}

ExclusiveOffers.propTypes = {
  role: PropTypes.shape({
    id: PropTypes.string,
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    name_en: PropTypes.string,
  }),
}

export default ExclusiveOffers
