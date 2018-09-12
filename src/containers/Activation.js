import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import LoadingSpinner from '../components/Spinner'
import React from 'react'
import get from 'lodash/get'
import styled from 'styled-components'
import withLayout from '../helpers/with-layout'
import withRouter from 'react-router/lib/withRouter'
import { ActivePage, PageContainer } from '@twreporter/registration'

const _ = {
  get
}

const StyledCSSTransitionGroup = styled(CSSTransitionGroup)`
  .spinner-leave {
    opacity: 1;
  }

  .spinner-leave.spinner-leave-active {
    opacity: 0;
    transition: opacity 400ms linear 1600ms;
  }
`

const LoadingCover = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1999;
  background-color: white;
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

class Activation extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      authError: false
    }
    this.handleError = this._handleError.bind(this)
  }

  _handleError() {
    this.setState({
      authError: true
    })
  }

  render() {
    const { location } = this.props
    const destination = _.get(location, 'query.destination', '/')

    return (
      <PageContainer>
        <div>
          {
            this.state.authError ?
              null
              :
              <StyledCSSTransitionGroup
                transitionName="spinner"
                transitionEnter={false}
                transitionLeaveTimeout={2000}
              >
                <LoadingCover key="loader">
                  <LoadingSpinner alt="首頁載入中" />
                </LoadingCover>
              </StyledCSSTransitionGroup>
          }
          <ActivePage
            destination={destination}
            errorOccurs={this.handleError}
            {...this.props}
          />
        </div>
      </PageContainer>
    )
  }
}

export default withRouter(withLayout(Activation))
