import React from 'react'
import styles from './FontChangeButton.scss'
import FontIconSmall from '../../static/asset/fontsize-small.svg'
import FontIconMedium from '../../static/asset/fontsize-medium.svg'
import FontIconLarge from '../../static/asset/fontsize-large.svg'
import FontIconClose from '../../static/asset/fontsize-close.svg'
import FontIconOpen from '../../static/asset/fontsize-open.svg'
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
    let animaWrapper, animaButton, ControlButtonIcon = FontIconClose
    if(!this.state.active && !this.state.initialize) {
      ControlButtonIcon = FontIconClose
      animaWrapper = animaWrapper = styles['animaStyle-wrapper-hide']
      animaButton = styles['anima-hide']
    }else if(this.state.active && !this.state.initialize) {
      ControlButtonIcon = FontIconOpen
      animaWrapper = styles['animaStyle-wrapper-show']
      animaButton = styles['anima-show']
    }

    // font status + create font buttons set
    let fontSize = this.props.fontSize
    let buttonsSet = [ { type: 'large', Icon: FontIconLarge },
    { type: 'medium', Icon: FontIconMedium },
    { type: 'small', Icon: FontIconSmall } ].map(function (button,i) {
      return (
        <div key={i} onClick={()=>{this.changeFontSize(button.type)}} className={cx(styles['image-container'], animaButton, styles['image-container-' + button.type])}>
          <button.Icon className={cx(styles['image-' + button.type], fontSize === button.type ? styles['font-status-active'] : null)} />
        </div>
      )
    }.bind(this))

    return(
      <span className={styles['button-appearance']}>
       <div className={cx(styles['image-container'], styles['control-button'])} onClick={this.anima}>
         <span className={styles['control-image']}>
           <ControlButtonIcon style={{ opacity: 1 }}/>
         </span>
       </div>
       <div className={cx(animaWrapper, styles['wrapper'])}></div>
       {buttonsSet}
     </span>
    )
  }
}

export default FontChangeButton
