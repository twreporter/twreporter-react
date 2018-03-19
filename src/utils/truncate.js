
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
