import { content } from '../constants/data/section4-content'
import { Location, StyledCard } from './info-card'
import { screen } from '../utils/screen'
import location from '../../../../static/asset/about-us/intl-co-location.png'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

const MobileStyledCard = StyledCard.extend`
  ${screen.desktopAbove`
    display: none;
  `}
  background-image: url(${props => props.photo});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  padding: 0 51.5px;
  margin: 15.6px auto;
`

// Mobile InfoCard
export class InfoCardsList extends PureComponent {
  render() {
    const { showBillboard } = this.props
    const InfoCards = content.map((card, index) => {
      return (
        <MobileStyledCard key={index} photo={content[index].cardPhoto} onClick={() => showBillboard(index + 1)}>
          <Location>
            <img src={location} />
            <span>{content[index].nation.chinese}</span>
            <span>{content[index].nation.english}</span>
          </Location>
          <h3>{content[index].title.chinese}</h3>
          <p>{content[index].title.english}</p>
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

InfoCardsList.propTypes = {
  showBillboard: PropTypes.func.isRequired
}

export default InfoCardsList
