### Unreleased

### 2.4.2
- Bump @twreporter/react-components version to 1.3.5
- Bump normalizr version to ^3.2.4

### 2.4.1
- Set up different configuration for different environemt [#711](https://github.com/twreporter/twreporter-react/pull/711)
  - `RELEASE_BRANCH` could be `development`, `staging` or `production`
- Code refactor src/containers/Article.js [#711](https://github.com/twreporter/twreporter-react/pull/711)
  - Add src/containers/ArticleTools.js. It will listen to redux store change, and do the corresponding actions.
  - Make [MobileArticleTools|DesktopArticleTools] React.PureComponent, which won't own theirs state, all they need is passed from their Parent component.
- Upgrade to @twreporter/registration@2.0.1 @twreporter/react-components@2.0.3 [#711](https://github.com/twreporter/twreporter-react/pull/711)

### 2.4.0
- [Feature] Registration integration
  - Users can sign in by email or through Google and Facebook OAuth 
  - Users can CRUD bookmarks

### 2.3.0 
- Code refactors[#699](https://github.com/twreporter/twreporter-react/pull/699)
  - Remove webpack-isormorphic-tools
  - Remove bootstrap and inject global styles by styled-components
  - Run transipled js files on production, discard babel-node
  - Upgrade webpack to ^3.0.0 and corresponding dependencies
  - Replace piping by nodemon

### 2.2.10
- Bump @twreporter/react-components version to 1.3.1

### 2.2.9
- Bump @twreporter/react-components version to 1.3.0

### 2.2.8
- Remove Sherryspecial route

### 2.2.7
- Fix topic isFetching Bug

### 2.2.6
- Change LeadingImage defaultImgUrl from tiny to mobile

### 2.2.5
- @twreporter/react-components version number to 1.1.5
- fix sherry-special scroll locking problem

### 2.2.4
- @twreporter/react-components version number to 1.1.4

### 2.2.3
- Add center-small alignment style in src/components/article/BlockAlignmentWrapper.scss.
- Update article to be compatible with dynamic themes
- Create customized article.
- Create zoom in leading image.
- Fix scroll to top problem.
- @twreporter/react-components version number to 1.1.3
- Add TopicLandingPage topic description iframe max-width 100% for youtube player or other embedded items.

### 2.2.2
- Use npm-scope. Update twreporter-react-components to @twreporter/react-components and twreporter-redux to @twreporter/redux [#673](https://github.com/twreporter/twreporter-react/pull/673)
- Bug fix. Follow the docs to render React Router [#673](https://github.com/twreporter/twreporter-react/pull/673)
- Add theme for listing, article and photography, ...etc pages [#673](https://github.com/twreporter/twreporter-react/pull/673)
- Fix Google structure data errors
- Fix Webpack hot loadig problem on dev
- Transform import to require.ensure by babel plugin
- Remove react-hot-loader package since we don't use it at all

### 3.0.0
- Create registration system (RS)
- RS: SignIn, SignUp, Activation...
- Implement bookmark feature
- Mobile Navbar

### 2.2.1
- Update the schema of homepage [#665](https://github.com/twreporter/twreporter-react/pull/665)
- Fix inconsistent line-heights of paragraphs containing annotations [#664](https://github.com/twreporter/twreporter-react/pull/664)
- Code refactors and add DevTools [#661](https://github.com/twreporter/twreporter-react/pull/661)
- Fix index page react proptypes check warning [#661](https://github.com/twreporter/twreporter-react/pull/661)
- Upgrade twreporter-react-components to 1.0.10

### 2.2.0
- Code splitting and dynamic bundle loading by webpack
- Add search by Algolia

### 2.1.20
- Fix isFetching bug in Topics

### 2.1.19
- Add Pagination
- Update Topics and move Topics compositing to react-components
- Update package twreporter-react-components@^1.0.9
- Update package twreporter-redux@^2.1.5:

### 2.1.18
- Show portrait image when mobile with portrait orientation.
- Show portrait thumbnail on Topic listing page
- Add decription for leading image on Article page.

### 2.1.17
- Add paragraph style in Introduction of article page
- Update the image slideshow to let it fit the height of every image
- Change components package to twreporter-react-components
- Category/Tag listing page code refactor and re-design
- Set background color of category section in index page
- Bug fix. Slideshow will switch to the correct one on Android

### 2.1.16
- Upgrade twreporter-react-index-page-components to 1.1.11

### 2.1.15
- Remove no-used initState in header reducer
- Update twreporter-redux
- Update topics: compose data in mapStateToProps instead
- Update topics: fix fetch data requests
- Show news-letter section.

### 2.1.14
- Add topics from twreporter-react-listing-components

### 2.1.13
- Use environent variable to hide news-letter section

### 2.1.12
- Hide news-letter section and its functionality

### 2.1.11
- Upgrade twreporter-react-index-page-components to 1.1.5

### 2.1.10
- Update spinner of homepage and og_image of site
- Bug fix. Reading progress is back

### 2.1.9
- Update src/containers/Home.js. Add news-letter-section

### 2.1.8
- Upgrade twreporter-react-index-page-components and twreporter-react-footer-components

### 2.1.7
- Bug fix. Can not link to /categories/reviews from index page on client side
- Add loading spinner on index page

### 2.1.6
- Update .circleci/config.yml. Separate staging and prod docker build.
- Bug fix. Can not link to /categories/reviews from index page on client side

### 2.1.5
- Update yarn.lock
- Update spinners of Authors and Author
- Fix Links of Author Collections to interactive post
- Replace let with const
- Rename functions and variables for clearness
- Update Category title style

### 2.1.4
- Upgrade twreporter-react-index-page-components to 1.1.0
- Update tool styles, remove raf, and check screen type in Article
- Remove lazyload on photograph articles
- Update ref to callback function
- Replace pure-render-mixin with PureComponent

### 2.1.3
- Bug fix. Fix og:image missing

### 2.1.2
- Upgrade twreporter-redux to 2.1.0

### 2.1.1
- Modification for refactored scroll fadein at Home.js
- Add non-animated background div at Home.js
- Upgrade twreporter-react-index-page-components to 1.0.22
- Remove _sendPageLevelAction when Article unmount
- Prevent fetch full post if is already fetching
- Fix ArticlePlaceholder
- Update twreporter-react-header-components to 1.0.7

### 2.1.0
- [Feature] Add tool bar in Article page

### 2.0.11
- Update dependencies
- Remove old Footer

### 2.0.10
- Bug fix. Open post with interactive style by on another tab of browser.

### 2.0.9
- Update yarn.lock

### 2.0.8
- Upgrade twreporter-react-index-page-components to 1.0.19

### 2.0.7
- Use Footer and Header from twreporter-react-components

### 2.0.6
- Remove scrollmagic when bundling by webpack

### 2.0.5
- Delete package we do not need anymore
- Delete files we do not need anymore

### 2.0.4
- Update categories, including category list ids, category chinese name and category uri.

### 2.0.3
- Fix duplicate react key issue in categories section of index page.
- Provide srcset in image object for each category in category_section.

### 2.0.2
- Upgrade twreporter-react-index-page-components to 1.0.15

### 2.0.1
- add moreURI in different sections(photography and infographic) of index page.
- remove organization JSON-LD

### 2.0.0
- replace actions and reducers by `twreporter-redux` pkg
- remove proxy server. call api server directly
- add entitiesForAuthors field in redux state to store entities of
author and author-articles reducers.
- add process.env.NODE_ENV in dev webpack config
- remove /api folders
- update unit test
- remove bin/api.js

### 1.1.19
- [Update] Update the navigation bar

### 1.1.20
- [Update] Change the homepage banner

### 1.1.19
- [Update] Update the navigation bar

### 1.1.18
- [Update] Update the navigation bar

### 1.1.17
- [Bug] Showing unexpected dotted lines in the annotaion box

### 1.1.16
- Add icon images for apple/andriod mobile device

### 1.1.15
- [Update] Add promotional banners

### 1.1.14
- [Update] Update the navigation bar

### 1.1.13
- [Update] Update the promotion banner and sub navigation

### 1.1.12
- [Update] Add text truncating of small cards and make height fixed
- [Update] Add author title in author pages and heading of articles

### 1.1.11
- [Update] Improve pagespeed by rendering small image at first
- [Update] Update versions of algoliasearch and babel-preset-es2015 in package.json

### 1.1.10
- [Update] Code updates according to pagespeed advice
- [Feature] Add function of setting topics landing page with different themes or bg-color

### 1.1.9
- [Update] Enable timeout for getting data from Redis

### 1.1.8
- [Update] Add AuthorsList link to NavMenu

### 1.1.7
- [Update] Change author name link styling

### 1.1.6
- [Update] Add GA tracking for donation button
- [Update] Move author state formatting from action to reducer
- [Update] Separate authors state into searched authors and all authors
- [Update] Add initial sub-state of articles reducer
- [Testing] Add actions testing of articles, topic, and header
- [Testing] API testing fully completed
- [Testing] Actions testing for article, author-articles and authors
- [Testing] Reducer testing for author-articles, authors
- [Update] Update img url and default img of AuthorsList and Author
- [Bug] Missing slash of author link in articles
- [Update] Add Footer component to Author
- [Update] Add AuthorsList and Author helmet

### 1.1.5
- [Update] content of sub-nav-path
- [Update] move test files from spec to where they belong
- [Update] Update api/api.js. Handle redis connection
- [Update] Show categories on navbar when device is not mobile
- [Add] Add unit test for api actions
- [Update] Update and rename state authors to articlesByAuthor

### 1.1.4
- [Update] Update src/utils/image-processor.js. Add handling for empty or wrong parameter.
- [Update] Given empty string as a fallback for article title.
- [Update] Decrease redis expire time from 1 hour to 5 mins.
- [Feature] Add print icon for friendly printing.
- [Update] Update the way to load bootstrap

### 1.1.3
- [Update] Change link of the animal protection project
- [Bug] Top description cannot be displayed properly if the content brief has been edited

### 1.1.2
- [Bug] Photography page is not displaying any article

### 1.1.1
- [Update] Change promotion banner on index page
- [Update] Update src/components/topic/Topic.scss

### 1.1.0
- [Feature] Author page
- [Feature] Author list page
- [Feature] Agolia for author search
- [Feature] Font size change button
- [Feature] Topic landing page
- [Feature] Long form article page
- [Update] Add redis to improve performance
- [Update] Add mircodata for SEO enhancement
- [Update] Replace forever by pm2
- [Add] Add AdobeTypeKit
- [Add] Add Hotjar tracking code

### 1.0.15
- Show all the articles of the same topic in Popup and related section
- Replace url prefix in the Popup section
- Replace global.__DEVELOPMENT__ by __DEVELOPMENT__
- Hide log on production
- global css styles tuning
- Use lodash to get author image, Add article SEO tag
- Use <a> tag rather than Link of react-router when the style of article is interactive
- fix topic item overflow
- refine top spacing as page switches
- hide read progress bar as page switches
- refine topic text display on header

### 1.0.14
- Replace __DEVELOPMENT__ by global.__DEVELOPMENT__
- Fix the version of bootstrap-loader

### 1.0.13
- set maxwidth for the lazy-loaded images
- Fix OrderedList and UnorderedList component
- Style change for HD Desktop and update BlockAlignmentWrapper.scss
- Add align style on desktop screen
- fix LazyLoad images alignment
- Only one default export allowed per module
- Replace storage link prefix
- fix Photography topic popup
- Add a class to take out unwanted article link hover effects
- Fix publishedDate
- refine css of the navbar
- adjust characters limits of the article header
- fix top margin of the footer
- fix styles of the 'more article' button
- fix the display problem of indicator on the Home slider
- Leave enough padding for header when page changed   

### 1.0.12
- Refine padding and margin of Navbar
- Change letter spacing
- Update link style
- fix ul and ol list alignment
- Add google search page to display the user queried results

### 1.0.11
- Make Embedded align center even if it is too small
- Show the reading progress bar and box shadow for the header of Photography
- Render HTML in ordered and unordered list
- Add dark theme for photography channel
- Use feature articles as fallback when there is no related articles
- Add subtitle and change style of topic name
- Show placeholders when loading articles
- Fix photography list item styling
- Fix content placeholder align

### 1.0.10
- Fix QuoteBy Component style

### 1.0.9
- Show topic title on navbar when scrolled down
- Fix photography NavBar style  
- change the way getting topicId

### 1.0.7
- Show url to fetch in the redux log
- Do not fetch related articles while articleId is not provided
- New line in text inside the QuoteBy component
- Show categories when user scrolls down on desktop
- fix tags listing page alignment problem
- Refine tag listing style, replace footer div with html5 tag
- Add topic title in index page of topic
- Fix bug. ReferenceError occurs on server/views/500.ejs

### 1.0.6
- Add new BlockQuote component, and rename old BlockQuote to QuoteBy
- Add normal and small styles of LeadingImage component

### 1.0.5
- Fix Infogram embedded script bug.
- Change folder name from lib to dist.

### 1.0.4
- Fix bug. Embedded script can not be execute by react@15.3.0

### 1.0.1
- Add file-loader which is a peer dependency of url-loader

### 1.0.0
- initialization
