import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_TEAM = 'ADD_TEAM';
export const ADD_TEAMS = 'ADD_TEAMS';
export const DELETE_TEAM = 'DELETE_TEAM';

// Export Actions
export function addTeam(team) {
  return {
    type: ADD_TEAM,
    team,
  };
}

export function addTeamRequest(team) {
  return (dispatch) => {
    return callApi('teams', 'post', {
      team: {
        name: team.name,
      },
    }).then(res => dispatch(addTeam(res.team)));
  };
}

export function addTeams(teams) {
  return {
    type: ADD_TEAMS,
    teams,
  };
}

export function fetchTeams() {
  return (dispatch) => {
    return callApi('teams').then(res => {
      dispatch(addTeams(res.teams));
    });
  };
}

export function fetchTeam(cuid) {
  return (dispatch) => {
    return callApi(`teams/${cuid}`).then(res => dispatch(addTeam(res.team)));
  };
}

export function deleteTeam(cuid) {
  return {
    type: DELETE_TEAM,
    cuid,
  };
}

export function deleteTeamRequest(cuid) {
  return (dispatch) => {
    return callApi(`teams/${cuid}`, 'delete').then(() => dispatch(deleteTeam(cuid)));
  };
}

