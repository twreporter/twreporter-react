import { css } from 'styled-components'
// import { screen } from './screen'

const numberHeight = {
  mobile: '277px',
  tablet: '281px',
  desktop: '404px',
  hd: '404px'
}

export const getMobileSectionTitleStyle = (imageSrc, marginBottom = '100px') => {
  return css`
    width: 100%;
    height: ${numberHeight.mobile};
    background-image: url(${imageSrc});
    background-size: contain;
    background-position: right center;
    margin-bottom: ${marginBottom};
  `
}
