import groupBy from 'lodash/groupBy'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import WorksOfAward from './works-of-award'

const _ = {
  groupBy,
  map
}

export default class Award extends PureComponent {
  static propTypes = {
    works: PropTypes.array.isRequired
  }
  constructor(props) {
    super(props)
    this._worksByDate = _.groupBy(props.works, item => item.date)
  }
  _buildWorksOfAward = (works, date) => {
    return (
      <WorksOfAward
        key={date}
        date={date}
        works={works}
      />
    )
  }
  componentDidUpdate() {
    this._worksByDate = _.groupBy(this.props.works, item => item.date)
  }
  render() {
    return (
      <React.Fragment>
        {_.map(this._worksByDate, this._buildWorksOfAward)}
      </React.Fragment>
    )
  }
}
