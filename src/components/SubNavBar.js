import React, { Component } from 'react'
import classNames from 'classnames'
// import { subnavPath } from '../lib/constants'

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
    if (bgStyle === 'dark') {
      subMenuClass = styles.dark
    } else {
      subMenuClass = styles.white
    }

    return (
      <div className={ classNames(styles.subnav, subMenuClass) }>
        <div className={ styles.outer }>
          <Items path={path} bgStyle={bgStyle}>
            <a href="/a/sound-map-no002"><h1>轉型正義</h1></a>
            <a href="/a/sound-map-no002"><h1>0206地震</h1></a>
            <a href="/a/sound-map-no002"><h1>2016總統立委大選</h1></a>
            <a href="/a/sound-map-no002"><h1>五輕關廠</h1></a>
            <a href="/a/sound-map-no002"><h1>急診人生</h1></a>
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
