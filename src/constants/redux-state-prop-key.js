import twreporterRedux from '@twreporter/redux'

const { reduxStateFields } = twreporterRedux

export default {
  entities: reduxStateFields.entities,
  indexPage: reduxStateFields.indexPage,
  lists: reduxStateFields.lists,
  topicList: reduxStateFields.topicList,
  selectedPost: reduxStateFields.selectedPost,
  selectedTopic: reduxStateFields.selectedTopic,
  bookmarks: 'bookmarks',
  header: 'header',
  searchedAuthorsList: 'searchedAuthorsList',
  authorsList: 'authorsList',
  articlesByAuthor: 'articlesByAuthor',
  auth: 'auth',
  entitiesForAuthors: 'entitiesForAuthors',
  // time stamp for next popup
  nextNotifyPopupTS: 'nextNotifyPopupTS'
}
