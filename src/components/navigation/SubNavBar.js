import React, { Component } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { LINK_PREFIX, subnavPath } from '../../constants/index'
import { Link } from 'react-router'
import { getTopicId } from '../../utils/get-list-id'

if (process.env.BROWSER) {
  require('../../containers/NavBar.css')
}
const styles = require('./SubNavBar.scss')

class Items extends Component {
  render() {
    const { children, path } = this.props
    let _children = []
    children.map((child, i) => {
      let itemClassName
      if (child.props.href === path) {
        itemClassName = styles.active
      }
      _children.push(
        <li className={classNames(styles.item, itemClassName)} key={i}>
          {child}
        </li>
      )

    })
    return (
      <ul className={styles.items}>
        {_children}
      </ul>
    )
  }
}

export default class SubNavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    const { bgStyle, path } = this.props
    let subMenuClass
    let subMenuLinks = []

    if (bgStyle === 'dark') {
      subMenuClass = styles.dark
    } else {
      subMenuClass = styles.white
    }

    for(let i in subnavPath) {
      let topicName = _.get(subnavPath, [ i, 'title' ])
      let topicId = getTopicId(topicName)
      subMenuLinks.push(<Link key={i} to={`${LINK_PREFIX.TOPIC}${topicId}`}><h1 onClick={() => {if(this.props.onClick) {this.props.onClick()}}}>{subnavPath[i].title}</h1></Link>)
    }

    return (
      <div className={ classNames(styles.subnav, subMenuClass) }>
        <div className={ styles.outer }>
          <Items path={path} bgStyle={bgStyle}>
            {subMenuLinks}
          </Items>
          <div className={ styles.links }>
            <div className={styles.inlineBtn} />
          </div>
        </div>
      </div>
    )
  }
}
