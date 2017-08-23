import React from 'react'
import { ActivePage } from 'twreporter-registration'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

const Activation = (props) => (
  <div>
    <ActivePage
      activateRedirectPath={'/'}
      browserHistory={browserHistory}
      {...props}
    />
  </div>
)


export default connect()(Activation)
