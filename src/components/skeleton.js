import React from 'react'
import styled, { keyframes } from 'styled-components'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import {
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'
import {
  DesktopAndAbove,
  TabletAndBelow,
} from '@twreporter/react-components/lib/rwd'

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`
const Box = styled(FlexColumn)``
const Up = styled(FlexRow)`
  justify-content: space-between;
`
const Down = styled(FlexColumn)`
  margin-top: 8px;
`
const Left = styled(FlexColumn)`
  flex: 1;
`
const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`

export const MarginBottomType = Object.freeze({
  WIDE: 'wide',
  NARROW: 'narrow',
})

export const Rectangle = styled.div`
  width: ${props => props.$width};
  height: ${props => props.$height};
  border-radius: 2px;
  background-color: ${colorGrayscale.gray300};
  ${props =>
    props.$marginBottom
      ? `margin-bottom: ${
          props.$marginBottom === MarginBottomType.WIDE ? '16px' : '8px'
        };`
      : ''}
  ${props => (props.$marginRight ? `margin-right: ${props.$marginRight};` : '')}
  ${props => (props.$maxWidth ? `max-width: ${props.$maxWidth};` : '')}

  ${mq.tabletAndBelow`
    ${props =>
      props.$marginBottom
        ? `margin-bottom: ${
            props.$marginBottom === MarginBottomType.WIDE ? '8px' : '4px'
          };`
        : ''}
  `}

  // loading animation
  position: relative;
  overflow: hidden;
  &::after {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      ${colorGrayscale.white} 0,
      ${colorOpacity['white_0.2']} 20%,
      ${colorOpacity['white_0.5']} 60%,
      ${colorGrayscale.white} 100%
    );
    animation: ${shimmer} ${props => props.$shimmerSec || 2.5}s infinite;
    content: '';
  }
`
const Photo = styled.div`
  flex: none;
  background-color: ${colorGrayscale.gray300};
  width: 216px;
  height: 144px;
  margin-left: 32px;
  ${mq.tabletAndBelow`
    width: 72px;
    height: 72px;
    margin-left: 8px;
  `}
`

const Skeleton = ({ ...props }) => (
  <Box {...props}>
    <Up>
      <Left>
        <FlexRow>
          <Rectangle
            $width="48px"
            $height="12px"
            $marginBottom={MarginBottomType.WIDE}
            $marginRight="8px"
            $shimmerSec="3"
          />
          <Rectangle
            $width="48px"
            $height="12px"
            $marginBottom={MarginBottomType.WIDE}
            $shimmerSec="3"
          />
        </FlexRow>
        <DesktopAndAbove>
          <Rectangle
            $width="100%"
            $height="25px"
            $marginBottom={MarginBottomType.WIDE}
            $maxWidth="720px"
          />
          <Rectangle
            $width="100%"
            $height="16px"
            $marginBottom={MarginBottomType.WIDE}
          />
          <Rectangle $width="240px" $height="16px" />
        </DesktopAndAbove>
        <TabletAndBelow>
          <Rectangle
            $width="100%"
            $height="16px"
            $marginBottom={MarginBottomType.WIDE}
          />
          <Rectangle $width="50%" $height="16px" />
        </TabletAndBelow>
      </Left>
      <Photo />
    </Up>
    <TabletAndBelow>
      <Down>
        <Rectangle
          $width="100%"
          $height="12px"
          $marginBottom={MarginBottomType.NARROW}
        />
        <Rectangle
          $width="100%"
          $height="12px"
          $marginBottom={MarginBottomType.NARROW}
        />
        <Rectangle
          $width="240px"
          $height="12px"
          $marginBottom={MarginBottomType.NARROW}
        />
      </Down>
    </TabletAndBelow>
  </Box>
)

export default Skeleton
