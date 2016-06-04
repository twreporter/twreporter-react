'use strict'

import * as ArticleComps from './index'

export default function getArticleComponent(type = 'unstyled') {
  switch (type) {
    case 'code':
      return null
    case 'embeddedCode':
      return ArticleComps.Embedded
    case 'image':
      return ArticleComps.AlignedImage
    case 'imageDiff':
      return ArticleComps.AlignedImageDiff
    case 'infobox':
      return ArticleComps.AlignedInfoBox
    case 'ordered-list':
    case 'unordered-list':
      return null
    case 'blockquote':
      return ArticleComps.AlignedBlockQuote
    case 'unstyled':
      return ArticleComps.Paragraph
    case 'slideshow':
      return ArticleComps.Slideshow
  }
}
