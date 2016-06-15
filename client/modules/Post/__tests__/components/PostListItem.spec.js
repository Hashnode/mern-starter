import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import PostListItem from '../../components/PostListItem/PostListItem';
import styles from '../../components/PostListItem/PostListItem.css';

const post = { name: 'Prashant', title: 'Hello Mern', slug: 'hello-mern', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'" };
const props = {
  post,
  onClick: () => {},
  onDelete: () => {},
};

test('renders properly', t => {
  const wrapper = shallow(
    <PostListItem {...props} />
  );

  t.truthy(wrapper.hasClass(styles['single-post']));
  t.is(wrapper.find('Link').first().prop('children'), post.title);
  t.is(wrapper.find(`.${styles['author-name']}`).first().text(), `By ${post.name}`);
  t.is(wrapper.find(`.${styles['post-desc']}`).first().text(), post.content);
});

test('has correct props', t => {
  const wrapper = mount(
    <PostListItem {...props} />
  );

  t.deepEqual(wrapper.prop('post'), props.post);
  t.is(wrapper.prop('onClick'), props.onClick);
  t.is(wrapper.prop('onDelete'), props.onDelete);
});

test('calls onClick and onDelete', t => {
  const onClick = sinon.spy();
  const onDelete = sinon.spy();
  const wrapper = shallow(
    <PostListItem post={post} onClick={onClick} onDelete={onDelete} />
  );

  wrapper.find(`.${styles['post-title']} > Link`).first().simulate('click');
  t.truthy(onClick.calledOnce);

  wrapper.find(`.${styles['post-action']} > a`).first().simulate('click');
  t.truthy(onDelete.calledOnce);
});
