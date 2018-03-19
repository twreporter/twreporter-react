import { css } from 'styled-components'
import reduce from 'lodash/reduce'

const _ = {
  reduce
}

/**
* @prop {object} mqSettingsObj
* */
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
