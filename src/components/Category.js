import React, {Component} from 'react'
if (process.env.BROWSER) {
  require("./Category.css");
}

export default class Category extends Component {
  render() {
      return (
          <span className="category" style={this.props.style}>{this.props.children}</span>
      )
  }
}
