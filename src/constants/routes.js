export default {
  homePage: {
    path: '/',
  },
  articlePage: {
    path: '/a/:slug',
  },
  serviceWorkerFallBackPage: {
    path: '/sw-fallback-page',
  },
  topicPage: {
    path: '/topics/:slug',
  },
  topicListPage: {
    path: '/topics',
  },
  categoryListPage: {
    path: '/categor(y|ies)/:category/:subcategory?',
  },
  tagListPage: {
    path: '/(tag|tags)/:tagId',
  },
  photographyPage: {
    path: '/photography',
  },
  searchPage: {
    path: '/search',
  },
  authorPage: {
    path: '/(author|authors)/:authorId',
  },
  authorListPage: {
    path: '/authors',
  },
  aboutUsPage: {
    path: '/about-us',
  },
  myReadingPage: {
    path: '/myreading',
    savedBookmarksPage: {
      path: '/myreading/saved',
    },
    browsingHistoryPage: {
      path: '/myreading/history',
    },
  },
  latestPage: {
    path: '/latest/:tagId?',
  },
  errorPage: {
    path: '/error/:errorType',
  },
  memberPage: {
    path: '/account',
    memberDonationPage: {
      path: '/account/donation-history',
    },
    memberEmailSubscriptionPage: {
      path: '/account/email-subscription',
    },
  },
  download: {
    donationHistory: {
      path: '/download/donation-history/:orderNumber',
    },
  },
}
