import React from 'react'
import styles from './FontChangeButton.scss'
import fontIconSmall from '../../static/asset/fontsize-small.svg'
import fontIconMedium from '../../static/asset/fontsize-medium.svg'
import fontIconLarge from '../../static/asset/fontsize-large.svg'
import fontIconClose from '../../static/asset/fontsize-close.svg'
import fontIconOpen from '../../static/asset/fontsize-open.svg'
import cx from 'classnames'

class FontChangeButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { active: false, initialize: true }
    this.anima = this.anima.bind(this)
  }
  anima() {
    this.setState({
      active: !this.state.active,
      initialize: false
    })
  }
  changeFontSize(fontSize) {
    this.props.changeFontSize(fontSize)
  }

  render() {
    // font animation
    let animaWrapper, animaButton, controlButtonIcon = fontIconClose
    if(!this.state.active && !this.state.initialize) {
      controlButtonIcon = fontIconClose
      animaWrapper = animaWrapper = styles['animaStyle-wrapper-hide']
      animaButton = styles['anima-hide']
    }else if(this.state.active && !this.state.initialize) {
      controlButtonIcon = fontIconOpen
      animaWrapper = styles['animaStyle-wrapper-show']
      animaButton = styles['anima-show']
    }

    // font status + create font buttons set
    let fontSize = this.props.fontSize
    let buttonsSet = [ { type: 'large', icon: fontIconLarge },
    { type: 'medium', icon: fontIconMedium },
    { type: 'small', icon: fontIconSmall } ].map(function (button,i) {
      return (
        <div key={i} onClick={()=>{this.changeFontSize(button.type)}} className={cx(styles['image-container'], animaButton, styles['image-container-' + button.type])}>
          <img className={cx(styles['image-' + button.type], fontSize === button.type ? styles['font-status-active'] : null)} src={button.icon}/>
        </div>
      )
    }.bind(this))

    return(
      <span className={styles['button-appearance']}>
       <div className={cx(styles['image-container'], styles['control-button'])} onClick={this.anima}>
         <img src={controlButtonIcon} className={styles['control-image']}/>
       </div>
       <div className={cx(animaWrapper, styles['wrapper'])}></div>
       {buttonsSet}
     </span>
    )
  }
}

export default FontChangeButton
