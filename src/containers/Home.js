/*eslint no-unused-vars:0, no-console:0 */
'use strict'
import { Link } from 'react-router'
import { BRIGHT, CATEGORY, HOME, REVIEW_CH_STR, SITE_NAME, SITE_META, SPECIAL_TOPIC_CH_STR } from '../constants/index'
import { connect } from 'react-redux'
import { denormalizeArticles, getCatId, replaceStorageUrlPrefix } from '../utils/index'
import { devCatListId, prodCatListId } from '../conf/list-id'
import { fetchArticlesByUuidIfNeeded, fetchFeatureArticles } from '../actions/articles'
import { setHeaderInfo } from '../actions/header'
import Daily from '../components/Daily'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Helmet from 'react-helmet'
import PromotionBanner from '../components/shared/PromotionBanner'
import React, { Component } from 'react'
import TopNews from '../components/TopNews'
import async from 'async'
import backToTopicIcon from '../../static/asset/back-to-topic.svg'
import styles from './Home.scss'

// lodash
import get from 'lodash/get'

const MAXRESULT = 10
const PAGE = 1

class Home extends Component {
  static fetchData({
    store
  }) {
    let params = {
      page: PAGE,
      max_results: MAXRESULT
    }
    return new Promise((resolve, reject) => {
      // load tagged articles in parallel
      async.parallel([
        function (callback) {
          store.dispatch(fetchFeatureArticles())
            .then(() => {
              callback(null)
            })
        },
        function (callback) {
          store.dispatch(fetchArticlesByUuidIfNeeded(getCatId(REVIEW_CH_STR), CATEGORY, params))
            .then(() => {
              callback(null)
            })
        },
        function (callback) {
          store.dispatch(fetchArticlesByUuidIfNeeded(getCatId(SPECIAL_TOPIC_CH_STR), CATEGORY, params))
            .then(() => {
              callback(null)
            })
        }
      ], (err, results) => {
        if (err) {
          console.warn('fetchData occurs error:', err)
        }
        resolve()
      })
    })
  }

  constructor(props, context) {
    super(props, context)
    this.specialTopicListId = getCatId(SPECIAL_TOPIC_CH_STR)
    this.reviewListId = getCatId(REVIEW_CH_STR)
    this.loadMoreArticles = this._loadMoreArticles.bind(this, this.specialTopicListId)
  }

  componentWillMount() {
    const { articlesByUuids, featureArticles, fetchArticlesByUuidIfNeeded, fetchFeatureArticles, setHeaderInfo } = this.props
    setHeaderInfo({
      pageTheme: BRIGHT,
      pageType: HOME,
      readPercent: 0
    })

    let params = {
      page: PAGE,
      max_results: MAXRESULT
    }
    if (get(featureArticles, 'items.length', 0) === 0) {
      fetchFeatureArticles()
    }
    if (get(articlesByUuids, [ this.reviewListId, 'items', 'length' ], 0) < MAXRESULT) {
      fetchArticlesByUuidIfNeeded(this.reviewListId, CATEGORY, params)
    }
    if (get(articlesByUuids, [ this.specialTopicListId, 'items', 'length' ], 0) < MAXRESULT) {
      fetchArticlesByUuidIfNeeded(this.specialTopicListId, CATEGORY, params)
    }

  }

  _loadMoreArticles(catId) {
    const { articlesByUuids, fetchArticlesByUuidIfNeeded } = this.props

    if (get(articlesByUuids, [ catId, 'hasMore' ]) === false) {
      return
    }

    let itemSize = get(articlesByUuids, [ catId, 'items', 'length' ], 0)
    let page = Math.floor(itemSize / MAXRESULT) + 1
    fetchArticlesByUuidIfNeeded(catId, CATEGORY, {
      page: page,
      max_results: MAXRESULT
    })
  }

  render() {
    const { articlesByUuids, entities, featureArticles } = this.props
    const topnews_num = 5
    let topnewsItems = denormalizeArticles(get(featureArticles, 'items', []), entities)
    let specialTopicItems = denormalizeArticles(get(articlesByUuids, [ this.specialTopicListId, 'items' ], []), entities)
    let reviewItems = denormalizeArticles(get(articlesByUuids, [ this.reviewListId, 'items' ], []), entities)

    let microData = (
      <div itemScope itemType="http://www.schema.org/SiteNavigationElement">
        <div>
          <meta itemProp="name" content="首頁" />
          <link itemProp="url" href="https://www.twreporter.org/" />
        </div>
        <div>
          <meta itemProp="name" content="台灣" />
          <link itemProp="url" href="https://www.twreporter.org/category/taiwan" />
        </div>
        <div>
          <meta itemProp="name" content="文化" />
          <link itemProp="url" href="https://www.twreporter.org/category/culture" />
        </div>
        <div>
          <meta itemProp="name" content="國際" />
          <link itemProp="url" href="https://www.twreporter.org/category/intl" />
        </div>
        <div>
          <meta itemProp="name" content="影像" />
          <link itemProp="url" href="https://www.twreporter.org/photography" />
        </div>
        <div>
          <meta itemProp="name" content="評論" />
          <link itemProp="url" href="https://www.twreporter.org/category/review" />
        </div>
        <div>
          <meta itemProp="name" content="作者列表" />
          <link itemProp="url" href="https://www.twreporter.org/authors" />
        </div>
        <div>
          <meta itemProp="name" content="轉型正義" />
          <link itemProp="url" href="https://www.twreporter.org/topic/57ac8151363d1610007ef656" />
        </div>
        <div>
          <meta itemProp="name" content="美國總統大選" />
          <link itemProp="url" href="https://www.twreporter.org/tag/57b065e5360b651200848d76" />
        </div>
        <div>
          <meta itemProp="name" content="亞洲森林浩劫" />
          <link itemProp="url" href="https://www.twreporter.org/topic/57ac816f363d1610007ef658" />
        </div>
        <div>
          <meta itemProp="name" content="走入同志家庭" />
          <link itemProp="url" href="https://www.twreporter.org/topic/57ac8177363d1610007ef659" />
        </div>
        <div>
          <meta itemProp="name" content="急診人生" />
          <link itemProp="url" href="https://www.twreporter.org/topic/57ac8180363d1610007ef65aa" />
        </div>
        <div>
          <meta itemProp="name" content="五輕關廠" />
          <link itemProp="url" href="https://www.twreporter.org/topic/57ac8192363d1610007ef65b" />
        </div>
      </div>

    )

    let organizationJSONLD = `
      {
        "@context" : "http://schema.org",
        "@type" : "Organization",
        "legalName" : "財團法人報導者文化基金會",
        "alternateName": "報導者 The Reporter",
        "url": "https://www.twreporter.org/",
        "logo": "https://www.twreporter.org/storage/images/logo.png",
        "sameAs": [
          "http://www.facebook.com/twreporter",
          "https://www.instagram.com/twreporter/",
          "https://www.youtube.com/channel/UCbWm0FTcQgRyc--ZsAzGcRA"
        ],
        "potentialAction" : {
          "@type" : "SearchAction",
          "target" : "https://www.twreporter.org/search?q={search_term}",
          "query-input" : "required name=search_term"
        }
      }
    `
    let webSiteJSONLD = `
      {
        "@context" : "http://schema.org",
        "@type" : "WebSite",
        "name" : "報導者 The Reporter",
        "url" : "https://www.twreporter.org/",
        "potentialAction" : {
          "@type" : "SearchAction",
          "target" : "https://www.twreporter.org/search?q={search_term}",
          "query-input" : "required name=search_term"
        }
      }
    `
    let breadcrumbListJSONLD = `
    {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@id": "https://www.twreporter.org/",
            "name": "首頁"
          }
        },{
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/category/taiwan",
            "name": "台灣"
          }
        },{
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/category/intl",
            "name": "國際"
          }
        },{
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/category/culture",
            "name": "文化"
          }
        },{
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/category/review",
            "name": "評論"
          }
        }, {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/photography",
            "name": "影像"
          }
        }, {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/authors",
            "name": "作者列表"
          }
        }]
      }
    `
    const promotionImg = 'https://www.twreporter.org/images/20170628161533-67fae5e08b65d9ae0f5c713a09888e31-tablet.jpg'
    const promotionImg2 = 'https://www.twreporter.org/images/20170429183015-ec711d99b80d9ab3914e8b9ac999de19-tablet.jpg'
    const promotionImg3 = 'https://www.twreporter.org/images/20170504155912-6ec3adfb924dd24ec111298bd4c867e9.png'

    return (
      <div>
        <Helmet
          title={SITE_NAME.FULL}
          link={[
            { rel: 'canonical', href: SITE_META.URL }
          ]}
          meta={[
            { name: 'description', content: SITE_META.DESC },
            { name: 'twitter:title', content: SITE_NAME.FULL },
            { name: 'twitter:image', content: SITE_META.LOGO },
            { name: 'twitter:description', content: SITE_META.DESC },
            { property: 'og:title', content: SITE_NAME.FULL },
            { property: 'og:description', content: SITE_META.DESC },
            { property: 'og:image', content: SITE_META.LOGO },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: SITE_META.URL }
          ]}
        />
        <TopNews topnews={topnewsItems} />
        {/* Hard code promotion bannder*/}
        <div className={styles['annual-report']}>
          <span>香港主權移交20年</span>
        </div>
        <Link to="/topics/transfer-of-sovereignty-over-hong-kong-20years">
          <div className={styles['index-promotion']}>
            <PromotionBanner
              bgImgSrc={promotionImg}
              iconImgSrc={backToTopicIcon}
              title="香港，你好嗎？"
              subtitle=""
            />
          </div>
        </Link>
        <div className={styles['index-promotion']}>
          <div className="row">
            <div className="col-md-6">
              <Link to="/topics/taiwan-temporary-workers">
                <PromotionBanner
                  bgImgSrc={promotionImg2}
                  iconImgSrc={backToTopicIcon}
                  title="工作貧窮"
                  subtitle="年資中斷、欠薪頻傳的派遣大軍們"
                />
              </Link>
            </div>
            <div className="col-md-6">
              <a href="https://tsai-tracker.twreporter.org/" target="_blank">
                <PromotionBanner
                  bgImgSrc={promotionImg3}
                  title=" &nbsp;"
                  subtitle="蔡英文勞動政策追蹤大平台"
                />
              </a>
            </div>
          </div>
        </div>
        <Daily daily={reviewItems}
        />
        <Features
          features={specialTopicItems}
          hasMore={ get(articlesByUuids, [ this.specialTopicListId, 'hasMore' ])}
          loadMore={this.loadMoreArticles}
        />
        {
          this.props.children
        }
        <Footer />
        { microData }
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webSiteJSONLD }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationJSONLD }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbListJSONLD }} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    articlesByUuids: state.articlesByUuids || {},
    entities: state.entities || {},
    featureArticles: state.featureArticles || {}
  }
}

export { Home }

export default connect(mapStateToProps, {
  fetchArticlesByUuidIfNeeded,
  fetchFeatureArticles,
  setHeaderInfo
})(Home)
