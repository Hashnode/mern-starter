import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles['site-title']}>
          <Link to="/" ><FormattedMessage id="siteTitle" /></Link>
        </h1>
        <div className={styles.navigation}>
          <span>
            <Link to="/teams/" className={styles.link}> <FormattedMessage id="teams" /></Link>
          </span>
          <span>
            <Link to="/posts/" className={styles.link}> <FormattedMessage id="posts" /></Link>
          </span>
          <span>
            <Link to="/admin/" className={styles.link}> <FormattedMessage id="admin" /></Link>
          </span>
        </div>
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: PropTypes.object,
};

Header.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default Header;
