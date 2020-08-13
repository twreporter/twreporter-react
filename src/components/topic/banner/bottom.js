import styled from 'styled-components'
import Base from './base'
import mq from '../../../utils/media-query'

const Content = styled(Base.Content)`
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 65px;
  ${mq.tabletOnly`
    padding-bottom: 110px;
  `}
  ${mq.desktopAndAbove`
    padding-bottom: 90px;
  `}
`

const Headline = styled(Base.Headline)`
  order: 1;
  margin-bottom: 15px;
  ${mq.tabletOnly`
    margin-bottom: 25px;
  `}
  ${mq.desktopAndAbove`
    margin-bottom: 25px;
  `}
`

const PublishDate = styled(Base.PublishDate)`
  order: 2;
  margin-bottom: 15px;
  ${mq.tabletOnly`
    margin-bottom: 20px;
  `}
  ${mq.desktopAndAbove`
    margin-bottom: 20px;
  `}
`

const Dash = styled(Base.Dash)`
  order: 3;
  margin-bottom: 15px;
  ${mq.tabletOnly`
    margin-bottom: 15px;
  `}
  ${mq.desktopAndAbove`
    margin-bottom: 15px;
  `}
`

const Title = styled(Base.Title)`
  order: 4;
  margin-bottom: 0;
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
  order: 5;
  width: 75%;
  text-align: center;
`

const ArrowDown = styled(Base.ArrowDown)`
  left: 50%;
  transform: translateX(-50%);
  bottom: 23px;
  ${mq.desktopAndAbove`
    &:hover {
      bottom: 20px;
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
