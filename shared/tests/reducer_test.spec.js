import expect from 'expect';
import postReducer from '../redux/reducers/reducer';
import deepFreeze from 'deep-freeze';
import * as ActionTypes from '../redux/constants/constants';

describe('reducer tests', () => {
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
      type: ActionTypes.ADD_POST,
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
      type: ActionTypes.ADD_SELECTED_POST,
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
