import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// @twreporter
import { Title2 } from '@twreporter/react-components/lib/title-bar'
// components
import Card from './card'
import { Content, BenefitsContainer, CardListContainer } from './styles'

const ContentWithMargin = styled(Content)`
  margin-bottom: 64px;
`

const PeriodicBenefits = ({ cards = [] }) => {
  if (cards.length === 0) return null

  return (
    <ContentWithMargin>
      <BenefitsContainer>
        <Title2 title={`身為定期定額贊助者的你，可享有以下回饋`} />
        <CardListContainer>
          {cards.map((card, index) => (
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
      </BenefitsContainer>
    </ContentWithMargin>
  )
}
PeriodicBenefits.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      badge: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          link: PropTypes.string,
        })
      ),
      status: PropTypes.oneOf(['active', 'disabled']),
    })
  ),
}

export default PeriodicBenefits
