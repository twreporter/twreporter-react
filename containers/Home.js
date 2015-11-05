import React, {Component} from 'react';
import Features from '../components/Features'
import Header from '../components/Header'
import News from '../components/News'
import Projects from '../components/Projects'

export default class Home extends Component {
    render() {
        return (
                <div>
                    <Header/>
                    <Features/>
                    <News/>
                    <Projects/>
                </div>
               );
    }
}
