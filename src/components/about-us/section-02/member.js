import { colors, font } from '../constants/styles'
import { screen } from '../utils/screen'
import bgDotted from '../../../../static/asset/about-us/bg-dotted.png'
import bgFilled from '../../../../static/asset/about-us/bg-filled.png'
import defaultImage from '../../../../static/asset/about-us/members/default-img.png'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'

const coverSize = {
  tablet: '41px',
  desktop: '51px'
}
const imageSize = '79px'
const itemHeight = '108px'
const itemWidth = imageSize

const membersContainerWidth = {
  tablet: '719px',
  desktop: '840px',
  overDesktop: '818px'
}

const buildItemCss = (option = {
  itemWidth: 0,
  nPerLine: 0,
  nTotal: 0,
  containerWidth: 0
}) => {
  const itemWidth = parseInt(option.itemWidth, 10)
  const containerWidth = parseInt(option.containerWidth, 10)
  const { nPerLine, nTotal } = option
  const unitMargin = Math.floor((containerWidth - (nPerLine * itemWidth) - 1) / (nPerLine - 1))
  const nOfRest = nTotal % nPerLine
  const nOfPad = nPerLine - nOfRest
  if (nOfRest > 0) {
    return css`
      margin-right: ${unitMargin}px;
      &:first-of-type {
        margin-left: ${(itemWidth + unitMargin) * nOfPad}px;
      }
      &:nth-of-type(${nPerLine}n+${nOfRest}) {
        margin-right: 0;
      }
    `
  } else {
    return css`
      margin-right: ${unitMargin}px;
      &:nth-of-type(${nPerLine}n+${nOfRest}) {
        margin-right: 0;
      }
    `
  }
}

const ImageBlock = styled.div`
  background-image: url(${props => props.imageSrc});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  width: ${imageSize};
  height: ${imageSize};
`

const Cover = ImageBlock.extend`
  ${screen.mobile`
    display: none;
  `}
  ${screen.tablet`
    background-size: ${coverSize.tablet} ${coverSize.tablet};
    background-position: center center;
  `}
  ${screen.desktopAbove`
    background-size: ${coverSize.desktop} ${coverSize.desktop};
    background-position: center center;
  `}
`

const Head = ImageBlock.extend``

const TextBlock = styled.div`
  color: ${colors.primary};
`

const JobWrapper = styled.div``

const Job = styled.div`
  font-family: ${font.family.chinese}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.bold};
  white-space: nowrap;  
`

const JobEng = styled.div`
  font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
  font-style: ${font.style.italic};
  font-weight: ${font.weight.medium};
  white-space: nowrap;
`

const NameWrapper = styled.div``

const Name = styled.div`
  font-family: ${font.family.chinese}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.bold};
  white-space: nowrap;
`

const NameEng = styled.div`
  font-weight: ${font.weight.bold};
  font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
  white-space: nowrap;
`

const Container = styled.div`
  ${screen.mobile`
    display: flex;
    height: ${props => (props.isActive ? '105px' : '0')};
    overflow: hidden;
    transition: height 500ms ease;
    border-bottom: ${props => (props.isActive ? `1px solid ${colors.primary}` : '0')};
    &:last-of-type {
      border: 0;
    }
    ${Head} {
      flex: 0 0 ${imageSize};
      margin: 15px 0;
    }
    ${TextBlock} {
      flex: 1 1 auto;
      padding: 22px 0 24px 7px;
    }
    ${Job} {
      font-size: 12px;
      line-height: 1;
      letter-spacing: 2.8px;
      margin-right: -2.8px;
    }
    ${JobEng} {
      font-size: 12px;
      line-height: 1;
      letter-spacing: .2px;
      margin-top: 2px;
    }
    ${NameWrapper} {
      font-size: 20px;
      line-height: 20px;
      height: 20px;
      margin-top: 9px;
    }
    ${Name} {
      display: inline-block;
      vertical-align: middle;
      font-size: 20px;
      letter-spacing: 5px;
      margin-right: -5px;
    }
    ${NameEng} {
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      letter-spacing: .3px;
    }
  `}
  ${screen.tabletAbove`
    cursor: default;
    width: ${itemWidth};
    height: ${itemHeight};
    overflow: visible;
    position: relative;
    flex: 0 0 ${itemWidth};
    &:hover {
      ${Head} {
        filter: blur(2px);
      }
      ${TextBlock} {
        opacity: 1;
      }
    }
    ${Cover} {
      z-index: 5;
      position: absolute;
      top: calc((${itemHeight} - ${imageSize}) / 2);
      left: 0;
      transform: rotateY(${props => props.isActive ? '90deg' : '0'});
      transition: ${props => props.isActive ? 'transform 250ms ease' : 'transform 250ms ease 250ms'};
    }
    ${Head} {
      z-index: 10;
      position: absolute;
      top: calc((${itemHeight} - ${imageSize}) / 2);
      left: 0;
      transform: rotateY(${props => props.isActive ? '0' : '90deg'});
      transition: ${props => !props.isActive ? 'transform 250ms ease' : 'transform 250ms ease 250ms'};
    }
    ${TextBlock} {
      display: ${props => (props.isActive ? 'block': 'none')};
      opacity: 0;
      transition: opacity 500ms ease;
      z-index: 20;
      position: absolute;
      width: ${itemWidth};
      height: ${itemHeight};
      text-align: center;
      background-color: rgba(255, 255, 255, 0.8);
    }
    ${JobWrapper} {
      text-align: left;
      line-height: 1;
      font-size: 10px;
      max-width: ${itemWidth};
      overflow: visible;
    }
    ${Job} {
      text-align: center;
      text-align-last: justify;
      display: inline-block;
      min-width: 52px;
      font-size: 10px;
      letter-spacing: 2.3px;
      margin-right: -2.3px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    ${JobEng} {
      display: inline-block;
      margin-top: 3px;
      text-align: center;
      font-size: 10px;
      letter-spacing: .2px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    ${NameWrapper} {
      text-align: left;
      margin-top: 10px;
      padding: 11px 0;
      line-height: 1;
      font-size: 12px;
      border-top: 1px solid ${colors.primary};
      border-bottom: 1px solid ${colors.primary};
      max-width: ${itemWidth};
      overflow: visible;
    }
    ${Name} {
      text-align: center;
      text-align-last: justify;
      display: inline-block;
      min-width: ${itemWidth};
      font-size: 18px;
      letter-spacing: 2.3px;
      margin-right: -2.3px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    ${NameEng} {
      display: inline-block;
      font-size: 12px;
      margin-top: 4px;
      letter-spacing: .2px;
      text-align: center;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  `}
  ${screen.tablet`
    ${props => buildItemCss({
      itemWidth,
      nPerLine: 7,
      nTotal: props.nTotal,
      containerWidth: membersContainerWidth.tablet
    })}
  `}
  ${screen.desktop`
    ${props => buildItemCss({
      itemWidth,
      nPerLine: 9,
      nTotal: props.nTotal,
      containerWidth: membersContainerWidth.desktop
    })}
  `}
  ${screen.overDesktop`
    ${props => buildItemCss({
      itemWidth,
      nPerLine: 9,
      nTotal: props.nTotal,
      containerWidth: membersContainerWidth.overDesktop
    })}
  `}
`


export default class Member extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    nameEng: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
    jobEng: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired
  }

  static defaultProps = {
    imageSrc: defaultImage,
    isActive: false
  }

  constructor(props) {
    super(props)
    this._coverImage = this._coverImage || Math.random() > 0.6 ? bgDotted : bgFilled
  }

  render() {
    const { name, nameEng, job, jobEng, imageSrc, isActive, nTotal } = this.props
    return (
      <Container
        nTotal={nTotal}
        isActive={isActive}
      >
        <Cover
          imageSrc={this._coverImage}    
        />
        <Head
          imageSrc={imageSrc}
        />
        <TextBlock>
          <JobWrapper>
            <Job>{job}</Job>
            <JobEng>{jobEng}</JobEng>
          </JobWrapper>
          <NameWrapper>
            <Name>{name}</Name>
            <NameEng>{nameEng}</NameEng>
          </NameWrapper>
        </TextBlock>
      </Container>
    )
  }
}
