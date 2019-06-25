import { colors, font } from './styles/common-variables'
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
import { media, truncate } from './styles/style-utils'
import BookmarkIcon from '../../../static/asset/bookmarks/bookmark.svg'
import CustomizedLink from './customized-link'
import ImgWrapper from './image-wrapper'
import predefinedPropTypes from '../../constants/bookmarks/prop-types'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// lodash
import get from 'lodash/get'

const _ = {
  get
}

const READ_MORE = '閱讀更多...'

const styles = {
  desktop: {
    imageWidth: 209, // px
    imageHeight: 209, // px
    imageBoxPadding: [ 32, 32, 35, 20 ], // px
    textBoxPadding: [ 32, 32, 35, 0 ] // px
  },
  tablet: {
    imageWidth: 181, // px
    imageHeight: 181, // px
    imageBoxPadding: [ 32, 32, 35, 20 ], // px
    textBoxPadding: [ 32, 32, 35, 0 ] // px
  },
  mobile: {
    imageHeight: 121, // px
    imageBoxPadding: [ 22, 22, 22, 22 ], // px
    textBoxPadding: [ 0, 21, 26, 21 ] // px
  }
}


const BookmarkIconComp = styled(BookmarkIcon)`
  &:hover {
    path {
      fill: ${colors.hoverRed};
      transition: fill 200ms linear;
    }
  }
`

const BookmarkFrame = styled.div`
  margin: 0;
  margin-bottom: 15px;
`
const BookmarkContentContainer = styled.li`
  position: relative;
  width: 100%;
  background-color: ${colors.white};

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  ${media.largeMobile`
    flex-direction: column;
    align-items: center;
  `}
  margin: 0;
  :last-of-type {
    margin-bottom: 0;
  }
`

const ImageBox = styled.div`
  padding: ${styles.desktop.imageBoxPadding.map(value => `${value}px`).join(' ')};
  ${media.tablet`
    padding: ${styles.tablet.imageBoxPadding.map(value => `${value}px`).join(' ')};
  `}
  ${media.largeMobile`
    padding: ${styles.mobile.imageBoxPadding.map(value => `${value}px`).join(' ')};
    width: 100%;
  `}
  flex-basis: auto;
  flex-grow: 0;
  line-height: 1;
`
const ImageFrame = styled.div`
  width: ${styles.desktop.imageWidth}px;
  height: ${styles.desktop.imageHeight}px;
  ${media.tablet`
    width: ${styles.tablet.imageWidth}px;
    height: ${styles.tablet.imageHeight}px;
  `}
  ${media.largeMobile`
    width: 100%;
    height: ${styles.mobile.imageHeight}px;
  `}
  line-height: 1;
`

const TextBox = styled.div`
  padding: ${styles.desktop.textBoxPadding.map(value => `${value}px`).join(' ')};
  min-height: ${styles.desktop.imageHeight + styles.desktop.imageBoxPadding[0] + styles.desktop.imageBoxPadding[2]}px;
  ${media.tablet`
    padding: ${styles.tablet.textBoxPadding.map(value => `${value}px`).join(' ')};
    min-height: ${styles.tablet.imageHeight + styles.tablet.imageBoxPadding[0] + styles.tablet.imageBoxPadding[2]}px;
  `}
  ${media.largeMobile`
    padding: ${styles.mobile.textBoxPadding.map(value => `${value}px`).join(' ')};
    min-height: 0;
    width: 100%;
  `}
  position: relative;
  flex-basis: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`

const Category = styled.span`
  font-size: ${font.size.medium};
  ${media.largeMobile`
    font-size: ${font.size.base};
  `}
  line-height: 1;
  color: ${colors.primaryRed};
`

const FirstRow = styled.div`
  margin-bottom: .8em;
  ${media.largeMobile`
    margin-bottom: .5em;
  `}
  width: 100%;
  flex-basis: auto;
  flex-grow: 0;
`

const Title = styled.div`
  font-size: ${font.size.title.bookmark};
  line-height: 1.41;
  margin-bottom: 18px;
  ${media.largeMobile`
    font-size: ${font.size.title.bookmarkMobile};
    line-height: 1.55;
    margin-bottom: 0;
  `}
  font-weight: ${font.weight.bold};
  color: ${colors.bookmarkTextGrey};
  flex-basis: auto;
  flex-grow: 0;
`

const Description = styled.div`
  width: 98%;
  color: ${colors.bookmarkTextGrey};
  font-size: ${font.size.large};
  ${truncate('relative', 1.57, 2, colors.white, 'justify')};
  flex-basis: auto;
  flex-grow: 0;
  ${media.largeMobile`
    flex-basis: 0;
    display: none;
  `}
`

const LastRow = styled.div`
  margin-top: 1em;
  width: 100%;
  position: relative;
`

const ReadMore = styled.div`
  font-size: ${font.size.base};
  text-align: left;
  color: #8c8c8c;
  cursor: pointer;
  display: inline-block;
`

const Date = styled.span`
  vertical-align: top;
  font-size: 16px;
  font-weight: ${font.weight.light};
  color: ${colors.greyishBrown};
  float: right;
`

const RemoveBookMarkBtn = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-44%);
  line-height: 1;
  svg {
    width: 15px;
    height: auto;
  }
  cursor: pointer;
`

export default class Bookmark extends React.PureComponent {
  static propTypes = {
    bookmark: predefinedPropTypes.bookmark.isRequired,
    handleDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    return this.props.handleDelete(_.get(this.props, 'bookmark.id'))
  }

  render() {
    const {
      thumbnail,
      category,
      title,
      desc,
      published_date,
      slug,
      is_external,
      host
    } = _.get(this.props, 'bookmark', {})

    return (
      <BookmarkFrame>
        <BookmarkContentContainer>
          <CustomizedLink isExternal={is_external} slug={slug} host={host}>
            <ImageBox>
              <ImageFrame>
                <ImgWrapper src={thumbnail} alt={`Bookmark_Image_${title}`} />
              </ImageFrame>
            </ImageBox>
          </CustomizedLink>
          <TextBox>
            <CustomizedLink isExternal={is_external} slug={slug} host={host}>
              <FirstRow>
                <Category>{category}</Category>
                <Date>{date2yyyymmdd(published_date * 1000, '.')}</Date>
              </FirstRow>
              <Title>{title}</Title>
              <Description>
                {desc}
              </Description>
            </CustomizedLink>
            <LastRow>
              <CustomizedLink isExternal={is_external} slug={slug} host={host}>
                <ReadMore>{READ_MORE}</ReadMore>
              </CustomizedLink>
              <RemoveBookMarkBtn>
                <BookmarkIconComp
                  onClick={this.handleDelete}
                />
              </RemoveBookMarkBtn>
            </LastRow>
          </TextBox>
        </BookmarkContentContainer>
      </BookmarkFrame>
    )
  }
}
