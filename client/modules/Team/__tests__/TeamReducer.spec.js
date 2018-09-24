import test from 'ava';
import { reducerTest } from 'redux-ava';
import teamReducer, { getTeam, getTeams } from '../TeamReducer';
import { addTeam, deleteTeam, addTeams } from '../TeamActions';

test('action for ADD_TEAM is working', reducerTest(
  teamReducer,
  { data: ['foo'] },
  addTeam({
    name: 'Test Team a',
    _id: null,
    cuid: null,
  }),
  { data: [{
    name: 'Test Team a',
    _id: null,
    cuid: null,
  }, 'foo'] },
));

test('action for DELETE_TEAM is working', reducerTest(
  teamReducer,
  { data: [{
    name: 'Test Team 33',
    cuid: 'abc',
    _id: 1,
  }] },
  deleteTeam('abc'),
  { data: [] },
));

test('action for ADD_TEAMS is working', reducerTest(
  teamReducer,
  { data: [] },
  addTeams([
    {
      name: 'Another Test Team',
      _id: null,
      cuid: null,
    },
  ]),
  { data: [{
    name: 'Another Test Team',
    _id: null,
    cuid: null,
  }] },
));

test('getTeams selector', t => {
  t.deepEqual(
    getTeams({
      teams: { data: ['foo'] },
    }),
    ['foo']
  );
});

test('getTeam selector', t => {
  t.deepEqual(
    getTeam({
      teams: { data: [{ cuid: '123' }] },
    }, '123'),
    { cuid: '123' }
  );
});

