import React, { PureComponent } from 'react'
import WhiteSearchIcon from '../../../static/asset/white-search-icon.svg'
import loggerFactory from '../../logger'
import mq from '../../utils/media-query'
import styled from 'styled-components'
import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'

const logger = loggerFactory.getLogger()

const searchPath = '/search'

const Mq = {
  MobileOnly: styled.div`
    display: inline-block;
    ${mq.tabletAndAbove`
      display: none;
    `}
  `,
  TabletAndAbove: styled.div`
    display: flex;
    width: ${props => props.showInput ? '220px' : '20px'};
    transition: width .2s ease;
    overflow: hidden;
    height: 20px;
    ${mq.mobileOnly`
      display: none;
    `}
  `
}

const StyledIcon = styled(WhiteSearchIcon)`
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`

const Form = styled.form`
  flex: 1 1 0;
  min-width: 0;
  height: 20px;
`

const Input = styled.input`
  display: block;
  outline: none;
  border: none;
  height: 100%;
  margin: 0;
  padding-left: 10px;
  background-color: transparent;
  color: #ffffff;
  font-size: 16px;
  font-weight: ${fontWeight.normal};
  ::placeholder {
    color: #ffffff;
    font-size: 16px;
    font-weight: ${fontWeight.normal};
  }
`

export default class SearchBox extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showInput: false,
      inputValue: ''
    }
    this.handleChange = this._handleChange.bind(this)
    this.handleBlur = this._handelBlur.bind(this, false)
    this.handleSubmit = this._handleSubmit.bind(this)
    this.handleClick = this._handleClick.bind(this)
    this._input = React.createRef()
  }

  _toggleShow() {
    const nextShow = !this.state.showInput
    this.setState({
      showInput: nextShow
    }, () => {
      if (nextShow) {
        try {
          this._input.current.focus()
        } catch (err) {
          logger.error(err)
        }
      }
    })
  }

  _search(query) {
    window.location=`${searchPath}?q=${query}`
  }

  _handleChange(e) {
    e.preventDefault()
    this.setState({ inputValue: e.target.value })
  }

  _handelBlur() {
    this._toggleShow()
  }

  _handleSubmit(event) {
    event.preventDefault()
    this._search(this.state.inputValue)
  }

  _handleClick() {
    this._toggleShow()
  }

  render() {
    const { showInput, inputValue } = this.state
    return (
      <div>
        <Mq.MobileOnly>
          <a href={searchPath}>
            <StyledIcon />
          </a>
        </Mq.MobileOnly>
        <Mq.TabletAndAbove showInput={showInput}>
          <StyledIcon onClick={this.handleClick} />
          <Form onSubmit={this.handleSubmit}>
            <Input
              ref={this._input}
              type="text"
              placeholder="搜尋報導者文章"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={inputValue}
            />
          </Form>
        </Mq.TabletAndAbove>
      </div>
    )
  }
}
