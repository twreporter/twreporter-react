import React, { Component } from 'react'
import FeaturesItem from './FeaturesItem'
import More from '../components/More'
import _ from 'lodash'
import { imageComposer } from '../lib/image-composer'

if (process.env.BROWSER) {
  require('./Features.css')
}

export default class Features extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { features, device, hasMore, loadMore } = this.props
    if (Array.isArray(features)) {
      return (
        <div className="features-list clearfix">
          <ul className="listing">
            { _.map(features, (a) => {
              let imageSet = imageComposer(a)
              let articleImage = device === 'desktop' ? imageSet.desktopImage : imageSet.mobileImage
              if (articleImage) {
                return (
                  <FeaturesItem article={a} image={articleImage} key={a.id}/>
                  )
              }})
            }
          </ul>
          {hasMore ? <More loadMore={loadMore} device={device} /> : null}
        </div>
      )
    } else {
      return ( <div> </div>)
    }
  }
}

export { Features }

