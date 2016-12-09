import React, { PropTypes } from 'react'
import { LOAD_MORE_AUTHORS_BTN } from '../../constants/authors-list'
import styles from './AuthorList.scss'
import classNames from 'classnames'

class LoadMore extends React.Component {

  static propTypes = {
    fetchAuthorsIfNeeded: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      loadmoreBtnClicked: false
    }
    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick() {
    this.setState({
      loadmoreBtnClicked: true
    })
    this.props.fetchAuthorsIfNeeded()
  }

  render() {
    const loadmoreBtn = this.state.loadmoreBtnClicked ?
      <div className={classNames(styles['load-more'], 'text-center')}></div> :
      <div className={classNames(styles['load-more'], 'text-center')} onClick={this._handleClick}>{LOAD_MORE_AUTHORS_BTN}</div>
    return (<div>{loadmoreBtn}</div>)
  }
}

export default LoadMore
