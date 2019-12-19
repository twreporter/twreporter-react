'use strict'

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

export const DEFAULT_HEADER_HEIGHT = 70

export const CHARACTERS_LIMIT = {
  TOPIC_DESC: 112,
  BOTTOM_RELATED_DESC: 120,
  HEADER_TITLE_TRIMMED_RATIO: 0.45
}

export const ITEMS_LIMIT = {
  ARTICLE_RELATED: 3
}

export const RELATED_ARTICLES = '延伸閱讀'

export const CONTINUE_READING = '繼續閱讀'

export const TOPIC_TEXT = '專題'

export const SEARCH_RESULTS_TEXT = '搜尋結果'

export const basePath = 'https://www.twreporter.org'

export const appId = 962589903815787

export const donatePath = 'https://twreporter.org/donation'

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
}, {
  title: '作者群',
  path: '/authors'
} ]

export const colors = {
  whiteBg: '#F1F1F1',
  superWhite: '#FFFFFF',
  darkBg: '#08192d',
  darkText: '#262626'
}

export const TWITTER_CARD = {
  SUMMARY_LARGE_IMAGE: 'summary_large_image',
  SUMMARY: 'summary'
}

export const OG_TYPE = {
  PROFILE: 'profile',
  WEBSITE: 'website'
}
