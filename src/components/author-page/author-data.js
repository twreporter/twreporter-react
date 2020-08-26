import mq from '../../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import Sizing from '../sizing'
import styled from 'styled-components'
// @twreporter
import Image from '@twreporter/react-article-components/lib/components/img-with-placeholder'

const Container = styled.div`
  margin: 30px auto 50px auto;
  ${mq.mobileOnly`
    text-align: center;
  `}
  ${mq.tabletAndAbove`
    display: flex;
  `}
`

const ImageContainer = styled.div`
  border-radius: 50%;
  overflow: hidden;
  ${mq.mobileOnly`
    width: 95px;
    flex: 0 0 95px;
    height: 95px;
    margin: 0 auto 12px auto;
  `}
  ${mq.tabletOnly`
    width: 145px;
    flex: 0 0 145px;
    height: 145px;
    margin-right: 45px;
  `}
  ${mq.desktopAndAbove`
    width: 150px;
    flex: 0 0 150px;
    height: 150px;
    margin-right: 50px;
  `}
`

const Content = styled.div`
  ${mq.mobileOnly`
    padding: 0 30px;
  `}
  ${mq.tabletOnly`
    flex: 1 1 356px;
  `}
  ${mq.desktopAndAbove`
    flex: 1 1 454px;
  `}
`

const Name = styled.div`
  color: #404040;
  font-size: 20px;
  font-weight: 700;
  ${mq.mobileOnly`
    margin-bottom: 8px;
  `}
  ${mq.tabletAndAbove`
    word-break: break-all;
  `}
`

const Mail = styled.div`
  color: #404040;
  font-size: 15px;
  ${mq.tabletAndAbove`
    word-break: break-all;
  `}
`

const Bio = styled.div`
  color: #262626;
  font-size: 18px;
  font-weight: 300;
  line-height: 1.7;
  letter-spacing: 0.5px;
  margin-top: 16px;
  white-space: pre-wrap;
`

const AuthorData = props => {
  const { image, name, title, mail, bio } = props.authorData
  const displayedTitle = title ? `（${title}）` : ''
  return (
    <Sizing size="small">
      <Container>
        <ImageContainer>
          <Image
            alt={displayedTitle}
            defaultImage={image}
            imageSet={[image]}
            objectFit="cover"
          />
        </ImageContainer>
        <Content>
          <Name>{name + displayedTitle}</Name>
          {!mail ? null : <Mail>{mail}</Mail>}
          <Bio>{bio}</Bio>
        </Content>
      </Container>
    </Sizing>
  )
}

AuthorData.propTypes = {
  authorData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    image: PropTypes.object,
    mail: PropTypes.string,
    bio: PropTypes.string,
  }),
}

export default AuthorData
