import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Dropdown, MenuItem, Glyphicon } from 'react-bootstrap';

// Import Style
import styles from './Profile.css';

export function Profile(props) {
  const { name, picture } = props.profile;
  return (
    <div className={styles.profile}>
      <Dropdown id="active-user-menu" pullRight>
        <div bsRole="toggle">
          <span className={styles.name}>{name}</span>
          {picture && picture.data && picture.data.url && (
            <span className={styles.photo}>
              <img className={styles.image} src={picture.data.url} alt={name} />
            </span>
          )}
        </div>

        <Dropdown.Menu>
          <MenuItem eventKey="1" onClick={props.signOut}>
            <Glyphicon glyph="off" className={styles.iconSignOut} />
            <FormattedMessage id="signOut" />
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>

    </div>
  );
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Profile;
