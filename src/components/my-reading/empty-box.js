import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// @twreporters
import {
  DesktopAndAbove,
  TabletAndBelow,
} from '@twreporter/react-components/lib/rwd'
import { P1, P2 } from '@twreporter/react-components/lib/text/paragraph'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { Bookmark } from '@twreporter/react-components/lib/icon'
import {
  InheritLinkButton,
  LinkButton,
} from '@twreporter/react-components/lib/button'

// context
import { CoreContext } from '../../contexts'

const Type = {
  Bookmark: 'bookmark',
  BrowsingHistory: 'browsing-history',
  ShowMoreBookmark: 'show-more-bookmark',
  ReviewingArticle: 'reviewing-article',
}

const EmptyBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  width: 100%;
  padding-top: 64px;
  padding-bottom: 64px;
  justify-content: center;
  align-items: center;
`

const Title = styled.div`
  color: ${colorGrayscale.gray600};
  display: flex;
  justify-content: center;
`

const Description = styled.div`
  color: ${colorGrayscale.gray600};
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const DescriptionCol = styled.div`
  color: ${colorGrayscale.gray600};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const BookmarkIcon = styled.div`
  display: flex;
  & svg {
    background-color: ${colorGrayscale.gray600};
  }
`

const EmptyBookmark = () => {
  const { releaseBranch } = useContext(CoreContext)
  return (
    <EmptyBoxContainer>
      <DesktopAndAbove>
        <Title>
          <P1 weight={P1.Weight.BOLD} text="你還沒有收藏任何報導" />
        </Title>
        <Description>
          <P1 text="點擊" />
          <BookmarkIcon>
            <Bookmark type={Bookmark.Type.ADD} releaseBranch={releaseBranch} />
          </BookmarkIcon>
          <P1 text="收藏你喜愛的報導" />
        </Description>
      </DesktopAndAbove>
      <TabletAndBelow>
        <Title>
          <P2 weight={P2.Weight.BOLD} text="你還沒有收藏任何報導" />
        </Title>
        <Description>
          <P2 text="點擊" />
          <BookmarkIcon>
            <Bookmark type={Bookmark.Type.ADD} releaseBranch={releaseBranch} />
          </BookmarkIcon>
          <P2 text="收藏你喜愛的報導" />
        </Description>
      </TabletAndBelow>
    </EmptyBoxContainer>
  )
}

const EmptyBrowsingHistory = () => {
  return (
    <EmptyBoxContainer>
      <DesktopAndAbove>
        <Title>
          <P1 weight={P1.Weight.BOLD} text="你還沒有造訪過任何報導" />
        </Title>
        <Description>
          <LinkButton
            text="前往首頁"
            link={{
              to: '/',
            }}
            TextComponent={P1}
            type={InheritLinkButton.Type.UNDERLINE}
          />
          <P1 text="探索更多內容" />
        </Description>
      </DesktopAndAbove>
      <TabletAndBelow>
        <Title>
          <P2 weight={P2.Weight.BOLD} text="你還沒有造訪過任何報導" />
        </Title>
        <Description>
          <LinkButton
            text="前往首頁"
            link={{
              to: '/',
            }}
            TextComponent={P2}
            type={InheritLinkButton.Type.UNDERLINE}
          />
          <P2 text="探索更多內容" />
        </Description>
      </TabletAndBelow>
    </EmptyBoxContainer>
  )
}

const ShowMoreBookmark = ({ isMobile = false }) => {
  return (
    <EmptyBoxContainer>
      <DesktopAndAbove>
        <Title>
          <P1 weight={P1.Weight.BOLD} text="你已取消收藏最近的六篇文章" />
        </Title>
        <Description>
          <P1 text="點擊查看更多，看你的其他已收藏文章吧！" />
        </Description>
      </DesktopAndAbove>
      <TabletAndBelow>
        <Title>
          <P2
            weight={P2.Weight.BOLD}
            text={`你已取消收藏最近的${isMobile ? '四' : '六'}篇文章`}
          />
        </Title>
        <Description>
          <P2 text="點擊查看更多，看你的其他已收藏文章吧！" />
        </Description>
      </TabletAndBelow>
    </EmptyBoxContainer>
  )
}

const EmptyReviewingArticle = () => {
  return (
    <EmptyBoxContainer>
      <DesktopAndAbove>
        <Title>
          <P1
            weight={P1.Weight.BOLD}
            text="深度報導不受時空限制，讓我們持續與議題對話"
          />
        </Title>
        <DescriptionCol>
          <P1 text="《報導者》編輯台將不定期回顧重要報導" />
          <P1 text="別忘了回來這裡看看！" />
        </DescriptionCol>
      </DesktopAndAbove>
      <TabletAndBelow>
        <Title>
          <P2
            weight={P2.Weight.BOLD}
            text="深度報導不受時空限制，讓我們持續與議題對話"
          />
        </Title>
        <DescriptionCol>
          <P2 text="《報導者》編輯台將不定期回顧重要報導" />
          <P2 text="別忘了回來這裡看看！" />
        </DescriptionCol>
      </TabletAndBelow>
    </EmptyBoxContainer>
  )
}

ShowMoreBookmark.propTypes = {
  isMobile: PropTypes.bool,
}

const EmptyBox = ({ type = Type.Bookmark, isMobile = false }) => {
  if (type === Type.Bookmark) return <EmptyBookmark />
  if (type === Type.BrowsingHistory) return <EmptyBrowsingHistory />
  if (type === Type.ShowMoreBookmark)
    return <ShowMoreBookmark isMobile={isMobile} />
  if (type === Type.ReviewingArticle) return <EmptyReviewingArticle />
}

EmptyBox.propTypes = {
  type: PropTypes.oneOf(Object.values(Type)),
  isMobile: PropTypes.bool,
}

EmptyBox.Type = Type

export default EmptyBox
