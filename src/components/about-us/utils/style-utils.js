import { css } from 'styled-components'
import compact from 'lodash/compact'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import reduce from 'lodash/reduce'

const _ = {
  compact,
  isArray,
  isEmpty,
  reduce,
}

export const absoluteCentering = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const centerBlock = css`
  margin-left: auto;
  margin-right: auto;
`

/**
* @prop {array|number} values - Array or number of values
* @prop {string} unit - Unit
* */
export const arrayToCssShorthand = (values, unit = 'px') => {
  const _handleValue = (value) => {
    switch (typeof value) {
      case 'number':
        return (value === 0) ? '0' : `${value}${unit}`
      case 'string':
        return value
      default:
        return ''
    }
  }
  if (!_.isArray(values)) {
    return _handleValue(values)
  }
  return values.map(_handleValue).join(' ')
}

export const media = {
  mobile: (...args) => css`
    @media (max-width: 414px) {
      ${css(...args)}
    }
  `,
  iPhone5: (...args) => css`
    @media (max-width: 320px) {
      ${css(...args)}
    }
  `,
  iPhone6: (...args) => css`
    @media (max-width: 375px) {
      ${css(...args)}
    }
  `,
  iPhone6Plus: (...args) => css`
    @media (max-width: 414px) {
      ${css(...args)}
    }
  `,
  largeMobile: (...args) => css`
    @media (max-width: 650px) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (max-width: 768px) {
      ${css(...args)}
    }
  `,
}

/**
* @prop {string} position - postion of the content div
* @prop {number} lineHeight - line-height
* @prop {number} numberOfLine - number of line that you need in div
* @prop {string} backgroundColor - background
* @prop {string} textAlign - text-align
* */
export function truncate(position, lineHeight, numberOfLine, backgroundColor, textAlign) {
  const maxHeight = lineHeight * numberOfLine
  const textAlignValue = textAlign || 'justify'
  return `
    overflow: hidden;
    position: ${position};
    line-height: ${lineHeight}em;
    max-height: ${maxHeight}em;
    text-align: ${textAlignValue};
    margin-right: -1em;
    padding-right: 1em;
    &::before {
      content: '...';
      position: absolute;
      right: 0;
      bottom: 0;
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      width: 1em;
      height: 1em;
      margin-top: 0.25em;
      background: ${backgroundColor};
    }
  `
}

export const mq = (mqSettingsObj) => {
  const mqString = _.reduce(mqSettingsObj, (result, value, key) => {
    switch (key) {
      case 'mediaType':
        return `${value} ${result}`
      default:
        return `${result} and (${key}: ${value})`
    }
  })
  return (...cssCode) => css`
    @media ${mqString} {
      ${css(...cssCode)}
    }
  `
}

export const resetLinkStyle = css`
  a {
    &, :hover, :active, :link, :visited {
      color: inherit;
      text-decoration: none;
    }
  }
`
