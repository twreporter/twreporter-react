import { screen } from '../utils/screen'
import DonateIcon from '../../../../static/asset/about-us/donate-icon.svg'
import React from 'react'
import styled from 'styled-components'
import SubscribeIcon from '../../../../static/asset/about-us/subscribe-icon.svg'

const styles = {
  iconContainerSize: 3 // em
}

const subscriptionUrl = 'https://twreporter.us14.list-manage.com/subscribe/post?u=4da5a7d3b98dbc9fdad009e7e&id=e0eb0c8c32'
const donateUrl = 'https://twreporter.backme.tw/checkout/175/3788'

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;  
  align-items: center;
  a{
    height: 100%;
  }
`

const IconContainer = styled.div`
  cursor: pointer;
  width: ${styles.iconContainerSize}em;
  height: ${styles.iconContainerSize}em;
  line-height: 1;
  transition: opacity 600ms ease;
  svg {
    height: 100%;
    padding: 1em;
  }
  span {
    display: none;
  }

  ${screen.tabletBelow`
    svg {
      padding-left: 20px;
    }
  `}

  ${screen.desktopAbove`
    svg {
      opacity: 1;
      transition: transform .3s ease-in-out, opacity .3s ease-in-out;
      height: 100%;
      z-index: 1;
    }
    span {
      display: inline;
      white-space: nowrap;
      overflow: hidden;
      opacity: 0;
      transition: transform .3s ease-in-out, opacity .3s ease-in-out;
      transform: scale(.4, 1.2);
      position: absolute;
      height: 100%;
      width: 2em;
      line-height: ${styles.iconContainerSize};
      top: 0;
      left: 17%;
      z-index: 2;
    }
    &:hover {
      svg {
        transform: scale(1.7, .5);
        opacity: 0;
      }
      span {
        transform: scale(1, 1);
        opacity: 1;
      }
    }
  `}
`

class Icons extends React.PureComponent {
  render() {
    return (
      <IconsContainer>
        <IconContainer>
          <a href={subscriptionUrl} target="_blank">
          <SubscribeIcon />
        </a>
        </IconContainer>
        <IconContainer>
          <a href={donateUrl} target="_blank">
            <DonateIcon />
          </a>
        </IconContainer>
      </IconsContainer>
    )
  }
}

export default Icons
