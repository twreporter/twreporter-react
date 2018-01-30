/*eslint no-unused-vars:0 no-console:0*/
'use strict'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Waypoint from 'react-waypoint'
import sideBarFactory from '../side-bar/side-bar-factory'
import getArticleComponent from './getArticleComponent'
import styled from 'styled-components'
import { articleLayout } from '../../themes/layout'
import { screen } from '../../themes/screen'
import { globalColor, typography } from '../../themes/common-variables'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import throttle from 'lodash/throttle'

const longForm = 'longform'

const _ = {
  forEach,
  get,
  throttle
}

function ChooseBlockMaxWidth(type, screen) {
  const defaultMaxWidth = articleLayout.tablet.width.small
  switch(type) {
    case 'image':
    case 'imagediff':
    case 'slideshow':
    case 'youtube':
      return _.get(articleLayout, [ screen, 'width', 'medium' ], defaultMaxWidth) + 'px'
    default:
      return _.get(articleLayout, [ screen, 'width', 'small' ], defaultMaxWidth) + 'px'
  }
}

const StyledArticleComponent = styled.div`
  font-size: ${(props) => {
    let fontSize = typography.font.size.base
    switch(props.fontSize) {
      case 'small':
        fontSize = typography.font.size.xSmall
        break
      case 'large':
        fontSize = typography.font.size.larger
        break
      default:
        break
    }
    return fontSize
  }};

  margin-bottom: 40px;

  ${screen.tabletAbove`
    margin-left: auto;
    margin-right: auto;
  `}

  ${screen.tablet`
    max-width: ${(props) => ChooseBlockMaxWidth(props.eleType, 'tablet')};
  `}

  ${screen.desktop`
    max-width: ${(props) => ChooseBlockMaxWidth(props.eleType, 'desktop')};
  `}

  ${screen.overDesktop`
    max-width: ${(props) => ChooseBlockMaxWidth(props.eleType, 'hd')};
  `}
`

const SideBar = sideBarFactory.getArticleSideBar()

export class Body extends React.PureComponent {
  constructor(props, context) {
    super(props, context)

    this.state = {
      toShowSideBar: false
    }

    this.onEnter = this._onEnter.bind(this)
    this.onLeave = this._onLeave.bind(this)
  }

  _renderSideBarWithContents(anchors, anchorGroups, nonAnchorGroup) {
    return (
      <Waypoint
        onEnter={this.onEnter}
        onLeave={this.onLeave}
        fireOnRapidScroll
        topOffset="9%"
        bottomOffset="90%"
        scrollableAncestor="window"
      >
        <div>
          {nonAnchorGroup}
          <SideBar
            ref={node => this.sideBar = node}
            anchors={anchors}
            toShow={this.state.toShowSideBar}
          >
            {anchorGroups}
          </SideBar>
        </div>
      </Waypoint>
    )
  }

  _onEnter() {
    this.setState({
      toShowSideBar: true
    })
  }

  _onLeave() {
    this.setState({
      toShowSideBar: false
    })
  }

  _composeLongFormBody(blocksJSX) {
    const anchors = []
    const headerOnePositions = []
    _.forEach(blocksJSX, (blockJSX, index) => {
      const text = _.get(blockJSX, 'props.headerOneText')
      if (text) {
        headerOnePositions.push(index)
        anchors.push({
          id: `section_${(anchors.length + 1)}`,
          label: text
        })
      }
    })

    if (headerOnePositions.length === 0) {
      return blocksJSX
    }

    let nonHeaderOneGroup = null
    // if there are any blocks before the first header-one block,
    // store them in the different group, nonHeaderOneGroup
    if (typeof headerOnePositions[0] === 'number' && headerOnePositions[0] !== 0) {
      nonHeaderOneGroup = blocksJSX.slice(0, headerOnePositions[0])
    }

    const headerOneGroups = []
    // For side bar, we need to group the heading header-one block and the following non header-one blocks
    for(let index = 0; index < headerOnePositions.length; index += 1) {
      // current header-one element position
      const curPosition = headerOnePositions[index]
      // next header-one element position
      const nextPosition = (index + 1) < headerOnePositions.length ? headerOnePositions[index+1] : (blocksJSX.length - 1)
      // group header-one element and the other following elements
      headerOneGroups.push(
        <section key={anchors[index].id}>
          {blocksJSX.slice(curPosition, nextPosition)}
        </section>
      )
    }

    return this._renderSideBarWithContents(anchors, headerOneGroups, nonHeaderOneGroup)
  }


  render() {
    const { data, fontSize, articleStyle } = this.props

    let blocks = []
    if (Array.isArray(data)) {
      blocks = data.map((ele) => {
        let styles = {}
        let type = ele.type
        const Component = getArticleComponent(type)

        if (type === 'embeddedcode') {
          let embeddedContent = get(ele, [ 'content', 0 ], {})
          let width = get(embeddedContent, 'width')
          let height = get(embeddedContent, 'height')
          if (width) {
            styles.width = width
          }
          if (height) {
            styles.minHeight = height
          }
        }

        if (!Component) {
          return null
        }

        return (
          <StyledArticleComponent
            key={ele.id}
            fontSize={fontSize}
            style={styles}
            headerOneText={type === 'header-one' ? _.get(ele, 'content.0') : ''}
            eleType={type}
          >
            <Component
              alignment={ele.alignment}
              content={ele.content}
              id={ele.id}
              styles={ele.styles}
            />
          </StyledArticleComponent>
        )
      })

    }

    let content = blocks
    if (articleStyle === longForm) {
      content = this._composeLongFormBody(blocks)
    }

    return (
      <div
        itemProp="articleBody"
      >
        {content}
      </div>
    )
  }
}
