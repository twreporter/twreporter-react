'use strict'

import * as ArticleComps from './index'

export default function getArticleComponent(type = 'unstyled') {
  switch (type) {
    case 'annotation':
      return ArticleComps.Annotation
    case 'audio':
      return ArticleComps.Audio
    case 'blockQuote':
      return ArticleComps.AlignedBlockQuote
    case 'code':
      return null
    case 'embeddedCode':
      return ArticleComps.AlignedEmbedded
    case 'image':
      return ArticleComps.AlignedImage
    case 'imageDiff':
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
