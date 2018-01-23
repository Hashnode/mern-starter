import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { App } from '../App';
import styles from '../App.css';
import { intlShape } from 'react-intl';
import { intl } from '../../../util/react-intl-test-helper';
import { toggleAddPost } from '../AppActions';

const intlProp = { ...intl, enabledLanguages: ['en', 'fr'] };
const children = <h1>Test</h1>;
const dispatch = sinon.spy();
const props = {
  children,
  dispatch,
  intl: intlProp,
};

test('renders properly', t => {
  const wrapper = shallow(
    <App {...props} />
  );

  // t.is(wrapper.find('Helmet').length, 1);
  t.is(wrapper.find('Header').length, 1);
  t.is(wrapper.find('Footer').length, 1);
  t.is(wrapper.find('Header').prop('toggleAddPost'), wrapper.instance().toggleAddPostSection);
  t.truthy(wrapper.find('Header + div').hasClass(styles.container));
  t.truthy(wrapper.find('Header + div').children(), children);
});

test('calls componentDidMount', t => {
  sinon.spy(App.prototype, 'componentDidMount');
  mount(
    <App {...props} />,
    {
      context: {
        router: {
          isActive: sinon.stub().returns(true),
          push: sinon.stub(),
          replace: sinon.stub(),
          go: sinon.stub(),
          goBack: sinon.stub(),
          goForward: sinon.stub(),
          setRouteLeaveHook: sinon.stub(),
          createHref: sinon.stub(),
        },
        intl,
      },
      childContextTypes: {
        router: React.PropTypes.object,
        intl: intlShape,
      },
    },
  );

  t.truthy(App.prototype.componentDidMount.calledOnce);
  App.prototype.componentDidMount.restore();
});

test('calling toggleAddPostSection dispatches toggleAddPost', t => {
  const wrapper = shallow(
    <App {...props} />
  );

  wrapper.instance().toggleAddPostSection();
  t.truthy(dispatch.calledOnce);
  t.truthy(dispatch.calledWith(toggleAddPost()));
});
