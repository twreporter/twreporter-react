import styled from 'styled-components'
import React from 'react'

const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Message = styled.div`
  width: 90%;
  text-align: center;
`

const RedirectToSignIn = ({ children }) => (
  <Container>
    <Message>
      {children}
    </Message>
  </Container>
)

export default RedirectToSignIn
