import { Link } from 'react-router-dom'
import mq from '../../utils/media-query'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
// @twreporter
import Image from '@twreporter/react-article-components/lib/components/img-with-placeholder'
import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
// lodash
import map from 'lodash/map'

const _ = {
  map
}

const calcWidth = (itemWidth, itemMargin, columns) => (itemWidth + itemMargin * 2) * columns

const fadeInDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeInDown} .5s;
  ${mq.mobileOnly`
    max-width: ${calcWidth(95, 22, 3)}px;
    width: 100%;
  `}
  ${mq.tabletOnly`
    width: ${calcWidth(114, 22, 3)}px;
  `}
  ${mq.desktopAndAbove`
    width: ${calcWidth(114, 22, 4)}px;
  `}
`

const Item = styled.div`
  margin: 22px;
  ${mq.mobileOnly`
    width: 95px;
    flex: 0 0 95px;  
  `}
  ${mq.tabletAndAbove`
    width: 114px;
    flex: 0 0 114px;
  `}
`

const Name = styled.div`
  text-align: center;
  margin-top: 14px;
  color: #404040;
  font-size: 18px;
  text-align: center;
  font-weight: ${fontWeight.normal};
`

const ImageSizing = styled.div`
  border-radius: 50%;
  overflow: hidden;
  transition: transform .2s ease, box-shadow .2s ease;
  ${mq.mobileOnly`
    width: 95px;
    height: 95px;
  `}
  ${mq.tabletAndAbove`
    width: 114px;
    height: 114px;
  `}
  ${mq.desktopAndAbove`
    &:hover {
      transform: translate(-4px, -2px);
      box-shadow: 0 2px 10px 1px hsla(0,0%,70%,.7);
    }
  `}
`

export default class Authors extends PureComponent {
  static propTypes = {
    authors: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      image: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired
      }).isRequired,
      url: PropTypes.string.isRequired
    }))
  }

  static defaultProps = {
    authors: []
  }

  render() {
    const { authors } = this.props
    return (
      <Container>
        {_.map(authors, ({ id, name, image, url }) =>
          (
            <Item key={id}>
              <Link to={url}>
                <ImageSizing>
                  <Image
                    alt={name}
                    imageSet={[ image ]}
                    defaultImage={image}
                    objectFit="cover"
                    objectPosition="center center"
                  />
                </ImageSizing>
                <Name>{name}</Name>
              </Link>
            </Item>
          )
        )}
      </Container>
    )
  }
}
