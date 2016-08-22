'use strict'

export * from './action-types'
export * from './strings'

export const SITE_NAME = {
  FULL: '報導者The Reporter',
  SHORT: '報導者',
  SEPARATOR: ' - '
}

export const SITE_META = {
  DESC: '報導者致力於具有手作質感的深度報導，並勇於探索網路新工具與呈現方式，重視網路的公共性與開放性，結合各種進步價值與公民力量。',
  URL: 'https://www.twreporter.org/',
  LOGO: 'https://www.twreporter.org/asset/logo.png',
  KEYWORDS: '報導者,twreporter,新聞,調查報道,原創報道,深度報道,環境,議題,評論,媒體,新媒體,台灣,兩岸,文化'
}

export const LINK_PREFIX = {
  ARTICLE: '/a/',
  CATEGORY: '/category/',
  TAG: '/tag/',
  TOPIC: '/topic/'
}

export const groupEnum = {
  CATEGORY: 'category',
  TAG: 'tag',
  TOPIC: 'topic'
}
export const apiPathEnum = {
  CATEGORY: 'postcategories',
  TAG: 'tags',
  TOPIC: 'topics'
}

export const authorTypes = {
  writter: '文',
  photographer: '攝影',
  designer: '設計',
  engineer: '工程'
}

export const copyrightTypes = {
  default: {
    string: '除另有註明，網站內容皆採用創用CC姓名標示-非商業性-禁止改作授權條款',
    link: 'http://creativecommons.org/licenses/by-nc-nd/3.0/tw/',
    image: 'LOGO_CC'
  },
  copyrighted: {
    string: 'Copyright © 2015-2016 報導者',
    link: null,
    image: null
  },
  creativeCommons: {
    string: '創用CC姓名標示-非商業性-禁止改作授權條款',
    link: 'http://creativecommons.org/licenses/by-nc-nd/3.0/tw/',
    image: 'LOGO_CC'
  }
}

export const CHARACTERS_LIMIT = {
  TOPIC_DESC: 120,
  BOTTOM_RELATED_DESC: 120
}

export const ITEMS_LIMIT = {
  ARTICLE_RELATED: 3
}

export const RELATED_ARTICLES = '延伸閱讀'

export const CONTINUE_READING = '繼續閱讀'

export const LOAD_MORE_ARTICLES = '載入更多文章'

export const TOPIC_TEXT = '專題'

export const ARTICLE = 'ARTICLE'

export const PHOTOGRAPHY = 'PHOTOGRAPHY'

export const PHOTOGRAPHY_ARTICLE = 'PHOTOGRAPHY_ARTICLE'

export const PHOTOGRAPHY_ARTICLE_STYLE = 'photography'

export const HOME = 'HOME'

export const CATEGORY = 'CATEGORY'

export const TAG = 'TAG'

export const TOPIC = 'TOPIC'

export const basePath = 'https://www.twreporter.org'

export const appId = 962589903815787

export const donatePath = 'https://twreporter.backme.tw/cashflow/checkout?project_id=175&reward_id=718'

export const categoryPath = {
  taiwanPath: '/category/taiwan',
  reviewPath: '/category/review',
  photographyPath: '/photography',
  intlPath: '/category/intl',
  culturePath: '/category/culture'
}

export const navPath = [ {
  title: '台灣',
  path: '/category/taiwan'
}, {
  title: '國際',
  path: '/category/intl'
}, {
  title: '文化',
  path: '/category/culture'
}, {
  title: '影像',
  path: '/photography'
}, {
  title: '評論',
  path: '/category/review'
} ]

export const subnavPath = [ {
  title: '轉型正義',
  path: '/a/transitional-justice-content'
}, {
  title: '0206地震',
  path: '/a/0206earthquake-content'
}, {
  title: '亞洲森林浩劫',
  path: '/a/asia-forest-content'
}, {
  title: '走入同志家庭',
  path: '/a/homofamily-content'
}, {
  title: '急診人生',
  path: '/a/emergency-content'
} ]

export const colors = {
  whiteBg: '#F1F1F1',
  superWhite: '#FFFFFF',
  darkBg: '#08192d'
}
