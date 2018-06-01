import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

export default class AwardItems extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const awardsItems = this.props.awardsList.map((item, index) => {
      return (
        <li key={index}>
          <a href={item.titleLink} target="_blank">
            <p><span>{item.ranking}</span><span>{item.group}</span></p>
            <h2>{item.title}</h2>
            <p>{item.award}</p>
          </a>
        </li>
      )
    })
    return (
      <ul>{awardsItems}</ul>    
    )
  }
}

AwardItems.defaultProps = {
  awardsList: []
}

AwardItems.propTypes = {
  awardsList: PropTypes.array.isRequired
}
