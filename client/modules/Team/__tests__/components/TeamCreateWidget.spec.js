import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { TeamCreateWidget } from '../../components/TeamCreateWidget/TeamCreateWidget';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const props = {
  addTeam: () => {},
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <TeamCreateWidget {...props} />
  );

  t.truthy(wrapper.hasClass('form'));
  t.truthy(wrapper.hasClass('appear'));
  t.truthy(wrapper.find('h2').first().containsMatchingElement(<FormattedMessage id="createNewTeam" />));
  t.is(wrapper.find('input').length, 1);
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <TeamCreateWidget {...props} />
  );

  t.is(wrapper.prop('addTeam'), props.addTeam);
});

test('calls addTeam', t => {
  const addTeam = sinon.spy();
  const wrapper = mountWithIntl(
    <TeamCreateWidget addTeam={addTeam} />
  );

  wrapper.ref('name').value = 'Davids Team';

  wrapper.find('a').first().simulate('click');
  t.truthy(addTeam.calledOnce);
  t.truthy(addTeam.calledWith('Davids Team'));
});

test('empty form doesn\'t call addTeam', t => {
  const addTeam = sinon.spy();
  const wrapper = mountWithIntl(
    <TeamCreateWidget addTeam={addTeam} />
  );

  wrapper.find('a').first().simulate('click');
  t.falsy(addTeam.called);
});
