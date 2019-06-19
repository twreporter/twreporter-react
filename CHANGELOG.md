## Unreleased
### 4.2.0
#### Integration with @twreporter/react-article-components@1.0.0-beta.1
- Render v2 article page if style is article:v2:pink
- Update layout and theme manager to adopt article:v2:pink theme
- Update dependencies: react, react-dom and react-waypoint
- Render v2 article page on `theme` query demand

## Release
### 4.1.9
- Adjust web push notify popup appearance

### 4.1.8
- Set `embeddedCode` component to be printable by default and can be conditionally unprintable

### 4.1.7
- Revise donation page link
- Upgrade @twreporter/react-components to v6.1.2

### 4.1.6
- Update job titles on about-us page

### 4.1.5
- Update about us page
  - Add new members and remove the resigned ones
  - Modify the 3rd, 4th rules in section2
  - Add new records to section5
- Tweak the scrolling protion to make sure the year will be set properly in section5 scrolling timeline on about-us page 

### 4.1.4
- Fix about-us page layout in section4 and section5

### 4.1.3
- Upgrade yarn.lock to fix GitHub security alters

### 4.1.2
#### Style Fix
- Set leading full-screen asset relative for mobile device

### 4.1.1
##### Bug Fix
- Fix the bug of getSignInHref
- Fix topic header external link
- Fix topic arrow position

##### Style Fix
- Set leading full-screen asset absolute for all devices

### 4.1.0
#### Minor Change
##### Bookmark List and Bookmark Widget refactoring
- Server side rendering and code refactoring of BookmarkList and BookmarkWidget

##### Article Full Screen Layout Adjustment
- Update src/managers/layout-manager.js. Render different layout for `article:fullscreen:[normal|dark]` theme
- Update src/containers/Article.js
  - Stop using `post.theme` to  render article layout.
  - Render different article layout according to `post.style`
  - Add `isLeadingAssetFullScreen` and `styles` React Props
- Update src/components/article/layout/title-row-[above|upon].js
- Change prop `theme` to `styles` and do some design tuning
- Update src/components/article/layout/layout-maker.js.
  - Replace `position.title` and `position.header` by `isLeadingAssetFullScreen`
  - Render full screen image with a gray mask
  - Replace `theme` by `styles`

##### Dependencies Upgrade
- redux-thunk to^2.3.0
- @twreporter/universal-header to ^2.0.3

##### Bug Fix
- Empty page rendered while url hash is existed but no such anchor id on DOM

##### Miscellaneous
- Turn off webpack progress display
- Check if service worker registration exists before using it


### 4.0.1
- Remove props `history` from `BrowserRouter`.

### 4.0.0
#### Major change
##### Dependencies Upgrade
- react, react-dom to ^16.3.0
- styled-components to ^4.0.0
- react-router-dom to ^4.0.0
- react-redux to ^6.0.0
- @twreporter/react-components to ^6.1.0
- @twreporter/universal-header to ^2.0.0
- drop @twreporter/registration

##### Introduce new Authentication/Authorization API
- check/grant auth on server side through express auth middleware
- store auth info into redux store
- enable server side rendering for personal requests

##### Render Universal Header with @twreporter/universal-header
- universal header for personal requests with server side rendering

##### Render react-router-dom v4 routes on server side with react-loadable
- add `src/data-loaders` folder, which lists data loading functions for different pages.
- implement react-loadabel server side rendering since react-router-dom v4 doesn't support
`getComponent` callback function anymore.

##### Introduce layout and theme manager to render page layout and theme
- deal with page layout and theme in `src/containers/app-shell.js`
- drop HOC layout helper(`src/helpers/with-layout.js`)

##### Miscellaneous
- Move category related constants into src/constants/category.js
- Update src/containers/app-shell.js. Refactor web push registration promise chain

### 3.2.13
- [Bug] Add a workaround to author data problem

### 3.2.12
- [Bug] Fix about-us page opening layout which got wrong height (100 viewport height) when client width is smaller than desktop and larger than tablet breakpoint
- Update member information (add a new member) in about-us page section2
 
### 3.2.11
- [Bug] Centerize images in teamDescription (topicLandingPage)

### 3.2.10
- Tweak TopicLandingPage container due to api changes (remove plain html) 

### 3.2.9
- Update the internal of showing web push confirmation check box from one day to one month.

### 3.2.8
- Slide down anchor panel layout change in about-us page
- Update information and photos in about-us page

### 3.2.5
- [Bug] Use og_title to build `og:title` by default

### 3.2.4
- Handle hash link scroll. When url contains hash link like #section_1, browser will
scroll to that anchor(id) properly.
- fix(UI) position of annotation indicator on FireFox.

### 3.2.3
- Add url to event label in google analysis click event
- Update @twreporter/react-components@5.1.3

### 3.2.2
- Update the ground truth screenshots for UI-tests
- Add GA events to donation button in article pages
- Update @twreporter/react-components@^5.1.1

### 3.2.1
- Long form article side bar UI changes

### 3.2.0 
- update styled-components@^3.0.0 
- update @twreporter/registration@3.0.0 which contains styled-components@^3.0.0
- update @twreporter/react-components@5.0.0 which contains styled-components@^3.0.0
- Render instructions instead of error 500 page if an error is catched by ErrorBoundary

### 3.1.15
- add /BingSiteAuth.xml for bing search engine.

### 3.1.14
- Fix scroll lock bug on android and remove extra border of topic

### 3.1.13
- Fix leadingimage height in article

### 3.1.12
- Change member photo and modify line height of introduction words in about-us page section2
- Update @twreporter/react-components to 4.1.4

### 3.1.11
- Change the order of member list in about-us page

### 3.1.10
- [Bug] Fix the wrong layout of section2 on small mobile devices in about-us page

### 3.1.9
- Change the order of members in about-us page

### 3.1.8
- Update a member picture in about-us page

### 3.1.7
- Update information in about-us page

### 3.1.6
- [Bug] Fix the wrong sidebar waypoint position on homepage

### 3.1.5
- [Bug] Fix bug which causes error when clicking logo on the header of about-us page
- Changes the order of departments in section2 of about-us page

### 3.1.4
- Modify data of section5 in about-us page

### 3.1.3
- Upgrade `@twreporter/react-components` to 4.1.3 to fix a bug which causes unexpected scrolling block in article pages

### 3.1.2
- Upgrade `@twreporter/react-components` to 4.1.2
- [Bug] Fix background color of footer in article pages and remove static file path from props of Footer component

### 3.1.1
- Upgrade `@twreporter/react-components` to 4.1.1
- Move static files of footer to gcs 

### 3.1.0
- Rename author related actions properties and add fetch-author-details
- Debug: chrome devtools on Mac
- Add new footer to our website
- Add donation box to article pages
- Upgrade `@twreporter/react-components` to 4.1.0
- Add donation box section to homepage

### 3.0.14
- [Bug] Prevent from changing original data object in section2 on about-us page

### 3.0.13
- Change media query breakpoint of overDesktop on about-us page
- Refine the `Navigation` component to be reused by others on about-us page
- In section5 timeline component, update the transitionY attribute directly instead of setState on about-us page
- Remove device constants in section2 on about-us page
- [Bug] Fix pagination bug in section3 on about-us page
- Section5 waypoint trigger point tunning on about-us page
- Fix section2 on about-us page for small devices (e.g. iphone5)
- Move out Border component of each section for one time declaration on about-us page
- Setting inital width for logo blocks in section4 on about-us page
- Add new member to section2 on about-us page

### 3.0.12
- Bump the versions of `mocha`, `node-sass`, `nodemon`, and `sass-loader` to prevent vulnerabilities
- remove unused gulp and package-lock.json
- Change leading video and topic to styled-components
- Refactor the structure of topic page
- Fix that Banner height not fits with viewport height
- Update React-Loadable and EmbeddedCode
- Bump `eslint` to "4.x", `babel-eslint` to "8"
- Fix babel plugin order causing ssr error and modify .babelrc to make it more readible

### 3.0.11
- fix(ui print): workaround to fix image overlaying on text while printing

### 3.0.10
- [Bug] Adjust window height of pop-up-panel dynamically on about-us page
- [Bug] Fix the wrong positioned logo in section4 on about-us page

### 3.0.9
- Prevent window from scrolling when an overlay modal opens up on about-us page
- Add a new member to section2 on about-us page
- Setting the height of opening section to auto instead of height: 100vh

### 3.0.8
- [Bug] Fixed some bugs of section5 on about-us page
- Add meta-data to about-us page
- [Bug] Prevent body from scrolling when a fullscreen modal is opened on about-us page
- [Bug] Add onResize eventListener to section2 on about-us page
- [Bug] Section5 trigger point tunning on about-us page

### 3.0.7
- Update config.yml. Use file to store local env variables
- Update config.yml. Parse currentMasterVersion instead
- Upgrade `@twreporter/react-components` to 4.0.11

### 3.0.6
- About-us page tunning
- Fix circleci build failing. Install the corresponding kubectl pkg
- Update README.md. Add PWA in #Contains

### 3.0.5
- Add about-us page

### 3.0.4
- Restore web push subscription service.

### 3.0.3
- Temporarily stop web push subscription service. 

### 3.0.2
- Improve the service worker boilerplate. Update src/client.js 
- [Bug] Fix venngage infographic vendor not rendering iframe
- Forces the waiting service worker to become the active service worker

### 3.0.1
- [HotFix] Update src/containers/App.js. Fix typo.

### 3.0.0
#### Features
**Progressive Web App(PWA) Implementation** <br/>
- [x] Connectivity independent - work offline or on low-quality networks
- [x] Installable - Allows users to add apps they find most useful to their home screen without the hassle of an app store.
- [x] Re-engageable - Makes re-engagement easy through features like push notifications.

Generate service worker file by template(service-worker/service-worker.tmpl), and generated file is hosted on `/sw.js` by express server.<br/>
The generated service worker file will do the following things:
1) Cache static files, such as webpack bundles, while installing service worker.
2) Delete old cache while activating service worker. Every time the webpack-assets.json changes, the service worker will delete old cached webpack bundles.
3) Intercept the fetch event listener. Service worker will cache the HTTP responses it needs and return HTTP cached response if needed. 
4) Handle web push notification and the corresponding behaviors after clicking the notification.

Update `src/clients`, which is the entry of webpack bundles.
Register service worker at first, and subscribe the web push if the browser could.

#### Patches

### 2.7.8
- Update @twreporter/react-components from 4.0.9 to 4.0.10

### 2.7.7
- Update @twreporter/react-components from 4.0.7 to 4.0.9

### 2.7.6
- Introduces screenshot testing only before commiting files.
- Adds some space between channel bar and title in article page on tablet.
- [Bug] Removes the test of checking if groundtruth and screenshot images have same height.
- Update @twreporter/react-components from 4.0.5 to 4.0.7

### 2.7.5
- Use Makefile to replace npm scripts
- RELEASE_BRACH variable re-define. Its value could be master, staging, release and preview.
- Adopt `localforage` which is a fast and simple storage library for JavaScript.<br/>
localForage improves the offline experience of your web app by using asynchronous storage (IndexedDB or WebSQL) with a simple, localStorage-like API.

### 2.7.4
- Update embedded component to pack dataset before adding it to element.attributes
- Create a mock go-api server to serve mock data in development environment by running npm script `npm run start-testing-server`. 

### 2.7.3
- [Bug] Fix sidebar bug: the last paragraph in the post with longform style disapears

### 2.7.2
- [Bug] Author page and author list page have abnormal behavior after using localStorage data.
- [Bug] Fix selection color typo in injectGlobal css
- Update @twreporter/react-components package version from 4.0.4 to 4.0.5 
- Add `srcSet` and `sizes` to `img-wrapper.js` so that images of different sizes on index-page will be rendered on resolution demand.
- Replace url prefix of images resources in production state

### 2.7.1
#### Bugs Fixed
- Bookmarks listing page can not show bookmarks

### 2.7.0
#### Minor Change
Performance Enhancement 
Store redux state in the window.localStorage. 
If the redux state is fresh and populated,
the copy in the localStorage will be used instead, 
Hence, the AJAX won't be sent to the API server.

Easy to Develop
Replace `localhost` by `dev-go-api.twreporter.org` API server.
In the future, the developer won't need to build the API web service.

#### Patches
- Avoid `setState` on unmounted or mounting components while rendering the Image or FullScreenImage component
- Bind changeFontSize function to Article container instance.
 
### 2.6.3
**Update @twreporter/react-components**
Update @twreporter/react-components package version from 4.0.1 to 4.0.3.

### 2.6.2
#### Refactoring
**Reduce Bundle Size**:

Adopt `react-loadable` pkg, which can split codes into different webpack bundles.

**Responsive Image and Resolution Switching**

Use `srcset` and `sizes` attribute of `<img>` tag to render images on different device resolution and media query.

**Progressive Image**

Make `src/components/article/HeroImage.js` and `src/components/shared/FullScreenImage.js` progressive rendering.

**Render Custom Theme of Article Page**

Move those rendering bussiness logics in `src/containers/Article.js` into `src/components/article/layout/layout-maker.js`.
Hence, `src/containers/Article.js` and `src/helpers/with-layout.js`, which renders the whole page including header, body and footer, will be clean and fit.

**Utilities Refactoring**

Decentralize the utilities functions, move related functions into the same file, and delete `src/utilites/index.js`

**Constants Refactoring**

Clean the constants variables.
In the Future, only those constant variables which are used by different files could be specified in `src/constants/*.js`

#### Patches
- Decrease BlockQuote font-size to 20px
- Add webpack chunk name for dynamic imported modules
- Fix style tag over-wrapping inside head of html
- Remove react-lazyload and tiny image is enough for BottomRelateds
- Polyfill for require.ensure on server side rendering
- Inject global css on both client and server side

### 2.6.1
#### Features
- Longform article with side bar

#### Patches
- Remove `mobile-detect` pkg since it is big
  - update the corresponding components
  - remove pass device through react context
  - remove corresponding files we do not need
  - replace sass by `styled-components`
- Upgrade @twreporter/react-components to 4.0.0
- DesktopArticleTools style change
- Render ArticleTools gracefully without overlaying leading image

### 2.6.0
#### Minor Change
- Update @twreporter/react-components from 2.1.12 to 3.0.1
- Update @twreporter/registration from 2.1.5 to 2.2.1
- Update @twreporter/redux from 3.0.0 to 4.0.2
For being compatiable with the above dependencies updates.
Do the following things:
1. @twreporter/redux which drop bookmarks related stuffs
2. Import bookmarks related statement (mainly redux actions/reducers) from @twreporter/registration
3. Move Functional Bookmark Icons (add/Remove) back to @twreporter/registration
4. Import bookmark frame from @twreporter/registration rather than react-components
5. Create widget service provider from @twreporter/registration
6. Move auth process from client.js to App.js (server/client side redux store render conflict)

#### Features
- Enable pagination on tag/category listing page
- Show License at the end of posts 
- Standalone widgets for signin/signout and bookmark, endpoints are
  - /widgets-services
  - /widgets-bookmark-desktop
  - /widgets-bookmark-mobile

#### Patches
- Update HeadingAuthor.js. Move extendByLine to the front if it starts with `文 `
- Add more padding on Topic listing page
- Refactor (Desktop|Mobile)ArticleTools 
  - stop re-mount widget, which will re-send requests to check if the
  post is bookmarked
  - remove css-transition-group by simply using CSS visibility and opacity
  - replace sass by `styled-components`

### 2.5.6
- [Bug] fix image too big problem

### 2.5.5
- Remove deprecated modules 
- Refine font-weight settings
- Bump @twreporter/react-components version to 2.1.12

### 2.5.4
- [Bug] fix print image abnormally
- Style change
  - share/print button -> cursor: pointer
  - remove a tag link underline animation

### 2.5.3
- Fix [author list page](https://www.twreporter.org/authors) style
  - search box icon 
  - default author image 

### 2.5.2
- Bump @twreporter/react-components version to 2.1.11
    - which fixes the header wrong style bug
    - which imports PropTypes from 'prop-types' directly, not uses React.PropTypes

### 2.5.1
- Use inline react svg, stop using data uri
- Optimize svg files.
- [Bub] Fix Audio component, which display abnormally
- Update donation link href
- Bump @twreporter-react-components version to 2.1.9

### 2.5.0
- Update to react@^16
- Update to @twreporter/react-components@2.1.7
- Minimize css files on production

### 2.4.8
- @twreporter/react-components@2.1.4

### 2.4.7
- [Bug fix] avoid to set response header Cache-Control=public,max-age=300 in certain endpoints like /bookmarks, /activate

### 2.4.6
- Scroll to the target section on homepage if section parameter is existed
- Use @twreporter/react-components@2.1.3

### 2.4.5
- Use @twreporter/registration@2.1.5 and @twreporter/react-components@2.1.1
- Visualize the webpack bundles by webpack-bundle-analyzer in development mode
- Reduce bundle size by only importing the modules we need

### 2.4.4
- Set Cache-Control: no-store in those endpoints related to users, such as /activate and /bookmarks.
- Fix css class missing bug
- Add css minimize
- Turn off css source map with webpack in production
- Bump twreporter-react-component version to 2.0.6
- npm run start will start the server by pm2
- Fix `babel-plugin-css-modules-transform` transpiling failed problems

### 2.4.3
- Remove unused Layout in components
- Apply code refactor to `withLayout`
- Fix nesting and re-assigned variable in scss of `FontChangeButton.scss`
- Replace functional component with class in `ArticleMeta`
- Add `babel-plugin-styled-components`
- Update global styles
- Fix photography article list page styles and code refactor
- Fix photography channel font color
- Only invoke `getWrappedInstance` if the element exists
- Fix placeholder styles error
- Fix duplicated imports
- Upgrade react-router to ^3.0.0
- Upgrade @twreporter/registration to ^2.0.2

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
