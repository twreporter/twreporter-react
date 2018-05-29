// /**
//  *  This file is not used and can be ignored in this PR.
//  */

// import { CloseButton } from './map'
// import { colors } from '../constants/styles'
// import { content } from '../constants/data/section4-content'
// import { Location, LogoAndLink } from './info-card'
// import { screen } from '../utils/screen'
// import hyperlink from '../../../../static/asset/about-us/intl-co-link.png'
// import location from '../../../../static/asset/about-us/intl-co-location.png'
// import PropTypes from 'prop-types'
// import React, { PureComponent } from 'react'
// import styled from 'styled-components'

// const MobileStyledBillboard = styled.div`
//   ${screen.desktopAbove`
//     display: none;
//   `}
//   background: #c7000a;
//   position: fixed;
//   top: 0;
//   left: 0;
//   display: ${props => !props.isOpened ? 'none' : 'block'};
//   z-index: 3;
//   width: 100%;
//   height: 100vh;
//   ${CloseButton} {
//     top: 5vw;
//     right: 5vw;
//   }
// `

// const BoardWrapper = styled.div`
//   position: relative;
//   width: 100%;
//   height: 100%;
//   padding: 66px 48px 35px 50px;
//   ${screen.tablet`
//     padding: 103px 70px 38px 69px;
//   `}  
//   overflow-y: scroll;
//   h3, h4, h5, p{
//     word-break: break-all;
//     color: ${colors.white};    
//   }
//   h3{
//     margin-bottom: 0;
//     font-size: 24px;
//     font-weight: bold;
//     line-height: 1.25;
//     letter-spacing: 5.6px;
//   }
//   h4{
//     font-size: 16px;
//     font-weight: 500;
//     line-height: 1.38;
//     margin-top: 44px;    
//   }
//   h5{
//     font-size: 14px;
//     font-weight: bold;
//     font-style: italic;
//     letter-spacing: 0.3px;
//   }
//   p{
//     font-size: 14px;
//     font-weight: 500;
//     letter-spacing: 0.3px;
//   }
//   img{
//     width: 100%;
//   }
//   ${Location} {
//     margin-top: 35px;
//     img{
//       display: block;
//       width: 14px;
//     }
//     span{
//       margin-left: 0;
//     }
//     p{
//       display: inline-block;
//     }
//     p>span:last-child{
//       font-size: 12px;
//     }
//     p:first-child{
//       float: left;
//     }
//     p:last-child{
//       float: right;
//       font-size: 14px;
//       margin-right: 0;
//     }
//   }
// `

// export class InfoBillboard extends PureComponent {
//   render() {
//     const { isOpened, closeBillboard, story } = this.props
//     const info = content[story - 1]
//     return (
//       <MobileStyledBillboard isOpened={isOpened}>
//         <BoardWrapper>
//           <img src={info.photo} />
//           <Location>
//             <img src={location} />
//             <p>
//               <span>{info.nation.chinese}</span>
//               <span>{info.nation.english}</span>
//             </p>
//             <p>{info.date}</p>
//           </Location>
//           <a href={info.link} target="_blank"><h3>{info.longerTitle.chinese}</h3></a>
//           <a href={info.link} target="_blank"><p>{info.longerTitle.english}</p></a>
//           <h4>{info.description.chinese}</h4>
//           <h5>{info.description.english}</h5>
//           <LogoAndLink>
//             <img src={info.logo} />
//             <a href={info.link} target="_blank"><img src={hyperlink} /></a>
//           </LogoAndLink>
//         </BoardWrapper>
//         <CloseButton onClick={closeBillboard} />
//       </MobileStyledBillboard>
//     )
//   }
// }

// InfoBillboard.defaultProps = {
//   isOpened: false,
//   story: 1
// }

// InfoBillboard.propTypes = {
//   isOpened: PropTypes.bool.isRequired,
//   story: PropTypes.number.isRequired,
//   closeBillboard: PropTypes.func.isRequired
// }

// export default InfoBillboard
