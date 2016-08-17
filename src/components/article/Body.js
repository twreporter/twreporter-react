/*eslint no-unused-vars:0*/
'use strict'
import _ from 'lodash'
import React, { Component } from 'react'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import getArticleComponent from './getArticleComponent'
import styles from './Body.scss'

export class Body extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data } = this.props
    let sectionCnt = 0

    if (Array.isArray(data)) {
      let Blocks = data.map((ele) => {
        let type = ele.type
        let Component = getArticleComponent(type)
        let anchor = null
        if(type === 'header-one') {
          sectionCnt++
          anchor = <div id={`section-${sectionCnt}`} className={styles['anchor']}></div>
        }

        if (!Component) {
          return null
        }
        return (
          <div
            key={ele.id}
            className={classNames(commonStyles['component'], commonStyles[type])}
          >
            {anchor}
            <Component
              alignment={ele.alignment}
              content={ele.content}
              id={ele.id}
              styles={ele.styles}
            />
          </div>
        )
      })
      return (
        <div
          className={commonStyles['components']}
        >
          {Blocks}
        </div>
      )
    }
  }
}
