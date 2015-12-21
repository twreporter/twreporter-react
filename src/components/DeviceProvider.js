import { Component, PropTypes, Children } from 'react'

export default class DeviceProvider extends Component {
  getChildContext() {
    return {
      device: this.device
    }
  }

  constructor(props, context) {
    super(props, context)
    this.device = props.device
  }

  render() {
    let { children } = this.props
    return Children.only(children)
  }
}

DeviceProvider.propTypes = {
  children: PropTypes.element.isRequired,
  device: PropTypes.string.isRequired
}

DeviceProvider.childContextTypes = {
  device: PropTypes.string
}
