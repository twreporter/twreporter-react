// /**
//  *  This file is not used and can be ignored in this PR.
//  */

// import { colors } from '../constants/styles'
// import { content } from '../constants/data/section4-content'
// import { infoCardWidth } from './info-card'
// import { screen } from '../utils/screen'
// import intlCoMap from '../../../../static/asset/about-us/intl-co-map.png'
// import PropTypes from 'prop-types'
// import React, { PureComponent } from 'react'
// import styled from 'styled-components'

// const PinPosition = [
//   {
//     Country: 'Nepal',
//     left: 'calc(230 / 632 * 100%)',
//     top: 'calc(120 / 383 * 100%)'
//   },
//   {
//     Country: 'Indonesia',
//     left:'calc(310 / 632 * 100%)',
//     top:'calc(200 / 383 * 100%)'
//   },
//   {
//     Country: 'Japan',
//     left: 'calc(340 / 632 * 100%)',
//     top: 'calc(90 / 383 * 100%)'
//   },
//   {
//     Country: 'Taiwan',
//     left: 'calc(310 / 632 * 100%)',
//     top: 'calc(140 / 383 * 100%)'
//   },
//   {
//     Country: 'Germany',
//     left: 'calc(80 / 632 * 100%)',
//     top: 'calc(65 / 383 * 100%)'
//   }
// ]

// const MapContainer = styled.div`
//   background-image: url(${intlCoMap});
//   background-size: contain;
//   background-repeat: no-repeat;
//   background-position: center center;
//   position: relative;
//   display: block;
//   height: 100%;
//   float: left;
//   margin-right: 10px;
//   li{
//     list-style: none;
//   }
//   ${screen.overDesktop`
//     width: calc(100% - ${infoCardWidth.overDesktop} - 10px);
//   `}
//   ${screen.desktop`
//     width: calc(100% - ${infoCardWidth.desktop} - 10px);
//   `}
//   ${screen.tabletBelow`
//     display: none;
//   `}
// `
// const Needle = styled.div`
//   position: absolute;
//   left: 50%;
//   top: 75%;
//   width: 50%;
//   height: 50%;
// `

// const PinButton = styled.div`
//   position: absolute;
//   left: ${props => props.left};
//   top: ${props => props.top};
//   transform: translateX(-50%) translateY(-50%);
//   width: ${props => props.isSelected ? '50px' : '44.8px'};
//   height: ${props => props.isSelected ? '50px' : '44.8px'};
//   background-color: ${props => props.isSelected ? '#c7000a' : '#a67a44'};
//   border-radius: 50px;
//   cursor: pointer;
//   ${Needle} {
//     border-left: solid 3px ${props => props.isSelected ? '#c7000a' : '#a67a44'};
//   }
// `

// export const CloseButton = styled.button`
//   position: absolute;
//   right: 5px;
//   top: 0;
//   border-radius: 50px;
//   width: 28px;
//   height: 28px;
//   cursor: pointer;
//   border: none;
//   ${screen.desktopAbove`
//     background: #a67a44;
//     &:after {
//       content: '×';
//       color: ${colors.white};
//     }
//   `}
//   ${screen.tabletBelow`
//     background: ${colors.white};
//     &:after {
//       content: '×';
//       color: #c7000a;
//     }
//   `}
// `

// const PhotoBlock = styled.div`
//   display: ${props => !props.isOpened ? 'none' : 'block'};
//   position: absolute;
//   right: 5px;
//   top: 5px;
//   width: 80%;
//   padding-right: 50px;
//   margin-top: 40px;
//   img{
//     width: 100%;
//   }
// `

// export class Map extends PureComponent {
//   render() {
//     const { seeingMore, story, storySelector, closePhotoBlock } = this.props
//     const PinButtons = content.map((pin, index) => {
//       return (
//         <li key={index}>
//           <PinButton 
//             onClick={() => storySelector(index + 1)} 
//             isSelected={story === (index + 1)}
//             left={PinPosition[index].left}
//             top={PinPosition[index].top}
//           >
//             <Needle />
//           </PinButton>
//         </li>
//       )
//     })
//     return (
//       <MapContainer>
//         <ul>
//           {PinButtons}
//         </ul>
//         <PhotoBlock
//           isOpened={seeingMore}
//         >
//           <img src={content[story-1].photo}/>
//           <CloseButton onClick={closePhotoBlock} />
//         </PhotoBlock>
//       </MapContainer>
//     )
//   }
// }

// Map.defaultProps = {
//   seeingMore: false,
//   story: 1
// }

// Map.propTypes = {
//   seeingMore: PropTypes.bool.isRequired,
//   story: PropTypes.number.isRequired,
//   storySelector: PropTypes.func.isRequired,
//   closePhotoBlock: PropTypes.func.isRequired  
// }

// export default Map
