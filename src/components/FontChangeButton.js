import React from 'react'
import styles from './FontChangeButton.scss'


class FontChangeButton extends React.Component {
  constructor() {
    super()
    this.state={ active: true }
    this.anima = this.anima.bind(this)
  }
  anima() {
    this.setState({
      active: !this.state.active
    })
  }
  changeFontSize(fontSize) {
    this.props.changeFontSize(fontSize)
  }
  render() {
    let animaStyle = styles['animaStyle-hide']
    if(this.state.active ===true) {
      animaStyle = styles['animaStyle-hide']
    }else {
      animaStyle = styles['animaStyle-show']
    }
    return(
      <span className={styles['button-appearance']}>
       <button type="button" onClick={this.anima}>Fo</button>
       <button type="button" onClick={()=>this.changeFontSize('small')} className={animaStyle}>A-</button>
       <button type="button" onClick={()=>this.changeFontSize('medium')} className={animaStyle}>A</button>
       <button type="button" onClick={()=>this.changeFontSize('large')} className={animaStyle}>A+</button>
      </span>
    )
  }
}

export default FontChangeButton
