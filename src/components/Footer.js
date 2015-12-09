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
                            <img src='/asset/logo.png' />
                        </div>
                    </div>
                    <div className='social-container'>
                        <div className='fb'>
                            <a href='https://www.facebook.com/twreporter/' target='_blank'>
                                <img src='/asset/FB' />
                            </a>
                        </div>
                        <div className='ig'>
                            <a href='https://www.instagram.com/twreporter/' target='_blank' >
                                <img src='/asset/IG.png' />
                            </a>
                        </div>
                    </div>
                    <div className='us-container'>
                        <div className='about-us'>
                            <a href=''>
                                關於我們
                            </a>
                        </div>
                        <div className='contact-us'>
                            <a href=''>
                                聯絡我們
                            </a>
                        </div>
                        <div className='opolicy'>
                            <a href=''>
                                隱私政策
                            </a>
                        </div>
                        <div className='donate-us'>
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

