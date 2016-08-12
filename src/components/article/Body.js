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
    const { data, customStyles } = this.props
    console.log('***data', data)

    if (Array.isArray(data)) {
      let Blocks = data.map((ele) => {
        let type = ele.type
        let Component = getArticleComponent(type)
        console.log('***getArticleComponent', type, Component)

        if (!Component) {
          return null
        }
        return (
          <div
            key={ele.id}
            className={classNames(commonStyles['component'], styles[type])}
            style={_.get(customStyles, 'component', {})}
          >
            <Component
              alignment={ele.alignment}
              content={ele.content}
              customStyles={ele.styles}
              id={ele.id}
            />
          </div>
        )
      })
      return (
        <div
          className={commonStyles['components']}
          style={_.get(customStyles, 'components', {})}
        >
          {Blocks}
        </div>
      )
    }
  }
}
