import { colors } from '../../../themes/common-variables'
import { screen } from '../utils/screen'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const AwardItem = styled.div`
  display: inline-block;
  ${screen.desktopAbove`
    display: block;
    width: 100%;
    p{
      text-align: left;
      font-weight: bold;
      opacity: ${props => props.currentIndex === 'true' ? '1' : '0.31'};
      font-weight: bold;
      transition: all 200ms ease-in-out;
    }
    cursor: pointer;
  `}
  ${screen.overDesktop`
    p{
      margin-bottom: ${props => props.currentIndex === 'true' ? '25px' : '11px'};
      letter-spacing: ${props => props.currentIndex === 'true' ? '0.8px' : '0.5px'};
      font-size: ${props => props.currentIndex === 'true' ? '24px' : '16px'};
    }  
  `}
  ${screen.desktop`
    p{
      margin-bottom: ${props => props.currentIndex === 'true' ? '25px' : '11px'};
      letter-spacing: ${props => props.currentIndex === 'true' ? '0.7px' : '0.5px'};
      font-size: ${props => props.currentIndex === 'true' ? '22px' : '16px'};
    }  
  `}
  ${screen.tablet`
    width: calc(100% / 2);
    p{
      text-align: center;
      font-size: ${props => props.currentIndex === 'true' ? '24px' : '14px'};
      font-weight: bold;
      letter-spacing: ${props => props.currentIndex === 'true' ? '0.8px' : '0.4px'};
      opacity: ${props => props.currentIndex === 'true' ? '1' : '0.39'};  
    }
  `}
  ${screen.mobile`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    visibility: ${props => props.currentIndex === 'true' ? 'visible' : 'hidden'};
    transition: visibility 1ms linear;
    p{
      font-size: 20px;
      lettter-spacing: 0.6;  
      font-weight: bold;
    }
  `}
`

const Bullet = styled.span `
  display: inline-block;
  visibility: ${props => props.display === 'true' ? 'visible' : 'hidden'};
  margin-left: 9px;
  width: 0;
  height: 0;
	border-top: 9px solid transparent;
	border-left: 10px solid ${colors.black};
  border-bottom: 9px solid transparent;
  ${screen.tabletBelow`
    display: none;
  `}
`

export default class AwardNameList extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { awardsName, activeAwardId, selectAward } = this.props
    return (
      <React.Fragment>
        {
          awardsName.map((name, index) => {
            return (
              <AwardItem
                key={index}
                currentIndex={(activeAwardId === name.awardId).toString()}
                onClick={() => selectAward(name.awardId)}
              >
                <p>
                  {name.award}
                  <span>
                    <Bullet display={(activeAwardId === name.awardId).toString()} />
                  </span>
                </p>
              </AwardItem>
            )
          })
        }
      </React.Fragment>    
    )
  }
}

AwardNameList.defaultProps = {
  awardsName: [],
  activeAwardId: ''
}

AwardNameList.propTypes = {
  awardsName: PropTypes.array.isRequired,
  activeAwardId: PropTypes.string.isRequired,
  selectAward: PropTypes.func
}
