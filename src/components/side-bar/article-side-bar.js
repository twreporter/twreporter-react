import ClickOutside from 'react-click-outside'
import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'
import styled from 'styled-components'
import { articleLayout } from '../../themes/layout'
import { colors, typography } from '../../themes/common-variables'
import mq from '../../utils/media-query'

const _ = {
  get
}

const longFormArticleClassNames = {
  toggleButton: 'long-form-article-toggle-button',
  anchorsBox: 'long-form-article-anchors-box',
  anchorOrder: 'long-form-article-anchor-order'
}

const mockup = {
  anchorMaxWidth: 85 //px
}

const AnchorsBox = styled.div`
  margin: auto;
`

const StyledAnchor = styled.div`
  border-right: 2px solid ${props => props.highlight ? colors.gray.gray25 : colors.gray.gray50};
  color: ${props => props.highlight ? colors.gray.gray25 : colors.gray.gray50};
  cursor: pointer;
  display: flex;
  font-size: ${typography.font.size.xSmall};
  margin: auto;
  max-height: 175px;
  max-width: ${mockup.anchorMaxWidth}px;
  opacity: ${props => props.highlight ? '1' : '0.6'};
  padding-bottom: 20px;
  padding-top: 20px;
  position: relative;
  transition: color .2s linear, border-right .2s linear, opacity .2s linear;


  > div {
    max-width: 1rem;
  }

  > div.${longFormArticleClassNames.anchorOrder} {
    margin-right: 10px;
  }

  > div:last-of-type{
    margin-right: 20px;
  }
`

class Anchors extends React.PureComponent {
  _renderAnchor(anchorObj) {
    //  The following codes are do the following things:
    //  1.
    //  if label is '01健康檢查成空話',
    //  it will display like
    //
    //    01 健成 | (this vertical line is the border)
    //       康空 |
    //       檢話 |
    //       查   |
    //
    //  2.
    //  if label is '健康檢查成空話',
    //  it will display like
    //
    //    健成 |
    //    康空 |
    //    檢話 |
    //    查   |
    //
    //  3.
    //  if label length is smaller than 7, e.g. '01轉診交通亂象'
    //  it will display like
    //
    //    01 轉 |
    //       診 |
    //       交 |
    //       通 |
    //       亂 |
    //       象 |
    //
    //
    const maxTextLengthInColumn = 6
    const textLengthInSecondColumn = 3
    let label = _.get(anchorObj, 'label', '')
    const matches = label.match(/^([0-9]{2})?(.+)/)
    const order = matches[1]
    label = matches[2]
    const firstColumnLabel = label.length > maxTextLengthInColumn ? label.slice(0, -textLengthInSecondColumn) : label
    const secondColumnLabel = label.length > maxTextLengthInColumn ?  label.slice(-textLengthInSecondColumn) : ''

    return (
      <StyledAnchor
        highlight={anchorObj.highlight}
        onClick={(e) => { anchorObj.handleClick(anchorObj.id, e) }}
        key={`SectionButton_${anchorObj.id}`}
      >
        { order ? <div className={longFormArticleClassNames.anchorOrder}>{order}</div> : null }
        <div>{firstColumnLabel}</div>
        { secondColumnLabel ? <div>{secondColumnLabel}</div> : null}
      </StyledAnchor>
    )
  }

  render() {
    const anchorBts = []
    const { data, currentAnchorId, handleClickAnchor } = this.props
    data.forEach((anchorObj) => {
      const id = _.get(anchorObj, 'id', '')
      const label = _.get(anchorObj, 'label', '')

      // id and label are not empty string
      if (id && label) {
        anchorBts.push(this._renderAnchor({
          handleClick: handleClickAnchor,
          highlight: id === currentAnchorId,
          id,
          label
        }))
      }
    })
    return (
      <AnchorsBox className={longFormArticleClassNames.anchorsBox}>
        { anchorBts }
      </AnchorsBox>
    )
  }
}

Anchors.defaultProps = {
  handleClickAnchor: () => {},
  data: []
}

Anchors.propTypes = {
  handleClickAnchor: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  }))
}

const SizeBarBox = styled.div`
  color: ${colors.gray.gray50};
  display: flex;
  left: 50%;
  width: ${mockup.anchorMaxWidth}px;
  opacity: ${props => (props.toShow ? 1 : 0)};
  position: fixed;
  top: 50%;
  transform: translate(calc(${-(articleLayout.hd.width.medium/2)}px - 100%), -50%);
  transition: opacity 0.5s linear;
  visibility: ${props => (props.toShow ? 'visible' : 'hidden')};
  z-index: 200;

  ${mq.hdOnly`
    transform: translate(calc(${-(articleLayout.hd.width.medium/2)}px - 150%), -50%);
  `}

  @media (min-width: 1440px) {
    transform: translate(calc(${-(articleLayout.hd.width.medium/2)}px - 200%), -50%);
  }

  > img.${longFormArticleClassNames.toggleButton} {
    display: none;
  }

  ${mq.tabletAndBelow`
    display: flex;
    left: 0;
    transform: translate(${props => props.isToggled ? '0' : '-100'}%, -50%);
    transition: transform .3s ease-in-out;
    background-color: ${colors.white};
    border-right: 1px solid #f2f2f2;
    width: 40vw;
    height: 100vh;

    > div.${longFormArticleClassNames.anchorsBox} {
      margin: auto;
      max-width: 40vw;
    }

    > img.${longFormArticleClassNames.toggleButton} {
      display: initial;
    }
  `}
`

const ToggleButton = styled.img`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(100%);
  width: 35px;
`

class ArticleSideBar extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isToggled: false
    }

    this.toggleMobileSideBar = this._toggleMobileSideBar.bind(this)
  }

  _toggleMobileSideBar() {
    this.setState({
      isToggled: !this.state.isToggled
    })
  }

  render() {
    // currentAnchorId and handleClickAnchor are passed from `SideBarHOC`
    const { anchors, children, currentAnchorId, handleClickAnchor, toShow } = this.props
    const { isToggled } = this.state
    // TODO change button and backButton after gina re-design
    const button = 'https://storage.googleapis.com/twreporter-infographics/walk-with-survivor-of-suicide-gcs/static/sidebar_button.png'
    const backButton = 'https://storage.googleapis.com/twreporter-infographics/walk-with-survivor-of-suicide-gcs/static/sidebar_button_back.png'
    return (
      <React.Fragment>
        <ClickOutside onClickOutside={isToggled ? this.toggleMobileSideBar : () => {}}>
          <SizeBarBox
            toShow={isToggled || toShow}
            isToggled={isToggled}
          >
            <ToggleButton
              className={longFormArticleClassNames.toggleButton}
              onClick={this.toggleMobileSideBar}
              src={isToggled ? backButton : button }
            />
            <Anchors
              data={anchors}
              handleClickAnchor={handleClickAnchor}
              currentAnchorId={currentAnchorId}
            />
          </SizeBarBox>
        </ClickOutside>
        {children}
      </React.Fragment>
    )
  }
}

ArticleSideBar.defaultProps = {
  currentAnchorId: '',
  handleClickAnchor: () => {},
  toShow: true
}

ArticleSideBar.propTypes = {
  anchors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  currentAnchorId: PropTypes.string,
  handleClickAnchor: PropTypes.func,
  toShow: PropTypes.bool
}

export default ArticleSideBar
