/*eslint no-unused-vars:0*/
'use strict'
import React, { Component } from 'react'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import getArticleComponent from './getArticleComponent'
import styled from 'styled-components'
import commons from './commons'
import styles from './Body.scss'
import Annotation from './annotation'
import { ComponentContainer } from './commons'
import { layout, screen } from '../../themes/screen'

// lodash
import get from 'lodash/get'

const CustomComponentContainer = ComponentContainer.extend`
  ${screen.tablet`
    max-width: ${layout.tabletMediumWidth};
  `}

  ${screen.desktop`
    max-width: ${layout.desktopMediumWidth};
  `}

  ${screen.overDesktop`
    max-width: ${layout.hdDesktopMediumWidth};
  `}
`

const getComponentContainer = (type) => {
  switch(type) {
    case 'image':
    case 'imagediff':
    case 'slideshow':
    case 'youtube': {
      return CustomComponentContainer
    }
    default: {
      return ComponentContainer
    }
  }
}

export class Body extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data } = this.props
    let sectionCnt = 0

    // -----------fontChanging-----------//
    const fontSize = this.props.fontSize

    let fontSizeStyle = classNames({
      'font-shrink': fontSize === 'small',
      'font-default': fontSize === 'medium',
      'font-enlarge': fontSize === 'large'
    })
    fontSizeStyle = styles[fontSizeStyle]

    if (Array.isArray(data)) {
      const Blocks = data.map((ele) => {
        const type = ele.type
        const ArticleComponent = getArticleComponent(type)
        const ArticleComponentContainer = getComponentContainer(type)
        let anchor = null
        let minHeight = 'auto'
        let width = 'auto'

        if(type === 'header-one') {
          sectionCnt++
          anchor = <div id={`section-${sectionCnt}`}></div>
        } else if (type === 'embeddedcode') {
          const embeddedContent = get(ele, [ 'content', 0 ], {})
          width = get(embeddedContent, 'width', 'auto')
          minHeight = get(embeddedContent, 'height', 'auto')
        }

        if (!ArticleComponent || !ArticleComponentContainer) {
          return null
        }

        return (
          <ArticleComponentContainer
            key={ele.id}
            width={width}
            minHeight={minHeight}
          >
            {anchor}
            <ArticleComponent
              alignment={ele.alignment}
              content={ele.content}
              id={ele.id}
              styles={ele.styles}
            />
          </ArticleComponentContainer>
        )
      })
      return (
        <div
          itemProp="articleBody"
        >
          {Blocks}
        </div>
      )
    }
  }
}
