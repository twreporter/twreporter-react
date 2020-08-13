import styled from 'styled-components'
import Base from './base'
import mq from '../../../utils/media-query'

const Content = styled(Base.Content)`
  justify-content: center;
  align-items: center;
`

const Headline = styled(Base.Headline)`
  order: 1;
  margin-bottom: 15px;
  ${mq.tabletOnly`
    margin-bottom: 15px;
  `}
  ${mq.desktopAndAbove`
    margin-bottom: 15px;
  `}
`

const Title = styled(Base.Title)`
  order: 2;
  margin-bottom: 5px;
  width: 70%;
  text-align: center;
  ${mq.tabletOnly`
    margin-bottom: 5px;
  `}
  ${mq.desktopAndAbove`
    margin-bottom: 5px;
  `}
`

const Subtitle = styled(Base.Subtitle)`
  order: 3;
  width: 75%;
  text-align: center;
  ${mq.tabletOnly`
    margin-bottom: 20px;
  `}
  ${mq.desktopAndAbove`
    margin-bottom: 20px;
  `}
`

const Dash = styled(Base.Dash)`
  order: 4;
  margin-top: 15px;
  margin-bottom: 15px;
  ${mq.tabletOnly`
    margin-bottom: 25px;
  `}
  ${mq.desktopAndAbove`
    margin-bottom: 25px;
  `}
`

const PublishDate = styled(Base.PublishDate)`
  order: 5;
`

const ArrowDown = styled(Base.ArrowDown)`
  left: 50%;
  transform: translateX(-50%);
  bottom: 23px;
  ${mq.tabletOnly`
    bottom: 73px;
  `}
  ${mq.desktopAndAbove`
    bottom: 53px;
    &:hover {
      bottom: 50px;
    }
  `}
`

export default {
  Content,
  Headline,
  Title,
  Subtitle,
  Dash,
  PublishDate,
  ArrowDown,
}
