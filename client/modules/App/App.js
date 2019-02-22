import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


// Import Components
import Comp from './components/CustomComponents/Comp';

// Import Actions
import { toggleAddPost } from './AppActions';

// let DevTools;
// if (process.env.NODE_ENV === 'development') {
//   // eslint-disable-next-line global-require
//   DevTools = require('./components/DevTools').default;
// }

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  render() {
    return (
      <div>
				<Comp />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(App);
