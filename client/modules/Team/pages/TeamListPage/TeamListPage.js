import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import TeamList from '../../components/TeamList';
import TeamCreateWidget from '../../components/TeamCreateWidget/TeamCreateWidget';

// Import Actions
import { addTeamRequest, fetchTeams, deleteTeamRequest } from '../../TeamActions';

// Import Selectors
import { getTeams } from '../../TeamReducer';

class TeamListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTeams());
  }

  handleDeleteTeam = team => {
    if (confirm('Do you want to delete this team')) { // eslint-disable-line
      this.props.dispatch(deleteTeamRequest(team));
    }
  };

  handleAddTeam = (name) => {
    this.props.dispatch(addTeamRequest({ name }));
  };

  render() {
    return (
      <div>
        <TeamCreateWidget addTeam={this.handleAddTeam} />
        <TeamList handleDeleteTeam={this.handleDeleteTeam} teams={this.props.teams} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
TeamListPage.need = [() => { return fetchTeams(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    teams: getTeams(state),
  };
}

TeamListPage.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

TeamListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(TeamListPage);
