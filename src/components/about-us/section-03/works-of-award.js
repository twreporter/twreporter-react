import { colors, font } from '../constants/styles'
import { screen } from '../utils/screen'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Link from 'react-router/lib/Link'

const _ = {
  groupBy,
  map
}

const Container = styled.div`
  margin-top: 16px;
  ${screen.tablet`
    margin-top: 30px;
  `}
  ${screen.desktop`
    margin-top: 52px;
  `}
  ${screen.overDesktop`
    margin-top: 41px;
  `}
`

const Date = styled.h4`
  font-family: ${font.family.english.din}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.bold};
  font-style: ${font.style.italic};
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0.2px;
  margin: 0 0 16px 0;
  ${screen.desktopAbove`
    margin: 0 0 29px 0;
  `}
  ::before {
    content: "・";
  }
`

const Group = styled.h5`
  border-left: 8px solid ${colors.white};
  padding-left: 11px;
  margin: 30px 0 26px 0;
  ${screen.tabletAbove`
    margin: 50px 0 23px 0;
  `}
  &:first-of-type {
    margin-top: 0;
  }
`

const GroupChinese = styled.div`
  font-family: ${font.family.chinese}, ${font.family.sansSerifFallback};
  font-size: 14px;
  font-weight: ${font.weight.bold};
  letter-spacing: 3.3px;
`

const GroupEnglish = styled.div`
  font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
  font-size: 12px;
  font-style: ${font.style.italic};
  font-weight: ${font.weight.bold};
  letter-spacing: 0.2px;
`

const ItemPerRank = styled.div`
  display: flex;
  margin-top: 23px;
  align-items: flex-start;
`

const Ranking = styled(Link)`
  border-radius: 32px;
  border: solid 1px ${colors.white};
  flex-shrink: 0;
  flex-grow: 0;
  width: 94px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6px 14px;
  &:link, &:visited {
    color: ${colors.white};
  }
`

const RankingChinese = styled.div`
  font-family: ${font.family.chinese}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.bold};
  font-size: 14px;
  white-space: pre-wrap;
  text-align: center;
`

const RankingEnglish = styled.div`
  font-family: ${font.family.english.din}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.bold};
  font-size: 10px;
  white-space: pre-wrap;
  text-align: center;
`

const WorkContent = styled.div`
  margin-left: 17px;
  flex-shrink: 1;
  flex-grow: 0;
`

const Title = styled(Link)`
  &:link, &:visited {
    color: ${colors.white};
  }
`

const TitleChinese = styled.div`
  font-family: ${font.family.chinese}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.bold};
  font-size: 17px;
  line-height: 1.24;
  letter-spacing: 4px;
  white-space: pre-wrap;
`

const TitleEnglish = styled.div`
  font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.medium};
  font-size: 14px;
  letter-spacing: 0.3px;
  white-space: pre-wrap;
`

const Content = styled.div`
  ${screen.desktopAbove`
    margin-left: 30px;
  `}
  &:link, &:visited {
    color: ${colors.white};
  }
`

const Comment = styled(Link)`
  font-family: ${font.family.chinese}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.regular};
  font-size: 12px;
  line-height: 1.33;
  white-space: pre-wrap;
  color: ${colors.black};
`

export default class WorksOfAward extends PureComponent {
  static propTypes = {
    works: PropTypes.arrayOf(PropTypes.shape({
      group: PropTypes.string,
      groupEng: PropTypes.string,
      ranking: PropTypes.string,
      rankingEng: PropTypes.string,
      title: PropTypes.string,
      titleEng: PropTypes.string,
      newsPageLink: PropTypes.string,
      awardPageLink: PropTypes.string,
      origin: PropTypes.string
    })).isRequired
  }
  _transToRelativeLinkIfNeeded(link) {
    const reg = /[http[s]*:\/\/]*www.twreporter.org/g
    if (typeof link === 'string') {
      return link.replace(reg, '')
    }
    return link
  }
  _buildItemPerRank = (item, key) => {
    const {
      ranking,
      rankingEng,
      title,
      titleEng,
      titleLink,
      commentLink,
      comment
    } = item
    const titleTo = this._transToRelativeLinkIfNeeded(titleLink)
    const commentTo = this._transToRelativeLinkIfNeeded(commentLink)
    return (
      <ItemPerRank key={key}>
        {!ranking ? null: (
        <Ranking to={titleTo}>
          <RankingChinese>{ranking}</RankingChinese>
          <RankingEnglish>{rankingEng}</RankingEnglish>
        </Ranking>)}
        <WorkContent>
          <Title to={titleTo}>
            <TitleChinese>{title}</TitleChinese>
            <TitleEnglish>{titleEng}</TitleEnglish>
          </Title>
          {!comment ? null : (
          <Comment to={commentTo}>{comment}</Comment>)}
        </WorkContent>
      </ItemPerRank>
    )
  }
  _buildGroup = (works, group) => {
    const groupEng = works[0].groupEng
    return (
      <React.Fragment key={group}>
        <Group>
          <GroupChinese>{group}</GroupChinese>
          <GroupEnglish>{groupEng}</GroupEnglish>
        </Group>
        {_.map(works, this._buildItemPerRank)}
      </React.Fragment>
    )
  }
  render() {
    const { works, date } = this.props
    if (!this._worksByGroup) {
      this._worksByGroup = _.groupBy(works, item => item.group)
    }
    return (
      <Container>
        <Date>{date}</Date>
        <Content>
          {_.map(this._worksByGroup, this._buildGroup)}
        </Content>
      </Container>
    )
  }
}
