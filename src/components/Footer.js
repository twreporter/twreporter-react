import React, { Component, PropTypes } from 'react'
if (process.env.BROWSER) {
      require("./Footer.css");
}

export default class Footer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='footer'>
                <div className='container'>
                    <div className='logo-container'>
                        <div className='logo'>
                            <img className="logo-img" src='/asset/logo.png' />
                        </div>
                    </div>
                    <div className='social-container'>
                        <div className='item'>
                            <a href='https://www.facebook.com/twreporter/' target='_blank'>
                                <img className="fb" src='/asset/FB'/>
                            </a>
                        </div>
                        <div className='item'>
                            <a href='https://www.instagram.com/twreporter/' target='_blank' >
                                <img className="ig" src='/asset/IG.png' />
                            </a>
                        </div>
                    </div>
                    <div className='us-container'>
                        <div className='item'>
                            <a href=''>
                                關於我們
                            </a>
                        </div>
                        <div className='item'>
                            <a href=''>
                                聯絡我們
                            </a>
                        </div>
                        <div className='item'>
                            <a href=''>
                                隱私政策
                            </a>
                        </div>
                        <div className='item'>
                            <a href=''>
                                贊助我們
                            </a>
                        </div>
                    </div>
                    <div className='open-source-container'>
                        <div className='cc'>
                            <a href='http://creativecommons.org/licenses/by-nc-nd/3.0/tw/' target='_blank'>
                                <img src='/asset/cc.png' />
                            </a>
                        </div>
                        <div className='github'>
                            <a href='https://github.com/twreporter' target='_blank'>
                                <img src='/asset/github.png' />
                                <span></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

