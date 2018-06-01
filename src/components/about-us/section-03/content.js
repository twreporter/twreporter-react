import { colors } from '../../../themes/common-variables'
import { screen } from '../utils/screen'
import ArrowNextIcon from '../../../../static/asset/about-us/arrow-next.svg'
import AwardItems from './award-items'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Timeline from './timeline'

const RunningTimeline = styled.div `
  ${screen.mobile`
    display: none;
  `}
`

const PaginatedTimeline = styled.div `
  ${screen.tabletAbove`
    display: none;
  `}
`

const RightArrow = styled.div `
  width: 30px;
  height: 70px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;    
`

const Container = styled.div `
  position: relative;
  width: 100%;
  height: 100%;
  float: right;
  text-align: center;
  overflow-y: hidden;
  background: ${colors.gray.gray96};
  background-clip: content-box;
  padding: 54px 0 54px 34px;
  ul{
    text-align: left;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  a{
    color: ${colors.black};
  }
  p, h2{
    display: block;
    margin: 0;
  }
  li{
    p:first-child{
      margin-left: -20px;
      span{
        font-size: 13px;
        letter-spacing: 2.2px;
      }
      span:first-child{
        font-weight: bold;
        margin-right: 13px;
      }
    }
    h2{
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 0.8px;
    }
    p:last-child{
      font-size: 14px;
      font-weight: bold;
      line-height: 2.71;
      letter-spacing: 1px;
      color: ${colors.secondaryColor};
    }
  }
  ${screen.overDesktop`
    width: 530px;
    li{
      margin: 10px 0 0 -10px;
      p:first-child{
        margin-left: -20px;
      }
    }  
  `}
  ${screen.desktop`
    padding: 54px 0 54px 34px;
    width: 432px;
    li{
      margin: 10px 0 0 -5px;
      p:first-child{
        margin-left: -25px;
      }
    }  
  `}
  ${screen.tablet`
    height: 519px;
    margin-top: 60.1px;
  `}
  ${screen.mobile`
    height: 456px;
    margin-top: 42px;
    padding: 0 0 0 35px;
    li{
      margin: 10px 0 30px -10px;
      p:first-child{
        margin-left: -25px;
        span{
          font-size: 14px;
          letter-spacing: 2px;
        }
        span:first-child{
          font-weight: bold;
          margin-right: 5px;
        }
      }
      h2{
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 1px;
      }
      p:last-child{
        font-size: 13px;
        font-weight: bold;
        line-height: 2.92;
        letter-spacing: 1px;
        line-height: 1.71;
      }
    }    
  `}  
`

const SemiTransparentMask = styled.div `
  position: absolute;
  left: 0;
  ${props => props.position === 'top' ? 'top: 0' : 'bottom: 0'};
  width: 100%;
  height: 20px;
  background: ${props => `linear-gradient(to ${props.position}, rgba(255,255,255,0), ${colors.white})`};
`

export default class Content extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      scrollingHeight: 0
    }
  }
  componentDidMount() {
    const scrollingHeight = ReactDOM.findDOMNode(this.awardItems).getBoundingClientRect().height
    this.setState({ scrollingHeight: scrollingHeight })
  }
  render() {
    let { awardsList, page, awardsNumberInSinglePage } = this.props
    let cursor = ( page + 1 ) * awardsNumberInSinglePage
    let paginatedAwardsList = awardsList.slice(cursor - awardsNumberInSinglePage, cursor)
    return (
      <Container>
        <RunningTimeline>
          <Timeline 
            childrenHeight={this.state.scrollingHeight} 
            autoScrolling={this.props.timelineAutoScrolling} >
            <AwardItems
              ref={ items => this.awardItems = items } 
              awardsList={this.props.awardsList} 
            />
          </Timeline>
          <SemiTransparentMask position={"top"}/>
          <SemiTransparentMask position={"bottom"}/>
        </RunningTimeline>
        <PaginatedTimeline>
          <RightArrow
            onClick={this.props.gotoNextPage}>
            <ArrowNextIcon />
          </RightArrow>
          <AwardItems
            awardsList={paginatedAwardsList}
          />
        </PaginatedTimeline>
      </Container>
    )
  }
}

Content.defaultProps = {
  page: 0,
  awardsNumberInSinglePage: 0,
  timelineAutoScrolling: false,
  awardsList: []
}

Content.propTypes = {
  page: PropTypes.number.isRequired,
  awardsNumberInSinglePage: PropTypes.number.isRequired,
  timelineAutoScrolling: PropTypes.bool.isRequired,
  awardsList: PropTypes.array.isRequired,
  gotoNextPage: PropTypes.func.isRequired
}

