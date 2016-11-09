'use strict'

import React from 'react'
import { fetchAuthorsIfNeeded } from '../actions/authors'
import { connect } from 'react-redux'
// import map from 'lodash/map'

// const _ = {
//   map: map
// }

// import { connect } from 'react-redux'

class ShownAuthors extends React.Component {
  fetchData({ store }) {
    return store.dispatch(fetchAuthorsIfNeeded())
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { fetchAuthorsIfNeeded } = this.props
    fetchAuthorsIfNeeded()
  }

  // componentWillReceiveProps(nextProps) {
  //   const { fetchAuthorsIfNeeded } = nextProps
  //   fetchAuthorsIfNeeded()
  // }

  render() {
    // const { entities } = this.props
    // let shownAuthors = _.map(entities.authors, (id, name, links) => ({
    //   id: id,
    //   authorName: name,
    //   authorUrl: links.sekf.herf
    // }))
    // console.log(shownAuthors)
    return (
      <div>This is ShownAuthors</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    entities: state.entities || {}
  }
}

export { ShownAuthors }
export default connect(mapStateToProps, { fetchAuthorsIfNeeded })(ShownAuthors)
