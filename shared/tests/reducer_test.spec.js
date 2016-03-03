import expect from 'expect';
import postReducer from '../redux/reducers';
import deepFreeze from 'deep-freeze';
import * as ActionTypes from '../redux/constants/constants';

describe('reducer tests', () => {
  it('action ADD_POST is working', () => {
    const stateBefore = { blog: { posts: ['foo'], post: null } };
    const stateAfter = {
      blog: {
        posts: [{
          name: 'prank',
          title: 'first post',
          content: 'Hello world!',
          _id: null,
          cuid: null,
          slug: 'first-post',
        },
        'foo'],
        post: null,
      },

      routing: {
        locationBeforeTransitions: null,
      },
    };

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
      blog: {
        posts: [{
          name: 'prank',
          title: 'first post',
          content: 'Hello world!',
          _id: null,
          slug: 'first-post',

        }],
        selectedPost: null,
      },
    };

    const stateAfter = {
      blog: {
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
      },

      routing: {
        locationBeforeTransitions: null,
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
