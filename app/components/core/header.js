import React, { Component } from 'react';
import { Link } from 'react-router';
import Branding from 'components/core/branding';
import pureRender from 'utils/pureRender';

export default pureRender(class Header extends Component {
  render() {
    return (
      <header className={`page-header header-theme-${this.props.theme}`}>
        <Link to="/" activeClassName="active">
          <Branding />
        </Link>
        <nav className='page-navigation' role='navigation'>
          <ul className='navigation-items'>
            <li className='navigation-item' id='work'>
              <Link to="about" className="navigation-item-link">
                About
              </Link>
            </li>
            <li className='navigation-item' id='work'>
              <Link to="posts" className="navigation-item-link">
                Writing
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
});