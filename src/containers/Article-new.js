import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import TagManager from 'react-gtm-module'
import localForage from 'localforage'
import memoizeOne from 'memoize-one'
// logger
import loggerFactory from '../logger'
// uiManager
import uiManager from '../managers/ui-manager'
// constants
import bsConst from '../constants/browser-storage'
import siteMeta from '../constants/site-meta'
// utils
import cloneUtils from '../utils/shallow-clone-entity'
// components
import ArticlePlaceholder from '../components/article/placeholder'
import SystemError from '../components/SystemError'
import ArticleBanner from '../components/membership-promo/article-banner'
// @twreporter
import twreporterRedux from '@twreporter/redux'
import ArticleComponent from '@twreporter/react-article-components'
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
// hooks
import { usePrevious } from '../hooks'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'

const _ = {
  forEach,
  get,
  debounce,
  throttle,
}

// global var
const logger = loggerFactory.getLogger()
const articleReadCountConditionConfig = {
  reading_height: 0.75,
  reading_time: 10000, // 10 second
}
const articleReadTimeConditionConfig = {
  inactive_time: 900000, // 900 second
  min_active_time: 5000, // 5 second
}

const Article = ({
  // props from redux state
  errorOfPost,
  // errorOfRelateds,
  fontLevel,
  isFetchingPost,
  // isFetchingRelateds,
  post,
  relateds,
  hasMoreRelateds,
  slugToFetch,
  isAuthed,
  userRole,
  jwt,
  userID,
  postID,
  // props from redux actions
  fetchAFullPost,
  fetchRelatedPostsOfAnEntity,
  changeFontLevel,
  setUserAnalyticsData,
  setUserFootprint,
  // props from react-router-dom
  history,
  // props from parents
  releaseBranch,
}) => {
  const prevIsFetchingPost = usePrevious(isFetchingPost)
  const [isExpanded, setIsExpaned] = useState(false)
  const [
    isReachedArticleReadTargetHeight,
    setIsReachedArticleReadTargetHeight,
  ] = useState(false)
  const [
    isReachedArticleReadTargetTime,
    setIsReachedArticleReadTargetTime,
  ] = useState(false)
  const [isBeenRead, setIsBeenRead] = useState(false)

  const articleBodyRef = useRef(null)
  const readingCountTimerId = useRef(null)
  const inactiveTimerId = useRef(null)

  let startReadingTime = Date.now()
  let isActive = false
  let activeTime = 0

  const fetchAFullPostWithCatch = slug => {
    if (slug === '') {
      return
    }

    fetchAFullPost(slug)
      .catch(failAction => {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch a full post, post slug: '${slug}'.`,
        })
      })
      .then(successAction => {
        const postId = _.get(successAction, 'payload.post.id', '')
        if (postId) {
          return fetchRelatedPostsOfAnEntity(postId)
        }
      })
      .catch(failAction => {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch a post's related posts, post slug: '${slug}'. `,
        })
      })
  }

  const loadMoreRelateds = () => {
    const id = _.get(post, 'id', '')
    const slug = _.get(post, 'slug', '')

    if (id && hasMoreRelateds) {
      return fetchRelatedPostsOfAnEntity(id).catch(failAction => {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch post's related posts, post slug: '${slug}'. `,
        })
      })
    }
  }

  const handleFontLevelChange = fontLevel => {
    changeFontLevel(fontLevel)
    localForage.setItem(bsConst.keys.fontLevel, fontLevel).catch(err => {
      console.warn('Can not set item into browser storage: ', err)
    })
  }

  const onToggleTabExpanded = isExpanded => {
    setIsExpaned(isExpanded)
  }

  const sendReadCount = () => {
    if (isAuthed) {
      setUserAnalyticsData(jwt, userID, postID, { readPostCount: true })
    }
  }

  const sendActiveTime = () => {
    const activeSec = Math.round(activeTime / 1000)
    if (activeSec > 7200) {
      logger.errorReport({
        report: 'read time error',
        message: `StartReadingTime: ${startReadingTime}, ActiveTime: ${activeTime}`,
      })
    }
    if (isAuthed) {
      setUserAnalyticsData(jwt, userID, postID, { readPostSec: activeSec })
      activeTime = 0
    }
  }

  const sendUserFootprint = () => {
    if (isAuthed) {
      setUserFootprint(jwt, userID, postID)
    }
  }

  const startReadingCountTimer = () => {
    if (readingCountTimerId.current) {
      window.clearTimeout(readingCountTimerId.current)
    }
    readingCountTimerId.current = window.setTimeout(() => {
      setIsReachedArticleReadTargetTime(true)
    }, articleReadCountConditionConfig.reading_time)
  }

  const calculateActiveTime = () => {
    const elapsedTime = Math.floor(Date.now() - startReadingTime)
    activeTime = activeTime + elapsedTime
    startReadingTime = Date.now()
  }

  const startInactiveTimer = () => {
    if (inactiveTimerId.current) {
      window.clearTimeout(inactiveTimerId.current)
    }
    inactiveTimerId.current = window.setTimeout(() => {
      calculateActiveTime()
      if (activeTime >= articleReadTimeConditionConfig.min_active_time) {
        sendActiveTime()
      }
      isActive = false
    }, articleReadTimeConditionConfig.inactive_time)
  }

  const handleScroll = _.debounce(() => {
    const scrollHeight = window.scrollY || document.documentElement.scrollTop
    const totalHeight = document.documentElement.scrollHeight
    const targetHeight =
      totalHeight * articleReadCountConditionConfig.reading_height
    if (scrollHeight >= targetHeight) {
      setIsReachedArticleReadTargetHeight(true)
    }
  }, 500)

  const handleVisibilityChange = _.throttle(() => {
    if (document.visibilityState === 'hidden') {
      if (isActive) {
        if (inactiveTimerId.current) {
          window.clearTimeout(inactiveTimerId.current)
        }
        calculateActiveTime()
        if (activeTime >= articleReadTimeConditionConfig.min_active_time) {
          sendActiveTime()
        }
        isActive = false
      }
    } else {
      if (!isActive) {
        isActive = true
        startReadingTime = Date.now()
      }
      startInactiveTimer()
    }
  }, 1000)

  const handleUserActivity = _.debounce(() => {
    if (!isActive) {
      isActive = true
      startReadingTime = Date.now()
    }
    startInactiveTimer()
  }, 500)

  const handlePagehide = () => {
    calculateActiveTime()
    if (activeTime >= articleReadTimeConditionConfig.min_active_time) {
      sendActiveTime()
    }
  }

  useEffect(() => {
    // reset readingCount state
    history.block(() => {
      setIsBeenRead(false)
      setIsReachedArticleReadTargetHeight(false)
      setIsReachedArticleReadTargetTime(false)
      calculateActiveTime()
      if (activeTime >= articleReadTimeConditionConfig.min_active_time) {
        sendActiveTime()
      }
      return true
    })
  }, [history])

  useEffect(() => {
    fetchAFullPostWithCatch(slugToFetch)
    sendUserFootprint()
    startReadingCountTimer()
    startReadingTime = Date.now()
    document.addEventListener('scroll', handleScroll)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('mousemove', handleUserActivity)
    document.addEventListener('click', handleUserActivity)
    window.addEventListener('pagehide', handlePagehide)

    handleVisibilityChange()

    localForage
      .getItem(bsConst.keys.fontLevel)
      .then(value => {
        if (value !== fontLevel) {
          changeFontLevel(value)
        }
      })
      .catch(err => {
        console.warn('Can not get item from browser storage: ', err)
      })

    return () => {
      document.removeEventListener('scroll', handleScroll)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('mousemove', handleUserActivity)
      document.removeEventListener('click', handleUserActivity)
      window.removeEventListener('pagehide', handlePagehide)
    }
  }, [slugToFetch])

  useEffect(() => {
    if (prevIsFetchingPost && !isFetchingPost) {
      TagManager.dataLayer({
        dataLayer: {
          event: 'gtm.load',
        },
      })
      startReadingCountTimer()
      startReadingTime = Date.now()
      startInactiveTimer()
    }
  }, [isFetchingPost])

  useEffect(() => {
    if (
      !isBeenRead &&
      isReachedArticleReadTargetHeight &&
      isReachedArticleReadTargetTime
    ) {
      sendReadCount()
      setIsBeenRead(true)
    }
  }, [
    isBeenRead,
    isReachedArticleReadTargetHeight,
    isReachedArticleReadTargetTime,
  ])

  if (errorOfPost) {
    return (
      <div>
        <SystemError error={errorOfPost} />
      </div>
    )
  }

  if (isFetchingPost) {
    return <ArticlePlaceholder />
  }

  // if post is invalid
  if (!post) {
    return (
      <div>
        <SystemError error={{ statusCode: 500 }} />
      </div>
    )
  }

  post.style = uiManager.getArticleV2Style(post.style)
  // for head tag
  const canonical = `${siteMeta.urlOrigin}/a/${_.get(post, 'slug', '')}`
  const ogTitle = `${_.get(post, 'og_title', '') || _.get(post, 'title', '')}${
    siteMeta.name.separator
  }${siteMeta.name.full}`
  const ogDesc = _.get(post, 'og_description', siteMeta.desc)
  const ogImage = _.get(post, 'og_image.resized_targets.tablet.url')
    ? post.og_image.resized_targets.tablet
    : siteMeta.ogImage
  const metaOgImage = [
    { property: 'og:image', content: replaceGCSUrlOrigin(ogImage.url) },
  ]
  if (ogImage.height) {
    metaOgImage.push({ property: 'og:image:height', content: ogImage.height })
  }
  if (ogImage.width) {
    metaOgImage.push({ property: 'og:image:width', content: ogImage.width })
  }

  // for UI test only
  const trackingSection = [
    {
      type: 'tracking-section',
      publishDate: '2024-05-16',
      title: '標題標題標題標題標題標題標題標題標題',
      content: [
        {
          alignment: 'center',
          content: [
            '《服貿協議》屬於<a target="_blank" href="https://zh.wikipedia.org/zh-tw/%E6%B5%B7%E5%B3%BD%E5%85%A9%E5%B2%B8%E7%B6%93%E6%BF%9F%E5%90%88%E4%BD%9C%E6%9E%B6%E6%A7%8B%E5%8D%94%E8%AD%B0">《海峽兩岸經濟合作架構協議》</a>（簡稱ECFA）一環，當年《服貿協議》若上路，下一步即是與兩岸產品進、出口相關的《海峽兩岸貨品貿易協議》（簡稱《貨貿協議》）。台灣之前雖已與他國簽署自由貿易協定（FTA），但《服貿協議》因牽涉中國因素，令「反服貿」成為318運動另一項重要訴求。',
          ],
          id: '7lqjv',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [
            {
              description:
                '2014年3月21日晚間，立法院議場內的群眾正在入口處模擬應對警方攻堅的防守措施。（攝影／楊子磊）',
              desktop: {
                height: 1333,
                url:
                  'https://www.twreporter.org/images/20240308195808-ac6e3f5db6197122df8b36f86ca69fcd-desktop.jpg',
                width: 2000,
              },
              id: '65eafd5051496c07007698b7',
              mobile: {
                height: 533,
                url:
                  'https://www.twreporter.org/images/20240308195808-ac6e3f5db6197122df8b36f86ca69fcd-mobile.jpg',
                width: 800,
              },
              original: {
                height: 2720,
                width: 4080,
              },
              tablet: {
                height: 800,
                url:
                  'https://www.twreporter.org/images/20240308195808-ac6e3f5db6197122df8b36f86ca69fcd-tablet.jpg',
                width: 1200,
              },
              tiny: {
                height: 100,
                url:
                  'https://www.twreporter.org/images/20240308195808-ac6e3f5db6197122df8b36f86ca69fcd-tiny.jpg',
                width: 150,
              },
              url:
                'https://www.twreporter.org/images/20240308195808-ac6e3f5db6197122df8b36f86ca69fcd-mobile.jpg',
              w400: {
                height: 267,
                url:
                  'https://www.twreporter.org/images/20240308195808-ac6e3f5db6197122df8b36f86ca69fcd-w400.jpg',
                width: 400,
              },
            },
          ],
          id: 'dvkmr',
          styles: {},
          type: 'image',
        },
        {
          alignment: 'center',
          content: [
            '支持《服貿協議》一方認為，中資可提升台灣經濟及勞工待遇，台企也能西進中國市場，強化我方競爭力。台灣大學經濟學系教授林建甫曾表示，反對方的擔憂並非經濟問題，「而是政治、國安問題。」他認為，我國已有考量，將強化中資來台的監控措施。',
          ],
          id: 'fq83r',
          styles: {},
          type: 'unstyled',
        },
      ],
    },
    {
      type: 'tracking-section',
      publishDate: '2024-05-16',
      title: '標題標題標題標題標題標題標題標題標題',
      content: [
        {
          alignment: 'center',
          content: ['這邊開始是內文區塊，將測試所有內文工具的顯示。'],
          id: 'f5i39',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [
            '因為測試到<code>&lt;/&gt;</code>之後的資料都不會正常顯示，因此將其他工具測試改到文章起始處。',
          ],
          id: '28sjh',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [
            '次行測試文字變換相關的工具，包含<strong>粗體</strong>、<em>斜體</em>、<u>加底線</u>和<code>「>_」</code>',
          ],
          id: 'd5th3',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [
            '<code>關於「>_」，為使測試更明顯這一段文字都使用了「>_」，看起來應該是明體換黑體字的使用。因此如果原本為黑體字，則看不出變化。</code>',
          ],
          id: '89rva',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: ['以下測試一些特別的工具：'],
          id: '8lmcf',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [
            '1. <!--__ANNOTATION__={"text":"ANNOTATION","annotation":"<div><u>這是註解內容</u></div>","pureAnnotationText":"這是註解內容"}--><!--ANNOTATION-->的使用，是針對內文的部分文字，進行註解。',
          ],
          id: '67d3p',
          styles: {},
          type: 'annotation',
        },
        {
          alignment: 'center',
          content: ['2.BLOCKQUOTE是更顯著文字顯示，使用上有點類似文內抽言。'],
          id: '7jfrk',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [
            {
              quote: 'BLOCKQUOTE，會有另外一個工具視窗，輸入QUOTE內容。',
              quoteBy: '提供quoteBy，是填寫抽言來源',
            },
          ],
          id: '7pole',
          styles: {},
          type: 'quoteby',
        },
        {
          alignment: 'center',
          content: [
            '3.鎖鏈圖示可為文字加上<a target="_blank" href="https://www.twreporter.org/">超連結(此處設定連回網站首頁)</a>，預設為另開新頁。',
          ],
          id: '24kj5',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: ['4.infobox，像是文內的box：'],
          id: 'am38b',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [
            {
              body:
                '<p>infobox提供h2、排序、列點，和文字加粗、斜體、加底線和超連結等基本使用。</p><p>這是h2</p><ol><li>這是排序</li><li>至少要兩行示意</li><ul><li>這是列點</li><li>也是要兩行示意</li></ul><p>這邊則是文字變換，<strong>加粗</strong>、<em>斜體</em>、<u>加底線</u>和<a target="_blank" href="https://www.twreporter.org/">超連結</a>。</p>',
              draftRawObj: {
                blocks: [
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [],
                    key: '38bih',
                    text:
                      'infobox提供h2、排序、列點，和文字加粗、斜體、加底線和超連結等基本使用。',
                    type: 'unstyled',
                  },
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [],
                    key: 'e4vem',
                    text: '這是h2',
                    type: 'unstyled',
                  },
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [],
                    key: 'bh9s',
                    text: '這是排序',
                    type: 'ordered-list-item',
                  },
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [],
                    key: '96ace',
                    text: '至少要兩行示意',
                    type: 'ordered-list-item',
                  },
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [],
                    key: 'b2rr0',
                    text: '這是列點',
                    type: 'unordered-list-item',
                  },
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [],
                    key: 'f0vdn',
                    text: '也是要兩行示意',
                    type: 'unordered-list-item',
                  },
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [
                      {
                        key: 0,
                        length: 3,
                        offset: 19,
                      },
                    ],
                    inlineStyleRanges: [
                      {
                        length: 2,
                        offset: 9,
                        style: 'BOLD',
                      },
                      {
                        length: 2,
                        offset: 12,
                        style: 'ITALIC',
                      },
                      {
                        length: 3,
                        offset: 15,
                        style: 'UNDERLINE',
                      },
                    ],
                    key: 'c3ogv',
                    text: '這邊則是文字變換，加粗、斜體、加底線和超連結。',
                    type: 'unstyled',
                  },
                ],
                entityMap: {
                  '0': {
                    data: {
                      href: 'https://www.twreporter.org/',
                      url: 'https://www.twreporter.org/',
                    },
                    mutability: 'MUTABLE',
                    type: 'LINK',
                  },
                },
              },
              title: 'infobox 標題',
            },
          ],
          id: '4ok1j',
          styles: {},
          type: 'infobox',
        },
        {
          alignment: 'center',
          content: ['5.Embed，是崁入程式：'],
          id: 'fo8g0',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [''],
          id: 'b27ni',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [
            {
              caption: 'caption這是為這個區塊輸入說明',
              embeddedCode:
                '<p style="color:red;">僅使用簡單的html，變換文字顏色</p>',
              embeddedCodeWithoutScript:
                '<p style="color:red;">僅使用簡單的html，變換文字顏色</p>',
              scripts: [],
            },
          ],
          id: 'fcs43',
          styles: {},
          type: 'embeddedcode',
        },
        {
          alignment: 'center',
          content: ['這裡放一段新聞元件的code'],
          id: 'dfgpf',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [''],
          id: 'em4ha',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [
            {
              caption: '',
              embeddedCode:
                '\n    <style data-styled="true" data-styled-version="5.3.5">.jxnira{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:16px;margin-left:auto;margin-right:auto;width:calc(100vw - 68px);}/*!sc*/\n@media (min-width:768px){.jxnira{padding-left:24px;padding-right:24px;}}/*!sc*/\n@media (min-width:768px) and (max-width:1023px){.jxnira{width:453px;}}/*!sc*/\n@media (min-width:1024px) and (max-width:1440px){.jxnira{width:480px;}}/*!sc*/\n@media (min-width:1440px){.jxnira{width:580px;}}/*!sc*/\ndata-styled.g27[id="hint__Container-sc-pfmxtg-0"]{content:"jxnira,"}/*!sc*/\n.bQOKCg{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:4px;padding:4px 12px;border-radius:40px;cursor:pointer;}/*!sc*/\n.bQOKCg > span{font-size:14px;font-family:Noto Sans TC,Sans-Serif,serif;font-weight:500;line-height:21px;}/*!sc*/\n.bQOKCg > svg{width:18px;height:18px;}/*!sc*/\n.bQOKCg.dark{background-color:#404040;color:#fff;}/*!sc*/\n.bQOKCg.dark svg{fill:#fff;}/*!sc*/\n.bQOKCg.light{background-color:#fff;color:#404040;}/*!sc*/\n.bQOKCg.light svg{fill:#404040;}/*!sc*/\n@media (hover:hover){.bQOKCg.dark:hover{background-color:#000;}.bQOKCg.light:hover{background-color:#e2e2e2;}}/*!sc*/\ndata-styled.g28[id="hint__Button-sc-pfmxtg-1"]{content:"bQOKCg,"}/*!sc*/\n.jKVPKd{margin:0;text-align:center;font-family:Noto Sans TC,Sans-Serif,serif;font-weight:400;font-size:14px;line-height:21px;-webkit-letter-spacing:0em;-moz-letter-spacing:0em;-ms-letter-spacing:0em;letter-spacing:0em;color:#808080;}/*!sc*/\ndata-styled.g29[id="hint__HintText-sc-pfmxtg-2"]{content:"jKVPKd,"}/*!sc*/\n.ePfzOA{width:192px;margin-top:24px;}/*!sc*/\n@media (min-width:1440px){.ePfzOA{width:272px;}}/*!sc*/\ndata-styled.g30[id="hint__SeparationLineContainer-sc-pfmxtg-3"]{content:"ePfzOA,"}/*!sc*/\n</style>\n    <script>\n      (function() {\n        var namespace = \'@story-telling-reporter\';\n        var pkg = \'react-karaoke@0.2.9-alpha.5\';\n        if (typeof window != \'undefined\') {\n          if (!window.hasOwnProperty(namespace)) {\n            window[namespace] = {};\n          }\n          if (window[namespace] && !window[namespace].hasOwnProperty(pkg)) {\n            window[namespace][pkg] = [];\n          }\n          if (Array.isArray(window[namespace][pkg])) {\n            var data = {"hintOnly":true,"uuid":"423a0dab-f502-41be-ab68-072cf14f04c8"};\n            window[namespace][pkg].push(data);\n          }\n        }\n      })()\n    </script>\n    <div id="423a0dab-f502-41be-ab68-072cf14f04c8"><div class="hint__Container-sc-pfmxtg-0 jxnira"><p class="hint__HintText-sc-pfmxtg-2 jKVPKd">本文含聲音敘事，開啟聲音以獲得完整閱讀體驗</p><div class="hint__Button-sc-pfmxtg-1 bQOKCg dark"><span>開啟聲音</span><svg viewBox="0 0 24 24" fill="#C09662" xmlns="http://www.w3.org/2000/svg"><path d="M12 9.48366V5.00194C12 4.14669 10.9961 3.6861 10.3478 4.24392L5.41641 8.48708H3C2.44772 8.48708 2 8.93479 2 9.48707V14.6098C2 15.1621 2.44772 15.6098 3 15.6098H5.58884L10.3478 19.7046C10.9961 20.2625 12 19.8019 12 18.9466V14.6133L12 14.6098V9.48708L12 9.48366Z"></path><path d="M16.2974 4.2819C15.9009 4.1623 15.4824 4.38682 15.3628 4.78339C15.2432 5.17996 15.4677 5.5984 15.8643 5.71801C16.529 5.91849 17.1496 6.22502 17.7068 6.61889C19.3811 7.80241 20.4779 9.76964 20.4779 12C20.4779 14.9738 18.5274 17.4787 15.8643 18.2819C15.4677 18.4015 15.2432 18.82 15.3628 19.2165C15.4824 19.6131 15.9009 19.8376 16.2974 19.718C19.5874 18.7258 21.9779 15.6422 21.9779 12C21.9779 9.26726 20.6319 6.84967 18.5726 5.394C17.8863 4.90885 17.1201 4.53001 16.2974 4.2819ZM14.2527 8.28629C13.8585 8.15892 13.4358 8.37519 13.3084 8.76934C13.181 9.16348 13.3973 9.58625 13.7914 9.71362C14.0058 9.78288 14.2085 9.88959 14.3928 10.0292C14.9482 10.4499 15.3309 11.1661 15.3309 12C15.3309 13.1176 14.649 14.0092 13.7914 14.2863C13.3973 14.4137 13.181 14.8364 13.3084 15.2306C13.4358 15.6247 13.8585 15.841 14.2527 15.7136C15.7763 15.2213 16.8309 13.7177 16.8309 12C16.8309 10.7068 16.2364 9.54382 15.2984 8.83343C14.9853 8.5963 14.6333 8.40929 14.2527 8.28629Z"></path></svg></div><div class="hint__SeparationLineContainer-sc-pfmxtg-3 ePfzOA"><svg viewBox="0 0 270 11" xmlns="http://www.w3.org/2000/svg"><path d="M270,11c-6.285,0 -9.463,-2.629 -12.537,-5.172c-3.097,-2.562 -6.023,-4.982 -12.013,-4.982c-5.99,0 -8.915,2.42 -12.013,4.982c-3.074,2.543 -6.252,5.172 -12.537,5.172c-6.284,0 -9.462,-2.629 -12.535,-5.172c-3.097,-2.562 -6.022,-4.982 -12.011,-4.982c-5.99,0 -8.916,2.42 -12.012,4.983c-3.074,2.542 -6.252,5.171 -12.536,5.171c-6.284,0 -9.462,-2.629 -12.535,-5.172c-3.097,-2.562 -6.022,-4.982 -12.011,-4.982c-5.989,0 -8.915,2.42 -12.012,4.983c-3.073,2.542 -6.251,5.171 -12.534,5.171c-6.284,0 -9.461,-2.629 -12.534,-5.172c-3.097,-2.562 -6.021,-4.982 -12.01,-4.982c-5.988,0 -8.912,2.42 -12.008,4.982c-3.073,2.543 -6.251,5.172 -12.534,5.172c-6.283,0 -9.459,-2.629 -12.532,-5.172c-3.096,-2.562 -6.02,-4.982 -12.008,-4.982c-5.989,0 -8.914,2.42 -12.01,4.982c-3.073,2.543 -6.251,5.172 -12.535,5.172c-6.283,0 -9.46,-2.629 -12.533,-5.172c-3.097,-2.562 -6.022,-4.982 -12.01,-4.982l0,-0.846c6.283,0 9.461,2.629 12.534,5.172c3.096,2.562 6.021,4.982 12.009,4.982c5.989,0 8.914,-2.42 12.011,-4.982c3.073,-2.543 6.251,-5.172 12.534,-5.172c6.283,0 9.46,2.629 12.533,5.172c3.095,2.562 6.019,4.982 12.007,4.982c5.988,0 8.913,-2.42 12.009,-4.982c3.073,-2.543 6.25,-5.172 12.533,-5.172c6.283,0 9.461,2.629 12.534,5.172c3.096,2.562 6.022,4.982 12.01,4.982c5.989,0 8.913,-2.42 12.01,-4.982c3.073,-2.543 6.251,-5.172 12.536,-5.172c6.284,0 9.461,2.629 12.535,5.172c3.096,2.562 6.022,4.982 12.011,4.982c5.989,0 8.915,-2.42 12.012,-4.982c3.073,-2.543 6.251,-5.172 12.536,-5.172c6.284,0 9.462,2.629 12.535,5.172c3.097,2.562 6.022,4.982 12.011,4.982c5.99,0 8.916,-2.42 12.013,-4.982c3.074,-2.543 6.252,-5.172 12.537,-5.172c6.286,0 9.463,2.629 12.537,5.172c3.098,2.562 6.023,4.982 12.013,4.982l0,0.846Z" fill="rgb(192, 150, 98)"></path></svg></div></div></div>\n    <script type="text/javascript" defer crossorigin src="https://unpkg.com/@story-telling-reporter/react-embed-code-generator@0.2.9-alpha.5/dist/react-vendor.js"></script><script type="text/javascript" defer crossorigin src="https://unpkg.com/@story-telling-reporter/react-embed-code-generator@0.2.9-alpha.5/dist/regenerator-runtime.js"></script><script type="text/javascript" defer crossorigin src="https://unpkg.com/@story-telling-reporter/react-embed-code-generator@0.2.9-alpha.5/dist/main.js"></script>\n  \n    <style data-styled="true" data-styled-version="5.3.5">.fNCiFX{cursor:pointer;width:40px;height:40px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}/*!sc*/\n.fNCiFX svg{width:24px;margin:auto;}/*!sc*/\ndata-styled.g31[id="twreporter__AudioBt-sc-t66wct-0"]{content:"fNCiFX,"}/*!sc*/\n.gixpxV{margin:0;margin-left:auto;margin-right:auto;text-align:left;width:calc(100vw - 68px);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;gap:8px;}/*!sc*/\n.gixpxV *{box-sizing:border-box;}/*!sc*/\n@media (min-width:768px) and (max-width:1023px){.gixpxV{width:453px;}}/*!sc*/\n@media (min-width:1024px) and (max-width:1440px){.gixpxV{width:480px;padding-left:24px;padding-right:32px;}}/*!sc*/\n@media (min-width:1440px){.gixpxV{width:580px;padding-left:24px;padding-right:32px;}}/*!sc*/\n.gixpxV .twreporter__AudioBt-sc-t66wct-0{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;}/*!sc*/\ndata-styled.g33[id="twreporter__Container-sc-t66wct-2"]{content:"gixpxV,"}/*!sc*/\n.jtyUjJ{max-width:calc(272 / 320 * 100%);}/*!sc*/\n@media (min-width:768px) and (max-width:1023px){.jtyUjJ{max-width:405px;}}/*!sc*/\n@media (min-width:1024px) and (max-width:1440px){.jtyUjJ{max-width:376px;}}/*!sc*/\n@media (min-width:1440px){.jtyUjJ{max-width:476px;}}/*!sc*/\ndata-styled.g34[id="twreporter__QuoteContainer-sc-t66wct-3"]{content:"jtyUjJ,"}/*!sc*/\n</style>\n    <script>\n      (function() {\n        var namespace = \'@story-telling-reporter\';\n        var pkg = \'react-karaoke@0.2.9-alpha.5\';\n        if (typeof window != \'undefined\') {\n          if (!window.hasOwnProperty(namespace)) {\n            window[namespace] = {};\n          }\n          if (window[namespace] && !window[namespace].hasOwnProperty(pkg)) {\n            window[namespace][pkg] = [];\n          }\n          if (Array.isArray(window[namespace][pkg])) {\n            var data = {"componentTheme":"twreporter","audioUrls":["https:\\u002F\\u002Fstory-telling-cms-7gjkrbsx4q-de.a.run.app\\u002Ffiles\\u002Fae-c-a-audio-trimmer-1-oT0Cz5aTWtiYqgZQQzu.mp3"],"webVtt":"WEBVTT\\n00:00:00.000 --\\u003E 00:00:04.500\\n演員，我覺得他就是一個生活的體驗者,\\n\\n00:00:04.600 --\\u003E 00:00:07.500\\n然後生命的實踐家;\\n\\n00:00:08.000 --\\u003E 00:00:11.000\\n期許自己啦，可以這麼做。\\n","quoteBy":"","uuid":"8b603b4a-a79f-4be0-a1c7-4c4b632e0603"};\n            window[namespace][pkg].push(data);\n          }\n        }\n      })()\n    </script>\n    <div id="8b603b4a-a79f-4be0-a1c7-4c4b632e0603"><blockquote class="twreporter__Container-sc-t66wct-2 gixpxV"><div class="twreporter__AudioBt-sc-t66wct-0 fNCiFX"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 20V4L19 12L6 20Z" fill="#C09662"></path></svg></div><video preload="auto" data-twreporter-story-telling="true" data-react-karaoke="true" data-autoplay="true" data-played="false" playsinline="" style="display:none"><track default="" kind="metadata"/><source src="https://story-telling-cms-7gjkrbsx4q-de.a.run.app/files/ae-c-a-audio-trimmer-1-oT0Cz5aTWtiYqgZQQzu.mp3"/></video><div class="twreporter__QuoteContainer-sc-t66wct-3 jtyUjJ"><div></div></div></blockquote></div>\n    <script type="text/javascript" defer crossorigin src="https://unpkg.com/@story-telling-reporter/react-embed-code-generator@0.2.9-alpha.5/dist/react-vendor.js"></script><script type="text/javascript" defer crossorigin src="https://unpkg.com/@story-telling-reporter/react-embed-code-generator@0.2.9-alpha.5/dist/regenerator-runtime.js"></script><script type="text/javascript" defer crossorigin src="https://unpkg.com/@story-telling-reporter/react-embed-code-generator@0.2.9-alpha.5/dist/main.js"></script>\n  ',
              embeddedCodeWithoutScript:
                '\n    <style data-styled="true" data-styled-version="5.3.5">.jxnira{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:16px;margin-left:auto;margin-right:auto;width:calc(100vw - 68px);}/*!sc*/\n@media (min-width:768px){.jxnira{padding-left:24px;padding-right:24px;}}/*!sc*/\n@media (min-width:768px) and (max-width:1023px){.jxnira{width:453px;}}/*!sc*/\n@media (min-width:1024px) and (max-width:1440px){.jxnira{width:480px;}}/*!sc*/\n@media (min-width:1440px){.jxnira{width:580px;}}/*!sc*/\ndata-styled.g27[id="hint__Container-sc-pfmxtg-0"]{content:"jxnira,"}/*!sc*/\n.bQOKCg{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:4px;padding:4px 12px;border-radius:40px;cursor:pointer;}/*!sc*/\n.bQOKCg > span{font-size:14px;font-family:Noto Sans TC,Sans-Serif,serif;font-weight:500;line-height:21px;}/*!sc*/\n.bQOKCg > svg{width:18px;height:18px;}/*!sc*/\n.bQOKCg.dark{background-color:#404040;color:#fff;}/*!sc*/\n.bQOKCg.dark svg{fill:#fff;}/*!sc*/\n.bQOKCg.light{background-color:#fff;color:#404040;}/*!sc*/\n.bQOKCg.light svg{fill:#404040;}/*!sc*/\n@media (hover:hover){.bQOKCg.dark:hover{background-color:#000;}.bQOKCg.light:hover{background-color:#e2e2e2;}}/*!sc*/\ndata-styled.g28[id="hint__Button-sc-pfmxtg-1"]{content:"bQOKCg,"}/*!sc*/\n.jKVPKd{margin:0;text-align:center;font-family:Noto Sans TC,Sans-Serif,serif;font-weight:400;font-size:14px;line-height:21px;-webkit-letter-spacing:0em;-moz-letter-spacing:0em;-ms-letter-spacing:0em;letter-spacing:0em;color:#808080;}/*!sc*/\ndata-styled.g29[id="hint__HintText-sc-pfmxtg-2"]{content:"jKVPKd,"}/*!sc*/\n.ePfzOA{width:192px;margin-top:24px;}/*!sc*/\n@media (min-width:1440px){.ePfzOA{width:272px;}}/*!sc*/\ndata-styled.g30[id="hint__SeparationLineContainer-sc-pfmxtg-3"]{content:"ePfzOA,"}/*!sc*/\n</style>\n    \n    <div id="423a0dab-f502-41be-ab68-072cf14f04c8"><div class="hint__Container-sc-pfmxtg-0 jxnira"><p class="hint__HintText-sc-pfmxtg-2 jKVPKd">本文含聲音敘事，開啟聲音以獲得完整閱讀體驗</p><div class="hint__Button-sc-pfmxtg-1 bQOKCg dark"><span>開啟聲音</span><svg viewBox="0 0 24 24" fill="#C09662" xmlns="http://www.w3.org/2000/svg"><path d="M12 9.48366V5.00194C12 4.14669 10.9961 3.6861 10.3478 4.24392L5.41641 8.48708H3C2.44772 8.48708 2 8.93479 2 9.48707V14.6098C2 15.1621 2.44772 15.6098 3 15.6098H5.58884L10.3478 19.7046C10.9961 20.2625 12 19.8019 12 18.9466V14.6133L12 14.6098V9.48708L12 9.48366Z"></path><path d="M16.2974 4.2819C15.9009 4.1623 15.4824 4.38682 15.3628 4.78339C15.2432 5.17996 15.4677 5.5984 15.8643 5.71801C16.529 5.91849 17.1496 6.22502 17.7068 6.61889C19.3811 7.80241 20.4779 9.76964 20.4779 12C20.4779 14.9738 18.5274 17.4787 15.8643 18.2819C15.4677 18.4015 15.2432 18.82 15.3628 19.2165C15.4824 19.6131 15.9009 19.8376 16.2974 19.718C19.5874 18.7258 21.9779 15.6422 21.9779 12C21.9779 9.26726 20.6319 6.84967 18.5726 5.394C17.8863 4.90885 17.1201 4.53001 16.2974 4.2819ZM14.2527 8.28629C13.8585 8.15892 13.4358 8.37519 13.3084 8.76934C13.181 9.16348 13.3973 9.58625 13.7914 9.71362C14.0058 9.78288 14.2085 9.88959 14.3928 10.0292C14.9482 10.4499 15.3309 11.1661 15.3309 12C15.3309 13.1176 14.649 14.0092 13.7914 14.2863C13.3973 14.4137 13.181 14.8364 13.3084 15.2306C13.4358 15.6247 13.8585 15.841 14.2527 15.7136C15.7763 15.2213 16.8309 13.7177 16.8309 12C16.8309 10.7068 16.2364 9.54382 15.2984 8.83343C14.9853 8.5963 14.6333 8.40929 14.2527 8.28629Z"></path></svg></div><div class="hint__SeparationLineContainer-sc-pfmxtg-3 ePfzOA"><svg viewBox="0 0 270 11" xmlns="http://www.w3.org/2000/svg"><path d="M270,11c-6.285,0 -9.463,-2.629 -12.537,-5.172c-3.097,-2.562 -6.023,-4.982 -12.013,-4.982c-5.99,0 -8.915,2.42 -12.013,4.982c-3.074,2.543 -6.252,5.172 -12.537,5.172c-6.284,0 -9.462,-2.629 -12.535,-5.172c-3.097,-2.562 -6.022,-4.982 -12.011,-4.982c-5.99,0 -8.916,2.42 -12.012,4.983c-3.074,2.542 -6.252,5.171 -12.536,5.171c-6.284,0 -9.462,-2.629 -12.535,-5.172c-3.097,-2.562 -6.022,-4.982 -12.011,-4.982c-5.989,0 -8.915,2.42 -12.012,4.983c-3.073,2.542 -6.251,5.171 -12.534,5.171c-6.284,0 -9.461,-2.629 -12.534,-5.172c-3.097,-2.562 -6.021,-4.982 -12.01,-4.982c-5.988,0 -8.912,2.42 -12.008,4.982c-3.073,2.543 -6.251,5.172 -12.534,5.172c-6.283,0 -9.459,-2.629 -12.532,-5.172c-3.096,-2.562 -6.02,-4.982 -12.008,-4.982c-5.989,0 -8.914,2.42 -12.01,4.982c-3.073,2.543 -6.251,5.172 -12.535,5.172c-6.283,0 -9.46,-2.629 -12.533,-5.172c-3.097,-2.562 -6.022,-4.982 -12.01,-4.982l0,-0.846c6.283,0 9.461,2.629 12.534,5.172c3.096,2.562 6.021,4.982 12.009,4.982c5.989,0 8.914,-2.42 12.011,-4.982c3.073,-2.543 6.251,-5.172 12.534,-5.172c6.283,0 9.46,2.629 12.533,5.172c3.095,2.562 6.019,4.982 12.007,4.982c5.988,0 8.913,-2.42 12.009,-4.982c3.073,-2.543 6.25,-5.172 12.533,-5.172c6.283,0 9.461,2.629 12.534,5.172c3.096,2.562 6.022,4.982 12.01,4.982c5.989,0 8.913,-2.42 12.01,-4.982c3.073,-2.543 6.251,-5.172 12.536,-5.172c6.284,0 9.461,2.629 12.535,5.172c3.096,2.562 6.022,4.982 12.011,4.982c5.989,0 8.915,-2.42 12.012,-4.982c3.073,-2.543 6.251,-5.172 12.536,-5.172c6.284,0 9.462,2.629 12.535,5.172c3.097,2.562 6.022,4.982 12.011,4.982c5.99,0 8.916,-2.42 12.013,-4.982c3.074,-2.543 6.252,-5.172 12.537,-5.172c6.286,0 9.463,2.629 12.537,5.172c3.098,2.562 6.023,4.982 12.013,4.982l0,0.846Z" fill="rgb(192, 150, 98)"></path></svg></div></div></div>\n    \n  \n    <style data-styled="true" data-styled-version="5.3.5">.fNCiFX{cursor:pointer;width:40px;height:40px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}/*!sc*/\n.fNCiFX svg{width:24px;margin:auto;}/*!sc*/\ndata-styled.g31[id="twreporter__AudioBt-sc-t66wct-0"]{content:"fNCiFX,"}/*!sc*/\n.gixpxV{margin:0;margin-left:auto;margin-right:auto;text-align:left;width:calc(100vw - 68px);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;gap:8px;}/*!sc*/\n.gixpxV *{box-sizing:border-box;}/*!sc*/\n@media (min-width:768px) and (max-width:1023px){.gixpxV{width:453px;}}/*!sc*/\n@media (min-width:1024px) and (max-width:1440px){.gixpxV{width:480px;padding-left:24px;padding-right:32px;}}/*!sc*/\n@media (min-width:1440px){.gixpxV{width:580px;padding-left:24px;padding-right:32px;}}/*!sc*/\n.gixpxV .twreporter__AudioBt-sc-t66wct-0{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;}/*!sc*/\ndata-styled.g33[id="twreporter__Container-sc-t66wct-2"]{content:"gixpxV,"}/*!sc*/\n.jtyUjJ{max-width:calc(272 / 320 * 100%);}/*!sc*/\n@media (min-width:768px) and (max-width:1023px){.jtyUjJ{max-width:405px;}}/*!sc*/\n@media (min-width:1024px) and (max-width:1440px){.jtyUjJ{max-width:376px;}}/*!sc*/\n@media (min-width:1440px){.jtyUjJ{max-width:476px;}}/*!sc*/\ndata-styled.g34[id="twreporter__QuoteContainer-sc-t66wct-3"]{content:"jtyUjJ,"}/*!sc*/\n</style>\n    \n    <div id="8b603b4a-a79f-4be0-a1c7-4c4b632e0603"><blockquote class="twreporter__Container-sc-t66wct-2 gixpxV"><div class="twreporter__AudioBt-sc-t66wct-0 fNCiFX"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 20V4L19 12L6 20Z" fill="#C09662"></path></svg></div><video preload="auto" data-twreporter-story-telling="true" data-react-karaoke="true" data-autoplay="true" data-played="false" playsinline="" style="display:none"><track default="" kind="metadata"/><source src="https://story-telling-cms-7gjkrbsx4q-de.a.run.app/files/ae-c-a-audio-trimmer-1-oT0Cz5aTWtiYqgZQQzu.mp3"/></video><div class="twreporter__QuoteContainer-sc-t66wct-3 jtyUjJ"><div></div></div></blockquote></div>\n    \n  ',
              scripts: [
                {
                  attribs: {},
                  text:
                    '\n      (function() {\n        var namespace = \'@story-telling-reporter\';\n        var pkg = \'react-karaoke@0.2.9-alpha.5\';\n        if (typeof window != \'undefined\') {\n          if (!window.hasOwnProperty(namespace)) {\n            window[namespace] = {};\n          }\n          if (window[namespace] && !window[namespace].hasOwnProperty(pkg)) {\n            window[namespace][pkg] = [];\n          }\n          if (Array.isArray(window[namespace][pkg])) {\n            var data = {"hintOnly":true,"uuid":"423a0dab-f502-41be-ab68-072cf14f04c8"};\n            window[namespace][pkg].push(data);\n          }\n        }\n      })()\n    ',
                },
                {
                  attribs: {
                    crossorigin: '',
                    defer: '',
                    src:
                      'https://unpkg.com/@story-telling-reporter/react-embed-code-generator@0.2.9-alpha.5/dist/react-vendor.js',
                    type: 'text/javascript',
                  },
                },
                {
                  attribs: {
                    crossorigin: '',
                    defer: '',
                    src:
                      'https://unpkg.com/@story-telling-reporter/react-embed-code-generator@0.2.9-alpha.5/dist/regenerator-runtime.js',
                    type: 'text/javascript',
                  },
                },
                {
                  attribs: {
                    crossorigin: '',
                    defer: '',
                    src:
                      'https://unpkg.com/@story-telling-reporter/react-embed-code-generator@0.2.9-alpha.5/dist/main.js',
                    type: 'text/javascript',
                  },
                },
                {
                  attribs: {},
                  text:
                    '\n      (function() {\n        var namespace = \'@story-telling-reporter\';\n        var pkg = \'react-karaoke@0.2.9-alpha.5\';\n        if (typeof window != \'undefined\') {\n          if (!window.hasOwnProperty(namespace)) {\n            window[namespace] = {};\n          }\n          if (window[namespace] && !window[namespace].hasOwnProperty(pkg)) {\n            window[namespace][pkg] = [];\n          }\n          if (Array.isArray(window[namespace][pkg])) {\n            var data = {"componentTheme":"twreporter","audioUrls":["https:\\u002F\\u002Fstory-telling-cms-7gjkrbsx4q-de.a.run.app\\u002Ffiles\\u002Fae-c-a-audio-trimmer-1-oT0Cz5aTWtiYqgZQQzu.mp3"],"webVtt":"WEBVTT\\n00:00:00.000 --\\u003E 00:00:04.500\\n演員，我覺得他就是一個生活的體驗者,\\n\\n00:00:04.600 --\\u003E 00:00:07.500\\n然後生命的實踐家;\\n\\n00:00:08.000 --\\u003E 00:00:11.000\\n期許自己啦，可以這麼做。\\n","quoteBy":"","uuid":"8b603b4a-a79f-4be0-a1c7-4c4b632e0603"};\n            window[namespace][pkg].push(data);\n          }\n        }\n      })()\n    ',
                },
                {
                  attribs: {
                    crossorigin: '',
                    defer: '',
                    src:
                      'https://unpkg.com/@story-telling-reporter/react-embed-code-generator@0.2.9-alpha.5/dist/react-vendor.js',
                    type: 'text/javascript',
                  },
                },
                {
                  attribs: {
                    crossorigin: '',
                    defer: '',
                    src:
                      'https://unpkg.com/@story-telling-reporter/react-embed-code-generator@0.2.9-alpha.5/dist/regenerator-runtime.js',
                    type: 'text/javascript',
                  },
                },
                {
                  attribs: {
                    crossorigin: '',
                    defer: '',
                    src:
                      'https://unpkg.com/@story-telling-reporter/react-embed-code-generator@0.2.9-alpha.5/dist/main.js',
                    type: 'text/javascript',
                  },
                },
              ],
            },
          ],
          id: 'ald2v',
          styles: {},
          type: 'embeddedcode',
        },
        {
          alignment: 'center',
          content: ['6.Audio，可以添加音檔使用：'],
          id: '3pth9',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [''],
          id: '7htm0',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [
            {
              coverPhoto: {},
              description: '<p>10220天的等待_cover music_音樂演出╱生祥樂隊</p>',
              filetype: 'audio/mp3',
              id: '57b15bb1aa7f1512002961f4',
              title: '10220天的等待_cover music_音樂演出╱生祥樂隊',
              url:
                'https://storage.googleapis.com/twreporter-multimedia/audios/20160815060537-5ec2b49c976aca4d96f5796f2c82cd70.mp3',
            },
          ],
          id: '9ibnm',
          styles: {},
          type: 'audio',
        },
        {
          alignment: 'center',
          content: ['7.Img，可以添加圖片使用：'],
          id: 'ab7i9',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [
            {
              description: '這裡添加圖說',
              desktop: {
                height: 800,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815164907-dbd49006d60a96e3850d5e4d2e4a33ce-desktop.jpg',
                width: 1200,
              },
              id: '57b1f28652f20612002abb79',
              keywords: '',
              mobile: {
                height: 533,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815164907-dbd49006d60a96e3850d5e4d2e4a33ce-mobile.jpg',
                width: 800,
              },
              original: {
                height: 800,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815164907-dbd49006d60a96e3850d5e4d2e4a33ce.jpg',
                width: 1200,
              },
              tablet: {
                height: 800,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815164907-dbd49006d60a96e3850d5e4d2e4a33ce-tablet.jpg',
                width: 1200,
              },
              tiny: {
                height: 100,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815164907-dbd49006d60a96e3850d5e4d2e4a33ce-tiny.jpg',
                width: 150,
              },
              url:
                'https://storage.googleapis.com/twreporter-multimedia/images/20160815164907-dbd49006d60a96e3850d5e4d2e4a33ce-mobile.jpg',
            },
          ],
          id: '1rmuo',
          styles: {},
          type: 'image',
        },
        {
          alignment: 'center',
          content: ['8.Diff，針對兩張照片進行比較的特殊圖片元件：'],
          id: '7l0mh',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [
            {
              description: '第一張圖',
              desktop: {
                height: 777,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165352-0a14ea0a58e7a17742ac131ddc84d5df-desktop.jpg',
                width: 1200,
              },
              id: '57b1f3a252f20612002abbd8',
              keywords: '',
              mobile: {
                height: 518,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165352-0a14ea0a58e7a17742ac131ddc84d5df-mobile.jpg',
                width: 800,
              },
              original: {
                height: 777,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165352-0a14ea0a58e7a17742ac131ddc84d5df.jpg',
                width: 1200,
              },
              tablet: {
                height: 777,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165352-0a14ea0a58e7a17742ac131ddc84d5df-tablet.jpg',
                width: 1200,
              },
              tiny: {
                height: 97,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165352-0a14ea0a58e7a17742ac131ddc84d5df-tiny.jpg',
                width: 150,
              },
              url:
                'https://storage.googleapis.com/twreporter-multimedia/images/20160815165352-0a14ea0a58e7a17742ac131ddc84d5df-mobile.jpg',
            },
            {
              description: '第二張圖',
              desktop: {
                height: 795,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815170105-982813ca9518e098021017c9ce656d9a-desktop.jpg',
                width: 1200,
              },
              id: '57b1f55452f20612002abc53',
              keywords: '',
              mobile: {
                height: 530,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815170105-982813ca9518e098021017c9ce656d9a-mobile.jpg',
                width: 800,
              },
              original: {
                height: 795,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815170105-982813ca9518e098021017c9ce656d9a.jpg',
                width: 1200,
              },
              tablet: {
                height: 795,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815170105-982813ca9518e098021017c9ce656d9a-tablet.jpg',
                width: 1200,
              },
              tiny: {
                height: 99,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815170105-982813ca9518e098021017c9ce656d9a-tiny.jpg',
                width: 150,
              },
              url:
                'https://storage.googleapis.com/twreporter-multimedia/images/20160815170105-982813ca9518e098021017c9ce656d9a-mobile.jpg',
            },
          ],
          id: 'e4e0n',
          styles: {},
          type: 'imagediff',
        },
        {
          alignment: 'center',
          content: [
            '9.ImgLink，這是利用絕對位址的方式輸入圖片，可在url輸入圖片絕對位置。',
          ],
          id: '39q1t',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [
            {
              caption: '在description撰寫圖說',
              embeddedCodeWithoutScript:
                '<img alt="在description撰寫圖說" src="https://www.twreporter.org/images/20240123144553-da2d0f246cb15f8b80047ce17da22c1d-desktop.jpg" class="img-responsive"/>',
              url:
                'https://www.twreporter.org/images/20240123144553-da2d0f246cb15f8b80047ce17da22c1d-desktop.jpg',
            },
          ],
          id: 'a59gu',
          styles: {},
          type: 'embeddedcode',
        },
        {
          alignment: 'center',
          content: ['10.Slideshow，是圖像輪播工具：'],
          id: '4pg7v',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [
            {
              description: '圖說一圖說一圖說一圖說一',
              desktop: {
                height: 777,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165352-0a14ea0a58e7a17742ac131ddc84d5df-desktop.jpg',
                width: 1200,
              },
              id: '57b1f3a252f20612002abbd8',
              keywords: '',
              mobile: {
                height: 518,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165352-0a14ea0a58e7a17742ac131ddc84d5df-mobile.jpg',
                width: 800,
              },
              original: {
                height: 777,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165352-0a14ea0a58e7a17742ac131ddc84d5df.jpg',
                width: 1200,
              },
              tablet: {
                height: 777,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165352-0a14ea0a58e7a17742ac131ddc84d5df-tablet.jpg',
                width: 1200,
              },
              tiny: {
                height: 97,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165352-0a14ea0a58e7a17742ac131ddc84d5df-tiny.jpg',
                width: 150,
              },
              url:
                'https://storage.googleapis.com/twreporter-multimedia/images/20160815165352-0a14ea0a58e7a17742ac131ddc84d5df-mobile.jpg',
            },
            {
              description: '圖說二圖說二圖說二圖說二圖說二',
              desktop: {
                height: 1000,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165225-79eb9eaad70c8b74398094420ca6ac8a-desktop.jpg',
                width: 1500,
              },
              id: '57b1f35052f20612002abbbc',
              keywords: '',
              mobile: {
                height: 533,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165225-79eb9eaad70c8b74398094420ca6ac8a-mobile.jpg',
                width: 800,
              },
              original: {
                height: 1000,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165225-79eb9eaad70c8b74398094420ca6ac8a.jpg',
                width: 1500,
              },
              tablet: {
                height: 800,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165225-79eb9eaad70c8b74398094420ca6ac8a-tablet.jpg',
                width: 1200,
              },
              tiny: {
                height: 100,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165225-79eb9eaad70c8b74398094420ca6ac8a-tiny.jpg',
                width: 150,
              },
              url:
                'https://storage.googleapis.com/twreporter-multimedia/images/20160815165225-79eb9eaad70c8b74398094420ca6ac8a-mobile.jpg',
            },
            {
              description: '圖說三圖說三圖說三圖說三圖說三',
              desktop: {
                height: 795,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815170105-982813ca9518e098021017c9ce656d9a-desktop.jpg',
                width: 1200,
              },
              id: '57b1f55452f20612002abc53',
              keywords: '',
              mobile: {
                height: 530,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815170105-982813ca9518e098021017c9ce656d9a-mobile.jpg',
                width: 800,
              },
              original: {
                height: 795,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815170105-982813ca9518e098021017c9ce656d9a.jpg',
                width: 1200,
              },
              tablet: {
                height: 795,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815170105-982813ca9518e098021017c9ce656d9a-tablet.jpg',
                width: 1200,
              },
              tiny: {
                height: 99,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815170105-982813ca9518e098021017c9ce656d9a-tiny.jpg',
                width: 150,
              },
              url:
                'https://storage.googleapis.com/twreporter-multimedia/images/20160815170105-982813ca9518e098021017c9ce656d9a-mobile.jpg',
            },
            {
              description: '圖說四圖說四圖說四圖說四圖說四',
              desktop: {
                height: 1335,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165354-6c5ffc5841e45592e4b95a6218340d30-desktop.jpg',
                width: 2000,
              },
              id: '57b1f3a552f20612002abbd9',
              keywords: '',
              mobile: {
                height: 534,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165354-6c5ffc5841e45592e4b95a6218340d30-mobile.jpg',
                width: 800,
              },
              original: {
                height: 1869,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165354-6c5ffc5841e45592e4b95a6218340d30.jpg',
                width: 2800,
              },
              tablet: {
                height: 801,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165354-6c5ffc5841e45592e4b95a6218340d30-tablet.jpg',
                width: 1200,
              },
              tiny: {
                height: 100,
                url:
                  'https://storage.googleapis.com/twreporter-multimedia/images/20160815165354-6c5ffc5841e45592e4b95a6218340d30-tiny.jpg',
                width: 150,
              },
              url:
                'https://storage.googleapis.com/twreporter-multimedia/images/20160815165354-6c5ffc5841e45592e4b95a6218340d30-mobile.jpg',
            },
          ],
          id: '6msh2',
          styles: {},
          type: 'slideshow',
        },
        {
          alignment: 'center',
          content: ['11.youtobe，輸入影片ID可以放入影片：'],
          id: '9l6me',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: [
            {
              description: '這是影片的相關描述',
              youtubeId: 'PLxJh987ubmZ9OKu',
            },
          ],
          id: '6i4j',
          styles: {},
          type: 'youtube',
        },
        {
          alignment: 'center',
          content: [
            '以下測試「“」、「<code>&lt;/&gt;</code>」、「H1」、「H2」、「排序」和「列點」：',
          ],
          id: '4jbhu',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: ['這是QUOTE「“」，顯示樣式如畫面所示，下列呈現斷行效果。'],
          id: 'fq1tu',
          styles: {},
          type: 'blockquote',
        },
        {
          alignment: 'center',
          content: [
            '<em>QUOTE在輸入時，左側有直線，且字體會是斜體。但實際呈現都不會有這些。而是網頁版內縮一個字，手機版沒有，字體大小和內文一樣的灰字。這些說明文字含標點符號共七十九字。</em>',
          ],
          id: 'bkrev',
          styles: {},
          type: 'blockquote',
        },
        {
          alignment: 'center',
          content: [
            '<code><p style="color:blue;">這是「&lt;/&gt;」，嘗試寫了用p包住資料，並設定style的color為藍色，顯示此工具可以撰寫html</p></code>',
          ],
          id: '5ta1v',
          styles: {},
          type: 'code-block',
        },
        {
          alignment: 'center',
          content: [
            '<code><p style="color:blue;">經過測試，每一個區塊下方需要輸入資料，區塊上方才能正常顯示。共使用了三段，目前第三段無顯示。</p></code>',
          ],
          id: 'cptqv',
          styles: {},
          type: 'code-block',
        },
        {
          alignment: 'center',
          content: [
            '<code><p style="color:blue;">這是連續使用&lt;/&gt;，經過實測文字顯示位置有點難以預料。</p></code>',
          ],
          id: 'dkqno',
          styles: {},
          type: 'code-block',
        },
        {
          alignment: 'center',
          content: [
            '工具列顯示這是 H1，預設為標題使用，實際使用 html 的 div，class 有用到 H2Container，前後行距為預設值，無刻意塞空白行',
          ],
          id: '56h3k',
          styles: {},
          type: 'header-one',
        },
        {
          alignment: 'center',
          content: [
            '工具列顯示這是 H2，預設為標題使用，實際使用 html 的 div，class 有用到 H3Container，前後行距為預設值，無刻意塞空白行',
          ],
          id: '3p0g',
          styles: {},
          type: 'header-two',
        },
        {
          alignment: 'center',
          content: ['這是「排序」，此行為第一點。', '此行為第二點。'],
          id: 'aEDZokQvd',
          styles: {},
          type: 'ordered-list-item',
        },
        {
          alignment: 'center',
          content: [
            '經過連續兩次斷行或斷行後刪除編號，再斷行一次，可以再另起一個列點如下：',
          ],
          id: '82h98',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: ['第一點呈現。', '第二點呈現。', '第三點呈現。'],
          id: 'cjmkv',
          styles: {},
          type: 'ordered-list-item',
        },
        {
          alignment: 'center',
          content: ['這是「列點」，此行為第一點。', '次行為第二點。'],
          id: 'zRAHCO4cRS',
          styles: {},
          type: 'unordered-list-item',
        },
        {
          alignment: 'center',
          content: ['操作方式同「排序」'],
          id: '7iu4c',
          styles: {},
          type: 'unstyled',
        },
        {
          alignment: 'center',
          content: ['可以另起一個新的列點。', '如此處所示。'],
          id: 'BCSQigJ8f_',
          styles: {},
          type: 'unordered-list-item',
        },
        {
          alignment: 'center',
          content: ['此行以下文字都無法正常顯示。'],
          id: '91pb1',
          styles: {},
          type: 'unstyled',
        },
      ],
    },
  ]

  return (
    <div>
      <Helmet
        prioritizeSeoTags
        title={ogTitle}
        link={[{ rel: 'canonical', href: canonical }]}
        meta={[
          { name: 'description', content: ogDesc },
          { name: 'twitter:title', content: ogTitle },
          {
            name: 'twitter:image',
            content: replaceGCSUrlOrigin(ogImage.url),
          },
          { name: 'twitter:description', content: ogDesc },
          { name: 'twitter:card', content: 'summary_large_image' },
          { property: 'og:title', content: ogTitle },
          { property: 'og:description', content: ogDesc },
          { property: 'og:type', content: 'article' },
          { property: 'og:url', content: canonical },
          { property: 'og:rich_attachment', content: 'true' },
          ...metaOgImage,
        ]}
      />
      <div itemScope itemType="http://schema.org/Article">
        <div
          itemProp="publisher"
          itemScope
          itemType="http://schema.org/Organization"
        >
          <meta itemProp="name" content="報導者" />
          <meta itemProp="email" content="contact@twreporter.org" />
          <link
            itemProp="logo"
            href="https://www.twreporter.org/asset/logo-large.png"
          />
          <link itemProp="url" href="https://www.twreporter.org/" />
        </div>
        <link itemProp="mainEntityOfPage" href={canonical} />
        <meta
          itemProp="dateModified"
          content={date2yyyymmdd(_.get(post, 'updated_at'))}
        />
        <div id="article-body" ref={articleBodyRef}>
          <ArticleComponent
            post={post}
            relatedTopic={post.topic}
            relatedPosts={relateds}
            hasMoreRelateds={hasMoreRelateds}
            loadMoreRelateds={loadMoreRelateds}
            fontLevel={fontLevel}
            onFontLevelChange={handleFontLevelChange}
            LinkComponent={Link}
            releaseBranch={releaseBranch}
            onToggleTabExpanded={onToggleTabExpanded}
            // TODO: pass isFetchingRelateds to show loadin spinner
            // TODO: pass errorOfRelateds to show error message to end users
            trackingSection={trackingSection}
          />
        </div>
      </div>
      <ArticleBanner
        isExpanded={isExpanded}
        isAuthed={isAuthed}
        userRole={userRole}
      />
    </div>
  )
}

Article.propTypes = {
  errorOfPost: PropTypes.object,
  errorOfRelateds: PropTypes.object,
  fontLevel: PropTypes.string,
  isFetchingPost: PropTypes.bool,
  isFetchingRelateds: PropTypes.bool,
  post: PropTypes.object,
  // TODO: relateds: PropTypes.arrayOf(propTypeConst.post)
  relateds: PropTypes.array,
  hasMoreRelateds: PropTypes.bool,
  slugToFetch: PropTypes.string,
  isAuthed: PropTypes.bool,
  userRole: PropTypes.array.isRequired,
  jwt: PropTypes.string,
  userID: PropTypes.string,
  postID: PropTypes.string,
  fetchAFullPost: PropTypes.func,
  fetchRelatedPostsOfAnEntity: PropTypes.func,
  changeFontLevel: PropTypes.func,
  setUserAnalyticsData: PropTypes.func,
  setUserFootprint: PropTypes.func,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  releaseBranch: predefinedPropTypes.releaseBranch,
}

Article.defaultProps = {
  errorOfPost: null,
  errorOfRelateds: null,
  fontLevel: 'small',
  isFetchingPost: false,
  isFetchingRelateds: false,
  relateds: [],
  hasMoreRelateds: false,
  slugToFetch: '',
  releaseBranch: releaseBranchConsts.master,
  isAuthed: false,
}

const { actions, actionTypes, reduxStateFields } = twreporterRedux
const {
  fetchAFullPost,
  fetchRelatedPostsOfAnEntity,
  setUserAnalyticsData,
  setUserFootprint,
} = actions
const {
  entities,
  relatedPostsOf,
  selectedPost,
  postsInEntities,
} = reduxStateFields

/**
 *  @typedef {import('@twreporter/redux/lib/typedef').ReduxState} ReduxState
 */

/**
 *  @typedef {import('../utils/shallow-clone-entity').FullPost} FullPost
 */

/**
 *  @typedef {import('../utils/shallow-clone-entity').MetaOfPost} MetaOfPost
 */

const memoizeShallowCloneFullPost = memoizeOne(cloneUtils.shallowCloneFullPost)

/**
 *  This function returns a post which is cloned from entities state.
 *  @param {ReduxState} state
 *  @param {string} id - id of post
 *  @return {FullPost}
 */
function postProp(state, id) {
  const post = _.get(state, [entities, postsInEntities, 'byId', id], null)
  return memoizeShallowCloneFullPost(post)
}

/**
 *  This function returns cloned related posts of the post.
 *  @param {ReduxState} state
 *  @param {string} id - id of post
 *  @return {MetaOfPost[]}
 */
function relatedsProp(state, id) {
  const relatedPostIds = _.get(state, [relatedPostsOf, 'byId', id, 'items'], [])
  const relateds = []
  _.forEach(relatedPostIds, postId => {
    // skip because of duplicate
    if (postId === id) {
      return
    }

    const post = _.get(state, [entities, postsInEntities, 'byId', postId], null)
    if (post !== null) {
      relateds.push(cloneUtils.shallowCloneMetaOfPost(post))
    }
  })
  return relateds
}

export function mapStateToProps(state, props) {
  const currentPostSlug = _.get(props, 'match.params.slug', '')

  const defaultRtn = {
    errorOfPost: null,
    errorOfRelateds: null,
    fontLevel: 'small',
    isFetchingPost: false,
    isFetchingRelateds: false,
    post: null,
    relateds: [],
    hasMoreRelateds: false,
    slugToFetch: '',
  }

  if (currentPostSlug === '') {
    return Object.assign(defaultRtn, {
      errorOfPost: { statusCode: 404 },
    })
  }

  // user clicks another post
  const slug = _.get(state, [selectedPost, 'slug'], '')
  if (currentPostSlug !== slug) {
    return Object.assign(defaultRtn, {
      isFetchingPost: true,
      // set slugToFetch to current post slug to
      // make requests to api server to fetch that post
      slugToFetch: currentPostSlug,
    })
  }

  // the results of a full post or corresponding related posts are changed
  const postId = _.get(state, [entities, postsInEntities, 'slugToId', slug], '')
  return {
    errorOfPost: _.get(state, [selectedPost, 'error'], null),
    errorOfRelateds: _.get(
      state,
      [relatedPostsOf, 'byId', postId, 'error'],
      null
    ),
    fontLevel: _.get(state, [reduxStateFields.settings, 'fontLevel'], 'small'),
    isFetchingPost: _.get(state, [selectedPost, 'isFetching'], false),
    isFetchingRelateds: _.get(
      state,
      [relatedPostsOf, 'byId', postId, 'isFetching'],
      false
    ),
    post: postProp(state, postId),
    relateds: relatedsProp(state, postId),
    hasMoreRelateds:
      _.get(state, [relatedPostsOf, 'byId', postId, 'more', 'length'], 0) > 0,
    // set slugToFetch to empty string to
    // avoid from re-fetching the post already in redux state
    slugToFetch: '',
    isAuthed: _.get(state, [reduxStateFields.auth, 'isAuthed'], false),
    userRole: _.get(state, [reduxStateFields.auth, 'userInfo', 'roles'], []),
    jwt: _.get(state, [reduxStateFields.auth, 'accessToken'], ''),
    userID: _.get(state, [reduxStateFields.auth, 'userInfo', 'user_id']),
    postID: postId,
  }
}

function changeFontLevel(fontLevel) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.settings.changeFontLevel,
      payload: fontLevel,
    })
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchAFullPost,
      fetchRelatedPostsOfAnEntity,
      changeFontLevel,
      setUserAnalyticsData,
      setUserFootprint,
    }
  )(Article)
)
