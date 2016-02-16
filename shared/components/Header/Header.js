/* eslint no-unused-vars: 0 */
/* eslint-disable prefer-template*/
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

function Header(props, context) {

    return (
      <div className="blog-header">
        <div className="top-bar">
          <h2 className="feed-title">MERN Blog</h2>

          {context.router.isActive('/', true) ?
          <a className="add-post" onClick={props.onClick}>Add Post</a> : null }
        </div>
      </div>
    );
}

Header.contextTypes = {
  router: React.PropTypes.object,
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Header;
