import { font } from './styles/common-variables'
import { mediaScreen } from './styles/style-utils'
import Bookmark from './bookmark'
import predefinedPropTypes from '../../constants/bookmarks/prop-types'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map
}

const PageContainer = styled.div`
  padding: 50px 0;
  margin: 0;

  ${mediaScreen.mobile`
    padding: 25px 0;
  `}
`

const Column = styled.div`
  margin: 0 auto;
  width: 97%;
  max-width: 834px;
  ${mediaScreen.tablet`
    width: 100%;
    max-width: 707px;
  `}
  ${mediaScreen.mobile`
    width: 100%;
  `}
`

const StatusBar = styled.div`
  ${mediaScreen.mobile`
    padding-left: 1em;
  `}
  padding-bottom: 25px;
  width: 100%;
`

const CountTitle = styled.span`
  font-size: ${font.size.xlarge};
  ${mediaScreen.mobile`
    font-size: ${font.size.large};
  `}
  margin-right: 1em;
`
const CountNumber = styled.span`
  font-size: ${font.size.xlarge};
  ${mediaScreen.mobile`
    font-size: ${font.size.large};
  `}
  font-weight: ${font.weight.bold};
`

const BookmarksContainer = styled.ul`
  margin: 0;
  width: 100%;
  padding: 0;
`

function Bookmarks({ total, bookmarks, handleDelete }) {
  const buildBookmark = (bookmark) => (
    <Bookmark
      key={`bookmark_${_.get(bookmark, 'id')}`}
      bookmark={bookmark}
      handleDelete={handleDelete}
    />
  )
  return (
    <PageContainer>
      <Column>
        <StatusBar>
          <CountTitle>全部</CountTitle>
          <CountNumber>{total}</CountNumber>
        </StatusBar>
        <BookmarksContainer>
          {_.map(bookmarks, buildBookmark)}
        </BookmarksContainer>
      </Column>
    </PageContainer>
  )
}

Bookmarks.defaultProps = {
  bookmarks: [],
  total: 0
}

Bookmarks.propTypes = {
  bookmarks: PropTypes.arrayOf(predefinedPropTypes).isRequired,
  handleDelete: PropTypes.func.isRequired,
  total: PropTypes.number
}


export default Bookmarks
