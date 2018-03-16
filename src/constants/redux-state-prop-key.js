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
  routing: 'routing',
  header: 'header',
  searchedAuthorsList: 'searchedAuthorsList',
  authorsList: 'authorsList',
  articlesByAuthor: 'articlesByAuthor',
  authConfigure: 'authConfigure',
  auth: 'auth',
  entitiesForAuthors: 'entitiesForAuthors'
}
