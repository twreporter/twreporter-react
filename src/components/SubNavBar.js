import React, { Component } from 'react'
import classNames from 'classnames'
import { subnavPath } from '../lib/constants'

if (process.env.BROWSER) {
  require('./NavBar.css')
}
const styles = require('./SubNavBar.scss')

class Items extends Component {
  render() {
    const { children, path } = this.props
    let _children = []
    children.map((child, i) => {
      let itemClassName
      let borderClass
      if (child.props.href === path) {
        itemClassName = styles.active
      }
      if(i < children.length - 1) {
        borderClass = styles.borderLine
      }
      _children.push(
        <li className={classNames(styles.item, itemClassName, borderClass)} key={i}>
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
      subMenuLinks.push(<a key={i} href={subnavPath[i].path}><h1>{subnavPath[i].title}</h1></a>)
    }

    return (
      <div className={ classNames(styles.subnav, subMenuClass) }>
        <div className={ styles.outer }>
          <Items path={path} bgStyle={bgStyle}>
            {subMenuLinks}
          </Items>
          <div className={ styles.links }>
            <div className={styles.inlineBtn}>
              <div className={styles.triangle}></div>
              <div className={styles.donateBtn}>
                <a target="_blank" href="https://twreporter.backme.tw:443/cashflow/checkout?project_id=175&reward_id=718"><h1>贊助我們</h1></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
