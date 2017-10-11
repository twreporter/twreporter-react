import React from 'react'
import styled from 'styled-components'
import { HeadingAuthor } from './HeadingAuthor'
import { PublishDate } from './PublishDate'
import { ShareBt } from './ShareBt'
import PrintButton from '../shared/PrintButton'
import FontChangeButton from '../FontChangeButton'
import { screen } from '../../themes/screen'

import { LAYOUT, COMPONENT_MARGIN } from '../../themes/common-variables'


const Container = styled.div`
  display: block;
  margin: 0 auto 24px auto;
  > div {
    margin-bottom: 24px;
  }
  ${screen.desktopAbove`
    width: ${LAYOUT.desktop.small};
    margin-bottom: ${COMPONENT_MARGIN.marginBottom};
  `}
  ${screen.tablet`
    width: ${LAYOUT.tablet.small};
  `}
  ${screen.mobile`
    margin: 0 ${COMPONENT_MARGIN.horizontalMargin} 24px ${COMPONENT_MARGIN.horizontalMargin};
  `}
`

const ArticleMeta = (props) => {
  const { authors, extendByline, publishedDate, appId, url, title, fbIcon, twitterIcon, lineIcon, changeFontSize, fontSize } = props

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
          fbIcon={fbIcon}
          twitterIcon={twitterIcon}
          lineIcon={lineIcon}
        />
        <PrintButton />
        <FontChangeButton
          changeFontSize={changeFontSize}
          fontSize={fontSize}/>
      </div>
    </Container>
  )
}

export default ArticleMeta
