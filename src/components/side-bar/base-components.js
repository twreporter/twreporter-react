import styled from 'styled-components'
import { typography } from '../../themes/common-variables'

const Anchor = styled.div`
  padding-top: 2px;
  padding-bottom: 2px;
  &:hover {
    cursor: pointer;
  }
`
const Label = styled.div`
  font-size: ${typography.font.size.xSmall};
  font-weight: ${typography.font.weight.normal};
  line-height: 1;
  margin: 2px 3px;
`

export default {
  Anchor,
  Label
}
