import React from 'react'
import withLayout from '../helpers/with-layout'
import withRouter from 'react-router/lib/withRouter'
import { Confirmation, PageContainer } from '@twreporter/registration'


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
