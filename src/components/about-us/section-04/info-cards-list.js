import { content } from '../constants/data/section4-content'
import { MoreButton, StyledCard } from './info-card'
import { screen } from '../utils/screen'
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
`

// Mobile InfoCard
export class InfoCardsList extends PureComponent {
  render() {
    const { showBillboard } = this.props
    const InfoCards = content.map((card, index) => {
      return (
        <MobileStyledCard key={index} photo={content[index].cardPhoto}>
          <p>{content[index].title.chinese}</p>
          <p>{content[index].title.english}</p>
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

InfoCardsList.propTypes = {
  showBillboard: PropTypes.func.isRequired
}

export default InfoCardsList
