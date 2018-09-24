import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import TeamList from '../../components/TeamList';

const teams = [
  { name: 'Team 01', cuid: 'f34gb2bh24bg3f2' },
  { name: 'Jims Team', cuid: 'f3z4k2bh24b3gv3' },
];

test('renders the list', t => {
  const wrapper = shallow(
    <TeamList teams={teams} handleShowTeam={() => {}} handleDeleteTeam={() => {}} />
  );

  t.is(wrapper.find('TeamListItem').length, 2);
});
