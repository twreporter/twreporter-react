'use strict'
import logoCC from '../../static/asset/icon-cc.svg'

export * from './action-types'

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
  writter: '採訪',
  photographer: '攝影',
  designer: '設計',
  engineer: '工程'
}

export const copyrightTypes = {
  default: {
    string: '除另有註明，網站內容皆採用創用CC姓名標示-非商業性-禁止改作授權條款',
    link: 'http://creativecommons.org/licenses/by-nc-nd/3.0/tw/',
    image: logoCC
  },
  copyrighted: {
    string: 'Copyright © 2015-2016 報導者',
    link: null,
    image: null
  },
  creativeCommons: {
    string: '創用CC姓名標示-非商業性-禁止改作授權條款',
    link: 'http://creativecommons.org/licenses/by-nc-nd/3.0/tw/',
    image: logoCC
  }
}

export const ARTICLE = 'ARTICLE'

export const HOME = 'HOME'

export const CATEGORY = 'CATEGORY'

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
  title: '國際兩岸',
  path: '/category/intl'
}, {
  title: '文化',
  path: '/category/culture'
}, {
  title: '影像',
  path: '/photography'
}, {
  title: '專欄',
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
  title: '五輕關廠',
  path: '/a/refinery-content'
}, {
  title: '急診人生',
  path: '/a/emergency-content'
} ]

export const colors = {
  whiteBg: '#F7F8F8',
  darkBg: '#3e3a39'
}
