import { ADD_TEAM, ADD_TEAMS, DELETE_TEAM } from './TeamActions';

// Initial State
const initialState = {
  data: [],
};

const TeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TEAM :
      return {
        data: [action.team, ...state.data],
      };

    case ADD_TEAMS :
      return {
        data: action.teams,
      };

    case DELETE_TEAM :
      return {
        data: state.data.filter(team => team.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all teams
export const getTeams = state => state.teams.data;

// Get team by cuid
export const getTeam = (state, cuid) => state.teams.data.filter(team => team.cuid === cuid)[0];

// Export Reducer
export default TeamReducer;
