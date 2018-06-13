import { colors } from '../../themes/common-variables'
import { screen } from './utils/screen'
import Footer from '@twreporter/react-components/lib/footer'
import Opening from './opening'
import React, { PureComponent } from 'react'
import Section01 from './section-01'
import Section03 from './section-03'
import Section04 from './section-04'
import Section05 from './section-05'
import styled from 'styled-components'
import WebFont from './web-font'

const BorderLeftRight = styled.div`
  ${screen.overDesktop`
    border-left: solid 8px ${colors.red.liverRed};
    border-right: solid 8px ${colors.red.liverRed};
  `}
  ${screen.desktop`
    border-left: solid 6px ${colors.red.liverRed};
    border-right: solid 6px ${colors.red.liverRed};
  `}
  ${screen.tablet`
    border-left: solid 7px ${colors.red.liverRed};
    border-right: solid 7px ${colors.red.liverRed};
  `}  
  ${screen.mobile`
    border-left: solid 6px ${colors.red.liverRed};
    border-right: solid 6px ${colors.red.liverRed};
  `}    
`

export class AboutUs extends PureComponent {
  render() {
    return (
      <React.Fragment>        
        <Opening />
        <BorderLeftRight>
          <Section01 />
          <Section03 />
          <Section04 />
          <Section05 />
        </BorderLeftRight>
        <Footer />
        <WebFont />
      </React.Fragment>        
    )
  }
}

export default AboutUs
