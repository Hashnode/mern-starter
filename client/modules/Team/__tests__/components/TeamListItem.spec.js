import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import TeamListItem from '../../components/TeamListItem/TeamListItem';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const team = { name: 'Test Team 1', cuid: 'f34gb2jko3224b2' };
const props = {
  team,
  onDelete: () => {},
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <TeamListItem {...props} />
  );

  t.truthy(wrapper.hasClass('single-team'));
  t.is(wrapper.find('Link').first().prop('children'), team.name);
  t.regex(wrapper.find('.team-name').first().text(), new RegExp(team.name));
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <TeamListItem {...props} />
  );

  t.deepEqual(wrapper.prop('team'), props.team);
  t.is(wrapper.prop('onClick'), props.onClick);
  t.is(wrapper.prop('onDelete'), props.onDelete);
});

test('calls onDelete', t => {
  const onDelete = sinon.spy();
  const wrapper = shallowWithIntl(
    <TeamListItem team={team} onDelete={onDelete} />
  );

  wrapper.find('.team-action > a').first().simulate('click');
  t.truthy(onDelete.calledOnce);
});
