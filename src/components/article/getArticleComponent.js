'use strict'

import * as ArticleComps from './index'

export default function getArticleComponent(type = 'unstyled') {
  switch (type) {
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
    case 'ordered-list':
    case 'unordered-list':
      return null
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
