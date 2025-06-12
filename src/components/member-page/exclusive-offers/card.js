import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { P1, P2 } from '@twreporter/react-components/lib/text/paragraph'
import { LinkButton } from '@twreporter/react-components/lib/button'
import Badge from '@twreporter/react-components/lib/badge'
// context
import { CoreContext } from '../../../contexts'

const CardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  min-width: 240px;
  height: 244px;
  padding: 24px;
  border-radius: 2px;
  background-color: ${colorGrayscale.white};
  opacity: ${props => (props.$disabled ? 0.4 : 1)};
  pointer-events: ${props => (props.$disabled ? 'none' : 'auto')};
`

const IconAndBadge = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Icon = styled.img`
  height: 40px;
  width: 40px;
`

const BadgeContainer = styled.div`
  height: fit-content;
`

const Gap = styled.div`
  height: ${props => props.$height}px;
`

const Title = styled(P1)`
  color: ${colorGrayscale.gray800};
`

const Description = styled(P2)`
  color: ${colorGrayscale.gray800};
`

const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
  margin-top: auto;
`

const Card = ({
  disabled = false,
  badge = '',
  icon,
  title,
  description,
  links = [],
}) => {
  const { releaseBranch } = useContext(CoreContext)
  return (
    <CardContainer $disabled={disabled}>
      <IconAndBadge>
        <Icon
          src={`https://www.twreporter.org/assets/exclusive-offers/${releaseBranch}/${icon}.svg`}
        />
        {badge ? (
          <BadgeContainer>
            <Badge
              text={badge}
              textColor={colorGrayscale.gray800}
              backgroundColor={colorGrayscale.gray100}
            />
          </BadgeContainer>
        ) : null}
      </IconAndBadge>
      <Gap $height={16} />
      <Title text={title} weight={P1.Weight.BOLD} />
      <Gap $height={8} />
      <Description text={description} />
      {links.length > 0 && (
        <LinkContainer>
          {links.map((link, index) => (
            <LinkButton
              key={index}
              TextComponent={P2}
              type={LinkButton.Type.UNDERLINE}
              text={link.text}
              link={{ to: link.link, isExternal: true, target: '_blank' }}
            />
          ))}
        </LinkContainer>
      )}
    </CardContainer>
  )
}
Card.propTypes = {
  icon: PropTypes.string.isRequired,
  badge: PropTypes.string,
  disabled: PropTypes.bool,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default Card
