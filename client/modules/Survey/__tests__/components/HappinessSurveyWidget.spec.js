import React from 'react';
import test from 'ava';
import { FormattedMessage } from 'react-intl';
import { HappinessSurveyWidget } from '../../components/HappinessSurveyWidget';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const props = {
  submitSurvey: () => {},
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <HappinessSurveyWidget {...props} />
  );

  t.is(wrapper.find('h2').length, 2);
  t.truthy(wrapper.find('h2').first().containsMatchingElement(<FormattedMessage id="ownHappiness" />));
  t.truthy(wrapper.find('h2').last().containsMatchingElement(<FormattedMessage id="teamHappiness" />));
  t.is(wrapper.find('.slider').length, 2);
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <HappinessSurveyWidget {...props} />
  );

  t.is(wrapper.prop('submitSurvey'), props.submitSurvey);
});

