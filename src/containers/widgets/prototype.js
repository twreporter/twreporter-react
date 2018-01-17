import React from 'react'
import get from 'lodash/get'

const _ = {
  get
}

const isJson = (string) => {
  try {
    JSON.parse(string)
  } catch (e) {
    return false
  }
  return true
}

class WidgetPrototype extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postMessage: {}
    }
    this.receiveMessage = this._receiveMessage.bind(this)
  }

  _receiveMessage(event) {
    // The statement is only for production
    // Only receiveMessage from twreporter website
    if (event.origin !== 'https://www.twreporter.org' && process.env.NODE_ENV === 'production') {
      return
    }
    let dataObject
    // Only process message which contain useful infomation
    const data = _.get(event, 'data', '')
    if (typeof data === 'string' && isJson(data)) {
      dataObject = JSON.parse(event.data)
      this.setState({
        postMessage: dataObject
      })
    }
  }

  componentDidMount() {
    window.addEventListener('message', this.receiveMessage, false)
  }
}

export default WidgetPrototype
