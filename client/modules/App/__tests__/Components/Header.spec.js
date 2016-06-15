import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Header from '../../components/Header/Header';

test('renders the header properly', t => {
  const router = {
    isActive: sinon.stub().returns(true),
  };
  const wrapper = shallow(
    <Header toggleAddPost={() => {}} />,
    {
      context: {
        router,
      },
    }
  );

  t.regex(wrapper.find('Link').first().html(), /MERN Starter Blog/);
  t.is(wrapper.find('a').length, 1);
});

test('doesn\'t add post in pages other than home', t => {
  const router = {
    isActive: sinon.stub().returns(false),
  };
  const wrapper = shallow(
    <Header toggleAddPost={() => {}} />,
    {
      context: {
        router,
      },
    }
  );

  t.is(wrapper.find('a').length, 0);
});

test('toggleAddPost called properly', t => {
  const router = {
    isActive: sinon.stub().returns(true),
  };
  const toggleAddPost = sinon.spy();
  const wrapper = shallow(
    <Header toggleAddPost={toggleAddPost} />,
    {
      context: {
        router,
      },
    }
  );

  wrapper.find('a').first().simulate('click');
  t.truthy(toggleAddPost.calledOnce);
});
