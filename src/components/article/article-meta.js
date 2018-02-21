import { articleLayout as layout } from '../../themes/layout'
import { HeadingAuthor } from './HeadingAuthor'
import { PublishDate } from './PublishDate'
import { screen } from '../../themes/screen'
import { ShareBt } from './ShareBt'
import FontChangeButton from '../FontChangeButton'
import PrintButton from '../shared/PrintButton'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: block;
  margin: 0 auto 24px auto;
  > div {
    margin-bottom: 24px;
  }
  ${screen.desktopAbove`
    width: ${layout.desktop.width.small}px;
    margin-bottom: 40px;
  `}
  ${screen.tablet`
    width: ${layout.tablet.width.small}px;
  `}
  ${screen.mobile`
    margin: 0 24px 24px 24px;
  `}
`

class ArticleMeta extends React.Component {
  render() {
    const { authors, extendByline, publishedDate, appId, url, title, changeFontSize, fontSize } = this.props
    return (
      <Container>
        <HeadingAuthor
          authors={authors}
          extendByline={extendByline}
        >
          <PublishDate
            date={publishedDate}
          />
        </HeadingAuthor>
        <div className={'hidden-print'}>
          <ShareBt
            appId={appId}
            url={url}
            title={title}
          />
          <PrintButton />
          <FontChangeButton
            changeFontSize={changeFontSize}
            fontSize={fontSize}/>
        </div>
      </Container>
    )
  }
}

export default ArticleMeta
