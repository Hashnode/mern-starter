/* eslint no-unused-vars: 0 */
import expect from 'expect';
import postReducer from '../redux/reducers/reducer';
import deepFreeze from 'deep-freeze';
import * as ActionTypes from '../redux/constants/constants';

describe('reducer tests', () => {
  it('action ADD_POST is working', () => {
    const stateBefore = { posts: [], post: null };
    const stateAfter = { posts: [{
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
    }], post: null };

    const action = {
      type: ActionTypes.ADD_POST,
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
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
      }],
      selectedPost: null,
    };

    const stateAfter = {
      posts: [{
        name: 'prank',
        title: 'first post',
        content: 'Hello world!',
      }],
      post: {
        name: 'prank',
        title: 'first post',
        content: 'Hello world!',
      },
    };

    const action = {
      type: ActionTypes.ADD_SELECTED_POST,
      post: {
        name: 'prank',
        title: 'first post',
        content: 'Hello world!',
      },
    };

    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(stateAfter).toEqual(postReducer(stateBefore, action));
  });
});
