// /**
//  *  This file is not used and can be ignored in this PR.
//  */

// import { content } from '../constants/data/section4-content'
// import { font, colors } from '../constants/styles'
// import { screen } from '../utils/screen'
// import hyperlink from '../../../../static/asset/about-us/intl-co-link.png'
// import location from '../../../../static/asset/about-us/intl-co-location.png'
// import PropTypes from 'prop-types'
// import React, { PureComponent } from 'react'
// import styled from 'styled-components'

// export const infoCardWidth = {
//   desktop: '362px',
//   overDesktop: '560px',
//   mobile: '300px'
// }

// export const infoCardHeight = {
//   mobile: '317.4px'
// }

// export const MoreButton = styled.button`
//   width: 185px;
//   height: 59px;
//   border-radius: 100px;
//   background-color: ${colors.white};
//   cursor: pointer;
//   border: none;
// `

// export const StyledCard = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   ${screen.overDesktop`
//     width: ${infoCardWidth.overDesktop};
//     height: 100%;
//     float: right;
//   `}
//   ${screen.desktop`
//     width: ${infoCardWidth.desktop};
//     height: 100%;
//     float: right;
//   `}
//   ${screen.tablet`
//     width: ${infoCardWidth.mobile};
//     height: ${infoCardHeight.mobile};
//     margin: 7.5px;
//     float: left;
//   `}    
//   ${screen.mobile`
//     width: ${infoCardWidth.mobile};
//     height: ${infoCardHeight.mobile};
//   `}
//   h3, p {
//     color: ${colors.white};
//   }
//   h3 {
//     font-family: ${font.family.chinese};
//     font-weight: bold;
//     letter-spacing: 7.7px;
//     font-size: 33px;
//     margin-bottom: 0;
//   }
//   p {
//     letter-spacing: 0.3px;
//     font-size: 14px;
//     font-family: ${font.family.english.din};
//   }
//   ${MoreButton} {
//     p {
//       color: #c7000a;
//       font-weight: bold;
//     }
//     p:nth-child(1){
//       font-size: 14px;
//       margin-bottom: 5px;
//     }
//     p:nth-child(2){
//       font-size: 12px;
//     }
//     ${screen.overDesktop`
//       margin-top: 111px;
//     `}
//     ${screen.desktop`
//       margin-top: 45px;
//     `}
//   }
  
// `

// export const Location = styled.div`
//   span {
//     color: ${colors.white};
//     margin-right: 14px;
//   }
//   span:nth-child(2) {
//     font-size: 14px;
//     font-family: ${font.family.chinese};
//     margin-left: 9px;
//   }
//   span:nth-child(3) {
//     font-size: 12px;
//     font-family: ${font.family.english.din};
//   }
// `

// const MoreInfoWrapper = styled.div`
//   position: relative;
//   display: block;
//   text-align: left;
//   width: 100%;
//   height: 100%;
//   padding: 66px 50px 35px 50px;
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
//   ${Location} {
//     margin: 0 -20px;
//     img{
//       width: 14px;
//     }
//     span{
//       margin: 0 9px;
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

// const DesktopStyledCard = StyledCard.extend`
//   ${screen.tabletBelow`
//     display: none;
//   `}
// `

// const StyledCardOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
// `

// const StyledCardBackground = StyledCardOverlay.extend`
//   background: ${props => !props.seeingMore ? 'none' : '#c7000a'};
//   background-image: ${props => !props.seeingMore ? `url(${props.photo})` : 'none'};
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center center;
//   opacity: ${props => !props.seeingMore ? 0.9 : 1};
// `

// const StyledCardContent = StyledCardOverlay.extend`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   border: solid 15px #c7000a;
//   padding: 0 67.5px;
// `

// export const LogoAndLink = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-end;
//   margin-top: 51px;
//   ${screen.tablet`
//     margin-top: 110px;
//   `}
//   ${screen.desktopAbove`
//     margin-top: 55px;
//   `}
//   img:first-child{
//     width: 157px;
//   }
//   img:last-child{
//     width: 28.3px;
//   }
// `

// // Desktop InfoCard
// export class InfoCard extends PureComponent {
//   render() {
//     const { story, seeingMore, showPhoto } = this.props
//     const info = content[story - 1]
//     return (
//       <React.Fragment>
//         {seeingMore ? (
//           <DesktopStyledCard >
//             <StyledCardBackground photo={info.cardPhoto} seeingMore={seeingMore} />
//             <MoreInfoWrapper>
//               <Location>
//                 <img src={location} />
//                 <p>
//                   <span>{info.nation.chinese}</span>
//                   <span>{info.nation.english}</span>
//                 </p>
//                 <p>{info.date}</p>
//               </Location>
//               <a href={info.link} target="_blank"><h3>{info.longerTitle.chinese}</h3></a>
//               <a href={info.link} target="_blank"><p>{info.longerTitle.english}</p></a>
//               <h4>{info.description.chinese}</h4>
//               <h5>{info.description.english}</h5>
//               <LogoAndLink>
//                 <img src={info.logo} />
//                 <a href={info.link} target="_blank"><img src={hyperlink} /></a>
//               </LogoAndLink>
//             </MoreInfoWrapper>
//           </DesktopStyledCard>
//         ) : (
//             <DesktopStyledCard>
//               <StyledCardBackground photo={info.cardPhoto} seeingMore={seeingMore} />
//               <StyledCardContent>
//                 <Location>
//                   <img src={location} />
//                   <span>{info.nation.chinese}</span>
//                   <span>{info.nation.english}</span>
//                 </Location>
//                 <h3>{info.title.chinese}</h3>
//                 <p>{info.title.english}</p>
//                 <MoreButton onClick={showPhoto}>
//                   <p>更多資訊</p>
//                   <p>Ｍore</p>
//                 </MoreButton>
//               </StyledCardContent>
//             </DesktopStyledCard>
//           )}
//       </React.Fragment>
//     )
//   }
// }

// InfoCard.defaultProps = {
//   seeingMore: false,
//   story: 1
// }

// InfoCard.propTypes = {
//   seeingMore: PropTypes.bool.isRequired,
//   story: PropTypes.number.isRequired,
//   showPhoto: PropTypes.func.isRequired  
// }

// export default InfoCard
