import get from 'lodash/get'
import styled from 'styled-components'
import { articleLayout } from '../themes/layout'
import { screen } from '../themes/screen'

const _ = {
  get
}

const defaultMaxWidth = articleLayout.hd.width.large

const ResponsiveContainerForAritclePage = styled.div`
  max-width: 100%;
  margin: 0 auto;

  ${screen.tablet`
    max-width: ${props => _.get(articleLayout, [ 'tablet', 'width', props.size ], defaultMaxWidth)}px;
  `}

  ${screen.desktop`
    max-width: ${props => _.get(articleLayout, [ 'desktop', 'width', props.size ], defaultMaxWidth)}px;
  `}

  ${screen.overDesktop`
    max-width: ${props => _.get(articleLayout, [ 'hd', 'width', props.size ], defaultMaxWidth)}px;
  `}
`

export default {
  ResponsiveContainerForAritclePage
}
