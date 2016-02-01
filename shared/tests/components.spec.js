/* eslint no-unused-vars: 0 */
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import PostListItem from '../components/PostListItem/PostListItem';
import React from 'react';
import expectJSX from 'expect-jsx';

expect.extend(expectJSX);

describe('component tests', () => {
  it('should render PostListItem properly', () => {
    const renderer = TestUtils.createRenderer();
    const post = {
      name: 'Prank',
      title: 'first post',
      content: 'hello world!',
    };
    renderer.render(<PostListItem post={post}/>);
    const output = renderer.getRenderOutput();
    expect(output).toEqualJSX(<div><p>{post.name}</p>
                                   <p>{post.title}</p>
                                   <p>{post.content}</p>
                              </div>);
  });
});
