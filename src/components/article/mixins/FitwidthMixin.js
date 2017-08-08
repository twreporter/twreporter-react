import ReactDOM from 'react-dom'

// lodash
import get from 'lodash/get'

let FitwidthMixin = (superclass) => class extends superclass {
  componentDidMount() {
    // set state for the width of the images and listen to window resize event
    if (ReactDOM.findDOMNode(this)) {
      this.fitToParentWidth()
      window.addEventListener('resize', this.fitToParentWidth)
    }
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this) && window.removeEventListener('resize', this.fitToParentWidth)
  }

  fitToParentWidth() {
    const elem = ReactDOM.findDOMNode(this).parentNode
    const width = elem.clientWidth
    if (width !== this.state.width) {
      this.setState({
        width: width
      })
    }
  }

  _renderByDevice(screenType, imageByDevice, imgStyle, isLazyload=true) {
    switch(screenType) {
      case 'MOBILE':
        return this._renderFigure(imageByDevice.mobile, imgStyle, isLazyload)
      case 'TABLET':
        return this._renderFigure(imageByDevice.tablet, imgStyle, isLazyload)
      case 'DESKTOP':
        return this._renderFigure(imageByDevice.desktop, imgStyle, isLazyload)
      default:
        return this._renderFigure(imageByDevice.mobile, imgStyle, isLazyload)
    }
  }

  _getHeight(width, original, defaultWidth, defaultHeight) {
    if (original) {
      const oriWidth = get(original, 'width', defaultWidth)
      const oriHeight = get(original, 'height', defaultHeight)
      return Math.round(width * oriHeight / oriWidth)
    }
    return defaultHeight
  }
}

export default FitwidthMixin
