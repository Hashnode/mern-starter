import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './TeamCreateWidget.css';

export class TeamCreateWidget extends Component {
  addTeam = () => {
    const nameRef = this.refs.name;
    if (nameRef.value) {
      this.props.addTeam(nameRef.value);
      nameRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(styles.appear)}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewTeam" /></h2>
          <input placeholder={this.props.intl.messages.teamName} className={styles['form-field']} ref="name" />
          <a className={styles['team-submit-button']} href="#" onClick={this.addTeam}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

TeamCreateWidget.propTypes = {
  addTeam: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(TeamCreateWidget);
