import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';

// Import Style
// import './Header.styl';

export function Header(props, context) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang =>
      <li
        key={lang}
        onClick={() => props.switchLanguage(lang)}
        className={`language-switcher__language ${lang === props.intl.locale ? 'language-switcher__language--active' : ''}`}
      >
        {lang}
      </li>
  );

  const loginPopup = (
    <Modal show={props.showLogin} onHide={props.toggleLogin}>
      <Modal.Header closeButton>
        <Modal.Title>Sign in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You can sign in using one of the following social networks:</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.toggleLogin}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="header">

      {loginPopup}

      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" ><FormattedMessage id="siteTitle" /></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>

            <div className={'header__item header__item--add-post'}>
              {
                context.router.isActive('/', true)
                ? <a href="#" onClick={props.toggleAddPost}><FormattedMessage id="addPost" /></a>
                : null
              }
            </div>

            <div className={'header__item header__item--language-switcher'}>
              {languageNodes}
            </div>

            <div className={'header__item header__item--login'}>
              <a href="#" onClick={props.toggleLogin}>
                <FormattedMessage id="login" />
              </a>
            </div>

          </Nav>
        </Navbar.Collapse>
      </Navbar>

    </div>

  );
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
};

export default Header;
