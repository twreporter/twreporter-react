import styled from 'styled-components'
import Base from './base'
import mq from '../../../utils/media-query'

const Content = styled(Base.Content)`
  align-items: flex-start;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding: 0 0 30px 10px;
  ${mq.tabletOnly`
    padding: 0 0 90px 34px;
  `}
  ${mq.desktopAndAbove`
    padding:  0 0 50px 50px;
  `}
`

const Headline = styled(Base.Headline)`
  order: 1;
  margin-bottom: 10px;
`

const Title = styled(Base.Title)`
  order: 2;
  margin-bottom: 5px;
`

const Subtitle = styled(Base.Subtitle)`
  order: 3;
`

const Dash = styled(Base.Dash)`
  position: relative;
  left: 10px;
  margin-top: 20px;
  order: 4;
  margin-bottom: 25px;
`

const PublishDate = styled(Base.PublishDate)`
  order: 5;
`

const ArrowDown = styled(Base.ArrowDown)`
  position: absolute;
  bottom: 26px;
  left: 7.2rem;
  ${mq.tabletOnly`
    bottom: 86px;
    left: 9.5rem;
  `}
  ${mq.desktopAndAbove`
    bottom: 46px;
    left: 11rem;
    &:hover {
      bottom: 43px;
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
