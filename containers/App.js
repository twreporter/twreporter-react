import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import { resetErrorMessage } from '../actions'
import { loadArticles } from 'actions/articles';

class App extends Component {

    static fetchData({ store }) {
        console.log("fetch");
        return store.dispatch(loadArticles());
    }

    constructor(props) {
        super(props)
    }

    renderErrorMessage() {
        const { errorMessage } = this.props
        if (!errorMessage) {
            return null
        }

        return (
            <p style={{ backgroundColor: '#e99', padding: 10 }}>
            <b>{errorMessage}</b>
            {' '}
            (<a href="#"
            onClick={this.handleDismissClick}>
            Dismiss
            </a>)
            </p>
        )
  }

  render() {
    const { children, inputValue } = this.props
    return (
      <div>
          {children}
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    inputValue: state.router.location.pathname.substring(1)
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage,
  pushState
})(App)
