import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import styled from 'styled-components'
import PropTypes from "prop-types";

import { BRANCH, BRANCH_PROP_TYPES } from "@twreporter/core/lib/constants/release-branch";
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { P1, P3 } from "@twreporter/react-components/lib/text/paragraph";

import { MEMBER_ROLE } from "../../../constants/member-role";

const CardBgColor = {
  [MEMBER_ROLE.EXPLORER]: colorGrayscale.white,
  [MEMBER_ROLE.ACTION_TAKER]: colorGrayscale.gray200, 
  [MEMBER_ROLE.TRAILBLAZER]: colorGrayscale.gray900
}

const CardTextColor = {
  [MEMBER_ROLE.EXPLORER]: colorGrayscale.gray800,
  [MEMBER_ROLE.ACTION_TAKER]: colorGrayscale.gray800, 
  [MEMBER_ROLE.TRAILBLAZER]: colorGrayscale.white
}

const CardContainer = styled.div`
  max-width: 320px;
  width: 100%;
  min-width: 296px;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05), inset 2px 2px 4px rgba(255, 255, 255, 0.5), inset -2px -2px 2px rgba(0, 0, 0, 0.15);
  aspect-ratio: 1/1.6;
  background-color: ${props => props.bgColor};
  position: relative;
`

const LogoContainer = styled.div`
  position: absolute;
  left: 24px;
  top: 24px;
`

const TitleContainer = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  height: calc(100% - 48px);
`

const MarkContainer = styled.div`
  position: absolute;
  left: 24px;
  top: ${props => props.top}px;
  transform: translateY(-${props => props.translateY}px);
`

const DataContainer = styled.div`
  position: absolute;
  left: 24px;
  bottom: 24px;
`

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const MobileMemberRoleCard = ({role = MEMBER_ROLE.EXPLORER, releaseBranch = BRANCH.master, email, joinDate, name = ''}) => {
  const [width] = useWindowSize();
  const [logoHeight, setLogoHeight] = useState(0);
  const [logoHeightPlusPagging, setLogoHeightPlusPagging] = useState(0)
  const [dataContainerDistanceFromTop, setDataContainerDistanceFromTop] = useState(0);
  const [markContainerTop, setMarkContainerTop] = useState(0);

  const logoContainerRef = useRef();
  const dataContainerRef = useRef();

  useEffect(() => {
    if (dataContainerRef.current) {
      setDataContainerDistanceFromTop(dataContainerRef.current.offsetTop)
    }
    if (logoContainerRef.current) {
      setLogoHeight(logoContainerRef.current.offsetHeight)
      setLogoHeightPlusPagging(logoContainerRef.current.offsetTop + logoContainerRef.current.offsetHeight)
    }
  }, [width])

  useEffect(() => {
    setMarkContainerTop(Math.floor((dataContainerDistanceFromTop - logoHeightPlusPagging) / 2));
  }, [logoHeight, logoHeightPlusPagging, dataContainerDistanceFromTop])

  const logo = `https://www.twreporter.org/assets/user-role-card/${releaseBranch}/${role}_logo.png`;
  const title = `https://www.twreporter.org/assets/user-role-card/${releaseBranch}/${role}_title.png`;
  const mark = `https://www.twreporter.org/assets/user-role-card/${releaseBranch}/${role}_mark.png`;

  
  return (
    <CardContainer bgColor={CardBgColor[role]}>
      <LogoContainer ref={logoContainerRef}>
        <img src={logo}></img>
      </LogoContainer>
      <TitleContainer>
        <img style={{height: '100%'}} src={title}></img>
      </TitleContainer>
      <MarkContainer top={markContainerTop} translateY={logoHeight}>
        <img src={mark}></img>
      </MarkContainer>
      <DataContainer ref={dataContainerRef}>
        {name && 
          <div>
            <div style={{color: colorGrayscale.gray500}}>
              <P3 text={'姓名'}></P3>
            </div>
            <div style={{color: CardTextColor[role], paddingBottom: '8px'}}>
              <P1 text={name}></P1>
            </div>
          </div>
        }
        <div style={{color: colorGrayscale.gray500}}>
          <P3 text={'電子信箱'}></P3>
        </div>
        <div style={{color: CardTextColor[role], paddingBottom: '8px'}}>
          <P1 text={email}></P1>
        </div>
        <div style={{color: colorGrayscale.gray500}}>
          <P3 text={'加入日期'}></P3>
        </div>
        <div style={{color: CardTextColor[role]}}>
          <P1 text={joinDate}></P1>
        </div>
      </DataContainer>
    </CardContainer>
  )
}

MobileMemberRoleCard.propTypes = {
  role: PropTypes.oneOf(Object.values(MEMBER_ROLE)),
  releaseBranch: BRANCH_PROP_TYPES,
  email: PropTypes.string,
  joinDate: PropTypes.string,
  name: PropTypes.string,
}

export default MobileMemberRoleCard