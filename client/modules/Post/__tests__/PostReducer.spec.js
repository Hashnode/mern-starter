import expect from 'expect';
import postReducer from '../PostReducer';
import deepFreeze from 'deep-freeze';
import { ADD_POST, ADD_SELECTED_POST } from '../PostActions';

describe('post reducer tests', () => {
  it('action ADD_POST is working', () => {
    const stateBefore = { posts: ['foo'], post: null };
    const stateAfter = { posts: [{
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
      _id: null,
      cuid: null,
      slug: 'first-post',
    }, 'foo'], post: null };

    const action = {
      type: ADD_POST,
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
      _id: null,
      cuid: null,
      slug: 'first-post',
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(stateAfter).toEqual(postReducer(stateBefore, action));
  });

  it('action ADD_SELECTED_POST is working', () => {
    const stateBefore = {
      posts: [{
        name: 'prank',
        title: 'first post',
        content: 'Hello world!',
        _id: null,
        slug: 'first-post',

      }],
      selectedPost: null,
    };

    const stateAfter = {
      posts: [{
        name: 'prank',
        title: 'first post',
        content: 'Hello world!',
        _id: null,
        slug: 'first-post',
      }],
      post: {
        name: 'prank',
        title: 'first post',
        content: 'Hello world!',
        _id: null,
        slug: 'first-post',
      },
    };

    const action = {
      type: ADD_SELECTED_POST,
      post: {
        name: 'prank',
        title: 'first post',
        content: 'Hello world!',
        _id: null,
        slug: 'first-post',
      },
    };

    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(stateAfter).toEqual(postReducer(stateBefore, action));
  });
});
