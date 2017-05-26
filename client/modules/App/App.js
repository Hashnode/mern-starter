import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import Actions
import { toggleAddPost, toggleLogin, signOut, signIn } from './AppActions';
import { getShowLogin, getProfile } from './AppReducer';
import { switchLanguage } from '../../modules/Intl/IntlActions';

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

  toggleLoginPopup = () => {
    this.props.dispatch(toggleLogin());
  };

  userSignIn = (profile) => {
    this.props.dispatch(signIn(profile));
  };

  userSignOut = () => {
    this.props.dispatch(signOut());
  };

  render() {
    return (
      <div className={styles.facekoobApp}>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="Facekoob"
            titleTemplate="%s - Facekoob"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Header
            switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
            intl={this.props.intl}
            showLogin={this.props.showLogin}
            profile={this.props.profile}
            toggleAddPost={this.toggleAddPostSection}
            toggleLogin={this.toggleLoginPopup}
            signIn={this.userSignIn}
            signOut={this.userSignOut}
          />
          <div className={styles.container}>
            {this.props.children}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  showLogin: PropTypes.bool,
  profile: PropTypes.object,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    showLogin: getShowLogin(store),
    profile: getProfile(store),
  };
}

export default connect(mapStateToProps)(App);
