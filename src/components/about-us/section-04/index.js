import { marginBetweenSections } from '../constants/styles'
import { screen } from '../utils/screen'
import React, { PureComponent } from 'react'
import SectionTitle from './section-title'
import styled from 'styled-components'
import { content } from '../constants/data/section4-content'
import intlCoMap from '../../../../static/asset/about-us/intl-co-map.png'

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
  background-image: url(${intlCoMap});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
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

const PinButton = styled.button`
  border: 2px solid pink;
  transform: ${props => props.isSelected ? 'scale(1.5)' : 'none'};
`

const CloseButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  border: 2px solid palevioletred;
`

const MoreButton = styled.button`
  border: 2px solid palevioletred;
`

const PhotoBlock = styled.div`
  background-image: url(${props => props.photo});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: ${props => !props.isOpened ? 'none' : 'block'};
  position: absolute;
  right: 5px;
  top: 5px;
  width: 629px;
  height: 400px;
`

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  float: right;
  ${screen.overDesktop`
    width: ${infoCardWidth.overDesktop};
  `}
  ${screen.desktop`
    width: ${infoCardWidth.desktop};
  `}
  ${screen.tablet`
    margin: 7.8px;
    width: calc(50% - 15.6px);
    float: left;
  `}    
  ${screen.mobile`
    margin: 20px auto;
    width: 100%;
  `}  
`

const MobileStyledCard = StyledCard.extend`
  ${screen.desktopAbove`
    display: none;
  `}
  background-image: url(${props => props.photo});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`

const DesktopStyledCard = StyledCard.extend`
  ${screen.tabletBelow`
    display: none;
  `}
  background: ${props => !props.seeingMore ? 'none' : '#c7000a'};
  background-image: ${props => !props.seeingMore ? `url(${props.photo})`: 'none'};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`

const MobileStyledBillboard = styled.div`
  ${screen.desktopAbove`
    display: none;
  `}
  background: #c7000a;
  position: fixed;
  display: ${props => !props.isOpened ? 'none' : 'block'};
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  min-height: 100vh;  
`

const TextWrapper = styled.div`
  position: relative;
  margin: 0 20px;
  max-width: calc(100%-40px);
  height: 100vh;
  overflow: scroll;
  h1{
    word-break: break-all;
  }
`

class InfoCard extends PureComponent {
  render() {
    const { story, seeingMore, showPhoto } = this.props
    return(
      <React.Fragment>
        {seeingMore ? (
          <DesktopStyledCard photo={content[story - 1].cardPhoto} seeingMore={seeingMore}>
            <p>{content[story - 1].longerTitle.chinese}</p>
            <p>{content[story - 1].longerTitle.english}</p>
            <p>{content[story - 1].description.chinese}</p>
            <p>{content[story - 1].description.english}</p>            
          </DesktopStyledCard>
        ) : (
          <DesktopStyledCard photo={content[story - 1].cardPhoto} seeingMore={seeingMore}>
            <p>{content[story - 1].title.chinese}</p>
            <p>{content[story - 1].title.english}</p>
            <p><br /></p>
            <p><br /></p>
            <MoreButton onClick={showPhoto}>更多資訊</MoreButton>
          </DesktopStyledCard>
        )}
      </React.Fragment>
    )
  }
}

class InfoCardsList extends PureComponent {
  render() {
    const { showBillboard } = this.props
    const InfoCards = content.map((card, index) => {
      return (
        <MobileStyledCard key={index} photo={content[index].cardPhoto}>
          <p>{content[index].title.chinese}</p>
          <p>{content[index].title.english}</p>
          <p>Blood and Tears in Far Sea Fishery</p>
          <p><br /></p>
          <p><br /></p>
          <MoreButton onClick={() => showBillboard(index + 1)}>更多資訊</MoreButton>
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

class InfoBillboard extends PureComponent {
  render() {
    const { isOpened, closeBillboard, story } = this.props
    return (
      <MobileStyledBillboard isOpened={isOpened}>
        <TextWrapper>
          <img src={content[story - 1].photo}/>
          <p>{content[story - 1].longerTitle.chinese}</p>
          <p>{content[story - 1].longerTitle.english}</p>
          <p>{content[story - 1].description.chinese}</p>
          <p>{content[story - 1].description.english}</p>            
        </TextWrapper>
        <CloseButton onClick={closeBillboard}>close</CloseButton>
      </MobileStyledBillboard>
    )
  }
}

export class Section4 extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { 
      currentStory: 1,
      seeingMore: false,
      billboardIsOpened: false  
    }
  }

  storySelector = (index) => {
    this.setState({
      currentStory: index,
      seeingMore: false
    })
  }  
  
  showPhotoBlock = () => {
    this.setState({
      seeingMore: true
    })
  }

  closePhotoBlock = () => {
    this.setState({
      seeingMore: false
    })
  }

  showBillboard = (index) => {
    this.storySelector(index)
    this.setState({
      billboardIsOpened: true
    })
  }

  closeBillboard = () => {
    this.setState({
      billboardIsOpened: false
    })
  }

  render() {
    const PinButtons = content.map((pin, index) => {
      return (
        <li key={index}>
          <PinButton onClick={() => this.storySelector(index + 1)} isSelected={this.state.currentStory === (index + 1)}>{index + 1}</PinButton>
        </li>
      )
    })
    
    return (
      <React.Fragment>
        <Container>
          <TitleWrapper>
            <SectionTitle />
          </TitleWrapper>  
          <ContentContainer>
            <InfoCardsList 
              showBillboard={this.showBillboard}
            />
            <InfoCard 
              story={this.state.currentStory} 
              showPhoto={this.showPhotoBlock}
              seeingMore={this.state.seeingMore}
            />
            <Map>
              <ul>
                {PinButtons}
              </ul>  
              <PhotoBlock 
                isOpened={this.state.seeingMore}
                photo={content[this.state.currentStory - 1].photo}
              >
                <p>{content[this.state.currentStory - 1].index}</p>
                <CloseButton onClick={this.closePhotoBlock}>close</CloseButton>
              </PhotoBlock>
            </Map>
          </ContentContainer>
        </Container>
        <InfoBillboard 
          isOpened={this.state.billboardIsOpened} 
          closeBillboard={this.closeBillboard} 
          story={this.state.currentStory}
        />
      </React.Fragment>
    )
  }
}

export default Section4
