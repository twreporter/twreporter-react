'use strict'

import * as ArticleComps from './index'

export default function getArticleComponent(type = 'unstyled') {
  switch (type) {
    case 'unstyled':
      return ArticleComps.Paragraph
    case 'image':
      return ArticleComps.Image
    case 'code':
    case 'ordered-list':
    case 'unordered-list':
      return null
    case 'slideshow':
      return ArticleComps.Slideshow
    case 'imagediff':
      return ArticleComps.ImageDiff
    case 'embedded':
      return ArticleComps.Embedded
  }
}
