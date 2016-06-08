import React from 'react';

// Import Style
import styles from './Footer.css';

function Footer() {
  return (
    <div className={styles.footer}>
      <p>&copy; 2016 &middot; Hashnode &middot; LinearBytes Inc.</p>
      <p>We are on Twitter : <a href="https://twitter.com/@mern_io" target="_Blank">@mern_io</a></p>
    </div>
  );
}

export default Footer;
