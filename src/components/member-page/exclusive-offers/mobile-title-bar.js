import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { H5 } from '@twreporter/react-components/lib/text/headline'
import { P2 } from '@twreporter/react-components/lib/text/paragraph'
import Divider from '@twreporter/react-components/lib/divider'

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const TitleAndSubtitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Title = styled(H5)`
  color: ${colorGrayscale.gray800};
`

const Subtitle = styled(P2)`
  color: ${colorGrayscale.gray700};
`

const DividerGray800 = styled(Divider)`
  border-color: ${colorGrayscale.gray800};
`

const MobileTitleBar = ({ title, subtitle, renderButton }) => {
  return (
    <BarContainer>
      <Bar>
        <TitleAndSubtitleContainer>
          <Title text={title} />
          <Subtitle text={subtitle} />
        </TitleAndSubtitleContainer>
        {renderButton || null}
      </Bar>
      <DividerGray800 />
    </BarContainer>
  )
}

MobileTitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  renderButton: PropTypes.element,
}

export default MobileTitleBar
