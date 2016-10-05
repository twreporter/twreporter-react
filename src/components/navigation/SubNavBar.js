import React, { Component } from 'react'
import classNames from 'classnames'
import { LINK_PREFIX, subnavPath } from '../../constants/index'
import Link from '../Link'
import { getTopicId } from '../../utils/get-list-id'

// lodash
import get from 'lodash/get'

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
      let topicName = get(subnavPath, [ i, 'title' ])
      let topicId = getTopicId(topicName)
      subMenuLinks.push(<Link key={i} to={`${LINK_PREFIX.TOPIC}${topicId}`}><span onClick={() => {if(this.props.onClick) {this.props.onClick()}}}>{subnavPath[i].title}</span></Link>)
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
