'use strict'
import _ from 'lodash'
import commonStyles from './Common.scss'
import classNames from 'classnames'
import styles from './Annotation.scss'
import React from 'react' // eslint-disable-next-line

export class AnnotationBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: false
    }
    this.handleExpand = this._handleExpand.bind(this)
  }

  _handleExpand(e) {
    e.stopPropagation()
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render() {
    const { annotation, pureAnnotationText, text } = this.props
    const { isExpanded } = this.state
    return (
      <abbr
        className={classNames({ [styles.expand]: isExpanded }, styles['container'])}
        title={pureAnnotationText}
      >
        <span
          className={classNames(styles['annotated-text'])}
          onClick={this.handleExpand}
        >
          {text}
          <span
            className={classNames(styles['indicator'])}
          />
        </span>
        <div
          dangerouslySetInnerHTML={{ __html: annotation }}
          className={classNames(styles['body'], commonStyles['disable-inner-block'], commonStyles['desc-text-color'],  'text-justify')}
        />
      </abbr>
    )
  }
}

AnnotationBlock.propTypes = {
  annotation: React.PropTypes.string,
  device: React.PropTypes.string,
  pureAnnotationText: React.PropTypes.string,
  text: React.PropTypes.string
}

AnnotationBlock.defaultProps = {
  annotation: '',
  device: '',
  pureAnnotationText: '',
  text: ''
}

export const Annotation = ({ content }) => {
  let html = _.get(content, 0, '')

  // annotation data will be in the comment with prefix __ANNOTATION__=
  let re = /<!--__ANNOTATION__=(.+?)-->/g

  let sections = []
  let result
  let lastIndex = 0
  do {
    result = re.exec(html)
    if (result) {
      try {
        let inlineText = html.substring(lastIndex, result.index)
        let annotationObj = JSON.parse(result[1])
        sections.push(
          <span key={sections.length}
            dangerouslySetInnerHTML={{ __html: inlineText }}
          />,
          <AnnotationBlock
            key={'annotation ' + sections.length}
            {...annotationObj}
          />
        )
        html = html.replace(inlineText, '')
        html = html.replace(result[0], '')
        lastIndex = result.index
      } catch(e) {
        console.warn('Can not JSON parse annotation obj string', _.get(result, 1)) // eslint-disable-line
      }
    }
  } while (result)

  if (html) {
    sections.push(
      <span key={sections.length}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <div className={classNames(styles['block'], commonStyles['inner-block'], 'text-justify')}>
      {sections}
    </div>
  )
}

