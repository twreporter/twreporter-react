import React from 'react'
import styled from 'styled-components'
// import Link from 'react-router/lib/Link'
import SubscribeIcon from '../../../static/asset/about-us/subscribe-icon.svg'
import DonateIcon from '../../../static/asset/about-us/donate-icon.svg'
import { screen } from './utils/screen'

// import DonateIcon from '../../static/donate-icon.svg'

const styles = {
  iconContainerSize: 3 // em
}

/* Icon alt text takes 2 fullwidth characters specifically */
// const ICON_ALT_TEXT = {
//   SEARCH: '搜尋',
//   SIGN_OUT: '登出',
//   MEMBER: '會員',
//   BOOKMARK: '書籤'
// }

const IconsContainer = styled.div`
  position: relative;
  display: flex;
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
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 600ms ease;
  svg {
    height: 50%;
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
      height: 50%;
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

// const DisplayOnDesktop = IconContainer.extend`
//   display: none;
//   ${screen.desktopAbove`
//     display: table-cell;
//   `}
// `

// const HideOnDesktop = IconContainer.extend`
//   display: table-cell;
//   ${screen.desktopAbove`
//     display: none;
//   `}
// `

class Icons extends React.PureComponent {
  render() {
    return (
      <IconsContainer>
        <IconContainer>
        {/* <Link to={`/${searchConfigs.path}`}> */}
          <a href={'https://twreporter.us14.list-manage.com/subscribe/post?u=4da5a7d3b98dbc9fdad009e7e&id=e0eb0c8c32'} target="_blank">
          <SubscribeIcon />
        </a>
        </IconContainer>
        <IconContainer>
          <a href={'https://twreporter.backme.tw/checkout/175/3788'} target="_blank">
            <DonateIcon />
          </a>
        </IconContainer>
      </IconsContainer>
    )
  }
}

export default Icons
