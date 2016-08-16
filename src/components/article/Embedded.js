/*eslint no-unused-vars:0*/
'use strict'
import _ from 'lodash'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import React from 'react' // eslint-disable-next-line
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import styles from './Embedded.scss'

export class EmbeddedCode extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let node = ReactDOM.findDOMNode(this.refs.embedded)
    let scripts = _.get(this.props, [ 'content', 0, 'scripts' ])
    if (node && Array.isArray(scripts)) {
      _.forEach(scripts, (script) => {
        let scriptEle = document.createElement('script')
        let attribs = script.attribs
        _.merge(scriptEle, attribs)
        scriptEle.text = script.text || ''
        node.appendChild(scriptEle)
      })
    }
  }

  componentWillUnmount() {
    this.refs.embedded = null
  }

  render() {
    let content = _.get(this.props, [ 'content', 0 ], {})

    return (
      <div className={classNames(commonStyles['inner-block'])}>
        <div ref="embedded" dangerouslySetInnerHTML={{ __html: content.embeddedCodeWithoutScript }}/>
        <div className={classNames(commonStyles['desc-text-block'], 'text-justify')}>{content.caption}</div>
      </div>
    )
  }
}

export const AlignedEmbedded = BlockAlignmentWrapper(EmbeddedCode)
