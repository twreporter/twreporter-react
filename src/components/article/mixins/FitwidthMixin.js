import ReactDOM from 'react-dom'
import _ from 'lodash'

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

  _renderByDevice(screenType, imageByDevice, imgStyle) {
    switch(screenType) {
      case 'MOBILE':
        return this._renderFigure(imageByDevice.mobile, imgStyle)
      case 'TABLET':
        return this._renderFigure(imageByDevice.tablet, imgStyle)
      case 'DESKTOP':
        return this._renderFigure(imageByDevice.desktop, imgStyle)
      default:
        return this._renderFigure(imageByDevice.mobile, imgStyle)
    }
  }

  _getHeight(width, original, defaultWidth, defaultHeight) {
    if (original) {
      const oriWidth = _.get(original, 'width', defaultWidth)
      const oriHeight = _.get(original, 'height', defaultHeight)
      return Math.round(width * oriHeight / oriWidth)
    }
    return defaultHeight
  }
}

export default FitwidthMixin
