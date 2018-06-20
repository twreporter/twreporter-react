/*eslint no-unused-vars:0*/
'use strict'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import React from 'react' // eslint-disable-next-line
import classNames from 'classnames'
import commonStyles from './Common.scss'
import styles from './Embedded.scss'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  forEach,
  get,
  merge
}

export class EmbeddedCode extends React.Component {
  constructor(props) {
    super(props)
  }

  /**
   * Pick attributes that start with data and return them with a new object.
   * Example: ({ dataWidth: 100, dataPicId: 'xn3K8s' }) => ({ width: 100, picId: 'xn3K8s' })
   * Ref: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
   *
   * @param {Object} attributes attributes object with camelcased keys
   * @returns {Object} dataset object
   * @memberof EmbeddedCode
   */
  _pickDatasetFromAttribs(attributes) {
    const dataset = {}
    _.forEach(attributes, (value, key) => {
      const reg = /^data[^a-z]/
      if (reg.test(key)) {
        const newKeyInDataset = key.replace(reg, matched => matched.substr(-1, 1).toLowerCase())
        dataset[newKeyInDataset] = value
      }
    })
    return dataset
  }

  componentDidMount() {
    // workaround for rendering venngage embedded infographics
    // In the script(https://infograph.venngage.com/js/embed/v1/embed.js) venngage provided,
    // it addEventListener on 'load' event.
    // After 'load' event emits, it renders the iframe.
    // Hence, we emit the 'load' event after the script downloaded and executed.
    const onLoad = function () {
      const event = new Event('load')
      window.dispatchEvent(event)
    }
    const node = this.embedded
    const scripts = _.get(this.props, [ 'content', 0, 'scripts' ])
    if (node && Array.isArray(scripts)) {
      _.forEach(scripts, (script) => {
        const scriptEle = document.createElement('script')
        const attribs = script.attribs
        const dataset = this._pickDatasetFromAttribs(attribs)
        _.merge(scriptEle, attribs, { dataset })
        scriptEle.text = script.text || ''
        scriptEle.onload = onLoad
        node.appendChild(scriptEle)
      })
    }
  }

  componentWillUnmount() {
    this.embedded = null
  }

  render() {
    const content = _.get(this.props, [ 'content', 0 ], {})

    return (
      <div className={classNames(commonStyles['inner-block'], 'hidden-print')}>
        <div ref={div => {this.embedded = div}} dangerouslySetInnerHTML={{ __html: content.embeddedCodeWithoutScript }}/>
        <div className={classNames(commonStyles['desc-text-block'], 'text-justify')}>{content.caption}</div>
      </div>
    )
  }
}

export const AlignedEmbedded = BlockAlignmentWrapper(EmbeddedCode)
