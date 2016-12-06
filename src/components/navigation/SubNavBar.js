import React, { Component } from 'react'
import classNames from 'classnames'
import subNavPath from '../../conf/sub-nav-path'
import { Link } from 'react-router'

const styles = require('./SubNavBar.scss')

class Items extends Component {
  render() {
    const { children, pathname } = this.props
    let _children = []
    children.map((child, i) => {
      let itemClassName
      if (child.props.href === pathname) {
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
    const { bgStyle, pathname } = this.props
    const subMenuClass = {
      [styles.dark]: bgStyle === 'dark',
      [styles.white]: bgStyle !== 'dark'
    }
    let subMenuLinks = []

    for(let i in subNavPath) {
      subMenuLinks.push(<Link key={i} to={subNavPath[i].path}><span onClick={() => {if(this.props.onClick) {this.props.onClick()}}}>{subNavPath[i].title}</span></Link>)
    }

    return (
      <div className={ classNames(styles.subnav, subMenuClass) }>
        <div className={ styles.outer }>
          <Items pathname={pathname}>
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
