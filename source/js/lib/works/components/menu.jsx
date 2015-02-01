/** @jsx React.DOM */

var React = require('react');

var Menu  = React.createClass({

  _open: function (event) {
    event.preventDefault();
    var el = document.querySelector('.portfolio-menu');
    el.classList.toggle('active');
  },

  _close: function (event) {
    event.preventDefault();
    var el = document.querySelector('.portfolio-menu');
    el.classList.toggle('active');
  },

  getDefaultProps: function () {
    return {
      items: [],
      active: false // if menu is open, true, else, false
    }
  },

  render: function() {
    return (
      <div>
        <a href="#" className="portfolio-menu-trigger" onClick={this._open}>
          <div className="portfolio-menu-trigger-inner" onMouseEnter={this._open}></div>
          <svg x="0px" y="0px" height="30px" width="30px" viewBox="0 0 20 20" enable-background="new 0 0 20 20">
            <path d="M15,10l-9,5V5L15,10z"/>
          </svg>
        </a>
        <nav className="portfolio-menu" onMouseLeave={this._close}>
          <div className="portfolio-menu-wrapper">
            {this.props.items.map(function (link) {
              return <a href="#" className="portfolio-menu-item">{link.title}</a>;
            })}
          </div>
        </nav>
      </div>
    );
  }

});

module.exports = Menu;
