import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

//  @twreporters
import {
  colorGrayscale,
  colorBrand,
} from '@twreporter/core/lib/constants/color'
import Divider from '@twreporter/react-components/lib/divider'
import { P1, P2 } from '@twreporter/react-components/lib/text/paragraph'
import Badge from '@twreporter/react-components/lib/badge'
import { LinkButton } from '@twreporter/react-components/lib/button'

const CardContainer = styled.div`
  display: flex;
  min-width: 240px;
  padding: 24px 24px 32px 24px;
  flex-direction: column;
  justify-content: center;
  border-radius: 2px;
  background-color: ${colorGrayscale.white};
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`

const P1Gray800 = styled(P1)`
  color: ${colorGrayscale.gray800};
`

const DividerContainer = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  color: ${colorGrayscale.gray300};
  width: 100%;
`

const StyledP2 = styled(P2)`
  line-height: 175%;
  color: ${colorGrayscale.gray700};
`

const Description = styled.div`
  margin-bottom: 24px;
  width: 100%;
`

const LinkContainer = styled.div``

export const DescriptionType = Object.freeze({
  PLAIN_TEXT: 'text',
  JSX: 'jsx',
})

const Card = ({
  title,
  badgeText,
  descriptionType,
  description,
  linkText,
  link,
}) => {
  const descJSX =
    descriptionType === DescriptionType.PLAIN_TEXT ? (
      <StyledP2 text={description} />
    ) : (
      description
    )
  return (
    <CardContainer>
      <TitleContainer>
        <P1Gray800 text={title} weight={P1.Weight.BOLD} />
        <Badge
          text={badgeText}
          textColor={colorBrand.heavy}
          backgroundColor={colorGrayscale.gray100}
        />
      </TitleContainer>
      <DividerContainer>
        <Divider />
      </DividerContainer>
      <Description>{descJSX}</Description>
      <LinkContainer>
        <LinkButton
          TextComponent={P2}
          type={LinkButton.Type.UNDERLINE}
          text={linkText}
          link={{ to: link, isExternal: true, target: '_blank' }}
        />
      </LinkContainer>
    </CardContainer>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  badgeText: PropTypes.string,
  descriptionType: PropTypes.oneOf(Object.values(DescriptionType)),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  linkText: PropTypes.string,
  link: PropTypes.string,
}

export default Card
