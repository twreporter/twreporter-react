import { marginBetweenSections } from '../constants/styles'
import { screen } from '../utils/screen'
import React, { PureComponent } from 'react'
import SectionTitle from './section-title'
import styled from 'styled-components'
import { content } from '../constants/data/section4-content'

const containerWidth = {
  mobile: '100%',
  tablet: '719px',
  desktop: '1024px',
  overDesktop: '1440px'
}

const titleWrapperWidth = {
  mobile: '100%',
  tablet: '100%',
  desktop: '855px',
  overDesktop: '1072px'
}

const infoCardWidth = {
  desktop: '362px',
  overDesktop: '560px'
}

const contentHeight = {
  desktop: '383px',
  overDesktop: '590px'
}

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;  
  ${screen.desktopAbove`
    width: ${containerWidth.desktop};
    margin: ${marginBetweenSections.desktop} auto;
  `}
  ${screen.overDesktop`
    width: ${containerWidth.overDesktop};
    margin: ${marginBetweenSections.overDesktop} auto;    
  `}
  ${screen.tablet`
    width: ${containerWidth.tablet};
    margin: ${marginBetweenSections.tablet} auto;    
  `}  
  ${screen.mobile`
    margin: ${marginBetweenSections.mobile} auto;    
  `}    
`

const TitleWrapper = styled.div`
  margin: 0 auto;
  ${screen.overDesktop`
    width: ${titleWrapperWidth.overDesktop};
  `}
  ${screen.desktop`
    width: ${titleWrapperWidth.desktop};
  `}
  ${screen.tablet`
    width: 100%;
  `}  
  ${screen.mobile`
    width: 100%;
  `}      
`

const ContentContainer = styled.div`
  position: relative;
  display: block;
  margin-top: 100px;
  padding: 0 10px;
  ${screen.overDesktop`
    height: ${contentHeight.overDesktop};  
  `}
  ${screen.desktop`
    height: ${contentHeight.desktop};  
  `}  
`

const Map = styled.div`
  border: solid 1px black;
  position: relative;
  display: block;
  height: 100%;
  float: left;
  ${screen.overDesktop`
    width: calc(100% - ${infoCardWidth.overDesktop});
  `}
  ${screen.desktop`
    width: calc(100% - ${infoCardWidth.desktop});
  `}
  ${screen.tabletBelow`
    display: none;
  `}
`

const CloseBtn = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
`
const PhotoBlock = styled.div`
  border: solid 1px green;
  display: ${props => !props.isOpened ? 'none' : 'block'};
  position: absolute;
  right: 5px;
  top: 5px;
  width: 70%;
  height: 50%;
`

const StyledCard = styled.div`
  border: solid 1px red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  float: right;
  padding: 100px;
  ${screen.overDesktop`
    width: ${infoCardWidth.overDesktop};
  `}
  ${screen.desktop`
    width: ${infoCardWidth.desktop};
  `}
  ${screen.tabletBelow`
    width: 100%;
  `}  
`

const MobileStyledCard = StyledCard.extend`
  margin: 20px auto;
  ${screen.desktopAbove`
    display: none;
  `}  
`

const DesktopStyledCard = StyledCard.extend`
  ${screen.tabletBelow`
    display: none;
  `}  
`

class InfoCard extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <DesktopStyledCard>
        <p>{content[this.props.story - 1].index}</p>
        <p>{content[this.props.story - 1].title}</p>
        <p>Blood and Tears in Far Sea Fishery</p>
        <p><br /></p>
        <p><br /></p>
        <button onClick={this.props.showPhoto}>更多資訊</button>
      </DesktopStyledCard>
    )
  }
}

class InfoCardsList extends PureComponent {
  render() {
    const InfoCards = content.map((card) => {
      return (
        <MobileStyledCard key={card.index}>
          <p>{content[card.index - 1].index}</p>
          <p>{content[card.index - 1].title}</p>
          <p>Blood and Tears in Far Sea Fishery</p>
          <p><br /></p>
          <p><br /></p>
          <button onClick={this.props.showPhoto}>更多資訊</button>
        </MobileStyledCard>
      )
    })
    return (
      <React.Fragment>
        {InfoCards}
      </React.Fragment>
    )
  }  
}

export class Section4 extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { 
      currentStory: 1,
      photoBlockIsOpened: false 
    }
  }

  storySelector = (num) => {
    this.setState({
      currentStory: num,
      photoBlockIsOpened: false
    })
  }  
  
  showPhotoBlock = () => {
    this.setState({
      photoBlockIsOpened: true
    })
  }

  closePhotoBlock = () => {
    this.setState({
      photoBlockIsOpened: false
    })
  }

  render() {
    return (
      <Container>
        <TitleWrapper>
          <SectionTitle />
        </TitleWrapper>  
        <ContentContainer>
          <InfoCardsList />
          <InfoCard story={this.state.currentStory} showPhoto={this.showPhotoBlock}/>
          <Map>
            <ul>
              <li><button onClick={() => this.storySelector(1)}>1</button></li>
              <li><button onClick={() => this.storySelector(2)}>2</button></li>
              <li><button onClick={() => this.storySelector(3)}>3</button></li>
            </ul>  
            <PhotoBlock isOpened={this.state.photoBlockIsOpened}>
              <p>{content[this.state.currentStory - 1].index}</p>
              <CloseBtn onClick={this.closePhotoBlock}>close</CloseBtn>
            </PhotoBlock>
          </Map>
        </ContentContainer>
      </Container>
    )
  }
}

export default Section4
