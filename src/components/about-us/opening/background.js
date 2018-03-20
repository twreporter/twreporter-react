import { intro } from '../constants/data/introduction'
import { screen } from '../utils/screen'
import billboard from '../../../../static/asset/about-us/billboard.png'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const triangleSizes = {
  hd: {
    width: '653px',
    height: '112px'
  },
  desktop: {
    width: '464px',
    height: '80px'
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
  ${screen.desktop`
    width: ${triangleSizes.desktop.width};
    height: ${triangleSizes.desktop.height};
    border-top: solid ${triangleSizes.desktop.height} #c7000a;
    border-left: solid calc(${triangleSizes.desktop.width} * (3 / 8)) transparent;
    border-right: solid calc(${triangleSizes.desktop.width} * (5 / 8)) transparent;  
  `}
  ${screen.overDesktop`
    width: ${triangleSizes.hd.width};
    height: ${triangleSizes.hd.height};
    border-top: solid ${triangleSizes.hd.height} #c7000a;
    border-left: solid calc(${triangleSizes.hd.width} * (3 / 8)) transparent;
    border-right: solid calc(${triangleSizes.hd.width} * (5 / 8)) transparent;
  `}  
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
  width: ${triangleSizes.mobile.width};
  height: ${triangleSizes.mobile.height};
  border-left: solid ${triangleSizes.mobile.width} #c7000a;
  border-top: solid calc(${triangleSizes.mobile.height} * (3 / 8)) transparent;
  border-bottom: solid calc(${triangleSizes.mobile.height} * (5 / 8)) transparent;
  ${screen.tablet`
    width: ${triangleSizes.tablet.width};
    height: ${triangleSizes.tablet.height};
    border-top: solid calc(${triangleSizes.tablet.height} * (3 / 8)) transparent;
    border-bottom: solid calc(${triangleSizes.tablet.height} * (5 / 8)) transparent;
  `}      
`

const TriangleRight = MobileTriangle.extend`
  position: absolute;
  right: 0;
  top: calc(50% + ${triangleSizes.mobile.height} * (1 / 8));
  transform: translateY(-50%) rotateY(180deg);
  ${screen.tablet`
    top: calc(50% + ${triangleSizes.tablet.height} * (1 / 8));
  `}      
`

const TriangleLeft = MobileTriangle.extend`
  position: absolute;
  left: 0;
  top: calc(50% + ${triangleSizes.mobile.height} * (1 / 8));
  transform: translateY(-50%);
  ${screen.tablet`
    top: calc(50% + ${triangleSizes.tablet.height} * (1 / 8));
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
  width: calc(${triangleSizes.desktop.width} * (5 / 8));
  ${screen.overDesktop`
    width: calc(${triangleSizes.hd.width} * (5 / 8));
  `}  
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
  word-wrap: break-word;
  p{
    font-size: 11px;
    color: #c7000a;
  }
  p:nth-child(1){
    margin-bottom: 0.5em;
  }
  ${screen.tabletBelow`
    position: relative;
    padding: 25px;
    p{
      font-size: 16px;
    }
  `}
  ${screen.desktop`
    padding: 40px 25px 10px 25px;
  `}
  ${screen.overDesktop`
    padding: 25px 40px 25px 25px;
    p:nth-child(1){
      margin-bottom: 1em;
      line-height: 1.64;
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

