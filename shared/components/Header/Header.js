/* eslint no-unused-vars: 0 */
/* eslint-disable prefer-template*/
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

function Header(props, context) {
  return (
    <div className="header">
      <div className="header-content">
        <h1 className="site-title"><a href="/">MERN Starter Blog</a></h1>
        {context.router.isActive('/', true) ?
          <a className="add-post-button" href="#" onClick={props.onClick}>Add Post</a> : null }
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Header;
