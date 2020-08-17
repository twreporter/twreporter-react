import React, { Component } from 'react'
import styled from 'styled-components'

const googleSearchId = '013371828254368986439:_ega685nikw'

const Container = styled.div`
  min-height: 120vh;
`

class Search extends Component {
  componentDidMount() {
    // display search results
    const gcse = document.createElement('script')
    gcse.type = 'text/javascript'
    gcse.async = true
    gcse.src = 'https://cse.google.com/cse.js?cx=' + googleSearchId
    const s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(gcse, s)
  }

  render() {
    return (
      <Container>
        <div
          dangerouslySetInnerHTML={{
            __html: '<gcse:searchbox-only></gcse:searchbox-only>',
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: '<gcse:searchresults-only></gcse:searchresults-only>',
          }}
        />
      </Container>
    )
  }
}

export { Search }
export default Search
