import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// @twreporter
import { PillButton } from '@twreporter/react-components/lib/button'

const StretchPillButton = styled(PillButton)`
  width: auto;
  display: flex;
  justify-content: center;
  text-align: center;
`
const Box = styled.div``

// more button for webpush
const CustomMore = ({ text = '', onClickButton, ...props }) => {
  return (
    <Box onClick={onClickButton} {...props}>
      <StretchPillButton
        type={PillButton.Type.PRIMARY}
        size={PillButton.Size.S}
        style={PillButton.Style.BRAND}
        theme={PillButton.THEME.normal}
        text={text}
      />
    </Box>
  )
}
CustomMore.propTypes = {
  text: PropTypes.string,
  onClickButton: PropTypes.func.isRequired,
}
export default CustomMore
