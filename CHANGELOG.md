# Changelog

## 4.6.12 (Current), 2021-07-12

### Notable Changes

- fix
  - migrate ga to gtm ([#1898](https://github.com/twreporter/twreporter-react/pulls/1898))

### Commits

- [[`60ae3fc174`](https://github.com/twreporter/twreporter-react/commit/60ae3fc174)] - fix(search-box): give input a specific width to avoid bug in firefox (#1898) (Leo)

## 4.6.11, 2021-06-22

### Notable Changes

- refactor
  - migrate ga to gtm ([#1872](https://github.com/twreporter/twreporter-react/pulls/1872))
  - remove the default email of authors([#1876](https://github.com/twreporter/twreporter-react/pull/1876))
  - remove utm on the website ([#1890](https://github.com/twreporter/twreporter-react/pull/1890))

- feat
  - manually send gtm.load event for SPA([#1878](https://github.com/twreporter/twreporter-react/pull/1878), [#1882](https://github.com/twreporter/twreporter-react/pull/1882))

### Commits

- [[`f6a10b6cfd`](https://github.com/twreporter/twreporter-react/commit/f6a10b6cfd)] - **refactor**: remove utm parameters (Ching-Yang, Tseng)
- [[`9b0dfc2952`](https://github.com/twreporter/twreporter-react/commit/9b0dfc2952)] - **chore**: upgrade npm packages (Ching-Yang, Tseng)
- [[`3f4c29505d`](https://github.com/twreporter/twreporter-react/commit/3f4c29505d)] - **fix**: send gtm.load event when the conte
  nt is ready (Ching-Yang, Tseng)
- [[`3966012ef5`](https://github.com/twreporter/twreporter-react/commit/3966012ef5)] - **feat**: manually send gtm.load event for SPA (Ching-Yang, Tseng)
- [[`53ee560b90`](https://github.com/twreporter/twreporter-react/commit/53ee560b90)] - **refactor**: remove the default email of authors (Ching-Yang, Tseng)
- [[`eedafc4a71`](https://github.com/twreporter/twreporter-react/commit/eedafc4a71)] - **refactor**: migrate ga to gtm (Ching-Yang, Tseng)
- [[`18374b4cee`](https://github.com/twreporter/twreporter-react/commit/18374b4cee)] - **refactor**: remove unused ga.js (Ching-Yang, Tseng)

## 4.6.10, 2021-05-28

### Notable Changes

- fix
  - prevent sidebar from overlapping footer (#1850)
  - fix slideshow effect for mobile devices on index page (#1865)

### Commits

- [[`9e84bb3efe`](https://github.com/twreporter/twreporter-react/commit/9e84bb3efe)] - **fix**: fix slideshow effect for mobile devices on index page (#1865) (Tai-Jiun Fang)
- [[`95331ff463`](https://github.com/twreporter/twreporter-react/commit/95331ff463)] - **chore**: downgrade version to v4.6.10-rc.1 (Taylor Fang)
- [[`7714f484f1`](https://github.com/twreporter/twreporter-react/commit/7714f484f1)] - chore(release): bump version to v4.6.10 (Taylor Fang)
- [[`639b4817d7`](https://github.com/twreporter/twreporter-react/commit/639b4817d7)] - **chore**: bump version to v4.6.10-rc.0 (Taylor Fang)
- [[`99b2767218`](https://github.com/twreporter/twreporter-react/commit/99b2767218)] - fix(homepage): prevent sidebar from overlapping footer (#1850) (CHC)

## 4.6.9, 2021-05-13

### Notable Changes

- chore
  - upgrade twreporter npm packages
- refactor
  - update anchors configuration for index page and about us page
- docs
  - add release test items to perform test manually after a release

### Commits

- [[`eddc2a0c31`](https://github.com/twreporter/twreporter-react/commit/eddc2a0c31)] - chore(release): upgrade npm packages (#1855) (Tai-Jiun Fang)

* [[`643114670f`](https://github.com/twreporter/twreporter-react/commit/643114670f)] - **chore**: upgrade npm packages (#1852) (Tai-Jiun Fang)
* [[`ac33b730f0`](https://github.com/twreporter/twreporter-react/commit/ac33b730f0)] - **refactor**: anchors configuration (#1847) (Tai-Jiun Fang)
* [[`da3969b4d7`](https://github.com/twreporter/twreporter-react/commit/da3969b4d7)] - **docs**: add release-test-items (#1839) (Tai-Jiun Fang)

## 4.6.8, 2021-04-29

### Notable Changes

- refactor
  - update section 2 markup for about-us page

### Commits

- [[`a75312a3f2`](https://github.com/twreporter/twreporter-react/commit/a75312a3f2)] - **refactor**: update about-us section 2 markup (#1840) (Tai-Jiun Fang)

## 4.6.7, 2021-04-29

### Notable Changes

- fix
  - count the pageviews with pathname + query parameters

### Commits

- [[`f77fc1c4`](https://github.com/twreporter/twreporter-react/commit/f77fc1c4aae9be0059ebbc2b763f9da18e9e3ffb)] - fix: count the pageviews with pathname + query parameters(Ching-Yang, Tseng)
- [[`fd69436f`](https://github.com/twreporter/twreporter-react/commit/fd69436ff6023b7fa16a0187383b38be3b15dc1c)] - fix: utilize `window.location.href` when sending pageview(Ching-Yang, Tseng)

## 4.6.6, 2021-04-19

### Notable Changes

- fix
  - utilize `window.location.href` as the path for GA
- chore
  - upgrade deps
    - @twreporter/index-page@1.2.3
    - @twreporter/react-article-components@1.3.0
    - @twreporter/react-components@8.4.2
    - @twreporter/redux@7.2.0

### Commits

- [[`daf726e8a7`](https://github.com/twreporter/twreporter-react/commit/daf726e8a7)] - **chore**: bump version to v4.6.6 (Taylor Fang)
- [[`bb715e77b1`](https://github.com/twreporter/twreporter-react/commit/bb715e77b1)] - **chore**: update dependencies (#1826) (Tai-Jiun Fang)
- [[`601c438899`](https://github.com/twreporter/twreporter-react/commit/601c438899)] - Merge pull request #1824 from taylrj/master (Tai-Jiun Fang)
- [[`db7d9a5836`](https://github.com/twreporter/twreporter-react/commit/db7d9a5836)] - **chore**: bump version to v4.6.6-rc.0 (Taylor Fang)
- [[`ed07491a0c`](https://github.com/twreporter/twreporter-react/commit/ed07491a0c)] - **chore**: update dependencies (#1823) (Tai-Jiun Fang)
- [[`8036ce412e`](https://github.com/twreporter/twreporter-react/commit/8036ce412e)] - **fix**: utilize `window.location.href` as the path for GA (#1822) (Tai-Jiun Fang)
- [[`c17f711c9f`](https://github.com/twreporter/twreporter-react/commit/c17f711c9f)] - Merge pull request #1819 from taylrj/master (Tai-Jiun Fang)

## 4.6.5

### Notable Changes

- chore
  - upgrade deps
    - @twreporter/index-page@1.2.2
    - @twreporter/react-article-components@1.2.15
    - @twreporter/react-components@8.4.1
    - @twreporter/redux@7.1.0
- refactor
  - refactor: tweak data path for author page according to @twreporter/redux updates

### Commits

- [[`23199c4868`](https://github.com/twreporter/twreporter-react/commit/23199c4868)] - **chore**: bump version to v4.6.5 (Taylor Fang)
- [[`bc8dd60919`](https://github.com/twreporter/twreporter-react/commit/bc8dd60919)] - **chore**: upgrade deps (#1817) (Tai-Jiun Fang)
- [[`d4fb2af145`](https://github.com/twreporter/twreporter-react/commit/d4fb2af145)] - **chore**: bump version to v4.6.5-rc.1 (Taylor Fang)
- [[`467f7c30c7`](https://github.com/twreporter/twreporter-react/commit/467f7c30c7)] - Merge pull request #1792 from taylrj/all-author-articles (Tai-Jiun Fang)
- [[`7069f29273`](https://github.com/twreporter/twreporter-react/commit/7069f29273)] - Merge pull request #1793 from taylrj/author-v2 (Tai-Jiun Fang)
- [[`26e680dd52`](https://github.com/twreporter/twreporter-react/commit/26e680dd52)] - **chore**: bump version to v4.6.5-rc.0 (Taylor Fang)
- [[`99b3f43561`](https://github.com/twreporter/twreporter-react/commit/99b3f43561)] - **chore**: upgrade deps (#1812) (Tai-Jiun Fang)

## 4.6.4, 2021-03-30

### Notable Changes

- fix
  - add `leading_image_portrait` field for clone utility function

### Commits

- [[`727c8447e8`](https://github.com/twreporter/twreporter-react/commit/727c8447e8)] - **fix**: add `leading\_image\_portrait` field for clone utility function (#1804) (Tai-Jiun Fang)

## 4.6.3, 2021-02-25

### Notable Changes

- chore: upgrade dep
  - @twreporter/react-article-components@1.2.14

### Commits

- [[`4443663f70`](https://github.com/twreporter/twreporter-react/commit/4443663f70)] - **chore**: upgrade @twreporter/react-article-components to v1.2.14 (#1799) (Tai-Jiun Fang)

## 4.6.2

### Notable Changes

- refactor: update section2 of about-us page

### Commits

- [[`35b1cd51d2`](https://github.com/twreporter/twreporter-react/commit/35b1cd51d2)] - refactor(about-us): update headcount per page constant for section2 (#1794) (Tai-Jiun Fang)

## 4.6.1, 2021-02-02

### Notable Changes

- chore: upgrade deps as follows
  - @twreporter/index-page@1.2.1
  - @twreporter/react-article-components@1.2.13
  - @twreporter/react-components@8.4.0

### Commits

- [[`77eb099cbb`](https://github.com/twreporter/twreporter-react/commit/77eb099cbb)] - **chore**: update dep (#1786) (Tai-Jiun Fang)
- [[`fe8b2d2544`](https://github.com/twreporter/twreporter-react/commit/fe8b2d2544)] - **chore**: bump version to v4.6.1-rc.0 (Taylor Fang)

* [[`9a2b3219fa`](https://github.com/twreporter/twreporter-react/commit/9a2b3219fa)] - **chore**: update deps (#1783) (Tai-Jiun Fang)

## 4.6.0, 2021-01-20

### Notable Changes

- feat
  - add podcast box section to homepage
- chore: upgrade deps as follows
  - @twreporter/index-page@^1.2.0
  - @twreporter/react-article-components@^1.2.12
  - @twreporter/react-components@^8.3.9

### Commits

- [[`81c0628c52`](https://github.com/twreporter/twreporter-react/commit/81c0628c52)] - **chore**: upgrade deps (Taylor Fang)
- [[`9b8744ace1`](https://github.com/twreporter/twreporter-react/commit/9b8744ace1)] - **chore**: bump version to v4.6.0-rc.0 (Taylor Fang)

* [[`b4f1c6742f`](https://github.com/twreporter/twreporter-react/commit/b4f1c6742f)] - **chore**: upgrade deps (Taylor Fang)
* [[`8decbf26aa`](https://github.com/twreporter/twreporter-react/commit/8decbf26aa)] - **feat**: add podcast box section to homepage (Taylor Fang)

## 4.5.16, 2021-01-13

### Notable Changes

- feat
  - use `og_image` as image fallback for topic landing page
- chore: upgrade deps as follows
  - @twreporter/react-article-components@1.2.11
  - @twreporter/react-components@8.3.8

### Commits

- [[`9a8647c641`](https://github.com/twreporter/twreporter-react/commit/9a8647c641)] - **feat**: use `og\_image` as image fallback for topic landing page (#1727) (Tai-Jiun Fang)
- [[`a7f0d2783e`](https://github.com/twreporter/twreporter-react/commit/a7f0d2783e)] - **chore**: upgrade deps (Taylor Fang)

## 4.5.15, 2020-12-03

### Notable Changes

- chore: fix kustomize installation path
- fix: update html.js with right rss feed

### Commits

- [[`856bb7a228`](https://github.com/twreporter/twreporter-react/commit/856bb7a228)] - Merge pull request #1760 from typebrook/rss (Tai-Jiun Fang)
- [[`6f6a63c7b7`](https://github.com/twreporter/twreporter-react/commit/6f6a63c7b7)] - Update html.js with right rss feed (Hsieh Chin Fan)
- [[`5ead1112c3`](https://github.com/twreporter/twreporter-react/commit/5ead1112c3)] - Merge pull request #1759 from babygoat/update-kustomize-installation (babygoat)
- [[`ea38edf658`](https://github.com/twreporter/twreporter-react/commit/ea38edf658)] - **chore**: fix kustomize installation path (Ching-Yang, Tseng)
- [[`17d0c3274a`](https://github.com/twreporter/twreporter-react/commit/17d0c3274a)] - Merge pull request #1756 from babygoat/update-kustomize-installation (babygoat)

## 4.5.14, 2020-11-13

### Notable Changes

- [chore: add @twreporter/redux@^7.0.5](https://github.com/twreporter/twreporter-react/pull/1754)

### Commits

- [[`5ff9faa366`](https://github.com/twreporter/twreporter-react/commit/5ff9faa366)] - Merge pull request #1754 from nickhsine/master (nick)
- [[`91c427c888`](https://github.com/twreporter/twreporter-react/commit/91c427c888)] - **chore**: add @twreporter/redux@^7.0.5 (nickhsine)
- [[`f0f112872e`](https://github.com/twreporter/twreporter-react/commit/f0f112872e)] - Merge pull request #1752 from nickhsine/master (nick)

## 4.5.13, 2020-11-12

### Notable Changes

- [refactor: update express server error handling](https://github.com/twreporter/twreporter-react/pull/1744)
- [chore: add @twreporter/redux@^7.0.4](https://github.com/twreporter/twreporter-react/pull/1748)

### Commits

- [[`61d3a048da`](https://github.com/twreporter/twreporter-react/commit/61d3a048da)] - **chore**: update package.json#version to 4.5.13 (nickhsine)
- [[`5fe9c50564`](https://github.com/twreporter/twreporter-react/commit/5fe9c50564)] - Merge pull request #1748 from nickhsine/master (nick)
- [[`e91be09dfb`](https://github.com/twreporter/twreporter-react/commit/e91be09dfb)] - **chore**: add @twreporter/redux@^7.0.4 (nickhsine)
- [[`706951d9a8`](https://github.com/twreporter/twreporter-react/commit/706951d9a8)] - Merge pull request #1744 from nickhsine/refactor-error-handling (nick)
- [[`a512875fa6`](https://github.com/twreporter/twreporter-react/commit/a512875fa6)] - **refactor**: update express server error handling (nickhsine)
- [[`60881fd86c`](https://github.com/twreporter/twreporter-react/commit/60881fd86c)] - Merge pull request #1745 from nickhsine/master (nick)

## 4.5.12, 2020-10-28

### Notable Changes

- [fix: handle author page 404 error](https://github.com/twreporter/twreporter-react/pull/1743)

### Commits

- [[`ba27a4200a`](https://github.com/twreporter/twreporter-react/commit/ba27a4200a)] - chore: update CHANGELOG.md and package.json#version for 4.5.12
- [[`4db53d63a7`](https://github.com/twreporter/twreporter-react/commit/4db53d63a7)] - Merge pull request #1743 from nickhsine/author-details-404 (nick)
- [[`d3a0a72bc2`](https://github.com/twreporter/twreporter-react/commit/d3a0a72bc2)] - **fix**: handle author page 404 error (nickhsine)
- [[`82b8b779a9`](https://github.com/twreporter/twreporter-react/commit/82b8b779a9)] - Merge pull request #1740 from nickhsine/master (nick)

## 4.5.11, 2020-10-21

### Notable Changes

- [fix: handle other errors except for 404 and 500 errors](https://github.com/twreporter/twreporter-react/pull/1739)
- [fix: handle catId not existed. return 404 not found res](https://github.com/twreporter/twreporter-react/pull/1738)

### Commits

- [[`fec0c50341`](https://github.com/twreporter/twreporter-react/commit/fec0c50341)] - Merge pull request #1739 from nickhsine/express-custom-error (nick)
- [[`2c3d4f2b28`](https://github.com/twreporter/twreporter-react/commit/2c3d4f2b28)] - **fix**: handle other errors except for 404 and 500 errors (nickhsine)
- [[`2740c0eeec`](https://github.com/twreporter/twreporter-react/commit/2740c0eeec)] - Merge pull request #1738 from nickhsine/master (nick)
- [[`8e1b78ac49`](https://github.com/twreporter/twreporter-react/commit/8e1b78ac49)] - **fix**: handle catId not existed. return 404 not found res (nickhsine)
- [[`acacf6e18d`](https://github.com/twreporter/twreporter-react/commit/acacf6e18d)] - Merge pull request #1735 from nickhsine/master (nick)

## 4.5.10, 2020-10-12

### Commits

- [[`f58dd26600`](https://github.com/twreporter/twreporter-react/commit/f58dd26600)] - **chore**: upgrade dependency (nickhsine)
- [[`1ee8ff96c2`](https://github.com/twreporter/twreporter-react/commit/1ee8ff96c2)] - Merge pull request #1732 from taylrj/master (Tai-Jiun Fang)

## 4.5.9, 2020-10-08

### Notable Changes

- chore: upgrade @twreporter npm deps
  - @twreporter/index-page@1.1.0
  - @twreporter/react-article-components@1.2.6
  - @twreporter/react-components@8.3.4
  - @twreporter/redux@7.0.2

### Commits

- [[`af85eaa47b`](https://github.com/twreporter/twreporter-react/commit/af85eaa47b)] - Merge pull request #1730 from taylrj/master (Tai-Jiun Fang)
- [[`0f7effdf29`](https://github.com/twreporter/twreporter-react/commit/0f7effdf29)] - **chore**: bump version to v4.5.9-rc.1 (Taylor Fang)
- [[`a5e4514520`](https://github.com/twreporter/twreporter-react/commit/a5e4514520)] - **chore**: update @twreporter deps (Taylor Fang)
- [[`525f411bdb`](https://github.com/twreporter/twreporter-react/commit/525f411bdb)] - Merge pull request #1728 from taylrj/master (Tai-Jiun Fang)
- [[`7c2ea8d92c`](https://github.com/twreporter/twreporter-react/commit/7c2ea8d92c)] - **chore**: bump version to v4.5.9-rc.0 (Taylor Fang)
- [[`28725a74e5`](https://github.com/twreporter/twreporter-react/commit/28725a74e5)] - chore(index-page): update dep @twreporter/index-page@1.1.0-rc.0 (Taylor Fang)

## 4.5.8, 2020-09-14

### Notable Changes

- [refactor: do not cache response for preview branch and update service worker runtime cache pattern](https://github.com/twreporter/twreporter-react/pull/1718)
- [fix: render stale data due to wrong memoize function](https://github.com/twreporter/twreporter-react/pull/1722)

### Commits

- [[`a675643c5c`](https://github.com/twreporter/twreporter-react/commit/a675643c5c)] - Merge pull request #1722 from nickhsine/fix-stale-data (nick)
- [[`82d6f3815b`](https://github.com/twreporter/twreporter-react/commit/82d6f3815b)] - **chore**: yarn add @twreporter/redux@7.0.2-rc.0 (nickhsine)
- [[`080991b497`](https://github.com/twreporter/twreporter-react/commit/080991b497)] - **fix**: render stale data due to wrong memoize function (nickhsine)
- [[`979eac8ac9`](https://github.com/twreporter/twreporter-react/commit/979eac8ac9)] - Merge pull request #1719 from nickhsine/master (nick)
- [[`c35e6ea575`](https://github.com/twreporter/twreporter-react/commit/c35e6ea575)] - **chore**: bump version to 4.5.8 (nickhsine)
- [[`2c9a88a1d4`](https://github.com/twreporter/twreporter-react/commit/2c9a88a1d4)] - Merge pull request #1718 from nickhsine/master (nick)
- [[`df12550d33`](https://github.com/twreporter/twreporter-react/commit/df12550d33)] - **refactor**: use statusCodeConst (nickhsine)
- [[`0f8242fcba`](https://github.com/twreporter/twreporter-react/commit/0f8242fcba)] - **refactor**: update service-worker-generator.js (nickhsine)
- [[`83b397f5c0`](https://github.com/twreporter/twreporter-react/commit/83b397f5c0)] - **refactor**: do not cache response for preview branch (nickhsine)
- [[`ce93f03162`](https://github.com/twreporter/twreporter-react/commit/ce93f03162)] - Merge pull request #1715 from nickhsine/master (nick)

## 4.5.7, 2020-09-14

### Commits

- [[`cb477f0cb9`](https://github.com/twreporter/twreporter-react/commit/cb477f0cb9)] - **chore**: yarn-deduplicate (nickhsine)
- [[`74ecec39e9`](https://github.com/twreporter/twreporter-react/commit/74ecec39e9)] - **chore**: yarn add @twreporter/redux@^7.0.1 (nickhsine)
- [[`b9ce372853`](https://github.com/twreporter/twreporter-react/commit/b9ce372853)] - Merge pull request #1710 from nickhsine/master (nick)

## 4.5.6, 2020-09-10

### Commits

- [[`ef20ef1ea9`](https://github.com/twreporter/twreporter-react/commit/ef20ef1ea9)] - **chore**: yarn add @twreporter/core@^1.2.1 (nickhsine)
- [[`c271439b9e`](https://github.com/twreporter/twreporter-react/commit/c271439b9e)] - Merge pull request #1706 from taylrj/master (Tai-Jiun Fang)

## 4.5.5, 2020-09-08

### Notable Changes

- chore: upgrade @twreporter/react-article-components@1.2.3

### Commits

- [[`0eb4d87afa`](https://github.com/twreporter/twreporter-react/commit/0eb4d87afa)] - **chore**: upgrade @twreporter/react-article-components@1.2.3 (Taylor Fang)
- [[`e07a3983c0`](https://github.com/twreporter/twreporter-react/commit/e07a3983c0)] - **chore**: upgrade @twreporter/react-article-components@1.2.3-rc.0 (Taylor Fang)

## 4.5.4

### Commits

- [[`b34dcf8473`](https://github.com/twreporter/twreporter-react/commit/b34dcf8473)] - **chore**: update dependencies (nickhsine)
- [[`93a5fe0297`](https://github.com/twreporter/twreporter-react/commit/93a5fe0297)] - **fix**: typo in constants/prop-type.js (nickhsine)
- [[`f4fde58922`](https://github.com/twreporter/twreporter-react/commit/f4fde58922)] - Merge pull request #1693 from taylrj/master (Tai-Jiun Fang)

## 4.5.3

### Notable Changes

- refactor about-us page: extract out config which will be stored in gcs

### Commits

- [[`db90e59a16`](https://github.com/twreporter/twreporter-react/commit/db90e59a16)] - refactor(about-us): eslint fixes (Taylor Fang)
- [[`0ed242aaaa`](https://github.com/twreporter/twreporter-react/commit/0ed242aaaa)] - refactor(about-us): remove unused files (Taylor Fang)
- [[`7cd84dad6a`](https://github.com/twreporter/twreporter-react/commit/7cd84dad6a)] - refactor(about-us): remove unused code (Taylor Fang)
- [[`620ba110a4`](https://github.com/twreporter/twreporter-react/commit/620ba110a4)] - docs(about-us): add jsdoc (Taylor Fang)
- [[`a89572e4c2`](https://github.com/twreporter/twreporter-react/commit/a89572e4c2)] - refactor(about-us): extract out `awardYears` and `groupedByAwardAndYear` (Taylor
  Fang)
- [[`159d009962`](https://github.com/twreporter/twreporter-react/commit/159d009962)] - fix(about-us): update config prefix (Taylor Fang)
- [[`e82b280f2b`](https://github.com/twreporter/twreporter-react/commit/e82b280f2b)] - refactor(about-us): remove `console.error` (Taylor Fang)
- [[`2b7c5e5e59`](https://github.com/twreporter/twreporter-react/commit/2b7c5e5e59)] - fix(about-us): get config url by release branch (Taylor Fang)
- [[`fb0d555733`](https://github.com/twreporter/twreporter-react/commit/fb0d555733)] - fix(about-us): update section4 config with latest data (Taylor Fang)
- [[`b9ee0ef070`](https://github.com/twreporter/twreporter-react/commit/b9ee0ef070)] - fix(about-us): update section3 config with latest data (Taylor Fang)
- [[`847557e8c6`](https://github.com/twreporter/twreporter-react/commit/847557e8c6)] - refactor(about-us): refactor section2 of about-us page (Taylor Fang)
- [[`1a20bd61a4`](https://github.com/twreporter/twreporter-react/commit/1a20bd61a4)] - fix(about-us): update section2 config with latest data (Taylor Fang)
- [[`880199095c`](https://github.com/twreporter/twreporter-react/commit/880199095c)] - refactor(about-us): refactor section5 of about-us page (Taylor Fang)
- [[`3948cfcf54`](https://github.com/twreporter/twreporter-react/commit/3948cfcf54)] - fix(about-us): update section5 config with latest data (Taylor Fang)
- [[`12187d59aa`](https://github.com/twreporter/twreporter-react/commit/12187d59aa)] - fix(about-us): bug fix in section4 (Taylor Fang)
- [[`ac36004503`](https://github.com/twreporter/twreporter-react/commit/ac36004503)] - refactor(about-us): refactor section4 of about-us page (Taylor Fang)
- [[`ead7bf7c13`](https://github.com/twreporter/twreporter-react/commit/ead7bf7c13)] - refactor(about-us): refactor section3 of about-us page (Taylor Fang)
- [[`4267c930b3`](https://github.com/twreporter/twreporter-react/commit/4267c930b3)] - feat(about-us): add testing configs (Taylor Fang)

## 4.5.2

### Notable Changes

- perf(article-page|topic-landing-page): - use memoize-one to avoid re-rendering

### Commits

- [[`7500517814`](https://github.com/twreporter/twreporter-react/commit/7500517814)] - Merge pull request #1687 from nickhsine/performance-tuning (nick)
- [[`0b21292326`](https://github.com/twreporter/twreporter-react/commit/0b21292326)] - **refactor**: use memoize-one to avoid re-rendering (nickhsine)

## 4.5.1

### Notable Changes

- fix: update footer when host or pathname changes (Taylor Fang)

### Commits

- [[`a773b546fd`](https://github.com/twreporter/twreporter-react/commit/a773b546fd)] - **chore**: upgrade deps (Taylor Fang)
- [[`67e8242566`](https://github.com/twreporter/twreporter-react/commit/67e8242566)] - **chore**: upgrade deps (Taylor Fang)
- [[`225662dfad`](https://github.com/twreporter/twreporter-react/commit/225662dfad)] - **fix**: update footer when host or pathname changes (Taylor Fang)

* [[`46695c8c8a`](https://github.com/twreporter/twreporter-react/commit/46695c8c8a)] - Merge pull request #1684 from taylrj/master (Tai-Jiun Fang)

## 4.5.0

### Notable Changes

- fix:

  - reload page after one day to avoid stale data

- style:

  - add loading spinner for fetching more posts

- chore:

  - upgrade @twreporter/redux@7.0.0
  - upgrade @twreporter/index-page@1.0.9
  - upgrade @twreporter/react-components@8.2.3
  - upgrade @twreporter/react-article-components@1.2.0
  - add git hooks to run prettier and eslint

- refactor:
  - add/update JSDoc to pass ts-check
  - update containers and data-loaders for adopting @twreporter/redux@7
  - mock go-api v2 endpoints for local testing server
  - mv web-push.js from containers/ to components/
  - update code base to pass eslint and prettier

### Commits

- [[`ee6c1f948d`](https://github.com/twreporter/twreporter-react/commit/ee6c1f948d)] - **chore**: upgrade dependencies to stable version (nickhsine)
- [[`b0e8a3671f`](https://github.com/twreporter/twreporter-react/commit/b0e8a3671f)] - Merge pull request #1675 from nickhsine/4.5.0-rc.3 (nick)
- [[`ed2b24dae1`](https://github.com/twreporter/twreporter-react/commit/ed2b24dae1)] - chore(release): 4.5.0-rc.3 (nickhsine)-

* [[`bf66db81ac`](https://github.com/twreporter/twreporter-react/commit/bf66db81ac)] - Merge pull request #1674 from nickhsine/master (nick)
* [[`a08f04ed3c`](https://github.com/twreporter/twreporter-react/commit/a08f04ed3c)] - Merge pull request #1661 from nickhsine/fix-stale-data (nick)
* [[`ba11c73591`](https://github.com/twreporter/twreporter-react/commit/ba11c73591)] - **fix**: reload page after one day to avoid stale data (nickhsine)
* [[`8cf8bb712b`](https://github.com/twreporter/twreporter-react/commit/8cf8bb712b)] - **fix**: relateds_background of topic landing page is not set (nickhsine)
* [[`991ebab0bf`](https://github.com/twreporter/twreporter-react/commit/991ebab0bf)] - Merge pull request #1672 from nickhsine/4.5.0-rc.2 (nick)
* [[`9aca12893c`](https://github.com/twreporter/twreporter-react/commit/9aca12893c)] - **chore**: update dependencies (nickhsine)
* [[`617b0c4a1a`](https://github.com/twreporter/twreporter-react/commit/617b0c4a1a)] - Merge pull request #1670 from nickhsine/4.5.0-rc.1 (nick)
* [[`2efefbdd06`](https://github.com/twreporter/twreporter-react/commit/2efefbdd06)] - Merge pull request #1669 from nickhsine/update-eslint-prettier (nick)
* [[`c583a04bb2`](https://github.com/twreporter/twreporter-react/commit/c583a04bb2)] - **chore**: update package.json#scripts.lint (nickhsine)
* [[`3f15bd643a`](https://github.com/twreporter/twreporter-react/commit/3f15bd643a)] - Merge pull request #1668 from nickhsine/fix-typo (nick)
* [[`b412a81a24`](https://github.com/twreporter/twreporter-react/commit/b412a81a24)] - **refactor**: pass eslint and prettier (nickhsine)
* [[`cc9456e889`](https://github.com/twreporter/twreporter-react/commit/cc9456e889)] - **refactor**: upgrade eslint and add prettier (nickhsine)
* [[`0ec7491268`](https://github.com/twreporter/twreporter-react/commit/0ec7491268)] - **fix**: fix typo. writters -\> writers (nickhsine)
* [[`d31fd2a2fe`](https://github.com/twreporter/twreporter-react/commit/d31fd2a2fe)] - Merge pull request #1666 from nickhsine/master (nick)
* [[`932fac8d7d`](https://github.com/twreporter/twreporter-react/commit/932fac8d7d)] - **fix**: import clone-entity -\> shallow-clone-entity (nickhsine)
* [[`fbce43c484`](https://github.com/twreporter/twreporter-react/commit/fbce43c484)] - Merge pull request #1663 from nickhsine/master (nick)
* [[`d84e037946`](https://github.com/twreporter/twreporter-react/commit/d84e037946)] - Merge pull request #1650 from nickhsine/migrate-v2 (nick)
* [[`7b5f168279`](https://github.com/twreporter/twreporter-react/commit/7b5f168279)] - **chore**: update deps (nickhsine)
* [[`8d646852a0`](https://github.com/twreporter/twreporter-react/commit/8d646852a0)] - **refactor**: update src/containers/Category.js (nickhsine)
* [[`0c458b75b6`](https://github.com/twreporter/twreporter-react/commit/0c458b75b6)] - **fix**: ui-manager renders wrong univeral header (nickhsine)
* [[`721854babb`](https://github.com/twreporter/twreporter-react/commit/721854babb)] - **refactor**: clone-entity.js -\> shallow-clone-entity.js (nickhsine)
* [[`3d56255ad4`](https://github.com/twreporter/twreporter-react/commit/3d56255ad4)] - **refactor**: update web-push.js (nickhsine)
* [[`1615e1ef83`](https://github.com/twreporter/twreporter-react/commit/1615e1ef83)] - **refactor**: update Article.js (nickhsine)
* [[`5f4e0e533f`](https://github.com/twreporter/twreporter-react/commit/5f4e0e533f)] - **chore**: add localforage@^1.8.1 (nickhsine)
* [[`94ba95bea5`](https://github.com/twreporter/twreporter-react/commit/94ba95bea5)] - **refactor**: update client.js (nickhsine)
* [[`0a90fec484`](https://github.com/twreporter/twreporter-react/commit/0a90fec484)] - **fix**: fix ts-check and JSDoc errors (nickhsine)
* [[`b3f72cba06`](https://github.com/twreporter/twreporter-react/commit/b3f72cba06)] - **fix**: dedup duplicate related post (nickhsine)
* [[`8ac2ce88ed`](https://github.com/twreporter/twreporter-react/commit/8ac2ce88ed)] - **refactor**: address code review comments (nickhsine)
* [[`8fdab03734`](https://github.com/twreporter/twreporter-react/commit/8fdab03734)] - **refactor**: update testing-server responses (nickhsine)
* [[`730eafd35e`](https://github.com/twreporter/twreporter-react/commit/730eafd35e)] - **refactor**: update article page (nickhsine)
* [[`4256063803`](https://github.com/twreporter/twreporter-react/commit/4256063803)] - **refactor**: update JSDoc (nickhsine)
* [[`51af4c2015`](https://github.com/twreporter/twreporter-react/commit/51af4c2015)] - **refactor**: spinner for loading more posts in topic page (nickhsine)
* [[`b49f24a2cc`](https://github.com/twreporter/twreporter-react/commit/b49f24a2cc)] - **refactor**: update topic landing page (nickhsine)
* [[`dda3380e9b`](https://github.com/twreporter/twreporter-react/commit/dda3380e9b)] - **refactor**: update photography page (nickhsine)
* [[`f8f1226637`](https://github.com/twreporter/twreporter-react/commit/f8f1226637)] - **refactor**: update topic list page (nickhsine)
* [[`1f28bc7b96`](https://github.com/twreporter/twreporter-react/commit/1f28bc7b96)] - **fix**: update src/testing-server.js (nickhsine)
* [[`c9f959f96b`](https://github.com/twreporter/twreporter-react/commit/c9f959f96b)] - **fix**: handle page \< 0 situation (nickhsine)
* [[`739f9fb38e`](https://github.com/twreporter/twreporter-react/commit/739f9fb38e)] - **refactor**: update tag list page (nickhsine)
* [[`4837020f5d`](https://github.com/twreporter/twreporter-react/commit/4837020f5d)] - **refactor**: update category list page (nickhsine)
* [[`9a830af2b0`](https://github.com/twreporter/twreporter-react/commit/9a830af2b0)] - **refactor**: utils for clone metadata of a post or topic (nickhsine)
* [[`3b6b63d885`](https://github.com/twreporter/twreporter-react/commit/3b6b63d885)] - **refactor**: update src/containers/Home.js (nickhsine)
* [[`10482a9592`](https://github.com/twreporter/twreporter-react/commit/10482a9592)] - **chore**: update src/testing-server.js (nickhsine)
* [[`c1d410cd33`](https://github.com/twreporter/twreporter-react/commit/c1d410cd33)] - **chore**: add src/mock-data/v2/ for v2 endpoints (nickhsine)

## 4.4.26

### Commits

- [[`99fdc5b576`](https://github.com/twreporter/twreporter-react/commit/99fdc5b576)] - **chore**: @twreporter/react-article-components@1.1.9-rc.0 (nickhsine)
- [[`c656e56f2a`](https://github.com/twreporter/twreporter-react/commit/c656e56f2a)] - **fix**: update sitemap URL (nickhsine)
- [[`869035cc8f`](https://github.com/twreporter/twreporter-react/commit/869035cc8f)] - **fix**: prevent dev env from error reorting (nickhsine)

## 4.4.25

### Notable Changes

- Update about us:
  - update content (section2, section3)
  - use ordered list to keep the departments in order (section2)

### Commits

- [[`87d5cac249`](https://github.com/twreporter/twreporter-react/commit/87d5cac249)] - fix(about-us): use ordered list instead of lodash/keys (Taylor Fang)
- [[`f77cf012fe`](https://github.com/twreporter/twreporter-react/commit/f77cf012fe)] - refactor(about-us): remove lodash/find in section2 (Taylor Fang)
- [[`0ce2227274`](https://github.com/twreporter/twreporter-react/commit/0ce2227274)] - refactor(about-us): update content (Taylor Fang)

## 4.4.24

### Notable Changes

- Update dependency:
  - @twreporter/react-article-components@1.1.8

### Commits

- [[`c5ce8e8edd`](https://github.com/twreporter/twreporter-react/commit/c5ce8e8edd)] - **chore**: update dependency (yucj)

## 4.4.23

### Notable Changes

- update about-us page

### Commits

- [[`6b46ff90b0`](https://github.com/twreporter/twreporter-react/commit/6b46ff90b0)] - **refactor**: eslint fixes (Taylor Fang)
- [[`a2ccfbb967`](https://github.com/twreporter/twreporter-react/commit/a2ccfbb967)] - refactor(about-us): rename category (Taylor Fang)
- [[`9d121481f7`](https://github.com/twreporter/twreporter-react/commit/9d121481f7)] - refactor(about-us): update style in section-02 due to design changes (Taylor Fang)
- [[`602bf6e1b3`](https://github.com/twreporter/twreporter-react/commit/602bf6e1b3)] - refactor(about-us): refine the way to get member page length (Taylor Fang)
- [[`a3b8a6aeea`](https://github.com/twreporter/twreporter-react/commit/a3b8a6aeea)] - refactor(about-us): extract `screen` out as a constant (Taylor Fang)
- [[`a53f5785f8`](https://github.com/twreporter/twreporter-react/commit/a53f5785f8)] - refactor(about-us): add carousel markup as a constant (Taylor Fang)
- [[`13ed196f79`](https://github.com/twreporter/twreporter-react/commit/13ed196f79)] - refactor(about-us): add headcount per page as constants (Taylor Fang)
- [[`6a6f6019e2`](https://github.com/twreporter/twreporter-react/commit/6a6f6019e2)] - refactor(about-us): update constants (Taylor Fang)

## 4.4.22

### Notable Changes

- replace gcs origin in url to cache og images

### Commits

- [[`6d79d8803c`](https://github.com/twreporter/twreporter-react/commit/6d79d8803c)] - **feat**: replace gcs origin to cache og image (yucj)
- [[`c16accd669`](https://github.com/twreporter/twreporter-react/commit/c16accd669)] - **feat**: replace gcs origin to cache og image for topics (yucj)

## 4.4.21

### Notable Changes

- add og:image:width and og:image:height

### Commit

- [[`5d9bb4c851`](https://github.com/twreporter/twreporter-react/commit/5d9bb4c851)] - **feat**: add og:image:width and og:image:height (#1619) (yucj)

## 4.4.20

### Notable Changes

- fix: section 2 of about us
  - fix section2 where arrows of photography department can not click
  - update section2 content

### Commits

- [[`5dfed5971c`](https://github.com/twreporter/twreporter-react/commit/5dfed5971c)] - **fix**: update about-us content (Taylor Fang)
- [[`7e519263c0`](https://github.com/twreporter/twreporter-react/commit/7e519263c0)] - **chore**: update version to v4.4.20-rc.0 (Taylor Fang)
- [[`07f5db200d`](https://github.com/twreporter/twreporter-react/commit/07f5db200d)] - **chore**: bump version to v4.4.20 (Taylor Fang)
- [[`334ea8e794`](https://github.com/twreporter/twreporter-react/commit/334ea8e794)] - **fix**: section 2 of about us (Taylor Fang)

## 4.4.19

### Notable Changes

- update about-us page
  - update members (section2)
  - update section5 content as well as record order

### Commits

- [[`30d46cea16`](https://github.com/twreporter/twreporter-react/commit/30d46cea16)] - Merge pull request #1603 from taylrj/update-aboutus (Tai-Jiun Fang)
- [[`8a9444bed8`](https://github.com/twreporter/twreporter-react/commit/8a9444bed8)] - **fix**: only return `date` if record has `date` (Taylor Fang)
- [[`133a46f80f`](https://github.com/twreporter/twreporter-react/commit/133a46f80f)] - **fix**: update section5 content in about-us (Taylor Fang)
- [[`565cae3919`](https://github.com/twreporter/twreporter-react/commit/565cae3919)] - **fix**: update members in about-us (Taylor Fang)
- [[`1328b6a0d0`](https://github.com/twreporter/twreporter-react/commit/1328b6a0d0)] - **fix**: update the record order in about-us (Taylor Fang)

## 4.4.18

### Commits

- [[`72d798a4e0`](https://github.com/twreporter/twreporter-react/commit/72d798a4e0)] - **chore**: upgrade to @twreporter/react-article-components@^1.1.7 (nickhsine)

## 4.4.17

### Commits

- [[`fcfb74d6db`](https://github.com/twreporter/twreporter-react/commit/fcfb74d6db)] - **fix**: web push tutorial URL change (nickhsine)

## 4.4.16

### Notable Changes

- **fix**: anchors position on index page
- **chore**:
  - update yarn.lock (yucj)
  - add --frozen-lockfile to yarn install (yucj)

### Commits

- [[`b6dfe56595`](https://github.com/twreporter/twreporter-react/commit/b6dfe56595)] - **fix**: anchors position on index page (#1594) (Tai-Jiun Fang)
- [[`66d7816376`](https://github.com/twreporter/twreporter-react/commit/66d7816376)] - **chore**: update yarn.lock (yucj)
- [[`adfb135e29`](https://github.com/twreporter/twreporter-react/commit/adfb135e29)] - **chore**: add --frozen-lockfile to yarn install (yucj)

## 4.4.15

### Notable Changes

- **chore**: dependencies dedupe
- **chore**: update dependencies
  - @twreporter/core@1.2.0
  - @twreporter/index-page@1.0.8
  - @twreporter/react-article-components@1.1.4
  - @twreporter/react-components@8.2.1
  - @twreporter/universal-header@2.1.6

### Commits

- [[`af07812975`](https://github.com/twreporter/twreporter-react/commit/af07812975)] - **chore**: dependencies dedupe (yucj)
- [[`133a3db93c`](https://github.com/twreporter/twreporter-react/commit/133a3db93c)] - **chore**: update dependencies (yucj)

## 4.4.14

### Notable Changes

- **fix**: update error handling of express/middlewares/auth
- **chore**: update package version parser
- **chore**: dependencies upgrade:
- @twreporter/core@1.2.0-rc.0
- @twreporter/index-page@1.0.8-rc.0
- @twreporter/react-article-components@1.1.4-rc.0
- @twreporter/react-components@8.2.1-rc.0
- @twreporter/universal-header@2.1.6-rc.0
- remove unused vars in express/middlewares/auth
- fix category name on photography landing page

### Commits

- [[`7e1988bbd5`](https://github.com/twreporter/twreporter-react/commit/7e1988bbd5)] - **chore**: remove redundant ci build at master branch (yucj)
- [[`de293e9486`](https://github.com/twreporter/twreporter-react/commit/de293e9486)] - **chore**: update changelog (yucj)
- [[`d8ff4ccd46`](https://github.com/twreporter/twreporter-react/commit/d8ff4ccd46)] - **chore**: update package version parser (yucj)
- [[`747d1adecb`](https://github.com/twreporter/twreporter-react/commit/747d1adecb)] - **chore**: update changelog (yucj)
- [[`57c9cf556a`](https://github.com/twreporter/twreporter-react/commit/57c9cf556a)] - **fix**: fix wrong error path in express/middlewares/auth (yucj)
- [[`4774887886`](https://github.com/twreporter/twreporter-react/commit/4774887886)] - **chore**: bump version to v4.4.14-rc.1 (yucj)
- [[`7b9b304bca`](https://github.com/twreporter/twreporter-react/commit/7b9b304bca)] - **fix**: update error handling of express/middlewares/auth (yucj)
- [[`a4d0bddedf`](https://github.com/twreporter/twreporter-react/commit/a4d0bddedf)] - **chore**: update dependencies (yucj)
- [[`717b5e1bec`](https://github.com/twreporter/twreporter-react/commit/717b5e1bec)] - **fix**: log out the user if fail to get access token (yucj)
- [[`923aea2860`](https://github.com/twreporter/twreporter-react/commit/923aea2860)] - **fix**: remove unused vars (yucj)
- [[`0cc99eff33`](https://github.com/twreporter/twreporter-react/commit/0cc99eff33)] - **fix**: category name on photography landing page (Taylor Fang)

## 4.4.13

### Notable Changes

- dependencies upgrade:
  - @twreporter/core@1.1.3
  - @twreporter/index-page@1.0.7
  - @twreporter/react-article-components@1.1.3
  - @twreporter/react-components@8.2.0
  - @twreporter/redux@6.0.1
  - @twreporter/universal-header@2.1.5
- Fix list bug ([#1561](https://github.com/twreporter/twreporter-react/pull/1561)) (yucj)

### Commits

- [[`ba54db90b2`](https://github.com/twreporter/twreporter-react/commit/ba54db90b2)] - **chore**: update twreporter-npm-packages (#1569) (Tai-Jiun Fang)
- [[`fb4f98bdba`](https://github.com/twreporter/twreporter-react/commit/fb4f98bdba)] - Merge pull request #1567 from YuCJ/fix (yucj)
- [[`07d172bfd5`](https://github.com/twreporter/twreporter-react/commit/07d172bfd5)] - chore(prerelease): bump version to v4.4.13-rc.1 (yucj)
- [[`a775c47a11`](https://github.com/twreporter/twreporter-react/commit/a775c47a11)] - **chore**: update @twreporter/react-article-components (yucj)
- [[`3e3c8fe1b8`](https://github.com/twreporter/twreporter-react/commit/3e3c8fe1b8)] - Fix list bug (#1561) (yucj)
- [[`54bebb9138`](https://github.com/twreporter/twreporter-react/commit/54bebb9138)] - Merge pull request #1565 from taylrj/master (Tai-Jiun Fang)
- [[`3221fc2339`](https://github.com/twreporter/twreporter-react/commit/3221fc2339)] - **chore**: bump version to v4.4.13-rc.0 (Taylor Fang)
- [[`1efd4fb850`](https://github.com/twreporter/twreporter-react/commit/1efd4fb850)] - **chore**: update twreporter-npm-packages (#1563) (Tai-Jiun Fang)

## 4.4.12

### Notable Changes

- dependencies upgrade:
  - @twreporter/react-article-components@^1.1.2
  - @twreporter/react-components@^8.1.1
  - @twreporter/redux@^6.0.0
  - @twreporter/universal-header@^2.1.4
- fix:
  - make logging entry less than maximum size 250Kb
  - catch promise rejection (with fail actions) in containers, data-loaders and auth middleware
  - do not trigger error reporting if error is 404 status code

### Commits

- [[`a0ec98efe8`](https://github.com/twreporter/twreporter-react/commit/a0ec98efe8)] - **fix**: express/middlewares/auth: handle fail action (nickhsine)
- [[`16362c67bd`](https://github.com/twreporter/twreporter-react/commit/16362c67bd)] - **fix**: containers: catch redux action errors (nickhsine)
- [[`84c7503318`](https://github.com/twreporter/twreporter-react/commit/84c7503318)] - **fix**: data-loaders: reject with fail action (nickhsine)
- [[`e760a2a978`](https://github.com/twreporter/twreporter-react/commit/e760a2a978)] - **refactor**: error report on demand (nickhsine)
- [[`141726b559`](https://github.com/twreporter/twreporter-react/commit/141726b559)] - **chore**: bump dependencies version (nickhsine)
- [[`41723c17a7`](https://github.com/twreporter/twreporter-react/commit/41723c17a7)] - **fix**: pass error object rather than whole action to express error handler (nickhsine)

## 4.4.11

### Natable Changes

- bump dependencies for add annual-report links
  - @twreporter/react-article-components@^1.0.26 -> ^1.1.1
  - @twreporter/react-components@^8.0.3 -> ^8.1.0

### Commits

- [[`55cae84572`](https://github.com/twreporter/twreporter-react/commit/55cae84572)] - Merge pull request #1548 from YuCJ/annual-report (yucj)
- [[`4c68901e2a`](https://github.com/twreporter/twreporter-react/commit/4c68901e2a)] - **chore**: bump dependencies for add annual-report links (yucj)

## 4.4.10

### Notable Changes

- refactor: - remove unused files and folders. - clean up unused constants and move them to local scope if needed
- feature:
  - disallow search engine cralwer on staging and development environment
  - integration with stackdriver logging
- fix:
  - service worker runtimeCaching not working

### Commits

- [[`3950325d7b`](https://github.com/twreporter/twreporter-react/commit/3950325d7b)] - **chore**: print babel-preset-env debug info only on production (nickhsine)
- [[`c145079712`](https://github.com/twreporter/twreporter-react/commit/c145079712)] - **refactor**: delete src/constants/index.js (nickhsine)
- [[`03acd4f7da`](https://github.com/twreporter/twreporter-react/commit/03acd4f7da)] - **refactor**: delete src/constants/author-page.js (nickhsine)
- [[`4c85687930`](https://github.com/twreporter/twreporter-react/commit/4c85687930)] - **refactor**: delete src/constants/footer.js (nickhsine)
- [[`58053ceb62`](https://github.com/twreporter/twreporter-react/commit/58053ceb62)] - **refactor**: delete src/constants/page-types.js (nickhsine)
- [[`572a1b7bed`](https://github.com/twreporter/twreporter-react/commit/572a1b7bed)] - **refactor**: use formatPostLinkTo and formatPostLinkTarget (nickhsine)
- [[`2ca8bccc62`](https://github.com/twreporter/twreporter-react/commit/2ca8bccc62)] - **refactor**: delete src/constants/link-prefix.js (nickhsine)
- [[`44f0745228`](https://github.com/twreporter/twreporter-react/commit/44f0745228)] - **refactor**: update src/contants/site-meta.js and related files (nickhsine)
- [[`fb22c45d80`](https://github.com/twreporter/twreporter-react/commit/fb22c45d80)] - **refactor**: delete src/constants/strings.js (nickhsine)
- [[`3c18bf4967`](https://github.com/twreporter/twreporter-react/commit/3c18bf4967)] - **refactor**: delete src/contants/topic-page.js (nickhsine)
- [[`c0cca7765d`](https://github.com/twreporter/twreporter-react/commit/c0cca7765d)] - **refactor**: delete src/constants/ui-settings.js (nickhsine)
- [[`7c4189bab0`](https://github.com/twreporter/twreporter-react/commit/7c4189bab0)] - **refactor**: delete src/constants/page-themes.js (nickhsine)
- [[`daf52a1b74`](https://github.com/twreporter/twreporter-react/commit/daf52a1b74)] - **refactor**: delete src/themes/common-variables.js (nickhsine)
- [[`7500cb4b9f`](https://github.com/twreporter/twreporter-react/commit/7500cb4b9f)] - **refactor**: delete lineHeight from src/themes/common-variables.js (nickhsine)
- [[`1f08faa00f`](https://github.com/twreporter/twreporter-react/commit/1f08faa00f)] - **refactor**: delete src/themes/screen.js (nickhsine)
- [[`378b998252`](https://github.com/twreporter/twreporter-react/commit/378b998252)] - **refactor**: delete src/themes/layout.js (nickhsine)
- [[`dfcaac3c9f`](https://github.com/twreporter/twreporter-react/commit/dfcaac3c9f)] - **refactor**: delete src/constants/screen.js (nickhsine)
- [[`aafaa3572a`](https://github.com/twreporter/twreporter-react/commit/aafaa3572a)] - **refactor**: delete src/constants/styled-components.js (nickhsine)
- [[`3c6407f03f`](https://github.com/twreporter/twreporter-react/commit/3c6407f03f)] - **refactor**: delete src/constants/device.js (nickhsine)
- [[`78ccb93e9c`](https://github.com/twreporter/twreporter-react/commit/78ccb93e9c)] - **refactor**: delete src/utils/screen-type.js (nickhsine)
- [[`713d54ea35`](https://github.com/twreporter/twreporter-react/commit/713d54ea35)] - **refactor**: delete src/containers/ArticleTools.js (nickhsine)
- [[`d17cf4bc92`](https://github.com/twreporter/twreporter-react/commit/d17cf4bc92)] - **refactor**: remove src/conf folder (nickhsine)
- [[`45d50eb48e`](https://github.com/twreporter/twreporter-react/commit/45d50eb48e)] - **refactor**: remove src/helpers folder (nickhsine)
- [[`66af1424d3`](https://github.com/twreporter/twreporter-react/commit/66af1424d3)] - **chore**: delete .versionrc.json (nickhsine)
- [[`2b1dd23ab7`](https://github.com/twreporter/twreporter-react/commit/2b1dd23ab7)] - **refactor**: src/containers/web-push.js (nickhsine)
- [[`4a2478c83c`](https://github.com/twreporter/twreporter-react/commit/4a2478c83c)] - **chore**: remove dependencies `pretty-error` (nickhsine)
- [[`13deb19c4a`](https://github.com/twreporter/twreporter-react/commit/13deb19c4a)] - **refactor**: integrate src/logger/index.js with express middleware (nickhsine)
- [[`5c5ed3b3cd`](https://github.com/twreporter/twreporter-react/commit/5c5ed3b3cd)] - **refactor**: integrate with src/logger/index.js (nickhsine)
- [[`c8e6165903`](https://github.com/twreporter/twreporter-react/commit/c8e6165903)] - **refactor**: integration with stackdriver logging system (nickhsine)
- [[`33e6f43a1f`](https://github.com/twreporter/twreporter-react/commit/33e6f43a1f)] - **chore**: add dependencies `winston` and `@google-cloud/logging-winston` (nickhsine)
- [[`6fdfd6d46f`](https://github.com/twreporter/twreporter-react/commit/6fdfd6d46f)] - **chore**: update src/mock-data/index-page-categories.json (nickhsine)
- [[`2e0bb300cf`](https://github.com/twreporter/twreporter-react/commit/2e0bb300cf)] - **refactor**: remove client/server side global variables (nickhsine)
- [[`9f9796a722`](https://github.com/twreporter/twreporter-react/commit/9f9796a722)] - **fix**: import pretty-error not found (nickhsine)
- [[`95410ee5d5`](https://github.com/twreporter/twreporter-react/commit/95410ee5d5)] - **refactor**: integrate with new Stackdriver Logging and Error Reporting (nickhsine)
- [[`5c2d24b6b7`](https://github.com/twreporter/twreporter-react/commit/5c2d24b6b7)] - **fix**: disallow search engine cralwer on non release branch (nickhsine)
  [[`119894ad12`](https://github.com/twreporter/twreporter-react/commit/119894ad12)] - **chore**: update @twreporter/redux to 5.0.8 (nickhsine)
- [[`9024ecf779`](https://github.com/twreporter/twreporter-react/commit/9024ecf779)] - **fix**: service worker runtimeCaching not working (ni
- ckhsine)

## 4.4.9

### Notable Changes

- perf: - optimize webpack bundling process
- deps: - remove `standard-version` - add `changelog-maker`
- upgrade dependencies to solve GitHub security issues

### Commits

- [[`848a3d8ad0`](https://github.com/twreporter/twreporter-react/commit/848a3d8ad0)] - **chore**: update static cache files in sw.js (nickhsine)
- [[`c3ff7a922f`](https://github.com/twreporter/twreporter-react/commit/c3ff7a922f)] - **refactor**: babel-preset-es2015 -\> babel-preset-env (nickhsine)
- [[`0874bb1592`](https://github.com/twreporter/twreporter-react/commit/0874bb1592)] - **perf**: build babel-polyfill webpack bundle (nickhsine)
- [[`9cdbfc4fe7`](https://github.com/twreporter/twreporter-react/commit/9cdbfc4fe7)] - **fix**: import babel-polyfill (nickhsine)
- [[`50bdbe14fd`](https://github.com/twreporter/twreporter-react/commit/50bdbe14fd)] - **chore**: `npm run changelog-maker` to generate logs (nickhsine)
- [[`433d974702`](https://github.com/twreporter/twreporter-react/commit/433d974702)] - **chore**: remove devDependency `standard-version` (nickhsine)
- [[`e6d8d2f72f`](https://github.com/twreporter/twreporter-react/commit/e6d8d2f72f)] - **chore**: add devDependency `changelog-maker` (nickhsine)
- [[`eecfdc7a5c`](https://github.com/twreporter/twreporter-react/commit/eecfdc7a5c)] - **perf**: optimize webpack bundles (nickhsine)
- [[`c0f7e3c7af`](https://github.com/twreporter/twreporter-react/commit/c0f7e3c7af)] - **chore**: upgrade js-yaml to v3.13.1 to fix github alert (nickhsine)
- [[`d34ce06dfe`](https://github.com/twreporter/twreporter-react/commit/d34ce06dfe)] - **chore**: upgrade set-value to ^2.0.1 to remove github security alert (nickhsine)
- [[`687341206e`](https://github.com/twreporter/twreporter-react/commit/687341206e)] - Bump webpack-bundle-analyzer from 2.13.1 to 3.3.2 (dependabot[bot])
- [[`5fd556e18b`](https://github.com/twreporter/twreporter-react/commit/5fd556e18b)] - Bump mixin-deep from 1.3.1 to 1.3.2 (dependabot[bot])
- [[`4007330477`](https://github.com/twreporter/twreporter-react/commit/4007330477)] - Bump serialize-javascript from 1.6.1 to 2.1.1 (dependabot[bot])

### [4.4.8](https://github.com/twreporter/twreporter-react/compare/v4.4.8-rc.8...v4.4.8) (2019-11-26)

### Chores

- add `commitlint` dep with `config-conventional` ([567f5eb](https://github.com/twreporter/twreporter-react/commit/567f5eb4f99c71397f4124e2b60824a99725bfbf))
- add `husky` dep to replace `precommit-hook` ([86a9146](https://github.com/twreporter/twreporter-react/commit/86a914685fd364e0daeff21bbd3516ddb4a3365c))
- fix missing namespace ([#1515](https://github.com/twreporter/twreporter-react/issues/1515)) ([d44eb28](https://github.com/twreporter/twreporter-react/commit/d44eb282843eccd6a2866317eb9f63e0583eef82))
- integrate kubernetes configs to deploy ([d915ac5](https://github.com/twreporter/twreporter-react/commit/d915ac5fea8636fe572e8e5dfaca7c10be53be69))
- Update config for release environment ([#1513](https://github.com/twreporter/twreporter-react/issues/1513)) ([35f099d](https://github.com/twreporter/twreporter-react/commit/35f099d2cc37e115c6e87babb10877ad70d04721))
- upgrade dependencies ([3030e22](https://github.com/twreporter/twreporter-react/commit/3030e22cdedd65a5b184792ee0cc0fa11db8a4f6))
- **release:** 4.4.8-rc.9 ([fef4ad2](https://github.com/twreporter/twreporter-react/commit/fef4ad283e494bab69956c42b140a878135036ee))
- add `standard-version` dep and npm script `release` ([c4bf481](https://github.com/twreporter/twreporter-react/commit/c4bf4812227272330835b1ab7720cc06d4b78416))

### [4.4.8-rc.9](https://github.com/twreporter/twreporter-react/compare/v4.4.8-rc.8...v4.4.8-rc.9) (2019-11-25)

### Chores

- add `commitlint` dep with `config-conventional` ([567f5eb](https://github.com/twreporter/twreporter-react/commit/567f5eb4f99c71397f4124e2b60824a99725bfbf))
- add `husky` dep to replace `precommit-hook` ([86a9146](https://github.com/twreporter/twreporter-react/commit/86a914685fd364e0daeff21bbd3516ddb4a3365c))
- add `standard-version` dep and npm script `release` ([c4bf481](https://github.com/twreporter/twreporter-react/commit/c4bf4812227272330835b1ab7720cc06d4b78416))
- integrate kubernetes configs to deploy ([d915ac5](https://github.com/twreporter/twreporter-react/commit/d915ac5fea8636fe572e8e5dfaca7c10be53be69))

### 4.4.8-rc.8

#### Notable Changes

- Upgrade dependencies
  - @twreporter/react-article-components: 1.0.26-rc.2 -> 1.0.26-rc.5
  - @twreporter/react-components: 8.0.3-rc.2 -> 8.0.3-rc.4
  - @twreporter/universal-header: 2.1.2-rc.3 -> 2.1.2-rc.6

## Commits

- [[2fa6aa5](https://github.com/twreporter/twreporter-react/commit/2fa6aa5)] - chore: update dependencies(taylrj)

### 4.4.8-rc.7

#### Notable Changes

- Upgrade dependencies
  - Upgrade @twreporter/core to v1.1.2-rc.2
  - Upgrade @twreporter/index-page to v1.0.6-rc.3
  - Upgrade @twreporter/react-article-components to v1.0.26-rc.2
  - Upgrade @twreporter/react-components to v8.0.3-rc.2
  - Upgrade @twreporter/universal-header to v2.1.2-rc.3
- Add host on `next` branch to `bookmark-widget.js`

## Commits

- [[ca7ff30](https://github.com/twreporter/twreporter-react/commit/ca7ff30)] - Upgrade @twreporter npm packages(taylrj)
- [[41ca35b](https://github.com/twreporter/twreporter-react/commit/41ca35b)] - Add host on `next` branch to `bookmark-widget.js`(taylrj)

### 4.4.8-rc.6

#### Notable Changes

- Fix incorrect test operator

## Commits

- [[c89a7d3](https://github.com/twreporter/twreporter-react/commit/c89a7d3175fcd199987515ca52be12e1713b4635)] - Fix incorrect test operator(babygoat)

### 4.4.8-rc.5

#### Notable Changes

- Fix circle-ci `config.yml`

## Commits

- [[23a0bd8](https://github.com/twreporter/twreporter-react/commit/23a0bd8556d6c4f655b9f1b2520d171b0bfe499f)] - Fix circle-ci `config.yml`(taylrj)

### 4.4.8-rc.4

#### Notable Changes

- Add next branch config on circleci

## Commits

- [[9295ca1](https://github.com/twreporter/twreporter-react/commit/9295ca126539db0482b61b9e1d0d4a0557f5a6dd)] - Add next branch config on circleci(babygoat)

### 4.4.8-rc.3

#### Notable Changes

##### Upgrade Dependencies

- Upgrade @twreporter/core to v1.1.2-rc.1
- Upgrade @twreporter/index-page to v1.0.6-rc.2
- Upgrade @twreporter/react-article-components to v1.0.26-rc.1
- Upgrade @twreporter/react-components to v8.0.3-rc.1
- Upgrade @twreporter/universal-header to v2.1.2-rc.1

## Commits

- [[837f4e9](https://github.com/twreporter/twreporter-react/commit/837f4e9735f86452f6530bffdaf6379050aa7eaa)] - Upgrade @twreporter npm packages(taylrj)
- [[33f5c92](https://github.com/twreporter/twreporter-react/commit/33f5c920e3656fa80fcdea3e928af950ec1f86c6)] - Bump lodash from 4.17.11 to 4.17.13(dependabot)
- [[3fb4222](https://github.com/twreporter/twreporter-react/commit/3fb42227b3b96ebaf1eacfe01f49333dae5f6ddf)] - Scroll to hash link after timeout(taylrj)
- [[6a39b3d](https://github.com/twreporter/twreporter-react/commit/6a39b3d764be7578e66097e25480e461146354bb)] - Upgrade @twreporter/index-page to v1.0.6-rc.2(taylrj)

### 4.4.8-rc.2

#### Notable Changes

##### Bug Fixes

- Fix `mobile-slide-down-menu` where `議題` button doesn't scroll to right anchor
  - Add hash-link-scroll.js to handle url with hash string which stands for the element id that page should scroll to

##### Upgrade Dependencies

- `@twreporter/universal-header@^2.1.1` -> `^2.1.2-rc.2`

#### Commits

- [[476f673](https://github.com/twreporter/twreporter-react/commit/476f673f69628b6f095c8fe2a78b5f03d3680648)] - Add hash-link-scroll.js(taylrj)
- [[7a9ab66](https://github.com/twreporter/twreporter-react/commit/32784f875a2d7efc466cd1438ab618200d563ba9)] - Bump @twreporter/universal-header to version 2.1.2-rc.2(taylrj)
- [[67f8af6](https://github.com/twreporter/twreporter-react/commit/172143099c1cc462935ccb38640e2c5179d42980)] - Address review comments(taylrj)

### 4.4.8-rc.1

#### Notable Changes

- build:
  - update circleci config due to new cluster

#### Commits

- [[290326b](https://github.com/twreporter/twreporter-react/commit/290326bb05bc5c668a7fe0644b8b85b810c5d049)] - update circleci config due to k8s cluster change(nickhsine)

### 4.4.7

#### Notable Changes

##### Bug Fixes

- [Bug] Fix og-image type error on topic landing page

#### Commits

- [[802e69f](https://github.com/twreporter/twreporter-react/commit/802e69fa495e643dd4a03da9e43d690c2d9b3f4e)] - Fix og-image type error on topic landing page (taylrj)
- [[a89fb28](https://github.com/twreporter/twreporter-react/commit/a89fb282afd7a47948d705b4d17dbf3ae401bb1f)] - Add `leading-image` as the fallback `og-image` on topic landing page (taylrj)

### 4.4.7

#### Notable Changes

##### Bug Fixes

- [Bug] Fix og-image type error on topic landing page

#### Commits

- [[802e69f](https://github.com/twreporter/twreporter-react/commit/802e69fa495e643dd4a03da9e43d690c2d9b3f4e)] - Fix og-image type error on topic landing page (taylrj)
- [[a89fb28](https://github.com/twreporter/twreporter-react/commit/a89fb282afd7a47948d705b4d17dbf3ae401bb1f)] - Add `leading-image` as the fallback `og-image` on topic landing page (taylrj)

### 4.4.6

#### Notable Changes

##### Bug Fixes

- Fix list isFethcing logic: If there’s only one item in a list, the previous code will regard the container as at `isFetching` status.
- Fix wrong componentDidUpdate arguments: `nextProps` -> `prevProps`
- Remove PM2 in comments

#### Commits

- [[5e21c088](https://github.com/twreporter/twreporter-react/commit/5e21c088)] Remove PM2 in comments (yucj)
- [[1b0b7e1e](https://github.com/twreporter/twreporter-react/commit/1b0b7e1e)] Fix wrong componentDidUpdate arguments (yucj)
- [[ec45c064](https://github.com/twreporter/twreporter-react/commit/ec45c064)] Fix list isFethcing logic (yucj)

### 4.4.5

#### Notable Changes

##### Bug Fixes

- Fix home spinner displayed logic
- Fix wrong query retrieving with react-router. After this fix, the page being visited will be documented in url as `?page=<number>` for `Tag`, `Topics`, and `Categories`.
  - Add query validator to prevent invalid search query page input

##### Upgrade Dependencies

- `@twreporter/velocity-react@^1.4.2` -> `velocity-react@^1.4.3`
- `react-transition-group@^1.2.1` -> `^2.0.0`
- `react-router-dom@^4.3.1` -> `^5.1.2`
  - Per file imports are deprecated for react-router-dom
- `@twreporter/index-page@^1.0.4` -> `^1.0.5`
- `@twreporter/react-article-components@1.0.24` -> `^1.0.25`
- `@twreporter/react-components@^8.0.1` -> `^8.0.2`
- `@twreporter/universal-header@^2.1.0` -> `^2.1.1`

#### Commits

- [[400c6d0e](https://github.com/twreporter/twreporter-react/commit/400c6d0e)] Prevent invalid search query page input (yucj)
- [[efccfe95](https://github.com/twreporter/twreporter-react/commit/efccfe95)] Fix wrong query retrieving with react-router (yucj)
- [[66025c35](https://github.com/twreporter/twreporter-react/commit/66025c35)] Fix home spinner displayed logic (yucj)
- [[9052908c](https://github.com/twreporter/twreporter-react/commit/9052908c)] Fix mock post content (yucj)
- [[de3a1dd8](https://github.com/twreporter/twreporter-react/commit/de3a1dd8)] Per file imports are deprecated for react-router-dom (yucj)
- [[1357d17e](https://github.com/twreporter/twreporter-react/commit/1357d17e)] Upgrade react-transition-group to v2 (yucj)
- [[b1ca418e](https://github.com/twreporter/twreporter-react/commit/b1ca418e)] Replace customized velocity-react with original one (yucj)
- [[dd71feec](https://github.com/twreporter/twreporter-react/commit/dd71feec)] Remove deprecated `componentWillMount` and `componentWillReceiveProps` (yucj)

### 4.4.4

- Disable DLC and remove redundant steps
- Update about-us page

### 4.4.3

#### Update mock data

- Update all photo post style to v2 in mock data

#### Style Update

- Change `white-space` and `text-align` of the author page `Bio` component to preserve intentional wrappings.
- Remove pm2 and use node directly to run server

#### Dependency Upgrade

- Bump @twreporter/redux version to v5.0.6

### 4.4.2

#### Remove deprecated code

- Refactor TopicLandingPage
  - Remove warning and only re-render when slug changed
  - Rewrite des of topic landing page with styled-components
- Remove unused dependencies
- Remove unused article-v1 components
- Use normalize.css with static assets rather than package
- Move article container to main chunk

#### Fix meta data of video reported by Google Search Console #1425

- Add thumbnailUrl, description, and uploadDate to metadata of leading video of topic
- Rename and move leading components to topic

### 4.4.1

#### Dependency Upgrade

- @twreporter/react-article-components@1.0.24

### 4.4.0

#### Release with new article styles ([@twreporter/react-article-components](https://github.com/twreporter/twreporter-npm-packages/tree/master/packages/react-article-components))

#### Fix TopicLandingPage

- Fix topic background color
- Add showAll button to relateds

### 4.3.20

#### Dependency Upgrade

- @twreporter/react-components@^8.0.1
- @twreporter/react-article-components@^1.0.22

#### Table of Contents:Anchor

- provide id in the anchor, and jump to the anchor position if URI contains `#${anchorName}`

### 4.3.19

#### Dependency Upgrade

- @twreporter/react-components@^8.0.0
- @twreporter/react-article-components@^1.0.21

### 4.3.18

#### Dependency Upgrade

- @twreporter/react-components@^7.1.1
- @twreporter/react-article-components@1.0.20

#### Rewrite components with scss with styled-components

- Rewrite `AuthorsList`, `AuthorPage`, and `TopicLandingPage`
- Rewrite `Photography`, and `Search`

#### Bug fix

##### about-us page

- Bugfix: member's carousel has wrong pagination on resize
- Bugfix: side bar on about-us page

#### Miscellaneous

##### about-us page

- `componentWillMount` -> `componentDidMount`, `componentWillUpdate` -> `shouldComponentUpdate`
- Removes `shouldComponentUpdate` and `componentDidUpdate` in section1 since they are unused
  in current use case, which mounts a new component once animation get changed

### 4.3.17

#### Dependency Upgrade

- @twreporter/react-article-components@1.0.19

### 4.3.16

#### Dependency Upgrade

- @twreporter/react-article-components@1.0.18

### 4.3.15

#### Dependency Upgrade

- @twreporter/react-article-components@1.0.18-beta.4

#### Typekit Update

- use new typekit project

### 4.3.14

#### Dependency Upgrade

- @twreporter/react-article-components@1.0.18-beta.2

### 4.3.13

#### Dependency Upgrade

- @twreporter/redux@^5.0.5

#### Bug fix

- [index-page] lacks of other categories except international category in categories section

### 4.3.12

#### Dependency Upgrade

- @twreporter/react-article-components@^1.0.17

### 4.3.11

#### Dependency Upgrade

- @twreporter/react-components@^7.1.0
- @twreporter/redux@^5.0.4
- @twreporter/universal-header@^2.1.0
- @twreporter/core@^1.1.1
- @twreporter/react-article-components@^1.0.16
- @twreporter/velocity-react@^1.4.2
- react@16.8.6 -> react@16.9.0
- react-dom@16.8.6 -> react@16.9.0

#### Disable service-worker on preview branch

#### Take constants and utils from @twreporter/core

### 4.3.10

#### Donation Link with utm

- `ReactGA.OutboundLink` -> `@twreporter/react-components/lib/donation-link-with-utm`

#### Bug fix

- Remove static folder from `.dockerignore` file

#### Miscellaneous

- Remove unused files in static folder
- Move `mock-data` folder from `static` to `src` folder

### 4.3.9

#### Dependency Upgrade

- @twreporter/react-article-components@^1.0.14

### 4.3.8

#### Dependency Upgrade

- @twreporter/index-page@^1.0.4
- @twreporter/react-article-components@^1.0.12
- @twreporter/react-components@^7.0.6
- Update babel-polyfill and compression dependencies:
  this pathc updates the `babel-polyfill` and `compression` packages
  dependencies from dev-dependencies to dependencies for runtime usage.

#### CI/CD Improvement

- Improve CI flow and docker image size:
  This patch improves the Circle CI flows and reduce the docker image
  size.

  For Circl-CI flow,

  - Use google/cloud-sdk instead of VM to speed up the start time
  - Use persist_to_workspace/attach_workspace instead of cache
  - Cache node_modules for build/runtime

  For docker image,

  - Remove unnecessary build libaries to speed up build time
  - Add .dockerignore file to speed up context sending time
  - Add the node_modules with yarn install --production version

- Remove exec file permission:
  this patch removes the exec permission of webpack-dev-server.js and webpack.config.js.

#### Miscellaneous

- Change order of related posts

### 4.3.7

#### Dependency Upgrade

- @twreporter/react-article-components@^1.0.9
- @twreporter/react-components@^7.0.5

#### V2 Article

- dedup related posts passed to v2 article components
- introduce ui-manager to organize app layout(remove layout-manager and theme-manager)

#### Refactoring

- move src/containers/app-shell into src/app.js

### 4.3.6

#### Dependency Upgrade

- Upgrade @twreporter/react-article-components to 1.0.6-beta.8

#### Miscellaneous

- Add sub category: 戲裡戲外 in src/constants/category.js

### 4.3.5

#### Article page

- Provide article page with v2 default theme

#### Bug fix

- Bug fix: header(transparent theme) is overlaid with web push notify

### 4.3.4

- Fix web-push bug
- Abstract web-push to an isolated component

### 4.3.3

#### Workaround(should be deprecated in the future)

- render right fontLevel on client side

### 4.3.2

#### Update dependencies:

- @twreporter/redux@^5.0.3
- @twreporter/react-article-components@^1.0.4
- @twreporter/react-components@^7.0.3

#### Update article page

- Use redux store to cache settings.fontLevel on browser

#### Update about-us page

- Update members to include staffing change on about-us page

#### Bug fix

- Fix missing path to take redux action

### 4.3.1

- Revert "Resolve modules from the `node_modules` of this repo firstly" for Webpack
- Not to import all modules from `@twreporter/universal-header`

### 4.3.0

- Remove legacy code

#### Update webpack.config.js

- Update `process.env` format for `webpack.DefinePlugin`
- Update `resolve.modules` to retrieve modules from the `node_modules` of this repo firstly

#### Adapt new packages

- Add new dependencies `@twreporter/core` and `@twreporter/index-page`
- Move some utils and constants to new package `@twreporter/core`
- Move `BookmarkList` and `BookmarkWidget` to `@twreporter/react-components`
- Retrive index components from `@twreporter/index-page`

#### Update .circleci/config.yml

- Use `yarn.lock` as the indicator of the change of dependencies
- Run build only on certain branches
- Remove test

#### Move Redux actions, reducers, configureStore to @twreporter/redux

- Remove actions, reducers, configureStore in this repo
- Bump `@twreporter/redux` version to 5.0.1

#### Update about-us page

- Update about-us page in include awards change
- Update about-us page to include staffing change

#### Bug Fix

- Bug fix: Use `ogImage` rather than `leadingImage` as og image on topic landing page

### 4.2.1

#### Dependency Update

- @twreporter/react-components@^6.1.4

#### Bug Fix

- Use named import instead of default import. import Waypoint -> import { Waypoint }

### 4.2.0

#### Integration with @twreporter/react-article-components@1.0.0-beta.1

- Render v2 article page if style is article:v2:pink
- Update layout and theme manager to adopt article:v2:pink theme
- Update dependencies: react, react-dom and react-waypoint
- Render v2 article page on `theme` query demand

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
  - Stop using `post.theme` to render article layout.
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

1. Cache static files, such as webpack bundles, while installing service worker.
2. Delete old cache while activating service worker. Every time the webpack-assets.json changes, the service worker will delete old cached webpack bundles.
3. Intercept the fetch event listener. Service worker will cache the HTTP responses it needs and return HTTP cached response if needed.
4. Handle web push notification and the corresponding behaviors after clicking the notification.

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

- Update HeadingAuthor.js. Move extendByLine to the front if it starts with `文`
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
- Remove \_sendPageLevelAction when Article unmount
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
- Replace global.**DEVELOPMENT** by **DEVELOPMENT**
- Hide log on production
- global css styles tuning
- Use lodash to get author image, Add article SEO tag
- Use <a> tag rather than Link of react-router when the style of article is interactive
- fix topic item overflow
- refine top spacing as page switches
- hide read progress bar as page switches
- refine topic text display on header

### 1.0.14

- Replace **DEVELOPMENT** by global.**DEVELOPMENT**
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
