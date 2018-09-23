import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './TeamListItem.css';

function TeamListItem(props) {
  return (
    <div className={styles['single-team']}>
      <h3 className={styles['team-title']}>
        <Link to={`/teams/${props.team.name}-${props.team.cuid}`} >
          {props.team.name}
        </Link>
      </h3>
      <p className={styles['team-name']}><FormattedMessage id="teamName" /> {props.team.name}</p>
      <p className={styles['team-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteTeam" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

TeamListItem.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TeamListItem;
