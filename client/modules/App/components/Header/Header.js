import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Navbar, Nav } from 'react-bootstrap';

// Import Style
import './Header.styl';

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

  return (
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
            <FormattedMessage id="login" />
          </div>

        </Nav>
      </Navbar.Collapse>
    </Navbar>

  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default Header;
