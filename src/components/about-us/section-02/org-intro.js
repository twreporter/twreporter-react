import { font } from '../constants/styles'
import * as intro from '../constants/section-02/org-intro'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Container = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: #000;
  opacity: .45;
`

const Item = styled.li`
  padding-left: 1em;
  &::before {
    content: "*";
    float: left;
    margin-left: -1em;
  }
  margin-top: 27px;
  &:first-of-type { 
    margin: 0;
  }
`

const Chinese = styled.div`
  font-size: 12px;
  font-family: ${font.family.chinese}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.medium};
  line-height: 1.5;
`

const English = styled.div`
  font-size: 12px;
  font-family: ${font.family.english.din}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.medium};
  margin-top: 10px;
  line-height: 1.25;
`

export default class OrgIntro extends PureComponent {
  render() {
    return (
      <Container>
        <Item>
          <Chinese>{intro.foundationIntro.chinese}</Chinese>
          <English>{intro.foundationIntro.english}</English>
        </Item>
        <Item>
          <Chinese>{intro.mediaIntro.chinese}</Chinese>
          <English>{intro.mediaIntro.english}</English>
        </Item>
      </Container>
    )
  }
}
