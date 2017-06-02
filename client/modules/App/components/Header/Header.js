import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import { FacebookLogin } from 'react-facebook-login-component';
import { setStoredAuthState, removeStoredAuthState, getStoredAuthState } from '../../../../util/storedAuthState';
import { Profile } from './Profile/Profile';

// Import Style
import styles from './Header.css';
const FACEBOOK_SOCIAL_ID = '1858452057748042';

export class Header extends Component {

  constructor(props) {
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.signOut = this.signOut.bind(this);
  }


  componentWillMount() {
    const authState = getStoredAuthState();
    if (authState && authState.accessToken && authState.profile && (!this.props.profile || !this.props.profile.accessToken)) {
      this.props.signIn(authState.profile);
    }
  }

  responseFacebook(response) {
    if (response.id) {
      // extend profile data with provider
      const profile = Object.assign({}, response, { provider: 'facebook' });
      // store user in localstorage
      setStoredAuthState(profile.accessToken, profile.id, profile);
      // dispatch signin action
      this.props.signIn(profile);
      /* save/log signed in user in DB */
      this.props.signInRequest(profile);
    } else {
      // TODO: error
    }
  }

  signOut() {
    removeStoredAuthState();
    this.props.signOut();
    // TODO: redirect?
  }

  languageNodes() {
    return this.props.intl.enabledLanguages.map(
      lang =>
      (
        <li
          key={lang}
          onClick={() => this.props.switchLanguage(lang)}
          className={`${styles['language-switcher__language']} ${lang === this.props.intl.locale ? styles['language-switcher__language--active'] : ''}`}
        >
          {lang}
        </li>
      )
    );
  }

  loginPopup() {
    return (
      <Modal show={this.props.showLogin} onHide={this.props.toggleLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You can sign in using one of the following social networks:</p>
          <div>
            <FacebookLogin
              socialId={FACEBOOK_SOCIAL_ID}
              language="en_US"
              scope="public_profile,email"
              xfbml
              responseHandler={this.responseFacebook}
              fields="id,email,name,link,picture"
              version="v2.5"
              class="btn btn-primary"
              buttonText="Login With Facebook"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.toggleLogin}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    return (
      <div>

        {this.loginPopup()}

        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" ><FormattedMessage id="siteTitle" /></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>

              <div className={styles.headerItem}>
                {
                  this.context.router.isActive('/', true)
                  ? <a href="#" onClick={this.props.toggleAddPost}><FormattedMessage id="addPost" /></a>
                  : null
                }
              </div>

              <div className={`${styles.headerItem}`}>
                {this.languageNodes()}
              </div>

              <div className={styles.headerItem}>
                {(this.props.profile && this.props.profile.accessToken) && (
                  <Profile
                    profile={this.props.profile}
                    signOut={this.signOut}
                  />
                )}

                {(!this.props.profile || !this.props.profile.accessToken) && (
                  <a href="#" onClick={this.props.toggleLogin}>
                    <FormattedMessage id="login" />
                  </a>
                )}
              </div>

            </Nav>
          </Navbar.Collapse>
        </Navbar>

      </div>

    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  showLogin: PropTypes.bool,
  profile: PropTypes.object,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  signInRequest: PropTypes.func.isRequired,
};

export default Header;
