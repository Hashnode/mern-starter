import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import TeamListItem from './TeamListItem/TeamListItem';

function TeamList(props) {
  return (
    <div className="listView">
      {
        props.teams.map(team => (
          <TeamListItem
            team={team}
            key={team.cuid}
            onDelete={() => props.handleDeleteTeam(team.cuid)}
          />
        ))
      }
    </div>
  );
}

TeamList.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteTeam: PropTypes.func.isRequired,
};

export default TeamList;
