import loadArticlePageData from './article-page'
import loadAuthorListPageData from './author-list-page'
import loadAuthorPageData from './author-page'
import loadBookmarkListData from './bookmark-list'
import loadBookmarkWidgetData from './bookmark-widget'
import loadCategoryListPageDataNew from './category-list-page'
import loadCategoryListPageDataOld from './category-list-page-old'
import loadIndexPageData from './index-page'
import loadPhotographyPageDataNew from './photography-page'
import loadPhotographyPageDataOld from './photography-page-old'
import loadTagListPageData from './tag-list-page'
import loadTopicListPageData from './topic-list-page'
import loadTopicPageData from './topic-page'
import loadLatestPageData from './latest-page'
// feature toggle
import { ENABLE_NEW_INFO_ARCH } from '@twreporter/core/lib/constants/feature-flag'
const loadCategoryListPageData = ENABLE_NEW_INFO_ARCH
  ? loadCategoryListPageDataNew
  : loadCategoryListPageDataOld
const loadPhotographyPageData = ENABLE_NEW_INFO_ARCH
  ? loadPhotographyPageDataNew
  : loadPhotographyPageDataOld

export default {
  loadArticlePageData,
  loadAuthorListPageData,
  loadAuthorPageData,
  loadBookmarkListData,
  loadBookmarkWidgetData,
  loadCategoryListPageData,
  loadIndexPageData,
  loadPhotographyPageData,
  loadTagListPageData,
  loadTopicListPageData,
  loadTopicPageData,
  loadLatestPageData,
}
