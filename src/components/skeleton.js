import React from 'react'
import styled from 'styled-components'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
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
const Rectangle = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 2px;
  background-color: ${colorGrayscale.gray300};
  ${props =>
    props.marginBottom
      ? `margin-bottom: ${props.marginBottom === 'wide' ? '16px' : '8px'};`
      : ''}
  ${props => (props.marginRight ? `margin-right: ${props.marginRight};` : '')}

  ${mq.tabletAndBelow`
    ${props =>
      props.marginBottom
        ? `margin-bottom: ${props.marginBottom === 'wide' ? '8px' : '4px'};`
        : ''}
  `}
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
            width="48px"
            height="12px"
            marginBottom="wide"
            marginRight="8px"
          />
          <Rectangle width="48px" height="12px" marginBottom="wide" />
        </FlexRow>
        <DesktopAndAbove>
          <Rectangle width="720px" height="25px" marginBottom="wide" />
          <Rectangle width="100%" height="16px" marginBottom="wide" />
          <Rectangle width="240px" height="16px" />
        </DesktopAndAbove>
        <TabletAndBelow>
          <Rectangle width="100%" height="16px" marginBottom="wide" />
          <Rectangle width="50%" height="16px" />
        </TabletAndBelow>
      </Left>
      <Photo />
    </Up>
    <TabletAndBelow>
      <Down>
        <Rectangle width="100%" height="12px" marginBottom="narrow" />
        <Rectangle width="100%" height="12px" marginBottom="narrow" />
        <Rectangle width="240px" height="12px" marginBottom="narrow" />
      </Down>
    </TabletAndBelow>
  </Box>
)

export default Skeleton
