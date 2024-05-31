# Changelog

## 5.0.3, 2024-05-31 (Current)

### Notable Changes

- chore(hotfix)
  - upgrade @twreporter/react-article-components to 2.1.1-beta.0

### Commits

- [[`5daf5426ba`](https://github.com/twreporter/twreporter-react/commit/5daf5426ba)] - **chore(hotfix)**: upgrade react-article-components to 2.1.1-beta.0 (nickhsine)

## 5.0.2, 2024-05-22

### Notable Changes

- fix
  - unexpected DOMExceptionError due to rendering promote `Banner`
  - auth issue for reading time

### Commits

- [[`bd3af4dca3`](https://github.com/twreporter/twreporter-react/commit/bd3af4dca3)] - **fix**: unexpected DOMExceptionError due to rendering promote `Banner` (nickhsine)
- [[`3e5b5d5ff2`](https://github.com/twreporter/twreporter-react/commit/3e5b5d5ff2)] - **fix**: auth issue for reading time (Lucien)

## 5.0.1, 2024-05-21

### Notable Changes

- fix
  - duplicate helmet provider issue

### Commits

- [[`9de706986d`](https://github.com/twreporter/twreporter-react/commit/9de706986d)] - **fix**: duplicate helmet provider issue (Aylie Chou)

## 5.0.0, 2024-05-20

### Notable Changes

- feat
  - upgrade `react` & `react-dom` to v18
    - use `React.render` before resolving react issue #418, #423
  - upgrade `styled-component` version to v6
  - use post reviews data from redux
  - download page for donation history records
- fix
  - replace `react-helmet` with `react-helmet-async`
  - replace `react/loadable` with `@lodable/components`
    - upgrade `webpack` to v4
    - add `webpack-cli` & remove deprecated uglify plugin
  - add `releaseBranch` to Footer
  - fetch at mount while cause duplicated related articles
  - no badge if no reviewWord
  - fetch user data while CSR in member page
- chore
  - update @twreporter packages
  - update `.gitignore`
  - remove `DONDATION_HISTORY_PHASE_2` feature toggle

### Commits

- [[`b85267b3ff`](https://github.com/twreporter/twreporter-react/commit/b85267b3ff)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`8cd1fa65bf`](https://github.com/twreporter/twreporter-react/commit/8cd1fa65bf)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`f88a531d52`](https://github.com/twreporter/twreporter-react/commit/f88a531d52)] - **fix**: use `React.render` before resolving issue #418, #423 (Aylie Chou)
- [[`012bab53e6`](https://github.com/twreporter/twreporter-react/commit/012bab53e6)] - **chore**: update @twreporter packages (Ayllie Chou)
- [[`3d9cc44739`](https://github.com/twreporter/twreporter-react/commit/3d9cc44739)] - **fix**: defects after upgrade react to v18 (Aylie Chou)
- [[`166e6559cb`](https://github.com/twreporter/twreporter-react/commit/166e6559cb)] - **fix**: add releaseBranch to Footer (Lucien)
- [[`45cc7bc0b2`](https://github.com/twreporter/twreporter-react/commit/45cc7bc0b2)] - **fix**: update @twreporter packages (Aylie Chou)
- [[`b6663057bd`](https://github.com/twreporter/twreporter-react/commit/b6663057bd)] - **fix**: update @twreporter packages & `.gitignore` (Aylie Chou)
- [[`51592f6ec2`](https://github.com/twreporter/twreporter-react/commit/51592f6ec2)] - **fix**: upgrade `styled-component` version to resolve conflict (Aylie Chou)
- [[`76184708ce`](https://github.com/twreporter/twreporter-react/commit/76184708ce)] - **fix**: fetch at mount while cause duplicated related articles (Lucien)
- [[`fe4e04468f`](https://github.com/twreporter/twreporter-react/commit/fe4e04468f)] - **chore**: update twreporter packages (Lucien)
- [[`e625560b38`](https://github.com/twreporter/twreporter-react/commit/e625560b38)] - **fix**: no badge if no reviewWord (Lucien)
- [[`ee733bb505`](https://github.com/twreporter/twreporter-react/commit/ee733bb505)] - **fix**: build fail in node v18 (Aylie Chou)
- [[`77543c1251`](https://github.com/twreporter/twreporter-react/commit/77543c1251)] - **fix**: replace `react-helmet` with `react-helmet-async` (Aylie Chou)
- [[`854d418201`](https://github.com/twreporter/twreporter-react/commit/854d418201)] - **fix**: add `webpack-cli` & remove deprecated uglify plugin (Aylie Chou)
- [[`85b25859b0`](https://github.com/twreporter/twreporter-react/commit/85b25859b0)] - **chore**: update @twreporter packages version (Aylie Chou)
- [[`2683ef1701`](https://github.com/twreporter/twreporter-react/commit/2683ef1701)] - **fix**: replace `react-loadable` with `@loadable/component` (Aylie Chou)
- [[`9a6df1c00a`](https://github.com/twreporter/twreporter-react/commit/9a6df1c00a)] - **feat**: upgrade `react` & `react-dom` to v18 (Aylie Chou)
- [[`665ab8f67c`](https://github.com/twreporter/twreporter-react/commit/665ab8f67c)] - Merge remote-tracking branch 'upstream/master' into fix/member-page-csr (Lucien)
- [[`107047f364`](https://github.com/twreporter/twreporter-react/commit/107047f364)] - **fix**: give user_id a default value (Lucien)
- [[`7fc054290d`](https://github.com/twreporter/twreporter-react/commit/7fc054290d)] - **feat**: add comment (Lucien)
- [[`8f2b586b44`](https://github.com/twreporter/twreporter-react/commit/8f2b586b44)] - **feat**: fetch user data at mount (Lucien)
- [[`e6cc4c14d4`](https://github.com/twreporter/twreporter-react/commit/e6cc4c14d4)] - **chore**: update twreporter packages (Lucien)
- [[`2404e4db22`](https://github.com/twreporter/twreporter-react/commit/2404e4db22)] - **fix**: use w400 image (Lucien)
- [[`050ed80508`](https://github.com/twreporter/twreporter-react/commit/050ed80508)] - **feat**: use post reviews data from redux (Lucien)
- [[`6b73fb947f`](https://github.com/twreporter/twreporter-react/commit/6b73fb947f)] - **chore**: update twreporter packages (Lucien)
- [[`4a0a92a8d8`](https://github.com/twreporter/twreporter-react/commit/4a0a92a8d8)] - **feat**: add try catch for axios request (Lucien)
- [[`cb89b94c7d`](https://github.com/twreporter/twreporter-react/commit/cb89b94c7d)] - **fix**: remove unused code (Lucien)
- [[`742e3e20b7`](https://github.com/twreporter/twreporter-react/commit/742e3e20b7)] - **feat**: get data from api (Lucien)
- [[`2ef689408d`](https://github.com/twreporter/twreporter-react/commit/2ef689408d)] - **feat**: remove feature toggle and fix typo (Lucien)
- [[`ea9fc3a78d`](https://github.com/twreporter/twreporter-react/commit/ea9fc3a78d)] - **feat**: download page (Lucien)
- [[`2833281236`](https://github.com/twreporter/twreporter-react/commit/2833281236)] - **feat**: add download route (Lucien)
- [[`cc1125bbf1`](https://github.com/twreporter/twreporter-react/commit/cc1125bbf1)] - **feat**: pay method and download button (Lucien)

## 4.13.0, 2024-04-23

### Notable Changes

- feat
  - use donation data from redux
  - donation history layout
  - new email subscription page
  - add reviewing post section
- fix
  - follow style guide
  - typo
  - add feature toggle and fix defects
  - row detail badge type
  - text and badges status
  - change email subscription badge text
  - use P2 for LinkButton
  - change sub title text
- chore
  - update @twreporter packages
  - remove MY_READING feature toggle

### Commits

- [[`d66e050c83`](https://github.com/twreporter/twreporter-react/commit/d66e050c83)] - **fix**: follow style guide (Lucien)
- [[`e3a85488e2`](https://github.com/twreporter/twreporter-react/commit/e3a85488e2)] - **fix**: typo (Lucien)
- [[`d3634586ab`](https://github.com/twreporter/twreporter-react/commit/d3634586ab)] - **chore**: update twreporter packages (Lucien)
- [[`e665c43b4c`](https://github.com/twreporter/twreporter-react/commit/e665c43b4c)] - Merge remote-tracking branch 'upstream/dev' into fix/donation-history-phase-2 (Lucien)
- [[`2f1484ffc5`](https://github.com/twreporter/twreporter-react/commit/2f1484ffc5)] - **fix**: row detail badge type (Lucien)
- [[`bcdffa0d55`](https://github.com/twreporter/twreporter-react/commit/bcdffa0d55)] - **fix**: add feature toggle and fix defects (Lucien)
- [[`148718636d`](https://github.com/twreporter/twreporter-react/commit/148718636d)] - **fix**: text and badges status (Lucien)
- [[`e40346e4a9`](https://github.com/twreporter/twreporter-react/commit/e40346e4a9)] - **chore**: update twreporter packages (Lucien)
- [[`dc153a9f4f`](https://github.com/twreporter/twreporter-react/commit/dc153a9f4f)] - **fix**: use arrow enum direction (Lucien)
- [[`347a86cae6`](https://github.com/twreporter/twreporter-react/commit/347a86cae6)] - **feat**: hide arrow while type is not periodic (Lucien)
- [[`dd78fdf080`](https://github.com/twreporter/twreporter-react/commit/dd78fdf080)] - **feat**: periodic donation phase 2 (Lucien)
- [[`1f448ff502`](https://github.com/twreporter/twreporter-react/commit/1f448ff502)] - **feat**: use donation data from redux (Lucien)
- [[`d748a62db6`](https://github.com/twreporter/twreporter-react/commit/d748a62db6)] - **fix**: change email subscription badge text (Lucien)
- [[`67e537d0bf`](https://github.com/twreporter/twreporter-react/commit/67e537d0bf)] - **chore**: update twreporter packages (Lucien)
- [[`0dbcd7e27c`](https://github.com/twreporter/twreporter-react/commit/0dbcd7e27c)] - **fix**: fix comments (Lucien)
- [[`7ec216f0fd`](https://github.com/twreporter/twreporter-react/commit/7ec216f0fd)] - **feat**: give default value for page and total (Lucien)
- [[`bf24927c74`](https://github.com/twreporter/twreporter-react/commit/bf24927c74)] - **feat**: status badge components (Lucien)
- [[`988b81bc0a`](https://github.com/twreporter/twreporter-react/commit/988b81bc0a)] - **feat**: move constants to constants folder (Lucien)
- [[`f8e7ab1e99`](https://github.com/twreporter/twreporter-react/commit/f8e7ab1e99)] - **feat**: add loading wrapper (Lucien)
- [[`bf1caf72ab`](https://github.com/twreporter/twreporter-react/commit/bf1caf72ab)] - **feat**: use status div (Lucien)
- [[`c80a24ad02`](https://github.com/twreporter/twreporter-react/commit/c80a24ad02)] - **feat**: total \<= 0 (Lucien)
- [[`7bebc93ec1`](https://github.com/twreporter/twreporter-react/commit/7bebc93ec1)] - **feat**: change text overflow display (Lucien)
- [[`04fcab6e10`](https://github.com/twreporter/twreporter-react/commit/04fcab6e10)] - **feat**: donation data table (Lucien)
- [[`7d8231dcb2`](https://github.com/twreporter/twreporter-react/commit/7d8231dcb2)] - **feat**: grid column for donation page (Lucien)
- [[`ad0adeb68b`](https://github.com/twreporter/twreporter-react/commit/ad0adeb68b)] - **feat**: fake data generator (Lucien)
- [[`6982e8c0ab`](https://github.com/twreporter/twreporter-react/commit/6982e8c0ab)] - **feat**: create table component for donation page (Lucien)
- [[`8e660efbb1`](https://github.com/twreporter/twreporter-react/commit/8e660efbb1)] - **feat**: add empty donation component (Lucien)
- [[`66f8a1d9ca`](https://github.com/twreporter/twreporter-react/commit/66f8a1d9ca)] - **fix**: use P2 for LinkButton (Lucien)
- [[`da60f76726`](https://github.com/twreporter/twreporter-react/commit/da60f76726)] - **feat**: use new component (Lucien)
- [[`7bd4f42d59`](https://github.com/twreporter/twreporter-react/commit/7bd4f42d59)] - **feat**: add Card component for new subscription page (Lucien)
- [[`a04760c3fd`](https://github.com/twreporter/twreporter-react/commit/a04760c3fd)] - **feat**: change email-subscription name (Lucien)
- [[`f4036f786f`](https://github.com/twreporter/twreporter-react/commit/f4036f786f)] - **fix**: change sub title text (Lucien)
- [[`ced037d5be`](https://github.com/twreporter/twreporter-react/commit/ced037d5be)] - **chore**: update twreporter packages (Lucien)
- [[`37f02abf09`](https://github.com/twreporter/twreporter-react/commit/37f02abf09)] - Merge remote-tracking branch 'upstream/master' into feature/post-review (Lucien)
- [[`70f8af59c1`](https://github.com/twreporter/twreporter-react/commit/70f8af59c1)] - **feat**: generate fake data from url param (Lucien)
- [[`e4e792584f`](https://github.com/twreporter/twreporter-react/commit/e4e792584f)] - **fix**: use article type for headline (Lucien)
- [[`d18a5ef4cb`](https://github.com/twreporter/twreporter-react/commit/d18a5ef4cb)] - **feat**: add loading mask and fake data (Lucien)
- [[`40ae668c5f`](https://github.com/twreporter/twreporter-react/commit/40ae668c5f)] - **feat**: add swiper and mobile reviewing article (Lucien)
- [[`8bb9212cd7`](https://github.com/twreporter/twreporter-react/commit/8bb9212cd7)] - **feat**: add reviewing section (Lucien)
- [[`4c216835d3`](https://github.com/twreporter/twreporter-react/commit/4c216835d3)] - **feat**: add reviewing card component (Lucien)
- [[`beba7bf5bc`](https://github.com/twreporter/twreporter-react/commit/beba7bf5bc)] - **feat**: add empty state for reviewing article (Lucien)
- [[`68a217cea9`](https://github.com/twreporter/twreporter-react/commit/68a217cea9)] - **chore**: update twreporter packages (Lucien)
- [[`f9988bc7b9`](https://github.com/twreporter/twreporter-react/commit/f9988bc7b9)] - **chore**: remove MY_READING feature toggle (Lucien)

## 4.12.10, 2024-04-10

### Notable Changes

- fix
  - get slug from post for canonical

### Commits

- [[`495e85eab4`](https://github.com/twreporter/twreporter-react/commit/495e85eab4)] - **fix**: get slug from post for canonical (Lucien)

## 4.12.9, 2024-04-08

### Notable Changes

- feat
  - new category for about us
  - update about us section 03
  - migrate article page from class component to functional component
- chore
  - update @twreporter packages

### Commits

- [[`7453669084`](https://github.com/twreporter/twreporter-react/commit/7453669084)] - **feat**: new category for about us (Lucien)
- [[`5f29a3e1e3`](https://github.com/twreporter/twreporter-react/commit/5f29a3e1e3)] - **chore**: update twreporter packages (Lucien)
- [[`04a982d316`](https://github.com/twreporter/twreporter-react/commit/04a982d316)] - **chore**: update twreporter packages (Lucien)
- [[`5928cdcaa8`](https://github.com/twreporter/twreporter-react/commit/5928cdcaa8)] - **feat**: new aboust us section 03 (Lucien)
- [[`e55aa30021`](https://github.com/twreporter/twreporter-react/commit/e55aa30021)] - **fix**: fix comments (Lucien)
- [[`f2e6bb2a10`](https://github.com/twreporter/twreporter-react/commit/f2e6bb2a10)] - **feat**: article page refactor to functional componet (Lucien)

## 4.12.8, 2024-03-13

### Notable Changes

- feat
  - add id for merchandise promo code
- fix
  - use `toggleBookmark` parameter to retrieve posts in latest page
  - replace state and give startReadingTime default Date.now
- chore
  - sync master
  - update @twreporter packages
  - enable bookmark toggle for testing

### Commits

- [[`ff49c2df32`](https://github.com/twreporter/twreporter-react/commit/ff49c2df32)] - **chore**: update twreporter packages (Lucien)
- [[`46ada0da61`](https://github.com/twreporter/twreporter-react/commit/46ada0da61)] - **chore**: update twreporter packages (Lucien)
- [[`3eaaf5afbc`](https://github.com/twreporter/twreporter-react/commit/3eaaf5afbc)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`277e9f69e3`](https://github.com/twreporter/twreporter-react/commit/277e9f69e3)] - **fix**: use `toggleBookmark` parameter (Aylie Chou)
- [[`db8fb58741`](https://github.com/twreporter/twreporter-react/commit/db8fb58741)] - **feat**: add id for merchandise promo code (Aylie Chou)
- [[`adf7ae595a`](https://github.com/twreporter/twreporter-react/commit/adf7ae595a)] - **chore**: update twreporter packages (Lucien)
- [[`4987ec3a44`](https://github.com/twreporter/twreporter-react/commit/4987ec3a44)] - **chore**: update twreporter packages (Lucien)
- [[`6a44791c90`](https://github.com/twreporter/twreporter-react/commit/6a44791c90)] - **chore**: sync master (Lucien)
- [[`edf959bf6b`](https://github.com/twreporter/twreporter-react/commit/edf959bf6b)] - **chore**: update twreporter packages (Lucien)
- [[`64f80f8351`](https://github.com/twreporter/twreporter-react/commit/64f80f8351)] - **chore**: upgrade react-article-components dep to ^1.12.2-rc.3 (nickhsine)
- [[`b60e5c1662`](https://github.com/twreporter/twreporter-react/commit/b60e5c1662)] - **fix**: replace state and give startReadingTime default Date.now (Lucien)
- [[`e4dd427a94`](https://github.com/twreporter/twreporter-react/commit/e4dd427a94)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`52a27a7ccb`](https://github.com/twreporter/twreporter-react/commit/52a27a7ccb)] - **chore**: enable bookmark toggle for testing (Aylie Chou)

## 4.12.7, 2024-02-21

### Notable Changes

- fix
  - disable bookmark toggle in latest page
  - use design guideline color
  - member page would have js error when ssr
  - diasble sw cache in latest posts request
  - redirect to signin page if not authed when enter myreading page
  - show empty page instead of loading spinner
- feat
  - my reading page with saved bookmarks & browsing history page
- chore
  - update @twreporter packages
  - upgrade `@material-symbols/font-400` version to support `kid_star` icon
  - remove `FOUNDATION_CATEGORY_SET` feature toggle

### Commits

- [[`07e0c87afb`](https://github.com/twreporter/twreporter-react/commit/07e0c87afb)] - **fix**: disable bookmark toggle in latest page (Aylie Chou)
- [[`3916a0e08b`](https://github.com/twreporter/twreporter-react/commit/3916a0e08b)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`2b36bcb141`](https://github.com/twreporter/twreporter-react/commit/2b36bcb141)] - **fix**: use design guideline black (Aylie
  Chou)
- [[`278bfef9a2`](https://github.com/twreporter/twreporter-react/commit/278bfef9a2)] - **fix**: replace rgba with design guideline color (Aylie Chou)
- [[`5f16fff0fc`](https://github.com/twreporter/twreporter-react/commit/5f16fff0fc)] - **fix**: use design guideline color (Aylie Chou)
- [[`ce518a65fa`](https://github.com/twreporter/twreporter-react/commit/ce518a65fa)] - **fix**: member page would have js error when ssr (Aylie Chou)
- [[`9a69e24b92`](https://github.com/twreporter/twreporter-react/commit/9a69e24b92)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`4e9995c079`](https://github.com/twreporter/twreporter-react/commit/4e9995c079)] - **fix**: diasble sw cache in latest posts request (Aylie Chou)
- [[`1b3cf3c587`](https://github.com/twreporter/twreporter-react/commit/1b3cf3c587)] - **fix**: redirect to signin page if not authed when enter myreading page (Aylie Chou)
- [[`88fdd5f958`](https://github.com/twreporter/twreporter-react/commit/88fdd5f958)] - **fix**: saved bookmark section loading & text (Lucien)
- [[`344d1d3e30`](https://github.com/twreporter/twreporter-react/commit/344d1d3e30)] - **chore**: sync master (Lucien)
- [[`477836e327`](https://github.com/twreporter/twreporter-react/commit/477836e327)] - **chore**: update twreporter packages (Lucien)
- [[`1b049bd131`](https://github.com/twreporter/twreporter-react/commit/1b049bd131)] - **fix**: add height to TextButton (Lucien)
- [[`f03328b2fc`](https://github.com/twreporter/twreporter-react/commit/f03328b2fc)] - **feat**: use toastr from coreContext (Lucien)
- [[`70ceb171a8`](https://github.com/twreporter/twreporter-react/commit/70ceb171a8)] - **feat**: use data from components instead of data loader (Lucien)
- [[`57cecdb97a`](https://github.com/twreporter/twreporter-react/commit/57cecdb97a)] - **feat**: remove default width (Lucien)
- [[`3e1766746f`](https://github.com/twreporter/twreporter-react/commit/3e1766746f)] - **feat**: get data while mounted (Lucien)
- [[`9486f72801`](https://github.com/twreporter/twreporter-react/commit/9486f72801)] - **feat**: add width detector hook (Lucien)
- [[`8c0d23d188`](https://github.com/twreporter/twreporter-react/commit/8c0d23d188)] - **feat**: set user foot print at article page (Lucien)
- [[`f0aa72866f`](https://github.com/twreporter/twreporter-react/commit/f0aa72866f)] - **feat**: use api data for browsing history page (Lucien)
- [[`1a0ca820ca`](https://github.com/twreporter/twreporter-react/commit/1a0ca820ca)] - **feat**: add post_id to bookmark property (Lucien)
- [[`b06919e35f`](https://github.com/twreporter/twreporter-react/commit/b06919e35f)] - **fix**: fix prop types error and remove unused code (Lucien)
- [[`b45cb28180`](https://github.com/twreporter/twreporter-react/commit/b45cb28180)] - **feat**: my reading page with real data (Lucien)
- [[`51d09a654c`](https://github.com/twreporter/twreporter-react/commit/51d09a654c)] - **feat**: move to my reading components (Lucien)
- [[`8067b40eea`](https://github.com/twreporter/twreporter-react/commit/8067b40eea)] - **feat**: load footprints at data loader (Lucien)
- [[`acb217ce0c`](https://github.com/twreporter/twreporter-react/commit/acb217ce0c)] - **feat**: empty box components (Lucien)
- [[`c3c2f5a325`](https://github.com/twreporter/twreporter-react/commit/c3c2f5a325)] - **chore**: upgrade `@material-symbols/font-400` version (Aylie Chou)
- [[`2f7e0b254b`](https://github.com/twreporter/twreporter-react/commit/2f7e0b254b)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`bf8c2efc55`](https://github.com/twreporter/twreporter-react/commit/bf8c2efc55)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`a65474b884`](https://github.com/twreporter/twreporter-react/commit/a65474b884)] - **chore**: remove `FOUNDATION\_CATEGORY\_SET` feature toggle (Aylie Chou)

## 4.12.6, 2024-01-30

### Notable Changes

- fix
  - check visibility at componentDidMount

### Commits

- [[`ec185c3bb8`](https://github.com/twreporter/twreporter-react/commit/ec185c3bb8)] - **fix**: check visibility at componentDidMount (Lucien)

## 4.12.5, 2024-01-29

### Notable Changes

- feat
  - membership
    - reading statistics for member page
    - reading count by timer and height
    - get analytics data from getUser
    - send analytics data to backend
    - my reading route
    - my reading page layout
    - saved bookmarks page
    - history page layout
    - add my-reading entry on member page with feature toggle
  - general
    - toggle bookmark on latest page
    - add `toastr` in CoreContext
    - add foundation category set
- chore
  - update @twreporter packages

### Commits

-[[`d470f7aa43`](https://github.com/twreporter/twreporter-react/commit/d470f7aa43)] - **chore**: hide bookmark on latest before bug resolved (Aylie Chou)

- [[`5406a2a31d`](https://github.com/twreporter/twreporter-react/commit/5406a2a31d)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`a1e1ba2118`](https://github.com/twreporter/twreporter-react/commit/a1e1ba2118)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`46ec823246`](https://github.com/twreporter/twreporter-react/commit/46ec823246)] - **fix**: add preview back (Lucien)
- [[`369d0c04a9`](https://github.com/twreporter/twreporter-react/commit/369d0c04a9)] - **fix**: http =\> https (Lucien)
- [[`22617e8807`](https://github.com/twreporter/twreporter-react/commit/22617e8807)] - **fix**: add dev host and change mastern host (Lucien)
- [[`8cf5f0451f`](https://github.com/twreporter/twreporter-react/commit/8cf5f0451f)] - **chore**: upadate twreporter packages (Lucien)
- [[`3801e3969c`](https://github.com/twreporter/twreporter-react/commit/3801e3969c)] - **chore**: update twreporter packages (Lucien)
- [[`bd24294871`](https://github.com/twreporter/twreporter-react/commit/bd24294871)] - **fix**: remove yalc (Lucien)
- [[`7a027bd7d1`](https://github.com/twreporter/twreporter-react/commit/7a027bd7d1)] - **fix**: title 2 spec change (Lucien)
- [[`94c636afe4`](https://github.com/twreporter/twreporter-react/commit/94c636afe4)] - **fix**: show loading and refresh page if no bookmarks (Lucien)
- [[`17b262ef43`](https://github.com/twreporter/twreporter-react/commit/17b262ef43)] - **fix**: resolve conflicts & todos (Aylie Chou)
- [[`263c6b27c6`](https://github.com/twreporter/twreporter-react/commit/263c6b27c6)] - **fix**: update myReading order in member page menu list (Aylie Chou)
- [[`0997d70fe4`](https://github.com/twreporter/twreporter-react/commit/0997d70fe4)] - **feat**: add my-reading entry on member page with feature toggle (Aylie Chou)
- [[`5a272053ae`](https://github.com/twreporter/twreporter-react/commit/5a272053ae)] - **chore**: update twreporter packages (Lucien)
- [[`8e551e035b`](https://github.com/twreporter/twreporter-react/commit/8e551e035b)] - Merge remote-tracking branch 'upstream/dev' into feature/my-reading-saved (Lucien)
- [[`4ffbeccf30`](https://github.com/twreporter/twreporter-react/commit/4ffbeccf30)] - **fix**: add isRequired (Lucien)
- [[`fc6d578e30`](https://github.com/twreporter/twreporter-react/commit/fc6d578e30)] - **fix**: fix comment (Lucien)
- [[`53ddba1a54`](https://github.com/twreporter/twreporter-react/commit/53ddba1a54)] - **chore**: update twreporter packages (Lucien)
- [[`4b02659825`](https://github.com/twreporter/twreporter-react/commit/4b02659825)] - **fix**: use renderButton for Title2 (Lucien)
- [[`da9b746b36`](https://github.com/twreporter/twreporter-react/commit/da9b746b36)] - **feat**: my reading page layout for test (Lucien)
- [[`5067ce6171`](https://github.com/twreporter/twreporter-react/commit/5067ce6171)] - **feat**: change redirect logic (Lucien)
- [[`3cb8de0c49`](https://github.com/twreporter/twreporter-react/commit/3cb8de0c49)] - **feat**: change test post (Lucien)
- [[`9c41192c74`](https://github.com/twreporter/twreporter-react/commit/9c41192c74)] - **feat**: add browsing history page (Lucien)
- [[`c73c369aa5`](https://github.com/twreporter/twreporter-react/commit/c73c369aa5)] - **feat**: my reading page and saved bookmarks page (Lucien)
- [[`a464f36ae1`](https://github.com/twreporter/twreporter-react/commit/a464f36ae1)] - **feat**: add data loader for my-reading page (Lucien)
- [[`9e5c4ff2ec`](https://github.com/twreporter/twreporter-react/commit/9e5c4ff2ec)] - **feat**: set feature toggle (Lucien)
- [[`ef0f639099`](https://github.com/twreporter/twreporter-react/commit/ef0f639099)] - **fix**: set isActive to false after visibility change to hidden (Lucien)
- [[`9d6ebc4d29`](https://github.com/twreporter/twreporter-react/commit/9d6ebc4d29)] - **fix**: set start reading time to now after active (Lucien)
- [[`3872177e55`](https://github.com/twreporter/twreporter-react/commit/3872177e55)] - **fix**: clear timer if visibility change (Lucien)
- [[`7097bbc998`](https://github.com/twreporter/twreporter-react/commit/7097bbc998)] - Merge remote-tracking branch 'upstream/dev' into fix/article-read-time-1 (Lucien)
- [[`0a3f40e3c2`](https://github.com/twreporter/twreporter-react/commit/0a3f40e3c2)] - **fix**: send active time after inactive (Lucien)
- [[`536f0b5c7c`](https://github.com/twreporter/twreporter-react/commit/536f0b5c7c)] - **fix**: trigger inactive timer (Lucien)
- [[`169ebf3e77`](https://github.com/twreporter/twreporter-react/commit/169ebf3e77)] - **fix**: use pagehide instead of beforeunload (Lucien)
- [[`c843c9d741`](https://github.com/twreporter/twreporter-react/commit/c843c9d741)] - **fix**: return true for history block (Lucien)
- [[`03a26097c2`](https://github.com/twreporter/twreporter-react/commit/03a26097c2)] - **fix**: add beforeunload eventListener (Lucien)
- [[`7095843788`](https://github.com/twreporter/twreporter-react/commit/7095843788)] - **chore**: update twreporter packages (Lucien)
- [[`96c4f66865`](https://github.com/twreporter/twreporter-react/commit/96c4f66865)] - **feat**: calculate active while visibility change (Lucien)
- [[`dae75c8008`](https://github.com/twreporter/twreporter-react/commit/dae75c8008)] - **fix**: fetch without authed (Lucien)
- [[`24994db9cd`](https://github.com/twreporter/twreporter-react/commit/24994db9cd)] - **feat**: send analytics data to backend while route change (Lucien)
- [[`4d3d72db38`](https://github.com/twreporter/twreporter-react/commit/4d3d72db38)] - **feat**: send analytics data to backend (Lucien)
- [[`7b4c1d9200`](https://github.com/twreporter/twreporter-react/commit/7b4c1d9200)] - **feat**: get analytics data from getUser (Lucien)
- [[`63fd00bac5`](https://github.com/twreporter/twreporter-react/commit/63fd00bac5)] - **fix**: typo (Lucien)
- [[`aa82c0ca8d`](https://github.com/twreporter/twreporter-react/commit/aa82c0ca8d)] - **fix**: change article retrigger read count (Lucien)
- [[`8ce1ba48fd`](https://github.com/twreporter/twreporter-react/commit/8ce1ba48fd)] - **feat**: renaming reading count timer (Lucien)
- [[`bf6b41106f`](https://github.com/twreporter/twreporter-react/commit/bf6b41106f)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`f2254181a2`](https://github.com/twreporter/twreporter-react/commit/f2254181a2)] - **fix**: reading_height & slug (Lucien)
- [[`58e41c813b`](https://github.com/twreporter/twreporter-react/commit/58e41c813b)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`189e832750`](https://github.com/twreporter/twreporter-react/commit/189e832750)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`d231f560f0`](https://github.com/twreporter/twreporter-react/commit/d231f560f0)] - **feat**: apply `FOUNDATION\_CATEGORY\_SET` feature flag (Aylie Chou)
- [[`e439d443ce`](https://github.com/twreporter/twreporter-react/commit/e439d443ce)] - **fix**: renaming constant (Lucien)
- [[`e6b4107c57`](https://github.com/twreporter/twreporter-react/commit/e6b4107c57)] - **feat**: reading count by timer and height (Lucien)
- [[`be376bc9ac`](https://github.com/twreporter/twreporter-react/commit/be376bc9ac)] - **chore**: update twreporter packages (Lucien)
- [[`8dade4e3bf`](https://github.com/twreporter/twreporter-react/commit/8dade4e3bf)] - **chore**: update twreporter packages (Lucien)
- [[`7a56ca2474`](https://github.com/twreporter/twreporter-react/commit/7a56ca2474)] - **fix**: use page text (Lucien)
- [[`20664e6a93`](https://github.com/twreporter/twreporter-react/commit/20664e6a93)] - **chore**: update twreporter packages (Lucien)
- [[`8d59721bfa`](https://github.com/twreporter/twreporter-react/commit/8d59721bfa)] - **fix**: typo (Lucien)
- [[`446410d1b2`](https://github.com/twreporter/twreporter-react/commit/446410d1b2)] - **fix**: set LocaleString to en-US (Lucien)
- [[`d11c7f0e5d`](https://github.com/twreporter/twreporter-react/commit/d11c7f0e5d)] - **feat**: reading statistics for member page (Lucien)
- [[`9fe0e90851`](https://github.com/twreporter/twreporter-react/commit/9fe0e90851)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`f71cc93370`](https://github.com/twreporter/twreporter-react/commit/f71cc93370)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`7439d5d5b7`](https://github.com/twreporter/twreporter-react/commit/7439d5d5b7)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`0678a0767f`](https://github.com/twreporter/twreporter-react/commit/0678a0767f)] - **fix**: add `toastr` in CoreContext & hide bookmark icon if user not authed (Aylie Chou)
- [[`a93a4646e7`](https://github.com/twreporter/twreporter-react/commit/a93a4646e7)] - **feat**: toggle bookmark on latest page (Aylie Chou)
- [[`d6207ae216`](https://github.com/twreporter/twreporter-react/commit/d6207ae216)] - **feat**: pass jwt token for getting bookmarkId data (Aylie Chou)

## 4.12.4, 2024-01-03

### Notable Changes

- feat
  - add animation for Skeleton component
  - add category page empty state
  - use @twreporter packages z-index
- chore
  - update @twreporter packages

### Commits

- [[`c9b6fed07c`](https://github.com/twreporter/twreporter-react/commit/c9b6fed07c)] - **feat**: add animation for Skeleton component (Aylie Chou)
- [[`d05057f238`](https://github.com/twreporter/twreporter-react/commit/d05057f238)] - **feat**: add category page empty state (Aylie Chou)
- [[`d56603a68c`](https://github.com/twreporter/twreporter-react/commit/d56603a68c)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`0e9a826a7c`](https://github.com/twreporter/twreporter-react/commit/0e9a826a7c)] - **chore**: sync master (Lucien)
- [[`9233215580`](https://github.com/twreporter/twreporter-react/commit/9233215580)] - **chore**: update twreporter packages (Lucien)
- [[`978d163ebf`](https://github.com/twreporter/twreporter-react/commit/978d163ebf)] - **feat**: use twreporter core z-index (Lucien)

## 4.12.3, 2023-12-21

### Notable Changes

- chore
  - update @twreporter packages

### Commits

- [[`b4acc29ad2`](https://github.com/twreporter/twreporter-react/commit/b4acc29ad2)] - **chore**: update twreporter packages (Lucien)

## 4.12.2, 2023-12-13

### Notable Changes

- chore
  - update @twreporter packages

### Commits

- [[`1c876f448f`](https://github.com/twreporter/twreporter-react/commit/1c876f448f)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`d7a917b089`](https://github.com/twreporter/twreporter-react/commit/d7a917b089)] - **chore**: update twreporter packages (Lucien)
- [[`f20751e1cb`](https://github.com/twreporter/twreporter-react/commit/f20751e1cb)] - **chore**: update @twreporter packages (Aylie Chou)

## 4.12.1, 2023-11-20

### Notable Changes

- feat
  - add article card skeleton & use load more in latest page
  - add kids newsletter subscription link in member page
  - show article bottom banner by role
- fix
  - add space after last post card
  - article page banner roles
  - kids link type should be `undeline`
- chore
  - update @twreporter packages

### Commits

- [[`c8ccb0c1d4`](https://github.com/twreporter/twreporter-react/commit/c8ccb0c1d4)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`ab9f4b77b6`](https://github.com/twreporter/twreporter-react/commit/ab9f4b77b6)] - **fix**: add space after last post card (Aylie Chou)
- [[`0fb54394af`](https://github.com/twreporter/twreporter-react/commit/0fb54394af)] - **fix**: typo role =\> roles (Lucien)
- [[`a50fa4e06d`](https://github.com/twreporter/twreporter-react/commit/a50fa4e06d)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`d347270e7a`](https://github.com/twreporter/twreporter-react/commit/d347270e7a)] - **fix**: kids link type should be `underline` (Aylie Chou)
- [[`48c0e391e4`](https://github.com/twreporter/twreporter-react/commit/48c0e391e4)] - **feat**: add article card skeleton & use load more in latest (Aylie Chou)
- [[`688d8f7f68`](https://github.com/twreporter/twreporter-react/commit/688d8f7f68)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`6820a04818`](https://github.com/twreporter/twreporter-react/commit/6820a04818)] - **feat**: add kids newsletter subscription link in member page (Aylie Chou)
- [[`a162974fba`](https://github.com/twreporter/twreporter-react/commit/a162974fba)] - **fix**: add isRequired to userRole (Lucien)
- [[`ec2153c46a`](https://github.com/twreporter/twreporter-react/commit/ec2153c46a)] - **feat**: show article bottom banner by role (Lucien)
- [[`4b3110ab09`](https://github.com/twreporter/twreporter-react/commit/4b3110ab09)] - Merge branch 'twreporter:master' into master (Lucien)
- [[`7831655713`](https://github.com/twreporter/twreporter-react/commit/7831655713)] - **fix**: changelog (Lucien)

## 4.12.0, 2023-11-01

### Notable Changes

- feat
  - login page for account page
- chore
  - update @twreporter packages

### Commits

- [[`c0dc04a5f2`](https://github.com/twreporter/twreporter-react/commit/c0dc04a5f2)] - **chore**: update reporter packages (Lucien)
- [[`6d8c281ea4`](https://github.com/twreporter/twreporter-react/commit/6d8c281ea4)] - **feat**: condition (Lucien)
- [[`2c728991a7`](https://github.com/twreporter/twreporter-react/commit/2c728991a7)] - **feat**: use matchPath (Lucien)
- [[`0eed92bede`](https://github.com/twreporter/twreporter-react/commit/0eed92bede)] - **feat**: login page for member page (Lucien)

## 4.11.3, 2023-10-30

### Notable Changes

- feat
  - change about-us page line height
  - article bottom banner
  - new user role
- chore
  - update @twreporter packages
- fix
  - update access token name & use wildcard domain

### Commits

- [[`f041c64751`](https://github.com/twreporter/twreporter-react/commit/f041c64751)] - **fix**: update access token name & use wildcard domain (Aylie Chou)
- [[`50afad7995`](https://github.com/twreporter/twreporter-react/commit/50afad7995)] - **chore**: update twreporter packages (Lucien)
- [[`12e387cae1`](https://github.com/twreporter/twreporter-react/commit/12e387cae1)] - Merge remote-tracking branch 'upstream/master' into feature/new-user-role (Lucien)
- [[`4587783b2c`](https://github.com/twreporter/twreporter-react/commit/4587783b2c)] - **fix**: fix comment (Lucien)
- [[`5e698493dc`](https://github.com/twreporter/twreporter-react/commit/5e698493dc)] - **feat**: new user role (Lucien)
- [[`7aee2eb149`](https://github.com/twreporter/twreporter-react/commit/7aee2eb149)] - **chore**: update twreporter packages (Lucien)
- [[`9a78971ccd`](https://github.com/twreporter/twreporter-react/commit/9a78971ccd)] - Merge remote-tracking branch 'upstream/master' into feature/article-bottom-banner (Lucien)
- [[`14149be29a`](https://github.com/twreporter/twreporter-react/commit/14149be29a)] - **fix**: fix comment (Lucien)
- [[`d2ac234bbf`](https://github.com/twreporter/twreporter-react/commit/d2ac234bbf)] - **feat**: article bottom banner (Lucien)
- [[`132de1a533`](https://github.com/twreporter/twreporter-react/commit/132de1a533)] - **feat**: section03 line height (Lucien)

## 4.11.2, 2023-10-11

### Notable Changes

- feat
  - update about-us page
  - change donation link anchor
- chore
  - update @twreporter packages
- fix
  - fix about-us page

### Commits

- [[`47ad39646f`](https://github.com/twreporter/twreporter-react/commit/47ad39646f)] - **fix**: format (Lucien)
- [[`874c003367`](https://github.com/twreporter/twreporter-react/commit/874c003367)] - **fix**: use categroiesAll order (Lucien)
- [[`2d81ea3bb6`](https://github.com/twreporter/twreporter-react/commit/2d81ea3bb6)] - **fix**: white space (Lucien)
- [[`4a991973fc`](https://github.com/twreporter/twreporter-react/commit/4a991973fc)] - **fix**: add new award and sorting (Lucien)
- [[`9bd947b9ca`](https://github.com/twreporter/twreporter-react/commit/9bd947b9ca)] - Merge remote-tracking branch 'upstream/master' into feature/new-about-us (Lucien)
- [[`afc8f87af8`](https://github.com/twreporter/twreporter-react/commit/afc8f87af8)] - **feat**: update about-us page
- [[`098e2540f7`](https://github.com/twreporter/twreporter-react/commit/098e2540f7)] - **chore**: update twreporter packages (Lucien)
- [[`69eee10864`](https://github.com/twreporter/twreporter-react/commit/69eee10864)] - **feat**: change donation anchor (Lucien)

## 4.11.1, 2023-09-21

### Notable Changes

- chore
  - upgrade node to v18.17.1 (LTS)
  - import swiper css
  - update @twreporter packages

### Commits

- [[`2c0c894953`](https://github.com/twreporter/twreporter-react/commit/2c0c894953)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`5c086f564e`](https://github.com/twreporter/twreporter-react/commit/5c086f564e)] - **chore**: update twreporter packages (Lucien)
- [[`83fad64b77`](https://github.com/twreporter/twreporter-react/commit/83fad64b77)] - **chore**: update twreporter packages (Lucien)
- [[`77f2a95c56`](https://github.com/twreporter/twreporter-react/commit/77f2a95c56)] - **chore**: update twreporter packages (Lucien)
- [[`886083038c`](https://github.com/twreporter/twreporter-react/commit/886083038c)] - **chore**: update twreporter packages (Lucien)
- [[`6ea223de54`](https://github.com/twreporter/twreporter-react/commit/6ea223de54)] - **chore**: update twreporter packages (Lucien)
- [[`cf3a18b0f4`](https://github.com/twreporter/twreporter-react/commit/cf3a18b0f4)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`56f0f2754c`](https://github.com/twreporter/twreporter-react/commit/56f0f2754c)] - **chore**: upgrade node to v18.17.1 (LTS) (Aylie Chou)
- [[`94ba11d5bc`](https://github.com/twreporter/twreporter-react/commit/94ba11d5bc)] - **chore**: update twreporter packages (Lucien)

## 4.11.0, 2023-09-04

### Notable Changes

- feat
  - account page and booklist page metadata
  - add account page
  - add membership promo champaign
- fix
  - add releaseBranch to BookmarkList
  - do not show membership promo when open hamburger menu
  - wrap member data text when overflow
  - bottom banner style
  - do not show membership promo when user is authed
  - change photography font weight
  - regarding user unauthenticated if they're deactivated
  - check member page auth state when csr
  - mobile logout fail on `dev` env
- chore
  - update @twreporter packages
  - remove deprecated `getLogoutLink` method
  - add dev gtm env
  - update circle ci config for dev branch
- refactor
  - update response Cache-Control header value

### Commits

- [[`c225079ebe`](https://github.com/twreporter/twreporter-react/commit/c225079ebe)] - **fix**: forget to pass `releaseBranch` into `BookmarkList` (nickhsine)
- [[`d98c334b27`](https://github.com/twreporter/twreporter-react/commit/d98c334b27)] - **chore**: update twreporter packages (Lucien)
- [[`bbd429e176`](https://github.com/twreporter/twreporter-react/commit/bbd429e176)] - Merge pull request #2605 from nickhsine/update-cache-control (nick)
- [[`8d9961893e`](https://github.com/twreporter/twreporter-react/commit/8d9961893e)] - **refactor**: update response Cache-Control header value (nickhsine)
- [[`da0dbe5692`](https://github.com/twreporter/twreporter-react/commit/da0dbe5692)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`cf7b9b6ee3`](https://github.com/twreporter/twreporter-react/commit/cf7b9b6ee3)] - **fix**: do not show membership promo when open hamburger menu (Aylie Chou)
- [[`d41d8d90b7`](https://github.com/twreporter/twreporter-react/commit/d41d8d90b7)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`48b77546d8`](https://github.com/twreporter/twreporter-react/commit/48b77546d8)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`27d82f6df8`](https://github.com/twreporter/twreporter-react/commit/27d82f6df8)] - **fix**: wrap member data text when overflow (Aylie Chou)
- [[`a7889b6c5f`](https://github.com/twreporter/twreporter-react/commit/a7889b6c5f)] - **chore**: update reporter packages (Lucien)
- [[`5452ab21e2`](https://github.com/nodejs/node/commit/5452ab21e2)] - **fix**: bottom banner style (Aylie Chou)
- [[`306cf1a231`](https://github.com/nodejs/node/commit/306cf1a231)] - **fix**: do not show membership promo when user is authed (Aylie Chou)
- [[`bdea4bcb8a`](https://github.com/twreporter/twreporter-react/commit/bdea4bcb8a)] - **feat**: fix typo and use matchPath (Lucien)
- [[`f18ecde040`](https://github.com/twreporter/twreporter-react/commit/f18ecde040)] - **feat**: booklist page metadata (Lucien)
- [[`d58c46ae7d`](https://github.com/twreporter/twreporter-react/commit/d58c46ae7d)] - **fix**: change font weight to normal (Lucien)

- [[`dfec7c58e0`](https://github.com/twreporter/twreporter-react/commit/dfec7c58e0)] - **chore**: update version to 4.10.5-beta.21 (nickhsine)
- [[`3abe81f430`](https://github.com/twreporter/twreporter-react/commit/3abe81f430)] - **chore**: upgrade @twreporter deps (nickhsine)
- [[`ef18531ea4`](https://github.com/twreporter/twreporter-react/commit/ef18531ea4)] - **fix**: `closePromo` been called in unexpected place (Aylie Chou)
- [[`01f0c36e82`](https://github.com/twreporter/twreporter-react/commit/01f0c36e82)] - **fix**: defects (Aylie Chou)
- [[`638f58408a`](https://github.com/twreporter/twreporter-react/commit/638f58408a)] - **fix**: /topics/:slug page should not appear promo (Aylie Chou)
- [[`bba82ffbf1`](https://github.com/twreporter/twreporter-react/commit/bba82ffbf1)] - **fix**: close model when clicking more button (Aylie Chou)
- [[`daceac0e74`](https://github.com/twreporter/twreporter-react/commit/daceac0e74)] - **fix**: disable background scrolling when popup open (Aylie Chou)
- [[`4ffa4f39ff`](https://github.com/twreporter/twreporter-react/commit/4ffa4f39ff)] - **fix**: address review comments (Aylie Chou)
- [[`fcf9130dcb`](https://github.com/twreporter/twreporter-react/commit/fcf9130dcb)] - **fix**: react error `nothing was returned from render` (Aylie Chou)
- [[`621118b006`](https://github.com/twreporter/twreporter-react/commit/621118b006)] - **fix**: regarding user unauthenticated if they're deactivated (Aylie Chou)
- [[`dda8b03648`](https://github.com/twreporter/twreporter-react/commit/dda8b03648)] - **fix**: check member page auth state when csr (Aylie Chou)
- [[`b1b6c70727`](https://github.com/twreporter/twreporter-react/commit/b1b6c70727)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`ea52e7c176`](https://github.com/twreporter/twreporter-react/commit/ea52e7c176)] - **fix**: mobile logout fail on `dev` env (Aylie Chou)
- [[`6a729cbffc`](https://github.com/twreporter/twreporter-react/commit/6a729cbffc)] - **fix**: change showing text (Lucien)
- [[`4b9692fbf0`](https://github.com/twreporter/twreporter-react/commit/4b9692fbf0)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`c15a78e8e6`](https://github.com/twreporter/twreporter-react/commit/c15a78e8e6)] - **fix**: specify logout redirect destination (Aylie Chou)
- [[`82ab2f84cd`](https://github.com/twreporter/twreporter-react/commit/82ab2f84cd)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`d1797a6caf`](https://github.com/twreporter/twreporter-react/commit/d1797a6caf)] - **fix**: add auth requirement for account page and fix logout path (Lucien)
- [[`a3b5b1e54f`](https://github.com/twreporter/twreporter-react/commit/a3b5b1e54f)] - Merge pull request #2534 from liruchen32/feature/getUser (Lucien)
- [[`b70064dcaf`](https://github.com/twreporter/twreporter-react/commit/b70064dcaf)] - **chore**: update npm packages (Lucien)
- [[`24e75507cf`](https://github.com/twreporter/twreporter-react/commit/24e75507cf)] - **fix**: remove deprecated `getLogoutLink` method (Aylie Chou)
- [[`ac261e53dc`](https://github.com/twreporter/twreporter-react/commit/ac261e53dc)] - **feat**: change route to account (Lucien)
- [[`2bc24ff7ed`](https://github.com/twreporter/twreporter-react/commit/2bc24ff7ed)] - Merge pull request #2522 from liruchen32/fix/fix-email-subscription-page (Lucien)
- [[`938ef7c286`](https://github.com/twreporter/twreporter-react/commit/938ef7c286)] - **chore**: add dev gtm env (Lucien)
- [[`9d8187ab85`](https://github.com/twreporter/twreporter-react/commit/9d8187ab85)] - Merge pull request #2518 from liruchen32/fix/fix-donation-page (Lucien)
- [[`fadcb542cb`](https://github.com/twreporter/twreporter-react/commit/fadcb542cb)] - **chore**: update circleci config (Lucien)
- [[`5a6e3921d5`](https://github.com/twreporter/twreporter-react/commit/5a6e3921d5)] - Merge pull request #2511 from liruchen32/feature/email-subscription-page (Lucien)
- [[`6e2a1236ba`](https://github.com/twreporter/twreporter-react/commit/6e2a1236ba)] - Merge pull request #2510 from liruchen32/fix/fix-member-page-padding (Lucien)
- [[`bd89187`](https://github.com/twreporter/twreporter-react/commit/bd89187)] - Merge pull request #2496 from liruchen32/fix/member-page-grid (Lucien Lu)
- [[`0cd21d9`](https://github.com/twreporter/twreporter-react/commit/0cd21d9)] - Merge pull request #2488 from liruchen32/feature/member-page (Lucien Lu)

## 4.10.8, 2023-07-28

## Notable Changes

- chore
  - update @twreporter/react-components@^8.18.1-rc.5

## Commits

- [[`f981298df7`](https://github.com/twreporter/twreporter-react/commit/f981298df7)] - **chore**: update version to 4.10.8 and upgrade @twreporter/react-compoennts (nickhsine)
- [[`ef87700162`](https://github.com/twreporter/twreporter-react/commit/ef87700162)] - Merge pull request #2571 from nickhsine/master (nick)

## 4.10.7, 2023-07-24

## Notable Changes

- chore
  - update @twreporter/redux@^7.7.0-rc.3

## Commits

- [[`1d46e17a07`](https://github.com/twreporter/twreporter-react/commit/1d46e17a07)] - **chore**: bump to @4.10.7 stable version (nickhsine)

* [[`7b1ee2a43e`](https://github.com/twreporter/twreporter-react/commit/7b1ee2a43e)] - Merge pull request #2566 from nickhsine/master (nick)
* [[`3aa65ffab9`](https://github.com/twreporter/twreporter-react/commit/3aa65ffab9)] - **chore**: bump version to 4.10.7-rc.0 (nickhsine)

- [[`58a5ce3aa6`](https://github.com/twreporter/twreporter-react/commit/58a5ce3aa6)] - Merge pull request #2565 from nickhsine/master (nick)
- [[`3444bc95d2`](https://github.com/twreporter/twreporter-react/commit/3444bc95d2)] - **chore**: update @twreporter/redux to ^7.7.0-rc.3 (nickhsine)

## 4.10.6, 2023-07-11

## Notable Changes

- fix
  - add mock method for latest page
  - use official hosted `lottie` package
  - load polyfill on usage
  - apply `babel-loader` on react-article-components
  - import winston module with require
  - replace all old url with new URL
  - use original url.parse
- chore
  - revert `remove @babel/plugin-transfor-runtime`
  - remove info struct feature toggle
  - update @twreporter packages

## Commits

- [[`b03bd93994`](https://github.com/twreporter/twreporter-react/commit/b03bd93994)] - **_Revert_** "**fix**: remove @babel/plugin-transform-runtime" (Aylie)
- [[`23a4c2f0dc`](https://github.com/twreporter/twreporter-react/commit/23a4c2f0dc)] - **fix**: load polyfill on usage (Aylie Chou)
- [[`14161b0cb0`](https://github.com/twreporter/twreporter-react/commit/14161b0cb0)] - **fix**: use official hosted `lottie` package (Aylie Chou)
- [[`4fbbdde066`](https://github.com/twreporter/twreporter-react/commit/4fbbdde066)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`1d723ce209`](https://github.com/twreporter/twreporter-react/commit/1d723ce209)] - **chore**: remove info struct feature toggle (Aylie Chou)
- [[`6a77576c53`](https://github.com/twreporter/twreporter-react/commit/6a77576c53)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`60d77a94ba`](https://github.com/twreporter/twreporter-react/commit/60d77a94ba)] - **fix**: remove @babel/plugin-transform-runtime (Aylie Chou)
- [[`c43e46eaec`](https://github.com/twreporter/twreporter-react/commit/c43e46eaec)] - **chore**: update node version to 16.14.2 (Lucien)
- [[`9ad4e36c99`](https://github.com/twreporter/twreporter-react/commit/9ad4e36c99)] - **fix**: apply `babel-loader` on react-article-components (Aylie Chou)
- [[`52418c707d`](https://github.com/twreporter/twreporter-react/commit/52418c707d)] - **chore**: update twreporter packages (Lucien)
- [[`99607683e7`](https://github.com/twreporter/twreporter-react/commit/99607683e7)] - **chore**: update twreporter packages (Lucien)
- [[`bade2d9910`](https://github.com/twreporter/twreporter-react/commit/bade2d9910)] - **fix**: import winston module with require (Aylie Chou)
- [[`09340303e3`](https://github.com/twreporter/twreporter-react/commit/09340303e3)] - Merge pull request #2513 from Aylie-Chou/12-fix-support-mock-latest (Aylie)
- [[`b6cf05f725`](https://github.com/twreporter/twreporter-react/commit/b6cf05f725)] - **chore**: downgrade to node v12.22.12 (Lucien)
- [[`aaa31e19a9`](https://github.com/twreporter/twreporter-react/commit/aaa31e19a9)] - **fix**: replace all old url with new URL (Lucien)
- [[`cb040c3431`](https://github.com/twreporter/twreporter-react/commit/cb040c3431)] - **fix**: use original url.parse (Lucien Lu)
- [[`3159ecbd1b`](https://github.com/twreporter/twreporter-react/commit/3159ecbd1b)] - **fix**: replace url.URL with new URL (Lucien Lu)

## 4.10.5, 2023-05-30

### Notable Changes

- fix
  - kids reporter name in about us page
- chore
  - upgrade node to v16
  - upgrade babel to ^7.4.0

### Commits

- [[`77302ba0fa`](https://github.com/twreporter/twreporter-react/commit/77302ba0fa)] - **fix**: kids reporter name in about us page (Aylie Chou)
- [[`18331891d8`](https://github.com/twreporter/twreporter-react/commit/18331891d8)] - **fix**: replace deprecated url.parse with url.URL (duidae)
- [[`7a29ed737b`](https://github.com/twreporter/twreporter-react/commit/7a29ed737b)] - **chore**: upgrade node to v16 (duidae)
- [[`6dae1aea82`](https://github.com/twreporter/twreporter-react/commit/6dae1aea82)] - **fix**: fix regenerationRuntime not defined error (Aylie Chou)
- [[`4f2fa55e92`](https://github.com/twreporter/twreporter-react/commit/4f2fa55e92)] - **chore**: upgrade babel to ^7.4.0 (Aylie Chou)

## 4.10.4, 2023-05-12

### Notable Changes

- chore
  - update @twreporter packages
    - fix universal-header z-index problem

### Commits

- [[`41bd11522c`](https://github.com/twreporter/twreporter-react/commit/41bd11522c)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`6178213443`](https://github.com/twreporter/twreporter-react/commit/6178213443)] - **chore**: update @twreporter packages (Aylie Chou)

## 4.10.3, 2023-05-12

### Notable Changes

- fix
  - transparent tab bar scroll not smoothly
- chore
  - update @twreporter packages
    - fix index page latest section category wording

### Commits

- [[`71b5af13c8`](https://github.com/twreporter/twreporter-react/commit/71b5af13c8)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`ceb62634ce`](https://github.com/twreporter/twreporter-react/commit/ceb62634ce)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`d66b86ffb3`](https://github.com/twreporter/twreporter-react/commit/d66b86ffb3)] - **fix**: transparent tab bar scroll not smoothly (Aylie Chou)

## 4.10.2, 2023-05-09

### Notable Changes

- chore
  - use @material-symbols/font400 to reduce bundle size
  - update @twreporter packages
    - fix tab bar style in transparent theme

### Commits

- [[`7e33d6c43a`](https://github.com/twreporter/twreporter-react/commit/7e33d6c43a)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`62c9a6c2aa`](https://github.com/twreporter/twreporter-react/commit/62c9a6c2aa)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`ec5a995afb`](https://github.com/twreporter/twreporter-react/commit/ec5a995afb)] - **chore**: use @material-symbols/font400 to reduce bundle size (Aylie Chou)

## 4.10.1, 2023-05-09

### Notable Changes

- feat
  - enable new info structure feature toggle
- fix
  - add font smoothing
  - use CardList component for Latest posts
- chore
  - support dev branch
  - add webpack loader for css & font files
    - style-loader, css-loader, url-loader
  - update webpack server default port from 5000 to 5050
  - update @twreporter components

### Commits

- [[`1f96f886b9`](https://github.com/twreporter/twreporter-react/commit/1f96f886b9)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`2f3cf45c6b`](https://github.com/twreporter/twreporter-react/commit/2f3cf45c6b)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`88abfb19b6`](https://github.com/twreporter/twreporter-react/commit/88abfb19b6)] - **fix**: mobile category page style (Aylie Chou)
- [[`f8bb42abc3`](https://github.com/twreporter/twreporter-react/commit/f8bb42abc3)] - **fix**: latest page mobile style (Aylie Chou)
- [[`664cae1a92`](https://github.com/twreporter/twreporter-react/commit/664cae1a92)] - **_Revert_** "**chore**: remove useless dependency `file-loader`" (Aylie Chou)
- [[`558a0922ac`](https://github.com/twreporter/twreporter-react/commit/558a0922ac)] - **chore**: remove useless dependency `file-loader` (Aylie Chou)
- [[`aeb95f8301`](https://github.com/twreporter/twreporter-react/commit/aeb95f8301)] - **chore**: update @twreporter components (Aylie Chou)
- [[`093c416df6`](https://github.com/twreporter/twreporter-react/commit/093c416df6)] - **fix**: add webpack loader for css & font files (Aylie Chou)
- [[`114645cc56`](https://github.com/twreporter/twreporter-react/commit/114645cc56)] - _**Revert**_ "Revert "Revert "Revert "fix: fix topic top padding"""" (#2347)" (許守傑 Shou-Chieh Hsu (Jason))
- [[`27b18ddeda`](https://github.com/twreporter/twreporter-react/commit/27b18ddeda)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`fc0ea44bc9`](https://github.com/twreporter/twreporter-react/commit/fc0ea44bc9)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`892897789b`](https://github.com/twreporter/twreporter-react/commit/892897789b)] - **fix**: tag list should show `category` info (Aylie Chou)
- [[`a515b74605`](https://github.com/twreporter/twreporter-react/commit/a515b74605)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`c99c7fd79a`](https://github.com/twreporter/twreporter-react/commit/c99c7fd79a)] - Merge pull request #2431 from sharils/change-webpack-dev-server-port-2430 (Lucien)
- [[`6b7004ec45`](https://github.com/twreporter/twreporter-react/commit/6b7004ec45)] - Merge pull request #2442 from duidae/jason/feature_branch_mainsite (許守傑 Shou-Chieh Hsu (Jason))
- [[`ba103237be`](https://github.com/twreporter/twreporter-react/commit/ba103237be)] - **feat**: enable dev branc (duidae)
- [[`3d4126007d`](https://github.com/twreporter/twreporter-react/commit/3d4126007d)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`88d4a53fbd`](https://github.com/twreporter/twreporter-react/commit/88d4a53fbd)] - **fix**: latest title bar style (Aylie Chou)
- [[`062e696e4e`](https://github.com/twreporter/twreporter-react/commit/062e696e4e)] - **fix**: update naming (Aylie Chou)
- [[`9d3e2f748b`](https://github.com/twreporter/twreporter-react/commit/9d3e2f748b)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`8ec2b12796`](https://github.com/twreporter/twreporter-react/commit/8ec2b12796)] - **fix**: use CardList component for Latest posts (Aylie Chou)
- [[`b45423f7a6`](https://github.com/twreporter/twreporter-react/commit/b45423f7a6)] - **fix**: add font smoothing (#2433) (許守傑 Shou-Chieh Hsu (Jason))
- [[`5a319042a3`](https://github.com/twreporter/twreporter-react/commit/5a319042a3)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`f25136c8b0`](https://github.com/twreporter/twreporter-react/commit/f25136c8b0)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`a6cee0d228`](https://github.com/twreporter/twreporter-react/commit/a6cee0d228)] - **fix**: latest tag order (Aylie Chou)
- [[`7ec0ad7530`](https://github.com/twreporter/twreporter-react/commit/7ec0ad7530)] - **chore**: apply feature toggle on header (Aylie Chou)
- [[`a4b5901634`](https://github.com/twreporter/twreporter-react/commit/a4b5901634)] - **chore**: update @twreporter packages (Aylie Chou)

## 4.10.0, 2023-02-23

### Notable Changes

- feat
  - add latest page
- fix
  - about-us
    - section2 intro wording
    - update awards order & add new awards
- chore
  - update @twreporter packages

### Commits

- [[`0dcccd9c90`](https://github.com/twreporter/twreporter-react/commit/0dcccd9c90)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`e42ad803f2`](https://github.com/twreporter/twreporter-react/commit/e42ad803f2)] - **chore**: force to use old universal-header (Aylie Chou)
- [[`9d8be757e7`](https://github.com/twreporter/twreporter-react/commit/9d8be757e7)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`bffa611070`](https://github.com/twreporter/twreporter-react/commit/bffa611070)] - Merge pull request #2403 from duidae/jason/upgrade_npm_packs_subcategory_path (許守傑 Shou-Chieh Hsu (Jason))
- [[`8cc4172b32`](https://github.com/twreporter/twreporter-react/commit/8cc4172b32)] - **chore**: update npm packages to fix subcategory path issue (duidae)
- [[`759ee763d6`](https://github.com/twreporter/twreporter-react/commit/759ee763d6)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`4da1d4c728`](https://github.com/twreporter/twreporter-react/commit/4da1d4c728)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`f20a53a7f5`](https://github.com/twreporter/twreporter-react/commit/f20a53a7f5)] - **fix**: show latest tags sorting with latest_order (Aylie Chou)
- [[`bac55fb661`](https://github.com/twreporter/twreporter-react/commit/bac55fb661)] - Merge pull request #2394 from duidae/jason/upgrade_npm_packages_object_fromentries (許守傑 Shou-Chieh Hsu (Jason))
- [[`981cad4f9e`](https://github.com/twreporter/twreporter-react/commit/981cad4f9e)] - **chore**: upgrade npm package for fixing object.fromentries issue (duidae)
- [[`f49cbbeb3d`](https://github.com/twreporter/twreporter-react/commit/f49cbbeb3d)] - Merge pull request #2389 from twreporter/revert-2385-jason/revert_url_parse (許守傑 Shou-Chieh Hsu (Jason))
- [[`54db11379d`](https://github.com/twreporter/twreporter-react/commit/54db11379d)] - _**Revert**_ "Jason/revert url parse" (許守傑 Shou-Chieh Hsu (Jason))
- [[`e0528e7597`](https://github.com/twreporter/twreporter-react/commit/e0528e7597)] - Merge pull request #2385 from duidae/jason/revert_url_parse (許守傑 Shou-Chieh Hsu (Jason))
- [[`bac917cf53`](https://github.com/twreporter/twreporter-react/commit/bac917cf53)] - **fix**: restore to url.parse (duidae)
- [[`c514d06118`](https://github.com/twreporter/twreporter-react/commit/c514d06118)] - Merge pull request #2382 from twreporter/revert-2376-jason/update_ci_node (許守傑 Shou-Chieh Hsu (Jason))
- [[`40e460adff`](https://github.com/twreporter/twreporter-react/commit/40e460adff)] - _**Revert**_ "**fix**: sync node version with npm packages" (許守傑 Shou-Chieh Hsu (Jason))
- [[`07403378dc`](https://github.com/twreporter/twreporter-react/commit/07403378dc)] - Merge pull request #2376 from duidae/jason/update_ci_node (許守傑 Shou-Chieh Hsu (Jason))
- [[`d70b149886`](https://github.com/twreporter/twreporter-react/commit/d70b149886)] - **chore**: update npm packages (duidae)
- [[`b1b7b74f71`](https://github.com/twreporter/twreporter-react/commit/b1b7b74f71)] - Merge branch 'master' into jason/update_ci_node (duidae)
- [[`d8bc3bdf04`](https://github.com/twreporter/twreporter-react/commit/d8bc3bdf04)] - Merge pull request #2378 from duidae/jason/bump_version_v4.10.0-rc.5 (許守傑 Shou-Chieh Hsu (Jason))
- [[`0765757fdd`](https://github.com/twreporter/twreporter-react/commit/0765757fdd)] - **chore**: bump version 4.10.0-rc.5 (duidae)
- [[`e70b52439c`](https://github.com/twreporter/twreporter-react/commit/e70b52439c)] - Merge pull request #2377 from twreporter/revert-2373-jason/update_npm_packages (許守傑 Shou-Chieh Hsu (Jason))
- [[`8859d5a4e0`](https://github.com/twreporter/twreporter-react/commit/8859d5a4e0)] - _**Revert**_ "**chore**: update npm packages" (許守傑 Shou-Chieh Hsu (Jason))
- [[`bb3af7ac2d`](https://github.com/twreporter/twreporter-react/commit/bb3af7ac2d)] - Merge pull request #2373 from duidae/jason/update_npm_packages (許守傑 Shou-Chieh Hsu (Jason))
- [[`06c7dfc001`](https://github.com/twreporter/twreporter-react/commit/06c7dfc001)] - **chore**: update npm packages (duidae)
- [[`9f6c6d2dc4`](https://github.com/twreporter/twreporter-react/commit/9f6c6d2dc4)] - Merge pull request #2370 from duidae/jason/update_npm_packages (許守傑 Shou-Chieh Hsu (Jason))
- [[`b964f3149b`](https://github.com/twreporter/twreporter-react/commit/b964f3149b)] - **chore**: update npm packages (duidae)
- [[`bbc9f1428e`](https://github.com/twreporter/twreporter-react/commit/bbc9f1428e)] - **fix**: about-us section2 intro wording (Aylie Chou)
- [[`858682b70c`](https://github.com/twreporter/twreporter-react/commit/858682b70c)] - **fix**: update awards order & add new awards (Aylie Chou)
- [[`5c828c93f0`](https://github.com/twreporter/twreporter-react/commit/5c828c93f0)] - Merge pull request #2365 from duidae/jason/upgrade_react_article_component (許守傑 Shou-Chieh Hsu (Jason))
- [[`019d9a70a5`](https://github.com/twreporter/twreporter-react/commit/019d9a70a5)] - **chore**: upgrade react-article-component (duidae)
- [[`108cda660f`](https://github.com/twreporter/twreporter-react/commit/108cda660f)] - **chore**: apply universal-header with feature toggle (Aylie Chou)
- [[`b2915ab172`](https://github.com/twreporter/twreporter-react/commit/b2915ab172)] - **chore**: update @twerporter packages (Aylie Chou)
- [[`ac2670c5c5`](https://github.com/twreporter/twreporter-react/commit/ac2670c5c5)] - **fix**: address review comment (Aylie Chou)
- [[`eb85162412`](https://github.com/twreporter/twreporter-react/commit/eb85162412)] - **chore**: remove testing change (Aylie Chou)
- [[`84d17738e2`](https://github.com/twreporter/twreporter-react/commit/84d17738e2)] - **feat**: add latest page (Aylie Chou)

## 4.9.8, 2023-01-12

### Notable Changes

- chore
  - use new context (twreporter-react)

### Commits

- [[`8e0e91ab34`](https://github.com/twreporter/twreporter-react/commit/8e0e91ab34)] - **fix**: modify circleci config for new context (Aylie Chou)

## 4.9.7, 2023-01-06

### Notable Changes

- chore
  - update @twreporter packages
    - update 2023 fundraising number
    - force to use old universal-header
- fix
  - pass referrer location from react-router-dom for spa
  - fix gke auth error in ci flow
  - refine design details for new info arch

### Commits

- [[`73c504e467`](https://github.com/twreporter/twreporter-react/commit/73c504e467)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`56d2093e3d`](https://github.com/twreporter/twreporter-react/commit/56d2093e3d)] - **chore**: force to use old universal-header (Aylie Chou)
- [[`41e9c05334`](https://github.com/twreporter/twreporter-react/commit/41e9c05334)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`166c62a480`](https://github.com/twreporter/twreporter-react/commit/166c62a480)] - Merge pull request #2344 from duidae/jason/revert_style_refinement_PR (許守傑 Shou-Chieh Hsu (Jason))
- [[`1d2e9ba4b8`](https://github.com/twreporter/twreporter-react/commit/1d2e9ba4b8)] - **fix**: restore npm packages (duidae)
- [[`b49197837b`](https://github.com/twreporter/twreporter-react/commit/b49197837b)] - _**Revert**_ "Revert "Revert "fix: fix topic top padding""" (duidae)
- [[`e535b30c9c`](https://github.com/twreporter/twreporter-react/commit/e535b30c9c)] - Merge pull request #2340 from duidae/jason/fix_tag_mobile_layout (許守傑 Shou-Chieh Hsu (Jason))
- [[`85a73eb8d9`](https://github.com/twreporter/twreporter-react/commit/85a73eb8d9)] - **fix**: fix tag page mobile layout issue (duidae)
- [[`118aa2518c`](https://github.com/twreporter/twreporter-react/commit/118aa2518c)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`664e76a256`](https://github.com/twreporter/twreporter-react/commit/664e76a256)] - **fix**: pass referrer location from react-router-dom for spa (Aylie Chou)
- [[`cbf4c23a2b`](https://github.com/twreporter/twreporter-react/commit/cbf4c23a2b)] - Merge pull request #2334 from duidae/jason/remove_install_plugin (許守傑 Shou-Chieh Hsu (Jason))
- [[`34633d5cc8`](https://github.com/twreporter/twreporter-react/commit/34633d5cc8)] - **fix**: remove install command (duidae)
- [[`63014e7db7`](https://github.com/twreporter/twreporter-react/commit/63014e7db7)] - Merge pull request #2331 from duidae/jason/install_gke_auth_plugin (許守傑 Shou-Chieh Hsu (Jason))
- [[`e572539d7d`](https://github.com/twreporter/twreporter-react/commit/e572539d7d)] - **fix**: install gke auth plugin (duidae)
- [[`58eb5a70bb`](https://github.com/twreporter/twreporter-react/commit/58eb5a70bb)] - Merge pull request #2328 from duidae/jason/fix_gke_upgrade_issue (許守傑 Shou-Chieh Hsu (Jason))
- [[`62337cee78`](https://github.com/twreporter/twreporter-react/commit/62337cee78)] - **fix**: update ci for gke auth error issue (duidae)
- [[`a789ecf763`](https://github.com/twreporter/twreporter-react/commit/a789ecf763)] - Merge pull request #2324 from duidae/jason/fix_mobile_rwd_defect (許守傑 Shou-Chieh Hsu (Jason))
- [[`6c4dbda5a3`](https://github.com/twreporter/twreporter-react/commit/6c4dbda5a3)] - **fix**: update npm packages (duidae)
- [[`8cde5246f0`](https://github.com/twreporter/twreporter-react/commit/8cde5246f0)] - Merge pull request #2317 from duidae/jason/revert_refinement_new_arch (許守傑 Shou-Chieh Hsu (Jason))
- [[`2d7930b4cc`](https://github.com/twreporter/twreporter-react/commit/2d7930b4cc)] - **fix**: update npm packages (duidae)
- [[`5ed921d031`](https://github.com/twreporter/twreporter-react/commit/5ed921d031)] - _**Revert**_ "Revert "fix: fix topic top padding"" (duidae)
- [[`5c6a1c3569`](https://github.com/twreporter/twreporter-react/commit/5c6a1c3569)] - **chore**: use universal header with feature toggle (Aylie Chou)
- [[`482873a056`](https://github.com/twreporter/twreporter-react/commit/482873a056)] - **chore**: update @twreporter packages (Aylie Chou)

## 4.9.6, 2022-11-30

### Notable Changes

- chore
  - update @twreporter packages
    - update font-family
- fix
  - revert: refine design details for new info arch
  - refine design details for new info arch
  - update about-us department name
  - pass location props to universal-header
  - send releaseBranch prop to banner
- refactor
  - adopt adobe font as the third-party web fonts

### Commits

- [[`989a06f7df`](https://github.com/twreporter/twreporter-react/commit/989a06f7df)] - **chore**: force to use old universal-header (Aylie Chou)
- [[`4dca3f9715`](https://github.com/twreporter/twreporter-react/commit/4dca3f9715)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`0914195308`](https://github.com/twreporter/twreporter-react/commit/0914195308)] - Merge pull request #2308 from twreporter/revert-2297-jason/refinement_new_arch (許守傑 Shou-Chieh Hsu (Jason))
- [[`d34bb27afd`](https://github.com/twreporter/twreporter-react/commit/d34bb27afd)] - _**Revert**_ "**fix**: fix topic top padding" (許守傑 Shou-Chieh Hsu (Jason))
- [[`2a2bf9df2d`](https://github.com/twreporter/twreporter-react/commit/2a2bf9df2d)] - Merge pull request #2297 from duidae/jason/refinement_new_arch (許守傑 Shou-Chieh Hsu (Jason))
- [[`ee21cb78d3`](https://github.com/twreporter/twreporter-react/commit/ee21cb78d3)] - **fix**: update npm packages (duidae)
- [[`d371f2354a`](https://github.com/twreporter/twreporter-react/commit/d371f2354a)] - Merge branch 'master' into jason/refinement_new_arch (duidae)
- [[`b5844cefe3`](https://github.com/twreporter/twreporter-react/commit/b5844cefe3)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`37c91dbc00`](https://github.com/twreporter/twreporter-react/commit/37c91dbc00)] - Merge pull request #2300 from Aylie-Chou/16-fix-about-us-department-naming (Aylie)
- [[`9360f50f49`](https://github.com/twreporter/twreporter-react/commit/9360f50f49)] - Merge pull request #2296 from Aylie-Chou/12-feature-info-struct-redesign (Aylie)
- [[`8be208b967`](https://github.com/twreporter/twreporter-react/commit/8be208b967)] - Merge pull request #2301 from duidae/jason/bump_version_v4.9.6-rc.3 (許守傑 Shou-Chieh Hsu (Jason))
- [[`5320c479db`](https://github.com/twreporter/twreporter-react/commit/5320c479db)] - Merge pull request #2299 from duidae/jason/update_kids_banner (許守傑 Shou-Chieh Hsu (Jason))
- [[`55c8771c47`](https://github.com/twreporter/twreporter-react/commit/55c8771c47)] - **fix**: update npm packages (duidae)
- [[`8f6c51337d`](https://github.com/twreporter/twreporter-react/commit/8f6c51337d)] - **fix**: add releaseBranch props to home (duidae)
- [[`1497004ac5`](https://github.com/twreporter/twreporter-react/commit/1497004ac5)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`454c1ae324`](https://github.com/twreporter/twreporter-react/commit/454c1ae324)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`85c34d508b`](https://github.com/twreporter/twreporter-react/commit/85c34d508b)] - **refactor**: adopt adobe font as the third-party web fonts (#2266) (Tai-Jiun Fang)
- [[`8175df741c`](https://github.com/twreporter/twreporter-react/commit/8175df741c)] - **chore**: update twreporter npm packages (Tai-Jiun Fang)

## 4.9.5, 2022-10-28

### Notable Changes

- chore
  - force to use old header
  - update @twreporter packages
    - disable feature toggle
    - desktop hamburger menu
- fix
  - style & eslint warning

### Commits

- [[`e5d7ea6ddd`](https://github.com/twreporter/twreporter-react/commit/e5d7ea6ddd)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`1532da2988`](https://github.com/twreporter/twreporter-react/commit/1532da2988)] - **fix**: force to use old universal-header (Aylie Chou)
- [[`aa55654a2f`](https://github.com/twreporter/twreporter-react/commit/aa55654a2f)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`625db1b83c`](https://github.com/twreporter/twreporter-react/commit/625db1b83c)] - **fix**: fix style & eslint warning (Aylie Chou)

## 4.9.4, 2022-10-27

### Notable Changes

- chore
  - update @twreporter packages
    - update kids reporter link & wording
    - disable feature toggle: new info structure
  - Revert "**chore**: update @twreporter npm packages (#2250)"
- fix
  - fix feature toggle
  - apply new category set in index-page & photography page

### Commits

- [[`f3d9ddf62a`](https://github.com/twreporter/twreporter-react/commit/f3d9ddf62a)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`21ca70d8bd`](https://github.com/twreporter/twreporter-react/commit/21ca70d8bd)] - **fix**: import header with featuer toggle applied level (Aylie Chou)
- [[`e39362839c`](https://github.com/twreporter/twreporter-react/commit/e39362839c)] - **chore**: upadte @twreporter packages (Aylie Chou)
- [[`c53ac15c9d`](https://github.com/twreporter/twreporter-react/commit/c53ac15c9d)] - **chore**: update @twreporter npm packages (Aylie Chou)
- [[`8f620ac90c`](https://github.com/twreporter/twreporter-react/commit/8f620ac90c)] - **fix**: fix feature toggle level (Aylie Chou)
- [[`4a445f24f4`](https://github.com/twreporter/twreporter-react/commit/4a445f24f4)] - **chore**: update @twreporter npm packages (#2259) (Tai-Jiun Fang)
- [[`3b4f6ad939`](https://github.com/twreporter/twreporter-react/commit/3b4f6ad939)] - **chore**: update @twreporter npm packages (#2256) (Tai-Jiun Fang)
- [[`ce07074dd8`](https://github.com/twreporter/twreporter-react/commit/ce07074dd8)] - _**Revert**_ "**chore**: update @twreporter npm packages (#2250)" (Tai-Jiun Fang)
- [[`c0b6d6cc3d`](https://github.com/twreporter/twreporter-react/commit/c0b6d6cc3d)] - **chore**: update @twreporter npm packages (#2250) (Tai-Jiun Fang)
- [[`29afe2c089`](https://github.com/twreporter/twreporter-react/commit/29afe2c089)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`e7d7f02a9d`](https://github.com/twreporter/twreporter-react/commit/e7d7f02a9d)] - **chore**: upgrade @twreporter packages version (Aylie Chou)
- [[`28c063fc2e`](https://github.com/twreporter/twreporter-react/commit/28c063fc2e)] - **fix**: apply new category set in index-page & photography page (Aylie Chou)

## 4.9.3, 2022-09-15

### Notable Changes

- fix
  - fix photography page data loader

### Commits

- [[`55f6cf9d22`](https://github.com/twreporter/twreporter-react/commit/55f6cf9d22)] - **fix**: photography page data loader (#2242) (Tai-Jiun Fang)

## 4.9.2, 2022-09-14

### Notable Changes

- fix
  - fix photography page cannot get posts

### Commits

- [[`2075d9930f`](https://github.com/twreporter/twreporter-react/commit/2075d9930f)] - **fix**: fix photography page cannot get posts (Aylie Chou)

## 4.9.1, 2022-09-14

### Notable Changes

- chore
  - update @twreporter npm packages
- feat
  - update category page with feature toggle
- refactor
  - async load google optimize script

### Commits

- [[`f95f1c53d5`](https://github.com/twreporter/twreporter-react/commit/f95f1c53d5)] - **chore**: update @twreporter packages version (Aylie Chou)
- [[`b658898245`](https://github.com/twreporter/twreporter-react/commit/b658898245)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`1599f277d8`](https://github.com/twreporter/twreporter-react/commit/1599f277d8)] - **fix**: fix category constants (Aylie Chou)
- [[`0a4c5d964b`](https://github.com/twreporter/twreporter-react/commit/0a4c5d964b)] - **refactor**: async load google optimize script (#2230) (Tai-Jiun Fang)
- [[`9d48e90d37`](https://github.com/twreporter/twreporter-react/commit/9d48e90d37)] - **fix**: update @twreporter/core package (Aylie Chou)
- [[`04b55ed8bd`](https://github.com/twreporter/twreporter-react/commit/04b55ed8bd)] - **feat**: update Category page with feature toggle (Aylie Chou)

## 4.9.0, 2022-08-11

### Notable Changes

- chore
  - update @twreporter npm packages
- fix
  - render blocking issue
    - remove `Noto Sans TC` in font loaded from google font
    - self host `Noto Sans TC` and add the corresponding font-face into GlobalStyle

### Commits

- [24f35d4511] - chore: update @twreporter npm packages (#2223) (Tai-Jiun Fang)
- [0caba9792c] - chore: update twreporter npm pkgs (Tai-Jiun Fang)
- [e00f8a46c2] - feat: preload self hosted fonts (Tai-Jiun Fang)
- [f3f15505f0] - refactor: update `getFontFaces` to `webfonts.fontFaces` (Tai-Jiun Fang)
- [41bb3808c8] - refactor: add font-family `defaultFallback` (Tai-Jiun Fang)
- [3fe48d7b72] - refactor: update global style to include fontfaces (Tai-Jiun Fang)
- [f31accd867] - fix: remove `Noto Sans TC` font from webfontloader loading list (Tai-Jiun Fang)

## 4.8.4, 2022-08-09

### Notable Changes

- chore: update @twreporter npm packages
  - @twreporter/core@1.4.2
  - @twreporter/index-page@1.3.1
  - @twreporter/react-article-components@1.6.2
  - @twreporter/react-components@8.11.1
  - @twreporter/universal-header@2.2.12
- chore: replace smoothScroll npm package with our custom smooth-scroll

### Commits

- \[[`587e780ae8`](https://github.com/twreporter/twreporter-react/commit/587e780ae8)] - Merge pull request #2217 from duidae/jason/update_npm_packages (許守傑 Shou-Chieh Hsu (Jason))
- \[[`345824bf3c`](https://github.com/twreporter/twreporter-react/commit/345824bf3c)] - **chore**: update npm packages (duidae)
- \[[`82c1f91313`](https://github.com/twreporter/twreporter-react/commit/82c1f91313)] - Merge branch 'staging' into master (許守傑 Shou-Chieh Hsu (Jason))
- \[[`2da25c28e9`](https://github.com/twreporter/twreporter-react/commit/2da25c28e9)] - **chore**: bump version v4.8.4-rc.1 (#2213) (許守傑 Shou-Chieh Hsu (Jason))
- \[[`b1ba9685d1`](https://github.com/twreporter/twreporter-react/commit/b1ba9685d1)] - **chore**: upgrade react-article-components to v1.6.2-rc.1 (#2212) (許守傑 Shou-Chieh Hsu (Jason))
- \[[`b54301715d`](https://github.com/twreporter/twreporter-react/commit/b54301715d)] - **chore**: release v4.8.4-rc.0 to staging (#2211) (許守傑 Shou-Chieh Hsu (Jason))
- \[[`a7153891b8`](https://github.com/twreporter/twreporter-react/commit/a7153891b8)] - **chore**: bump version v4.8.4-rc.0 (#2210) (許守傑 Shou-Chieh Hsu (Jason))
- \[[`bbc8242585`](https://github.com/twreporter/twreporter-react/commit/bbc8242585)] - **fix**: remove smoothscroll lib (#2192) (許守傑 Shou-Chieh Hsu (Jason))

## 4.8.3, 2022-07-27

### Notable Changes

- chore: update @twreporter npm packages
  - @twreporter/react-article-components@1.6.1

### Commits

- [[`b6713cb3a4`](https://github.com/twreporter/twreporter-react/commit/b6713cb3a4)] - **chore**: update @twreporter package to apply tool bar change (#2203) (Aylie Chou)
- [[`407c9cead4`](https://github.com/twreporter/twreporter-react/commit/407c9cead4)] - **chore**: update @twreporter package to release version (#2206) (Aylie Chou)

## 4.8.2, 2022-07-21

### Notable Changes

- chore: update @twreporter npm packages
  - @twreporter/index-page@^1.3.0
  - @twreporter/react-article-components@^1.6.0
  - @twreporter/react-components@^8.11.0
  - @twreporter/universal-header@^2.2.11

### Commits

- [[`be70da1150`](https://github.com/twreporter/twreporter-react/commit/be70da1150)] - **chore**: update @twreporter npm packages (#2199) (Tai-Jiun Fang)
- [[`2c8b86fa1f`](https://github.com/twreporter/twreporter-react/commit/2c8b86fa1f)] - **refactor**: replace the NewsletterSection with JuniorBoxSection
  ang)
- [[`24d9e41cf0`](https://github.com/twreporter/twreporter-react/commit/24d9e41cf0)] - **chore**: update twreporter npm packages (#2196) (Tai-Jiun Fang)
- \[[`6fed91657b`](https://github.com/twreporter/twreporter-react/commit/6fed91657b)] - Merge pull request #2194 from duidae/jason/downgrade_react-article-component_v1.5.0 (許守傑 Shou-Chieh Hsu (Jason))
- \[[`33652de641`](https://github.com/twreporter/twreporter-react/commit/33652de641)] - **chore**: downgrade react-article-components to v1.5.0 (duidae)
- \[[`dbe80bf539`](https://github.com/twreporter/twreporter-react/commit/dbe80bf539)] - Merge pull request #2189 from duidae/jason/issue_60 (許守傑 Shou-Chieh Hsu (Jason))
- \[[`fe20cecf9f`](https://github.com/twreporter/twreporter-react/commit/fe20cecf9f)] - **chore**: update react-article-component to v1.6.0-rc.0 (duidae)

## 4.8.1, 2022-07-06

### Notable Changes

- docs
  - update award name in about-us page
- fix
  - support safe-area-inset-\* css
- refactor
  - update about-us
- chore
  - update npm packages
    - @twreporter/index-page@1.2.16
    - @twreporter/react-article-components@1.5.0
    - @twreporter/react-components@8.10.0
    - @twreporter/redux@7.2.2
    - @twreporter/universal-header@2.2.10

### Commits

- [[`92c4c791fb`](https://github.com/twreporter/twreporter-react/commit/92c4c791fb)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`dda87ea8d1`](https://github.com/twreporter/twreporter-react/commit/dda87ea8d1)] - **docs**: update award name in about-us (#2179) (Tai-Jiun Fang)
- [[`8beefcf841`](https://github.com/twreporter/twreporter-react/commit/8beefcf841)] - **chore**: update @twreporter packages to apply tool bar fix (Aylie Chou)
- [[`294b653578`](https://github.com/twreporter/twreporter-react/commit/294b653578)] - **chore**: update @twreporter packages toapply tool bar fix (Aylie Chou)
- [[`e0029b04c9`](https://github.com/twreporter/twreporter-react/commit/e0029b04c9)] - **chore**: update @twreporter packages to apply bookmark fix (Aylie Chou)
- [[`5557ce47a6`](https://github.com/twreporter/twreporter-react/commit/5557ce47a6)] - **fix**: support safe-area-inset-\* css (Aylie Chou)
- [[`4d12fe45f6`](https://github.com/twreporter/twreporter-react/commit/4d12fe45f6)] - **chore**: update @twreporter/react-article-components package (Aylie Chou)
- [[`d217c241c7`](https://github.com/twreporter/twreporter-react/commit/d217c241c7)] - **chore**: update @twreporter packages to apply bookmark fix (Aylie Chou)
- [[`61071be9de`](https://github.com/twreporter/twreporter-react/commit/61071be9de)] - **chore**: update @twreporter packages to apply article tool bar (Aylie Chou)
- [[`0fd7bf2fab`](https://github.com/twreporter/twreporter-react/commit/0fd7bf2fab)] - **refactor**: update about-us (#2154) (Tai-Jiun Fang)

## 4.8.0, 2022-06-07

### Notable Changes

- fix
  - change font loader
  - support mobile test
  - replace version with package.json instead of changelog.md
- feat
  - add FPS meter stats-js
  - add releaseBranch props into route component
- refactor
  - remove reading progress due to spec change
- chore
  - update npm packages
    - @twreporter/index-page@1.2.15
    - @twreporter/react-article-components@1.4.12
    - @twreporter/react-components@8.9.0
    - @twreporter/universal-header@2.2.9

### Commits

- [[`3e54e21440`](https://github.com/twreporter/twreporter-react/commit/3e54e21440)] - **chore**: update @twreporter npm packages (#2155) (Tai-Jiun Fang)
- [[`85ee509e2f`](https://github.com/twreporter/twreporter-react/commit/85ee509e2f)] - **chore**: update npm packages (Tai-Jiun Fang)
- [[`43200ce574`](https://github.com/twreporter/twreporter-react/commit/43200ce574)] - **fix**: change font loader (#2148) (Tai-Jiun Fang)
- [[`307934d79d`](https://github.com/twreporter/twreporter-react/commit/307934d79d)] - **feat**: integrate fps meter (duidae)
- [[`60082ef42f`](https://github.com/twreporter/twreporter-react/commit/60082ef42f)] - **feat**: add stats-js (duidae)
- [[`bfd3d199d9`](https://github.com/twreporter/twreporter-react/commit/bfd3d199d9)] - **chore**: upgrade react-article-component & universal-header (duidae)
- [[`706f5dc3f7`](https://github.com/twreporter/twreporter-react/commit/706f5dc3f7)] - **chore**: update @twreporter packages to apply bookmark fix (Aylie Chou)
- [[`b2994d865c`](https://github.com/twreporter/twreporter-react/commit/b2994d865c)] - **refactor**: remove reading progress due to spec change (#2131) (Tai-Jiun Fang)
- [[`e9da98dec1`](https://github.com/twreporter/twreporter-react/commit/e9da98dec1)] - **chore**: update @twreporter packages (Aylie Chou)
- [[`cb17db220b`](https://github.com/twreporter/twreporter-react/commit/cb17db220b)] - **fix**: update @twreporter component version to apply bookmark fix (Aylie Chou)
- [[`7b23539a52`](https://github.com/twreporter/twreporter-react/commit/7b23539a52)] - **fix**: replace version source (duidae)
- [[`a50de8889c`](https://github.com/twreporter/twreporter-react/commit/a50de8889c)] - **feat**: update @twreporter packages to add bookmark guide (Aylie Chou)
- [[`fcbcdb48cd`](https://github.com/twreporter/twreporter-react/commit/fcbcdb48cd)] - **fix**: remove redundant line (Aylie Chou)
- [[`f5a7ae88aa`](https://github.com/twreporter/twreporter-react/commit/f5a7ae88aa)] - **feat**: add releaseBranch props into route component (Aylie Chou)

## 4.7.16, 2022-05-09

### Notable Changes

- chore:
  - update npm packages
    - @twreporter/index-page@1.2.14
    - @twreporter/react-article-components@1.4.11
    - @twreporter/react-components@8.8.0
    - @twreporter/universal-header@2.2.8

### Commits

- [[`ecee78e276`](https://github.com/twreporter/twreporter-react/commit/ecee78e276)] - **chore**: update npm pkg version (Tai-Jiun Fang)

* [[`2fd203892c`](https://github.com/twreporter/twreporter-react/commit/2fd203892c)] - **chore**: update @twreporter/react-article-components@1.4.11-rc.1 (Tai-Jiun Fang)

## 4.7.15, 2022-04-29

### Notable Changes

- chore:
  - update dep @twreporter/index-page@1.2.13, @twreporter/react-article-components@1.4.10, @twreporter/react-components@8.7.1, @twreporter/redux@7.2.1, @twreporter/universal-header@2.2.7 ([#2111](https://github.com/twreporter/twreporter-react/pull/2111))

### Commits

- [9a8a518d84] - Merge pull request #2111 from duidae/jason/upgrade_npm_packages (許守傑 Shou-Chieh Hsu (Jason))
- [ddb822b628] - chore: upgrade npm packages (duidae)

## 4.7.14, 2022-04-14

### Notable Changes

- chore:
  - update dep @twreporter/react-article-components@1.4.9 ([#2104](https://github.com/twreporter/twreporter-react/pull/2104))

### Commits

- [[`0f2c4cbd12`](https://github.com/twreporter/twreporter-react/commit/0f2c4cbd12)] - **chore**: upgrade react-article-components to v1.4.9 (#2104) (許守傑 Shou-Chieh Hsu (Jason))

## 4.7.13, 2022-03-23

### Notable Changes

- chore:
  - update dep @twreporter/index-page@1.2.12 ([#2096](https://github.com/twreporter/twreporter-react/pull/2096))

### Commits

- [[`fc3c8eb4a2`](https://github.com/twreporter/twreporter-react/commit/fc3c8eb4a2)] - **chore**: update dep @twreporter/index-page@^1.2.12 (#2096) (Tai-Jiun Fang)
- [[`92798bd9ac`](https://github.com/twreporter/twreporter-react/commit/92798bd9ac)] - **chore**: update dep @twreporter/index-page@1.2.12-rc.0 (#2093) (Tai-Jiun Fang)

## 4.7.12, 2022-03-22

### Notable Changes

- fix:
  - fix header animation issue([#2065](https://github.com/twreporter/twreporter-react/pull/2065))
- chore:
  - upgrade npm package to 1.4.8 ([#2089](https://github.com/twreporter/twreporter-react/pull/2089))
  - refactor: update mock-data to include topic state([#2073](https://github.com/twreporter/twreporter-react/pull/2073))

### Commits

- [[`676cccf854`](https://github.com/twreporter/twreporter-react/commit/676cccf854)] - **chore**: update npm package version (#2089) (許守傑 Shou-Chieh Hsu (Jason))
- [[`e010236c59`](https://github.com/twreporter/twreporter-react/commit/e010236c59)] - **fix**: add missing lock file (duidae)
- [[`ca04e6461c`](https://github.com/twreporter/twreporter-react/commit/ca04e6461c)] - **chore**: bump version (duidae)
- [[`c91fad8021`](https://github.com/twreporter/twreporter-react/commit/c91fad8021)] - **chore**: update npm package version (duidae)
- [[`bdb5c792e0`](https://github.com/twreporter/twreporter-react/commit/bdb5c792e0)] - **fix**: fix header animation issue (#2065) (許守傑 Shou-Chieh Hsu (Jason))
- [[`976fa9f27a`](https://github.com/twreporter/twreporter-react/commit/976fa9f27a)] - **refactor**: update mock-data to include topic state (#2073) (Tai-Jiun Fang)

## 4.7.11, 2022-03-16

### Notable Changes

- chore
  - update @twreporter/react-article-components@1.4.7([#2077](https://github.com/twreporter/twreporter-react/pull/2077))

### Commits

- [[`b513ae22e2`](https://github.com/twreporter/twreporter-react/commit/b513ae22e2)] - **chore**: update dep @twreporter/react-article-components@1.4.7 (Tai-Jiun Fang)
- [[`1ff4f31c51`](https://github.com/twreporter/twreporter-react/commit/1ff4f31c51)] - **chore**: bump version to v4.7.11-rc.0 (Tai-Jiun Fang)
- [[`92d92e7d99`](https://github.com/twreporter/twreporter-react/commit/92d92e7d99)] - **chore**: update dep @twreporter/react-article-components@1.4.7-rc.4 (#2074) (Tai-Jiun Fang)

## 4.7.10, 2022-03-14

### Notable Changes

- chore
  - revert print header([#2067](https://github.com/twreporter/twreporter-react/pull/2067))
  - remove webpush banner for live blog banner for the time being([#2066](https://github.com/twreporter/twreporter-react/pull/2066))
  - update @twreporter/react-article-components to v1.4.7-rc.2([#2062](https://github.com/twreporter/twreporter-react/pull/2062))
- fix
  - disappear header & web push in print mode([#2059](https://github.com/twreporter/twreporter-react/pull/2059))

### Commits

- [[`8bb0f26c6d`](https://github.com/twreporter/twreporter-react/commit/8bb0f26c6d)] - **chore**: remove webpush banner for live blog banner for the time being (#2066) (Tai-Jiun Fang)
- [[`6ae4b6ca20`](https://github.com/twreporter/twreporter-react/commit/6ae4b6ca20)] - Jason/revert print header (#2067) (許守傑 Shou-Chieh Hsu (Jason))
- [[`f31f574812`](https://github.com/twreporter/twreporter-react/commit/f31f574812)] - **chore**: upgrade react-article-component to v1.4.7-rc.2 (#2062) (許守傑 Shou-Chieh Hsu (Jason))
- [[`ef2e5ff5dd`](https://github.com/twreporter/twreporter-react/commit/ef2e5ff5dd)] - Jason/print layout issue (#2059) (許守傑 Shou-Chieh Hsu (Jason))

## 4.7.9, 2022-03-01

### Notable Changes

- fix
  - add gtm preview environment config([#2048](https://github.com/twreporter/twreporter-react/pull/2048))
  - fix eslint error([#2051](https://github.com/twreporter/twreporter-react/pull/2051))

### Commits

- [[`708529e04e`](https://github.com/twreporter/twreporter-react/commit/708529e04e)] - **style**: linter auto fix (Tai-Jiun Fang)
- [[`50a7d306a0`](https://github.com/twreporter/twreporter-react/commit/50a7d306a0)] - **fix**: fix eslint error (#2051) (Tai-Jiun Fang)
- [[`7ccf8fb5d2`](https://github.com/twreporter/twreporter-react/commit/7ccf8fb5d2)] - **fix**: add gtm preview environment config (Aylie Chou)

## 4.7.8, 2022-02-24

### Notable Changes

- feat
  - add animation to indicator of carousel & enhance contrast
- fix
  - add og:updated_time in header

### Commits

- [[`8deee7118f`](https://github.com/twreporter/twreporter-react/commit/8deee7118f)] - **feat**: add animation to indicator of carousel & enhance contrast (#2037) (許守傑 Shou-Chieh Hsu (Jason))
- [[`dd6a65b6fc`](https://github.com/twreporter/twreporter-react/commit/dd6a65b6fc)] - **fix**: add og:updated_time in header (Aylie Chou)

* [[`dd6a65b6fc`](https://github.com/twreporter/twreporter-react/commit/dd6a65b6fc)] - **fix**: add og:updated_time in header (Aylie Chou)

## 4.7.7, 2021-12-27

### Notable Changes

- feat
  - add user id datalayer for gtm
  - add fund raising number in footer
- chore
  - update @twreporter/core to v1.4.0([#2027](https://github.com/twreporter/twreporter-react/pull/2027))
  - update @twreporter/index-page to v1.2.11([#2027](https://github.com/twreporter/twreporter-react/pull/2027))
  - update @twreporter/react-article-components to v1.4.6([#2027](https://github.com/twreporter/twreporter-react/pull/2027))
  - update @twreporter/react-components v8.7.0([#2027](https://github.com/twreporter/twreporter-react/pull/2027))
  - update @twreporter/universal-header v2.2.6([#2027](https://github.com/twreporter/twreporter-react/pull/2027))

### Commits

- [[`70aeed0480`](https://github.com/twreporter/twreporter-react/commit/70aeed0480)] - **chore**: update @twreporter module versio
  n (Aylie Chou)
- [[`0a552abb06`](https://github.com/twreporter/twreporter-react/commit/0a552abb06)] - **chore**: update @twreporter modules version (Aylie Chou)
- [[`1cfbc59023`](https://github.com/twreporter/twreporter-react/commit/1cfbc59023)] - **feat**: add user id datalayer (Aylie Chou)
- [[`8ba032b495`](https://github.com/twreporter/twreporter-react/commit/8ba032b495)] - **chore**: update @twreporter module version (Aylie Chou)

## 4.7.6, 2021-11-23

### Notable Changes

- feat
  - update about-us data & add new award name
- chore
  - update @twreporter/core to v1.3.1([#2012](https://github.com/twreporter/twreporter-react/pull/2012))
  - update @twreporter/index-page to v1.2.10([#2012](https://github.com/twreporter/twreporter-react/pull/2012))
  - update @twreporter/react-article-components to v1.4.5([#2012](https://github.com/twreporter/twreporter-react/pull/2012))
  - update @twreporter/react-components v8.6.3([#2012](https://github.com/twreporter/twreporter-react/pull/2012))
  - update @twreporter/universal-header v2.2.5([#2012](https://github.com/twreporter/twreporter-react/pull/2012))

### Commits

- [[`84be7026ed`](https://github.com/twreporter/twreporter-react/commit/84be7026ed)] - **chore**: update @twreporter module version (Aylie Chou)
- [[`e0bd641faa`](https://github.com/twreporter/twreporter-react/commit/e0bd641faa)] - **fix**: address review comment (Aylie Chou)
- [[`691f5953e5`](https://github.com/twreporter/twreporter-react/commit/691f5953e5)] - **fix**: fix KKBOX award name (Aylie Chou)
- [[`cd8a23cd1d`](https://github.com/twreporter/twreporter-react/commit/cd8a23cd1d)] - **feat**: adjust style & add error boundary (Aylie Chou)
- [[`71f2865f07`](https://github.com/twreporter/twreporter-react/commit/71f2865f07)] - **fix**: update about-us data & fix js error (Aylie Chou)

## 4.7.5, 2021-10-28

### Notable Changes

- chore
  - update @twreporter/index-page to v1.2.9([#2003](https://github.com/twreporter/twreporter-react/pull/2003))
  - update @twreporter/react-article-components to v1.4.4([#2003](https://github.com/twreporter/twreporter-react/pull/2003))
  - update @twreporter/react-components v8.6.2([#2003](https://github.com/twreporter/twreporter-react/pull/2003))
  - update @twreporter/universal-header v2.2.4([#2003](https://github.com/twreporter/twreporter-react/pull/2003))
  - update @twreporter/index-page to v1.2.9-rc.1([#2000](https://github.com/twreporter/twreporter-react/pull/2000))
  - update @twreporter/react-article-components to v1.4.4-rc.1([#2000](https://github.com/twreporter/twreporter-react/pull/2000))
  - update @twreporter/react-components v8.6.2-rc.1([#2000](https://github.com/twreporter/twreporter-react/pull/2000))
  - update @twreporter/universal-header v2.2.4-rc.1([#2000](https://github.com/twreporter/twreporter-react/pull/2000))

### Commits

- [[`5995908b3a`](https://github.com/twreporter/twreporter-react/commit/5995908b3a)] - **chore**: update @twreporter module version (Aylie Chou)
- [[`08737705d8`](https://github.com/twreporter/twreporter-react/commit/08737705d8)] - **chore**: update @twreporter module version (Aylie Chou)

## 4.7.4, 2021-10-27

### Notable Changes

- fix
  - fix author page font family

### Commits

- [[`1368be77ff`](https://github.com/twreporter/twreporter-react/commit/1368be77ff)] - **fix**: fix author page font family (Aylie Chou)

## 4.7.3, 2021-10-27

### Notable Changes

- feat
  - rebranding logo, color, font family
- chore
  - update @twreporter/index-page to v1.2.8([#1989](https://github.com/twreporter/twreporter-react/pull/1989))
  - update @twreporter/react-article-components to v1.4.3([#1989](https://github.com/twreporter/twreporter-react/pull/1989))
  - update @twreporter/react-components v8.6.1([#1989](https://github.com/twreporter/twreporter-react/pull/1989))
  - update @twreporter/universal-header v2.2.3([#1989](https://github.com/twreporter/twreporter-react/pull/1989))
  - update @twreporter/index-page to v1.2.8-rc.0([#1986](https://github.com/twreporter/twreporter-react/pull/1986))
  - update @twreporter/react-article-components to v1.4.3-rc.0[#1986](https://github.com/twreporter/twreporter-react/pull/1986))
  - update @twreporter/react-components v8.6.1-rc.0([#1986](https://github.com/twreporter/twreporter-react/pull/1986))
  - update @twreporter/universal-header v2.2.3-rc.0([#1986](https://github.com/twreporter/twreporter-react/pull/1986))
  - update @twreporter/core to v1.3.0([#1983](https://github.com/twreporter/twreporter-react/pull/1983))
  - update @twreporter/index-page to v1.2.7([#1983](https://github.com/twreporter/twreporter-react/pull/1983))
  - update @twreporter/react-article-components to v1.4.2[#1983](https://github.com/twreporter/twreporter-react/pull/1983))
  - update @twreporter/react-components v8.6.0([#1983](https://github.com/twreporter/twreporter-react/pull/1983))
  - update @twreporter/universal-header v2.2.2([#1983](https://github.com/twreporter/twreporter-react/pull/1983))
  - update @twreporter/index-page to v1.2.7-rc.3([#1980](https://github.com/twreporter/twreporter-react/pull/1980))
  - update @twreporter/react-article-components to v1.4.2-rc.3[#1980](https://github.com/twreporter/twreporter-react/pull/1980))
  - update @twreporter/react-components v8.6.0-rc.3([#1980](https://github.com/twreporter/twreporter-react/pull/1980))
  - update @twreporter/universal-header v2.2.2-rc.3([#1980](https://github.com/twreporter/twreporter-react/pull/1980))
  - update @twreporter/core to v1.3.0-rc.1([#1976](https://github.com/twreporter/twreporter-react/pull/1976))
  - update @twreporter/index-page to v1.2.7-rc.2([#1976](https://github.com/twreporter/twreporter-react/pull/1976))
  - update @twreporter/react-article-components to v1.4.2-rc.2[#1976](https://github.com/twreporter/twreporter-react/pull/1976))
  - update @twreporter/react-components v8.6.0-rc.2([#1976](https://github.com/twreporter/twreporter-react/pull/1976))
  - update @twreporter/universal-header v2.2.2-rc.2([#1976](https://github.com/twreporter/twreporter-react/pull/1976))

### Commits

- [[`95f6e842ae`](https://github.com/twreporter/twreporter-react/commit/95f6e842ae)] - **chore**: update @twreporter module vers
  ion (Aylie Chou)
- [[`a133df7b3a`](https://github.com/twreporter/twreporter-react/commit/a133df7b3a)] - **chore**: update @twreporter module (Aylie Chou)
- [[`55dd8e3c2a`](https://github.com/twreporter/twreporter-react/commit/55dd8e3c2a)] - **chore**: update @twreporter module version (Aylie Chou)
- [[`874aded1ed`](https://github.com/twreporter/twreporter-react/commit/874aded1ed)] - **chore**: update @twreporter module version (Aylie Chou)
- [[`8cdf4a74f9`](https://github.com/twreporter/twreporter-react/commit/8cdf4a74f9)] - **fix**: fix font-family (Aylie Chou)
- [[`a969113577`](https://github.com/twreporter/twreporter-react/commit/a969113577)] - **chore**: update @twreporter packages & update font (Aylie Chou)

## 4.7.2, 2021-10-12

### Notable Changes

- feat
  - update @twreporter/universal-header to v2.2.1 to use header 2.0
  - update topic landing page header to universal-header
- fix
  - update z-index setting between header/web-push components ([#1949](https://github.com/twreporter/twreporter-react/pull/1949))
  - update comments to single lines ([#1945](https://github.com/twreporter/twreporter-react/pull/1945))
  - call to action banner can not be clicked
- chore
  - update @twreporter/universal-header to v2.2.1([#1972](https://github.com/twreporter/twreporter-react/pull/1972))
  - update @twreporter/react-components to v8.5.0([#1972](https://github.com/twreporter/twreporter-react/pull/1972))
  - update @twreporter/react-article-components to v1.4.1([#1972](https://github.com/twreporter/twreporter-react/pull/1972))
  - update @twreporter/index-page to v1.2.6([#1972](https://github.com/twreporter/twreporter-react/pull/1972))
  - update @twreporter/universal-header to v2.2.1-rc.0([#1969](https://github.com/twreporter/twreporter-react/pull/1969))
  - update @twreporter/universal-header to v2.2.0-rc.12([#1966](https://github.com/twreporter/twreporter-react/pull/1966))
  - update @twreporter/universal-header to v2.2.0-rc.11([#1963](https://github.com/twreporter/twreporter-react/pull/1963))
  - update @twreporter/universal-header to v2.2.0-rc.10([#1960](https://github.com/twreporter/twreporter-react/pull/1960))
  - update @twreporter/react-components to v8.5.0-rc.2([#1957](https://github.com/twreporter/twreporter-react/pull/1957))
  - update @twreporter/universal-header to v2.2.0-rc.9([#1953](https://github.com/twreporter/twreporter-react/pull/1953))
  - update @twreporter/universal-header to v2.2.0-rc.8 ([#1950](https://github.com/twreporter/twreporter-react/pull/1950))
  - update @twreporter/react-article-components to v1.4.0-rc.2 ([#1950](https://github.com/twreporter/twreporter-react/pull/1950))
  - update @twreporter/react-components to v8.5.0-rc.1 ([#1950](https://github.com/twreporter/twreporter-react/pull/1950))
  - update @twreporter/universal-header to v2.2.0-rc.7 ([#1946](https://github.com/twreporter/twreporter-react/pull/1946))
  - update @twreporter/react-article-components to v1.4.0-rc.0 ([#1946](https://github.com/twreporter/twreporter-react/pull/1946))
  - update @twreporter/universal-header to v2.2.0-rc.6

### Commits

- [[`804c80be22`](https://github.com/twreporter/twreporter-react/commit/804c80be22)] - **chore**: update @twreporter modules version (Aylie Chou)
- [[`082817b48c`](https://github.com/twreporter/twreporter-react/commit/082817b48c)] - **chore**: update @twreporter/universal-header to v2.2.1-rc.0 (Aylie Chou)
- [[`afacb89eca`](https://github.com/twreporter/twreporter-react/commit/afacb89eca)] - **chore**: update @twreporter/universal-header to v2.2.0-rc.12 (Aylie Chou)
- [[`bd4a544b9f`](https://github.com/twreporter/twreporter-react/commit/bd4a544b9f)] - **chore**: update @tw
  reporter/universal-header to v2.2.0-rc.11 (Aylie Chou)
- [[`a8317ed200`](https://github.com/twreporter/twreporter-react/commit/a8317ed200)] - **chore**: update uni
  versal-header to v2.2.0-rc.10 (Aylie Chou)
  - update @twreporter/react-components to v8.5.0-rc.2([#1957](https://github.com/twreporter/twreporter-react/pull/1957))
- [[`db844512b3`](https://github.com/twreporter/twreporter-react/commit/db844512b3)] - **chore**: update @twreporter/react-components to v8.5.0-rc.2 (Aylie Chou)
- [[`863efdb1a8`](https://github.com/twreporter/twreporter-react/commit/863efdb1a8)] - **chore**: update @twreporter/universal-header to v2.2.0-rc.9 (Aylie Chou)
- [[`77a00ef781`](https://github.com/twreporter/twreporter-react/commit/77a00ef781)] - **chore**: update @tw
  reporter module version (Aylie Chou)
- [[`6e01ebee42`](https://github.com/twreporter/twreporter-react/commit/6e01ebee42)] - **fix**: fix header/w
  eb-push z-index & transparent warpper style (Aylie Chou)
- [[`46d73cd29c`](https://github.com/twreporter/twreporter-react/commit/46d73cd29c)] - **fix**: update comments to single lines (#1945) (Tai-Ji
  un Fang)
- [[`02c268823b`](https://github.com/twreporter/twreporter-react/commit/02c268823b)] - **chore**: update @twreporter module version (Aylie Chou
  )
- [[`2368b71c3d`](https://github.com/twreporter/twreporter-react/commit/2368b71c3d)] - **chore**: update @twreporter/universal-header to v2.2.0-rc.6 (Tai-Jiun Fang)
- [[`c51ba3e5ed`](https://github.com/twreporter/twreporter-react/commit/c51ba3e5ed)] - **fix**: call to action banner can not be clicked (#1938) (Tai-Jiun Fang)
- [[`900f622c87`](https://github.com/twreporter/twreporter-react/commit/900f622c87)] - **feat**: update topic landing page header to universal-header (Aylie Chou)
- [[`026b4b493d`](https://github.com/twreporter/twreporter-react/commit/026b4b493d)] - **doc**: update CHANGELOG.md (Aylie Chou)
- [[`ce19e2de7e`](https://github.com/twreporter/twreporter-react/commit/ce19e2de7e)] - **fix**: update yarn.lock (Aylie Chou)
- [[`97046863e0`](https://github.com/twreporter/twreporter-react/commit/97046863e0)] - **chore**: test @twreporter/universal-header v2.2.0-rc.4 (Aylie Chou)

## 4.7.1, 2021-08-02

### Notable Changes

- refactor
  - update font-family for English text on topic landing page ([#1917](https://github.com/twreporter/twreporter-react/pull/1917))

### Commits

- [[`b7c56c14e5`](https://github.com/twreporter/twreporter-react/commit/b7c56c14e5)] - **refactor**: update font-family for English text on topic landing page (#1917) (Tai-Jiun Fang)

## 4.7.0, 2021-07-27

### Notable Changes

- feat
  - add google optimize snippet ([#1897](https://github.com/twreporter/twreporter-react/pull/1897))

### Commits

- [[`10b5ec046d`](https://github.com/twreporter/twreporter-react/commit/10b5ec046d)] - **feat**: add google optimize snippet (#1897) (Tai-Jiun Fang)

## 4.6.12, 2021-07-12

### Notable Changes

- fix
  - fix broken search box in firefox ([#1898](https://github.com/twreporter/twreporter-react/pull/1898))

### Commits

- [[`60ae3fc174`](https://github.com/twreporter/twreporter-react/commit/60ae3fc174)] - fix(search-box): give input a specific width to avoid bug in firefox (#1898) (Leo)

## 4.6.11, 2021-06-22

### Notable Changes

- refactor

  - migrate ga to gtm ([#1872](https://github.com/twreporter/twreporter-react/pull/1872))
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
