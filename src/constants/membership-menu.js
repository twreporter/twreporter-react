import routes from './routes'

// menu list type enum
export const ListType = {
  NORMAL: 'normal',
  DIVIDER: 'divider',
  LOGOUT: 'logout',
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
  path: '/myreading/saved', // todo: use routes after dependency merged
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
  path: '/myreading', // todo: use routes after dependency merged
}

const readingFootprint = {
  type: ListType.NORMAL,
  text: '造訪紀錄',
  path: '/myreading/history', // todo: use routes after dependency merged
}

// menu list data
export const MENU_LIST_DATA = [
  memberData,
  donation,
  newsletter,
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
