import styled from 'styled-components'
import { colors, typography } from '../../themes/common-variables'
import { layout, screen } from '../../themes/screen'

const mockups = {
  component: {
    margin: {
      bottom: '40px',
      left: '24px',
      right: '24px'
    }
  }
}

const ComponentInnerBlock = styled.div`
  margin: 0 ${mockups.component.margin.right} 0 ${mockups.component.margin.left};
  display: block;
  ${screen.tabletAbove`
    margin: 0 auto;
  `}
`

const DisabledInnerBlock = styled.div`
  margin: 0 -${mockups.component.margin.right} 0 -${mockups.component.margin.left};
  ${screen.tabletAbove`
    margin: 0;
  `}
`

const ComponentContainer = styled.div`
  margin-bottom: ${mockups.component.margin.bottom};
  margin-left: auto;
  margin-right: auto;
  minHeight: ${props => props.minHeight || 'auto'}
  width: ${props => props.width || 'auto'}
  ${screen.mobile`
    margin-left: 0;
    margin-right: 0;
  `}
  ${screen.tablet`
    max-width: ${layout.tabletSmallWidth};
  `}

  ${screen.desktop`
    max-width: ${layout.desktopSmallWidth};
  `}

  ${screen.overDesktop`
    max-width: ${layout.hdDesktopSmallWidth};
  `}
`

const DescTextBlock = styled.div`
  color: ${colors.gray.gray50};
  font-size: ${typography.font.size.medium};
  line-height: 1.8;
  margin: 17px ${mockups.component.margin.right} 0 ${mockups.component.margin.left};
  ${screen.tabletAbove`
    margin: 17px auto 0 auto;
  `}
  ${screen.tablet`
    max-width: ${layout.tabletSmallWidth};
  `}

  ${screen.desktop`
    max-width: ${layout.desktopSmallWidth};
  `}

  ${screen.overDesktop`
    max-width: ${layout.hdDesktopSmallWidth};
  `}
`

const TextLink = styled.div`
  border-bottom: 1px solid;
  border-color: ${colors.red.rustyRed};
`

const TopicBox = styled.div`
  border: solid 2px ${colors.red.rustyRed};
  color: ${colors.red.rustyRed};
  display: inline;
  font-size: ${typography.font.size.medium};
  font-weight: ${typography.font.weight.bold};
  margin-right: 0.5rem;
  padding: 0.1rem 0.5rem;
`

export {
  ComponentContainer,
  ComponentInnerBlock,
  DescTextBlock,
  DisabledInnerBlock,
  TextLink,
  TopicBox
}

export default {
  ComponentContainer,
  ComponentInnerBlock,
  DescTextBlock,
  DisabledInnerBlock,
  TextLink,
  TopicBox
}
