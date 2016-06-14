/*eslint no-unused-vars:0*/
'use strict'
import _ from 'lodash'
import classNames from 'classnames'
import getArticleComponent from './getArticleComponent'
// import styles from './Body.scss'
import React, { Component } from 'react'

export class Body extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data } = this.props
    if (Array.isArray(data)) {
      let Blocks = data.map((ele) => {
        let type = ele.type
        let Component = getArticleComponent(type)
        if (!Component) {
          return null
        }
        return (
          <Component
            key={ele.id}
            alignment={ele.alignment}
            content={ele.content}
            customeStyles={ele.styles}
            id={ele.id}
          />
        )
      })
      return (
        <div className="outer-max">
          {Blocks}
        </div>
      )
    }
  }
}
