'use strict'

import * as ArticleComps from './index'

export default function getArticleComponent(type = 'unstyled') {
  switch (type) {
    case 'code':
      return null
    case 'embedded':
      return ArticleComps.Embedded
    case 'image':
      return ArticleComps.AlignedImage
    case 'imagediff':
      return ArticleComps.ImageDiff
    case 'infobox':
      return ArticleComps.AlignedInfoBox
    case 'ordered-list':
    case 'unordered-list':
      return null
    case 'unstyled':
      return ArticleComps.Paragraph
    case 'slideshow':
      return ArticleComps.Slideshow
  }
}
