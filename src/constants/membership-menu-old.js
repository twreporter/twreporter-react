import routes from './routes-old'

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
  text: '電子報設定',
  path: routes.memberPage.memberEmailSubscriptionPage.path,
}

const bookmark = {
  type: ListType.NORMAL,
  text: '我的書籤',
  path: routes.bookmarkListPage.path.slice(0, 10),
}

const logout = {
  type: ListType.LOGOUT,
  text: '登出',
  path: `/v2/auth/logout`,
}

const divider = {
  type: ListType.DIVIDER,
}

// menu list data
export const MENU_LIST_DATA = [
  memberData,
  donation,
  newsletter,
  divider,
  bookmark,
  divider,
  logout,
]

export const MENU_LIST_DATA_MOBILE = [
  donation,
  newsletter,
  divider,
  bookmark,
  divider,
  logout,
]

export default {
  ListType,
  MENU_LIST_DATA,
  MENU_LIST_DATA_MOBILE,
}
