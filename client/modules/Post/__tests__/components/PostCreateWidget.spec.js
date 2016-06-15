import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import PostCreateWidget from '../../components/PostCreateWidget/PostCreateWidget';
import styles from '../../components/PostCreateWidget/PostCreateWidget.css';

const props = {
  addPost: () => {},
  showAddPost: true,
};

test('renders properly', t => {
  const wrapper = shallow(
    <PostCreateWidget {...props} />
  );

  t.truthy(wrapper.hasClass(styles.form));
  t.truthy(wrapper.hasClass(styles.appear));
  t.is(wrapper.find('h2').first().text(), 'Create new post');
  t.is(wrapper.find('input').length, 2);
  t.is(wrapper.find('textarea').length, 1);
});

test('hide when showAddPost is false', t => {
  const wrapper = mount(
    <PostCreateWidget {...props} />
  );

  wrapper.setProps({ showAddPost: false });
  t.falsy(wrapper.hasClass(styles.appear));
});

test('has correct props', t => {
  const wrapper = mount(
    <PostCreateWidget {...props} />
  );

  t.is(wrapper.prop('addPost'), props.addPost);
  t.is(wrapper.prop('showAddPost'), props.showAddPost);
});

test('calls addPost', t => {
  const addPost = sinon.spy();
  const wrapper = mount(
    <PostCreateWidget addPost={addPost} showAddPost />
  );

  wrapper.ref('name').get(0).value = 'David';
  wrapper.ref('title').get(0).value = 'Some Title';
  wrapper.ref('content').get(0).value = 'Bla Bla Bla';

  wrapper.find('a').first().simulate('click');
  t.truthy(addPost.calledOnce);
  t.truthy(addPost.calledWith('David', 'Some Title', 'Bla Bla Bla'));
});

test('empty form doesn\'t call addPost', t => {
  const addPost = sinon.spy();
  const wrapper = mount(
    <PostCreateWidget addPost={addPost} showAddPost />
  );

  wrapper.find('a').first().simulate('click');
  t.falsy(addPost.called);
});
