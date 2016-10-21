'use strict'
import { SITE_META } from '../../constants/index'
import React, { Component } from 'react'
import classNames from 'classnames'
import subNavPath from '../../conf/sub-nav-path'
import Link from '../Link'

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
      <ul itemScope itemType="http://www.schema.org/SiteNavigationElement" className={styles.items}>
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

    for(let i in subNavPath) {
      subMenuLinks.push(<Link key={i} to={subNavPath[i].path}><span itemProp="name" onClick={() => {if(this.props.onClick) {this.props.onClick()}}}>{subNavPath[i].title}</span><mata itemProp="url" content={`${SITE_META.URL_NO_SLASH}${subNavPath[i].path}`} /></Link>)
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
