import { colors } from '../constants/styles'
import { replaceStorageUrlPrefix } from '../../../utils/url'
import ImgWrapper from '../utils/img-wrapper'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

export const recordStyle = {
  width: 375, // 335px + 20 (marginLeft and marginRight) * 2,
  widthIncludesMonth: 435
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: ${recordStyle.width}px;
  height: 100%;
  &:first-child {
    width: 435px;
  }
`
const WrapperOverlayMask = styled.div`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(80% - 13px);
  z-index: 1;
`

const LineWrapper = styled.div`
  width: 100%;
  height: 80%;
  border-bottom: solid 13px ${colors.primary};
  z-index: 0;
  ${Container}:first-child & {
    padding-left: 80px;
  }
`

const Info = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: 100%;
  margin: 0 20px;
  ${Container}:first-child & {
    margin-left: 80px;
  }
`
const InfoContainer = styled.div`
  flex: 1 1 auto;
  opacity: ${({ isTriggered }) => isTriggered ? '1' : '0'};
  transition: all 1s ease-in;
  img{
    width: 100%;
  }
  h3,p{
    color: ${colors.primary};
    white-space: normal;
  }
  h3{
    font-size: 16px;
    margin-top: 17px;
    margin-bottom: 21px;
  }
  p{
    font-size: 14px;
    margin: 0;
  }
  ${Container}:nth-child(odd) & {
    img{
      display: none;
    }
  }
`

const Month = styled.div`
  position: absolute;
  display: none;
  left: 90px;
  top: 0;
  transform: translateX(-50%);
`

const Date = styled.div`
  position: relative;
  width: 100%;
  height: 20%;
  text-align: center;
  ${Container}:first-child & {
    padding-left: 80px;
    padding-right: 20px;
    ${Month} {
      display: block;
    }
  }

  h2{
    font-size: 61px;
    color: ${colors.primary};
    margin: 0;
  }
  h3{
    font-size: 20px;
    color: ${colors.primary};
    margin: 0;
    transform: translateX(50%) rotate(-90deg);    
  }
  p{
    font-size: 20px;
    font-weight: 500;
    color: ${colors.primary};
  }
`

const PoleBody = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;
  height: ${({ isTriggered }) => isTriggered ? '100%' : '16px'};
  border-right: solid 1px ${colors.primary};
  transition: all 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
`

const PoleOverlayMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(50% - 5px);
  height: 100%;
`

const PoleHead = styled.div`
  width: 16px;
  height: 16px;
  transform: translateX(50%);
  background: ${colors.primary};
  border-radius: 50%;
`

const Pole = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  flex: 4 1 50px;
  width: 100%;
`

const RandomPadding = styled.div`
  width: 100%;
  height: ${props => props.randheight};
  ${Container}:nth-child(even) & {
    display: none;
  }
`

export class Record extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      paddingHeight: this._getRandomPadding()
    }
  }

  _onMouseOver = () => {
    this.props.onHover()
  }

  _onMouseOut = () => {
    this.props.onLeave()
  }

  /**
 * Return the abbreviation of month in English
 * @param {array} number
 * @return {String} month
 */
  _monthInEng = (number) => {
    switch(number) {
      case 1:  
        return 'JAN'
      case 2:
        return 'FEB'
      case 3:
        return 'MAR'
      case 4:
        return 'APR'
      case 5:
        return 'MAY'
      case 6:
        return 'JUN'
      case 7:
        return 'JUL'
      case 8:
        return 'AUG'
      case 9:
        return 'SEP'
      case 10:
        return 'OCT'
      case 11:
        return 'NOV'
      case 12:
        return 'DEC'
    }
  }

  _getRandomPadding = () => {
    const maxHeight = 213
    return Math.floor(Math.random() * maxHeight) + 'px'
  }
  /**
 * Opens the valid input link in a new window or tab
 * @param {String} href
 */
  _openLink = (href) => {
    if (!href) return
    window.open(href, '_blank')
  }

  render() {
    const { month, date, imgSrc, text, link, isTriggered } = this.props
    return (
      <Container>
        <LineWrapper onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut} />
        <Date
          onMouseOver={this._onMouseOver}
          onMouseOut={this._onMouseOut}
        >
          <Month>
            <h2>{month}</h2>
            <h3>{this._monthInEng(month)}</h3>
          </Month>
          <p>{date}</p>
        </Date>
        <WrapperOverlayMask>
          <Info>
            <InfoContainer isTriggered={isTriggered}>
              <RandomPadding randheight={this.state.paddingHeight}/>
              <div 
                onClick={() => this._openLink(link)}
                onMouseOver={this._onMouseOver}
                onMouseOut={this._onMouseOut}
              >
                <ImgWrapper
                  src={replaceStorageUrlPrefix(imgSrc)}
                />
                <h3>{text.chinese}</h3>
                <p>{text.english}</p>
              </div>
            </InfoContainer>
            <Pole>
              <PoleOverlayMask />
              <PoleBody
                onMouseOver={this._onMouseOver}
                onMouseOut={this._onMouseOut} 
                isTriggered={isTriggered}
              >
                <PoleHead />
              </PoleBody>              
            </Pole>
          </Info>
        </WrapperOverlayMask>
      </Container>
    )
  }
}

Record.defaultProps = {
  month: 12,
  date: 0,
  imgSrc: '',
  text: {},
  link: '',
  isTriggered: false
}

Record.propTypes = {
  month: PropTypes.number.isRequired,
  date: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired,
  isTriggered: PropTypes.bool.isRequired
}

export default Record
