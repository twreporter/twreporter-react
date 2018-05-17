import Lottie from 'react-lottie'
import React, { PureComponent } from 'react'
import animationData1 from '../../../../static/asset/about-us/animation/section1-1.json'
import animationData2 from '../../../../static/asset/about-us/animation/section1-2.json'
import animationData3 from '../../../../static/asset/about-us/animation/section1-3.json'

export class LottieAnim extends PureComponent {
  constructor(props) {
    super(props)
    this.dataset = [ animationData1, animationData2, animationData3 ]
    this.currentData = 0
    this.state = {
      animationData: this.dataset[this.currentData]
    }
  }
  _animationUpdate() {
    let dataIndex = ++this.currentData % this.dataset.length
    this.setState({ animationData: this.dataset[dataIndex] })
    this.props.animDidUpdate(dataIndex)
  }
  render() {
    let options = {
      loop: true,
      autoplay: true,
      animationData: this.state.animationData
    }
    return (
      <Lottie
        options={options}
        height={225}
        width={400}
        isStopped={false}
        isPaused={false}
        eventListeners = {
          [ {
            eventName: 'loopComplete',
            callback: () => this._animationUpdate()
          } ]
        }
        />
    )
  }
}

export default LottieAnim

