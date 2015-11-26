
'use strict';

var React = require('react');
var classnames = require('classnames');

// Simplest possible mixin to get a global scroll event
var WindowScrollMixin = {
    componentDidMount: function() {
        window.addEventListener('scroll', this.onScroll, false);
    },
    componentWillUnmount: function() {
        window.removeEventListener('scroll', this.onScroll, false);
    }
};

// If we don't get a scroll event within 200 ms, assume the user
// stopped scrolling.
var SCROLL_TIMEOUT = 240;
var CHECK_INTERVAL = SCROLL_TIMEOUT / 6;

var PageScrollMixin = {

  mixins: [WindowScrollMixin],

  checkInterval: null,
  scrolling: false,
  proxiedScrollTime: Date.now(),

  componentDidMount: function() {
    this.checkInterval = window.setInterval(this.checkScroll, CHECK_INTERVAL);
    this.scrolling = false;
  },

  componentWillUnmount: function() {
    window.clearInterval(this.checkInterval);
  },

  checkScroll: function() {
    if (Date.now() - this.lastScrollTime > SCROLL_TIMEOUT && this.scrolling) {
      this.scrolling = false;
      this.onScrollEnd();
    }
  },

  proxiedScroll: function () {
    if (Date.now() - this.proxiedScrollTime > CHECK_INTERVAL && this.scrolling ) {
      this.proxiedScrollTime = Date.now();
      this.onScrollProxy();
    }
  },

  onScroll: function() {
    if (!this.scrolling) {
      this.scrolling = true;
      this.onScrollStart();
    }
    this.lastScrollTime = Date.now();
    this.proxiedScroll();
  }
};


/**
 * Stickybox React component
 * @class
 */
var Parallax = React.createClass({
  render: function () {
    var children = React.Children.map(
      this.props.children,
      function(child, idx) {
        return React.createElement(Stickybox, {className: 'card', idx: idx}, child);
      }
    );
    return React.createElement('div', {className: 'parallax'}, children);
  }
});


/**
 * Stickybox React component
 * @class
 */
var Stickybox = React.createClass({

  mixins: [PageScrollMixin],

  node: null,

  getInitialState: function () {
    return {
      top: 1,
      height: -1,
      scrolling: false
    };
  },

  componentDidMount: function () {
    this.node = this.getDOMNode();
    this.updateTopPosition();
  },

  handleScroll: function () {
    this.updateTopPosition();
  },

  updateTopPosition: function () {
    var box = this.node.getBoundingClientRect();
    this.setState({
      top: box.top,
      height: box.height
    });
  },

  onScrollStart: function() {
    this.setState({scrolling: true});
    this.handleScroll();
  },

  onScrollProxy: function () {
    this.handleScroll();
  },

  onScrollEnd: function() {
    this.setState({scrolling: false});
    this.handleScroll();
  },

  getState: function () {
    return this.state;
  },

  isFrozen: function () {
    return this.state.top < 1 && this.state.top < window.document.body.scrollTop;
  },

  /**
   * Render
   * @returns {ReactElement} react element
   */
  render: function () {
    var args = {}, isFrozen = this.isFrozen();

    args.className = classnames('component-stickybox', {
      frozen: isFrozen
    });
    args.style = {
      height: isFrozen ? this.state.height : 'auto',
      zIndex: this.props.idx
    };
    return React.createElement('div', args,
        this.props.children);
  }
});

module.exports = Parallax;
