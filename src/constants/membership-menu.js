import routes from './routes'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'

// menu list type enum
export const ListType = {
  NORMAL: 'normal',
  DIVIDER: 'divider',
  LOGOUT: 'logout',
  LINK: 'link',
}

// menu list item
const memberData = {
  type: ListType.NORMAL,
  text: '個人資料',
  path: routes.memberPage.path,
}

const donation = {
  type: ListType.NORMAL,
  text: '贊助紀錄',
  path: routes.memberPage.memberDonationPage.path,
}

const newsletter = {
  type: ListType.NORMAL,
  text: '訂閱電子報',
  path: routes.memberPage.memberEmailSubscriptionPage.path,
}

const bookmark = {
  type: ListType.NORMAL,
  text: '已收藏',
  path: routes.myReadingPage.savedBookmarksPage.path,
}

const logout = {
  type: ListType.LOGOUT,
  text: '登出',
  path: `/v2/auth/logout`,
}

const divider = {
  type: ListType.DIVIDER,
}

const myReading = {
  type: ListType.NORMAL,
  text: '我的閱讀',
  path: routes.myReadingPage.path,
}

const readingFootprint = {
  type: ListType.NORMAL,
  text: '造訪紀錄',
  path: routes.myReadingPage.browsingHistoryPage.path,
}

const bookshopFriend = {
  type: ListType.LINK,
  text: '特約優惠',
  link: 'https://www.twreporter.org/a/bookstore-partnership',
  target: '_self',
  excludeRole: [MEMBER_ROLE.explorer, MEMBER_ROLE.action_taker],
}

// menu list data
export const MENU_LIST_DATA = [
  memberData,
  donation,
  newsletter,
  bookshopFriend,
  divider,
  myReading,
  bookmark,
  readingFootprint,
  divider,
  logout,
]

export const MENU_LIST_DATA_MOBILE = [
  donation,
  newsletter,
  bookshopFriend,
  divider,
  myReading,
  bookmark,
  readingFootprint,
  divider,
  logout,
]

export default {
  ListType,
  MENU_LIST_DATA,
  MENU_LIST_DATA_MOBILE,
}
