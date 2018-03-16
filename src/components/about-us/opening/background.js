import { screen } from '../utils/screen'
import billboard from '../../../../static/asset/about-us/billboard.png'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const IntroChinese = '2015年12月《報導者》正式上線，稟持深度、開放、非營利的精神，致力於公共領域調查報導，為讀者持續追蹤各項重要議題，共同打造多元的社會與媒體環境。'
const IntroEng = 'December 2015 "The reporter" is officially on the line, with the depth, open, non-profit spirit, committed to the public domain survey reports, for readers to continue to track the important issues, together to create a diverse social and media environment.'

const OnlyDisplayOnDesktop = styled.div`
  ${screen.tabletBelow`
    display: none;
  `}  
`

const OnlyDisplayOnMobile = styled.div`
  ${screen.desktopAbove`
    display: none;
  `}  
`

const DesktopTriangles = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`

const Triangle = styled.div`
  width: 653px;
  height: 112px;
  border-top: solid 80px #c7000a;
  border-left: solid calc(653px*3/8) transparent;
  border-right: solid calc(653px*5/8) transparent;
  &:before,&:after{
    box-sizing: border-box;
  }  
`

const MobileTriangles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
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
  width: 43px;
  height: 276px;
  border-left: solid 43px #c7000a;
  border-top: solid calc(276px*3/8) transparent;
  border-bottom: solid calc(276px*5/8) transparent;
  &:before,&:after{
    box-sizing: border-box;
  }  
`

const TriangleRight = MobileTriangle.extend`
  position: absolute;
  right: 0;
  top: calc(50% + 276px*1/8);
  transform: translateY(-50%) rotateY(180deg);
`

const TriangleLeft = MobileTriangle.extend`
  position: absolute;
  left: 0;
  top: calc(50% + 276px*1/8);
  transform: translateY(-50%);
`

const Divider = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-left: solid 1px #c7000a;
  width: calc(653px*5/8);
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
        <OnlyDisplayOnDesktop>
          <DesktopTriangles>
            <TriangleRightTop />
            <TriangleRightBottom />
            <Divider>
              <Billboard>
                <img src={billboard} />
                <Textblock>
                  <p>{IntroChinese}</p>
                  <br />
                  <p>{IntroEng}</p>
                </Textblock>
              </Billboard>
            </Divider>
          </DesktopTriangles>
        </OnlyDisplayOnDesktop>
        <OnlyDisplayOnMobile>
          <MobileTriangles>
            <TriangleLeft />
            <TriangleRight />
            <Divider />
          </MobileTriangles>
        </OnlyDisplayOnMobile>
      </React.Fragment>
    )  
  }
}
export default Opening

