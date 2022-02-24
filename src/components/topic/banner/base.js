import mq from '../../../utils/media-query'
import styled from 'styled-components'
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'

const textShadow = '0 2px 10px rgba(0, 0, 0, .5)'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const Headline = styled.div`
  font-family: ${fontFamily.default};
  color: #ffffff;
  display: inline-block;
  background-color: #c71b0a;
  padding: 5px;
  font-size: 18px;
  font-weight: ${fontWeight.normal};
  letter-spacing: 0.1px;
`

const Title = styled.h1`
  font-family: ${fontFamily.title};
  color: #ffffff;
  margin: 0;
  font-size: 30px;
  font-weight: ${fontWeight.bold};
  line-height: 1.4;
  letter-spacing: 2px;
  text-shadow: ${textShadow};
  ${mq.tabletAndAbove`
    font-size: 45px;
  `}
`

const Subtitle = styled.h2`
  font-family: ${fontFamily.default};
  color: #ffffff;
  margin: 0;
  font-size: 18px;
  font-weight: ${fontWeight.normal};
  line-height: 1.8;
  letter-spacing: 0.1px;
  text-shadow: ${textShadow};
`

const Dash = styled.div`
  color: #ffffff;
  width: 30px;
  height: 5px;
  background-color: #ffffff;
  text-shadow: ${textShadow};
`

const ArrowDown = styled.div`
  position: absolute;
  cursor: pointer;
  text-align: center;
  width: 39px;
  height: 29px;
  svg {
    width: 25px;
  }
  ${mq.tabletAndAbove`
    transition-property: bottom;
    transition-timing-function: ease-in-out;
    transition-duration: .1s;
  `}
`

const PublishDate = styled.div`
  font-family: ${fontFamily.default};
  color: #ffffff;
  font-size: 13px;
  font-weight: ${fontWeight.normal};
  letter-spacing: 0.1px;
  text-shadow: ${textShadow};
  ${mq.tabletAndAbove`
    font-size: 15px;
  `}
`

export default {
  Content,
  Headline,
  Title,
  Subtitle,
  Dash,
  ArrowDown,
  PublishDate,
}
