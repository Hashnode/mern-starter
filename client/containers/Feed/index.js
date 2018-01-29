import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../actions/Post';

import * as styles from './styles.css';

class Feed extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchAllPosts());
  }

  render() {
    return (
      <div className={styles.container} />
    );
  }
}

const mapStateToProps = state => ({
  feed: state.Post,
});

Feed.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feed);
