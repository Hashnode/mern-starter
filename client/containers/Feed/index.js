import React, { Component } from 'react';

import * as styles from './styles.css';

class Feed extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <p className={styles.heading}>
        Feed
      </p>
    );
  }
};

export default Feed;
