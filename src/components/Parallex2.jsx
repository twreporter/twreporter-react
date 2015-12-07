
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
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
var SCROLL_TIMEOUT = 20;
var CHECK_INTERVAL = 1;

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
    node: null,

    // the top of element mounted on the DOM at first
    top: 0,

    // the bottom of element mounted on the DOM at first
    bottom: 0,

    // the height of element
    height: 0,

    diff: 0,

    componentDidMount: function() {
        window.addEventListener('scroll', this.onScroll, false);
        this.node = ReactDOM.findDOMNode(this);

        var rect = this._getRect();
        var scrollTop = this._getScrollTop();
        this.top = rect.top + scrollTop;
        this.bottom = rect.bottom + scrollTop;
        this.height = rect.height;
    },

    componentWillUnmount: function() {
        window.removeEventListener('scroll', this.onScroll, false);
    },

    _getRect: function() {
        return this.node.getBoundingClientRect();
    },

    _getScrollTop: function() {
        return document.body.scrollTop;
    },

    _isElementInViewport: function() {
        var scrollTop = this._getScrollTop();
        if (scrollTop >= this.top && scrollTop < this.bottom) {
            return true;
        } else {
            return false;
        }
    },

    handleScroll: function() {
        console.log('handleScroll');
        if (this._isElementInViewport()) {
            var diff = this._getScrollTop() - this.top;
            if (Math.abs(diff) < this.height) {
                var absDiff = Math.abs(this.diff - diff);
                for (var i = 0; i <= absDiff; i++) {
                    console.log('diff:', i);
                    this.node.style.transform = 'translateY(' + (this.diff + diff) + 'px)';
                }
            }
        }
    },

    onScroll: function() {
        this.handleScroll();
    },
    render: function () {
        return (
            <div className='parallex'>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Parallax;
