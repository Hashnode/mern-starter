import React from 'react';
import styles from './Footer.css';
import cssModules from 'react-css-modules';

function Footer() {
  return (
   <div styleName="footer">
     <p>&copy; 2016 &middot; Hashnode &middot; LinearBytes Inc.</p>
     <p>We are on Twitter : <a href="https://twitter.com/@mern_io" target="_Blank">@mern_io</a></p>
   </div>
 );
}

export default cssModules(Footer, styles);
