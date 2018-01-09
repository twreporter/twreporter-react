import { ServiceWidgets } from '@twreporter/registration'
import get from 'lodash/get'
import React from 'react'
import WidgetPrototype from './prototype'

const _ = {
  get
}

class ServiceIframe extends WidgetPrototype {
  render() {
    const { postMessage } = this.state
    return (
      <ServiceWidgets
        svgColor={_.get(postMessage, 'svgColor', '')}
      />
    )
  }
}

export default ServiceIframe
