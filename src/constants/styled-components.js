import get from 'lodash/get'
import styled from 'styled-components'
import { articleLayout } from '../themes/layout'
import mq from '../utils/media-query'

const _ = {
  get
}

const defaultMaxWidth = articleLayout.hd.width.large

const ResponsiveContainerForAritclePage = styled.div`
  max-width: 100%;
  margin: 0 auto;

  ${mq.tabletOnly`
    max-width: ${props => _.get(articleLayout, [ 'tablet', 'width', props.size ], defaultMaxWidth)}px;
  `}

  ${mq.desktopOnly`
    max-width: ${props => _.get(articleLayout, [ 'desktop', 'width', props.size ], defaultMaxWidth)}px;
  `}

  ${mq.hdOnly`
    max-width: ${props => _.get(articleLayout, [ 'hd', 'width', props.size ], defaultMaxWidth)}px;
  `}
`

export default {
  ResponsiveContainerForAritclePage
}
