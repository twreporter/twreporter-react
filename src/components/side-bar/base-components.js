import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'
import styled from 'styled-components'
import { typography } from '../../themes/common-variables'

const _ = {
  get
}

const StyledAnchor = styled.div`
  padding-top: 2px;
  padding-bottom: 2px;
  &:hover {
    cursor: pointer;
  }
`
const Label = styled.div`
  font-size: ${typography.font.size.xSmall};
  font-weight: ${typography.font.weight.normal};
  line-height: 1;
  margin: 2px 3px;
`

class Anchors extends React.PureComponent {
  constructor(props) {
    super(props)
    this.Anchor = StyledAnchor
  }

  /**
   * render vertical word by word
   *
   * @param {string[]} words words to render vertically
   * @returns {Object[]} Label components
   */
  _assembleWord(words) {
    return words.split('').map((word) => {
      return (
        <Label key={`anchor_label_${word}`}>
          {word}
        </Label>
      )
    })
  }

  /**
   * render Anchor components
   *
   * @param {Object} anchorObj info we need to render Anchor component
   * @param {string} anchorObj.id  - id of anchor
   * @param {string} anchorObj.label - lable of anchor
   * @param {bool} anchor.highlight
   * @param {function} anchor.handleClick
   * @param {number} anchor.index
   * @returns {Object[]} Anchor components
   */
  _renderAnchor(anchorObj) {
    const Anchor = this.Anchor
    return (
      <Anchor
        highlight={anchorObj.highlight}
        onClick={(e) => { anchorObj.handleClick(anchorObj.id, e) }}
        key={`SectionButton_${anchorObj.id}`}
      >
        <div>{this._assembleWord(anchorObj.label)}</div>
      </Anchor>
    )
  }

  render() {
    const anchorBts = []
    const { data, currentAnchorId, handleClickAnchor } = this.props
    let index = 1
    data.forEach((anchorObj) => {
      const id = _.get(anchorObj, 'id', '')
      const label = _.get(anchorObj, 'label', '')

      // id and label are not empty string
      if (id && label) {
        anchorBts.push(this._renderAnchor({
          handleClick: handleClickAnchor,
          highlight: id === currentAnchorId,
          id,
          index,
          label
        }))
        index += 1
      }
    })
    return (
      <div>
        { anchorBts }
      </div>
    )
  }
}

Anchors.defaultProps = {
  currentAnchorId: '',
  data: [],
  handleClickAnchor: () => {}
}

Anchors.propTypes = {
  currentAnchorId: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  })),
  handleClickAnchor: PropTypes.func
}


export default {
  StyledAnchor,
  Anchors,
  Label
}
