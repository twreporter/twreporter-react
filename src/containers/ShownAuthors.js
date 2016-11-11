'use strict'

import React from 'react'
import { fetchAuthorsIfNeeded, loadMoreAuthors } from '../actions/authors'
import { connect } from 'react-redux'
// import map from 'lodash/map'

// const _ = {
//   map: map
// }

// import { connect } from 'react-redux'

class ShownAuthors extends React.Component {
  // fetchData({ store }) {
  //   return store.dispatch(fetchAuthorsIfNeeded())
  // }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchAuthorsIfNeeded()
  }

  // componentWillReceiveProps(nextProps) {
  //   const { fetchAuthorsIfNeeded } = nextProps
  //   fetchAuthorsIfNeeded()
  // }

  render() {
    const _onIncrement = this.props.onIncrement
    return (
      <div>
        <div>This is ShownAuthors</div>
        <button onClick={_onIncrement}>LOAD MORE</button>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    entities: state.entities || {},
    page: state.authorsList.page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => {dispatch(loadMoreAuthors())},
    fetchAuthorsIfNeeded: () => {dispatch(fetchAuthorsIfNeeded())}
  }
}

export { ShownAuthors }
export default connect(mapStateToProps, mapDispatchToProps)(ShownAuthors)
