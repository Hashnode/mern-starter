import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  ADD_TEAM,
  DELETE_TEAM,
  ADD_TEAMS,
  addTeam,
  deleteTeam,
  addTeams,
} from '../TeamActions';

const team = { name: 'Team Test 2', cuid: 'f34g3jp224b24b2', _id: 1 };

test('should return the correct type for addTeam', actionTest(
  addTeam,
  team,
  { type: ADD_TEAM, team },
));

test('should return the correct type for deleteTeam', actionTest(
  deleteTeam,
  team.cuid,
  { type: DELETE_TEAM, cuid: team.cuid },
));

test('should return the correct type for addTeams', actionTest(
  addTeams,
  [team],
  { type: ADD_TEAMS, teams: [team] },
));
