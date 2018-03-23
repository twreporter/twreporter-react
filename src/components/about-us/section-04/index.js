import { marginBetweenSections } from '../constants/styles'
import { screen } from '../utils/screen'
import InfoBillboard from './info-billboard'
import InfoCard from './info-card'
import InfoCardsList from './info-cards-list'
import Map from './map'
import React, { PureComponent } from 'react'
import SectionTitle from './section-title'
import styled from 'styled-components'

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
            <Map
              seeingMore={this.state.seeingMore}
              story={this.state.currentStory}
              storySelector={this.storySelector}
              closePhotoBlock={this.closePhotoBlock}
            />
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
