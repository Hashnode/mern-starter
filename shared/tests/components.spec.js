/* eslint no-unused-vars: 0 */
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import PostListItem from '../components/PostListItem/PostListItem';
import React from 'react';
import expectJSX from 'expect-jsx';
import { Link } from 'react-router';

expect.extend(expectJSX);

describe('component tests', () => {
  it('should render PostListItem properly', () => {
    const renderer = TestUtils.createRenderer();
    const post = {
      name: 'Prank',
      title: 'first post',
      content: 'hello world!',
    };
    renderer.render(<PostListItem post={post} onClick={function click() {}}/>);
    const output = renderer.getRenderOutput();
    expect(output).toEqualJSX(<div className="main">
           <span className="name">Name: {post.name}</span>
           <Link to={`/post/ + ${post.title}`} onClick={function click() {}}>
             <span className="title">Title: {post.title}</span></Link>
           <span className="content">Content: {post.content}</span>
         </div>);
  });
});
