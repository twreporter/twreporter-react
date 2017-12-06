import  { Confirmation, PageContainer } from '@twreporter/registration'
import React from 'react'
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

export default withRouter(ConfirmAfterSign)
