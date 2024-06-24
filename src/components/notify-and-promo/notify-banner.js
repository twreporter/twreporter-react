import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
// contexts
import { CoreContext } from '../../contexts'
// components
import MoreButton from './more'
// @twreporter
import { IconButton } from '@twreporter/react-components/lib/button'
import { Cross } from '@twreporter/react-components/lib/icon'
import { H4 } from '@twreporter/react-components/lib/text/headline'
import { P2 } from '@twreporter/react-components/lib/text/paragraph'
import {
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'
import mq from '@twreporter/core/lib/utils/media-query'
import zIndexConst from '@twreporter/core/lib/constants/z-index'
import requestOrigins from '@twreporter/core/lib/constants/request-origins'
import { DONATION_LINK_ANCHOR } from '@twreporter/core/lib/constants/donation-link-anchor'
// lodash
import map from 'lodash/map'
const _ = {
  map,
}

const boxCss = css`
  display: flex;
  flex-direction: column;
  width: 100vw;
  position: fixed;
  z-index: ${zIndexConst.buttomBanner};
  background-color: ${colorGrayscale.white};
  box-shadow: 0px 0px 24px 0px ${colorOpacity['black_0.1']};
  transform: translateY(${props => (props.$show ? 0 : '100%')});
  transition: transform 0.5s ease-in-out;
`

const DesktopBox = styled.div`
  ${boxCss}
  align-items: center;
  justify-content: center;
  bottom: 0;
  padding: 24px;
`
const SketchImg = styled.img`
  height: 116px;
  margin-right: 48px;
`
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled(H4)`
  color: ${colorGrayscale.gray800};
  @media (min-width: 600px) and (max-width: 1023px) {
    margin: auto;
  }
`
const Description = styled(P2)`
  color: ${colorGrayscale.gray600};
  margin-top: 4px;
  ${mq.tabletAndBelow`
    margin-top: 0;
  `}
`
const DesktopMore = styled(MoreButton)`
  width: 180px;
  align-self: flex-end;
  margin-left: 48px;
`
const CloseButton = styled(IconButton)`
  align-self: end;
`
const FlexRow = styled.div`
  display: flex;
  width: 950px;
`
export const DesktopBanner = ({
  customContext,
  imageUrl,
  title = '',
  description = [],
  buttonText = '瞭解更多',
  onClickButton,
}) => {
  const { isShowPromo, closePromo } = useContext(customContext)
  const { releaseBranch } = useContext(CoreContext)
  const descriptionJSX = _.map(description, (text, index) => {
    return <Description text={text} key={`desktop-banner-desc-${index}`} />
  })

  let moreAction = onClickButton
  if (!onClickButton || typeof onClickButton !== 'function') {
    moreAction = () => {
      const membershipPromoLink = `${requestOrigins.forClientSideRendering[releaseBranch].support}#${DONATION_LINK_ANCHOR.impact}`
      window.open(membershipPromoLink, '_blank')
      closePromo()
    }
  }

  return (
    <DesktopBox $show={isShowPromo}>
      <CloseButton
        iconComponent={<Cross releaseBranch={releaseBranch} />}
        theme={IconButton.THEME.normal}
        onClick={closePromo}
      />
      <FlexRow>
        <SketchImg src={imageUrl} alt={title} />
        <TextBox>
          <Title text={title} />
          {descriptionJSX}
        </TextBox>
        <DesktopMore text={buttonText} onClickButton={moreAction} />
      </FlexRow>
    </DesktopBox>
  )
}
DesktopBanner.propTypes = {
  customContext: PropTypes.object.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.arrayOf(PropTypes.string),
  buttonText: PropTypes.string,
  onClickButton: PropTypes.func,
}

// mobile banner
const MobileBox = styled.div`
  ${boxCss}
  bottom: 0px;
  padding: 24px 16px;
`
const FlexGroup = styled.div`
  display: flex;
  justify-content: space-between;
`
const DescriptionBox = styled.div`
  margin: 8px 0;
  @media (min-width: 600px) and (max-width: 1023px) {
    align-self: center;
    margin: 16px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 360px;
    text-align: center;
  }
`
const MobileMore = styled(MoreButton)`
  width: 96px;
  align-self: flex-end;
  @media (min-width: 600px) and (max-width: 1023px) {
    align-self: center;
  }
`
export const MobileBanner = ({
  customContext,
  title = '',
  description = [],
  buttonText = '瞭解更多',
  onClickButton,
}) => {
  const { isShowPromo, closePromo } = useContext(customContext)
  const { releaseBranch } = useContext(CoreContext)
  const descriptionJSX = _.map(description, (text, index) => {
    return <Description text={text} key={`mobile-banner-desc-${index}`} />
  })

  let moreAction = onClickButton
  if (!onClickButton || typeof onClickButton !== 'function') {
    moreAction = () => {
      const membershipPromoLink = `${requestOrigins.forClientSideRendering[releaseBranch].support}#${DONATION_LINK_ANCHOR.impact}`
      window.open(membershipPromoLink, '_blank')
      closePromo()
    }
  }

  return (
    <MobileBox $show={isShowPromo}>
      <FlexGroup>
        <Title text={title} />
        <CloseButton
          iconComponent={<Cross releaseBranch={releaseBranch} />}
          theme={IconButton.THEME.normal}
          onClick={closePromo}
        />
      </FlexGroup>
      <DescriptionBox>{descriptionJSX}</DescriptionBox>
      <MobileMore text={buttonText} onClickButton={moreAction} />
    </MobileBox>
  )
}
MobileBanner.propTypes = {
  customContext: PropTypes.object.isRequired,
  title: PropTypes.string,
  description: PropTypes.arrayOf(PropTypes.string),
  buttonText: PropTypes.string,
  onClickButton: PropTypes.func,
}
