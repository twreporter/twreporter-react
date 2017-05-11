import React, { Component } from 'react'
import superAgent from 'superagent'
import config from '../../api/config'

export default class Subscribe extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      email: '',
      error: false,
      subscribeQuery: false,
      msg: ''
    }
  }
  handleChange(e) {
    this.setState({ email: e.target.value })
  }
  handleSubmit(e) {
    if ( e.key !== 'Enter' ) {
      return
    }

    let mailaddr = this.state.email
    let data = { 'Email': mailaddr }

    const { API_PROTOCOL, API_PORT, GO_API_HOST } = config
    const url = `${API_PROTOCOL}://${GO_API_HOST}:${API_PORT}/v1/registrations/news_letter/`
    // url = http://137.116.170.44:8080/v1/registrations/news_letter/

    // is email addr valid?
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if ( re.test(mailaddr) ) {
      this.setState({ error: false })
      // submit
      const promise = new Promise ((resolve, reject) => {
        superAgent
           .post(url)
           .send(data)
           .set('Content-Type', 'application/json')
           .end( function (err, res) {
             if (err || !res.ok) {
               reject(err)
             } else {
               resolve(res.body)
             }
           })
      })

      promise.then(()=>{
        this.setState({ subscribeQuery: true })
        this.setState({ msg: '訂閱成功' })
        this.setState({ email: '' })
      }, ()=>{
        this.setState({ subscribeQuery: true })
        this.setState({ msg: '訂閱失敗' })
      })

    } else {
      this.setState({ error: true })
      this.setState({ msg: 'Email格式錯誤' })
    }
  }
  render() {
    let showErrorBorder = this.state.error ? { border: '2px red solid' } : {}
    let showMsg = ( (this.state.error) || (this.state.subscribeQuery) ) ?
                  {} : { display: 'none' }

    return (
      <div className="subscribe">
        <h3>訂閱電子報</h3>
        <div className="msg" style={ showMsg }>
          {this.state.msg}
        </div>
        <input type="email"
               style={ showErrorBorder }
               placeholder="Email"
               value={ this.state.email }
               onChange={ this.handleChange }
               onKeyPress={ this.handleSubmit } />
        <button onClick={ this.handleSubmit }>
          送出
        </button>
      </div>
    )
  }
}
