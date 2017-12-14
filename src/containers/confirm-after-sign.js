import React from 'react'
import withLayout from '../helpers/with-layout'
import { Confirmation, PageContainer } from '@twreporter/registration'
import { withRouter } from 'react-router'


class ConfirmAfterSign extends React.PureComponent {
  render() {
    return (
      <PageContainer>
        <Confirmation
          {...this.props}
        />
      </PageContainer>
    )
  }
}

export default withRouter(withLayout(ConfirmAfterSign))
