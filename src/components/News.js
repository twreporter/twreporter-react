import React, { Component } from 'react'

export default class News extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ul>
        <li><img src="https://atavist.com/data/files/organization/60826/image/derivative/scale~260x346~12003346165-1443167067-82.jpg"/></li>
        <li><img src="https://atavist.com/data/files/organization/60826/image/derivative/scale~260x346~003photo20-1444652394-47.jpg"/></li>
        <li><img src="https://atavist.com/data/files/organization/60826/image/derivative/scale~260x346~12003966164-1443593640-3.jpg"/></li>
        <li><img src="https://atavist.com/data/files/organization/60826/image/derivative/scale~260x346~12003346165-1443167067-82.jpg"/></li>
        <li><img src="https://atavist.com/data/files/organization/60826/image/derivative/scale~260x346~003photo20-1444652394-47.jpg"/></li>
      </ul>
    )
  }
}

News.propTypes = { }
