'use strict'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-next-line
import classNames from 'classnames'
import commonStyles from './Common.scss'
import styles from './Annotation.scss'

// lodash
import get from 'lodash/get'

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
  annotation: PropTypes.string,
  device: PropTypes.string,
  pureAnnotationText: PropTypes.string,
  text: PropTypes.string
}

AnnotationBlock.defaultProps = {
  annotation: '',
  device: '',
  pureAnnotationText: '',
  text: ''
}

export const Annotation = ({ content }) => {
  let html = get(content, 0, '')

  // annotation data will be in the comment with prefix __ANNOTATION__=
  let re = /<!--__ANNOTATION__=(.+?)-->/

  let sections = []
  let result
  do {
    result = re.exec(html)
    if (result) {
      try {
        let inlineText = html.substring(0, result.index)
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
        html = html.substr(result.index + get(result, [ 0, 'length' ]))
      } catch(e) {
        console.warn('Can not JSON parse annotation obj string', get(result, 1)) // eslint-disable-line
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

