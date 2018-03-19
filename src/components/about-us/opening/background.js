import { screen } from '../utils/screen'
import { intro } from '../constants/data/introduction'
import billboard from '../../../../static/asset/about-us/billboard.png'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const TriangleSizes = {
  desktop: {
    width: '653px',
    height: '112px'
  },
  mobile: {
    width: '43px',
    height: '276px'
  },
  tablet: {
    width: '102px',
    height: '661px'
  }
}

const DesktopTriangles = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  ${screen.tabletBelow`
    display: none;
  `}  
`

const MobileTriangles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  ${screen.desktopAbove`
    display: none;
  `}
`
const Triangle = styled.div`
  width: ${TriangleSizes.desktop.width};
  height: ${TriangleSizes.desktop.height};
  border-top: solid ${TriangleSizes.desktop.height} #c7000a;
  border-left: solid calc(${TriangleSizes.desktop.width}*3/8) transparent;
  border-right: solid calc(${TriangleSizes.desktop.width}*5/8) transparent;
  &:before,&:after{
    box-sizing: border-box;
  }  
`

const TriangleRightTop = Triangle.extend`
  position: absolute;
  right: 0;
  top: 0;
`

const TriangleRightBottom = Triangle.extend`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: rotateX(180deg);  
`

const MobileTriangle = styled.div`
  width: ${TriangleSizes.mobile.width};
  height: ${TriangleSizes.mobile.height};
  border-left: solid ${TriangleSizes.mobile.width} #c7000a;
  border-top: solid calc(${TriangleSizes.mobile.height}*3/8) transparent;
  border-bottom: solid calc(${TriangleSizes.mobile.height}*5/8) transparent;
  &:before,&:after{
    box-sizing: border-box;
  }
  ${screen.tablet`
    width: ${TriangleSizes.tablet.width};
    height: ${TriangleSizes.tablet.height};
    border-top: solid calc(${TriangleSizes.tablet.height}*3/8) transparent;
    border-bottom: solid calc(${TriangleSizes.tablet.height}*5/8) transparent;
  `}      
`

const TriangleRight = MobileTriangle.extend`
  position: absolute;
  right: 0;
  top: calc(50% + ${TriangleSizes.mobile.height}*1/8);
  transform: translateY(-50%) rotateY(180deg);
  ${screen.tablet`
    top: calc(50% + ${TriangleSizes.tablet.height}*1/8);
  `}      
`

const TriangleLeft = MobileTriangle.extend`
  position: absolute;
  left: 0;
  top: calc(50% + ${TriangleSizes.mobile.height}*1/8);
  transform: translateY(-50%);
  ${screen.tablet`
    top: calc(50% + ${TriangleSizes.tablet.height}*1/8);
  `}
`

const Divider = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-left: solid 1px #c7000a;
  width: calc(${TriangleSizes.desktop.width}*5/8);
  ${screen.tabletBelow`
    top: 0;
    width: 100%;
    height: 50%;
    border-left: none;
    border-bottom: solid 1px #c7000a;
  `}  
`

const Billboard = styled.div`
  position: absolute;
  display: flex;
  jusify-content: center;
  align-items: center;
  right: 0;
  margin: 10% 5%;
  img{
    width: 100%;
  }
`

const Textblock = styled.div`
  position: absolute;
  padding: 25px 40px 25px 25px;
  word-wrap: break-word;
  p{
    font-size: 11px;
    color: #c7000a;
  }
  ${screen.tabletBelow`
    position: relative;
    padding: 25px;
    p{
      font-size: 16px;
    }
  `}
`

export class Opening extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <DesktopTriangles>
          <TriangleRightTop />
          <TriangleRightBottom />
          <Divider>
            <Billboard>
              <img src={billboard} />
              <Textblock>
                <p>{intro.chinese}</p>
                <br />
                <p>{intro.english}</p>
              </Textblock>
            </Billboard>
          </Divider>
        </DesktopTriangles>
        <MobileTriangles>
          <TriangleLeft />
          <TriangleRight />
          <Divider />
        </MobileTriangles>
      </React.Fragment>
    )  
  }
}
export default Opening

