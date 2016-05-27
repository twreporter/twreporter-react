import ReactDOM from 'react-dom'

let FitwidthMixin = (superclass) => class extends superclass {
  componentDidMount() {
    // set state for the width of the images and listen to window resize event
    this.fitToParentWidth()
    window.addEventListener('resize', this.fitToParentWidth)
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
}

export default FitwidthMixin
