import { css } from 'styled-components'

export const resetLinkStyle = css`
  a {
    &, :hover, :active, :link, :visited {
      color: inherit;
      text-decoration: none;
    }
  }
`
