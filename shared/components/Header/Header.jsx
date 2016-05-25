import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Header.css';
import cssModules from 'react-css-modules';

function Header(props, context) {
  return (
    <div styleName="header">
      <div styleName="header-content">
        <h1 styleName="site-title">
          <Link to="/" onClick={props.handleLogoClick}>MERN Starter Blog</Link>
        </h1>
        {
          context.router.isActive('/', true)
            ? <a styleName="add-post-button" href="#" onClick={props.onClick}>Add Post</a>
            : null
        }
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  handleLogoClick: PropTypes.func,
};

export default cssModules(Header, styles);
