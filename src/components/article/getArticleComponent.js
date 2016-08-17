'use strict'

import * as ArticleComps from './index'

export default function getArticleComponent(type = 'unstyled') {
  switch (type) {
    case 'annotation':
      return ArticleComps.Annotation
    case 'audio':
      return ArticleComps.Audio
    case 'blockquote':
      return ArticleComps.BlockQuote
    case 'quoteby':
      return ArticleComps.AlignedQuoteBy
    case 'header-one':
      return ArticleComps.HeaderOne
    case 'header-two':
      return ArticleComps.HeaderTwo
    case 'code':
      return null
    case 'embeddedCode':
    case 'embeddedcode':
      return ArticleComps.AlignedEmbedded
    case 'image':
      return ArticleComps.AlignedImage
    case 'imageDiff':
    case 'imagediff':
      return ArticleComps.AlignedImageDiff
    case 'infobox':
      return ArticleComps.AlignedInfoBox
    case 'ordered-list-item':
      return ArticleComps.OrderedList
    case 'unordered-list-item':
      return ArticleComps.UnorderedList
    case 'unstyled':
      return ArticleComps.Paragraph
    case 'slideshow':
      return ArticleComps.Slideshow
    case 'youtube':
      return ArticleComps.AlignedYoutube
    default:
      return
  }
}
