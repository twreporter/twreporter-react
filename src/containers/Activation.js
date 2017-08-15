import React from 'react'
import { ActivePage } from 'twreporter-registration'
import { browserHistory } from 'react-router'

const Activation = (props) => (
  <div>
    <ActivePage
      activateRedirectPath={'/'}
      browserHistory={browserHistory}
      {...props}
    />
  </div>
)

export default Activation
